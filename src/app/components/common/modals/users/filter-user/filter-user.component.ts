import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { interval } from 'rxjs';
import { UserService } from '../../../../../shared/services/user.service';
import { AssetService } from '../../../../../shared/services/asset.service';

@Component({
  selector: 'app-filter-user',
  templateUrl: './filter-user.component.html',
  styleUrls: ['./filter-user.component.scss'],
})
export class FilterUserComponent implements OnInit {
  public filterForm: FormGroup;
  public userTags = [];
  @Output() onSubmit = new EventEmitter();
  constructor(public asset: AssetService, private fb: FormBuilder, private user: UserService) {
    this.filterForm = fb.group({
      roles: new FormArray([]),
      groups: new FormArray([]),
    });
  }

  ngOnInit() {
    let i = interval(500).subscribe(() => {
      if (this.user.token) {
        i.unsubscribe();
        this.getUserTags();
      }
    });
  }

  getUserTags() {
    this.user
      .getUserTags()
      .then((res) => {
        console.log(res);
        this.userTags = res.userTags;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteUserTag(tag: string) {
    this.user
      .deleteUserTag(tag)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onCheckboxChange(event: any, arr: string) {
    const checkArr = this.filterForm.controls[arr] as FormArray;
    if (event.target.checked) {
      checkArr.push(new FormControl(event.target.value));
    } else {
      const index = checkArr.controls.findIndex((x) => x.value === event.target.value);
      checkArr.removeAt(index);
    }
  }

  applyFilter() {
    this.onSubmit.emit(this.filterForm.value);
  }

  clearFilter() {
    clearCheck('role', this.filterForm);
    clearCheck('group', this.filterForm);

    function clearCheck(arr: string, form: any) {
      const checkboxes = document.querySelectorAll(`input[type="checkbox"][name=${arr}]`);
      // @ts-ignore
      checkboxes.forEach((checkbox) => (checkbox.checked = false));
      const checkArr = form.controls[arr + 's'] as FormArray;
      const index = checkArr.controls.findIndex((x) => x.value);
      checkArr.removeAt(index);
    }
    this.onSubmit.emit(this.filterForm.value);
    document.getElementById('filter-user')?.classList.add('hidden');
  }
}
