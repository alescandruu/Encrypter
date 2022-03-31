let characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", 
"Q", "R",  "S", "T", "U", "V",  "W", "X", "Y", "Z",  "0", "1",  "2", "3", "4", "5", "6", "7",  
"8", "9", ".", ",", "?", "!", "'", "_", "-", "&", "@", "#", "$", "%", "*", "(", ")", " "];

let messageInput = document.getElementById("messageInput");
let keyInput = document.getElementById("keyInput");
let resultContainer = document.getElementById("resultContainer");

function messageToIndex(message) {
    let initialMessage, finalMessage = [];
    initialMessage = message.toUpperCase();
    for(let i = 0; i < initialMessage.length; i++) {
        finalMessage[i] = characters.indexOf(initialMessage[i]);
    }
    return finalMessage;
}

function encryptMessage(message, key) {
    let indexedMessage = messageToIndex(message);
    let indexedKey = messageToIndex(key);
    let encryptedMessage = [];
    for(let i = 0; i <  indexedMessage.length; i++) {
        indexedMessage[i] += indexedKey[i % indexedKey.length];
        indexedMessage[i] %= characters.length; // if the sum of the indexes is bigger than characters array's length, we need to search for the resulted character from the beginning of the array
        encryptedMessage[i] = characters[indexedMessage[i]];
    }
    return encryptedMessage.join("");
}

function decryptMessage(message, key) {
    let indexedMessage = messageToIndex(message);
    let indexedKey = messageToIndex(key); 
    let encryptedMessage = [];
    for(let i = 0; i <  indexedMessage.length; i++) {
        indexedMessage[i] -= indexedKey[i % indexedKey.length];
        if(indexedMessage[i] < 0) {
            indexedMessage[i] += characters.length;
        }
        encryptedMessage[i] = characters[indexedMessage[i]];
    }
    return encryptedMessage.join("");
}

function showMessage(type) {
    let message = messageInput.value;
    let key = keyInput.value;
    let result;
    if(type == 'encrypt') {
        result = encryptMessage(message, key);
    } else {
        result = decryptMessage(message, key);
    }
    resultContainer.innerHTML = result;
    if((message != '' || key != '') && result != '') {
        document.getElementById("helloRobot").style.display  = "none";
        document.getElementById("searchingRobot").style.display = "none";
        document.getElementById("resultRobot").style.display = "block";
    }
}

function changeRobot() {
    let message = messageInput.value;
    let key = keyInput.value;
    if(message != '' || key != '') {
        document.getElementById("helloRobot").style.display  = "none";
        document.getElementById("searchingRobot").style.display = "block";
        document.getElementById("resultRobot").style.display = "none";
    } else {
        document.getElementById("helloRobot").style.display  = "block";
        document.getElementById("searchingRobot").style.display = "none";
        document.getElementById("resultRobot").style.display = "none";
        resultContainer.innerHTML = '';
    }
}

function copyToClipboard() {
    console.log(navigator.clipboard);
    navigator.clipboard.writeText(resultContainer.innerHTML);
}