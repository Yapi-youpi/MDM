import { Component, ElementRef, OnInit } from "@angular/core";
import { DevicesConfigService } from "../../../shared/services/devices-config.service";
import { UserService } from "../../../shared/services/user.service";
import { interval } from "rxjs";
import { DevicesConfig } from "../../../interfaces/interfaces";
import M from "materialize-css";

@Component({
  selector: "app-configs",
  templateUrl: "./configs.component.html",
  styleUrls: ["./configs.component.css"],
})
export class ConfigsComponent implements OnInit {
  public name = "";
  public default_config!: DevicesConfig;
  public configs: DevicesConfig[] = [];
  public loading = true;
  public rename = "";
  public id = "";
  constructor(
    private configService: DevicesConfigService,
    private userService: UserService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    let rename = this.elementRef.nativeElement.querySelectorAll(".modal");
    let config = this.elementRef.nativeElement.querySelectorAll(".modal");
    M.Modal.init(rename);
    M.Modal.init(config);
    let i = interval(1000).subscribe(() => {
      if (this.userService.token) {
        i.unsubscribe();
        this.getDefaultConfig();
        this.getAllConfigs();
      }
    });
  }

  getDefaultConfig() {
    this.configService
      .getConfig("default")
      .then(
        (res: {
          devicesConfigs: DevicesConfig[];
          error: string;
          success: boolean;
        }) => {
          this.default_config = Object.assign(res.devicesConfigs[0]);
          console.log(this.default_config);
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }

  getAllConfigs() {
    this.configService
      .getConfig("all")
      .then(
        (res: {
          devicesConfigs: DevicesConfig[];
          error: string;
          success: boolean;
        }) => {
          console.log(res.devicesConfigs);
          this.loading = false;
          this.configs = res.devicesConfigs;
          this.sortConfigs();
        }
      )
      .catch((err) => {
        console.log(err.error.error);
      });
  }

  addConfig(name: string) {
    this.configService
      .addConfig(this.default_config, name)
      .then((res) => {
        console.log(res);
        this.getAllConfigs();
        this.name = "";
      })
      .catch((err) => {
        console.log(err.error.error);
        this.getAllConfigs();
      });
  }

  removeConfig(id: string) {
    this.configService
      .removeConfig(id)
      .then((res) => {
        console.log(res);
        this.getAllConfigs();
      })
      .catch((err) => {
        console.log(err.error.error);
      });
  }

  renameConfig(id: string, name: string) {
    this.configService
      .renameConfig(id, name)
      .then(() => {
        this.getAllConfigs();
        this.rename = "";
      })
      .catch((err) => {
        console.log(err.error.error);
      });
  }

  getID(id: string) {
    console.log("aaaaaa");
    this.id = id;
  }

  sortConfigs() {
    this.configs.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else {
        return -1;
      }
    });
  }
}
