import uniqid from 'uniqid';

export default class DefaultList {

    constructor () {
        this.listItems = [];
        this.listTotal = 0;
    };

    addItem(description, value) {
        const item = {
        id: uniqid(),
        description,
        value
    }

        this.listItems.push(item);
        this.listTotal = this.computeTotal();
        return item;
    };

    removeItem(id) {
        const index = this.listItems.findIndex( el => el.id === id);
        this.listItems.splice(index, 1);
        this.listTotal = this.computeTotal();
    };

    computeTotal() {
        let total = 0;
        for (let item of this.listItems) {
            total += item.value;
        }
        return total;
    };
}