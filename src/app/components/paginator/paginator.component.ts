import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'paginator',
    imports: [RouterModule],
    standalone: true,
    templateUrl: './paginator.component.html'
})
export class PaginatorComponent {

  @Input() url: string = '';
  @Input() paginator: any = {};
}