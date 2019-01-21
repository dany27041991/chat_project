import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Channel } from '../../models/channel/channel.interface';
import { ChatService } from '../../providers/chat/chat.service';
import { AngularFireList } from '@angular/fire/database';
import { ChannelMessage } from '../../models/channel/channel-message.interface';

@IonicPage()
@Component({
  selector: 'page-channel-chat',
  templateUrl: 'channel-chat.html',
})
export class ChannelChatPage {

  channel: Channel;
  channelMessages: AngularFireList<ChannelMessage[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private chat: ChatService) {
  }

  ionViewWillLoad() {
    this.channel = this.navParams.get('channel');

    this.channelMessages = this.chat.getChannelChatRef(this.channel.mykey);
  }

  sendMessage(content: string) {
    let channelMessage: ChannelMessage = {
      content
    }

    this.chat.sendChannelChatMessage(this.channel.mykey, channelMessage);
  }
}
