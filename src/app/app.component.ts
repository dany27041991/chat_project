import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // classe che si vuole caricare. in questo caso si riferisce alla login.ts
  rootPage: string;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    //this.auth.getAuthenticatedUser().subscribe(auth => {
      //!auth ? this.rootPage = 'LoginPage' : this.rootPage = 'MessagePage';
    //})

    platform.ready().then(() => {

      this.rootPage = 'LoginPage';
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

