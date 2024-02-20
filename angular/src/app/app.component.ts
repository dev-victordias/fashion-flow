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

  onTabSelected(event: any) {
    console.log('Tab selected:', event.index);
    switch (event.index) {
      case 0:
        this.router.navigate(['/'], { relativeTo: this.route });
        break;
      case 1:
        this.router.navigate(['/'], { relativeTo: this.route });
        break;
      case 2:
        this.router.navigate(['/products'], { relativeTo: this.route });
        break;
      case 3:
        this.router.navigate(['/customers'], { relativeTo: this.route });
        break;
      default:
        break;
    }
  }
}
