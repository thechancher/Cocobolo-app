import { Component, OnInit } from '@angular/core';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  images: String[] = []

  constructor(
    private cameraService: CameraService) {
    this.images = cameraService.images

  }

  ngOnInit() {
  }

  async takeImage() {
    await this.cameraService.addNewImage()
  }

}
