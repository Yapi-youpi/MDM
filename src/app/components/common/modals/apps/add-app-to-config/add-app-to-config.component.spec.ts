import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppToConfigComponent } from './add-app-to-config.component';

describe('AddAppToConfigComponent', () => {
  let component: AddAppToConfigComponent;
  let fixture: ComponentFixture<AddAppToConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAppToConfigComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppToConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
