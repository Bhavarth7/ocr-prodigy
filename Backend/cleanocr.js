// Function to check if a string contains only letters and spaces
function isLetter(s) {
    return s.length === 1 && s.match(/[a-zA-Z\s]+/);
}

// Function to extract data from a given string and format it into a JSON object
export const cleanData = (str) => {
    const extractedData = {};

    // Extract First Name
    const firstNameStart = str.search("Name") + 5;
    const firstNameEnd = str.search("Last");
    extractedData["firstName"] = str.substring(firstNameStart, firstNameEnd);

    // Extract Last Name
    let lastName = "";
    const lastNameSearch = "Last name ";
    const lastNameStart = str.search(lastNameSearch);
    for (let i = lastNameStart + 10; i < str.length && isLetter(str[i]); i++) {
        lastName += str[i];
    }
    extractedData["lastName"] = lastName;

    // Extract Dates (DOB, DOI, DOE)
    const dobPattern = /\b\d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(\.|) \d{4}\b/g;
    const matchedDates = str.match(dobPattern);
    if (matchedDates && matchedDates.length === 3) {
        extractedData["dob"] = matchedDates[0];
        extractedData["doi"] = matchedDates[2];
        extractedData["doe"] = matchedDates[1];
    }

    // Extract Identification Number
    const identificationPattern = /\d \d{4} \d{5} \d{2}/;
    const matchedNumber = str.match(identificationPattern);
    if (matchedNumber) {
        extractedData["identificationNumber"] = matchedNumber[0];
    }

    // Create a formatted JSON object with extracted data
    const jsonOcr = {
        identificationNumber: extractedData["identificationNumber"],
        firstName: extractedData["firstName"],
        lastName: extractedData["lastName"],
        dateOfBirth: extractedData["dob"],
        dateOfIssue: extractedData["doi"],
        dateOfExpiry: extractedData["doe"],
    };

    console.log(jsonOcr); // Log the extracted data
    return jsonOcr; // Return the formatted JSON object
};
