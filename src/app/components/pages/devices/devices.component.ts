import { Component, ElementRef, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';

import { UserService } from '../../../services/user.service';
import { DevicesService } from '../../../services/devices.service';
import { Device, DevicesConfig, Groups } from '../../../interfaces/interfaces';
import { GroupsService } from '../../../services/groups.service';
import { DevicesConfigService } from '../../../services/devices-config.service';
// import { DatabaseService } from "../../../services/database.service";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})
export class DevicesComponent implements OnInit {
  public devices: Device[] = [];
  public groups: Groups[] = [];
  public configs: DevicesConfig[] = [];
  public loading: boolean = true;

  private add_device!: Device; // ???

  public form!: FormGroup;
  public edit: boolean = false;
  public password: string = '';
  public new_password: string = '';

  public currID: string = '';
  public currQR: string = '';
  public currName: string = '';
  public isAllSelected: boolean = false;

  public sortStatusAsc: boolean = true;
  public sortDateAsc: boolean = true;
  public sortNameAsc: boolean = true;
  public sortGroupAsc: boolean = true;
  public sortPowerAsc: boolean = true;

  constructor(
    public userService: UserService,
    private device: DevicesService,
    private elementRef: ElementRef,
    private groupsService: GroupsService,
    private configService: DevicesConfigService // public db: DatabaseService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      imei: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      config: new FormControl('', Validators.required),
      group: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    let nonClosingModal =
      this.elementRef.nativeElement.querySelector('.non-closing');
    let closingModal =
      this.elementRef.nativeElement.querySelectorAll('.closing');

    /*    M.Modal.init(nonClosingModal, {
      dismissible: false,
      onCloseEnd: () => {
        this.form.reset();
      },
    });
    M.Modal.init(closingModal, {
      dismissible: true,
    });*/

    let i = interval(1000).subscribe(() => {
      if (this.userService.token) {
        i.unsubscribe();
        this.getAllDevices();
        this.getGroups();
        this.getConfigs();
      }
    });

    let selectsInter = interval(1000).subscribe(() => {
      const elems =
        this.elementRef.nativeElement.querySelectorAll('.config-select');
      // console.log(elems);
      if (elems && elems.length !== 0) {
        selectsInter.unsubscribe();
        // M.FormSelect.init(elems, {});
      }
    });

    //  Загрузить все возможные варианты конфигураций и групп и
    //  и подгрузить в селекты
  }

  changePassword(pass: string) {
    this.userService
      .changePassword(pass)
      .then((res) => {
        console.log(res);
        this.password = '';
        this.new_password = '';
      })
      .catch((res) => {
        console.log(res);
      });
  }

  getAllDevices() {
    this.device
      .getDevice('all')
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

  // saveChange() {
  //   this.device
  //     .editDevice(this.form.getRawValue())
  //     .then((res) => {
  //       console.log(res);
  //       this.getAllDevices();
  //       this.edit = false;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  setDeviceSettings(id: string) {
    console.log(id);
    console.log(this.form.getRawValue());

    this.form.controls['name'].setErrors({ invalid: 'Тестовая ошибка' });
    this.form.controls['desc'].setErrors({ invalid: 'Тестовая ошибка' });
    this.form.controls['phone'].setErrors({ invalid: 'Тестовая ошибка' });
    this.form.controls['imei'].setErrors({ invalid: 'Тестовая ошибка' });
    this.form.controls['model'].setErrors({ invalid: 'Тестовая ошибка' });
    // console.log(this.form);

    // const settingsModal =
    //   this.elementRef.nativeElement.querySelector("#edit_device");
    // M.Modal.getInstance(settingsModal).close();
  }

  getGroups() {
    this.groupsService.getGroups('all').then((res) => {
      this.groups = res;
    });
  }

  getConfigs() {
    this.configService.getConfig('all').then((res) => {
      this.configs = res;
    });
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

  selectUnselectDevices() {
    this.isAllSelected = !this.isAllSelected;

    this.devices.map((d) => {
      d.isSelected = this.isAllSelected;
    });
  }

  sortDevicesByStatus() {
    this.sortStatusAsc = !this.sortStatusAsc;
    //    CODE
  }
  sortDevicesByDate() {
    this.sortDateAsc = !this.sortDateAsc;
    //    CODE
  }
  sortDevicesByName() {
    this.sortNameAsc = !this.sortNameAsc;
    //    CODE
  }
  sortDevicesByGroup() {
    this.sortGroupAsc = !this.sortGroupAsc;
    //    CODE
  }
  sortDevicesByPower() {
    this.sortPowerAsc = !this.sortPowerAsc;
    //    CODE
  }

  // ЛОГИКА УПРАВЛЕНИЯ ДЕВАЙСОМ

  selectUnselectSingleDevice(device: Device) {
    this.devices.map((d) => {
      if (d.device_id === device.device_id) {
        d.isSelected = !d.isSelected;
      }
    });
    if (!device.isSelected && this.isAllSelected) {
      this.isAllSelected = !this.isAllSelected;
    }
  }

  changeDeviceConfig(device: Device, $event) {
    console.log($event.target.value);
    console.log(device.device_id);
  }

  getDeviceQRCode(name: string, qr: any) {
    this.currName = name;
    this.currQR = JSON.stringify(qr);
  }

  editDevice(device: Device) {
    this.currID = device.device_id;
    this.form.controls['name'].setValue(device.name);
    this.form.controls['desc'].setValue(device.description);
    this.form.controls['phone'].setValue(device.phone_number);
    this.form.controls['imei'].setValue(device.imei);
    this.form.controls['model'].setValue(device.model);
    this.form.controls['config'].setValue(device.device_config_id);
    this.form.controls['group'].setValue(device.device_group_id);
  }

  deleteDevice(id: string) {
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
}
