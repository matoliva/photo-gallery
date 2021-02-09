import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePreviewerComponent } from './components/image-previewer/image-previewer.component';



@NgModule({
  declarations: [
    ImagePreviewerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImagePreviewerComponent
  ]
})
export class SharedModule { }
