import {getProducts, products} from './../../data/products.js';
import { cart } from '../../data/cart.js';
import {getDeliveryOption} from './../../data/deliveryoption.js';


export function renderpaymentSummary()
{
    let productPriceCents = 0;
    let shippingsPriceCents = 0;
    let cartQuantity = 0;
    cart.forEach((cartItem)=>
    {
        const product = getProducts(cartItem);
        productPriceCents += product.priceCents*cartItem.quantity;

        const shipping = getDeliveryOption(cartItem.deliveryId);
         shippingsPriceCents += shipping.priceCents;

         cartQuantity += cartItem.quantity; 
    });

    console.log(cartQuantity);
    let totalBeforeTax = productPriceCents + shippingsPriceCents;

     let estimatedTax = totalBeforeTax *0.1;

     let total = totalBeforeTax + estimatedTax;


     let paymentSummaryHTML =
      `
      <div class = "price">
          Items (${cartQuantity}): 
          <span class="payment-price"> $${(productPriceCents/100).toFixed(2)}</span>
      </div>
  


      <div class="shipping">
          Shipping & handling: 
          <span class ="payment-shipping">$${(shippingsPriceCents/100).toFixed(2)}</span> 
      </div>

      <p class ="line"></p>


      <div class="totalTax">
          Total Before tax:
          <span  class="payment-total-tax"> $${(totalBeforeTax/100).toFixed(2)}</span>
      </div>



      <div class="estimatedTax">
          Estimated tax (10%):
          <span 
          class ="payment-estimated-tax">
          $${(estimatedTax/100).toFixed(2)}</span> 
      </div>
 
      <p class="line1"></p>

      <div class ="ordertotal">
          Order Total: 
          <span 
          class="payment-order-total">
          $${(total/100).toFixed(2)}</span>
      </div>


      <button> Place Your Order</button>
     `;

     document.querySelector('.js-payment-container').innerHTML = paymentSummaryHTML;

     document.querySelector('.js-quantity-total').innerHTML = `${cartQuantity} items`;
}





