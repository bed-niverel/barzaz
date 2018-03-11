import { Component, OnInit } from '@angular/core';
//import du service data
import { DataService } from '../services/data.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  title = 'app';
  array = [];
  private found: boolean = false;

  total:number = 0;
  sentence: string = '';
  searchString: string = '';
  searchType:string = '';

  searchTypes: any = [{name:'titl', type:'title'}, {name:'arzour', type:'artist'}, {name:'komzoù', type:'text'}];
  selectedType: string = 'title';

  constructor(private dataService:DataService, private route: ActivatedRoute) {
    //this.route.params.subscribe( params => this.value= params.songid );

    this.route.queryParams.subscribe((params)=> {
      if(params['term'] && params['type']){
        this.searchString = params['term'];
        this.selectedType = params['type'];
        this.search(params['term']);
      } else {
        console.log('no term found in params')
      }
    });

  }

  ngOnInit() {
  }

  search(value:string) {
  	//console.log('selectedType : ' + this.selectedType);
  	this.array = [];

  	this.dataService.searchTerm(value, this.selectedType).then((result) => {

			this.total = result['hits']['hits'].length;
			this.sentence = `Kavet ez eus bet ${ this.total } disoc'h`;

  		if (result['hits']['hits'].length > 0) {
  			for (var i = 0 ; i < result['hits']['hits'].length ; i++) {
	  			//console.log(result['hits']['hits'][i]);
	  			var obj = {};
	  			obj['title'] = result['hits']['hits'][i]['_source']['title'];
          obj['slug'] = result['hits']['hits'][i]['_source']['slug'];
	  			obj['artist'] = result['hits']['hits'][i]['_source']['artist'];
	  			obj['song'] = result['hits']['hits'][i]['_source']['content'].substring(0,100) + '...';
	  			this.array.push(obj);
  			}
  			this.found = true;
  		} else {
  		  this.sentence = "N'eo bet kavet disoc'h ebet";
  		  this.found = false;
  		}
  	});
  }

}

