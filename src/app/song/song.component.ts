import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

	songTitle: string;
	song: string;
	artist: string;


  constructor(private route: ActivatedRoute, private dataService:DataService) {
     this.route.params.subscribe( params => this.songTitle= params.songid );
	}


  ngOnInit() {
  	this.getSong();
  }

  getSong() {
    	this.dataService.getSong(this.songTitle).then((result) => {
  		this.song = result['hits']['hits'][0]._source.content;
  		this.artist = result['hits']['hits'][0]._source.artist;
  		console.log(this.song);
  	});
  }

}
