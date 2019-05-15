import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/album.service';
import { Album } from 'src/app/albums';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  albums: Observable<Album[]>;

  constructor(private aS: AlbumService) { }

  ngOnInit() {
    this.albums = this.aS.paginate(0, environment.perPage);
  }

  paginateParent($event: { start: number, end: number }) {
    const { start, end } = $event;
    
    this.albums = this.aS.paginate(start, end);
  }
}