import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataBaseInterfaceService } from 'src/app/service/dataBase/data-base-interface.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    public fb: FormBuilder,
    public database: DataBaseInterfaceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({});
    for (const pole of data.table) {
      this.form.addControl(pole, new FormControl('', Validators.required));
    }
    console.log(Object.keys(this.form.controls));
    this.columns = Object.keys(this.form.controls);
  }

  form: FormGroup;
  isLoading = true;
  columns: string[];
  title = this.data.title;

  checkID() {
    const res = this.data.id.filter(id => id.id === this.form.get('id').value);
    return (res.length === 0) ? true : false;
  }

  addRecord() {
    if (this.checkID()) {
    this.database.addRecord(this.title, this.form.value)
    .subscribe(
      () => this.dialogRef.close(),
      () => this.dialogRef.close()
    );
    } else {
      alert('Record with same id already exists.');
    }
  }

  ngOnInit(): void {
    console.log(this.data);
  }

}
