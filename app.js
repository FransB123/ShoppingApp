
//Item names
let itemName = document.getElementById("itemName");
//Item options
let option1 = document.getElementById("option1");
let option2 = document.getElementById("option2");
let option3 = document.getElementById("option3");
let option4 = document.getElementById("option4");
//Item price options
let option1price = document.getElementById("option1price");
let option2price = document.getElementById("option2price");
let option3price = document.getElementById("option3price");
let option4price = document.getElementById("option4price");


//Sumbit click event listener
let itemaddsubmit = document.getElementById("itemaddsubmit")

itemaddsubmit.addEventListener('click', function() {

    // Get input values into an array
    const submittedValues = 
        [itemName.value, 
        option1.value, 
        option2.value, 
        option3.value, 
        option4.value, 
        option1price.value, 
        option2price.value, 
        option3price.value, 
        option4price.value];
    
    // Pass input values to the 'create item' object function
    createItem(submittedValues);
    
}, false);


//Items Array
let Items = [];


//Create Item Object
function createItem(submittedValues) {

    //Create new item object constructor
    class Item {
        constructor(submittedValues){
            this.itemNameValue = submittedValues[0];
            this.option1Value = submittedValues[1];
            this.option2Value = submittedValues[2];
            this.option3Value = submittedValues[3];
            this.option4Value = submittedValues[4];
            this.option1ValuePrice = submittedValues[5];
            this.option2ValuePrice = submittedValues[6];
            this.option3ValuePrice = submittedValues[7];
            this.option4ValuePrice = submittedValues[8];
        }
    }
       
    let newItem = new Item(submittedValues);

    // Pass the object to the -Add table function-
    let submitID = Items.length;
    // Pass object ID to the -Add table function-
    addItemTable(newItem, submitID);

    // Add item into the items array
    Items.push(newItem);
    
};

// Array of prices to calculate final price
let pricesArray = [];


//Add new item table function

function addItemTable(newItem, submitID) {

    // Create new table element
    let newItemElement = document.createElement("table");

    // Set table ID attribute 
    newItemElement.setAttribute("id", `itemId${submitID}`);

    // Get div element and add new table
    let newItemDiv = document.getElementById("newItemDiv").appendChild(newItemElement);
    
    // Create new table content with property values
    let newItemTable = 
        `<tr>
        <th>${newItem.itemNameValue}</th>
        <td><input type="radio" name="${newItem.itemNameValue}${submitID}">${newItem.option1Value}. Price: $${newItem.option1ValuePrice}</input></td>
        <td><input type="radio" name="${newItem.itemNameValue}${submitID}">${newItem.option2Value}. Price: $${newItem.option2ValuePrice}</input></td>
        <td><input type="radio" name="${newItem.itemNameValue}${submitID}">${newItem.option3Value}. Price: $${newItem.option3ValuePrice}</input></td>
        <td><input type="radio" name="${newItem.itemNameValue}${submitID}">${newItem.option4Value}. Price: $${newItem.option4ValuePrice}</input></td>
        </tr>
        <tr>

        </tr>`;

    //Add table content inside new table
    newItemDiv.innerHTML = newItemTable;

    // Add button to the new table
    let itemAddBtn = document.createElement('button');
    newItemElement.appendChild(itemAddBtn);
    
    // Set id on the new button
    itemAddBtn.setAttribute("id", `item${submitID}`);

    // Set button text
    let itemAddID = document.getElementById(`item${submitID}`);
    itemAddID.innerHTML = `Add ` + `${newItem.itemNameValue}` + ` to cart`;
    
    // Set onclick function for the add item button
    itemAddID.onclick = function() {

    // Get group name for radio buttons
    let itemRadio = document.getElementsByName(`${newItem.itemNameValue}${submitID}`);

    // Set item price and option variables
    let itemPrice = 0;
    let itemOption = "";


    // Calcuate cart total price
    if (itemRadio[0].checked) {
        itemPrice =+ newItem.option1ValuePrice;
        itemOption = newItem.option1Value;
     } else if (itemRadio[1].checked) {
        itemPrice =+ newItem.option2ValuePrice;
        itemOption = newItem.option2Value;
     } else if (itemRadio[2].checked) {
        itemPrice =+ newItem.option3ValuePrice;
        itemOption = newItem.option3Value;
     } else if (itemRadio[3].checked) {
        itemPrice =+ newItem.option4ValuePrice;
        itemOption = newItem.option4Value;
     };

    // Add item to cart
    let newSubmit = document.createElement('p');
    let newP = document.createTextNode(`Item: ${newItem.itemNameValue}. Option: ${itemOption}. Price: $${itemPrice}.`);
    newSubmit.appendChild(newP);
    let cartDiv = document.getElementById("cart");
    cartDiv.appendChild(newSubmit);

    // Push prices to array and add up all prices from the array
    pricesArray.push(itemPrice);
    let sumOfPrices = pricesArray.reduce((accumlator, currentValue) => {
        return accumlator + currentValue;
    }, 0);
    
    // Add price total
    let cartTotal = document.getElementById("cartTotal");
    cartTotal.innerHTML = `<p>Cart total price: $${sumOfPrices}.</p>`;
     

    // Remove cart items button
    let removeItems = document.getElementById("removeItems");
    removeItems.onclick = function() {
        // Reset cart total to $0
        pricesArray = [];
        // Update innerHTML
        cartDiv.innerHTML = "";
        let cartTotal = document.getElementById("cartTotal");
        cartTotal.innerHTML = `<p>Cart total price: $0.</p>`;
    };

    };
};

