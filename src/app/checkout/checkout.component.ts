import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  stripe_key = "pk_test_51OQdjgB4f2ZoQ9Fdo2FZdo6dvFbOtFIpUz0WEC6PWJWxRUYjBro0JdSpRrnULV5XS0zfbUyfi6dFSkxupDPc4qhR00q64cIqCN"
  // We load  Stripe
  stripePromise = loadStripe(this.stripe_key);
  constructor(private http: HttpClient) {}

  starterPriceId = 'price_1OWqMIB4f2ZoQ9FdIVqdCs9M';
  advancedPriceId = 'price_1OWrqsB4f2ZoQ9Fd3SetyHhv';
  professionalPriceId = 'price_1OWrr6B4f2ZoQ9FdRcoAPFQw';

  async checkoutStarter(): Promise<void>{
    this.checkout(this.starterPriceId);
  }
  async checkoutAdvanced(): Promise<void>{
    this.checkout(this.advancedPriceId);
  }
  async checkoutProfessional(): Promise<void>{
    this.checkout(this.professionalPriceId);
  }


//this method do the checkout for a priceId and it is async because it awaiting the Promise object
  private async checkout(priceId: string): Promise<void> {
    // here we create a payment object
    const checkout = {
      priceId: priceId,
      cancelUrl: 'http://localhost:4200/canceled',
      successUrl: 'http://localhost:4200/success',
    };

    const stripe = await this.stripePromise;

    // this is a normal http calls for a backend api
    this.http
      .post(`http://localhost:8080/wandergym/api/subscription`, checkout)
      .subscribe((data: any) => {
        // I use stripe to redirect To Checkout page of Stripe platform
        stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });
      });
  }

}
