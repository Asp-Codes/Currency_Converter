const baseUrl ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown=document.querySelectorAll(".dropdown select");
const Btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const message=document.querySelector("form .msg");
const swap=document.querySelector("form #swap");

swap.addEventListener("click",()=>{
    const temp=fromCurr;
    fromCurr=toCurr;
    toCurr=temp;
});


for(let select of dropdown)
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
}


const updateFlag =(element) =>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
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