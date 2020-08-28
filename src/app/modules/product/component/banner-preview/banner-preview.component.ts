import { Component, OnInit, Input } from '@angular/core';
import { BannerForm } from '../../schema/BannerForm';

@Component({
  selector: 'app-banner-preview',
  templateUrl: './banner-preview.component.html',
  styleUrls: ['./banner-preview.component.scss']
})
export class BannerPreviewComponent implements OnInit {

  @Input() preview: BannerForm;

  constructor() { }

  ngOnInit(): void {
  }

}
