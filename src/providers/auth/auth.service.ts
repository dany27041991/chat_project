import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Account } from '../../models/account/account.interface';
import { LoginResponse } from '../../models/login/login-response.interface';

@Injectable()
export class AuthProvider {

  constructor(private auth: AngularFireAuth) {  }

  async signInWithEmailAndPassword(account: Account) {
    try {
      return <LoginResponse> {
        result: await this.auth.auth.signInWithEmailAndPassword(account.email, account.password)
      };
    }
    catch(e) {
      return <LoginResponse> {
        error: e
      };
    }
  }

  async createUserWithEmailAndPassword(account: Account) {
    try {
      return <LoginResponse> {
        result: await this.auth.auth.createUserWithEmailAndPassword(account.email, account.password)
      }
    }
    catch(e) {
      return <LoginResponse> {
        error: e
      }
    }
  }

  getAuthenticatedUser() {
    return this.auth.authState;
  }

  signOut(): Promise<void> {
    return this.auth.auth.signOut();
  }
}
