// Arrow Functions

const sayHello = (name) => {
    console.log(`hello ${name}`);
}

sayHello("Sait");

// Destructing

let number1, number2;
arr = [5, 6, 7, 8];

[number1, number2] = arr;

console.log(number1, number2);

// Object Destructing

const numbers = {
    a: 10,
    b: 20,
    c: 30,
    d: 40,
    e: 50
}

const { a: sayi1, c: sayi2, e: sayi3 } = numbers;

console.log(sayi1, sayi2, sayi3);

// **example**
const getLangs = () => ["JavaScript", "Java"];
const [lang1, lang2] = getLangs();

console.log(lang1, lang2);


const person = {
    name: "Sait Akgunes",
    year: 1999,
    showInfos: () => console.log("showing infos !")
}

const { name: isim, year: yil, showInfos: bilgileriGoster } = person;

console.log(isim, yil);
bilgileriGoster();


// Spread Operator

const games = ["Left 4 Dead", "Max Payne", "Minecraft"];
console.log(...games);

const games2 = ["Dying Light 2", "Football Manager 2022", ...games];
console.log(games2);

const [a, ...games3] = games2;
console.log(a, games3);

const addNumbers = (a, b, c) => console.log(a + b + c);
const addingNumbers = [3, 4, 5];

addNumbers(...addingNumbers);


// MAP (key & value)

let myMap = new Map();

const key1 = "Sait";
const key2 = { msa: 10, esa: 20 };
const key3 = () => 1907;

myMap.set(key1, "String Değer");
myMap.set(key2, "Object Literal Değer");
myMap.set(key3, "Function Değer");

console.log(myMap.get(key1));
console.log(myMap.get(key2));
console.log(myMap.get(key3));
console.log(myMap);
console.log(myMap.size);

// arraylerden map oluşturma

const array = [["key1", "value1"], ["key2", "value2"]];
const lastMap = new Map(array);
console.log(lastMap);

// mapten array oluşturma

const mapToArray = Array.from(myMap);
console.log(mapToArray);

// SET

const myset = new Set();

myset.add(100);
myset.add(100);
myset.add(3.14);
myset.add("Sait");
myset.add(true);
myset.add([1, 2, 3]);
myset.add({ a: 1, b: 2 });

const myset2 = new Set([100, 3.14, "Sait"]);

console.log(myset.size);
myset.delete("Sait");
console.log(myset.has("Sait"));
console.log(myset.has(3.14));
console.log(myset.has(2000));
console.log(myset.has([1, 2, 3]));

const arraySet = Array.from(myset);

console.log(arraySet);

// For Each

myset.forEach(function (value) {
    console.log(value);
})

// For Of 

for (let value of myset) {
    console.log(value);
}