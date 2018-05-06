import { Component, OnInit } from '@angular/core';
//import du service data
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private query:string = '';
  private songs = [];
  private _songs = [];
  private artists = [];
  private hidden:boolean = true;


  ngOnInit() {
  }

  constructor(private router: Router, private dataService:DataService, private route: ActivatedRoute) {
    //this.route.params.subscribe( params => this.value= params.songid );

    this.route.params.subscribe((params)=> {
      console.log(params);
      if(params['term']){
        this.query = params['term'];
        this.search(params['term']);
      } else {
        console.log('no term found in params')
      }
    });

  }

  search(term:string) {
    this.hidden = true;

    if (term === undefined) {
      this.hidden = false;
    }

    if (this.query !== "") {
      //this.activeSpinner= true;
      this.dataService.autocomplete(this.query).then((result) => {
        //this.activeSpinner = false;
        this.songs = [];
        this.artists = [];

        let songs = result[0];
        let artists = result[1];

        let title, slug, artist, content;


        for (var i = 0 ; i < songs['hits']['hits'].length; i ++) {

          title = songs['hits']['hits'][i]._source.title;
          slug = songs['hits']['hits'][i]._source.slug;
          artist = songs['hits']['hits'][i]._source.artist;
          content = songs['hits']['hits'][i]._source.content.substring(0,100) + '...';

          this.songs.push({"title":title, "slug":slug, "artist":artist,"content":content});
        }

        for (var i = 0 ; i < artists['hits']['hits'].length; i ++) {
          var name = artists['hits']['hits'][i]._source.name;
          this.artists.push({"name":name});
        }

        if (term != undefined) {
          this._songs = this.songs;
        }


      })
    } else {
      this.songs = [];
      this.artists = [];    
    }

  }

  searchItem() {
    this.router.navigate(['/search/' + this.query]);
  }




/*
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
  */

}

