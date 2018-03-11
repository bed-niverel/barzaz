import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../services/data.service';


import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import {ElementRef} from '@angular/core';

import { HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: any[];

  public query:string = '';

  public filteredList = [];
  public elementRef;

  private activeSpinner:boolean=false;

  private hidden:boolean = false;

  @HostListener('click', ['$event']) onClick(event){
    var target = event.target;
    this.hidden = true
    
    if (target.id === "query") { 
      this.hidden = false;
    }
  }


  filter() {
    this.hidden = false;

    if (this.query !== "") {
      this.activeSpinner= true;
      this.dataService.autocomplete(this.query).then((result) => {
        this.activeSpinner = false;
        this.filteredList = [];
        console.log(result);

        for (var i = 0 ; i < result['hits']['hits'].length; i ++) {

          var title = result['hits']['hits'][i]._source.title;
          var slug = result['hits']['hits'][i]._source.slug;
          this.filteredList.push({"title":title, "slug":slug});
        }

      })
    } else {
      this.filteredList = [];
    }
  }
   
  select(item){
      this.query = item;
      this.filteredList = [];
  }


  constructor(private router: Router, private dataService:DataService, myElement: ElementRef) {
    this.elementRef = myElement;
  }


  ngOnInit() {
  	this.getLatestSongs();
  }

  searchItem(term:string, type:string) {
  	console.log('term : ' + term + ' , type : ' + type);
    
    this.router.navigate(['/search'], { queryParams: {term:term, type:type} });
  }


  async getLatestSongs() {

    try {
      this.items = await this.dataService.getLatestSongs();  
    } catch(error) {
      console.log(error);
    }

  }


  async getRandomSong() {
    try {
      let result = await this.dataService.getRandomSong();  
      let songSlug = result[0].slug;
      this.router.navigate(['/songs/' + songSlug]);

    } catch(error) {
      console.log(error);
    }

  }

}
