/* Variables globales */
let currentNumber = '';
let previousNumber = '';
let operator = '';
let result = '';

/* Función de entrada de números */
function entry(number) {
    if (number === '.' && currentNumber.includes('.')) {
        return;
    }
    currentNumber += number;
    document.querySelector('.screen').innerText = currentNumber;
}

/* Manejo de evento en teclas de números */
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', (event) => {
        const number = event.target.getAttribute('data-value');
        entry(number);
    });
});

/* Manejo de eventos en teclas de operador */
document.querySelectorAll('.operator').forEach(element => {
    element.addEventListener('click', (event) => {
        const selectedOperator = event.target.getAttribute('data-value');
        /* Manejo de tecla '=' */
        if (selectedOperator === '=') {
            if (currentNumber === '' || previousNumber === '') return;

            calculate();
            document.querySelector('.screen').innerText = result;
            previousNumber = '';
            currentNumber = result.toString();
            operator = '';
        } 
        /* Manejo de tecla '+/-' */
        else if (selectedOperator === '+/-') {
            let screenElement = document.querySelector('.screen');
            let screenValue = parseFloat(screenElement.innerText);

            if (screenValue > 0) {
                screenElement.innerText = -screenValue;
            } else if (screenValue < 0) {
                screenElement.innerText = Math.abs(screenValue);
            } else {
                return;
            }
        } 
        /* MAnejo de tecla '√' */
        else if (selectedOperator === '√' ) {
            if (currentNumber !== '' ) {
                let raiz = parseFloat(currentNumber);
                result = Math.sqrt(raiz);
                document.querySelector('.screen').innerText = result;
                previousNumber = '';
                currentNumber = result.toString();
                operator = '';
            }
        }
        /* Manejo de '%' */
        else if (selectedOperator === '%') {
            if (previousNumber !== '' && operator !== '') {
                let percentage = parseFloat(currentNumber) / 100;
                switch (operator) {
                    case '+':
                        /* ejm: [ 200+20% = 240 ]; cuánto es (num1) + (x% de num1) */
                        result = parseFloat(previousNumber) + (parseFloat(previousNumber) * percentage);
                        break;
                    case '-':
                        /* ejm: [ 200-20% = 160 ]; cuánto es (num1) - (x% de num1) */
                        result = parseFloat(previousNumber) - (parseFloat(previousNumber) * percentage);
                        break;
                    case '*':
                        /* ejm: [200*20%= 40]; cuánto es el (x% de num1) */
                        result = parseFloat(previousNumber) * percentage;
                        break;
                    case '/':
                        /* ejm: [200/20%= 1000]; cuánta (x%) hay en (num1); según el ejemplo [200/0.2= 1000]; cuánto veces 0.2 hay en 200*/
                        if (parseFloat(currentNumber) === 0) {
                            result = 'Error';
                        } else {
                            result = parseFloat(previousNumber) / percentage;
                        }
                        break;
                    default:
                        result = 'Error';

                }
                document.querySelector('.screen').innerText = result;
                previousNumber = '';
                currentNumber = result.toString();
                operator = '';
            }
        } 
        /* Manejo para teclas de otros operadores */
        else {
            if (currentNumber === '') return;

            if (previousNumber !== '' && operator !== '') {
                calculate();
                document.querySelector('.screen').innerText = result;
            } else {
                result = currentNumber;
            }

            operator = selectedOperator;
            previousNumber = result;
            currentNumber = '';
        }
    });
});

/* Manejo para teclas de encendido y apagado */
document.querySelectorAll('.light').forEach(light => {
    light.addEventListener('click', (event) => {
        const lightState = event.target.getAttribute('data-value');
        if (lightState === 'on') {
            result = 0;
            document.querySelector('.screen').innerText = result;
            previousNumber = '';
            currentNumber = '';
            operator = '';
        } else {
            result = '';
            document.querySelector('.screen').innerText = result;

        }
    });
});

/* Función de calcular */
function calculate() {
    let num1 = parseFloat(previousNumber);
    let num2 = parseFloat(currentNumber);

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                result = 'Error';
            } else {
                result = num1 / num2;
            }
            break;
        default:
            result = 'Error';
    }
}
