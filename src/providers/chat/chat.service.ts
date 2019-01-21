import { Injectable, Output, EventEmitter } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Channel } from "../../models/channel/channel.interface";
import { ChannelMessage } from "../../models/channel/channel-message.interface";
import { Message } from "../../models/messages/message.interface";
import { UUID } from 'angular2-uuid';
import { Observable} from "rxjs/Rx";
import { Profile } from "../../models/profile/profile.interface";

@Injectable()
export class ChatService {

    keys: Observable<{}[]>;
    private userProfile: Profile;
    messages: Message[] = [];
    lastMessages: Message[] = [];
    filteredArray: Message[];

    @Output() chat = new EventEmitter<Message[]>();
    @Output() last = new EventEmitter<Message[]>();

    constructor(private database: AngularFireDatabase) {

    }

    addChannel(channelName: string) {
        this.database.list(`channel-names`).push({ name: channelName, mykey: UUID.UUID() });
    }

    getChannelListRef(): AngularFireList<Channel> {
        return <any>this.database.list(`channel-names`).valueChanges();
    }

    getChannelChatRef(channelKey: string): AngularFireList<ChannelMessage[]> {
        return <any>this.database.list(`channels/${channelKey}`).valueChanges();
    }

    async sendChannelChatMessage(channelKey: string, message: ChannelMessage) {
        await this.database.list(`channels/${channelKey}`).push(message);
    }

    async sendChat(message: Message) {
        await this.database.list(`/messages`).push(message);
    }

    getChats(userTwoId: string) {
      this.userProfile = JSON.parse(localStorage.getItem('selectedUser'));
      this.database.list(`/messages/`).valueChanges().subscribe((message: Message[]) => {
        this.messages.splice(0);
        Object.keys(message).forEach(k => {
          if((message[k].userFromId === userTwoId && message[k].userToId === this.userProfile.mykey) ||
            (message[k].userToId === userTwoId && message[k].userFromId === this.userProfile.mykey)){
              this.messages.push(message[k]);
          }
        })
        this.chat.emit(this.messages);
      });
    }

    getLastMessageForUser() {
      this.userProfile = JSON.parse(localStorage.getItem('selectedUser'));
      this.database.list(`/last-messages/${this.userProfile.mykey}`).valueChanges().subscribe(data => {
        this.database.list(`/messages/`).valueChanges().subscribe((lastmessages: Message[]) => {
          this.lastMessages.splice(0);
          for (let key of data) {
            Object.keys(lastmessages).forEach(k => {
              if (lastmessages[k].mykey === key['key'] && lastmessages[k].userToId === this.userProfile.mykey) {
                this.lastMessages.push(lastmessages[k]);
              }
            })
          }
          this.last.emit(this.lastMessages);
        })
      })
    }
}
