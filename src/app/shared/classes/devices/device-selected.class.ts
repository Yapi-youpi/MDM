import { Injectable } from '@angular/core';
import { IDevice } from '../../types/devices';
import { DeviceClass } from './device.class';

@Injectable({
  providedIn: 'root',
})
export class DeviceSelectedClass {
  public isAllSelected: boolean = false;
  public selectedIDs: string[] = [];

  constructor(private device: DeviceClass) {}

  setElementSelection(device: IDevice) {
    this.device.array.map((d) => {
      if (d.device_id === device.device_id) {
        d.isSelected = !d.isSelected;

        if (d.isSelected && !this.selectedIDs.includes(d.device_id))
          this.selectedIDs.push(d.device_id);

        if (!d.isSelected && this.selectedIDs.includes(d.device_id))
          this.selectedIDs = this.selectedIDs.filter(
            (sd) => sd !== d.device_id
          );
      }
    });
  }

  setListOfSelected(devices: IDevice[]) {
    this.selectedIDs = devices.map((d) => d.device_id);
  }

  selectUnselectSingleDevice(device: IDevice) {
    this.setElementSelection(device);

    if (!device.isSelected && this.isAllSelected) {
      this.isAllSelected = !this.isAllSelected;
    }
    if (this.selectedIDs.length === this.device.array.length)
      this.isAllSelected = true;
  }

  selectUnselectDevices() {
    this.isAllSelected = !this.isAllSelected;

    this.setSelectionTotal(this.isAllSelected);

    if (this.isAllSelected) this.setListOfSelected(this.device.array);
    else this.setListOfSelected([]);
  }

  cancelSelection() {
    this.setListOfSelected([]);

    if (this.isAllSelected) this.isAllSelected = false;

    this.setSelectionTotal(false);
  }

  setSelectionTotal(value: boolean) {
    this.device.array.map((d) => {
      d.isSelected = value;
    });
  }
}
