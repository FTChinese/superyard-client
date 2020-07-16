import { Component, OnInit } from '@angular/core';
import { ArticleTeaser} from 'src/app/data/schema/wiki';

@Component({
  selector: 'app-wiki-list',
  templateUrl: './wiki-list.component.html',
  styleUrls: ['./wiki-list.component.scss']
})
export class WikiListComponent implements OnInit {

  teasers: ArticleTeaser[] = [
    {
      id: 1,
      author: 'weiguo.ni',
      createdUtc: '2020-07-16T14:15:00+08:00',
      updatedUtc: '2020-07-16T14:15:00+08:00',
      title: 'Rain village computer recover own form church interpretation silver place',
      summary: 'Audience college environment brown link cast attack ball maintain unemployment challenge failure survey do afford control need front belief hall home satisfy damage plan respect return bishop represent sheet invite',
    },
    {
      id: 2,
      author: 'weiguo.ni',
      createdUtc: '2020-07-16T14:15:00+08:00',
      updatedUtc: '2020-07-16T14:15:00+08:00',
      title: 'Rain village computer recover own form church interpretation silver place',
      summary: 'Audience college environment brown link cast attack ball maintain unemployment challenge failure survey do afford control need front belief hall home satisfy damage plan respect return bishop represent sheet invite',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
