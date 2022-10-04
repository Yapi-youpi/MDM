import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { AssetService } from '../../../../../shared/services/asset.service';
import { filter } from '../../../../../shared/services/forms/user';
import { UsersClass } from '../../../../../shared/classes/users/users.class';

@Component({
  selector: 'app-filter-user',
  templateUrl: './filter-user.component.html',
  styleUrls: ['./filter-user.component.scss'],
})
export class FilterUserComponent implements OnInit {
  @Output() onSubmit = new EventEmitter();

  constructor(
    public asset: AssetService,
    private user: UsersClass,
    private form: filter
  ) {}

  get _form() {
    return this.form.form;
  }

  get _tags() {
    return this.user.tags;
  }

  ngOnInit() {
    this.getUserTags();
  }

  getUserTags() {
    this.user.getTags().then();
  }

  // deleteUserTag(tag: string) {
  //   this.user
  //     .deleteTag(tag)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  onCheckboxChange(event: any, arr: string) {
    const checkArr = this._form.controls[arr] as FormArray;
    if (event.target.checked) {
      checkArr.push(new FormControl(event.target.value));
    } else {
      const index = checkArr.controls.findIndex(
        (x) => x.value === event.target.value
      );
      checkArr.removeAt(index);
    }
  }

  applyFilter() {
    this.onSubmit.emit(this._form.value);
  }

  clearFilter() {
    clearCheck('role', this._form);
    clearCheck('group', this._form);

    function clearCheck(arr: string, form: any) {
      const checkboxes = document.querySelectorAll(
        `input[type="checkbox"][name=${arr}]`
      );
      // @ts-ignore
      checkboxes.forEach((checkbox) => (checkbox.checked = false));
      const checkArr = form.controls[arr + 's'] as FormArray;
      const index = checkArr.controls.findIndex((x) => x.value);
      checkArr.removeAt(index);
    }
    this.onSubmit.emit(this._form.value);
    document.getElementById('filter-user')?.classList.add('hidden');
  }
}
