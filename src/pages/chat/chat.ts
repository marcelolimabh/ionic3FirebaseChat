import { UserService } from './../../providers/user.service';
import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from './../../models/user.model';


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  messages: string[] = [];
  newMessage: string = '';
  pageTitle: string;
  sender: User;
  recipient: User;

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService) {
  }

  ionViewDidLoad() {
    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle = this.recipient.name;
    this.userService.currentUser.first().subscribe((currentUser: User) => {
      this.sender = currentUser;
    });
  }



  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  public sendMessage(newMessage: string): void {
    this.messages.push(newMessage);
  }

}
