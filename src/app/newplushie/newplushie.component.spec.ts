import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewplushieComponent } from './newplushie.component';

describe('NewplushieComponent', () => {
  let component: NewplushieComponent;
  let fixture: ComponentFixture<NewplushieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewplushieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewplushieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
