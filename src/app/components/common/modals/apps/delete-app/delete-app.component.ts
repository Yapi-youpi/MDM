import { Component } from '@angular/core';
import { AppLoaderClass } from '../../../../../shared/classes/apps/app-loader.class';
import { AppClass } from '../../../../../shared/classes/apps/app.class';

@Component({
  selector: 'app-delete-app',
  templateUrl: './delete-app.component.html',
  styleUrls: ['./delete-app.component.scss'],
})
export class DeleteAppComponent {
  constructor(private loader: AppLoaderClass, private apps: AppClass) {}

  get _loading() {
    return this.loader.loading;
  }

  get _current() {
    return this.apps.current;
  }

  onSubmitHandler() {
    if (this.apps.current) {
      this.apps.delete(this.apps.current).then((res) => {
        if (res) {
          this.closeModal();
        }
      });
    }
  }

  closeModal() {
    const modal = document.querySelector('#delete_app');
    if (!modal?.classList.contains('hidden')) modal?.classList.toggle('hidden');
  }
}
