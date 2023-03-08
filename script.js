

let updateItemTotal = function() {
  $('tbody tr').each(function(i, ele) {
    
    // getting individual cost and quantity
    let costPerItem = parseFloat($(ele).children('.cost').text());
    let quanity = parseFloat($(ele).find('.qty').val());
    //console.log(costPerItem, quanity);
    
    // getting total cost per item
    let itemTotal = costPerItem * quanity; 
    //console.log(itemTotal);
    
    // get cart total
    
    
    // injecting hmtl into the total column
    $(ele).children('.total').html(itemTotal);
   
    return itemTotal;

  });
};

let grandTotals = [];
var cartTotal = 0;  
let updateGrandTotal = function() {
  $('tbody tr').each(function(i, ele) {
    grandTotals.splice(0, grandTotals.length);
    let total = parseFloat($(ele).children('.total').text());
    grandTotals.push(total);
    console.log(grandTotals);
    
    cartTotal = grandTotals.reduce(sum);
    console.log(cartTotal);
    return cartTotal;
  });
  $('#cart-Total').text(`Cart Total: $ ${cartTotal}`);
};


let sum = function (acc, x) { return acc + x;};

$(document).ready(function() {
  // Your code here
  console.log(cartTotal);
  updateItemTotal();
  updateGrandTotal();
  $('.qty').on('input', function() {
  
    updateItemTotal();
    updateGrandTotal();
    
  });

});