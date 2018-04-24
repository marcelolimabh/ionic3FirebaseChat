import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { BaseService } from './base.service';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService extends BaseService{

  constructor(public http: HttpClient, private fireBaseAuth: AngularFireAuth) {
    super();
    console.log('Hello AuthProvider Provider');
  }

  createAuthUser(user:{email: string, password}): Promise<any>{
    return this.fireBaseAuth.auth.createUserWithEmailAndPassword(user.email, user.password).catch(this.handlePromisseError);
  }

  signinwithEmail(user: {email: string, password: string}): Promise<boolean>{
    return this.fireBaseAuth.auth.signInWithEmailAndPassword(user.email, user.password).then((authState)=>{
      console.log(authState);

        return authState != null;
    }).catch(this.handlePromisseError);
  }

  logout(): Promise<any>{
    console.log('logout');
    return this.fireBaseAuth.auth.signOut();
  }

  get authenticated(): Promise<boolean>{
    return new Promise((resolve, reject)=>{
      this.fireBaseAuth.authState.first().subscribe((authState) =>{
        (authState) ? resolve(true) : reject(false);
      });
    });
  }

}
