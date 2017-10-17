import { Component, OnInit } from '@angular/core';
import { SongInfo }      from '../../shared/Form';
import { DataService } from '../../services/data.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-suggest',
  templateUrl: '../template/html/suggest.html',
  styleUrls: ['../template/css/suggest.css']
})
 

export class SuggestAddComponent implements OnInit {

  form = new SongInfo('','','','','','');


  constructor(private dataService:DataService, private route: ActivatedRoute, private router: Router) {
    


  }

  

  onSubmit(form) {
    //this.submitted = true;
    console.log(form.value);

  	let title = form.value.title;
  	let content = form.value.content;
  	let artist = form.value.artist;

  	let data = {
  		title:title,
  		artist:artist,
  		content:content
  	}

  	this.dataService.addNewSong(data).then((result) => {
  		console.log("new song added");
      this.router.navigate(['/']);
  	});

  }

  ngOnInit() {
  }

}
