import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { HOME_SEO, SeoService } from './seo.service';

describe('SeoService', () => {
  it('updates existing tags without duplicates and resets stale page data', () => {
    const service = TestBed.inject(SeoService);
    const document = TestBed.inject(DOCUMENT);
    const duplicate = document.createElement('link');
    duplicate.rel = 'canonical';
    document.head.appendChild(duplicate);
    service.update({title: 'Temporary page', path: '/temporary?filter=1#section', robots: 'noindex,follow', imageWidth: 1200});
    expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe('https://kavinkumar-resume.vercel.app/temporary');
    service.update();
    service.update();
    expect(TestBed.inject(Title).getTitle()).toBe(HOME_SEO.title);
    expect(TestBed.inject(Meta).getTags('name="description"').length).toBe(1);
    expect(TestBed.inject(Meta).getTag('name="robots"')?.content).toBe(HOME_SEO.robots);
    expect(TestBed.inject(Meta).getTag('property="og:image:width"')?.content).toBe('1440');
    expect(TestBed.inject(Meta).getTag('property="og:url"')?.content).toBe('https://kavinkumar-resume.vercel.app/');
    expect(document.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    expect(TestBed.inject(Meta).getTag('name="twitter:title"')?.content).toBe(HOME_SEO.title);
  });
});
