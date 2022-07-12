import { Component, ElementRef, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { interval } from "rxjs";
import * as moment from "moment";

import M from "materialize-css";

import { Device } from "../../../interfaces/devices";
import { DevicesGroups } from "../../../interfaces/groups";
import { DevicesConfig } from "../../../interfaces/config";
import { DevicesFilter } from "../../../interfaces/interfaces";
import * as states from "../../../interfaces/states";

import { UserService } from "../../../shared/services/user.service";
import { DevicesService } from "../../../shared/services/devices.service";
import { GroupsService } from "../../../shared/services/groups.service";
import { DevicesConfigService } from "../../../shared/services/devices-config.service";

@Component({
  selector: "app-devices",
  templateUrl: "./devices.component.html",
  styleUrls: ["./devices.component.css"],
})
export class DevicesComponent implements OnInit {
  public devices: Device[] = [];
  public groups: DevicesGroups[] = [];
  public configs: DevicesConfig[] = [];
  public loading: boolean = true;

  private add_device!: Device; // ???

  public adminForm: FormGroup;
  public addDeviceForm: FormGroup;
  public isAddDeviceFormSubmitted: boolean = false;
  public editDeviceForm: FormGroup;
  public isEditDeviceFormSubmitted: boolean = false;
  public filterForm: FormGroup;

  public edit: boolean = false;
  public password: string = "";
  public new_password: string = "";

  public currDevice!: Device;
  public currQR: string = "";
  public currName: string = "";
  public isAllSelected: boolean = false;

  public sortStatusAsc: boolean = true;
  public sortDateAsc: boolean = true;
  public sortNameAsc: boolean = true;
  public sortGroupAsc: boolean = true;
  public sortBatteryAsc: boolean = true;

  public searchParam: string = "";

  public devicesFilters: DevicesFilter = {
    status: null,
    dateFrom: null,
    dateTo: null,
    configsIDs: null,
    groupsIDs: null,
  };

  constructor(
    public userService: UserService,
    private deviceService: DevicesService,
    private elementRef: ElementRef,
    private groupsService: GroupsService,
    private configService: DevicesConfigService // public db: DatabaseService
  ) {
    this.adminForm = new FormGroup({
      password: new FormControl("", Validators.required),
      confirmPassword: new FormControl("", Validators.required),
    });
    this.addDeviceForm = new FormGroup({
      name: new FormControl("", Validators.required),
      desc: new FormControl("", [
        Validators.required,
        Validators.maxLength(60),
      ]),
      config_id: new FormControl("", Validators.required),
      group_id: new FormControl("", Validators.required),
    });
    this.editDeviceForm = new FormGroup({
      name: new FormControl("", Validators.required),
      desc: new FormControl("", [
        Validators.required,
        Validators.maxLength(60),
      ]),
      config_id: new FormControl(""),
      group_id: new FormControl(""),
    });
    this.filterForm = new FormGroup({
      "status-on": new FormControl(false),
      "status-off": new FormControl(false),
      "date-from": new FormControl(null),
      "date-to": new FormControl(null),
      config_ids: new FormControl(null),
      group_ids: new FormControl(null),
    });
  }

  ngOnInit(): void {
    let nonClosingModal =
      this.elementRef.nativeElement.querySelector(".non-closing");
    let closingModal =
      this.elementRef.nativeElement.querySelectorAll(".closing");

    M.Modal.init(nonClosingModal, {
      dismissible: false,
      onCloseEnd: () => {
        this.adminForm.reset();
      },
    });

    M.Modal.init(closingModal, {
      dismissible: true,
    });

    let i = interval(1000).subscribe(() => {
      if (this.userService.token) {
        i.unsubscribe();
        this.getAllDevices();
        this.getGroups();
        this.getConfigs();
      }
    });

    // M.Modal.getInstance(nonClosingModal).open();
  }

  changePassword(pass: string) {
    this.userService
      .changePassword(pass)
      .then((res) => {
        console.log(res);
        this.password = "";
        this.new_password = "";
      })
      .catch((res) => {
        console.log(res);
      });
  }

  // ПЕРВЫЕ ВЫПОЛНЯЕМЫЕ Ф-ЦИИ

  getConfigs() {
    this.configService
      .getConfig("all")
      .then((res: states.DevicesConfigsState) => {
        if (res.success) {
          this.configs = res.devicesConfigs;
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getGroups() {
    this.groupsService
      .getGroups("all")
      .then((res: states.DevicesGroupsState) => {
        if (res.success) {
          this.groups = res.devicesGroups;
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getAllDevices() {
    this.loading = true;

    this.deviceService
      .get("all")
      .then((res: states.DevicesState) => {
        if (res.success) {
          this.loading = false;
          this.devices = res.devices;
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        console.log(err.error.error);
      });
  }

  onChangeSearchInputHandler(value: string) {
    this.searchParam = value;
  }

  resetSearchParams() {
    this.devicesFilters.status = null;
    this.devicesFilters.dateFrom = null;
    this.devicesFilters.dateTo = null;
    this.devicesFilters.configsIDs = null;
    this.devicesFilters.groupsIDs = null;
  }

  searchDevicesWithParams(form: FormGroup) {
    this.devicesFilters.status =
      (form.getRawValue()["status-on"] && form.getRawValue()["status-off"]) ||
      (!form.getRawValue()["status-on"] && !form.getRawValue()["status-off"])
        ? null
        : form.getRawValue()["status-on"] && !form.getRawValue()["status-off"]
        ? true
        : !form.getRawValue()["status-on"] &&
          form.getRawValue()["status-off"] &&
          false;

    this.devicesFilters.dateFrom = form.getRawValue()["date-from"]
      ? moment.utc(form.getRawValue()["date-from"]).format()
      : null;
    this.devicesFilters.dateTo = form.getRawValue()["date-to"]
      ? moment.utc(form.getRawValue()["date-to"]).format()
      : null;
    this.devicesFilters.groupsIDs = form.getRawValue()["group_ids"];
    this.devicesFilters.configsIDs = form.getRawValue()["config_ids"];
  }

  addDevice() {
    // this.add_device = this.form.getRawValue();
    // this.device
    //   .addDevice(this.add_device)
    //   .then((res) => {
    //     console.log(res);
    //     this.getAllDevices();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err.error.error);
    //   });
  }

  selectUnselectDevices() {
    this.isAllSelected = !this.isAllSelected;

    this.devices.map((d) => {
      d.isSelected = this.isAllSelected;
    });
  }

  // СОРТИРОВКА

  changeSortStatusDir() {
    this.sortStatusAsc = !this.sortStatusAsc;
  }
  changeSortDateDir() {
    this.sortDateAsc = !this.sortDateAsc;
  }
  changeSortNameDir() {
    this.sortNameAsc = !this.sortNameAsc;
  }
  changeSortGroupDir() {
    this.sortGroupAsc = !this.sortGroupAsc;
  }
  changeSortBatteryDir() {
    this.sortBatteryAsc = !this.sortBatteryAsc;
  }

  // ЛОГИКА УПРАВЛЕНИЯ ДЕВАЙСОМ

  selectUnselectDevice(device: Device) {
    this.devices.map((d) => {
      if (d.device_id === device.device_id) {
        d.isSelected = !d.isSelected;
      }
    });
    if (!device.isSelected && this.isAllSelected) {
      this.isAllSelected = !this.isAllSelected;
    }
  }

  changeDeviceState(device: Device) {
    this.deviceService
      .edit({
        ...device,
        active_state: !device.active_state,
      })
      .then((res: states.SingleDeviceState) => {
        if (res.success) {
          console.log(`Устройство ${device.name} изменено`);
          this.getAllDevices();
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getDeviceQRCode(name: string, qr: any) {
    this.currName = name;
    this.currQR = JSON.stringify(qr);
  }

  editDevice(device: Device) {
    this.currDevice = device;
    this.editDeviceForm.controls["name"].setValue(device.name);
    this.editDeviceForm.controls["desc"].setValue(device.description);
    this.editDeviceForm.controls["config_id"].setValue(device.device_config_id);
    this.editDeviceForm.controls["group_id"].setValue(device.device_group_id);
  }

  setDeviceSettings(device: Device) {
    this.deviceService
      .edit({
        ...device,
        name: this.editDeviceForm.getRawValue()["name"],
        description: this.editDeviceForm.getRawValue()["desc"],
        device_config_id: this.editDeviceForm.getRawValue()["config_id"],
        device_group_id: this.editDeviceForm.getRawValue()["group_id"],
      })
      .then((res: states.SingleDeviceState) => {
        if (res.success) {
          console.log(`Устройство ${device.name} изменено`);
          this.getAllDevices();
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    const settingsModal =
      this.elementRef.nativeElement.querySelector("#edit_device");
    M.Modal.getInstance(settingsModal).close();
  }

  setDeviceToDelete(device: Device) {
    this.currDevice = device;
  }

  deleteDevice(device: Device) {
    this.deviceService
      .delete(device.device_id)
      .then((res: states.SingleDeviceState) => {
        if (res.success) {
          console.log(`Устройство ${device.name} удалено`);
          this.getAllDevices();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
