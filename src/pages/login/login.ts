import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { LoginResponse } from '../../models/login/login-response.interface';
import { DataProvider } from '../../providers/data/data.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private toast: ToastController, private navCtrl: NavController, private data: DataProvider) {
  }

  login(event: LoginResponse) {

    if(!event.error) {
      this.toast.create({
        message: `Welcome to Chat, ${event.result.user.email}`,
        duration: 3000
      }).present();

      this.data.getProfile(event.result.user).subscribe(profile => {
        localStorage.setItem('selectedUser', JSON.stringify(profile));
        profile ? this.navCtrl.setRoot('TabsPage') : this.navCtrl.setRoot('EditProfilePage');
      })

    }
    else {
      this.toast.create({
        message: event.error.message,
        duration: 3000
      }).present();
    }
  }

}
