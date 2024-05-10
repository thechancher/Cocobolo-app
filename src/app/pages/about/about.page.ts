import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})

export class AboutPage implements OnInit {

  date : string = new Date().toISOString();
  currentYear : number = (new Date()).getFullYear();

  constructor() { }

  ngOnInit() { }

}
