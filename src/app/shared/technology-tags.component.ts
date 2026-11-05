import { Component, Input } from '@angular/core';

/** Shared badges keep framework, project and certification labels consistent. */
@Component({
  selector: 'app-technology-tags',
  template: '<div class="technology-tags" [class.compact]="compact"><span *ngFor="let tag of tags">{{ tag }}</span></div>',
  styles: [`
    :host { display: block; margin-top: auto; padding-top: 8px; }
    .technology-tags { display: flex; flex-wrap: wrap; gap: 7px; }
    .technology-tags span { display: inline-flex; align-items: center; padding: 5px 9px; border-radius: 7px;
      background: rgba(139, 92, 246, .11); border: 1px solid rgba(139, 92, 246, .2);
      color: #c4b5fd; font-size: .72rem; line-height: 1.3; font-weight: 600; }
  `]
})
export class TechnologyTagsComponent {
  @Input() tags: readonly string[] = [];
  @Input() compact = false;
}
