# OCR Prodigy

## Overview

OCR Prodigy is a full-stack MERN project leveraging the Google Cloud Vision API for text extraction from Thai ID card images. The extracted data undergoes cleaning through regular expressions before being stored in a MongoDB database. The React-based frontend enables users to upload images, process them with the Vision API, and view the extracted details.

## Features

- Extract Thai ID card details using OCR.
- Clean and store extracted data in MongoDB.
- User-friendly React frontend for image uploading and analysis.

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
UI of webpage

<img width="920" alt="image" src="https://github.com/Bhavarth7/ocr-prodigy/assets/76651028/d0c3f9ec-beec-475e-b8d7-0f8c7961b0b8">

After Uploading the given sample id photo
Output of text extraction is given below.

<img width="828" alt="image" src="https://github.com/Bhavarth7/ocr-prodigy/assets/76651028/df1df7e6-b491-4a47-a3f1-f3875fb0090d">




API Endpoints
1. POST /api/users/upload: Create a new ID card entry.
2. PUT /api/users/:id: Update an existing ID card entry.
3. DELETE /api/users/:id: Delete an ID card entry.
4. GET /api/users: Retrieve all ID card entries.
5. GET /api/users/:id: Retrieve one ID card entry using its ID.
