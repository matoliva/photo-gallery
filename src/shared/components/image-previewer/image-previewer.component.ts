import { Component, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-previewer',
  templateUrl: './image-previewer.component.html',
  styleUrls: ['./image-previewer.component.scss']
})
export class ImagePreviewerComponent {

  @Output() files: EventEmitter<FileReader> = new EventEmitter();
  @ViewChild('images') images: ElementRef;

  imageError = false;

  acceptedFormats: string[] = ['.jpg', 'jpeg', '.png'];
  allowedFormatsFileReader: string[] = ['image/jpg', 'image/jpeg', 'image/png'];

  constructor(private renderer: Renderer2) { }

  fileInputchange(event): void {
    this.cleanPreviews();

    if (this.isValidImage(event)) {
      this.createPreviewImages(event);
      this.files.emit(event.target.files);
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

  private createPreviewImages(event): void {
    for (const file of event.target.files) {
      const reader: FileReader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const image: ElementRef = this.renderer.createElement('img');
        this.renderer.listen(image, 'click', () => { alert('I was clicked'); });

        this.renderer.setProperty(image, 'src', reader.result);
        this.renderer.appendChild(this.images.nativeElement, image);

        this.renderer.setStyle(image, 'width', '150px');
        this.renderer.setStyle(image, 'height', '200px');
      };
    }
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
