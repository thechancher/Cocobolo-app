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

  constructor(
    protected cameraService: CameraService,
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    this.cameraService.loadFiles()
  }

  ionViewDidEnter() {
    this.cameraService.loadFiles()
    this.images = this.cameraService.images
  }

  public async takeImage(): Promise<void> {
    await this.cameraService.takeImage()
    this.images = this.cameraService.images
  }

  public async loadImage(): Promise<void> {
    await this.cameraService.loadImage()
    this.images = this.cameraService.images
  }

  async editImage(image: LocalFile): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: EditPage,
      componentProps: {
        image: image
      }
    })

    modal.onDidDismiss().then(data => {
      const croppedImage: LocalFile = data.data
      if (croppedImage != null) {
        this.updateImage(croppedImage)
      }
    })

    return await modal.present()
  }

  public async updateImage(croppedImage: LocalFile): Promise<void> {
    await this.cameraService.updateImage(croppedImage)
    this.images = this.cameraService.images
  }

  public async deleteImage(file: LocalFile): Promise<void> {
    await this.cameraService.deleteImage(file)
    this.images = this.cameraService.images
  }

}
