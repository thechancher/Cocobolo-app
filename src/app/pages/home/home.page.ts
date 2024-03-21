import { Component, OnInit } from '@angular/core';
import { LocalFile } from 'src/app/models/tools';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  public images: LocalFile[] = []

  constructor(protected cameraService: CameraService) { }

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

  public async deleteImage(file: LocalFile): Promise<void> {
    await this.cameraService.deleteImage(file)
    this.images = this.cameraService.images
  }

}
