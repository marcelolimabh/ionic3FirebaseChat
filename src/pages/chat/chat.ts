import { Message } from './../../models/message.model';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../../providers/user.service';
import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from './../../models/user.model';
import { MessageService } from '../../providers/message.service';
import firebase from 'firebase';



@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  messages: Observable<Message[]>;
  newMessage: string = '';
  pageTitle: string;
  sender: User;
  recipient: User;

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public messageService: MessageService,
    public userService: UserService) {
  }

  ionViewDidLoad() {
    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle = this.recipient.name;
    this.userService.currentUser.first().subscribe((currentUser: User) => {
      this.sender = currentUser;
      this.getAllMessages();
    });
  }



  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  public sendMessage(newMessage: string): void {
    if(newMessage){
      let timestamp = firebase.database.ServerValue.TIMESTAMP;
      this.messageService.create(
        new Message(
          this.sender._key,
          newMessage,
          timestamp
        ),
        this.recipient._key
      );
      this.getAllMessages();
    }
  }

  getAllMessages(){

    this.messages = this.messageService.getMessages(this.sender._key, this.recipient._key);
    this.messages.first()
    .subscribe((ms: Message[])=>{
      if(ms.length === 0){
        this.messages = this.messageService.getMessages(this.recipient._key, this.sender._key);
      }
    });
  }

}
