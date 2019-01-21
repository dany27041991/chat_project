import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../../providers/data/data.service';
import { AuthProvider } from '../../providers/auth/auth.service';
import { User } from 'firebase';
import { AngularFireList } from '@angular/fire/database';
import { Profile } from '../../models/profile/profile.interface';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'app-online-users',
  templateUrl: 'online-users.component.html'
})
export class OnlineUsersComponent implements OnInit {

  private authUser: User;
  userList: AngularFireList<Profile[]>;
  currentProfile: Profile;
  userKey: string;

  constructor(private data: DataProvider, private auth: AuthProvider, private navCtrl: NavController) {
    this.currentProfile = JSON.parse(localStorage.getItem('selectedUser'));
    this.userKey = this.currentProfile.mykey;
  }

  ngOnInit() {
    this.setUserOnline();
    this.getOnlineUsers();
  }

  setUserOnline() {
    this.auth.getAuthenticatedUser().subscribe(auth => {
      this.authUser = auth;

      if(this.authUser !== null) {
        this.data.getProfile(this.authUser).subscribe((profile: Profile) =>
        {
          this.data.setUserOnline(profile);
        })
      }
    })
  }

  getOnlineUsers() {
    this.userList = this.data.getOnlineUsers();
  }

  openChat(profile: Profile) {
    this.navCtrl.push('MessagePage', { profile });
  }
}
