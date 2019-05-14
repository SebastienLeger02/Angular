import { Injectable } from '@angular/core';
import firebase from '../environments/firebase';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // méthode d'authentification
  auth(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
}

