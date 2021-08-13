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
  // chatId: ChatCollection["id"];
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
    console.log('msg', newMsg)
    this.socket.emit('chat-msg', { msg: newMsg.msg, msgTo: newMsg.msgTo, date: newMsg.date });
  }
  sendMedia(newMsg) {
    console.log('media msg', newMsg)
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
      //receiving typing message.
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
        console.log('res', message)

      });
    });
  }
  public getMedia = () => {
    return Observable.create((observer) => {
      this.socket.on('media-chat', (message) => {
        observer.next(message);
        console.log('res', message)

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
  // onContactSelected = new BehaviorSubject<any>(null);
  // onUserUpdated = new Subject<User>();

  // onChatSelected = new BehaviorSubject<any>(null);
  // onChatsUpdated = new Subject<any>();

  // constructor(private http: HttpClient) {
  //   // console.log('from service');
  //   // this.loadChatData()
  // }

  // loadChatData(): Observable<any> {
  //   return combineLatest(
  //     this.getAllContacts(),
  //     this.getAllChats(),
  //     this.getCurrentUser(),
  //     (contacts, chats, user) => {
  //       this.contacts = contacts;
  //       this.chats = chats;
  //       this.user = user;
  //       // console.log('next.willCall')
  //       this.onUserUpdated.next(user);
  //       // console.log('next.called')
  //       // console.log(
  //       //   "contacts:",
  //       //   contacts,
  //       //   "\n chats:",
  //       //   chats,
  //       //   "\n currUser:",
  //       //   user
  //       // );
  //     }
  //   );
  // }
  // public getChatByContact(contactId): Observable<ChatCollection> {
  //   let chatInfo = this.user.chatInfo.find(chat => chat.contactId === contactId);
  //   this.collectionLoading = true;

  //   if (!chatInfo) {
  //     return this.createChatCollection(contactId)
  //       .switchMap(chatColl => {
  //         return this.getChatByContact(contactId)
  //       });
  //   }

  //   return this.getAllChats()
  //     .switchMap(chats => {
  //       let chatCollection = chats.find(chat => chat.id === chatInfo.chatId);
  //       let contact = this.contacts.find(
  //         contact => contact.id === contactId
  //       );

  //       this.onChatSelected.next({
  //         chatCollection: chatCollection,
  //         contact: contact
  //       });
  //       this.collectionLoading = false;
  //       return of(chatCollection);
  //     });
  // }

  // createChatCollection(contactId) {

  //   let contact = this.contacts.find(contact => contact.id === contactId);
  //   const chatId = (Math.random() * 1000000000).toString();

  //   const chatCollection: ChatCollection = {
  //     chats: []
  //   };

  //   let chatInfo = {
  //     chatId: chatId,
  //     lastChatTime: new Date(),
  //     contactId: contact.id,
  //     contactName: contact.name,
  //     unread: null
  //   };

  //   return this.http
  //     .post('api/chat-collections', { ...chatCollection })
  //     .switchMap(updatedChatCollection => {

  //       this.user.chatInfo.push(chatInfo);
  //       return this.updateUser(this.user)
  //         .pipe(switchMap((res) => {

  //           return this.getCurrentUser()
  //             .pipe(map(user => {
  //               this.user = user;
  //               // console.log(user)
  //               this.onUserUpdated.next(user)
  //             }))
  //         }));

  //     });
  // }

  // getAllContacts(): Observable<User[]> {
  //   return this.http.get<User[]>('api/contacts');
  // }
  // getAllChats(): Observable<ChatCollection[]> {
  //   return this.http.get<ChatCollection[]>('api/chat-collections');
  // }
  // getCurrentUser(): Observable<User> {
  //   return this.http.get<User>('api/chat-user')
  //     .pipe(map(res => res[0]));
  // }
  // updateUser(user: User): Observable<User> {
  //   return this.http.put<User>(`api/chat-user/${user.id}`, { ...user })
  // }
  // updateChats(chatId: string, chats: Chat[]): Observable<ChatCollection> {
  //   const chatCollection: ChatCollection = {
  //     chats: chats
  //   }
  //   return this.http.put<ChatCollection>('api/chat-collections', chatCollection)
  // }



}
