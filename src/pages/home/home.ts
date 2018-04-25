import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../providers/auth.service';
import { ChatPage } from './../chat/chat';
import { ChatService } from './../../providers/chat.service';
import { Chat } from '../../models/chat.model';
import { SignupPage } from './../signup/signup';
import { User } from './../../models/user.model';
import { UserService } from './../../providers/user.service';
import firebase from 'firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  view: string = 'chats';
  users: Observable<User[]>;
  constructor(public navCtrl: NavController,
    private userService: UserService,
    private authService: AuthService,
    private chatService: ChatService) {

  }

  ionViewCanEnter(): Promise<boolean>{
    return this.authService.authenticated;
  }

  ionViewDidLoad(){
   this.users = this.userService.users;
  }

  onSignup():void{
    this.navCtrl.push(SignupPage);
  }

  onChatCreate(recipientUser: User){
    this.userService.currentUser
    .first()
    .subscribe((currentUser: User)=>{
        this.chatService.getDeepChat(currentUser._key, recipientUser._key)
        .first()
        .subscribe((chat: Chat)=>{

          if(chat == null){
            //Obter o timestamp do servidor
            let timestamp: Object = firebase.database.ServerValue.TIMESTAMP;

            let chat1 = new Chat('',timestamp,recipientUser.name, '');
            //Cria o primeiro chat
            this.chatService.create(chat1, currentUser._key, recipientUser._key);

            //Cria o segundo chat
            let chat2 = new Chat('', timestamp, currentUser.name, '');
            this.chatService.create(chat2, recipientUser._key, currentUser._key);
          }
        });
    });
    this.navCtrl.push(ChatPage, {
      recipientUser: recipientUser
    });
  }

}
