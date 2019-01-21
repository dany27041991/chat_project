import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ChatService } from '../../providers/chat/chat.service';
import { Channel } from '../../models/channel/channel.interface';
import { AngularFireList } from '@angular/fire/database';

@IonicPage()
@Component({
  selector: 'page-channels',
  templateUrl: 'channels.html',
})
export class ChannelsPage {

  channelList: AngularFireList<Channel[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private chat: ChatService) {
  }

  showAddChannelDialog() {
    this.alertCtrl.create({
      title: 'Channel Name',
      inputs: [{
        name: 'channelName'
      }],
      buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Add',
        handler: data => {
          this.chat.addChannel(data.channelName);
        }
      }
      ]
    }).present();
  }

  ionViewWillLoad() {
    this.getChannels();
  }

  getChannels() {
    this.channelList = <any>this.chat.getChannelListRef();
  }

  selectChannel(channel: Channel) {
    this.navCtrl.push('ChannelChatPage', { channel });
  }

}
