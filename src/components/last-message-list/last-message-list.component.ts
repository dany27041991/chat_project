import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat/chat.service';
import { NavController } from 'ionic-angular';
import { Message } from '../../models/messages/message.interface';
import { Profile } from '../../models/profile/profile.interface';

@Component({
  selector: 'app-last-message-list',
  templateUrl: 'last-message-list.component.html'
})
export class LastMessageListComponent implements OnInit {

  public lastMexObj: Message[] = [];
  selectedProfile: Profile;
  currentProfile: Profile;
  userKey: string;

  constructor(private chat: ChatService, private navCtrl: NavController) {
    this.chat.last.subscribe((data: Message[]) => {
      this.lastMexObj.splice(0);
      Object.keys(data).forEach(k => {
        this.lastMexObj.push(data[k]);
      });
    });
    /*this.currentProfile = JSON.parse(localStorage.getItem('selectedUser'));
    this.userKey = this.currentProfile.mykey;
    this.chat.last.subscribe((data: Message[]) => {
      Object.keys(data).forEach(k => {
        const keysender = data[k].userFromId;
        let mexRiceived: Message = data[k];
        if(this.userKey !== keysender) {
          this.lastMexObj.push(mexRiceived);
        }
      });
    })*/
  }

  ngOnInit() {
    this.chat.getLastMessageForUser();
  }

  navigateToMessage(message: Message) {

    const selectedProfile = {
      mykey: message.userFromId,
      firstName: message.userFromProfile.firstName,
      lastName: message.userFromProfile.lastName
    }

    this.navCtrl.push('MessagePage', {profile: selectedProfile})
  }
}
