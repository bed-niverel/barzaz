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
  public songs = [];
  public artists = [];
  public elementRef;

  public activeSpinner:boolean=false;
  public hidden:boolean = false;

  @HostListener('click', ['$event']) onClick(event) {
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
        this.songs = [];
        this.artists = [];


        let songs = result[0];
        let artists = result[1];


        for (var i = 0 ; i < songs['hits']['hits'].length; i ++) {

          var title = songs['hits']['hits'][i]._source.title;
          var slug = songs['hits']['hits'][i]._source.slug;
          var artist = songs['hits']['hits'][i]._source.artist;
          this.songs.push({"title":title, "slug":slug, "artist":artist});
        }

        for (var i = 0 ; i < artists['hits']['hits'].length; i ++) {
          var name = artists['hits']['hits'][i]._source.name;
          this.artists.push({"name":name});
        }
        console.log("artists");
        console.log(this.artists);

      })
    } else {
      this.songs = [];
      this.artists = [];    
    }
  }
   
  select(item){
      this.query = item;
      this.songs = [];
      this.artists = [];
  }


  constructor(private router: Router, private dataService:DataService, myElement: ElementRef) {
    this.elementRef = myElement;
  }


  ngOnInit() {
  	this.getLatestSongs();
  }

  searchItem() {
    
    this.router.navigate(['/search/' + this.query]);
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
