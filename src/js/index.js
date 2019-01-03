// external
import toastr from 'toastr';

// internal
import { domElements } from '../views/base';
import Budget from '../models/Budget';
import * as budgetView  from '../views/budgetView';
import * as listView from '../views/listView';
import { customToastrCSS } from './config';


const state = {
    budget: new Budget()
}

const incomes = state.budget.incomeList;
const expenses = state.budget.expenseList;

const bootstrap = () => {
    const inc = [{
        0:'Income 1', 1: 600
    },
    {
        0:'Income 2', 1: 1600
    },
    {
        0:'Income 3', 1: 200 
    }].forEach(element => {
        incomes.addItem(element[0], element[1])
    });

    const exp = [{
        0:'Expense 1', 1: 45.20
    },{
        0:'Expense 2', 1: 33.44
    },{
        0:'Expense 3', 1: 300
    },{
        0:'Expense 4', 1: .85
    }].forEach(element => {
       expenses.addItem(element[0], element[1]) 
    });    
};

const renderIncomeList = () => {
    incomes.listItems.forEach(el => 
        listView.addItem(el, 
            domElements.incomeViewList))
};

const renderExpenseList = () => {
    expenses.listItems.forEach(el => 
        listView.addItem(el, 
            domElements.expenseViewList, 
            expenses.computeItemPecentage(incomes.computeTotal(), el.id)))
};


const init = () => {
    // bootstrap();
    budgetView.rendedBudget(state.budget);
    renderIncomeList();
    renderExpenseList();
}

init ();


// ADD ITEM Controller
const addItemController = () => {
    // 1. Read and parse input
    let refList = domElements.addItemType.value === 'inc' ? 
        incomes : 
        expenses;
  
    try {

        if(!domElements.addItemDescription.value)
        throw "Please input a description";

        if (!domElements.addItemValue.value || parseFloat(domElements.addItemValue.value) <= 0)
            throw "Please input a positive number";
        
        const item = refList.addItem(
            domElements.addItemDescription.value,
            parseFloat(domElements.addItemValue.value));
        toastr.success("Item added").css(customToastrCSS);
   
        // 2. display information to GUI
        // 2.1 Rended Budget View
        budgetView.rendedBudget(state.budget);

        // 2.2 Update Income && Expenses View
        // if item is expense just add it to the list 
        if (refList === expenses){
            let refViewList = domElements.expenseViewList;
            listView.addItem(item, refViewList, expenses.computeItemPecentage(incomes.computeTotal(), item.id));
        } else { // if item is income add it to the list and reset and recompute expenses list
            let refViewList = domElements.incomeViewList;
            listView.addItem(item, refViewList);
            // reset and re-render expenses list
            listView.clearList(domElements.expenseViewList);
            renderExpenseList();
        }
        // 2.3 reset input
        domElements.addItemDescription.value = '';
        domElements.addItemValue.value = '';

    } catch (error) {
        toastr.error(error).css(customToastrCSS);
    }
}

// deleteItem Controller
const deleteItemController = (itemId, item) => {

    // Delete item from Budget list
    if (item.parentElement === domElements.incomeViewList) {
        incomes.removeItem(itemId);
        // Reset GUI to reflect update
        item.parentElement.removeChild(item);
        listView.clearList(domElements.expenseViewList);
        renderExpenseList();
    } else if(item.parentElement === domElements.expenseViewList){ // if expense
        expenses.removeItem(itemId);
        // Reset GUI to reflect update
        item.parentElement.removeChild(item);
    }
    
    // Reset GUI to reflect update
    budgetView.rendedBudget(state.budget);  
    console.log(customToastrCSS);
    toastr.success('Item deleted').css(customToastrCSS);
}

// Event listeners
// Add item
domElements.addItem.addEventListener('click', addItemController);
// Keyboard enter response
document.addEventListener('keypress', function(e) {
    if ((e.key ||  e.Code) === 'Enter') 
        addItemController()
});

// Delete item
domElements.container.addEventListener('click', 
    function(e) {
        if(event.target.matches('.item__delete--btn, .item__delete--btn *')){
            const id = event.target.closest('.item').dataset.itemid ;
            const item =  event.target.closest('.item');
            deleteItemController(id, item);
        }
    }    
);

// Switch item type 
const switchItemType = () => {
    [   
        domElements.addItemType,
        domElements.addItem,        
    ].forEach (
        el => el.classList.toggle('red')
    );

    [   
        domElements.addItemType,
        domElements.addItemDescription,
        domElements.addItemValue,        
    ].forEach (
        el => el.classList.toggle('red-focus')
    );
} 

 domElements.addItemType.addEventListener('change', switchItemType);
