# OCR Prodigy

OCR Prodigy is an application designed to recognize Thai ID cards using Optical Character Recognition (OCR). It employs the Google Vision API for OCR processing, integrates with MongoDB for data storage, and provides REST API endpoints using Node.js for CRUD operations.

## Objective

The goal of this application is to accurately extract data from Thai ID cards via OCR processing and save the extracted information in a MongoDB database for retrieval.

## Features

- **OCR Processing**: Utilizes Google Vision API for OCR of Thai ID cards.
- **Data Extraction**: Extracts key information like name, last name, ID number, date of birth, date of issue, and date of expiry.
- **User Interface**: Allows users to upload Thai ID card images (png, jpeg, jpg) with a 2MB file size limit.
- **JSON Output**: Displays JSON output on the UI for successful OCR operations.
- **History and Filtering**: Provides options to query previous OCR results.
- **API Endpoints**: Offers CRUD operations for OCR records.
- **Advanced Features**: Includes error handling, unit tests, code comments, etc.

## Technologies Used

- **Frontend**: ReactJS
- **Backend**: Node.js
- **Database**: MongoDB
- **OCR Processing**: Google Vision API

### Installation

1. **Initialization:**

   ```bash
   git init
2. **Frontend**
    ```cd ..
      cd Frontend
      cd ocr
      npm install
      npm start
3. **Backend Setup**:
   ```bash
   cd Backend
   npm install
   npm run dev
   ##UI of webpage

<img width="920" alt="image" src="https://github.com/Bhavarth7/ocr-prodigy/assets/76651028/d0c3f9ec-beec-475e-b8d7-0f8c7961b0b8">

##After Uploading the given sample id photo
Output of text extraction is given below.

<img width="828" alt="image" src="https://github.com/Bhavarth7/ocr-prodigy/assets/76651028/df1df7e6-b491-4a47-a3f1-f3875fb0090d">


## API Endpoints
1. POST /api/users/upload: Create a new ID card entry.
2. PUT /api/users/:id: Update an existing ID card entry.
3. DELETE /api/users/:id: Delete an ID card entry.
4. GET /api/users: Retrieve all ID card entries.
5. GET /api/users/:id: Retrieve one ID card entry using its ID.




