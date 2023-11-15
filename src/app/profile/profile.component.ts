import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  public onRightClick(event: MouseEvent): void {
    event.preventDefault();
    console.log('Right-click is Disabled !');
  }

}
