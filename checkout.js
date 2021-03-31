// Declare variable to get order from sessionStorage
let order = [];
// Declare variables to catogorise infomation from sessionStorage
let orderName = [];
let orderPrice = [];
let orderQuantity = [];
// Declare and initialise total and discount
let total = 0;
let discount = 0;
// Declare variable to check whether coupon is valid
let couponStatus = false;

// Declare and get orderOption from sessionStorage
let option = sessionStorage.getItem('orderOption');

// Check orderOption and output information accordingly
if (option === "Delivery") {
    let info = JSON.parse(sessionStorage.getItem('loggedUser')); 
    let deliveryStr = "Address: " + info.address + "<br> Contact No: " + info.telNo;
    document.getElementById("option").innerHTML += option + "<br>" + deliveryStr;
}
else {
    let info = JSON.parse(sessionStorage.getItem('loggedUser')); 
    let collectionStr = "Contact No: " + info.telNo + "<br> You will be contacted when the order is ready." + "<br> Please collect it within 30 minutes.";
    document.getElementById("option").innerHTML += option + "<br>" + collectionStr;
}

// Get order from sessionStorage
order = JSON.parse(sessionStorage.getItem('order'));

// Declare variable to count order length
let i=0;
// Categorise order information
while (i+2 <= order.length) {
    orderName.push(order[i]);
    orderPrice.push(order[i+1]);
    orderQuantity.push(order[i+2]);
    i+=3;
}

// Declare variable to count order informaiton length
let a=0;
// Input order information
while (a <= orderName.length && orderName.length > 0) {
    // Remove all spaces with global modifier to match picture names
    pic = orderName[a].replace(/ /g, "");
    // Input information accordingly and calculate total
    document.getElementById("pic"+(a+1)).src = "Images/" + pic + ".jpg";
    document.getElementById("prod"+(a+1)).innerHTML = orderName[a];
    document.getElementById("prodPrice"+(a+1)).innerHTML = orderPrice[a];
    document.getElementById("prodQty"+(a+1)).innerHTML = orderQuantity[a];
    document.getElementById("prodTotalPrice"+(a+1)).innerHTML = Number(orderPrice[a] * +orderQuantity[a]).toFixed(2);
    total += Number(orderPrice[a] * +orderQuantity[a]);
    document.getElementById("cart-subtotal").innerHTML = total.toFixed(2);
    updateGrandTotal();
    // Add order count
    a+=1;

    // Clone div if there are more items in order
    if (a < orderName.length) {
        // Clone div with all inner elements
        let itm = document.querySelector(".product");
        let cln = itm.cloneNode(true);

        // Append the cloned div element under class="shopping-cart"
        document.querySelector(".shopping-cart").appendChild(cln);

        // Change all child elements with new ids
        cln.querySelector("#pic1").setAttribute("id","pic"+(a+1));
        cln.querySelector("#prod1").setAttribute("id","prod"+(a+1));
        cln.querySelector("#prodPrice1").setAttribute("id","prodPrice"+(a+1));
        cln.querySelector("#prodQty1").setAttribute("id","prodQty"+(a+1));
        cln.querySelector("#prodTotalPrice1").setAttribute("id","prodTotalPrice"+(a+1));
    }
}

// Remove item when remove button is clicked
function removeItem(removeButton) {
    // Remove item row and recalculate cart total
    let productRow = removeButton.parentElement.parentElement;
    productRow.remove();
    let minusPrice = productRow.querySelector(".product-line-price").innerHTML;
    total -= minusPrice;
    document.getElementById("cart-subtotal").innerHTML = total.toFixed(2);
    // Recalculate discount from subtotal if promo code is valid
    if (couponStatus) {
        calculateDiscount();
    }
    updateGrandTotal();
}

// Check if promo code is valid
function checkCode() {
    // Get promo code from input
    let code = document.getElementById("coupon-code").value;

    if (code === "GMIT10") {
        // Calculate discount and alert message if promo code is valid
        calculateDiscount();
        alert("Valid promo code. Discount applied.")
        couponStatus = true;
    }
    else {
        // Alert error message if promo code is invalid
        alert("Invalid promo code.");
    }
    // Update total
    updateGrandTotal();
}

// Function to update cart total
function updateGrandTotal() {
    document.getElementById("cart-total").innerHTML = (total - discount).toFixed(2);
}

// Function to calculate discount
function calculateDiscount() {
    discount = (total * 0.1).toFixed(2);
    document.getElementById("cart-discount").innerHTML = discount;
}

// Function to clear order from sessionStorage and redirect to home page when checkout button is clicked
function clearOrder() {
    alert("Your order has been placed. \nThank you for ordering with GMIT Eats.");
    sessionStorage.clear();
    window.location.replace("home.html");
}




  