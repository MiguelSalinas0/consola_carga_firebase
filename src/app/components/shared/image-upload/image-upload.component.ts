import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Storage, ref, uploadBytes, deleteObject } from '@angular/fire/storage';


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})

export class ImageUploadComponent {

  @Input() uid: string | null | undefined = null;
  @Output() imagesUploaded = new EventEmitter<void>();


  constructor(private storage: Storage) { }


  uploadImages($event: any, folder: string): void {
    const files = $event.target.files;
    const promises = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imgRef = ref(this.storage, `${this.uid}/${folder}/images/${file.name}`);

      const promise = uploadBytes(imgRef, file)
        .then(response => {
          console.log(response);
        })
        .catch(error => console.log(error));

      promises.push(promise);
    }

    Promise.all(promises)
      .then(() => {
        console.log('All images uploaded successfully');
        this.imagesUploaded.emit();
      })
      .catch(error => console.log(error));
  }


  deleteImage(image: string): void {
    const imagesRef = ref(this.storage, `${image}`);

    deleteObject(imagesRef).then(() => {
      window.location.reload()
    }).catch((error) => {
      console.log(error)
    });
  }


}

