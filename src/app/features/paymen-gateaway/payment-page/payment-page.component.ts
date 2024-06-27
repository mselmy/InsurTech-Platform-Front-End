import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpirationDateMaskDirective } from '../../../shared/directives/expiration-date-mask.directive';
import { CreditCardMaskDirective } from '../../../shared/directives/credit-card-mask.directive';
import { CvvMaskDirective } from '../../../shared/directives/cvv-mask.directive';
import { LocalStorageService } from '../../../core/services/localStorageService/LocalStorageService ';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CreditCardMaskDirective,
    ExpirationDateMaskDirective,
    
  ],
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
  paymentForm: FormGroup = new FormGroup({});
  savedCardLastFour: string = '';

  constructor(private fb: FormBuilder, private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadSavedCard();
  }

  initForm() {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/)]],
      expirationDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      name: ['', Validators.required]
    });
  }

  loadSavedCard() {
    this.savedCardLastFour = this.localStorageService.getCardLastFour() || '5949';
    const savedCard = this.localStorageService.getCardInfo();
    if (savedCard) {
      this.paymentForm.patchValue(savedCard);
    }
  }

  saveCard() {
    const cardNumber = this.paymentForm.get('cardNumber')?.value;
    const lastFour = cardNumber.slice(-4);
    this.localStorageService.saveCardInfo(this.paymentForm.value);
    this.localStorageService.saveCardLastFour(lastFour);
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      alert('Payment successful!');
    } else {
      this.paymentForm.markAllAsTouched();
      alert('Please fill out the form correctly.');
    }
  }
}
