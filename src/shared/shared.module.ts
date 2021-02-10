import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ImagePreviewerComponent } from './components/image-previewer/image-previewer.component';



@NgModule({
  declarations: [
    ImagePreviewerComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule

  ],
  exports: [
    ImagePreviewerComponent
  ]
})
export class SharedModule { }
