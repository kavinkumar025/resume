import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  robots: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  type: string;
}

export const HOME_SEO: PageSeo = {
  title: 'Kavinkumar M | Next.js Developer & Open-Source Package Author',
  description: 'Explore projects by Kavinkumar M, an Angular and Next.js developer and creator of the next-server-api-debugger npm package. Read engineering insights and view my work.',
  path: '/', robots: 'index,follow,max-image-preview:large',
  image: '/assets/images/img4.jpg',
  imageAlt: 'Portrait of Kavinkumar M, Angular Developer',
  imageWidth: 1440, imageHeight: 1440, type: 'profile'
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly origin = 'https://kavinkumar-resume.vercel.app';

  constructor(private title: Title, private meta: Meta, @Inject(DOCUMENT) private document: Document) {}

  /** Each call starts with complete defaults so previous page metadata cannot leak. */
  update(page: Partial<PageSeo> = {}): void {
    const data = { ...HOME_SEO, ...page };
    const canonical = new URL(data.path, this.origin);
    canonical.hash = '';
    canonical.search = '';
    const image = new URL(data.image, this.origin).href;
    this.title.setTitle(data.title);
    const tags: Record<string, string> = {
      description: data.description, robots: data.robots,
      'og:type': data.type, 'og:site_name': 'Kavinkumar Portfolio',
      'og:title': data.title, 'og:description': data.description,
      'og:url': canonical.href, 'og:image': image, 'og:image:alt': data.imageAlt,
      'twitter:card': 'summary_large_image', 'twitter:title': data.title,
      'twitter:description': data.description, 'twitter:image': image, 'twitter:image:alt': data.imageAlt
    };
    for (const [key, content] of Object.entries(tags)) {
      const attr = key.startsWith('og:') ? 'property' : 'name';
      const selector = `${attr}="${key}"`;
      const existing = this.meta.getTags(selector);
      existing.slice(1).forEach(tag => this.meta.removeTagElement(tag));
      this.meta.updateTag({ [attr]: key, content }, selector);
    }
    for (const [key, value] of [['og:image:width', data.imageWidth], ['og:image:height', data.imageHeight]] as const) {
      this.meta.removeTag(`property="${key}"`);
      if (value) this.meta.addTag({ property: key, content: String(value) });
    }
    const links = Array.from(this.document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'));
    const link = links.shift() ?? this.document.createElement('link');
    links.forEach(duplicate => duplicate.remove());
    link.rel = 'canonical';
    link.href = canonical.href;
    if (!link.parentNode) this.document.head.appendChild(link);
  }
}
