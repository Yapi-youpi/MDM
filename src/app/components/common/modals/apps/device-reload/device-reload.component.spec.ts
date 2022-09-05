import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceReloadComponent } from './device-reload.component';

describe('DeviceReloadComponent', () => {
  let component: DeviceReloadComponent;
  let fixture: ComponentFixture<DeviceReloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceReloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceReloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
