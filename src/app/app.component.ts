import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, RouterLinkWithHref],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'crud-angular';
}
