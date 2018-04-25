import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { BaseService } from './base.service';
import { Chat } from '../models/chat.model';
import { map } from 'rxjs/operators';


@Injectable()
export class ChatService  extends BaseService{

  chats: Observable<Chat[]>;

  constructor(public http: HttpClient, public af: AngularFireDatabase, private afAuth: AngularFireAuth) {
   super();
   this.setChats();
  }

  setChats(): void{
    /*
    this.afAuth.authState.subscribe((user) =>{
      if(user){
        console.log(`${user.uid}`);
        this.chats = <Observable<Chat[]>>this.af.list(`/chats/${user.uid}`, ref => ref.orderByChild('timestamp'))
        .valueChanges()
        .map((chats)=>{
          console.log(chats)
          if(chats && chats.length > 0){
            return chats.reverse();
          }
        });
      }
    }); */

    this.afAuth.authState.subscribe((user) => {
      if(user){
        this.chats = <Observable<Chat[]>>this.af.list(`/chats/${user.uid}`, ref => ref.orderByChild('timestamp'))

          .snapshotChanges()
          .map(
            changes => {
              console.log(`Changes => ${changes}`);
              return changes.map(c => ({
                key: c.payload.key, ...c.payload.val()
              }))
            });
      }
    });

  }

  create(chat: Chat, userId1: string, userId2: string): Promise<void>{
      return this.af.object(`/chats/${userId1}/${userId2}`)
      .set(chat)
      .catch(this.handlePromisseError);
  }

  getDeepChat(userId1: string, userId2: string): Observable<Chat>{
    return <Observable<Chat>>this.af.object(`/chats/${userId1}/${userId2}`)
    .valueChanges()
    .catch(this.handleObservableError);
  }

}
