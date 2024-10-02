import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './profile/about/about.component';
import { HeaderComponent } from './profile/header/header.component';
import { IntroductionComponent } from './profile/introduction/introduction.component';
import { ExperienceComponent } from './profile/experience/experience.component';
import { EducationComponent } from './profile/education/education.component';
import { SkillComponent } from './profile/skill/skill.component';
import { ContactComponent } from './profile/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ScrollComponent } from './profile/scroll/scroll.component';
import { ReferenceComponent } from './profile/reference/reference.component';
import { initializeApp } from '@angular/fire/app';
import { getFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import * as CryptoJS from 'crypto-js';

const firebaseConfigEncrypt = {
  apiKey: "U2FsdGVkX19sZDlwVg+VxbD5ubgGxmlYdBQnA701qtsmWJ9XRHYJeVGAE8z4QW+ghdl0jP3hkvTMnQbzyJvfmQ==",
  authDomain: "U2FsdGVkX1+SIiR+OjbZO9zyq/+m/IOAAmHvNG6NN0mvF14CTJzlLxwB51kjYFVFk0w0Zhlv/feeRIEVeHFFGQ==",
  projectId: "U2FsdGVkX1/Ds+KVsIX57AItE2aon9GVavct3WgUfkyHQeAnj3ujT7PaifctOHpM",
  storageBucket: "U2FsdGVkX19EDCVfkzMZjCQr0MTGGf0ky8LTBVy1zEmx7DbtG7yGETpW5R/b1MSE",
  messagingSenderId: "U2FsdGVkX1+fUQXwsX8IQf8y4/sHOGEnUauLX1o/VqE=",
  appId: "U2FsdGVkX1+ZErWwT2V5R/TEceHlCx9p91/kuBkaKZg2JcwTipdFToP9B9z8NJw9uIVN92he1yUSjNXpiWNbPA==",
  measurementId: "U2FsdGVkX1+T447NcH/CNYYbM41gbNdyfq6h/mgrYr8="
}

function decryptConfig(value: string): string {
  return CryptoJS.AES.decrypt(value, 'KavinKumar').toString(CryptoJS.enc.Utf8);
}

const firebaseConfig = {
  apiKey: decryptConfig(firebaseConfigEncrypt.apiKey),
  authDomain: decryptConfig(firebaseConfigEncrypt.authDomain),
  projectId: decryptConfig(firebaseConfigEncrypt.projectId),
  storageBucket: decryptConfig(firebaseConfigEncrypt.storageBucket),
  messagingSenderId: decryptConfig(firebaseConfigEncrypt.messagingSenderId),
  appId: decryptConfig(firebaseConfigEncrypt.appId),
  measurementId: decryptConfig(firebaseConfigEncrypt.measurementId),
};

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    AboutComponent,
    HeaderComponent,
    IntroductionComponent,
    ExperienceComponent,
    EducationComponent,
    SkillComponent,
    ContactComponent,
    ScrollComponent,
    ReferenceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [{
    provide: 'firebaseApp',
    useFactory: () => initializeApp(firebaseConfig)
  },
  {
    provide: 'firestore',
    useFactory: () => getFirestore()
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }