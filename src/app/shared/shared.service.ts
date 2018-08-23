import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/index';
import {map} from 'rxjs/operators';
import {take} from 'rxjs/internal/operators';
import {User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  usersRef: AngularFireList<any>;
  users: Observable<any[]>;
  user: Observable<any>;
  userPictures = [
    '../../../assets/avatars/avatar_alien.png',
    '../../../assets/avatars/avatar_awesome.png',
    '../../../assets/avatars/avatar_burger.png',
    '../../../assets/avatars/avatar_businessman.png',
    '../../../assets/avatars/avatar_cat.png',
    '../../../assets/avatars/avatar_cupcake.png',
    '../../../assets/avatars/avatar_dog.png',
    '../../../assets/avatars/avatar_flower.png',
    '../../../assets/avatars/avatar_generic.png',
    '../../../assets/avatars/avatar_generic_aqua.png',
    '../../../assets/avatars/avatar_generic_blue.png',
    '../../../assets/avatars/avatar_generic_green.png',
    '../../../assets/avatars/avatar_generic_orange.png',
    '../../../assets/avatars/avatar_generic_purple.png',
    '../../../assets/avatars/avatar_generic_red.png',
    '../../../assets/avatars/avatar_generic_yellow.png',
    '../../../assets/avatars/avatar_horse.png',
    '../../../assets/avatars/avatar_margarita.png',
    '../../../assets/avatars/avatar_ninja.png',
    '../../../assets/avatars/avatar_note.png',
    '../../../assets/avatars/avatar_pizza.png',
    '../../../assets/avatars/avatar_secret_agent.png',
    '../../../assets/avatars/avatar_soccer.png',
    '../../../assets/avatars/avatar_sun_cloud.png',
    '../../../assets/avatars/avatar_superhero.png',
    '../../../assets/avatars/avatar_volley_ball.png',
  ];

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list('users');
    this.users = this.usersRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );
  }

  getUsers() {
    return this.users;
  }

  getUser(key: any) {
    return this.db.object('users/' + key).snapshotChanges().pipe(
      take(1),
      map(changes => {
          return {
            key: changes.payload.key, ...changes.payload.val()
          };
        }
      )
    );
  }

  addUser(newUser: User) {
    this.usersRef.push(newUser);
  }

  updateUser(key, data) {
    this.usersRef.update(key, data);
  }

  deleteUser(key: any) {
    this.usersRef.remove(key);
  }

}
