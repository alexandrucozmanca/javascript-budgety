import { domElements } from './base';


export const addItem = (item, htmlParent, percentage = NaN) => {


    let markup = `
    <div class="item clearfix" data-itemid="${item.id}">
        <div class="item__description">${item.description}</div>
        <div class="right clearfix">
            <div class="item__value">${percentage ? '-' : '+'} ${item.value}</div>
            ${percentage ? `<div class="item__percentage">${percentage}</div>` : ''}
            <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
        </div> 
    </div>    
    `;

    htmlParent.insertAdjacentHTML('beforeend', markup);

};

export const clearList = list => {

    list.innerHTML = '';

};