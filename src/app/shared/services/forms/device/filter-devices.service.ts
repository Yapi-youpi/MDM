import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class FilterDevicesService {
  public form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      "status-on": new FormControl(false),
      "status-off": new FormControl(false),
      "date-from": new FormControl(null),
      "date-to": new FormControl(null),
      config_ids: new FormControl(null),
      group_ids: new FormControl(null),
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

  get _groupsIDs() {
    return this.form.getRawValue()["group_ids"] &&
      typeof this.form.getRawValue()["group_ids"] === "string"
      ? [this.form.getRawValue()["group_ids"]]
      : Array.isArray(this.form.getRawValue()["group_ids"])
      ? this.form.getRawValue()["group_ids"]
      : null;
  }

  get _configsIDs() {
    return this.form.getRawValue()["config_ids"] &&
      typeof this.form.getRawValue()["config_ids"] === "string"
      ? [this.form.getRawValue()["config_ids"]]
      : Array.isArray(this.form.getRawValue()["config_ids"])
      ? this.form.getRawValue()["config_ids"]
      : null;
  }

  reset() {
    this.form.reset({
      "status-on": false,
      "status-off": false,
      "date-from": null,
      "date-to": null,
      config_ids: null,
      group_ids: null,
    });
  }
}
