const allowed = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm ".split("");

const symbols = [
    "a.png", "b.png", "c.png", "d.png", "e.png", "f.png", "g.png", "h.png",
    "i.png", "j.png", "k.png", "l.png", "m.png", "n.png", "o.png", "p.png",
    "q.png", "r.png", "s.png", "t.png", "u.png", "v.png", "w.png", "x.png",
    "y.png", "z.png"
];

const reverseMapping = {
    "a.png": "a", "b.png": "b", "c.png": "c", "d.png": "d", "e.png": "e",
    "f.png": "f", "g.png": "g", "h.png": "h", "i.png": "i", "j.png": "j",
    "k.png": "k", "l.png": "l", "m.png": "m", "n.png": "n", "o.png": "o",
    "p.png": "p", "q.png": "q", "r.png": "r", "s.png": "s", "t.png": "t",
    "u.png": "u", "v.png": "v", "w.png": "w", "x.png": "x", "y.png": "y",
    "space.png": " "
};

const modeSelect = document.getElementById("mode");
const textInput = document.getElementById("textInput");
const outputDiv = document.getElementById("output");
const keyboardDiv = document.getElementById("keyboard");

function generateKeyboard() {
    keyboardDiv.innerHTML = ""; // clear previous keyboard
    symbols.forEach(symbol => {
        const img = document.createElement("img");
        img.src = `icons/${symbol}`;
        img.alt = symbol.split(".")[0]; 

        img.onclick = () => {
            const char = symbol.split(".")[0]; // extract the character example "a.png"
            textInput.value += char; 
            updateOutput();
        };

        img.className = "w-8 h-8 cursor-pointer transform hover:scale-110 transition duration-200"; 
        keyboardDiv.appendChild(img);
    });
}

// Lexical Analysis (Tokenization)
function tokenize(input) {
    const tokens = [];
    const invalidChars = []; 
    
    for (let char of input) {
        if (allowed.includes(char)) {
            tokens.push(char);
        } else {
            invalidChars.push(char); // collect invalid characters
        }
    }

    if (invalidChars.length > 0) {
        throw new Error(`❗️Unable to Translate❗️\nInvalid Characters: ${invalidChars.join(", ")}`); 
    }

    return tokens;
}


// Syntax Analysis
function parse(tokens) {
    // example: No consecutive spaces
    for (let i = 0; i < tokens.length - 1; i++) {
        if (tokens[i] === " " && tokens[i + 1] === " ") {
            throw new Error("Syntax Error: Consecutive spaces are not allowed.");
        }
    }
    return tokens; 
}

// Semantic Analysis
function semanticAnalysis(tokens) {
    return tokens.map(token => {
        const imageFile = `${token.toLowerCase()}.png`; 
        if (!symbols.includes(imageFile)) {
            throw new Error(`Semantic Error: No mapping for token '${token}'`);
        }
        return imageFile;
    });
}

function updateOutput() {
    try {
        const input = textInput.value;
        const tokens = tokenize(input); // Lexical analysis
        parse(tokens); // Syntax analysis
        const images = semanticAnalysis(tokens); // Semantic analysis
        
        outputDiv.innerHTML = ""; 
        images.forEach(image => {
            outputDiv.innerHTML += `<img src='icons/${image}' class='inline-block w-6 h-6 m-1'>`;
        });
    } catch (e) {
        outputDiv.innerText = e.message; 
    }
}

// Event listeners
modeSelect.onchange = () => {
    if (modeSelect.value === "decode") {
        generateKeyboard(); 
    } else {
        keyboardDiv.innerHTML = ""; 
    }
    textInput.value = ""; 
    outputDiv.innerHTML = ""; 
};

textInput.oninput = updateOutput;

if (modeSelect.value === "decode") {
    generateKeyboard();
}
