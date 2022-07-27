import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import * as moment from "moment/moment";

@Injectable({
  providedIn: "root",
})
export class FilterGroupsService {
  public form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      "status-on": new FormControl(false),
      "status-off": new FormControl(false),
      "date-from": new FormControl({
        value: null,
        disabled: true,
      }),
      "date-to": new FormControl({
        value: null,
        disabled: true,
      }),
      config_ids: new FormControl(null),
    });
  }

  get _status() {
    return (this.form.getRawValue()["status-on"] &&
      this.form.getRawValue()["status-off"]) ||
      (!this.form.getRawValue()["status-on"] &&
        !this.form.getRawValue()["status-off"])
      ? null
      : this.form.getRawValue()["status-on"] &&
        !this.form.getRawValue()["status-off"]
      ? true
      : !this.form.getRawValue()["status-on"] &&
        this.form.getRawValue()["status-off"] &&
        false;
  }

  get _dateFrom() {
    return this.form.getRawValue()["date-from"]
      ? moment.utc(this.form.getRawValue()["date-from"]).format()
      : null;
  }

  get _dateTo() {
    return this.form.getRawValue()["date-to"]
      ? moment.utc(this.form.getRawValue()["date-to"]).format()
      : null;
  }

  get _configsIDs() {
    return this.form.getRawValue()["config_ids"];
  }

  reset() {
    this.form.reset({
      "status-on": false,
      "status-off": false,
      "date-from": null,
      "date-to": null,
      config_ids: null,
    });
  }
}
