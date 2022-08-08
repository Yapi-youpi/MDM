import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMenuBtnComponent } from './card-menu-btn.component';

describe('CardMenuBtnComponent', () => {
  let component: CardMenuBtnComponent;
  let fixture: ComponentFixture<CardMenuBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardMenuBtnComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMenuBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
