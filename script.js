const pennies = document.getElementById("pennies-value");
const nickels = document.getElementById("nickels-value");
const dimes = document.getElementById("dimes-value");
const quarters = document.getElementById("quarters-value");
const ones = document.getElementById("ones-value");
const fives = document.getElementById("fives-value");
const tens = document.getElementById("tens-value");
const twenties = document.getElementById("twenties-value");
const hundreds = document.getElementById("hundreds-value");
const cash = document.getElementById("cash");
const purchase = document.getElementById("purchase-btn");
const itemPrice = document.getElementById("item-price");
const results = document.getElementById("results-container");

let price = 19.5;
const coinValueDict = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];


function updateItemPrice() {
  itemPrice.textContent = price;
}

function updateChangeInDrawer() {
  pennies.textContent = cid[0][1].toFixed(2);
  nickels.textContent = cid[1][1].toFixed(2);
  dimes.textContent = cid[2][1].toFixed(2);
  quarters.textContent = cid[3][1].toFixed(2);
  ones.textContent = cid[4][1].toFixed(2);
  fives.textContent = cid[5][1].toFixed(2);
  tens.textContent = cid[6][1].toFixed(2);
  twenties.textContent = cid[7][1].toFixed(2);
  hundreds.textContent = cid[8][1].toFixed(2);
}

updateChangeInDrawer();
updateItemPrice();

purchase.addEventListener("click", () => {
  const cashValue = parseFloat(cash.value);
  if (cashValue < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cashValue === price) {
    results.innerHTML = '<p>No change due - customer paid with exact cash</p>';
    results.style.display = 'flex';
    return;
  } else {
    results.innerHTML = '<p id="status-p">Status: <span id="status"></span></p>';
  }
  const statusSpan = document.getElementById("status");
  const change = cashValue - price;
  const totalInDrawer = cid.reduce((acc, curr) => acc + curr[1], 0);
  if (change > totalInDrawer) {
    statusSpan.textContent = 'INSUFFICIENT_FUNDS';
  } else if (change === totalInDrawer) {
    statusSpan.textContent = 'CLOSED';
  } else {
    statusSpan.textContent = 'OPEN';
  }
  let changeDue = change;
  let changeArr = [];

  for (let i = cid.length - 1; i >= 0; i--) {
    const [coinName, coinValue] = cid[i];
    const singleCoinValue = coinValueDict[coinName];
    let coinCount = 0;

    while (changeDue >= singleCoinValue && cid[i][1] > 0) {
      changeDue -= singleCoinValue;
      cid[i][1] -= singleCoinValue;
      coinCount++;
      changeDue = Math.round(changeDue * 100) / 100;

      if (cid[i][1] <= 0) {
        cid[i][1] = 0;
        break;
      }
    }

    if (coinCount > 0) {
      changeArr.push([coinName, singleCoinValue * coinCount]);
    }
  }

  if (changeArr.length === 0 || changeDue > 0) {
    statusSpan.textContent = 'INSUFFICIENT_FUNDS';
    results.style.display = 'flex';
    return;
  }
  
  updateChangeInDrawer();
  displayChange(changeArr);
  

  function displayChange(changeArr) {
    let pElements = document.querySelectorAll('#results-container p:not(:first-child)');
    pElements.forEach((p) => {
      p.remove();
    });
    for (let i = changeArr.length - 1; i >= 0; i--) {
      const [coinName, coinTotal] = changeArr[i];
      const coinP = document.createElement('p');
      coinP.textContent = `${coinName}: $${coinTotal.toFixed(2)}`;
      results.appendChild(coinP);
    }
  }
  results.style.display = 'flex';
});