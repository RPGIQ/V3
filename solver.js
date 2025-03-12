import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCw-zl8Opufg51WWmUcN5cG59ygNpARvOY";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function solveEquation() {
    let equation = document.getElementById('equation-input').value;

    const prompt = `Solve this chemical equation: ${equation}`;
    try {
        const result = await model.generateContent(prompt);

        console.log(result);

        if (result.response && typeof result.response.text === 'function') {
            document.getElementById('result').innerText = "Solution: " + result.response.text().trim();
        } else if (result.response && typeof result.response === 'string') {
            document.getElementById('result').innerText = "Solution: " + result.response.trim();
        } else {
            document.getElementById('result').innerText = "Error: Unexpected response format.";
        }
    } catch (error) {
        console.error('Error occurred while solving the equation:', error);
        document.getElementById('result').innerText = "Error: " + error.message;
    }
}

document.getElementById('solve-button').onclick = solveEquation;
