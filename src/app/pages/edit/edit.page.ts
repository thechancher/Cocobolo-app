import { Component, Input, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})

export class EditPage implements OnInit {
  @Input() imageURL!: string;

  imageOriginal: string = ""
  imageBase64: string = ""
  croppedImage: any = null

  constructor(
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create()
    await loading.present()
    this.imageOriginal = this.imageURL
    this.imageBase64 = this.imageURL
  }

  public imageLoaded() {
    this.loadingCtrl.dismiss()
  }

  public loadImageFailed() {
    console.log("Image load failed");
  }

  public imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.objectUrl || event.base64 || '';
  }

  public cropImage() {
    this.modalCtrl.dismiss(this.croppedImage)
  }

  public discardChange() {
    this.modalCtrl.dismiss(this.imageOriginal)
  }

  private ionViewWillLeave() {
    console.log("ON MODAL ionViewDidLeave")
    this.modalCtrl.dismiss(this.imageOriginal)
  }

}
