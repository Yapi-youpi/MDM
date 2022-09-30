import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigsService } from '../../../../../shared/services/configs.service';
import { IConfig } from '../../../../../shared/types/config';

@Component({
  selector: 'app-delete-config',
  templateUrl: './delete-config.component.html',
  styleUrls: ['./delete-config.component.scss'],
})
export class DeleteConfigComponent implements OnInit {
  @Input() currentConfig!: IConfig;
  @Output() onSubmit = new EventEmitter();
  constructor(private configService: ConfigsService) {}

  ngOnInit(): void {}

  removeConfig(id: string) {
    this.configService
      .delete(id)
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
    document.getElementById('modal-delete-config')?.classList.add('hidden');
  }
}
