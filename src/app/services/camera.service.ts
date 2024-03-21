import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { LocalFile } from '../models/tools';


@Injectable({
  providedIn: 'root'
})

export class CameraService {
  private IMG_DIR = "stored-images"
  public images: LocalFile[] = []

  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  private formatDate(): string {
    const date = new Date()

    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')

    return year + month + day + "_" + hours + minutes + seconds
  }

  private async saveImage(image: Photo): Promise<void> {
    // Convert photo to base64 format, required by Filesystem API to save
    const image_base64 = await this.readAsBase64(image)

    // Write the file to the data directory
    const date = this.formatDate()
    const fileName = date + '.jpeg'
    await Filesystem.writeFile({
      path: `${this.IMG_DIR}/${fileName}`,
      data: image_base64,
      directory: Directory.Data
    })

    this.loadFiles()
  }

  private async readAsBase64(image: Photo): Promise<string | Blob> {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: image.path!,
      })
      return file.data

    } else {
      const response = await fetch(image.webPath!)
      const blob = await response.blob()
      return await this.convertBlobToBase64(blob) as string
    }
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(blob)
  })

  public async takeImage(): Promise<void> {
    try {
      const image: Photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
      })

      if (image.webPath) {
        await this.saveImage(image)
      }

    } catch (error) {
      console.log('no photo')
    }
  }

  public async loadImage(): Promise<void> {
    try {
      const image: Photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
        quality: 100
      })

      if (image) {
        await this.saveImage(image)
      }

    } catch (error) {
      console.log('no photo')
    }
  }

  public async loadFiles(): Promise<void> {
    this.images = []
    const loading = await this.loadingCtrl.create({
      message: "loading images..."
    })
    await loading.present()

    Filesystem.readdir({
      path: this.IMG_DIR,
      directory: Directory.Data
    })
      .then(result => {
        console.log("file data:", result)
        this.loadFileData(result.files.map((x) => x.name))
      },
        async err => {
          console.log("error loading: " + err)
          await Filesystem.mkdir({
            directory: Directory.Data,
            path: this.IMG_DIR
          })
        })
      .then(_ => {
        loading.dismiss()
      })
  }

  private async loadFileData(fileNames: string[]): Promise<void> {
    for (let file of fileNames) {
      const filepath = `${this.IMG_DIR}/${file}`

      const readFile = await Filesystem.readFile({
        path: filepath,
        directory: Directory.Data
      })

      this.images.unshift({
        name: file,
        path: filepath,
        data: `data:image/jpeg;base64,${readFile.data}`
      })
    }
  }

  private async presentToast(text: string) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000
    })
    toast.present()
  }

  public async deleteImage(file: LocalFile) {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path
    })
    this.loadFiles()
    this.presentToast('File removed.')
  }
}
