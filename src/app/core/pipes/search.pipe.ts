import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(value:any[], wordsSearch:string): any[] {
    return value.filter( (item)=> item.title.toLowerCase().includes(wordsSearch.toLowerCase()));
  }

}
