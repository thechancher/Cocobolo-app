import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocalFile } from 'src/app/models/tools';
import { CameraService } from 'src/app/services/camera.service';
import { EditPage } from '../edit/edit.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  public images: LocalFile[] = []
  public editImageURL: any = null
  public croppedImage: any = null

  constructor(
    protected cameraService: CameraService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.cameraService.loadFiles()
  }

  ionViewDidEnter() {
    this.images = this.cameraService.images
  }

  public async takeImage(): Promise<void> {
    await this.cameraService.takeImage()
    this.images = this.cameraService.images
  }

  public async loadImage(): Promise<void> {
    await this.cameraService.loadImage()
  }

  public editImage(image: string) {
    this.editImageURL = image
    this.presentModal()
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: EditPage,
      componentProps: {
        imageURL: this.editImageURL
      }
    })

    modal.onDidDismiss().then(data => {
      this.croppedImage = data.data
    })

    return await modal.present()
  }

  public async deleteImage(file: LocalFile): Promise<void> {
    await this.cameraService.deleteImage(file)
    this.images = this.cameraService.images
  }

}
