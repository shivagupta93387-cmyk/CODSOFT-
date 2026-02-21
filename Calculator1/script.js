const display = document.getElementById("display");
const historyList = document.getElementById("history-preview");
const historyListUl = document.getElementById("history-list");

let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
renderHistory();

function transport(value) {
    display.value += value;
    scrollToRight();
}

function clearDisplay() {
    display.value = "";
    historyList.innerText = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function advancedMath(func) {
    if (func === 'pow') {
        display.value += '^';
    } else {
        display.value += func + '(';
    }
    scrollToRight();
}

function calculate() {
    try {
        let expression = display.value;
        let originalExpression = expression;

        // Replace scientific functions with Math object logic
        expression = expression.replace(/sin\(/g, 'Math.sin(Math.PI/180*');
        expression = expression.replace(/cos\(/g, 'Math.cos(Math.PI/180*');
        expression = expression.replace(/tan\(/g, 'Math.tan(Math.PI/180*');
        expression = expression.replace(/log\(/g, 'Math.log10(');
        expression = expression.replace(/sqrt\(/g, 'Math.sqrt(');
        expression = expression.replace(/\^/g, '**');

       
        let result = eval(expression);
        
       
        if (!Number.isInteger(result)) {
            result = result.toFixed(8).replace(/\.?0+$/, "");
        }

        
        addToHistory(originalExpression, result);

        display.value = result;
        historyList.innerText = originalExpression + " =";
        
    } catch (e) {
        display.value = "Error";
        setTimeout(() => display.value = "", 1500);
    }
}

function addToHistory(expr, res) {
    const item = { expr, res };
    history.unshift(item);
    if (history.length > 20) history.pop(); 
    localStorage.setItem("calcHistory", JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    historyListUl.innerHTML = "";
    history.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="history-expression">${item.expr}</span>
            <span class="history-result">= ${item.res}</span>
        `;
        li.onclick = () => {
            display.value = item.res;
        };
        historyListUl.appendChild(li);
    });
}

function clearHistory() {
    history = [];
    localStorage.removeItem("calcHistory");
    renderHistory();
}

function scrollToRight() {
    display.scrollLeft = display.scrollWidth;
}


document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (/[0-9]/.test(key)) {
        transport(key);
    } else if (['+', '-', '*', '/', '.', '%', '(', ')'].includes(key)) {
        transport(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === '^') {
        advancedMath('pow');
    }
});
