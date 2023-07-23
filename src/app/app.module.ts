import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './profile/about/about.component';
import { HeaderComponent } from './profile/header/header.component';
import { IntroductionComponent } from './profile/introduction/introduction.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    AboutComponent,
    HeaderComponent,
    IntroductionComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
