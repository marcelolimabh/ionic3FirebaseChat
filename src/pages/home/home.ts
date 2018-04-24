import { User } from './../../models/user.model';
import { UserService } from './../../providers/user.service';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  users: Observable<User>;
  constructor(public navCtrl: NavController, private userService: UserService) {

  }

  ionViewDidLoad(){
    this.users = this.userService.getAll().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });
  }

  onSignup():void{
    console.log("onSignup!!!");
    this.navCtrl.push(SignupPage);
  }

  onChatCreate(user: User){
    console.log(user);

  }

}
