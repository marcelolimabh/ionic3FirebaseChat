import { NavController, AlertController, App, MenuController } from 'ionic-angular';
import { AuthService } from '../providers/auth.service';
import { OnInit } from '@angular/core';
import { SigninPage } from '../pages/signin/signin';
export abstract class BaseComponent implements OnInit{


  protected navCtrl: NavController
  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public app: App,
    public menuCtrl: MenuController){

  }

  ngOnInit(): void {
    this.navCtrl = this.app.getActiveNav();
  }

  onLogout(): void{
    this.alertCtrl.create({
      message: 'Você deseja sair?',
      buttons: [{
        text: 'Sim',
        handler: () =>{
          this.authService.logout()
          .then(() => {
            this.navCtrl.setRoot(SigninPage);
          });
        }
      },
    {
      text: 'Não',


    }]
    }).present();
  }

}
