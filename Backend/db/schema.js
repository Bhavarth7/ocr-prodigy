import mongoose from "mongoose";

// Create a Mongoose Schema for 'Info'
const infoSchema = new mongoose.Schema({
    // Image field to store the image URL or path
    image: {
        type: String,
    },
    // Identification Number of the user
    identificationNumber: {
        type: String,
        // Required: true,
    },
    // First Name of the user
    firstName: {
        type: String,
        // Required: true,
    },
    // Last Name of the user
    lastName: {
        type: String,
        // Required: true,
    },
    // Date of Birth of the user
    dateOfBirth: {
        type: String,
        // Required: true,
    },
    // Date of Expiry of the document (if applicable)
    dateOfExpiry: {
        // type: [String],
    },
    // Date of Issue of the document
    dateOfIssue: {
        type: String,
        // Required: true,
    },
});

// Create a model 'Info' based on the defined schema
export default mongoose.model("Info", infoSchema);
