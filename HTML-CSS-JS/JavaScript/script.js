// Definir una variable numérica, asignarle un valor y sumarle 5.

let variable = 0

variable=+ 5

console.log(variable)

//Definir dos variables de cadenas, asignarles valores y concatenarlas.

let palabra1 = 'Hola'
let palabra2 = 'Mundo'

let nuevaPalabra = palabra1 + ' ' + palabra2
console.log(nuevaPalabra)

//Evaluar si dos números son iguales, diferentes, mayor o menor. Resolver utilizando “if”/”else”.

const iguales = (a, b) => {
    if(a > b) {
        console.log(`${a} es mayor que ${b}`)
    } else if (a < b) {
        console.log(`${a} es menor que ${b}`)
    }
    else {
        console.log(`${a} es igual que ${b}`)
    }
}

(iguales(0,-1))

/* Utilizando “switch”. Definir una variable numérica. Asignarle un valor entre 1 y 10; mostrar a qué grupo pertenece:
Grupo 1: del 1 al 3
Grupo 2: del 4 al 6
Grupo 3: del 7 al 10
Modifiquemos el ejercicio para que el número lo ingrese el usuario (con “prompt”). */

/* let numero = prompt("Ingresa un número entre 1 y 10:");

numero = parseInt(numero);

switch (true) {
  case (numero >= 1 && numero <= 3):
    console.log("El número pertenece al Grupo 1.");
    break;
  case (numero >= 4 && numero <= 6):
    console.log("El número pertenece al Grupo 2.");
    break;
  case (numero >= 7 && numero <= 10):
    console.log("El número pertenece al Grupo 3.");
    break;
  default:
    console.log("El número ingresado no está en el rango del 1 al 10 o no es un número válido.");
} */

// Realizar la sumatoria de 0 a 10 y devolver el valor de la misma.
let a = 0
for(i = 0; i<10 ; i++) {
    a+= 1
}
console.log(a)

//Generar un array con 10 números, recorrerlo e ir multiplicando todos los elementos, finalmente obtener el producto total.

let array = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512]
let res = 1

for (i = 1; i < array.length; i++) {
    res = res * array[i]
}

console.log(res)

//Crear una función que reciba dos valores y retorne el producto de los mismos.

const producto = (a, b) => {
    return a * b
}
console.log(producto(1, 2))

// Crear una función que reciba dos cadenas y retorne la concatenación de la misma.

const concatenación = (a, b) => {
   return a.toString() + b.toString()
}

console.log(concatenación(5,5))

//Crear una función, a partir de la lógica aplicada en ejercicio 3, que reciba dos valores y muestre cuál es el mayor. En caso de ser iguales, deberá indicarlo. 

//Ya lo hice asi en el 3 :)

//Crear una función que reciba un número y muestre tantos asteriscos como la cantidad de veces que se pasó como parámetro.

const numero = (a) => {
    for (i = 0; i < a; i++) {
        console.log('*')
    }
}

/* numero(10) */

/* Crear una función que reciba el monto de un producto, y el medio de pago: C (tarjeta de crédito), E (efectivo) y D (tarjeta de débito). 
Si el monto del producto es menor a $200 no se aplicará ningún descuento, pero si el monto a abonar es entre $200 y $400 se aplicará un descuento del 30% si el medio de pago es efectivo, 20% si se realiza con débito y 10% con tarjeta de crédito. 
Para montos mayores a $400, el descuento es el mismo sin importar el medio de pago, dicho descuento es del 40%. */

let pago = 0;

const productoCompra = (monto, metodo) => {
  if (monto <= 200) {
    pago = monto;
  } else if (monto > 200 && monto <= 400) {
    switch (metodo) {
      case 'efectivo':
        pago = monto * 0.7;
        break;
      case 'debito':
        pago = monto * 0.8;
        break;
      default:
        pago = monto * 0.9;
    }
  } else {
    pago = monto * 0.6;
  }

  console.log(pago);
};
productoCompra(400, 'debito')

/* Crear una función que reciba un número que represente la altura de un medio-árbol. Deberá generar de manera escalonada el mismo. Ejemplo: si la altura es 5 deberá mostrar:
*
* *
* * *
* * * *
* * * * * * */

const crearMedioArbol = (a) => {
  for (let i = 1; i <= a; i++) {
    let linea = ""; 
    for (let j = 1; j <= i; j++) {
      linea += "* ";
    }
    console.log(linea); 
  }
};

crearMedioArbol(5);

const calcularPromedio = () => {
  const tamañoArray = parseInt(prompt("Ingresa el número de elementos del array:"));

  if (isNaN(tamañoArray) || tamañoArray <= 0) {
    console.log("Por favor, ingresa un número válido y mayor que cero para el tamaño.");
    return;
  }
  const numerosIngresados = prompt(`Ingresa ${tamañoArray} números separados por espacios:`);

  const arrayDeCadenas = numerosIngresados.trim().split(" ");
  
  if (arrayDeCadenas.length !== tamañoArray) {
    console.log("La cantidad de números ingresados no coincide con el tamaño del array.");
    return;
  }

  let suma = 0;
  
  for (let i = 0; i < arrayDeCadenas.length; i++) {
    const numero = Number(arrayDeCadenas[i]);

    if (isNaN(numero)) {
      console.log(`Error: "${arrayDeCadenas[i]}" no es un número válido. Por favor, reinicia.`);
      return;
    }
    suma += numero;
  }

  const promedio = suma / arrayDeCadenas.length;

  console.log(`El promedio de los números es: ${promedio}`);
};

calcularPromedio();