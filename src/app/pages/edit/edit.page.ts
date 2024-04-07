import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { CropperPosition, ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { LocalFile } from 'src/app/models/tools';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})

export class EditPage implements OnInit {
  @ViewChild("cropper") cropper!: ImageCropperComponent
  @Input() image!: LocalFile;

  public width: number = 0;
  public height: number = 0;

  constructor(
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create()
    await loading.present()
  }

  public imageLoaded(): void {
    this.loadingCtrl.dismiss()
  }

  public loadImageFailed(): void {
    console.log("Image load failed");
  }

  public imageCropped(event: ImageCroppedEvent): void {
    this.image.edited = event.objectUrl || event.base64 || '';
    this.width = event.width
    this.height = event.height
  }

  public increaseCrop(): void {
    var step_x: number = this.cropper.cropper.x2
    step_x += .5
    var step_y: number = this.cropper.cropper.y2
    step_y += .5

    const position: CropperPosition = {
      x1: this.cropper.cropper.x1,
      y1: this.cropper.cropper.y1,
      x2: step_x,
      y2: step_y
    }
    this.cropper.cropper = position
    this.cropper.crop()
  }

  public decreaseCrop(): void {
    var step_x: number = this.cropper.cropper.x2
    step_x -= .5
    var step_y: number = this.cropper.cropper.y2
    step_y -= .5

    const position: CropperPosition = {
      x1: this.cropper.cropper.x1,
      y1: this.cropper.cropper.y1,
      x2: step_x,
      y2: step_y
    }
    this.cropper.cropper = position
    this.cropper.crop()
  }

  public cropImage(): void {
    this.modalCtrl.dismiss(this.image)
  }

  public discardChange(): void {
    this.modalCtrl.dismiss(null)
  }

}
