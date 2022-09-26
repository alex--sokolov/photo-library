import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  author = 'Alex Sokolov'
  github = 'https://github.com/alex--sokolov'
}
