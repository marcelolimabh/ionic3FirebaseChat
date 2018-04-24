import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import 'rxjs/add/operator/first';

import { AuthService } from './../../providers/auth.service';
import { UserService } from './../../providers/user.service';


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private userService: UserService,
    private authService: AuthService) {

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
      password: ['', Validators.required]
    });
  }




  onSubmit(): void {
    let loading: Loading = this.showLoading();
    let formUser = this.signupForm.value;
    let username: string = formUser.username;
    this.userService.userExists(username).first().subscribe((isUsernameExisting: boolean) => {
      if (!isUsernameExisting) {
        this.authService.createAuthUser({
          email: formUser.email,
          password: formUser.password
        }).then((authState) => {
          delete formUser.password;
          formUser.uid = authState.uid;
          this.userService.create(formUser).then(() => {
            console.log('Usuário Criado.');
            loading.dismiss();
            this.navCtrl.push(HomePage);
          }).catch((error: Error) => {
            console.log(error);
            loading.dismiss();
            this.showAlert(error.message)
          });
        }).catch((error: Error) => {
          console.log(error);
          loading.dismiss();
          this.showAlert(error.message);
        });
      } else {
        this.showAlert(`O username ${username} já está sendo usado em outra conta!`);
        loading.dismiss();
      }
    });
  }


  showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por favor Aguarde...'
    });
    loading.present();
    return loading;
  }

  showAlert(message: string) {
    this.alertCtrl.create({
      message: message,
      buttons: ['OK']
    }).present();
  }

}
