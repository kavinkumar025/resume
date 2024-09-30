import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

@Injectable({
  providedIn: 'root'
})

export class EnvironmentService {

  public app: FirebaseApp;
  public firebaseConfig = {
    apiKey: "AIzaSyDDFRIxoujk_rAcWEM2DAzlDJu0iZE70z4",
    authDomain: "my-prortfolio-e2f51.firebaseapp.com",
    projectId: "my-prortfolio-e2f51",
    storageBucket: "my-prortfolio-e2f51.appspot.com",
    messagingSenderId: "119998992581",
    appId: "1:119998992581:web:0ff8cd31ff6dc9288d60ac",
    measurementId: "G-1M4V5XZHL3"
  };

  constructor() {
    this.app = initializeApp(this.firebaseConfig);
  }

}