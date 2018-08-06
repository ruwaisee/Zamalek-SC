import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
/*
  Generated class for the WpapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WpapiProvider {
 id: number = 9 ;
  constructor(public http: Http ) {
    console.log('Hello WpapiProvider Provider');
  }


  category(){
    return this.http.get('http://localhost:8888/zamalek/wp-json/wp/v2/categories')
    .map(data => data.json());
  }

  posts_category(id,page){
    return this.http.get("http://localhost:8888/zamalek/wp-json/wp/v2/posts?_embed&categories="+id+"&filter[order]=DESC&filter[posts_per_page]=10&page="+page)
    .map(data => data.json());
  }


}
