import { Component, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-previewer',
  templateUrl: './image-previewer.component.html',
  styleUrls: ['./image-previewer.component.scss']
})
export class ImagePreviewerComponent {

  @Output() files: EventEmitter<FileReader[]> = new EventEmitter();
  @ViewChild('images') images: ElementRef;

  imageError = false;

  acceptedFormats: string[] = ['.jpg', 'jpeg', '.png'];
  allowedFormatsFileReader: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
  fileReaderArray;

  constructor(private renderer: Renderer2) { }

  fileInputchange(event): void {
    this.cleanPreviews();

    if (this.isValidImage(event)) {
      this.fileReaderArray = this.createPreviewImages(event);
      this.files.emit(this.fileReaderArray);
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
    const readers: FileReader[] = [];

    for (const file of event.target.files) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const image: ElementRef = this.renderer.createElement('img');
        this.renderer.listen(image, 'click', () => { this.deletePreview(file.name); });

        this.renderer.setProperty(image, 'src', reader.result);
        this.renderer.setProperty(image, 'id', file.name);
        this.renderer.appendChild(this.images.nativeElement, image);

        this.renderer.setStyle(image, 'width', '75px');
        this.renderer.setStyle(image, 'height', '100px');
        this.renderer.setStyle(image, 'opacity', '0.6');
        this.renderer.setStyle(image, 'cursor', 'pointer');
        this.renderer.setStyle(image, 'margin', '0.25rem');
      };
      readers.push(file);
    }
    return readers;
  }

  private deletePreview(fileNameToRemove: string): void {
    let indexToRemove;
    const parentNode = document.getElementById('images');
    const previewImageNode = document.getElementById(fileNameToRemove);

    this.fileReaderArray.forEach( (file, index) => {
      if (file.name === fileNameToRemove) {
        indexToRemove = index;
        this.renderer.removeChild(parentNode, previewImageNode);
      }
    });

    if (indexToRemove || indexToRemove === 0) {
      this.fileReaderArray.splice(indexToRemove, 1);
    }
    this.files.emit(this.fileReaderArray);
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
