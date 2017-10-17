import { Injectable } from '@angular/core';
import {HttpModule, Http, Response} from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class DataService {

  //apiRoot : string = 'http://86.215.188.202/search/'
  apiRoot: string = 'http://localhost:3000/search/';
  apiPath: string = '';

  name : string = '';

  constructor(private http: Http) { }

  searchTerm(term:string, type:string) {
  	//console.log('searching the following term : ' + term);

  	if (type === 'title') {
  		this.apiPath = 'findSongsByTitle'
  	} else if (type === 'artist') {
  		this.apiPath = 'findSongsByArtist'
  	} else {
  		this.apiPath = 'findSongsByTerms'
  	}

  	let apiURL = `${this.apiRoot}${this.apiPath}?term=${term}`;


  	let promise = new Promise((resolve, reject) => {
      this.http.get(apiURL)
          .toPromise()
          .then(
              res => { // Success
                console.log(res);
                //this.results = res.json().results;
                resolve(res.json());
              },
              msg => { // Error
                reject(msg);
              }
          );
    });
    return promise;
  }

  addNewSong(data) {

    this.apiPath = 'song/add'
    let apiURL = `${this.apiRoot}${this.apiPath}`;

    console.log(data);
    let promise = new Promise((resolve, reject) => {
      console.log(apiURL);
      this.http.put(apiURL,data)
          .toPromise()
          .then(
              res => { // Success
                console.log(res);
                //this.results = res.json().results;
                resolve(res);
              },
              msg => { // Error
                reject(msg);
              }
          );
    });
    return promise;
  }

  editSong(data) {

    this.apiPath = 'song/edit'
    let apiURL = `${this.apiRoot}${this.apiPath}`;

    console.log(data);
    let promise = new Promise((resolve, reject) => {
      console.log(apiURL);
      this.http.put(apiURL,data)
          .toPromise()
          .then(
              res => { // Success
                console.log(res);
                //this.results = res.json().results;
                resolve(res);
              },
              msg => { // Error
                reject(msg);
              }
          );
    });
    return promise;
  }



  getSong(song) {

    this.apiPath = 'song'
    let apiURL = `${this.apiRoot}${this.apiPath}/` + song;

    let promise = new Promise((resolve, reject) => {
      this.http.get(apiURL)
          .toPromise()
          .then(
              res => { // Success
                console.log(res);
                //this.results = res.json().results;
                resolve(res.json());
              },
              msg => { // Error
                reject(msg);
              }
          );
    });
    return promise;
  }

  getSongs(artist) : Promise<any[]> {
    this.apiPath = 'artists'
    let apiURL = `${this.apiRoot}${this.apiPath}/` + artist + '/songs';

    let promise = new Promise((resolve, reject) => {
      console.log(apiURL);
      this.http.get(apiURL)
          .toPromise()
          .then(
              res => { // Success
                console.log(res);
                resolve(res.json());
              },
              msg => { // Error
                reject(msg);
              }
          );
    });
    return promise;
  }

  getLatestSongs() {
    this.apiPath = 'latestSongs'
    let apiURL = `${this.apiRoot}${this.apiPath}`;

    let promise = new Promise((resolve, reject) => {
      this.http.get(apiURL)
          .toPromise()
          .then(
              res => { // Success
                console.log(res);
                //this.results = res.json().results;
                resolve(res.json());
              },
              msg => { // Error
                reject(msg);
              }
          );
    });
    return promise;
  }

  getArtists(letter) {
    this.apiPath = 'artistsByAlphabet'
    let apiURL = `${this.apiRoot}${this.apiPath}/` + letter;

    let promise = new Promise((resolve, reject) => {

      this.http.get(apiURL)
          .toPromise()
          .then(
              res => { // Success
                console.log(res);
                //this.results = res.json().results;
                resolve(res.json());
              },
              msg => { // Error
                reject(msg);
              }
          );
    })
    return promise;
  }



  autocomplete(query) {

    this.apiPath = 'autocomplete'
    let apiURL = `${this.apiRoot}${this.apiPath}?term=` + query;

    let promise = new Promise((resolve, reject) => {
      this.http.get(apiURL)
          .toPromise()
          .then(
              res => { // Success
                console.log(res);
                //this.results = res.json().results;
                resolve(res.json());
              },
              msg => { // Error
                reject(msg);
              }
          );
    });
    return promise;
  }

      

}


