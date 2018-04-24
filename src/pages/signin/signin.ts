import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { UserService } from '../../providers/user.service';
import { AuthService } from '../../providers/auth.service';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signinForm: FormGroup;
  constructor(private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private userService: UserService,
    private authService: AuthService) {

    this.signinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
      password: ['', Validators.required]
    });
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');

  }

  onSubmit(){
    let loading = this.showLoading();
    let user = this.signinForm.value;

    this.authService.signinwithEmail({ email: user.email, password: user.password }).then((isAuthenticated) => {
      console.log(`Usuário autenticado: ${user.email}`);
      loading.dismiss()
      this.navCtrl.push(HomePage);
    }).catch((errorMsg: string) => {
      loading.dismiss();
      this.showAlert(errorMsg);
    });

  }

  onSignup(){

    console.log('Sign up!!!');
    this.navCtrl.push(SignupPage);
  }

  showLoading():Loading{
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

  onHomePage(): void{
    this.navCtrl.push(HomePage).then((hasAccess: boolean)=>{
      console.log('Autorizado:', hasAccess);
    }).catch((err) =>{
      console.log('Não Autorizado');
  });
}

  onLogout(): void{
    this.authService.logout();
  }

}
