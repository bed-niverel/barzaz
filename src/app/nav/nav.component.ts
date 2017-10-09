import { Component, OnInit } from '@angular/core';
import {TranslateService} from 'ng2-translate';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
	
	private translateService: TranslateService;

  constructor() {
 		//this.translateService = translateService;
  }

  ngOnInit() {
  }

}
