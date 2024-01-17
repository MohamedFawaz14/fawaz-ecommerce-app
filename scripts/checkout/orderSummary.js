import {cart, saveToStorage,removeFromCart,updateDeliveryOption} from './../../data/cart.js';
import {products,getProducts} from './../../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryoptions,getDeliveryOption} from './../../data/deliveryoption.js';
import { renderpaymentSummary } from './paymentSummary.js';



export function renderOrderSummary()
{
let  cartSummaryHtml ='';
let  matchingProducts;


cart.forEach((cartItem)=>
  {    

    matchingProducts = getProducts(cartItem);


const deliveryOptionId = cartItem.deliveryId;
   
let deliveryOption = getDeliveryOption(deliveryOptionId);


let date = dayjs();
let deliveryDate = date.add(deliveryOption.deliveryDays,'days');
let  dateString = deliveryDate.format(' dddd, MMMM D');



    cartSummaryHtml += `
        <div class ="order-summary js-order-summary-${matchingProducts.id}">

        <div class ="date">Delivery date:${dateString}</div>
    <div class = "cart-summary">
    <div class ="images">
        <img class ="images" src ="${matchingProducts.image}">
    </div>

    <div class="cart-detail"> 
    <div class="cart-name">${matchingProducts.name}</div>
    <div class ="cart-price">$${(matchingProducts.priceCents/100).toFixed(2)}</div>

    <div class="product-quantity">
        <span class ="cart-quantity">
        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
        </span>
        <span class="update-quantity-link">
        Update
        </span>
        <span class="delete-quantity-link js-delete"
        data-product-id ="${matchingProducts.id}">
        Delete
    </span>
    </div>
    </div>

    <div class ="delivery-container">

        <div class ="delivery-label"> 
            Choose a delivery Options :</div>

       
        ${deliveryOptions(matchingProducts,cartItem)}
        

    </div>

    </div>

    </div>`;
  }
);

document.querySelector('.js-cart-container').innerHTML = cartSummaryHtml;

function deliveryOptions(matchingProducts,cartItem)
{
    let deliveryOptionSummaryHTML ='';

    deliveryoptions.forEach((deliveryOption)=>
    {
        let date = dayjs();
    let deliveryDate = date.add(deliveryOption.deliveryDays,'days');
    let  dateString = deliveryDate.format(' dddd, MMMM D');

    let  price = deliveryOption.priceCents === 0 ? 'FREE' : (deliveryOption.priceCents/100).toFixed(2);
    
    let  ischecked = deliveryOption.deliveryId === cartItem.deliveryId;

        deliveryOptionSummaryHTML +=`
        <div class =" js-radio-button"
        data-product-id ="${matchingProducts.id}"
        data-delivery-id="${deliveryOption.deliveryId}">
        
        <input class ="option" type="radio"
          ${ischecked ? 'checked' : ''}
            name="delivery-option-${matchingProducts.id}"
             >
            <span class ="delivery-date">
               ${dateString}
            </span>
            <div class ="delivery-price">
                $${price} - Shipping
            </div>
            </div>`;

           
    });
   
    return deliveryOptionSummaryHTML;
}


document.querySelectorAll('.js-radio-button').forEach((option)=>
{
    option.addEventListener('click',()=>
    {
        let  deliveryId  = option.dataset.deliveryId;
        let productId = option.dataset.productId;
        
        updateDeliveryOption(productId,deliveryId);
        renderOrderSummary();
        renderpaymentSummary();
        saveToStorage();
    })
});


document.querySelectorAll('.js-delete').forEach((button)=>
{
    button.addEventListener(('click'),()=>
    {
        let  productId = button.dataset.productId;
        
        removeFromCart(productId);
      

        let container = document.querySelector
        (`.js-order-summary-${productId}`);
        container.remove();
        renderpaymentSummary();
        saveToStorage();
    });
    
});
}






