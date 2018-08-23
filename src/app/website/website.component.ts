import {
  Component, OnInit, ElementRef, AfterViewInit, Renderer2
} from '@angular/core';

import {of} from 'rxjs/index';
import {User} from '../interfaces/user-interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SharedService} from '../shared/shared.service';


@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})
export class WebsiteComponent implements OnInit, AfterViewInit {

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

  edit: boolean;
  bookmark = {title: '', url: ''};
  Index = 0;
  bookmarkForm: FormGroup;

  page = 1;

  searchFilterPipe = '';

  constructor(private el: ElementRef,
              private service: SharedService,
              private renderer: Renderer2,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      localStorage.setItem('user', JSON.stringify(this.user));
    }
    if (this.user.key !== '') {
      this.getUser(this.user.key);
    }
    this.createForm();
  }

  ngAfterViewInit() {
    document.getElementsByTagName('html')[0].style.zoom = this.user.userOptions.pageSize + '%';
    if (!this.user.userOptions.showBookmarks) {
      const bookmark = this.el.nativeElement.querySelector('.bookmark-toggle');
      this.renderer.addClass(bookmark, 'hidden');
    }

    if (this.user.key === '') {
      this.renderer.addClass(this.el.nativeElement.querySelector('.create-bookmark'), 'hidden');
      this.renderer.removeClass(this.el.nativeElement.querySelector('.no-user'), 'hidden');
    }

    this.fontSize(this.user.userOptions.fontSize);
  }


  getUser(key) {
    this.service.getUser(key).subscribe((user: any) => {
      this.user = user;
    });
  }

  addUser(data) {
    this.service.addUser(data);
  }

  editUser(key, data) {
    this.service.updateUser(key, data);
  }

  deleteUser(key) {
    this.service.deleteUser(key);
  }

  changeTheme() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  getElement() {
    return of(this.el.nativeElement.querySelector('.font'));
  }

  fontSize(size: String = 'medium') {
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

  onCreateButtonClick() {
    this.el.nativeElement.querySelector('.bookmark-set').classList.remove('hidden');
    this.el.nativeElement.querySelector('.edit-section-header').classList.remove('hidden');
    this.edit = false;
  }

  cancel() {
    this.el.nativeElement.querySelector('.bookmark-set').classList.add('hidden');
    this.el.nativeElement.querySelector('.edit-section-header').classList.add('hidden');
  }

  saveBookmark() {
    if (this.edit) {
      this.user.bookmarks[this.Index].title = this.bookmark.title;
      this.user.bookmarks[this.Index].url = this.bookmark.url;
    } else {
      if (!this.user.bookmarks) {
        this.user.bookmarks = [];
        this.user.bookmarks.push(this.bookmark);
      } else {
        this.user.bookmarks.push(this.bookmark);
      }

    }
    this.service.updateUser(this.user.key, this.user);
    localStorage.setItem('user', JSON.stringify(this.user));
    this.el.nativeElement.querySelector('.bookmark-set').classList.add('hidden');
    this.el.nativeElement.querySelector('.edit-section-header').classList.add('hidden');
    this.bookmark = {title: '', url: ''};
  }

  editBookmark(bookmark, index) {
    this.Index = 5 * (this.page - 1) + index;
    this.el.nativeElement.querySelector('.bookmark-set').classList.remove('hidden');
    this.el.nativeElement.querySelector('.edit-section-header').classList.remove('hidden');
    this.bookmarkForm.get('title').setValue(bookmark.title);
    this.bookmarkForm.get('url').setValue(bookmark.url);
    this.edit = true;
    this.bookmark = {title: '', url: ''};
  }

  deleteBookmark(index) {
    this.user.bookmarks.splice(index, 1);
    this.service.updateUser(this.user.key, this.user);
    localStorage.setItem('user', JSON.stringify(this.user));
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

}
