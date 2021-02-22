import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-images-container',
  templateUrl: './images-container.component.html',
  styleUrls: ['./images-container.component.scss']
})
export class ImagesContainerComponent {

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

  public setFiles(event) {
    if (event.length > 0) {
      for (let i = 0; i < event.length; i++) {
        this.fileMessage = `Archivo preparado: ${event[i].name}`;
        this.fileName = event[i].name;
        this.formData.delete('file');
        this.formData.append('file', event[i], event[i].name)
      }
    } else {
      this.fileMessage = 'No hay un archivo seleccionado';
    }
  }

  public fileUpload() {
    let file = this.formData.get('file');
    let referencia = this.firebaseStorage.cloudStorageRef(this.fileName);
    let tarea = this.firebaseStorage.cloudStorageTask(this.fileName, file);
  }

}
