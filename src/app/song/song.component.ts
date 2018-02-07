import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { DataService } from '../services/data.service';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

	songTitle: string;
	song: string;
	artist: string;
  link: string;
  url: SafeResourceUrl;

  constructor(private route: ActivatedRoute, private dataService:DataService, public sanitizer:DomSanitizer) {
     this.route.params.subscribe( params => this.songTitle = params.songid );
	}


  ngOnInit() {
  	this.getSong();
  }

  getSong() {
    	this.dataService.getSong(this.songTitle).then((result) => {
  		this.song = result['hits']['hits'][0]._source.content;
  		this.artist = result['hits']['hits'][0]._source.artist;
      this.link = result['hits']['hits'][0]._source.link;

      this.link = "https://www.youtube.com/embed/" + this.link.split('watch?v=')[1] + "?autoplay=1";

      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.link);      
  	});
  }

}
