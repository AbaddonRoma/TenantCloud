import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2
} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from './dialog/dialog.component';
import {User} from '../interfaces/user-interface';
import {SharedService} from '../shared/shared.service';
import {of} from 'rxjs/index';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, AfterViewInit {

  users: User[] = [];

  user: User = {
    userName: 'person',
    email: '',
    avatar: '../../../assets/default-profile.png',
    bookmarks: [],
    key: '',
    userOptions: {
      theme: 'light-theme',
      fontSize: 'medium',
      pageSize: 100,
      showBookmarks: true
    }
  };
  fonts = [
    {id: 'verySmall', value: 'Very small'},
    {id: 'small', value: 'Small'},
    {id: 'medium', value: 'Medium(default)'},
    {id: 'large', value: 'Large'},
    {id: 'veryLarge', value: 'Very large'}
  ];

  bookmark = {title: '', url: ''};
  bookmarkForm: FormGroup;

  page = 1;

  constructor(public dialog: MatDialog,
              private service: SharedService,
              private el: ElementRef,
              private renderer: Renderer2,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      localStorage.setItem('user', JSON.stringify(this.user));
    }
    this.getUsers();
    this.createForm();
  }

  ngAfterViewInit() {
    const html = document.getElementsByTagName('html')[0];
    this.renderer.setStyle(html, 'zoom', this.user.userOptions.pageSize + '%');


    this.pageFontSize(this.user.userOptions.fontSize);
  }

  scrollToElement(element): void {
    element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

  setTheme(theme) {
    this.user.userOptions.theme = theme;
    localStorage.setItem('user', JSON.stringify(this.user));
    this.editUser(this.user.key, this.user);
  }

  getTheme() {
    this.user = JSON.parse(localStorage.getItem('user'));
    // this.user.userOptions.theme = (JSON.parse(localStorage.getItem('user'))).userOptions.theme || 'light-theme';
  }

  zoomHtml() {
    document.getElementsByTagName('html')[0].style.zoom = this.user.userOptions.pageSize + '%';
    localStorage.setItem('user', JSON.stringify(this.user));
    this.editUser(this.user.key, this.user);
  }

  fontSize(size = 'medium') {
    this.user.userOptions.fontSize = size;
    localStorage.setItem('user', JSON.stringify(this.user));
    this.editUser(this.user.key, this.user);
    this.pageFontSize(size);
  }

  bookmarksToggle() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  public openDialog(users: User): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.panelClass = 'panel-dialog';
    dialogConfig.data = users;
    dialogConfig.minWidth = '400px';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100vh';

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data: User) => {
      if (data) {
        this.users.push(data);
        this.addUser(data);
        this.service.getUsers().subscribe(usersData => {
          this.user = usersData[usersData.length - 1];
          localStorage.setItem('user', JSON.stringify(this.user));
          this.fontSize(this.user.userOptions.fontSize.toString());
          this.zoomHtml();
        });
      } else {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.fontSize(this.user.userOptions.fontSize.toString());
        this.zoomHtml();
      }

    });
  }

  resetUserOptions() {
    this.user.userOptions = {
      theme: 'light-theme',
      fontSize: 'medium',
      pageSize: 100,
      showBookmarks: true
    };
    this.pageFontSize();
    this.fontSize();
    this.zoomHtml();
  }

  getElement() {
    return of(this.el.nativeElement.querySelector('.font'));
  }

  pageFontSize(size: String = 'medium') {
    const options = ['verySmall', 'small', 'medium', 'large', 'veryLarge'];
    options.map((value, key) => {
      if (value === size) {
        options.splice(key, 1);
      }
    });

    this.getElement().subscribe(data => {
      if (data) {
        data.classList.add(size);
        data.classList.remove(...options);
      }
    });
  }

  getUsers() {
    this.service.getUsers()
      .subscribe(users => {
        this.users = users;
      });

  }

  addUser(data) {
    this.service.addUser(data);
  }

  editUser(key, data) {
    this.service.updateUser(key, data);
  }

  addBookmark() {
    if (!this.user.bookmarks) {
      this.user.bookmarks = [];
      this.user.bookmarks.push(this.bookmark);
    } else {
      this.user.bookmarks.push(this.bookmark);
    }

    this.service.updateUser(this.user.key, this.user);
    localStorage.setItem('user', JSON.stringify(this.user));
    this.bookmark = {title: '', url: ''};
  }
  createForm() {
    this.bookmarkForm = this.fb.group({
      title: ['',
        [
          Validators.required,
        ]
      ],
      url: ['',
        [
          Validators.required,
          Validators.pattern(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/)
        ]
      ]
    }, {updateOn: 'blur'});
  }

  printWebPate() {
    window.open('../').print();
  }
}
