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
 

export class SuggestEditComponent implements OnInit {

  form = new SongInfo('','','','','','');

  private id;


  constructor(private dataService:DataService, private route: ActivatedRoute, private router: Router) {
    //this.route.params.subscribe( params => this.value= params.songid );

    this.route.params.subscribe((params)=> {

      console.log(params.songid);

      this.dataService.getSong(params.songid).then((result) => {
        console.log(result);
        console.log(result['hits']['hits'][0]['_source']);

        var obj = result['hits']['hits'][0]['_source'];

        this.id = result['hits']['hits'][0]['_id'];

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
  		content:content,
      id:this.id
  	}

    console.log(data);

  	this.dataService.editSong(data).then((result) => {
  		console.log("new song edited");
      this.router.navigate(['/']);
  	});

  }

  ngOnInit() {
  }

}
