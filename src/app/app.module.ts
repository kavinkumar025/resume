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

const firebaseConfig = {
  apiKey: "AIzaSyDDFRIxoujk_rAcWEM2DAzlDJu0iZE70z4",
  authDomain: "my-prortfolio-e2f51.firebaseapp.com",
  projectId: "my-prortfolio-e2f51",
  storageBucket: "my-prortfolio-e2f51.appspot.com",
  messagingSenderId: "119998992581",
  appId: "1:119998992581:web:0ff8cd31ff6dc9288d60ac",
  measurementId: "G-1M4V5XZHL3"
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