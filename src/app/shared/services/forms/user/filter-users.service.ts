import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FilterUsersService {
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      roles: new FormArray([]),
      groups: new FormArray([]),
    });
  }
}
