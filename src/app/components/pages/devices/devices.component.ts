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
import { EditDeviceService } from "../../../shared/services/forms/device/edit-device.service";
import { FilterDevicesService } from "../../../shared/services/forms/device/filter-devices.service";
import { AddDeviceService } from "../../../shared/services/forms/device/add-device.service";

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

  public edit: boolean = false;
  public password: string = "";
  public new_password: string = "";

  public currDevice!: Device;
  // public currQR: string = "";
  // public currName: string = "";
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
    private configService: DevicesConfigService, // public db: DatabaseService
    private editDeviceService: EditDeviceService,
    private filterDevicesService: FilterDevicesService,
    private addDeviceService: AddDeviceService
  ) {
    this.adminForm = new FormGroup({
      password: new FormControl("", Validators.required),
      confirmPassword: new FormControl("", Validators.required),
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

  searchDevicesWithParams() {
    this.devicesFilters.status = this.filterDevicesService._status;
    this.devicesFilters.dateFrom = this.filterDevicesService._dateFrom;
    this.devicesFilters.dateTo = this.filterDevicesService._dateTo;
    this.devicesFilters.groupsIDs = this.filterDevicesService._groupsIDs;
    this.devicesFilters.configsIDs = this.filterDevicesService._configsIDs;
  }

  setAddDeviceName() {
    this.addDeviceService.secondFormTitle = this.addDeviceService._name;

    const firstAddModal =
      this.elementRef.nativeElement.querySelector("#add_device");
    const secondAddModal =
      this.elementRef.nativeElement.querySelector("#add_device_params");

    M.Modal.getInstance(firstAddModal).close();
    M.Modal.getInstance(secondAddModal).open();
  }

  // addDevice() {
  //   console.log(this.addDeviceForm.getRawValue());
  //   // this.add_device = this.form.getRawValue();
  //   // this.device
  //   //   .addDevice(this.add_device)
  //   //   .then((res) => {
  //   //     console.log(res);
  //   //     this.getAllDevices();
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //     console.log(err.error.error);
  //   //   });
  // }

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

  getDeviceQRCode(device: Device) {
    this.currDevice = device;
  }

  editDevice(device: Device) {
    this.currDevice = device;
    this.editDeviceService.form.patchValue(device);
  }

  setDeviceSettings(device: Device) {
    this.deviceService
      .edit({
        ...device,
        name: this.editDeviceService._name,
        description: this.editDeviceService._description,
        device_group_id: this.editDeviceService._group_id,
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
