import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat.component';
import { environment } from 'src/environments/environment';
import { ChatRoutes } from './chat.routing';
import { ChatService } from 'src/app/core/services/chat.service';
import { CoreModule } from 'src/app/core/core.module';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
const config: SocketIoConfig = { url: environment.socketUrl, options: {} };
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    InfiniteScrollModule,
    // FlexLayoutModule,
    SocketIoModule.forRoot(config),
    RouterModule.forChild(ChatRoutes)
  ],
  declarations: [ChatComponent],
  providers: [ChatService]
})
export class ChatModule { }