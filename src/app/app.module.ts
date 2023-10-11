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
    ReferenceComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
