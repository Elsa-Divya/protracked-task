import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class FilterPipe implements PipeTransform {

  transform(items:any[],value:any): any {
    if(items.length<=0){
      return items
    }else if(!value){
      return items
    }else{
    return  items.filter(e=>{
        if(e.title.includes(value.toLowerCase()) || e.content.includes(value.toLowerCase())){
          return e
        }
      })
    }
  }

}
