import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostdetailPage } from '../postdetail/postdetail';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the BlogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blog',
  templateUrl: 'blog.html',
})
export class BlogPage {


url: string = 'http://localhost:8888/zamalek/wp-json/wp/v2/posts';
	items: any;
	page: any;

	item;
	
	//maximumPages = 3;
  constructor(private toastCtrl: ToastController, private http: Http,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlogPage');
    this.page = '1';
    this.loadPosts( this.page ).then( data => {
			console.log('Posts loaded', data);
			this.items = data;
		});

		
  }

  loadPosts( page ) {

		if( !page ) {
	      let page = '1';
	    }

      return new Promise(resolve => {

			this.http.get( this.url + '?page=' + page )
		    .map(res => res.json())
		    .subscribe(data => {
		      // we've got back the raw data, now generate the core schedule data
		      // and save the data for later reference
		      resolve( data );
		    });

		});
	}

  itemTapped(event,item) {
		this.navCtrl.push(PostdetailPage, {
		  item: item
		});
	}

  loadMore(infiniteScroll) {

	    this.page++;

	    this.loadPosts( this.page ).then( items => {
	      // Loads posts from WordPress API
	      let length = items["length"];

	      if( length === 0 ) {
					infiniteScroll.complete();
					infiniteScroll.enable(false);

	        return;
	      }

	      for (var i = length - 1; i >= 0; i--) {
					this.items.push( items[i] );
	      }
				
				infiniteScroll.complete();

			
			});
			
	}
	

}
