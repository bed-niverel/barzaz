import { Injectable } from '@angular/core';
import {HttpModule, Http, Response} from '@angular/http';
import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class DataService {

  //apiRoot : string = 'http://86.215.188.202/search/'
  apiRoot: string = 'http://localhost:3000/search/';
  //apiRoot: string = 'http://192.168.1.188:3000/search/';
  apiPath: string = '';

  name : string = '';

  private messageSource = new BehaviorSubject<string>("");
  currentMessage = this.messageSource.asObservable();


  constructor(private http: Http) { }


  changeMessage(message: string) {
    this.messageSource.next(message)
  }

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



  async getSong(song) {
    try {
      let result = await this.makeRequest('song/' + song);  
      return result;
    } catch(error) {
      throw(error);
    }
  }

  async getSongs(artist) : Promise<any[]> {

    try {
      let result = await this.makeRequest('artists/' + artist + '/songs');  
      return result;
    } catch(error) {
      throw(error);
    }
  }


  async getLatestSongs() {
    try {
      let result = await this.makeRequest('latestSongs');  
      return result;
    } catch(error) {
      throw(error);
    }
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



  autocompleteTitles(query) {

    this.apiPath = 'autocompleteTitles'
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



  async getRandomSong() {
    try {
      let result = await this.makeRequest('random');  
      return result;
    } catch(error) {
      throw(error);
    }
  }
   

   async makeRequest(path) {
      let apiURL = `${this.apiRoot}${path}`;

      try {
        let response = await this.http.get(apiURL).toPromise();
        return response.json();
      } catch (error) {
        throw(error);
      }
   }

}


