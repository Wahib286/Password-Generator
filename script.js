const inputSlider = document.querySelector("[data-lengthslider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]"); 
const copyMsg = document.querySelector("[data-copyMsg]"); 
const uppercaseCheck = document.querySelector("#uppercase"); 
const lowercaseCheck = document.querySelector("#lowercase"); 
const numbersCheck = document.querySelector("#numbers"); 
const symbolsCheck = document.querySelector("#symbols"); 
const indicator= document.querySelector("[data-indicator]"); 
const generateBtn = document.querySelector(".generateButton"); 
const allCheckBox = document.querySelectorAll("input[type=checkbox]"); 
const symbolString = "!@#$%^&*()_+-=[]{}|;:'\",.<>/?`~";
const symbols = '!@#$%^&*()_-{}[]|~`';


let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
setIndicator("#ccc")
// default slider 
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundsize = ((passwordLength-min)*100/(max-min));
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadoow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random()*(max-min))+min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123))
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91))
}

function generateSymbols(){
    const ranNum = getRndInteger(0,symbols.length);
    return symbols.charAt(ranNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if (uppercaseCheck.checked) hasUpper = true; 
    if (lowercaseCheck.checked) hasLower = true; 
    if (numbersCheck.checked) hasNum = true; 
    if (symbolsCheck.checked) hasSym = true; 
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) { 
    setIndicator("#010"); 
    } else if ( 
    (hasLower || hasUpper) && 
    (hasNum || hasSym) && 
    passwordLength >= 6 
    ){ 
    setIndicator("#ffe"); 
    } else { 
    setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }

    copyMsg.classList.add("active");

    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);
}

function handleCheckboxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });

}
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change', handleCheckboxChange);
})

inputSlider.addEventListener('input', (e)=>{
    passwordLength = e.target.value;
    handleSlider();  
})

copyBtn.addEventListener('click', ()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})

function shufflePassword(){

}

generateBtn.addEventListener('click',()=>{
    //no box checked
    if(checkCount <= 0 )return;

    //min pass llength 
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider(); 
    }

    //new pass generation
    password =""
    
    // if(uppercase.checked){
    //     password += generateUpperCase();
    // }
    // if(lowercase.checked){
    //     password += generateLowerCase();
    // } 
    // if(numbers.checked){
    //     password += generateRandomNumber();
    // } 
    // if(symbols.checked){
    //     password += generateSymbols();
    // }

    let funcArr = [];
    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);
    
    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbols);

    //compulsary addition
    for(let i=0; i<funcArr.length; i++){
        password += funcArr[i]();
    }
    console.log("compulasaryyy addiition done");

    //remaning addition 
    for(let i=0; i<passwordLength - funcArr.length; i++){
        let ranIndex = getRndInteger(0,funcArr.length);
        console.log("random index"+ ranIndex);
        password += funcArr[ranIndex]();
    }

    //shuffle password
    // password = shufflePassword(Array.from(password));

    //diispllay
    passwordDisplay.value = password;

    calcStrength();


});


