import { Injectable } from '@angular/core';
import { device } from '../../services/forms';

@Injectable()
export class DeviceFiltersClass {
  public status: boolean | null = null;
  public dateFrom: string | null = null;
  public dateTo: string | null = null;
  public groupsIDs: string[] | null = null;
  public configsIDs: string[] | null = null;

  constructor(private form: device.filter) {}

  resetAll() {
    this.status = null;
    this.dateFrom = null;
    this.dateTo = null;
    this.configsIDs = null;
    this.groupsIDs = null;
  }

  setParams() {
    this.status = this.form._status;
    this.dateFrom = this.form._dateFrom;
    this.dateTo = this.form._dateTo;
    this.groupsIDs = this.form._groupsIDs;
    this.configsIDs = this.form._configsIDs;
  }

  resetParam(
    type: 'status' | 'dateFrom' | 'dateTo' | 'configsIDs' | 'groupsIDs',
    value?: string
  ) {
    switch (type) {
      case 'status': {
        this.status = null;
        if (this.form.form.controls['status-on'].value === true)
          this.form.form.controls['status-on'].setValue(false);
        if (this.form.form.controls['status-off'].value === true)
          this.form.form.controls['status-off'].setValue(false);
        break;
      }
      case 'dateFrom': {
        this.dateFrom = null;
        this.form.form.controls['date-from'].setValue(null);
        break;
      }
      case 'dateTo': {
        this.dateTo = null;
        this.form.form.controls['date-to'].setValue(null);
        break;
      }
      case 'configsIDs': {
        if (value) {
          const prevValues: string[] =
            this.form.form.controls['config_ids'].value;
          const newValues = prevValues.filter((c) => c !== value);
          this.form.form.controls['config_ids'].setValue(newValues);
          this.configsIDs = newValues;
        }
        break;
      }
      case 'groupsIDs': {
        if (value) {
          const prevValues: string[] =
            this.form.form.controls['group_ids'].value;
          const newValues = prevValues.filter((c) => c !== value);
          this.form.form.controls['group_ids'].setValue(newValues);
          this.groupsIDs = newValues;
        }
        break;
      }
      default:
        return;
    }
  }
}
