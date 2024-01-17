import{products} from './../data/products.js';
import { cart,addToCart,updateCartQuantity} from '../data/cart.js';



let productSummaryHTML ='';
products.forEach((product)=>
{
    productSummaryHTML +=`
    <div class ="product-conatiner">
        <div class="images" ><img class ="images" src ="${product.image}"></div>
        <div class="name">${product.name}</div>
        <div class="rating"><img class="rating-stars" src ="images/ratings/rating-${product.rating.stars*10}.png">
        <div class ="rating-count">${product.rating.count}</div></div>
        <div class ="price">$${(product.priceCents/100).toFixed(2)}</div>
        <select class ="select js-quantity-selector-${product.id}">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
        </select>
        <div ><button class ="button js-add-to-cart"
        data-product-id ="${product.id}" >Add To Cart</button></div>
    </div>
`
});

document.querySelector('.js-product-contanier').innerHTML = productSummaryHTML;


document.querySelectorAll('.js-add-to-cart').forEach((button)=>
{
    button.addEventListener(('click'),()=>
    {
        let productId = button.dataset.productId;

        addToCart(productId);
        updateCartQuantity();
        
    })
})
