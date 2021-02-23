import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-images-container',
  templateUrl: './images-container.component.html',
  styleUrls: ['./images-container.component.scss']
})
export class ImagesContainerComponent implements OnInit {

  imageUrls: string[] = [];

  public formFile = new FormGroup({
    file: new FormControl(null, Validators.required),
  });

  public fileMessage = 'There is no selected file';
  public formData = new FormData();
  public fileName = '';
  public publicURL = '';
  public percent = 0;
  public finalized = false;

  constructor(private firebaseStorage: FirestoreService) {
  }

  ngOnInit(): void {
    this.getImages();
  }

  public setFiles(event): void {
    if (event.length > 0) {
      for (let file of event) {
        this.fileMessage = `Ready File: ${file.name}`;
        this.fileName = file.name;
        this.formData.delete('file');
        this.formData.append('file', file, file.name);
      }
    } else {
      this.fileMessage = ' there is no selected file';
    }
  }

  public fileUpload(): void {
    const file = this.formData.get('file');
    const referencia = this.firebaseStorage.cloudStorageRef(this.fileName);
    const tarea = this.firebaseStorage.cloudStorageTask(this.fileName, file);
  }

  public getImages(): void {
    this.firebaseStorage.getImagesCloudStorage().subscribe(response => {
      response.items.forEach(folderRef => {
        this.displayImage(folderRef);
      });
    });
  }

  private displayImage(imageRef): void {
    imageRef.getDownloadURL().then((url: string) => {
      this.imageUrls.push(url);
    }).catch(error => {
      console.log(error);
    });
  }

}
