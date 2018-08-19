import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PagerService } from '../services/pager.service';
import { Location } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-song-list',
  templateUrl: './artist-song-list.component.html',
  styleUrls: ['./artist-song-list.component.css']
})
export class ArtistSongListComponent implements OnInit {

  public alphabet;

	artist: string;

  songs: any[];

  constructor(private dataService:DataService, private pagerService: PagerService, private location: Location, private route: ActivatedRoute) {
  	this.route.params.subscribe( params => this.artist = params.artistid );
	}
  ngOnInit() {
  	this.getSongs(this.artist);
  }

	getSongs(artist: string) {

    this.dataService.getArtistSongs(artist).then((data) => {
      //console.log(data);
      this.songs = data;
    })

	}

}
