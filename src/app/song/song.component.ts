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

	slug: string;
  title: string;
	song: string;
	artist: string;
  link: string;
  url: SafeResourceUrl;
  songs: any[];

  constructor(private route: ActivatedRoute, private dataService:DataService, public sanitizer:DomSanitizer) {
     this.route.params.subscribe( params => this.slug = params.songid );
	}


  ngOnInit() {
  	this.getSong();
  }


  async getSong() {
    try {
      let result = await this.dataService.getSong(this.slug);  

      this.title = result[0].title;
      this.slug = result[0].slug;
      this.song = result[0].content;
      this.artist = result[0].artist;
      this.link = result[0].link;

      if (this.link != undefined) {
        this.link = "https://www.youtube.com/embed/" + this.link.split('watch?v=')[1] + "?autoplay=1";
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.link); 
      }

      this.getSongs(this.artist);
      
    } catch(error) {
      console.log(error);
    }
  }

  async getSongs(artist: string) {

    try {
      let songs = await this.dataService.getSongs(artist);  

      for (var i = 0 ; i < songs.length ; i++) {
        if (songs[i].slug == this.slug) {
          songs.splice(i, 1);
          break;
        }
      }

      this.songs = songs;

    } catch(error) {
      console.log(error);
    }

  }

}
