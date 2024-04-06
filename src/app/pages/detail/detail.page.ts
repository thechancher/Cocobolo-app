import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { LocalFile } from 'src/app/models/tools';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  @Input() image!: LocalFile;

  details?: string | null

  constructor(
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.details = this.image.details
  }

  public saveChange(): void {
    localStorage.setItem(this.image.name, <string>this.details)
    this.image.details = this.details
    this.modalCtrl.dismiss(this.image)
  }

  public discardChange(): void {
    this.modalCtrl.dismiss(null)
  }

}
