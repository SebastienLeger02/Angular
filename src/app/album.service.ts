import { Injectable } from '@angular/core';
import { Album, List, Position } from './albums'; // types
import { ALBUMS, ALBUM_LISTS } from './mock-albums';

import { Subject, Observable } from 'rxjs'; // librarie à parti intégrée dans Angular
// Service et classe utile
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Opérateurs de RxJS
import { map } from 'rxjs/operators';
// libraire utile pour le traitement de données
import * as _ from 'lodash';
2
// définition des headers
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class AlbumService {

  private _albums: Album[] = ALBUMS; // _ convention private et protected
  private _albumList: List[] = ALBUM_LISTS;

  private albumsUrl = 'https://app-music-76220.firebaseio.com/albums';
  private albumListsUrl = 'https://app-music-76220.firebaseio.com/albumLists';

  // Observer => next publication d'information et Observable d'attendre des informations et d'exécuter du code
  sendCurrentNumberPage = new Subject<{ current: number, paginate: number }>();

  subjectAlbum = new Subject<Album>();

  constructor(private http: HttpClient) { }

  getAlbums(order = (a, b) => b.duration - a.duration): Album[] {
    return this._albums.sort(order);
  }

  getAlbums2(order = (a,b) => b.duration - a.duration) :Observable<Album[]> {

    return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(
      map(albums => _.values(albums)),
      map(albums => {
        return this._albums.sort(
          (a,b) => { return b.duration - a.duration}
        );
      })
    )
  }

  getAlbum(id: string): Album {
    return this._albums.find(list => list.id === id);
  }

  getAlbumList(id: string): List {
    return this._albumList.find(l => l.id === id);
  }

  count(): number {
    return this._albums == null ? 0 : this._albums.length;
  }

  switchOn(album: Album): void {
    //this.buttonPlay.next(true);

    this.getAlbums().map(al => {
      if (album.id === al.id) { al.status = 'on'; this.subjectAlbum.next(album); }
      else al.status = 'off';
    });
  }

  switchOff(album: Album): void {
    //this.buttonPlay.next(false);
    this.getAlbums().map(al => {
      al.status = 'off';
    });
  }

  paginate(start: number, end: number): Album[] {
    return this.getAlbums().slice(start, end);
  }

  search(word: string | null): Album[] {

    if (word == null) return this.getAlbums();

    let albums = [];

    if (word.length > 3) {

      this.getAlbums().forEach(album => {
        if (album.title.includes(word)) albums.push(album);
      });
    }

    return albums;
  } 

}