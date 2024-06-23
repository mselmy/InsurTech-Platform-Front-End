import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { FooterComponent } from '../../core/components/footer/footer.component';
import { QuestionsFormComponent } from './components/questions-form/questions-form.component';

@Component({
  selector: 'app-apply-for-insurance',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    QuestionsFormComponent
  ],
  templateUrl: './apply-for-insurance.component.html',
  styleUrl: './apply-for-insurance.component.css'
})
export class ApplyForInsuranceComponent {

}
