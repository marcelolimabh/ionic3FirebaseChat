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
import { CapitalizePipe } from './../pipes/capitalize.pipe';
import { ChatPage } from './../pages/chat/chat';
import { CustomLoggedHeaderComponent } from './../components/custom-logged-header/custom-logged-header';
import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';
import { SigninPage } from './../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { UserService} from '../providers/user.service';
import { ChatService } from '../providers/chat.service';
import { MessageService } from './../providers/message.service';



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
    CapitalizePipe,
    ChatPage,
    CustomLoggedHeaderComponent,
    HomePage,
    MyApp,
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
    ChatPage,
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
    ChatService,
    MessageService
  ]
})
export class AppModule {}
