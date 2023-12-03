let expenses = [];
let deposits = [];
let totalAmount = 0;
let totalDeposits = 0;
let totalExpenses = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expense-table-body');

const balance = document.getElementById('balance');
const totalDepositsDisplay = document.getElementById('deposits-total');
const totalExpensesDisplay = document.getElementById('expenses-total');

const addExpenseForm = document.getElementById("add-expense")


addExpenseForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return
    }
    if (isNaN(Math.floor(amount)) || amount <= 0) {
        alert('Please enter a valid amount');
        return
    }
    if (date === '') {
        alert('Please select a date');
        return
    }
    expenses.push({ category, amount, date });

    totalAmount -= amount;
    totalExpenses += amount;
    console.log(totalExpenses)
    balance.textContent = `$${totalAmount.toFixed(2)}`;
    totalExpensesDisplay.textContent = `$${totalExpenses.toFixed(2)}`;

    generateDepositsAndExpenses(deposits, expenses)

    addExpenseForm.reset()
})

const categoryInputDeposit = document.getElementById('category-select-deposit')
const dateInputDeposit = document.getElementById('date-input-deposit')
const amountInputDeposit = document.getElementById('amount-input-deposit')
const addDepositBtn = document.getElementById('add-btn-deposit')

const addDepositForm = document.getElementById('add-deposit')

addDepositForm.addEventListener('submit', function (e) {
    e.preventDefault()
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

    deposits.push({ category, amount, date })

    totalAmount += amount;
    totalDeposits += amount;

    balance.textContent = `$${totalAmount.toFixed(2)}`;
    totalDepositsDisplay.textContent = `$${totalDeposits.toFixed(2)}`;

    generateDepositsAndExpenses(deposits, expenses)

    addDepositForm.reset()
})

const searchField = document.querySelector('#expense-deposit-title-search')
const searchButton = document.querySelector('#search-budget')

searchButton.addEventListener('click', (e) => {
    if (searchField.value = ' ') {
        alert('FUCKING PUT SOMETHING');
    }
    else {
        const filteredDeposits = deposits.filter((deposit) => deposit.category.toLowerCase().includes)

    }
})

const generateDepositsAndExpenses = (deposits, expenses) => {
    expensesTableBody.replaceChildren()

    deposits.forEach((deposit) => {
        const newRow = expensesTableBody.insertRow();
        const typeCell = newRow.insertCell()
        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell()
        const deleteBtn = document.createElement('button');

        typeCell.textContent = 'Deposit';
        categoryCell.textContent = deposit.category;
        amountCell.textContent = `$${deposit.amount}`;
        dateCell.textContent = deposit.date;
        deleteCell.appendChild(deleteBtn)

        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function () {
            deposits.splice(deposits.indexOf(deposit), 1);

            totalAmount -= deposit.amount;
            totalDeposits -= deposit.amount;

            totalDepositsDisplay.textContent = `$${totalDeposits.toFixed(2)}`;
            balance.textContent = `$${totalAmount.toFixed(2)}`;

            expensesTableBody.removeChild(newRow);
        })

    })

    expenses.forEach((expense) => {
        const newRow = expensesTableBody.insertRow();
        const typeCell = newRow.insertCell()
        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell()
        const deleteBtn = document.createElement('button');

        typeCell.textContent = 'Expense';
        categoryCell.textContent = expense.category;
        amountCell.textContent = `$${expense.amount}`;
        dateCell.textContent = expense.date;
        deleteCell.appendChild(deleteBtn)

        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function () {
            deposits.splice(deposits.indexOf(deposit), 1);

            totalAmount -= expense.amount;
            totalDeposits -= expense.amount;

            totalDepositsDisplay.textContent = `$${totalDeposits.toFixed(2)}`;
            balance.textContent = `$${totalAmount.toFixed(2)}`;

            expensesTableBody.removeChild(newRow);
        })
    })
}

const depositCategoryFilter = document.querySelector('#filter-deposits-category');
const expenseCategoryFilter = document.querySelector('#filter-expenses-category');

depositCategoryFilter.addEventListener('change', (e) => {
    console.log(e.target.value)
    const filteredDeposits = deposits.filter((deposit) => deposit.category === e.target.value)
    generateDepositsAndExpenses(filteredDeposits, [])
})

expenseCategoryFilter.addEventListener('change', (e) => {
    const filteredExpenses = expenses.filter((expense) => expense.category === e.target.value)
    generateDepositsAndExpenses([], filteredExpenses)
})