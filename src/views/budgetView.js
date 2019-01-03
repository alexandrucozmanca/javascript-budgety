import { domElements } from '../views/base';

const resetBudget = () => {
    domElements.budgetView.innerHTML = '';
};

const displayDate =() => {
    let now, year, month,
    monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    
    now = new Date();
    year = now.getFullYear();
    month = now.getMonth();
    
    return ` ${monthNames[month]} ${year}`;
};


export const rendedBudget = budget => {

    // reset Budget View
    resetBudget(); 

    const markup =`
        <div class="budget__title">
            Available Budget for <span class="budget__title--month">${displayDate()}</span>:
        </div>
        
        <div class="budget__value">${budget.computeTotal()}</div>
        
        <div class="budget__income clearfix">
            <div class="budget__income--text">Income</div>
            <div class="right">
                <div class="budget__income--value">+ ${budget.incomeList.computeTotal()}</div>
                <div class="budget__income--percentage">&nbsp;</div>
            </div>
        </div>
        
        <div class="budget__expenses clearfix">
            <div class="budget__expenses--text">Expenses</div>
            <div class="right clearfix">
                <div class="budget__expenses--value">- ${budget.expenseList.computeTotal()}</div>
                <div class="budget__expenses--percentage">${budget.formatPercentage()}</div>
            </div>
        </div>
    `;
    domElements.budgetView.insertAdjacentHTML('afterbegin', markup);
};





