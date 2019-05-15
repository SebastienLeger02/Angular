import { NgModule } from '@angular/core';
import { AlbumComponent } from './album/album.component';
// partager components, services, directive et pipe
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [AlbumComponent],
  imports: [
    ShareModule,
  ],
  // tous les components exportables à l'extérieur dans les autres modules
  exports : [ AlbumComponent ] 
})
export class AdminModule { }