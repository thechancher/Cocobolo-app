import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { LocalFile, Details } from 'src/app/models/image';

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
    this.details = this.image.details?.detail
  }

  public saveChange(): void {
    var details: Details = { detail: "", probability: [] }

    const details_storage = localStorage.getItem(this.image.name);
    details = details_storage !== null ? JSON.parse(details_storage) : details;

    details.detail = this.details

    localStorage.setItem(this.image.name, JSON.stringify(details))
    this.image.details = details
    this.modalCtrl.dismiss(this.image)
  }

  public discardChange(): void {
    this.modalCtrl.dismiss(null)
  }

}
