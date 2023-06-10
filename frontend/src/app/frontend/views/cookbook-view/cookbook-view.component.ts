import { Component } from '@angular/core';
import {BreadcrumbService} from "../../../services/breadcrumb.service";

@Component({
  selector: 'app-cookbook-view',
  templateUrl: './cookbook-view.component.html',
  styleUrls: ['./cookbook-view.component.scss']
})
export class CookbookViewComponent {
  constructor(private breadcrumbService: BreadcrumbService) {
  }

  ngOnInit() {
    this.breadcrumbService.breadcrumb = null;
  }
}
