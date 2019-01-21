import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from '@angular/fire';
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule} from '@angular/fire/database';

import { MyApp } from './app.component';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AuthProvider } from '../providers/auth/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DataProvider } from '../providers/data/data.service';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../providers/chat/chat.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DataProvider,
    ChatService
  ]
})
export class AppModule {}