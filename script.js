
let rate1 = document.querySelector(".rate1");
let rate2 = document.querySelector(".rate2");
let resultBtn = document.querySelector(".result");

// Selecting all the "select" elements of class "options" using querySelectorAll
let selects = document.querySelectorAll(".options select"); 

let sel1 = selects[0];
let sel2 = selects[1];

// Selecting all the "input" elements of class "input" using querySelectorAll
let inputs = document.querySelectorAll(".input input");

let inpt1 = inputs[0];
let inpt2 = inputs[1];


//Declaring an empty rates object where we will store all the exchange rates
let rates ={};

let requestURL = "https://api.exchangerate.host/latest?base=USD";


fetchRates();


// Here, we will fetch the exchange rates from the API
async function fetchRates()
{
    // Used the fetch() with "await" keyword to fetch the API url request
    let res = await fetch(requestURL);

    //Used the json() of response interface to pass the response to javascript object
    res = await res.json();

    // Setting the value of rates object to response's rate object
    rates = res.rates;


    //Now, calling the oulateOptions()
    populateOptions();
}


function populateOptions()
{
    // declared an empty string variable which will have HTML code, containing the options in the drop-down
    let val = "";

    //This will return an array containing all the keys, and itersting over this array using forEach loop
    Object.keys(rates).forEach(code =>{

        //str will hold the HTML string
        //created an "option" element with it's value attribute set to code argument
        // which is the currency code
        // The text inside the element will also be same
        let str = `<option value ="${code}"> ${code} </option>`;

        val += str;
    });

    // Now, set the inner HTML of the both the select elements
    // by iterating over the array returned by querySelectorAll()
    selects.forEach((s) => (s.innerHTML = val));
}




//Coverting one currency value to another
// convert(<value>, <initial_currency>, <target_currency>)
function convert(val, fromCurr, toCurr)
{
    // val/rates[initalCurrency] will give the USD equivalent of the initial currency
    //then, mulitplying rates[targetCurrency] to it will give the required converted value
    let v = (val/rates[fromCurr]) * rates[toCurr];

    //For simplicity, rounding of the currency value to 3 decimal places
    let v1 = v.toFixed(3);

    //Since, there are some currencies whose values are too small,
    // we will check if the rounded value equals to zero,
    // if it does, return the original value rounded to 5 decimal places
    // else, return the value rounded to 3 decimal places
    return v1 == 0.0 ? v.toFixed(5) : v1;
}



// Displaying converted rate for a unit currency 
function displayRate()
{
    // Get the values from both the select elements
    let v1 = sel1.value;
    let v2 = sel2.value;

    //Convert() to convert UNIT currency from v1 to v2
    let val = convert(1, v1, v2);

    // Set the innerHTML of rate1 and rate2 elements as follows :

    //Used back-ticks inorder to use template literals
    rate1.innerHTML = `1 ${v1} equals`;
    rate2.innerHTML = `${val} ${v2}`;

}



resultBtn.addEventListener("click", ()=>{

    // Get the currency code of the inital currency that has to be converted 
    // using the 1st select element 
    let fromCurr = sel1.value;

    //Get the value from the 1st input and pass it to the float
    let fromVal = parseFloat(inpt1.value);



    // Get the currency code of the target currency 
    // using the 1st select element 
    let toCurr = sel2.value;


    // If the input value is none, alert the user to enter a number
    if(isNaN(fromVal))
    {
        alert("Enter a number");
    }
    else
    {
        // Else, we will convert the value using our convert()
        let cVal = convert(fromVal, fromCurr, toCurr);

        // Set the value of 2nd input to the converted value
        inpt2.value = cVal;
    }
});


//Add a change EventListener to both the select elements to execute the displayrate()
// so that the rates change when user changes the currencies
selects.forEach(s => s.addEventListener("change", displaRate));


// Added a click eventListener() to the swap icon to swap the values
// of the drop downs and inputs
document.querySelector(".swap").addEventListener("click", ()=>{

    // Get the values of both inputs and select elements
    let in1 = inpt1.value;
    let in2 = inpt2.value;
    let op1 = sel1.value;
    let op2 = sel2.value;


    // set the value of 2nd input to the value of 1st input
    inpt2.value = in1;
    
    //set the value of 1st input to the value of 2nd input
    inpt1.value = in2;

    // set the value of 2nd select to the value of 1st select
    sel2.value = op1;
    
    //set the value of 1st select to the value of 2nd select
    sel1.value = op2;  



    // call the displayRate() to update the rates on the screen
    displayRate();
}); 