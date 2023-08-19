let expenses = [];
let deposits = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

addBtn.addEventListener('click', function () {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return
    }
    if (date === '') {
        alert('Please select a date');
        return
    }
    expenses.push({ category, amount, date });

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;
    const newRow = expensesTableBody.insertRow();

    const typeCell = newRow.insertCell()
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');


    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        expenses.splice(expenses.indexOf(expense), 1);

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        expensesTableBody.removeChild(newRow);
    })

    const expense = expenses[expenses.length - 1];

    typeCell.textContent = 'Expense';
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
})

const categoryInputDeposit = document.getElementById('category-select-deposit')
const dateInputDeposit = document.getElementById('date-input-deposit')
const amountInputDeposit = document.getElementById('amount-input-deposit')
const addDepositBtn = document.getElementById('add-btn-deposit')

addDepositBtn.addEventListener('click', function () {
    const category = categoryInputDeposit.value;
    const amount = Number(amountInputDeposit.value);
    const date = dateInputDeposit.value;

    if (category === '') {
        alert('Please select a category');
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
    }
    if (date === '') {
        alert('Please choose a date');
    }

    const newRow = expensesTableBody.insertRow();

    const typeCell = newRow.insertCell()
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell()
    const deleteBtn = document.createElement('button');

    deposits.push({ category, amount, date })

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        expenses.splice(deposits.indexOf(deposit), 1);

        totalAmount -= deposit.amount;
        totalAmountCell.textContent = totalAmount;

        expensesTableBody.removeChild(newRow);
    })

    const deposit = deposits[deposits.length - 1];

    typeCell.textContent = 'Deposit';
    categoryCell.textContent = category;
    amountCell.textContent = amount;
    dateCell.textContent = date;
    deleteCell.appendChild(deleteBtn)
})


for (const expense of expenses) {
    totalAmount += expense.amount;
    totalAmountCell.textContent = totalAmount;
}

for (const deposit of deposits) {
    totalAmount += deposit.amount;
    totalAmountCell.textContent = totalAmount;
}