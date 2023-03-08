//update the total cost of each item in the cart
let updateItemTotal = function() {

  //loop through each row in the table
  $('tbody tr').each(function(i, ele) {   
    let costPerItem = parseFloat($(ele).children('.cost').text());
    let quanity = parseFloat($(ele).find('.qty').val());
    
    let itemTotal = costPerItem * quanity; 

    //update the total cost of each item in the cart
    $(ele).children('.total').html(itemTotal);
    return itemTotal;
  });
};

// array to hold the total cost of each item in the cart
let grandTotals = [];
var cartTotal = 0;

// function to add the total cost of each item in the cart
let sum = function (acc, x) { return acc + x;};

// update the grand total of the cart
let updateGrandTotal = function() {
  grandTotals.splice(0, grandTotals.length);
  $('tbody tr').each(function(i, ele) {
    let total = parseFloat($(ele).children('.total').text());
    grandTotals.push(total);
    cartTotal = grandTotals.reduce(sum);
    return cartTotal;
  });
  $('#cart-Total').text(`Cart Total: $ ${cartTotal}`);
};
// checks to see if the number of items in the cart is greater than or equal to 15 and if so, hides the add item button
let checkForMaxItems = function() {
  let maxItems = 15;
  let currentItems = $('tbody .item').length;
  if (currentItems >= maxItems) {
    $('#btn-add').hide();
  } else if (currentItems < maxItems) {
    $('#btn-add').show();
  }
};
// removes the item from the cart when the delete button is clicked
$(document).on('click', '#btn-delete', function() {
  $(this).closest('tr').remove();
  updateItemTotal();
  updateGrandTotal();
  checkForMaxItems();
});


// adds a new item to the cart when the add item button is clicked
$('#btn-add').on('submit', function(event) {
  event.preventDefault();

  let newItemName = $(this).children('[name=name-of-item]').val();
  let newItemCost = $(this).children('[name=cost-of-item]').val();
  
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

// document ready function
$(document).ready(function() {
  updateItemTotal();
  updateGrandTotal();
  $('.qty').on('input', 'qty', function() {
    updateItemTotal();
    updateGrandTotal();
  });
});