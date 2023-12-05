import vision from "@google-cloud/vision";
import { cleanData } from "./cleanocr.js";

// Replace 'D:\Download\ocr-project-407006-12737e0dc4ce.json' with your actual path or credentials
const CREDENTIALS = {
  
};

const CONFIG = {
  credentials: {
    private_key: CREDENTIALS.private_key,
    client_email: CREDENTIALS.client_email,
  },
};

// Create a new Google Cloud Vision client
const client = new vision.ImageAnnotatorClient(CONFIG);

// Function to remove Thai words from a sentence
function removeThaiWords(sentence) {
  const thaiCharacterRange = /[\u0E00-\u0E7F]/;
  const words = sentence.split(/\s+/);
  const nonThaiWords = words.filter((word) => !thaiCharacterRange.test(word));
  const modifiedSentence = nonThaiWords.join(" ");
  return modifiedSentence;
}

// Function to extract OCR data from an image using Google Cloud Vision API
export const ocrData = async (path) => {
  try {
    // Perform text detection on the image using Google Cloud Vision API
    let [result] = await client.textDetection(path);
    let arrString = result.fullTextAnnotation.text;

    // Remove Thai words from the extracted text
    let cleanText = removeThaiWords(arrString);
    console.log(cleanText);

    // Clean and format the extracted data
    let data = cleanData(cleanText);
    return data;
  } catch (error) {
    console.error("Error processing OCR data:", error);
    throw new Error("Failed to extract OCR data");
  }
};
