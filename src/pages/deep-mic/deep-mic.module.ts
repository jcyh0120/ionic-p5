import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeepMicPage } from './deep-mic';

@NgModule({
  declarations: [
    DeepMicPage,
  ],
  imports: [
    IonicPageModule.forChild(DeepMicPage),
  ],
})
export class DeepMicPageModule {}
