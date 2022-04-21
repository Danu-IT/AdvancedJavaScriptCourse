class Hamburger {
    constructor(size, stuffing){
        this.size = size;
        this.stuffing = stuffing;
        this.topping = [];
        this.price = 0;
        this.calories = 0;
    }

    addTopping(topping){
        if(topping === 'mayonnaise' || topping === 'seasoning'){
            this.topping.push(topping);
        }
    }

    removeTopping(topping){
        if(this.topping.includes(topping)){
            this.topping.splice(this.topping.indexOf(topping), 1);
        }
    }

    getToppings(){
        this.topping.forEach(el => {
            if(el === 'mayonnaise'){
                this.price += 20;
                this.calories += 5;
            } else {
                this.price += 15;
            }
        });
    }

    calculateSize(){
        if(this.size == 'small'){
            this.price += 50;
            this.calories += 20;
        } else if(this.size == 'big'){
            this.price += 100;
            this.calories += 40;
        }
    }

    calculateStuffing(){
        if(this.stuffing == 'cheese'){
            this.price += 10;
            this.calories += 20;
        } else if(this.stuffing == 'lettuce'){
            this.price += 20;
            this.calories += 5;
        } else if(this.stuffing == 'potato'){
            this.price += 15;
            this.calories += 10;
        }
    }

    outputIngredientsForOrder(){
        let list = this.topping.concat(this.stuffing, this.size).reverse();
        list.forEach(el => {
            let newEl = document.createElement('li');
            newEl.classList.add('item');
            newEl.innerHTML = el;
            compound.append(newEl);
        });
    }
}

const oneHamburger = new Hamburger('big', 'lettuce');

let compound = document.querySelector('.compound');

oneHamburger.addTopping('mayonnaise');
oneHamburger.addTopping('seasoning');
oneHamburger.getToppings();
oneHamburger.calculateSize();
oneHamburger.calculateStuffing();
oneHamburger.outputIngredientsForOrder();

let div = document.querySelector('.priceAndColories');
div.innerHTML = `Price: <span> ${oneHamburger.price} $</span> <br> Calories: <span>${oneHamburger.calories} cal</span>`;