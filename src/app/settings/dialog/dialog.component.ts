import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SharedService} from '../../shared/shared.service';
import {User} from '../../interfaces/user-interface';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  userPictures = [];
  users: User[] = [];
  user: User;

  userName: String = '';
  email: String = '';
  avatar: String = '../../../assets/default-profile.png';

  templateTrigger = true;

  userForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private service: SharedService,
              private fb: FormBuilder) {
    this.users = data;
  }

  ngOnInit() {
    this.userPictures = this.service.userPictures;
    this.createForm();
  }

  close() {
    this.dialogRef.close(this.user);
  }

  setPerson() {
    this.addNewPerson();
    this.dialogRef.close(this.user);
  }

  addPersonOrCancel() {
    this.templateTrigger = !this.templateTrigger;
  }

  addNewPerson() {
    const person: User = {
      userName: this.userName,
      email: this.email,
      avatar: this.avatar,
      bookmarks: [],
      userOptions: {
        theme: 'light-theme',
        fontSize: 'medium',
        pageSize: 100,
        showBookmarks: true
      }
    };
    this.user = person;
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  deletePerson(data, index) {
    this.users.splice(index, 1);
    this.deleteUser(data.key);
  }

  deleteUser(key) {
    this.service.deleteUser(key);
  }

  chosePerson(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  createForm() {
    this.userForm = this.fb.group({
      name: ['',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9А-ЯІЇ]/),
          Validators.minLength(2),
          Validators.maxLength(12)
        ]
      ],
      email: ['', [Validators.required, Validators.email]]
    });
  }

}
