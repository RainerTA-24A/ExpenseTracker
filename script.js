const url="https://kool.krister.ee/chat/expensetracker";



let expenses = [];
let totalAmount = 0;


const userName = prompt("Write your name")
const nameInput = document.getElementById('koht');
const amountInput = document.getElementById('summa');
const dateInput = document.getElementById('kuupaev');
const addBtn = document.getElementById('addExpenseButton');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

addBtn.addEventListener('click', addExpense);

function addExpense() {
    const place = nameInput.value;
    const amount = parseFloat(amountInput.value); /* (parseFloat) teisendab stringi numbriks kuni esimese mitte-numbrilise märgini. */
    const date = dateInput.value;

    if (!place) {
        alert('Please enter an expense name');
        return;
    }
    if (isNaN(amount) || amount <= 0) {  /* NaN = Not-A-Number */
        alert('Please enter a valid amount');
        return;
    }
    if (!date) {
        alert('Please select a date');
        return;
    }

    expenses.push({ place, amount, date });
    totalAmount += amount;
    totalAmountCell.textContent = `€${totalAmount.toFixed(2)}`;

    
    const newRow = expensesTableBody.insertRow();
    const nameCell = newRow.insertCell(); //name olen muutnud place 
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');
    

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        removeExpense(newRow, amount);
    });

    nameCell.textContent = place;
    amountCell.textContent = `€${amount.toFixed(2)}`;
    dateCell.textContent = date;
    deleteCell.appendChild(deleteBtn);


}

function removeExpense(row, amount) {
    row.remove();
    totalAmount -= amount;
    totalAmountCell.textContent = `€${totalAmount.toFixed(2)}`;
}

async function fetchMessages() {
    const response = await fetch(url);
    const data = await response.json();
    const element = document.getElementById('expense-table-body');


    for (const item of data) {
        const nimi = item.kasutaja;
        const summa = parseFloat(item.summa);
        const kuupäev = item.kuupäev;
        const koht = item.koht;

        if (nimi === userName)  {
            const newRow = element.insertRow();
            const nameCell = newRow.insertCell(); //name olen muutnud place 
            const amountCell = newRow.insertCell();
            const dateCell = newRow.insertCell();
             const deleteCell = newRow.insertCell();
             const deleteBtn = document.createElement('button');
             
             nameCell.textContent = koht;
             amountCell.textContent = `€${summa.toFixed(2)}`; // Format as currency
             dateCell.textContent = kuupäev;
    
              deleteBtn.textContent = 'Delete';
              deleteBtn.classList.add('delete-btn');
              deleteBtn.addEventListener('click', function() {
              removeExpense(newRow, amount);

              
        });

        deleteCell.appendChild(deleteBtn);

        totalAmount += summa;
            totalAmountCell.textContent = `€${totalAmount.toFixed(2)}`;

            } 
            }   
        }

//setInterval(fetchMessages, 3000)
fetchMessages()

addExpenseButton.addEventListener("click", function () {
const message = {
    koht: nameInput.value,
    kuupäev: dateInput.value,
    summa: amountInput.value,
    kasutaja: userName
};


fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(message)
})
})