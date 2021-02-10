import { Component, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-previewer',
  templateUrl: './image-previewer.component.html',
  styleUrls: ['./image-previewer.component.scss']
})
export class ImagePreviewerComponent {

  @Output() files: EventEmitter<FileReader> = new EventEmitter();
  @ViewChild('images') images: ElementRef;

  acceptedFormats: string[] = ['.jpg', 'jpeg', '.png'];

  constructor(private renderer: Renderer2) { }

  fileInputchange(event) {
    this.cleanPreviousPreviews();
    this.createPreviewImages(event);
    this.files.emit(event.target.files);
  }

  private deleteAllChildNodes(parentNode): void {
    while (parentNode.firstChild) {
      parentNode.removeChild(parentNode.firstChild);
    }
  }

  private cleanPreviousPreviews() {
    if (this.images.nativeElement.hasChildNodes()) {
      this.deleteAllChildNodes(this.images.nativeElement);
    }
  }

  private createPreviewImages(event) {
    for (const fileKey in event.target.files) {
      const reader: FileReader = new FileReader();

      if (!isNaN(parseInt(fileKey))) {
        reader.readAsDataURL(event.target.files[fileKey]);

        reader.onload = () => {
          const image: ElementRef = this.renderer.createElement('img');

          this.renderer.setProperty(image, 'src', reader.result);
          this.renderer.appendChild(this.images.nativeElement, image);

          this.renderer.setStyle(image, 'width', '150px');
          this.renderer.setStyle(image, 'height', '200px');
        };
      }
    }
  }
}
