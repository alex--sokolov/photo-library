import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery-header',
  templateUrl: './gallery-header.component.html',
  styleUrls: ['./gallery-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryHeaderComponent implements OnInit {
  @Input() activeTab!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
