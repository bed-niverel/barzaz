import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistSongListComponent } from './artist-song-list.component';

describe('SongListComponent', () => {
  let component: ArtistSongListComponent;
  let fixture: ComponentFixture<ArtistSongListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistSongListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistSongListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
