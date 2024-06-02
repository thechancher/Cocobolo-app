import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CameraService } from 'src/app/services/camera.service';
import { EditPage } from '../edit/edit.page';
import { DetailPage } from '../detail/detail.page';
import { ServerService } from 'src/app/services/server.service';
import { Probability, Result, LocalFile, Details } from 'src/app/models/image';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  public images: LocalFile[] = []
  public probabilities: Probability[] | undefined
  public time: number = 0

  constructor(
    protected cameraService: CameraService,
    protected serverService: ServerService,
    private modalCtrl: ModalController
  ) {
    serverService.getClassNames()
  }

  ngOnInit() { }

  private loadFiles(): void {
    this.cameraService.loadFiles()
    this.images = this.cameraService.images
  }

  ionViewDidEnter() {
    this.loadFiles()
  }

  public async takeImage(): Promise<void> {
    await this.cameraService.takeImage()
    this.images = this.cameraService.images
  }

  public async loadImage(): Promise<void> {
    await this.cameraService.loadImage()
    this.images = this.cameraService.images
  }

  public async editImage(image: LocalFile): Promise<void> {
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

  public async editDetails(image: LocalFile): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: DetailPage,
      componentProps: {
        image: image
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

  public saveProbabilities(fileName: string): void {
    var details: Details = { detail: "", probability: [] }

    const details_storage = localStorage.getItem(fileName);
    details = details_storage !== null ? JSON.parse(details_storage) : details;

    details.probability = this.probabilities
    details.time = this.time

    localStorage.setItem(fileName, JSON.stringify(details))

    this.loadFiles()
  }

  public async analyze(file: LocalFile): Promise<void> {
    var data = file.data.split(",")
    var data_image = data[1]
    if (!this.serverService.analyzing) {
      this.serverService.analyzing = true
      this.serverService.serverHealth = true
      let result: Result = await <Result><unknown>this.serverService.analyze(data_image);
      this.probabilities = result.probs
      this.time = result.time
      this.serverService.analyzing = false
      if (this.probabilities) {
        this.serverService.serverHealth = true
        this.saveProbabilities(file.name)
      } else {
        this.serverService.serverHealth = false
      }
    } else {
      console.log("analyzing...");
    }
  }

}
