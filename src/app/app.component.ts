import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('images') images: ElementRef;

  constructor( private renderer: Renderer2 ) { }

  
  fileInputchange(event) {
    for (let file in event.target.files) {
      let reader = new FileReader();

      if (!isNaN(parseInt(file))) {
        reader.readAsDataURL(event.target.files[file]);

        reader.onload = () => {
          const image: ElementRef = this.renderer.createElement('img');
        
          this.renderer.setProperty(image, 'src', reader.result);
          this.renderer.appendChild(this.images.nativeElement, image);

          this.renderer.setStyle(image, 'width', '150px');
          this.renderer.setStyle(image, 'height', '200px');
        }  
      }
    };
  }

}
