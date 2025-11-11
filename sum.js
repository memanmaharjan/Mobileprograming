
function displaySum() {
    let a = 5;
    let b = 8;
    let c = a + b;
    document.getElementById('result').textContent = 'The sum is: ' + c;
    return c;
}
function displaySubtraction() {
    let a = 10;
    let b = 4;
    let c = a - b;
    document.getElementById('result').textContent = 'The subtraction is: ' + c;
    return c;
}
function displayMultiplication() {
    let a = 6;
    let b = 7;
    let c = a * b;
    document.getElementById('result').textContent = 'The product is: ' + c;
    return c;
}
function displayDivision() {
    let a = 20;
    let b = 5; 
    let c = a / b;
    document.getElementById('result').textContent = 'The quotient is: ' + c;
    return c;
}