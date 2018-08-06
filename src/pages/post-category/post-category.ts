import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { PostdetailPage } from '../postdetail/postdetail';

/**
 * Generated class for the PostCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-category',
  templateUrl: 'post-category.html',
})
export class PostCategoryPage {

  posts: Array<any> = new Array<any>();
  morePagesAvailable: boolean = true;
  loggedUser: boolean = false;

  categoryId: number;
  categoryTitle: string;


  constructor(private wordpresapi: WordpressProvider,public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PostCategoryPage');

    this.morePagesAvailable = true;
    //if we are browsing a category//this.navParams.get('id');
    this.categoryId = this.navParams.get('id'); // Fit Row Id= 9 from category in WordPress
    this.categoryTitle = this.navParams.get('title');

    if(!(this.posts.length > 0)){
      let loading = this.loadingCtrl.create();
      loading.present();

      this.wordpresapi.getRecentPosts(this.categoryId)
      .subscribe(data => {
        for(let post of data){
          post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
          this.posts.push(post);
        }
        loading.dismiss();
      });
    }
  }

  postTapped(event, post) {
    this.navCtrl.push(PostdetailPage, {
      item: post
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  doInfinite(infiniteScroll) {
    let page = (Math.ceil(this.posts.length/10)) + 1;
    let loading = true;

    this.wordpresapi.getRecentPosts(this.categoryId, page)
    .subscribe(data => {
      for(let post of data){
        if(!loading){
          let length = post["length"];
          if( length === 0 ) {
            infiniteScroll.complete();
            return;
          }
  
          
            this.posts.push( post[i] );
          
  
        }
        for (var i = length - 1; i >= 0; i--) {
        post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
        this.posts.push(post);
        loading = false;
        infiniteScroll.complete();
      }
      }
    }, err => {
      this.morePagesAvailable = false;
    })
  }

}
