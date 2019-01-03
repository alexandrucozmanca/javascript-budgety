import DefaultList from './DefaultList';

export default class ExpenseList extends DefaultList {
    constructor() {
        super();
    };

    computeItemPecentage(totalIncome, id){

        if (totalIncome > 0){
            const index = this.listItems.findIndex( el => el.id === id);
            
            return `${new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2}).
            format(this.listItems[index].value / totalIncome * 100)}%`;
        } 
        return '---';
    };
}