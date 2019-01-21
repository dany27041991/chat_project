import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';
import { Message } from '../../models/messages/message.interface';
import { User } from 'firebase';
import { ChatService } from '../../providers/chat/chat.service';
import { UUID } from 'angular2-uuid';

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  @ViewChild('scrollBottom') content: Content;
  selectedProfile: Profile;
  authUser: User;
  userProfile: Profile;
  mex: Message[];
  userLoggedIn: string;
  userId: string

  constructor(public navCtrl: NavController, public navParams: NavParams, private chat: ChatService) {
    this.chat.chat.subscribe((data: Message[]) => {
      this.mex = data.sort((a, b): any => {
        return a.datetime - b.datetime
      })
      this.scrollBottom(1000,0);
    })
  }

  ionViewDidLoad(){
    this.scrollBottom(1000,0);
  }

  ionViewDidEnter() {
    this.scrollBottom(1000,0);
  }

  ionViewWillLoad() {
    this.selectedProfile = this.navParams.get('profile');
    this.userProfile = JSON.parse(localStorage.getItem('selectedUser'));
    this.userId = this.userProfile.mykey;
    /*this.auth.getAuthenticatedUser().subscribe(auth => this.userId = auth.uid);
    this.auth.getAuthenticatedUser().subscribe(auth => {
      this.authUser = auth;

      if(this.authUser !== null) {
        this.data.getProfile(this.authUser).subscribe((profile: Profile) =>
        {
            this.userProfile = profile;
            console.log(this.userProfile);
        })
      }
    })*/
    this.chat.getChats(this.selectedProfile.mykey);
    this.userLoggedIn = this.selectedProfile.mykey;
  }

  async sendMessage(content: string) {
    try {
      const message: Message = {
        userToId: this.selectedProfile.mykey,
        userToProfile: {
          firstName: this.selectedProfile.firstName,
          lastName: this.selectedProfile.lastName
        },
        userFromId: this.userProfile.mykey,
        userFromProfile: {
          firstName: this.userProfile.firstName,
          lastName: this.userProfile.lastName
        },
        content: content,
        mykey: UUID.UUID(),
        datetime: new Date().getTime()
      }
      await this.chat.sendChat(message);
      this.chat.getChats(this.selectedProfile.mykey);
      this.scrollBottom(1000,0);
    }
    catch(e) {
      console.log(e);
    }
  }

  scrollBottom(duration, timeout) {
    if(this.content._scroll) {
      setTimeout(() => {
        this.content.scrollToBottom(duration);
      }, timeout);
    }
  }

}
