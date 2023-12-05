import vision from "@google-cloud/vision";
import { cleanData } from "./cleanocr.js";

// Replace 'D:\Download\ocr-project-407006-12737e0dc4ce.json' with your actual path or credentials
const CREDENTIALS = {
  "type": "service_account",
  "project_id": "ocr-project-407006",
  "private_key_id": "12737e0dc4cef1a9af721aab0eb3324c77dd724f",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDvze5ngLyLAvsT\nCUqHCcJosMymJIZWF6sdiIk6UktdIYbgzNjch1Md5xdKQET4ayQ4YmvkZixYJCB5\nEJ4qVPhWknYRffMPeOzJ+3BobTrJGTTyrN5AudqiBGThdwAM19+Y+4VctvZLub7b\npMKlpMflXTTdhp3xVTvPAZ5ZIkK81mNxm6D1dYStYCeY8filbwPflT1uPhBX+Y6x\nLnLosNW4vnjPr8d4m0sKWenEIgX7vg9QBnll9NnpI9t7Jgk00xhKnt8DHGisp+28\nV8lwOmrZn7chh/ZQbB0bDf+GUVWHGyhnQ1R6qq5b+HPtfA0+GHBVCA+H16WW0qvj\nU8I41SDbAgMBAAECggEALQ9CdVNk2jAYsnaD+QTV8WsLQUrKrUGsRxPhSUKuY5UJ\nrZMASsvoy80g/LQ/4XfsaeXghR3HxlYfffAn8CdgNJA3vEiw097yi2+CKzUfHytr\n3g+qgXoKwXfW5uC/8ynbG3ljkUzV0dvYp5f5dTuVzhzp8pg5dGACKX8R3IjKBoZb\nMj4XP087wAueo1DTXWNjrZ9oF1JwYyTpsGLPuB5IUGVK7edRGPmNZp4FFSTcM39k\nSDAPak4C0OJ3/DtXsiVWAV08eNBNvlfl3ZgNgQ/mUj4FNtOQZjVVuUk3gyCndjev\naqUf9y46HVGfS8XP1M9BhZQhefTp4fhbVxNh5nrTpQKBgQD5yylXrsAA8AWlI8vv\nAzd+4WxGvq1GK7NTqW+mseZHRLxO3PpIQkyexckI/IUM5u2ZzqRiRxW1tNnvjv5F\nG+7mBE2VWpPO5xXpb7SA1DF2ilXE0UHuFTgQrGTV+UQw/D4BP407GhGL8NhxZTjn\n0CV4l8H093t/ZYOuiSBQJx+8twKBgQD1wzuHj4VrTrBMyHWSGGeUxWKFxK+isaBX\ngRkhx+0Waqlr3+6NCnNrT4XrGQr9K1DfyPNrq5SEwjS4Uj2oZZRa4X+o7lXtcUJ5\nw9SU3qda0JtllB8XMX1+6XsBcVuLcrxbNosF5w3gZKpQO0JqnHDV0OJ2nRMMvVBq\n6L466OVg/QKBgQDAlUifiGQRlPvVMP8GnCVKFkPjWxi+M+0DAGvLSfbvVWgVKTtx\nQGRQOM7gtcdihhwDbBTCjGmJeRBZKJaS85FBF2o1TusMJo93NR8l//LOoKK1plu9\nUfCysibf7VkMpzyqu7OIMHX8vUgyTMcNuiVZjy8DTVaShtJ6WtBl23QViwKBgQDF\n+vfq1dCaSHK3+EjWX3iaHYSn1HHU85kCxQo073TsORKwx13KGyAt04tDgBIdLxbg\noGaQV1G2vShxUDdBgEtKBxyrPwzT0gjGRN7s6o0RGLoG05NUQNcjNP2VhPdFWDGq\nnT7Ti3XfTdjx9zsi3VH8vWCiQxlEiwHMjiApHtMiFQKBgQDnYLXr1vafq2k6ehkK\nm0SJfU9ekZhAEv3szWnXmWSiB3vytIezObK1cr4UT8ghGcKD+IQN/YDF0aDhV5Uc\nh4NngVI2XV7vCBuSHmGG1FVeraHKG84f+SdzItcLi+QRD2jtNrd64TXg2SvQJi2l\n5boFf9+Edjk+Tw1c0Ag3fKMG6g==\n-----END PRIVATE KEY-----\n",
  "client_email": "ocr-498@ocr-project-407006.iam.gserviceaccount.com",
  "client_id": "104124637137807814460",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/ocr-498%40ocr-project-407006.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
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
