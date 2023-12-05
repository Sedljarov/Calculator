// Решил сделать этот калькулятор не привязывая к каждой кнопке listener потому что так делал в прошлом калькуляторе

let firstNumber = "";
let secondNumber = "";
let sign = "";
let result = false;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const action = ["-", "+", "*", "/", "n^i", "+/-"];

const out = document.querySelector(".display");
const ac = document.querySelector(".ac");
const buttons = document.querySelector(".buttons");

function clearAll() {
  firstNumber = "";
  secondNumber = "";
  sign = "";
  result = false;
  out.innerText = 0;
}
function power() {
  firstNumber = Math.pow(firstNumber, secondNumber);
}
function plusMinus() {
  out.innerText = "-";
}
ac.addEventListener("click", clearAll);

const eventButtons = (e) => {
  if (!e.target.classList.contains("btn")) return;
  if (e.target.classList.contains("ac")) return;
  out.innerText = "";
  const key = e.target.innerText;
  if (digit.includes(key)) {
    if (secondNumber === "" && sign === "") {
      firstNumber += key;
      out.innerText = firstNumber;
    } else if (firstNumber !== "" && secondNumber !== "" && result) {
      secondNumber = key;
      result = false;
      out.innerText = secondNumber;
    } else {
      secondNumber += key;
      out.innerText = secondNumber;
    }
    console.log(firstNumber, secondNumber, result);
    return;
  }
  if (action.includes(key)) {
    if (key === "+/-") {
      if (secondNumber) {
        secondNumber = -secondNumber;
        out.innerText = secondNumber;
        return;
      }
      firstNumber = -firstNumber;
      out.innerText = firstNumber;
    } else {
      sign = key;
      out.innerText = sign;
      return;
    }
  }

  if (key === "=") {
    if (secondNumber === "") {
      secondNumber = firstNumber;
    }
    switch (sign) {
      case "+":
        firstNumber = +firstNumber + +secondNumber;
        break;
      case "-":
        firstNumber = firstNumber - secondNumber;
        break;
      case "*":
        firstNumber = firstNumber * secondNumber;
        break;
      case "/":
        if (secondNumber === "0") {
          out.innerText = "Ошибка";
          firstNumber = "";
          secondNumber = "";
          sign = "";
          return;
        }
        firstNumber = firstNumber / secondNumber;
        break;
      case "+/-":
        out.innerText = "-";
        break;
      case "n^i":
        power();
        out.innerText = firstNumber;
        break;
      default:
        break;
    }
    result = true;
    out.innerText = firstNumber;
    console.log(firstNumber, secondNumber, sign, result);
  }
};

buttons.addEventListener("click", eventButtons);
