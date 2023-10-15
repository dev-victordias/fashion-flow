import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fashion-flow';

  constructor(private router: Router, private route: ActivatedRoute) {}

  navigateToListProducts() {
    this.router.navigate(['products'], { relativeTo: this.route });
  }

  navigateToAddProducts() {
    this.router.navigate(['products/new'], { relativeTo: this.route });
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
