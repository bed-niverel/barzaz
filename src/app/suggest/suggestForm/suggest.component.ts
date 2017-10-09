import { Component, OnInit } from '@angular/core';
import { SongInfo }      from '../../shared/Form';
import { DataService } from '../../services/data.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.css']
})
 

export class SuggestComponent implements OnInit {

  constructor(private dataService:DataService, private router: Router) {
  }
  
  form = new SongInfo('','','','','','');

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
      this.router.navigate(['/suggest/success']);
  	});

  }

  ngOnInit() {
  }

}
