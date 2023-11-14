import { Component, OnInit } from '@angular/core';
import { Storage, ref, listAll, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imagesP: string[];
  imagesB: string[];
  uid?: string | null;

  constructor(private storage: Storage) {
    this.imagesP = [];
    this.imagesB = [];
  }

  ngOnInit() {
    this.uid = localStorage.getItem('usuario')?.replace(/"/g, '');
    this.getImagesP();
    this.getImagesB();
  }


  getImagesP() {
    const imagesRef = ref(this.storage, `${this.uid}/portadas/images`);

    listAll(imagesRef)
      .then(async response => {
        console.log(response);
        this.imagesP = [];
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          this.imagesP.push(url);
        }
      })
      .catch(error => console.log(error));
  }


  getImagesB() {
    const imagesRef = ref(this.storage, `${this.uid}/bann/images`);

    listAll(imagesRef)
      .then(async response => {
        console.log(response);
        this.imagesB = [];
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          this.imagesB.push(url);
        }
      })
      .catch(error => console.log(error));
  }

}
