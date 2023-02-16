import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';
import { PlushieComponent } from './plushie.component';

describe('4. feladat', () => {
  let component: PlushieComponent;
  let fixture: ComponentFixture<PlushieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlushieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlushieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Jelenítsen meg egy plüss állat komponenst helyesen', () => {
    component.name = 'Test Plush';
    component.price = 1.89;
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const h3 = element.querySelector('h3');
    expect(h3).not.toBeNull();
    expect(h3?.innerText).toContain('Test Plush');

    const p = element.querySelector('p');
    expect(p).not.toBeNull();
    expect(p?.textContent).toMatch(/\$1[,.]89/);
  });
});
