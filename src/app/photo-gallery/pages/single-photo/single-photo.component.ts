import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinglePhotoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
