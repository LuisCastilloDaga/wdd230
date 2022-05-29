/* :::::::: Weather Section :::::::: */
function changeCtF(x) {
    return ((x*9)/5)+32;
}
function changeFtC(z) {
    return (z-32)*5/9;
}
function changetoMph(y) {
    return y*0.621371;
}

const temp = changeCtF(parseFloat(document.querySelector("#temperature").textContent));
const windS = changetoMph(parseFloat(document.querySelector('#windS').textContent));
var windChild;



function calWindChild(temperature, wSpeed) {
    let result = 35.74 + (temperature*0.6215) - (35.75*Math.pow(wSpeed,0.16)) + 0.4275*temperature*Math.pow(wSpeed, 0.16);
    return  changeFtC(result).toFixed(1);
}


if (temp<=50 && windS>3 ) {
    windChild = `${calWindChild(temp, windS)} ºC`;
    
} else {
    windChild = "N/A";
}

document.querySelector('#windChild').textContent =  windChild;