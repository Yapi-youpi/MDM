import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DevicesConfigService } from '../../../services/devices-config.service';
import { DevicesConfig } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
})
export class ConfigurationComponent implements OnInit {
  public config!: DevicesConfig;
  constructor(
    private route: ActivatedRoute,
    private configService: DevicesConfigService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getConfig();
  }

  getConfig() {
    const id = this.route.snapshot.paramMap.get('id') || 'default';
    console.log(id);
    this.configService
      .getConfig(id)
      .then((res) => {
        this.config = Object.assign(res[0]);
        console.log(this.config);
      })
      .catch((err) => console.log(err));
  }

  goBack() {
    this.router.navigateByUrl('config');
  }
}
