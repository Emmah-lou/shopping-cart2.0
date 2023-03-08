

let updateItemTotal = function() {
  $('tbody tr').each(function(i, ele) {
    
    // getting individual cost and quantity
    let costPerItem = parseFloat($(ele).children('.cost').text());
    let quanity = parseFloat($(ele).find('.qty').val());
    //console.log(costPerItem, quanity);
    
    // getting total cost per item
    let itemTotal = costPerItem * quanity; 
    
    // injecting hmtl into the total column
    $(ele).children('.total').html(itemTotal);
   
    return itemTotal;

  });
};

let grandTotals = [];
var cartTotal = 0;

let sum = function (acc, x) { return acc + x;};

let updateGrandTotal = function() {
  grandTotals.splice(0, grandTotals.length);
  $('tbody tr').each(function(i, ele) {
    let total = parseFloat($(ele).children('.total').text());
    grandTotals.push(total);
    //console.log(grandTotals);
    
    cartTotal = grandTotals.reduce(sum);
    //console.log(cartTotal);
    return cartTotal;
  });
  $('#cart-Total').text(`Cart Total: $ ${cartTotal}`);
};

let checkForMaxItems = function() {
  let maxItems = 3;
  let currentItems = $('tbody .item').length;
  //console.log(currentItems);
  if (currentItems >= maxItems) {
    $('#btn-add').hide();
  } else if (currentItems < maxItems) {
    $('#btn-add').show();
  }
};

$(document).on('click', '#btn-delete', function() {
  $(this).closest('tr').remove();
  updateItemTotal();
  updateGrandTotal();
  checkForMaxItems();
});

$('#btn-add').on('submit', function(event) {
  event.preventDefault();
  let newItemName = $(this).children('[name=name-of-item]').val();
  let newItemCost = $(this).children('[name=cost-of-item]').val();
  //console.log(newItemName, newItemCost);
  
  
  $('tbody').append('<tr>' + 
  '<td class="item">' + newItemName + '</td>' + 
  '<td class="cost">' + newItemCost + '</td>' + 
  '<td>' + '<input class="qty" type="number" value="1">' + '</td>' + 
  '<td class="total">' + '</td>' + 
  '<td class="btn-delete">' + '<button id="btn-delete">Delete</button>' + '</td>' + '</tr>');
  updateItemTotal();
  updateGrandTotal();
  $(this).children('[name=name-of-item]').val('');
  $(this).children('[name=cost-of-item]').val('');
  checkForMaxItems();
});

$(document).ready(function() {
  // Your code here
  //console.log(cartTotal);
  updateItemTotal();
  updateGrandTotal();
  $('.qty').on('input', function() {
  
    updateItemTotal();
    updateGrandTotal();
    
  });

});