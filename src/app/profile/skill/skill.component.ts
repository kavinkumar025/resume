import { Component } from '@angular/core';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent {
  readonly groups = [
    { title: 'Frontend frameworks', description: 'Interfaces that scale.', icon: 'fa-brands fa-angular', tags: ['Angular (13+)', 'Next.js', 'React', 'Kendo UI / Telerik'] },
    { title: 'Languages & foundations', description: 'A strong foundation for every build.', icon: 'fa-solid fa-code', tags: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3 / SCSS', 'Java', 'C'] },
    { title: 'UI engineering', description: 'From reusable components to complete experiences.', icon: 'fa-solid fa-layer-group', tags: ['Bootstrap 5', 'Responsive design', 'Component architecture', 'API integration', 'State management'] },
    { title: 'SEO & performance', description: 'Built to be found. Designed to be fast.', icon: 'fa-solid fa-gauge-high', tags: ['Technical SEO', 'Core Web Vitals', 'SSR / SSG', 'Progressive enhancement', 'JSON-LD'] },
    { title: 'Backend & quality', description: 'Reliable systems, carefully tested.', icon: 'fa-solid fa-terminal', tags: ['Firebase', 'SQL / Data modelling', 'Stored procedures', 'Node.js', 'Express.js', 'Jasmine / Karma', 'SonarQube', 'Mocha'] },
    { title: 'Tools & workflow', description: 'The tools behind the craft.', icon: 'fa-solid fa-code-branch', tags: ['VS Code', 'Git', 'TortoiseSVN', 'Jenkins', 'AWS CodeCommit', 'S3 Bucket'] }
  ];
}
