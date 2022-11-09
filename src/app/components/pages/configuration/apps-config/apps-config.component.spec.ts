import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsConfigComponent } from './apps-config.component';

describe('AppsConfigComponent', () => {
  let component: AppsConfigComponent;
  let fixture: ComponentFixture<AppsConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppsConfigComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
