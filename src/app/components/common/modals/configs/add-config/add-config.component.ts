import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigsService } from '../../../../../shared/services/configs.service';
import { IConfig } from '../../../../../shared/types/config';

@Component({
  selector: 'app-add-config',
  templateUrl: './add-config.component.html',
  styleUrls: ['./add-config.component.scss'],
})
export class AddConfigComponent implements OnInit {
  @Input() configs: IConfig[] = [];
  @Input() default_config!: IConfig;
  public newConfigForm: FormGroup;
  @Output() onSubmit = new EventEmitter();
  constructor(private configService: ConfigsService) {
    this.newConfigForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      prototype: new FormControl(''),
    });
    this.newConfigForm.controls['prototype'].setValue(
      'Стандартная конфигурация',
      {
        onlySelf: true,
      }
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
      .add(prototype, name, description)
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
