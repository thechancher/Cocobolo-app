import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { LocalFile } from 'src/app/models/tools';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})

export class EditPage implements OnInit {
  @ViewChild("cropper") cropper!: ImageCropperComponent
  @Input() image!: LocalFile;

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
  }

  public cropImage(): void {
    this.modalCtrl.dismiss(this.image)
  }

  public discardChange(): void {
    this.modalCtrl.dismiss(null)
  }

}
