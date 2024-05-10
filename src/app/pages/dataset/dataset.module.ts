import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatasetPageRoutingModule } from './dataset-routing.module';

import { DatasetPage } from './dataset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatasetPageRoutingModule
  ],
  declarations: [DatasetPage]
})
export class DatasetPageModule {}
