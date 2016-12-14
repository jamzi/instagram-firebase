import { Component, OnInit } from '@angular/core';
import { Camera } from 'ionic-native';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  photos: FirebaseListObservable<any>;

  constructor(private af: AngularFire) { }

  ngOnInit() {
    this.getPhotos();
  }

  getPhotos() {
    this.photos = this.af.database.list('/photos');
  }

  takePhoto() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetHeight: 500,
      targetWidth: 500,
      correctOrientation: true
    }).then((imageData) => {
      this.photos.push({ src: "data:image/jpeg;base64," + imageData, likes: 0 });
    }, (err) => {
      console.log(err);
    });
  }

  deletePhoto(photoKey: string) {
    this.photos.remove(photoKey);
  }

  likePhoto(photoKey, likes: number) {
    this.photos.update(photoKey, { likes: likes + 1})
  }
}
