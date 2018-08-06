import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WpapiProvider } from '../../providers/wpapi/wpapi';
import { PostdetailPage } from '../postdetail/postdetail';
/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  datas: any = [];
  title: string = this.navParams.data.title;

  constructor(public navCtrl: NavController, public navParams: NavParams, private wpapi: WpapiProvider) {
    wpapi.posts_category(navParams.data.id, 1).subscribe(datas => {
      this.datas =  datas;
      console.log(datas);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

  openSingle(url, title){
    this.navCtrl.push(PostdetailPage, {
      url: url,
      title: title,
    })
  }

}
