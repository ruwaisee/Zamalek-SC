import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav  } from 'ionic-angular';
import { WpapiProvider } from '../../providers/wpapi/wpapi';
import { TabsPage } from '../tabs/tabs';
import { CategoryPage } from '../category/category';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface pageInterface {

  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  rootPage = 'TabsPage';

  @ViewChild(Nav) nav : Nav;

  Tabs: pageInterface[]= [
    {title:'home', pageName:'TabsPage',tabComponent:'HomePage', index: 0, icon:'home'},
    {title:'blog', pageName:'TabsPage',tabComponent:'BlogPage', index: 0, icon:'flame'},
    {title:'players', pageName:'PlayerPage', tabComponent:'PlayerPage', index: 1, icon:'heart'},
    {title:'video', pageName:'TabsPage',tabComponent:'VideoPage', index: 2, icon:'play'},
    {title:'Fit Row', pageName:'TabsPage', tabComponent:'PostCategoryPage',index: 4, icon:'heart'},
    {title:'Fit', pageName:'CategoryPage', icon:'heart'},
    {title:'shop', pageName:'ShopPage', icon:'heart'},

  ]

  categories: any = [];
    isHome: boolean = false;
  constructor(private api: WpapiProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }


  openPage(page: pageInterface){
    let params = {};

    if(page.index) {
      params = { tabIndex: page.index};
    }

    if(this.nav.getActiveChildNav() && page.index != undefined) {

      this.nav.getActiveChildNav().select(page.index);
    }else {
      this.nav.setRoot(page.pageName, params)
    }
  }

  isActive(page: pageInterface){
    
    let childNav = this.nav.getActiveChildNav();

    if(childNav) {
      if(childNav.getSelected() && childNav.getSelected().root === page.tabComponent){
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
  }

  openCategory(page){

    this.nav.setRoot(CategoryPage, {
      id: page.id,
      title: page.title
    })

    this.isHome = true;

  }

  openHome() {
    this.nav.setRoot(TabsPage);
    this.isHome = false;
  }
}
