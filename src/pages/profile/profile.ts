import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';
import { AuthProvider } from '../../providers/auth/auth.service';
import {DataProvider} from "../../providers/data/data.service";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  existingProfile = {} as Profile;

  constructor(private navCtrl: NavController, private auth: AuthProvider, private data: DataProvider) {
  }

  getExistingProfile(profile: Profile) {
    this.existingProfile = profile;
  }

  navigateToEditProfilePage() {
    this.navCtrl.push('EditProfilePage', { existingProfile: this.existingProfile });
  }

  signout() {
    const key = JSON.parse(localStorage.getItem('selectedUser')).mykey;
    this.data.deleteUserLogoutOnline(key);
    this.auth.signOut();
    localStorage.removeItem('selectedUser');
    localStorage.removeItem('firebase:host:ionic-chat-44e31.firebaseio.com');
    this.navCtrl.setRoot('LoginPage');
  }
}
