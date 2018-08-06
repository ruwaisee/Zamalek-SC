import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostCategoryPage } from './post-category';

@NgModule({
  declarations: [
    PostCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(PostCategoryPage),
  ],
})
export class PostCategoryPageModule {}
