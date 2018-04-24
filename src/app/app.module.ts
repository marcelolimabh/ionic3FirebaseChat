import { SigninPage } from './../pages/signin/signin';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {AngularFireModule, FirebaseAppConfig } from 'angularfire2';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthService } from '../providers/auth.service';
import { CustomLoggedHeaderComponent } from './../components/custom-logged-header/custom-logged-header';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { UserService} from '../providers/user.service';



const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyD5LYmY49t3nLy-nsb5GJIeCi4j0DZUnQ4",
  authDomain: "ionic3-firabase-chat.firebaseapp.com",
  databaseURL: "https://ionic3-firabase-chat.firebaseio.com",
  projectId: "ionic3-firabase-chat",
  storageBucket: "ionic3-firabase-chat.appspot.com",
  messagingSenderId: "730625937929"
};

@NgModule({
  declarations: [
    CustomLoggedHeaderComponent,
    MyApp,
    HomePage,
    SignupPage,
    SigninPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CustomLoggedHeaderComponent,
    MyApp,
    HomePage,
    SignupPage,
    SigninPage
  ],
  providers: [
    AuthService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
  ]
})
export class AppModule {}
