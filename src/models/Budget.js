import IncomeList from './IncomeList';
import ExpenseList from './ExpenseList';


export default class Budget {
    constructor () {
        this.incomeList = new IncomeList();
        this.expenseList = new ExpenseList();
    };
 
    computeTotal(){
        return this.incomeList.listTotal - this.expenseList.listTotal;
    };

    computePercentage() {
        if (this.incomeList.listTotal > 0 && this.expenseList.listTotal !== NaN  && this.expenseList.listTotal !== 0)
            return this.expenseList.listTotal / this.incomeList.listTotal * 100
        else return '';
    }

    formatPercentage(){

        let percentage = this.computePercentage();

        return (percentage !== '') ?
            `${new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2})
                .format(percentage)} %` 
        : '---';
    };
}