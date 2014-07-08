//when document ready
$(function() {

    //template item
    var templateItem = {
        product_name: 'Product Name',
        price: 19.95
    };

    //cart object
    var cart = {
        items: [],

        //add item to cart
        addItem: function(item) {
            this.items.push(item);
        },

        //remove item from cart
        removeItem: function(index) {
            if (index > -1) {
                this.items.splice(index, 1);
            }
        },
        //show how many items
        showItemsCount: function() {
            //show how many items in the cart
            var itemCount = $("#item_count");
            if (itemCount) {
                itemCount.html(cart.items.length);
            }
        },
        //get total price of item in cart
        getTotalPrice: function() {
            var total = 0;
            for (var i = this.items.length - 1; i >= 0; i--) {
                total += this.items[i].price;
            };
            return total.toFixed(2); //return two decimal points
        },
        //show the popup table
        insertPopupTable: function() {
            var cart_popup = $('#cart_popup');
            if(cart_popup){
              var popupHtml = "<table>";

              //heading
              popupHtml += "<tr><td>Product</td><td>Price</td><td>Action</td>";

              //items
              for (var i = this.items.length - 1; i >= 0; i--) {
                  popupHtml += "<tr><td>" + this.items[i].product_name + "</td><td class='text-right'>" + this.items[i].price + "</td><td class='text-center'>" + "<a href='#' class='cart-action' data-delete-item='" + i + "'>x</a>" + "</td>";
              };

              //total
              popupHtml += "<tr><td>Total</td><td class='text-right'>" + this.getTotalPrice() + "</td><td></td></tr>";
              popupHtml += "</table>";
              $(popupHtml).appendTo("#cart_popup");
            }
        },
        //remove the popup table from cart_popup
        removePopupTable: function() {
            var cart_popup_table = $('#cart_popup table');
            if(cart_popup_table)
              $('#cart_popup table').remove();
        }
    };

    //add the cart with template item to show l
    cart.addItem(templateItem);

    //show item count. i.e. Items:1
    cart.showItemsCount();

    /* Search box */
    var txtSearch = $("input#txt_search");
    if (txtSearch) {
        //bind with focus event
        txtSearch.focus(function() {
            $(this).val('');
        });

        txtSearch.blur(function() {
            $(this).val('Enter a keyword');
        });
    }

    /* Buy now button */
    var btnBuyNow = $("#btn_buy");
    if (btnBuyNow) {
        btnBuyNow.click(function() {
            //add item to cart
            cart.addItem(templateItem);
            //update the item count
            cart.showItemsCount();
        });
    }

    /* Hover state on cart section */
    var cartSection = $('#cart');
    if (cartSection) {
        cartSection.mouseover(function(e) {
            e.stopPropagation();
            if ($("table", cartSection).length == 0) {
                //insert popup table into cart popup
                cart.insertPopupTable();
                //show the popup element
                $("#cart_popup").show();
            }
        })
    }

    /* Event when mouse out/leave from the popup */
    $("#cart_popup").mouseleave(function(e) {
        e.stopPropagation();
        //insert popup table into cart popup
        cart.removePopupTable();
        //hide the cart popup
        $("#cart_popup").hide();
    })

    //event for a with data-delete-item
    $("#cart_popup").on("click", "a[data-delete-item]", function() {
        var itemIndexToBeDeleted = $(this).data('delete-item');
        //remove item from the array
        cart.removeItem(itemIndexToBeDeleted);

        //update total items in cart
        cart.showItemsCount();

        //refresh table
        cart.removePopupTable();
        cart.insertPopupTable();

    })
});
