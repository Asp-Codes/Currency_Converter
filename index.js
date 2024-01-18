const baseUrl ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown=document.querySelectorAll(".dropdown select");
const Btn=document.querySelector("form button");
var fromCurr=document.querySelector(".from select");
var toCurr=document.querySelector(".to select");
const message=document.querySelector("form .msg");
const swap=document.querySelector("form #swap");


for(let select of dropdown){
for (currCode in countryList){
    let newOption=document.createElement("option");
    newOption.innerText=currCode;
    newOption.value=currCode;
    if(select.name ==="from" && currCode === "USD"){
        newOption.selected="selected";
    }
    if(select.name ==="to" && currCode === "INR"){
        newOption.selected="selected";
    }
    select.append(newOption);
    select.addEventListener("change",(evt)=>{
        // console.log(evt);
        updateFlag(evt.target);
        // console.log(evt.target);
    })
}}

swap.addEventListener("click",()=>{
    var temp=fromCurr;
    fromCurr=toCurr;
    toCurr=temp;
    console.log(fromCurr," ",fromCurr.value);
    for (let i = 0; i < fromCurr.options.length; i++) {
            if(fromCurr.options[i].selected === true && fromCurr.options[i].innerText !== fromCurr.value){
                fromCurr.options[i].selected=false;
            }
    
            if (fromCurr.options[i].innerText === fromCurr.value ) {
               
                fromCurr.options[i].selected = true;
                //  console.log(toCurr.options[i].selected);
                //  console.log("is the value");
                 updateSymbolFrom(fromCurr);
                break; 
            }
    }
    for (let i = 0; i < toCurr.options.length; i++) {
        if(toCurr.options[i].selected === true && toCurr.options[i].innerText !== toCurr.value){
            toCurr.options[i].selected=false;
        }

        if (toCurr.options[i].innerText === toCurr.value ) {
           
            toCurr.options[i].selected = true;
             console.log(toCurr.options[i].selected);
             console.log("is the value");
             updateSymbolTo(toCurr);;
            break; 
        }
    }
});


const updateFlag =(element) =>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    // console.log(element.parentElement);
    img.src=newSrc;
}

const updateSymbolTo = (element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=document.getElementById("to_flag");
    // console.log(element.parentElement);
    img.src=newSrc;
}

const updateSymbolFrom = (element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=document.getElementById("from_flag");
    // console.log(element.parentElement);
    img.src=newSrc;
}


Btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal===" " || amtVal < 1){
        amtVal=1;
        amount.value="1";
    }
    const URL=`${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data=await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    //console.log(rate);
//   console.log(message);
message.innerText=`${amtVal} ${fromCurr.value} is equal to ${rate*amtVal} ${toCurr.value}`;

    
});