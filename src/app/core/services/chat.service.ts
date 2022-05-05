import { Injectable } from "@angular/core";
import { Socket } from 'ngx-socket-io';
import { Observable } from "rxjs";

export class Chat {
  msg?: string;
  date?: Date | string;
  msgTo?: string
  msgFrom?: string
}

export interface ChatCollection {
  chats: Chat[];
}

export interface UserChatInfo {
  contactId: User["id"];
  contactName: User["firstName"];
  unread: number;

  lastChatTime: Date | string;
}

export class User {
  id: string;
  avatar: string;
  name: string;
  firstName: string;
  status: string;
  chatInfo?: UserChatInfo[];
}

@Injectable()
export class ChatService {
  public contacts: User[];
  public chats: ChatCollection[];
  public user: User;
  public collectionLoading: boolean;
  constructor(private socket: Socket) {

  }
  sendMessage(newMsg) {
    this.socket.emit('chat-msg', { msg: newMsg.msg, msgTo: newMsg.msgTo, date: newMsg.date });
  }
  sendMedia(newMsg) {
    this.socket.emit('media-chat', { image: newMsg.image, room: newMsg.room, msgTo: newMsg.msgTo, date: newMsg.date });
  }
  startTyping() {
    this.socket.emit('typing');
  }
  setUser(userName) {
    this.socket.emit('set-user-data', userName);
  }
  public getTyping = () => {
    return Observable.create((observer) => {
      this.socket.on('typing', function (msg) {
        observer.next(msg);
      });
    });
  }
  createRomm(n1, n2) {
    this.socket.emit('set-room', { name1: n1, name2: n2 });
  }
  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('chat-msg', (message) => {
        observer.next(message);

      });
    });
  }
  public getMedia = () => {
    return Observable.create((observer) => {
      this.socket.on('media-chat', (message) => {
        observer.next(message);
      });
    });
  }

  public getRoomId = () => {
    return Observable.create((observer) => {
      this.socket.on('set-room', (roomId) => {
        observer.next(roomId);
      });
    });
  }

}
