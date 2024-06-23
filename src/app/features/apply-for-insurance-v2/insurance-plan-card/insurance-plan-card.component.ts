import { Component } from '@angular/core';

@Component({
  selector: 'app-insurance-plan-card',
  standalone: true,
  imports: [],
  templateUrl: './insurance-plan-card.component.html',
  styleUrls: ['./insurance-plan-card.component.css']
})
export class InsurancePlanCardComponent {
  showMore = false;

  toggleMore() {
    this.showMore = !this.showMore;
  }
}
