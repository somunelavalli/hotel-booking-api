const fs = require('fs');
const path = require('path');

const counterFilePath = path.join(__dirname, 'counter.txt');
let counter = readCounterFromFile() || 1;

function readCounterFromFile() {
  try {
    const counterData = fs.readFileSync(counterFilePath, 'utf8');
    return parseInt(counterData);
  } catch (error) {
    return null;
  }
}

function writeCounterToFile() {
  fs.writeFileSync(counterFilePath, counter.toString(), 'utf8');
}

function generateBookingId() {
  const prefix = 'ksuites';
  const paddedCounter = counter.toString().padStart(5, '0');
  const bookingId = `${prefix}-${paddedCounter}`;
  counter++;
  writeCounterToFile();

  return bookingId;
}

module.exports = generateBookingId

// Usage example
// const bookingId1 = generateBookingId();
// const bookingId2 = generateBookingId();

// console.log(bookingId1);
// console.log(bookingId2);
