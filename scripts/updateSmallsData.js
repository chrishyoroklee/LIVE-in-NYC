const fs = require('fs');
const path = require('path');

// Path to your JSON file
const filePath = path.join(__dirname, '../data/Smalls.json');

// Read the existing JSON file
let smallsData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Function to add a new show to a specific date
const addShow = (date, newShow) => {
    if (!smallsData[date]) {
        // If the date doesn't exist, create an array for it
        smallsData[date] = [];
    }
    // Add the new show to the date's array
    smallsData[date].push(newShow);
};

// Example: Adding a new show on "2024-08-17"
const newShow = {
    id: "show1",
    time: "8:00 PM",
    doorsOpen: "7:30 PM",
    band: "New Band Quartet"
};

addShow("2024-08-17", newShow);

// Write the updated data back to the JSON file
fs.writeFileSync(filePath, JSON.stringify(smallsData, null, 2));

console.log('Smalls.json has been updated.');