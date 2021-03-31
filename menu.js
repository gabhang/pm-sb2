// productsObj stores information about each product so it can be accessed and manipulated. It is searched by the addToOrder and addOption functions
let productsObj = {
    prod1Name: "Margherita Pizza", prod1Price: "5.00",
    prod2Name: "Vegetarian Pizza", prod2Price:"6.00",
    prod3Name: "Meat Lovers Pizza", prod3Price: "8.00",
    prod4Name: "Double Pepperoni Pizza", prod4Price: "7.00",
    prod5Name: "Hawaiian Pizza", prod5Price: "7.50",
    prod6Name: "Sweet Pizza", prod6Price: "5.00",
    prod7Name: "French Fries", prod7Price: "2.50",
    prod8Name: "Sweet Potato Fries", prod8Price: "3.50",
    prod9Name: "Chunky Wedges", prod9Price: "3.00", 
    prod10Name: "Onion Rings", prod10Price: "2.75",
    prod11Name: "Dip", prod11Price: "1.00",
    prod12Name: "Chocolate Lava Cake", prod12Price: "5.00",
    prod13Name: "PB and Choc Cookies", prod13Price: "3.50",
    prod14Name: "Coca Cola 500ml", prod14Price: "1.10",
    prod15Name: "Club Orange 500ml", prod15Price: "1.10",
    prod16Name: "Club Lemon 500ml", prod16Price: "1.10",
    prod17Name: "7up 500ml", prod17Price: "1.10",
    prod18Name: "Vanilla Milkshake", prod18Price: "1.70",
    prod19Name: "Chocolate Milkshake", prod19Price: "1.90",
	prod20Name: "Water 500ml", prod20Price: "1.00"
}
// END CODE BLOCK - productsObj definition 

// order array is used to store the products selected by the customer. It is used in the addToOrder and addOption functions
let order = [];

// The 'changeTab' function - adds/removes the class 'hidden' from the class list of the chosen tab so we can show the items associated with the chosen tab and hide the ones we don't want to see, and also displays the current category choice in bold.
	function changeTab (tab)
	{
		let pizzaDiv = document.getElementById('pizzaDiv');
		let sidesDiv = document.getElementById('sidesDiv');
		let dessertsDiv = document.getElementById('dessertsDiv');
		let drinksDiv = document.getElementById('drinksDiv');
		let pizzas = document.getElementById('pizzaTab');
		let sides = document.getElementById('sidesTab');
		let desserts = document.getElementById('dessertsTab');
		let drinks = document.getElementById('drinksTab');
		
		
		if (tab === 'pizza')
		{
			pizzaDiv.classList.remove('hidden');
			sidesDiv.classList.add('hidden');
			dessertsDiv.classList.add('hidden');
			drinksDiv.classList.add('hidden');

			pizzas.classList.add('active');
			sides.classList.remove('active');
			desserts.classList.remove('active');
			drinks.classList.remove('active');
		} //pizza if
		else if (tab === 'sides')
		{
			pizzaDiv.classList.add('hidden');
			sidesDiv.classList.remove('hidden');
			dessertsDiv.classList.add('hidden');
			drinksDiv.classList.add('hidden');
		
			pizzas.classList.remove('active');
			sides.classList.add('active');
			desserts.classList.remove('active');
			drinks.classList.remove('active');
		} //sides else if
		else if (tab === 'desserts')
		{
			pizzaDiv.classList.add('hidden');
			sidesDiv.classList.add('hidden');
			dessertsDiv.classList.remove('hidden');
			drinksDiv.classList.add('hidden');
			
			pizzas.classList.remove('active');
			sides.classList.remove('active');
			desserts.classList.add('active');
			drinks.classList.remove('active');
		} //desserts else if
		else if(tab === 'drinks')
		{
			pizzaDiv.classList.add('hidden');
			sidesDiv.classList.add('hidden');
			dessertsDiv.classList.add('hidden');
			drinksDiv.classList.remove('hidden');
			
			pizzas.classList.remove('active');
			sides.classList.remove('active');
			desserts.classList.remove('active');
			drinks.classList.add('active');
		}// drinks else if
	}// changeTab
	// END CODE BLOCK - changeTab function 

// The addToOrder function 
function addToOrder(opt)
{
	// Each button passes in a different value depending on the button pressed and adds on the string "Price" and "Name". Then productsObj array is accessed to store the name and price. name and price are then added into the order array and stored in session storage
    let productName = opt + "Name";
    let productPrice = opt + "Price";
    let productQty = opt + "Qty";
    let name = productsObj[productName];
    let price = productsObj[productPrice];
    let quantity = document.getElementById(productQty).value;
    
    order.push(name,price,quantity);
    
    // Change objects to Strings using JSON 
    sessionStorage.setItem('order', JSON.stringify(order));
    
}// addToOrder
// END CODE BLOCK - addToOrder function

// The addOption function
function addOption(opt)
{
	// Adds the name and price of products in drop down boxes to the productsObj array and the order is then stored in session storage, it works similarly to the addToOrder function
    let name = document.getElementById(opt).value;
    let productPrice = opt + "Price";
    let productQty = opt + "Qty";
    let price = productsObj[productPrice];
    let quantity = document.getElementById(productQty).value;
    
    order.push(name,price,quantity);

    // Change objects to Strings using JSON
    sessionStorage.setItem('order', JSON.stringify(order));
}
// END CODE BLOCK - addOption function