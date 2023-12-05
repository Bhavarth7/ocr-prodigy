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


API Endpoints
POST /api/users/upload: Create a new ID card entry.
PUT /api/users/:id: Update an existing ID card entry.
DELETE /api/users/:id: Delete an ID card entry.
GET /api/users: Retrieve all ID card entries.
GET /api/users/:id: Retrieve one ID card entry using its ID.
