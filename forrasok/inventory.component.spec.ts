import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';
import { InventoryComponent } from './inventory.component';

// Mock fetch function that returns a known, dummy data
const mockFetch = async function (requestInfo: RequestInfo | URL, init?: RequestInit) {
  return {
    status: 200,
    statusText: 'OK',
    ok: true,
    json: async () => {
      return [
        { name: 'bbb', creator: 'Bob' },
        { name: 'aaa', creator: 'Joe' },
      ];
    }
  } as Response;
}

describe('6. feladat', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;

  beforeEach(async () => {
    spyOn(window, 'fetch').and.callFake(mockFetch);
    await TestBed.configureTestingModule({
      declarations: [InventoryComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Jelenítse meg a betöltés képet', () => {
    const element = fixture.nativeElement as HTMLElement;
    const image = element.querySelector('img');
    expect(image).not.toBeNull();
    expect(image?.alt).toMatch(/Loading/i);
  });

  it('A lekérés után jelenítse meg a táblázatot, rejtse el a képet', async () => {
    const element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    expect(element.querySelector('img')).not.toBeNull();
    expect(element.querySelector('table')).toBeNull();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(element.querySelector('img')).toBeNull();
    expect(element.querySelector('table')).not.toBeNull();
    expect(element.innerHTML).toContain('aaa');
    expect(element.innerHTML).toContain('bbb');
  });
});
