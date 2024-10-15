import { GoogleGenerativeAI } from "@google/generative-ai";

// استخدم مفتاح API الخاص بك هنا
const API_KEY = "AIzaSyDeVwSq-uTipKfFMnwqbQcjzufebZTf4p0";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function solveEquation() {
    let equation = document.getElementById('equation-input').value;

    const prompt = `Solve this chemical equation: ${equation}`;
    try {
        const result = await model.generateContent(prompt);

        // Log the entire result to understand its structure
        console.log(result);

        // Adjust the way you access the text based on the actual response structure
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

// ربط الزر بوظيفة حل المعادلة
document.getElementById('solve-button').onclick = solveEquation;
