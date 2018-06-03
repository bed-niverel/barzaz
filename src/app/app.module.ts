import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpModule, Http, Response} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {TranslateLoader, TranslateModule} from 'ng2-translate';
import {TranslateLoaderFactory} from './app.translate.factory';

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { PagerService } from './services/pager.service';
import { SongComponent } from './song/song.component';
import { NavComponent } from './nav/nav.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { ArtistComponent } from './artist/artist.component';
import { SongListComponent } from './song-list/song-list.component';
import { SuggestSearchComponent } from './suggest-search/suggest-search.component';
import { SuggestComponent } from './suggest/suggest.component';
import { SuggestSuccessComponent } from './suggest/suggest-success/suggest-success.component';


export class PlunkerMaterialModule {}

const appRoutes: Routes = [
	{
		path:'',
		component:HomeComponent
	},
	{
		path:'suggest/search',
		component:SuggestSearchComponent
	},
	{
		path:'suggest/edit/:songid',
		component:SuggestComponent
	},
	{
		path:'suggest/add',
		component:SuggestComponent
	},
	{
		path:'search/:term',
		component:SearchComponent
	},
	{
		path:'songs/:songid',
		component:SongComponent
	},
	{
		path:'artists/:id',
		component:ArtistComponent
	},
	{
		path:'artists',
		redirectTo: '/artists/A', pathMatch: 'full'
	},
	{
		path:'artists/:artistid/songs',
		component:SongListComponent
	}
];


@NgModule({
  declarations: [
    AppComponent,
    SongComponent,
    NavComponent,
    SuggestComponent,
    SearchComponent,
    HomeComponent,
    ArtistComponent,
    SongListComponent,
    SuggestSearchComponent,
    SuggestComponent,
    SuggestSuccessComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: TranslateLoaderFactory,
      deps: [Http]
		}),
    RouterModule.forRoot(
			appRoutes
    )
  ],
  providers: [DataService,PagerService],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor() { }



}


