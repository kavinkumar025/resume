import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  totalExperience = '';
  currentJobDuration = '';

  ngOnInit(): void {
    this.calculateDurations();
  }

  private calculateDurations(): void {
    const now = new Date();

    const totalStart = new Date(2022, 8);
    let ty = now.getFullYear() - totalStart.getFullYear();
    let tm = now.getMonth() - totalStart.getMonth();
    if (tm < 0) { ty--; tm += 12; }
    this.totalExperience = ty > 0
      ? `${ty} yr${ty > 1 ? 's' : ''}${tm > 0 ? ' ' + tm + ' mo' : ''}`
      : `${tm} mo`;

    const curStart = new Date(2025, 0);
    let cy = now.getFullYear() - curStart.getFullYear();
    let cm = now.getMonth() - curStart.getMonth();
    if (cm < 0) { cy--; cm += 12; }
    this.currentJobDuration = cy > 0
      ? `${cy} yr${cy > 1 ? 's' : ''}${cm > 0 ? ' ' + cm + ' mo' : ''}`
      : `${cm} mo`;
  }
}

