import Popup from './Popup/Popup.js';
import PopupAlert from './PopupAlert/PopupAlert.js';
const popup = document.querySelector(`.popup`);
const conponentsPizza = document.querySelector(`.components-pizza`)
const buttonOrder = document.querySelector(`.order__button`);
const calulateList = document.querySelector(`.calculate__list`)
const bases = document.querySelector(`.base-wrapper`);
const meats = document.querySelector(`.meat-wrapper`)
const vegans = document.querySelector(`.vegan-wrapper`)
const sauses = document.querySelector(`.sauce-wrappper`)

// --------func --------------------------------------------------CREATE CROSS
function createCrossSpan(elemItem) {
    const crossSpan = document.createElement(`span`);
    crossSpan.classList.add(`cross`);
    crossSpan.setAttribute(`data-pizzaelem`, `${elemItem.dataset.pizzaelem}`)
    elemItem.append(crossSpan);
    crossSpan.addEventListener(`click`, removeElem);
    crossSpan.addEventListener(`click`, removeLiCalcList)
    crossSpan.addEventListener(`click`, substractSummOrder)
    crossSpan.addEventListener(`click`, countSummOrder.bind(null, orderPizza))
    crossSpan.addEventListener(`click`, checkedSelectElemPizza)
};

// --------func --------------------------------------------------SET PRICE TO LI INTO LISTCALC
function createPriceLiCalcList(elemWrapper, nameStrPriceElem) {
    const liCalulateList = document.createElement(`li`);
    liCalulateList.textContent = elemWrapper.dataset.pizzaelem;
    liCalulateList.classList.add(`list-price`);
    liCalulateList.setAttribute(`data-price`, `${nameStrPriceElem[elemWrapper.dataset.price]}`)
    calulateList.append(liCalulateList);
};

// --------func --------------------------------------------------ADD CROSS CALCLIST
function createCrossSpanCalcLi(ev) {
    const activeElem = ev.target.closest(`.active`).dataset.pizzaelem

    const crossSpan = document.createElement(`span`);
    crossSpan.classList.add(`cross`);
    crossSpan.classList.add(`cross-calc`);
    crossSpan.setAttribute(`data-pizzaelem`, `${activeElem}`)

    const arrListPrice = document.querySelectorAll(`.list-price`)

    for (const elemListPrice of arrListPrice) {
        elemListPrice.append(crossSpan);
    }

    // if (!elemVeganMeat.classList.contains(`active`)) {}

    crossSpan.addEventListener(`click`, removeElem);
    crossSpan.addEventListener(`click`, removeLiCalcList)
    crossSpan.addEventListener(`click`, substractSummOrder)
    crossSpan.addEventListener(`click`, countSummOrder.bind(null, orderPizza))
    crossSpan.addEventListener(`click`, checkedSelectElemPizza)
};

// --------func ------------------------------------------------ REMOVE ELEMENTS
function removeElem(ev) {
    ev.stopPropagation()

    const activeElem = this
    activeElem.remove()
    activeElem.classList.remove(`cross`)

    const removeCrossWrapperElem = document.querySelector(`.cross[data-pizzaelem=${activeElem.dataset.pizzaelem}]`)
    removeCrossWrapperElem.remove()

    const removeElem = document.querySelector(`.pizzaelem[data-pizzaelem=${activeElem.dataset.pizzaelem}]`)
    removeElem.classList.remove(`active`)
};

// --------func ------------------------------------------------ REMOVE ELEMENTS CALCLIST
function removeLiCalcList(ev) {
    ev.stopPropagation()
    const removedElem = ev.target.dataset.pizzaelem || ev.target.closest(`.base-wrapper,.sauce-wrappper`).querySelector(`.active`).dataset.pizzaelem
    const arrLiCalc = document.querySelector(`.calculate__list`).children

    for (const elemArrLiCalc of arrLiCalc) {
        if (elemArrLiCalc.textContent === removedElem) {
            elemArrLiCalc.remove()
        }
    }
};

// --------func ------------------------------------------------ REMOVE OLD CROSS FROM BASE & SAUCE
function removeOldCross(wrapperElem) {
    const oldCross = wrapperElem.querySelector(`.cross`);
    oldCross.remove();

    const oldActiveBaseSause = wrapperElem.querySelector(`.active`);
    oldActiveBaseSause.classList.remove(`active`);
};

// --------func ------------------------------------------------ PUSH PRICE TO OBJECT
function pushPriceObj() {
    const arrSumElem = calulateList.children;
    for (const elemSum of arrSumElem) {
        const keyObjOrderPizza = elemSum.textContent;
        const valueObjOrderPizza = elemSum.dataset.price;
        orderPizza[`${keyObjOrderPizza}`] = Number(valueObjOrderPizza);
    }
    return orderPizza;
};

// --------func ------------------------------------------------ ASIGN ELEM VEGAN & MEAT
function selectVeganMeatElem(nameStrPriceElem, ev) {
    const checkeWrapper = ev.target.closest(`.meat-wrapper`)
    const elemVeganMeat = checkeWrapper ? ev.target.closest(`.meat-item`) : ev.target.closest(`.vegan-item`)
    const activeVeganMeat = checkeWrapper ? meats.querySelectorAll(`.active`) : vegans.querySelectorAll(`.active`)

    if (!elemVeganMeat.classList.contains(`active`)) {

        if (activeVeganMeat.length <= 1) {
            createPriceLiCalcList(elemVeganMeat, nameStrPriceElem)
            elemVeganMeat.classList.add(`active`);
            createCrossSpan(elemVeganMeat)
            createCrossSpanCalcLi(ev)
        } else {
            PopupAlert.showPopuTexst(`You cannot choose more than two ingredients`)
        }

    }
};

function selectBaseSauseElem(wrapperElem, nameStrPriceElem, ev) {
    const elemBaseSause = ev.target.closest(`.pizzaelem`);
    const activeBaseSause = wrapperElem.querySelector(`.active`);

    if (!activeBaseSause) {
        createPriceLiCalcList(elemBaseSause, nameStrPriceElem)
        elemBaseSause.classList.add(`active`);
        createCrossSpan(elemBaseSause)
        createCrossSpanCalcLi(ev)
    } else {
        removeLiCalcList(ev)
        substractSummOrder(ev)
        countSummOrder(basePrice)
        removeOldCross(wrapperElem)
        elemBaseSause.classList.add(`active`);
        createCrossSpan(elemBaseSause)
        createPriceLiCalcList(elemBaseSause, nameStrPriceElem)
        createCrossSpanCalcLi(ev)
    }
    return true
};

// --------func ------------------------------------------------ COUNT SUMMA INGREDIENT PIZZA
function countSummOrder(orderPizza, ev) {
    const sumPrice = document.querySelector(`.sum-price`);
    let sum = 0;
    for (const key in orderPizza) {
        sum += orderPizza[key]
    }
    sumPrice.textContent = `${sum.toFixed(2)}$`;
    return sum
};

// --------func ------------------------------------------------ SUBSTRACT OF SUMMA INGREDIENT PIZZA
function substractSummOrder(ev) {
    const ingr = ev.target.dataset.pizzaelem || ev.target.closest(`.base-wrapper,.sauce-wrappper`).querySelector(`.active`).dataset.pizzaelem
    for (const key in orderPizza) {
        if (key === ingr) {
            delete orderPizza[key]
        }
    }
};
// --------func ------------------------------------------------ CLEAR ORDER

function clearOrder() {
    const arrListPrice = document.querySelectorAll(`.list-price`)
    const arrActiveElem = document.querySelectorAll(`.active`)
    const sumPrice = document.querySelector(`.sum-price`).textContent = `${0}$`;
    const arrCrosesSpan = document.querySelectorAll(`.cross`)
    for (let keyListPrice of arrListPrice) {
        keyListPrice.remove()
    }
    for (const keyActiveElem of arrActiveElem) {
        keyActiveElem.classList.remove(`active`)
    }
    for (const iterator in orderPizza) {
        delete orderPizza[iterator]
    }
    for (const keyCrosesSpan of arrCrosesSpan) {
        keyCrosesSpan.remove()
    }
};

// --------addEventListener -------------------------------------CHECK SELECT ELEMENTS  PIZZA
function checkedSelectElemPizza() {
    const amountActiveBase = bases.querySelectorAll(`.active`).length;
    const amountActiveVegan = vegans.querySelectorAll(`.active`).length;
    const amountActiveMeat = meats.querySelectorAll(`.active`).length;
    const amountActiveSauce = sauses.querySelectorAll(`.active`).length;
    const half1Pizza = document.querySelector(`.img-pizza1`);
    const half2Pizza = document.querySelector(`.img-pizza2`);
    const half3Pizza = document.querySelector(`.img-pizza3`);
    const half4Pizza = document.querySelector(`.img-pizza4`);
    if (amountActiveBase >= 1) {
        half1Pizza.style.opacity = `1`
    } else {
        half1Pizza.style.opacity = `0.1`
    }

    if (amountActiveVegan >= 2) {
        half2Pizza.style.opacity = `1`
    } else {
        half2Pizza.style.opacity = `0.1`
    }
    if (amountActiveMeat >= 2) {
        half3Pizza.style.opacity = `1`
    } else {
        half3Pizza.style.opacity = `0.1`
    }
    if (amountActiveSauce >= 1) {
        half4Pizza.style.opacity = `1`
    } else {
        half4Pizza.style.opacity = `0.1`
    }
};

// --------addEventListener -------------------------------------SET ELEM BASE & SAUCE & VEGAN & MEAT
bases.addEventListener(`click`, selectBaseSauseElem.bind(null, bases, basePrice));
sauses.addEventListener(`click`, selectBaseSauseElem.bind(null, sauses, sausePrice));
vegans.addEventListener(`click`, selectVeganMeatElem.bind(null, veganPrice));
meats.addEventListener(`click`, selectVeganMeatElem.bind(null, meatPrice));
// --------addEventListener ------------------------------------------------GET PIRICES
bases.addEventListener(`click`, (ev) => { pushPriceObj(), countSummOrder(orderPizza) })
vegans.addEventListener(`click`, (ev) => { pushPriceObj(), countSummOrder(orderPizza) })
meats.addEventListener(`click`, (ev) => { pushPriceObj(), countSummOrder(orderPizza) })
sauses.addEventListener(`click`, (ev) => { pushPriceObj(), countSummOrder(orderPizza) })
// --------addEventListener --------------------------------------FILL PEACES PIZZA
conponentsPizza.addEventListener(`click`, checkedSelectElemPizza)
// -------addEventListener ---------------------------------------BUTTON SEND ORDER
buttonOrder.addEventListener(`click`, (ev) => {
    const amoutActiveElem = calulateList.children.length
    if (amoutActiveElem >= 6) {
        Popup.show(`Your order has been sent to the pizzeria`)
        console.log(orderPizza)
    } else {
        PopupAlert.showPopuTexst(`Not enough selected ingredients`)
    }
});
// --------addEventListener ------------------------------------------------HIDE POPUP
popup.addEventListener(`click`, (ev) => { Popup.hide(), clearOrder() })




