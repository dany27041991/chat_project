import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { User, database } from 'firebase/app';
import { Profile } from '../../models/profile/profile.interface';
import { UUID } from 'angular2-uuid';

@Injectable()
export class DataProvider {

  profileObject: AngularFireObject<Profile>;
  profileList: AngularFireList<Profile>;

  constructor(private database: AngularFireDatabase) {
  }

  async saveProfile(user: User, profile: Profile) {
    this.profileObject = this.database.object(`/profiles/${user.uid}`);

    try {
      profile.mykey = UUID.UUID();
      await this.profileObject.set(profile);
      return true;
    }
    catch(e) {
      console.error(e);
      return false;
    }
  }

  getProfile(user: User) {
    this.profileObject = this.database.object(`/profiles/${user.uid}`);
    return this.profileObject.valueChanges();
  }

  searchUser(firstName: string) {
    const query = this.database.list('/profiles', query => query.orderByChild('firstName').equalTo(firstName));

    return query.valueChanges();
  }

  setUserOnline(profile: Profile) {
    const ref = database().ref(`online-users/${profile.mykey}`);

    try {
      ref.update({ ...profile});
      ref.onDisconnect().remove();
    }
    catch(e) {
      console.error(e);
    }
  }

  getOnlineUsers(): AngularFireList<Profile[]> {
    return <any>this.database.list(`online-users`).valueChanges();
  }

  deleteUserLogoutOnline(key: string) {
    database().ref(`/online-users/${key}`).remove();
  }

  getAllUsers() {
    return <any>this.database.list(`profiles`).valueChanges();
  }
  /*getAuthenticatedUserProfile() {
    return this.auth.getAuthenticatedUser().pipe(map(user => user.uid), mergeMap(authId => this.database.object(`profiles/${authId}`).snapshotChanges()))
  }*/
}
