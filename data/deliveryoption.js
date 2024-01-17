export let  deliveryoptions = [
    {
        deliveryId:'1',
        deliveryDays:7,
        priceCents:0
    },

    {
        deliveryId:'2',
        deliveryDays:3,
        priceCents:499
    },

    {
        deliveryId:'3',
        deliveryDays:1,
        priceCents:999
    }
]


export function getDeliveryOption(deliveryOptionId)
{
    let deliverOption;

    deliveryoptions.forEach((options)=>
    {
      if (options.deliveryId === deliveryOptionId)
      {
        deliverOption = options;
      }
      
    });

return deliverOption;
}