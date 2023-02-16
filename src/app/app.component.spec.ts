import { CommonModule } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';


describe('Vizsgafeladat', () => {
  let router: Router;
  let fixture: ComponentFixture<AppComponent>;
  let app: HTMLElement;

  /**
   * Létrehoz egy fő komponenst, elvégez egy kezdeti navigációt a megadott route-ra.
   * Emellett beállítja a fixture és app változókat is.
   *
   * @param route A route. Ha nincs megadva, a főoldalra navigál.
   */
  function createApp(route?: string) {
    fixture = TestBed.createComponent(AppComponent)
    if (route === undefined) {
      router.initialNavigation();
    } else {
      router.navigate([route]);
    }
    tick();
    fixture.detectChanges();
    app = fixture.nativeElement as HTMLElement;
  }

  /**
   * A teszt sikeres, ha a navigációs sávban szerepel a paraméterben megadott url az adott szöveggel.
   *
   * @param url Az URL
   * @param title A link szövege
   */
  function expectLinkWithTitle(url: string, title: string) {
    const a = app.querySelector(`nav a[href="${url}"]`);
    expect(a).not.toBeNull();
    expect(a?.textContent).toContain(title);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        CommonModule,
      ],
      declarations: [
        AppComponent,
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
  });

  describe('1. feladat', () => {
    beforeEach(fakeAsync(() => createApp()));

    it('Van navigáció', () => {
      expect(app.querySelector('nav')).not.toBeNull();
    });

    it('Van lábléc', () => {
      const footer = app.querySelector('footer');
      expect(footer).not.toBeNull();
      expect(footer?.innerText).toMatch(/created by/i);
    });

    it('Van fő tartalom', () => {
      expect(app.querySelector('main')).not.toBeNull();
    });

    it('URL szerepel a navigációs sávban', () => {
      expectLinkWithTitle('/', 'Home');
    });

    it('Főoldalon megjelenik a tartalom', () => {
      expect(app.querySelectorAll('p').length).toBeGreaterThanOrEqual(4);
      expect(app.innerHTML).toContain('We hope you enjoy your stay!');
    });
  });

  describe('2. feladat', () => {
    beforeEach(fakeAsync(() => createApp('/history')));

    it('Navigációs sáv kitöltve', () => {
      expectLinkWithTitle('/history', 'History');
    });

    it('Szerepeljenek a 2. szintű címsorok', () => {
      const headings = app.querySelectorAll('h2');
      expect(headings.length).toBe(3);
      expect(headings[0].textContent).toContain('About our store');
      expect(headings[1].textContent).toContain('Famous plushies');
      expect(headings[2].textContent).toContain('Provide feedback');
    });

    it('Szerepeljenek a 3. szintű címsorok', () => {
      const headings = app.querySelectorAll('h3');
      expect(headings.length).toBe(3);
      expect(headings[0].textContent).toContain('Daniel the Dinosaur');
      expect(headings[1].textContent).toContain('Ted');
      expect(headings[2].textContent).toContain('Coffee Cat');
    });

    it('Szerepeljen a kép a megfelelő alternatív szöveggel', () => {
      const img = app.querySelector('img');
      expect(img).not.toBeNull();
      expect(img?.alt).toContain('Best Plushie Store award');
    });

    it('Szerepeljenek a form mezők a megfelelő típussal', () => {
      const emailField = app.querySelector('input[type=email]');
      expect(emailField).not.toBeNull();

      const textField = app.querySelector('textarea');
      expect(textField).not.toBeNull();

      const button = app.querySelector('button[type=submit], input[type=submit]') as HTMLInputElement | HTMLButtonElement | null;
      expect(button).not.toBeNull();
      let content = button?.value || button?.textContent;
      expect(content).toContain('Submit');
    });
  });

  describe('3. feladat', () => {
    beforeEach(fakeAsync(() => createApp('/toys')));

    it('Navigációs sáv kitöltve', () => {
      expectLinkWithTitle('/toys', 'Plush toys');
    });

    it('Szerepeljen az idézet a megfelelő HTML tagben', () => {
      const quote = app.querySelector('blockquote');
      expect(quote).not.toBeNull();
      expect(quote?.textContent).toContain('I never sleep alone');
    });

    it('Szerepeljenek a listaelemek', () => {
      const listItems = app.querySelectorAll('ul li:not(nav li)');
      expect(listItems.length).toBe(8);
      expect(listItems[0].textContent).toContain('Bears');
    });
  });

  describe('4. feladat', () => {
    beforeEach(fakeAsync(() => createApp('/')));

    it('A 3 plüss jelenjen meg a főoldalon', fakeAsync(() => {
      expect(app.innerHTML).toMatch(/Plush tiger/i);
      expect(app.innerHTML).toMatch(/Kangaroo/i);
      expect(app.innerHTML).toMatch(/Teddy Family/i);
    }));
  });

  describe('5. feladat', () => {
    beforeEach(fakeAsync(() => createApp('/')));

    it('Navigációs sáv kitöltve', () => {
      expectLinkWithTitle('/new-plushie', 'New plushie');
    });
  });

  describe('6. feladat', () => {
    beforeEach(fakeAsync(() => createApp('/')));

    it('Navigációs sáv kitöltve', () => {
      expectLinkWithTitle('/inventory', 'Inventory');
    });
  });
});
