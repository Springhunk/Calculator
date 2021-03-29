class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    append(number) {
        if (number === "." && this.currentOperand.includes(".")) {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    clear() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand === "" && this.previousOperand !== "") {
            this.currentOperand = this.previousOperand;
            this.previousOperand = "";
        }
        else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }

    operator(operation) {
        if (operation === "%") {
            this.currentOperand /= 100;
            this.display();
            return;
        }

        if (this.currentOperand !== "") {
            this.previousOperand = this.calculate();
        }
        else if (this.currentOperand === "" && operation === "-") {
            this.currentOperand = operation;
            return;
        }

        this.operation = operation;
        this.previousOperand = `${this.currentOperand} ${operation}`;
        this.currentOperand = "";
    }

    calculate() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
            case "÷":
                computation = prev / current;
                if (computation === Infinity) {
                    computation = undefined;
                }
                break;
            default:
                return;
        }
        if (isNaN(computation)) {
            computation = "";
            return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    display() {
        this.previousOperandText.innerText = this.previousOperand;
        this.currentOperandText.innerText = this.currentOperand;
    }
}


const numberBtns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operator]");
const equalBtn = document.querySelector("[data-equal]");
const clearBtn = document.querySelector("[data-clear]")
const deleteBtn = document.querySelector("[data-delete]")
const prevOperand = document.querySelector("[data-previous-operand]");
const curOperand = document.querySelector("[data-current-operand]");

const calculator = new Calculator(prevOperand, curOperand);

numberBtns.forEach(button => {
    button.addEventListener("click", () => {
        calculator.append(button.innerText);
        calculator.display();
    })
})

operatorBtns.forEach(button => {
    button.addEventListener("click", () => {
        calculator.operator(button.innerText);
        calculator.display();
    })
})

clearBtn.addEventListener("click", () => {
    calculator.clear();
    calculator.display();
})

deleteBtn.addEventListener("click", () => {
    calculator.delete();
    calculator.display();
})

equalBtn.addEventListener("click", () => {
    calculator.calculate();
    calculator.display();
})