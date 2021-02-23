import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ImagePreviewerComponent } from 'src/shared/components/image-previewer/image-previewer.component';

@Component({
  selector: 'app-images-container',
  templateUrl: './images-container.component.html',
  styleUrls: ['./images-container.component.scss']
})
export class ImagesContainerComponent implements OnInit {

  imageUrls: string[] = [];

  constructor(
    private firebaseStorage: FirestoreService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getImages();
  }

  public getImages(): void {
    this.imageUrls = [];
    this.firebaseStorage.getImagesCloudStorage().subscribe(response => {
      response.items.forEach(folderRef => {
        this.displayImage(folderRef);
      });
    },
      (error) => {
        this.openSnackBar(error.error, 'close');
      });
  }

  private displayImage(imageRef): void {
    imageRef.getDownloadURL().then((url: string) => {
      this.imageUrls.push(url);
    }).catch(error => {
      this.openSnackBar(error.error, 'close');
    });
  }

  public openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ImagePreviewerComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //this timeout is till handle the loaded.
        setTimeout(() => {
          this.getImages();
        }, 2000);
      }
    });
  }
}
