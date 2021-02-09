import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { ImagePreviewerComponent } from './components/image-previewer/image-previewer.component';



@NgModule({
  declarations: [
    ImagePreviewerComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule

  ],
  exports: [
    ImagePreviewerComponent
  ]
})
export class SharedModule { }
