import { Component, OnInit } from '@angular/core';
import { SongInfo }      from '../shared/Form';
import { DataService } from '../services/data.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-suggest',
  templateUrl: 'template/html/suggest.html',
  styleUrls: ['template/css/suggest.css']
})
 

export class SuggestComponent implements OnInit {

  form = new SongInfo('','','','','','');

  private title:string='';


  private id;
  private router: Router;
  private route: ActivatedRoute;
  private edit:boolean;

  constructor(private dataService:DataService, private _route: ActivatedRoute, private _router: Router) {
    this.router=_router;
    this.route=_route;

    //console.log(this.router.url.split('/')[2]);

    if (this.router.url.split('/')[2] == 'edit') {
      this.edit = true;
    } else {
      this.edit = false;
    }

  }

  ngOnInit() {
    this.initForm();
  }

  async initForm() {
    if (this.edit) {
      let params = await this.route.params.first().toPromise();
      console.log(params.songid);

      try {
        let result = await this.dataService.getSong(params.songid);
        var obj = result[0];
        this.id = result[0]['id'];

        this.form = new SongInfo('','',obj['title'],obj['artist'],obj['link'],obj['content']);
      } catch (error) {
        console.log(error);
      }
    } else {
      this.dataService.currentMessage.subscribe(title => this.title = title)
      this.form = new SongInfo('','',this.title,'','','');
    }
  }
  

  onSubmit(form) {
    //this.submitted = true;
    console.log(form.value);

  	let title = form.value.title;
  	let content = form.value.content;
  	let artist = form.value.artist;
    let link = form.value.link;

  	let data = {
  		title:title,
  		artist:artist,
      link:link,
  		content:content
  	}

    if (this.edit) {
      data['id']=this.id
      this.dataService.editSong(data).then((result) => {
        console.log("new song edited");
        this.router.navigate(['/']);
      });

    } else {
      this.dataService.addNewSong(data).then((result) => {
        console.log("new song added");
        this.router.navigate(['/']);
      });
    }

  }

}
