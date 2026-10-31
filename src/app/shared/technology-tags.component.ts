import { Component, Input } from '@angular/core';

/** Shared badges keep framework, project and certification labels consistent. */
@Component({
  selector: 'app-technology-tags',
  template: '<div [class.project-tech]="compact" [class.tools-tags]="!compact"><span *ngFor="let tag of tags" [class.tool-tag]="!compact">{{ tag }}</span></div>'
})
export class TechnologyTagsComponent {
  @Input() tags: readonly string[] = [];
  @Input() compact = false;
}
