import { Component, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-image-previewer',
  templateUrl: './image-previewer.component.html',
  styleUrls: ['./image-previewer.component.scss']
})
export class ImagePreviewerComponent {

  @Output() files: EventEmitter<FileReader[]> = new EventEmitter();
  @ViewChild('images') images: ElementRef;

  imageError = false;

  public formData = new FormData();
  public formFile = new FormGroup({
    file: new FormControl(null, Validators.required),
  });

  public fileMessage = 'There is no selected file';
  public fileName = '';
  public publicURL = '';
  public percent = 0;
  public finalized = false;


  acceptedFormats: string[] = ['.jpg', 'jpeg', '.png'];
  allowedFormatsFileReader: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
  fileReaderArray;
  readers: FileReader[] = [];

  constructor(
    private renderer: Renderer2,
    private firebaseStorage: FirestoreService) { }

  fileInputchange(event): void {
    if (this.isValidImage(event)) {
      this.fileReaderArray = this.createPreviewImages(event);
      this.setFiles(this.fileReaderArray);
    }
  }

  private setFiles(event): void {
    if (event.length > 0) {
      for (let file of event) {
        this.fileMessage = `Ready File: ${file.name}`;
        this.fileName = file.name;
        this.formData.append('file', file, file.name);
      }
    } else {
      this.fileMessage = ' there is no selected file';
    }
  }

  public fileUpload(): void {
    const files: any = this.formData.getAll('file');
    for (let file of files) {
      const referencia = this.firebaseStorage.cloudStorageRef(file.name);
      const tarea = this.firebaseStorage.cloudStorageTask(file.name, file);
    }
  }
  
  private deleteAllChildNodes(parentNode): void {
    while (parentNode.firstChild) {
      parentNode.removeChild(parentNode.firstChild);
    }
  }

  private cleanPreviews(): void {
    if (this.images.nativeElement.hasChildNodes()) {
      this.deleteAllChildNodes(this.images.nativeElement);
    }
    this.imageError = false;
  }

  private createPreviewImages(event): FileReader[] {
    for (const file of event.target.files) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const image: ElementRef = this.renderer.createElement('img');

        this.renderer.listen(image, 'click', () => { this.deletePreview(file.name); });

        this.renderer.setProperty(image, 'src', reader.result);
        this.renderer.setProperty(image, 'id', file.name);
        this.renderer.addClass(image, 'image-previewer__preview');

        this.renderer.appendChild(this.images.nativeElement, image);

      };
      this.readers.push(file);
    }
    return this.readers;
  }

  private deletePreview(fileNameToRemove: string): void {
    let indexToRemove: number;
    const parentNode = document.getElementById('images');
    const previewImageNode = document.getElementById(fileNameToRemove);

    this.fileReaderArray.forEach( (file, index: number) => {
      if (file.name === fileNameToRemove) {
        indexToRemove = index;
        this.renderer.removeChild(parentNode, previewImageNode);
      }
    });

    if (typeof indexToRemove === 'number') {
      this.fileReaderArray.splice(indexToRemove, 1);
    }
    this.setFiles(this.fileReaderArray);
  }

  private isValidImage(event): boolean {
    const files = event.target.files;

    for (const file of files) {
      if (!this.allowedFormatsFileReader.includes(file.type)) {
        this.imageError = true;
        return false;
      }
    }
    return true;
  }
}
