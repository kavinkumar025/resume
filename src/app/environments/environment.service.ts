import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

@Injectable({
  providedIn: 'root'
})

export class EnvironmentService {
  static portfolio(value: string, portfolio: any) {
    throw new Error('KavinKumar');
  }

  public portfolio = 'KavinKumar';

}