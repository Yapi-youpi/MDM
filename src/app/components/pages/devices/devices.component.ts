import { Component, ElementRef, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { interval } from "rxjs";
import M from "materialize-css";
// import {
//   NgxQrcodeElementTypes,
//   NgxQrcodeErrorCorrectionLevels,
// } from "@techiediaries/ngx-qrcode";

import { UserService } from "../../../services/user.service";
import { DevicesService } from "../../../services/devices.service";
import { Device, DevicesConfig, Groups } from "../../../interfaces/interfaces";
import { GroupsService } from "../../../services/groups.service";
import { DevicesConfigService } from "../../../services/devices-config.service";
import { DatabaseService } from "../../../services/database.service";

@Component({
  selector: "app-devices",
  templateUrl: "./devices.component.html",
  styleUrls: ["./devices.component.css"],
})
export class DevicesComponent implements OnInit {
  public password = "";
  public new_password = "";
  public devices: Device[] = [];
  public form: FormGroup;
  private add_device!: Device;
  public edit = false;
  public loading = true;
  public groups: Groups[] = [];
  public configs: DevicesConfig[] = [];
  // public elementType = NgxQrcodeElementTypes.URL;
  // public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  public valueQR = "";
  public currentTitle = "";

  constructor(
    public userService: UserService,
    private device: DevicesService,
    private elementRef: ElementRef,
    private groupsService: GroupsService,
    private configService: DevicesConfigService // public db: DatabaseService
  ) {
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      phone_number: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      device_config_id: new FormControl("02e0f851-9b85-4c10-8814-4beb70134b63"),
      device_group_id: new FormControl("bc5a083f-1361-4619-b4ec-2a81cdbe6a26"),
      device_id: new FormControl(""),
    });
  }

  ngOnInit(): void {
    // let elem = this.elementRef.nativeElement.querySelectorAll(".modal");
    let nonClosingModal =
      this.elementRef.nativeElement.querySelector(".non-closing");
    let closingModal =
      this.elementRef.nativeElement.querySelectorAll(".closing");

    // const options = {
    //   dismissible: false,
    //   onCloseEnd: () => {
    //     this.form.reset();
    //     // this.edit = false;
    //   },
    // };

    // let q = this.db.query("Device");

    // q.findAll().then((res) => {
    //   res.map(() => {
    //     // console.log(device.toJSON());
    //   });
    // });

    M.Modal.init(nonClosingModal, {
      dismissible: false,
      onCloseEnd: () => {
        this.form.reset();
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

  getAllDevices() {
    this.device
      .getDevice("all")
      .then((res: { devices: Device[]; success: boolean; error: string }) => {
        console.log(res);
        this.loading = false;
        this.devices = res.devices;
        this.sortDevices();
      })
      .catch((err) => {
        console.log(err.error.error);
      });
  }

  addDevice() {
    this.add_device = this.form.getRawValue();
    this.device
      .addDevice(this.add_device)
      .then((res) => {
        console.log(res);
        this.getAllDevices();
      })
      .catch((err) => {
        console.log(err);
        console.log(err.error.error);
      });
  }

  editDevice(device: Device) {
    let i = interval(1000).subscribe(() => {
      let elem = this.elementRef.nativeElement.querySelector("select");
      if (elem) {
        i.unsubscribe();
        M.FormSelect.init(elem);
      }
    });
    this.edit = true;
    this.form.addControl("imei", new FormControl(device.imei));
    this.form.addControl(
      "device_group_id",
      new FormControl(device.device_group_id)
    );
    this.form.addControl("model", new FormControl(device.model));
    this.form.addControl(
      "device_config_id",
      new FormControl(device.device_config_id)
    );
    this.form.addControl("online_state", new FormControl(device.online_state));
    this.form.addControl("active_state", new FormControl(device.active_state));
    this.form.addControl(
      "battery_percent",
      new FormControl(device.battery_percent)
    );
    this.form.addControl(
      "launcher_version",
      new FormControl(device.launcher_version)
    );
    this.form.addControl("qr_code", new FormControl(device.qr_code));
    this.form.patchValue(device);
  }

  saveChange() {
    this.device
      .editDevice(this.form.getRawValue())
      .then((res) => {
        console.log(res);
        this.getAllDevices();
        this.edit = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  removeDevice(id: string) {
    this.device
      .removeDevice(id)
      .then((res) => {
        console.log(res);
        this.getAllDevices();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getGroups() {
    this.groupsService.getGroups("all").then((res) => {
      this.groups = res;
    });
  }

  getConfigs() {
    this.configService
      .getConfig("all")
      .then(
        (res: {
          success: boolean;
          error: string;
          devicesConfigs: DevicesConfig[];
        }) => {
          this.configs = res.devicesConfigs;
        }
      );
  }

  sortDevices() {
    this.devices.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  getQR(title: string, qr: any) {
    this.currentTitle = title;
    this.valueQR = JSON.stringify(qr);
  }
}
