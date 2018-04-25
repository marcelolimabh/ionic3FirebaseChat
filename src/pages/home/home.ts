import { ChatPage } from './../chat/chat';
import { User } from './../../models/user.model';
import { UserService } from './../../providers/user.service';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../providers/auth.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  view: string = 'chats';
  users: Observable<User[]>;
  constructor(public navCtrl: NavController, private userService: UserService, private authService: AuthService) {

  }

  ionViewCanEnter(): Promise<boolean>{
    return this.authService.authenticated;
  }

  ionViewDidLoad(){
   /*  this.users = this.userService.getAll().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      }); */
   this.users = this.userService.getAll();
  }

  onSignup():void{
    console.log("onSignup!!!");
    this.navCtrl.push(SignupPage);
  }

  onChatCreate(user: User){
    console.log(user);
    this.navCtrl.push(ChatPage, {
      recipientUser: user
    })

  }

}
