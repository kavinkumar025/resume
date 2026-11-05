import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('keeps the drawer open while the page scrolls and closes on Escape', () => {
    component.toggleMenu();
    fixture.detectChanges();
    expect(component.menuOpen).toBeTrue();
    component.onWindowScroll();
    expect(component.menuOpen).toBeTrue();
    component.onKeydown(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(component.menuOpen).toBeFalse();
    expect(document.body.classList.contains('mobile-nav-open')).toBeFalse();
  });

  it('closes after selecting a section', () => {
    component.toggleMenu();
    fixture.detectChanges();
    const event = new MouseEvent('click', { cancelable: true });
    component.scrollTo('about', event);
    expect(component.menuOpen).toBeFalse();
    expect(event.defaultPrevented).toBeTrue();
  });
});
