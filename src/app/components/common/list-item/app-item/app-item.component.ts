import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { IApp } from '../../../../shared/types/apps';
import { appsPaths as api } from '../../../../shared/enums/api';

import { environment } from '../../../../../environments/environment';
import { AppClass } from '../../../../shared/classes/apps/app.class';
import { edit } from '../../../../shared/services/forms/app';

@Component({
  selector: 'app-app-item',
  templateUrl: './app-item.component.html',
  styleUrls: ['./app-item.component.scss'],
})
export class AppItemComponent {
  @Input() app!: IApp;

  @ViewChild('name') nameRef!: ElementRef;
  @ViewChild('nametip') nametipRef!: ElementRef;
  @ViewChild('version') versionRef!: ElementRef;
  @ViewChild('vtip') vtipRef!: ElementRef;

  public isChildrenHidden: boolean = true;

  public url: string = environment.url + api.GET_ICON;

  constructor(private apps: AppClass, private editForm: edit) {}

  get _height() {
    return this.isChildrenHidden
      ? 60
      : 60 + (40 + 1) * (this.app.children?.length || 0);
  }

  displayNameTip() {
    if (
      this.nameRef.nativeElement.offsetWidth <
      this.nameRef.nativeElement.scrollWidth
    ) {
      this.nametipRef.nativeElement.style.visibility = 'visible';
      this.nametipRef.nativeElement.style.opacity = 1;
    }
  }
  hideNameTip() {
    this.nametipRef.nativeElement.style.visibility = 'hidden';
    this.nametipRef.nativeElement.style.opacity = 0;
  }

  displayVTip() {
    if (
      this.versionRef.nativeElement.offsetWidth <
      this.versionRef.nativeElement.scrollWidth
    ) {
      this.vtipRef.nativeElement.style.visibility = 'visible';
      this.vtipRef.nativeElement.style.opacity = 1;
    }
  }
  hideVTip() {
    this.vtipRef.nativeElement.style.visibility = 'hidden';
    this.vtipRef.nativeElement.style.opacity = 0;
  }

  toggleChildren() {
    this.isChildrenHidden = !this.isChildrenHidden;
  }

  onEditClickHandler(app: IApp) {
    this.apps.setCurrent(app);
    this.editForm.form.patchValue(app);
  }

  onDeleteClickHandler(app: IApp) {
    this.apps.setCurrent(app);
  }
}
