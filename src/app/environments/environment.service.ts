import { Injectable } from '@angular/core';
import firebase, { initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  // private firebaseConfig = {
  //   apiKey: "YOUR_API_KEY",
  //   authDomain: "YOUR_AUTH_DOMAIN",
  //   databaseURL: "YOUR_DATABASE_URL",
  //   projectId: "my-prortfolio-e2f51",
  //   storageBucket: "YOUR_STORAGE_BUCKET",
  //   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  //   appId: "YOUR_APP_ID"
  // };

  private firebaseConfig = {
    apiKey: "AIzaSyDDFRIxoujk_rAcWEM2DAzlDJu0iZE70z4",
    authDomain: "my-prortfolio-e2f51.firebaseapp.com",
    projectId: "my-prortfolio-e2f51",
    storageBucket: "my-prortfolio-e2f51.appspot.com",
    messagingSenderId: "119998992581",
    appId: "1:119998992581:web:0ff8cd31ff6dc9288d60ac",
    measurementId: "G-1M4V5XZHL3"
  };

  // Initialize Firebase
  private app = initializeApp(this.firebaseConfig);
  private analytics = getAnalytics(this.app);

  constructor() {
    firebase.initializeApp(this.firebaseConfig);
  }
}
function getAnalytics(app: any) {
  throw new Error('Function not implemented.');
}

