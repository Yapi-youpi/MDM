import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DevicesConfig } from '../../../../../interfaces/interfaces';
import { DevicesConfigService } from '../../../../../services/devices-config.service';

@Component({
  selector: 'app-add-config',
  templateUrl: './add-config.component.html',
  styleUrls: ['./add-config.component.scss'],
})
export class AddConfigComponent implements OnInit {
  @Input() configs: DevicesConfig[] = [];
  @Input() default_config!: DevicesConfig;
  public newConfigForm: FormGroup;
  @Output() onSubmit = new EventEmitter();
  constructor(private configService: DevicesConfigService) {
    this.newConfigForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      prototype: new FormControl(''),
    });
    this.newConfigForm.controls['prototype'].setValue(
      'Стандартная конфигурация',
      { onlySelf: true }
    );
  }

  ngOnInit(): void {}

  addConfig(value: any) {
    const name = value.name;
    const description = value.description;
    const config = value.prototype;
    const prototype =
      config === 'Стандартная конфигурация'
        ? this.default_config
        : this.configs.find((conf) => conf.name === config);
    this.configService
      .addConfig(prototype, name, description)
      .then((res) => {
        console.log(res);
        this.closeModal();
        this.onSubmit.emit();
      })
      .catch((err) => {
        console.log(err.error.error);
      });
  }

  closeModal() {
    document.getElementById('modal-add-config')?.classList.add('hidden');
  }
}
