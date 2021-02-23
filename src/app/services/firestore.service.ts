import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private storage: AngularFireStorage
  ) { }

  public cloudStorageTask(fileName: string, data: any): AngularFireUploadTask {
    return this.storage.upload(fileName, data);
  }

  public cloudStorageRef(fileName: string): AngularFireStorageReference {
    return this.storage.ref(fileName);
  }

  public getImagesCloudStorage(): Observable<any> {
    return this.storage.ref('/').listAll();
  }
}
