import {AfterViewInit, Component, OnInit, Renderer2, ElementRef} from '@angular/core';
import {SharedService} from '../../shared/shared.service';
import {User} from '../../interfaces/user-interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  userPictures = [];
  user: User = {
    userName: 'person',
    email: '',
    avatar: '../../../assets/default-profile.png',
    bookmarks: [],
    userOptions: {
      theme: 'light-theme',
      fontSize: 'medium',
      pageSize: 100,
      showBookmarks: true
    }
  };

  userForm: FormGroup;

  constructor(private service: SharedService,
              private renderer: Renderer2,
              private el: ElementRef,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      localStorage.setItem('user', JSON.stringify(this.user));
    }
    // this.user = JSON.parse(localStorage.getItem('user'));
    this.userPictures = this.service.userPictures;
    this.createForm();
  }
  ngAfterViewInit() {
    const html = document.getElementsByTagName('html')[0];
    this.renderer.setStyle(html, 'zoom', this.user.userOptions.pageSize + '%');
    this.fontSize(this.user.userOptions.fontSize.toString());
  }

  fontSize(size = 'medium') {
    const options = ['verySmall', 'small', 'medium', 'large', 'veryLarge'];
    options.map((value, key) => {
      if (value === size) {
        options.splice(key, 1);
      }
    });

    this.renderer.addClass(this.el.nativeElement.querySelector('.font'), size);
    options.forEach((value, key) => {
      this.renderer.removeClass(this.el.nativeElement.querySelector('.font'), options[key]);
    });
  }

  editPerson() {
    this.editUser(this.user.key, this.user);
    this.router.navigateByUrl('/settings');
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  editUser(key, data) {
    this.service.updateUser(key, data);
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
