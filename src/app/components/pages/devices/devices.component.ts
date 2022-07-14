import { Component, ElementRef, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { interval } from "rxjs";

import M from "materialize-css";

import { Device } from "../../../shared/interfaces/devices";
import { DevicesGroups } from "../../../shared/interfaces/groups";
import { DevicesConfig } from "../../../shared/interfaces/config";
import { DevicesFilter } from "../../../shared/interfaces/interfaces";
import { SingleDeviceState } from "../../../shared/interfaces/states";
import * as states from "../../../shared/interfaces/states";

import { UserService } from "../../../shared/services/user.service";
import { DevicesService } from "../../../shared/services/devices.service";
import { GroupsService } from "../../../shared/services/groups.service";
import { DevicesConfigService } from "../../../shared/services/devices-config.service";
import { EditDeviceService } from "../../../shared/services/forms/device/edit-device.service";
import { FilterDevicesService } from "../../../shared/services/forms/device/filter-devices.service";
import { AddDeviceService } from "../../../shared/services/forms/device/add-device.service";

import { EditSeveralDevicesService } from "../../../shared/services/forms/device/edit-several-devices.service";

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

  // private add_device!: Device; // ???

  public adminForm: FormGroup;

  public edit: boolean = false;
  public password: string = "";
  public new_password: string = "";

  public currDevice!: Device;
  public selectedDevicesIDs: string[] = [];

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
    private editSeveralDevicesService: EditSeveralDevicesService,
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

    // M.Modal.getInstance(
    //   this.elementRef.nativeElement.querySelector("#add_device_params")
    // ).open();
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
          // console.log(res.devices);
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

  cancelSelection() {
    this.selectedDevicesIDs = [];
    if (this.isAllSelected) this.isAllSelected = false;
    this.devices.map((d) => {
      if (d.isSelected) d.isSelected = false;
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
    this.cancelSelection();

    this.devicesFilters.status = this.filterDevicesService._status;
    this.devicesFilters.dateFrom = this.filterDevicesService._dateFrom;
    this.devicesFilters.dateTo = this.filterDevicesService._dateTo;
    this.devicesFilters.groupsIDs = this.filterDevicesService._groupsIDs;
    this.devicesFilters.configsIDs = this.filterDevicesService._configsIDs;
  }

  addDevice() {
    this.deviceService
      .add({
        name: this.addDeviceService._name,
        description: this.addDeviceService._desc,
        device_group_id: this.addDeviceService._group,
      })
      .then((res: SingleDeviceState) => {
        if (res.success) {
          this.currDevice = res.device;
          this.devices = [res.device, ...this.devices];

          const addModal =
            this.elementRef.nativeElement.querySelector("#add_device");
          const qrModal =
            this.elementRef.nativeElement.querySelector("#qr-code");

          M.Modal.getInstance(addModal).close();
          this.addDeviceService.resetForm();
          M.Modal.getInstance(qrModal).open();
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  selectUnselectDevices() {
    this.isAllSelected = !this.isAllSelected;

    this.devices.map((d) => {
      d.isSelected = this.isAllSelected;
    });

    if (this.isAllSelected)
      this.selectedDevicesIDs = this.devices.map((d) => d.device_id);
    else this.selectedDevicesIDs = [];
  }

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

  selectUnselectDevice(device: Device) {
    this.devices.map((d) => {
      if (d.device_id === device.device_id) {
        d.isSelected = !d.isSelected;

        if (d.isSelected && !this.selectedDevicesIDs.includes(d.device_id))
          this.selectedDevicesIDs.push(d.device_id);

        if (!d.isSelected && this.selectedDevicesIDs.includes(d.device_id))
          this.selectedDevicesIDs = this.selectedDevicesIDs.filter(
            (sd) => sd !== d.device_id
          );
      }
    });
    if (!device.isSelected && this.isAllSelected) {
      this.isAllSelected = !this.isAllSelected;
    }
    if (this.selectedDevicesIDs.length === this.devices.length)
      this.isAllSelected = true;
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

          this.devices.map((d) => {
            if (d === device) {
              d.active_state = !d.active_state;
            }
          });
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

          this.devices.map((d) => {
            if (d === device) {
              d.name = this.editDeviceService._name;
              d.description = this.editDeviceService._description;
              d.device_group_id = this.editDeviceService._group_id;
            }
          });

          const modal =
            this.elementRef.nativeElement.querySelector("#edit_device");
          M.Modal.getInstance(modal).close();
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

  setSeveralDevicesSettings() {
    console.log(this.selectedDevicesIDs);
    console.log(this.editSeveralDevicesService.form.getRawValue());
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

          this.devices = this.devices.filter((d) => d !== device);

          const modal =
            this.elementRef.nativeElement.querySelector("#delete_device");
          M.Modal.getInstance(modal).close();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteSeveralDevices() {
    console.log(this.selectedDevicesIDs);
  }
}
