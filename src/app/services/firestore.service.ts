import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private storage: AngularFireStorage
  ) { }

  public cloudStorageTask(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  public cloudStorageRef(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }
}
