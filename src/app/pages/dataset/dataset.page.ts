import { Component, OnInit } from '@angular/core';
import { ClassName } from 'src/app/models/image';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.page.html',
  styleUrls: ['./dataset.page.scss'],
})
export class DatasetPage implements OnInit {

  constructor(public serverService: ServerService) {
    serverService.getClassNames()
  }

  ngOnInit() { }


}
