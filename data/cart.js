export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart)
{
cart =[
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:6,
        deliveryId:'2'

    }
];
}


export function saveToStorage()
{

 localStorage.setItem('cart',JSON.stringify(cart));
}
export function addToCart(productId)
{
    let matchingItem ="";
    

        cart.forEach((cart)=>
        {
            if (cart.productId === productId)
            {
                matchingItem = cart;
            }
        });

        let  quantitySelector = document.querySelector(
            `.js-quantity-selector-${productId}`
          );
          let quantity = quantitySelector.value;
           quantity = Number(quantitySelector.value);
    
          if (matchingItem) {
            
            matchingItem.quantity += quantity;
          }
           else 
           {
            cart.push({
              productId: productId,
              quantity: quantity,
              deliveryId:'1'
            });
          }

        console.log(matchingItem);
      saveToStorage();
}

export function updateCartQuantity()
{
    let  quantity = 0;
    
    cart.forEach((cartItem)=>
    {
          quantity += cartItem.quantity ; 
          document.querySelector('.js-update-quantity').innerHTML= quantity;
    });
    
    
    
}


export function removeFromCart(productId)
{
    let newCart = [];

        cart.forEach((cartItem)=>
        {
            if (cartItem.productId !== productId)
            {
              newCart.push(cartItem);
            }
        });

         cart = newCart;
            saveToStorage();

}

export function  updateDeliveryOption(productId,deliveryId)
{
    let matchingItem;

        cart.forEach((cart)=>
        {
            if (cart.productId === productId)
            {
                matchingItem = cart;
            }
           
        });
        matchingItem.deliveryId = deliveryId;
       saveToStorage();
}