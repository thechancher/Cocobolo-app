import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})

export class CameraService {

  images: string[] = []

  constructor() { }

  async addNewImage() {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
      })

      if (image.webPath) {
        this.images.unshift(image.webPath)
      }
    } catch (error) {
      console.log('no photo');
    }
  }
}
