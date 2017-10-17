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

  form = new SongInfo('','','','','','');


  constructor(private dataService:DataService, private route: ActivatedRoute, private router: Router) {
    //this.route.params.subscribe( params => this.value= params.songid );

    this.route.params.subscribe((params)=> {

      console.log(params.songid);

      this.dataService.getSong(params.songid).then((result) => {
        console.log(result);
        console.log(result['hits']['hits'][0]['_source']);

        var obj = result['hits']['hits'][0]['_source'];

        this.form = new SongInfo('','','',obj['title'],obj['artist'],obj['content']);

      })
      
    });

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
      this.router.navigate(['/suggest/success']);
  	});

  }

  ngOnInit() {
  }

}
