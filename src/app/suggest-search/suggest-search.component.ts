import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-suggest-search',
  templateUrl: './suggest-search.component.html',
  styleUrls: ['./suggest-search.component.css']
})
export class SuggestSearchComponent implements OnInit {

  public query = '';
  public button = 'Ouzhpennañ'
  private detected:boolean = false;

  private searchTitle:boolean = false;


  private type:number = 0;


  public filteredList = [];

  constructor(private router: Router, private dataService:DataService) {
  }

  ngOnInit() {
  }


  selectMatchTitle(index) {

  	this.searchTitle = true;

  	this.query = this.filteredList[index];

  	console.log(index);

  	if (!this.detected && index === 0) {
  		//add the create button
  		this.type = 0;

  		this.button = "Ouzhpennañ"


  	} else {
  		//add the edit button
  		this.type = 1;
  		this.button = "Kemm"

  	}

  }

	addOrEditSong() {


		if (this.type === 0) {
			this.router.navigate(['/suggest/add']);
		} else {
			console.log("moving to edit page");
			this.router.navigate(['/suggest/edit/' + this.query]);
		}


	}


  filter() {

    if (this.query !== "") {
    	this.searchTitle = false;
      this.dataService.autocompleteTitles(this.query).then((result) => {
        this.filteredList = [];
        console.log(result);


        for (var i = 0 ; i < result['hits']['hits'].length; i ++) {

          var content = result['hits']['hits'][i]._source.title;
          if (content.toLowerCase() === this.query)
          	this.detected = true;

          this.filteredList.push(content)
        }

        //if no song match, add the name (create option)
        if (!this.detected)
        	this.filteredList.unshift(this.query);

      })
    } else {
      this.filteredList = [];
    }
  }
   


}
