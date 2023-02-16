import { Component } from '@angular/core';

@Component({
  selector: 'app-plushie',
  templateUrl: './plushie.component.html',
  styleUrls: ['./plushie.component.scss']
})
export class PlushieComponent {

  name: string = '';
  price: any = '';

  plushies: Plushies = [
    {name: 'Plush tiger,', price: '$25'},
    {name: 'Kangaroo,', price: '$19.99'},
    {name: 'Teddy Family,', price: '$49.99'}
  ]

}
type Plushies = Array<{ name: string; price: string }>;
