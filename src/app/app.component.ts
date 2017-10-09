import { Component } from '@angular/core';
//import du service data
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  array = [];
  private found: boolean = false;

  total:number = 0;
  sentence: string = '';

  searchTypes: any = ['titl', 'arzour', 'komzoù'];
  selectedType: string = 'titl';

  constructor(private dataService:DataService) {
  }

  ngOnInit() {
  	console.log(this.dataService.name);
  }

  search(value:string) {
  	console.log('selectedType : ' + this.selectedType);
  	this.array = [];

  	this.dataService.searchTerm(value, this.selectedType).then((result) => {
  		console.log('result');
  		console.log(result);
  		console.log(result['hits']);
  		console.log(result['hits']['hits']);

			this.total = result['hits']['hits'].length;
			this.sentence = `Kavet ez eus bet ${ this.total } disoc'h`;

  		if (result['hits']['hits'].length > 0) {
  			for (var i = 0 ; i < result['hits']['hits'].length ; i++) {
	  			console.log(result['hits']['hits'][i]);
	  			var obj = {};
	  			obj['title'] = result['hits']['hits'][i]['_source']['title']
	  			obj['artist'] = result['hits']['hits'][i]['_source']['artist']
	  			obj['song'] = result['hits']['hits'][i]['_source']['content'].substring(0,200) + '...'
	  			this.array.push(obj);
  			}
  			this.found = true;
  		} else {
  		  //list.push(['no result was found']);
  		  this.sentence = "N'eo bet kavet disoc'h ebet";
  		  this.found = false;
  		}
  	});
  }

}
