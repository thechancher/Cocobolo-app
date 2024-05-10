import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatasetPage } from './dataset.page';

const routes: Routes = [
  {
    path: '',
    component: DatasetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatasetPageRoutingModule {}
