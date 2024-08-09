# Trade Balance Calculator

This is a Node.js application that parses cryptocurrency trade data from a CSV file, stores it in a MongoDB database, and provides an API to calculate the balance of each asset at a given timestamp.

## Features

- **CSV Parsing and Storage**: Upload a CSV file containing trade data, and the application will parse the file and store the data in a MongoDB database.
- **Balance Calculation**: An API endpoint that calculates and returns the balance of each asset before a given timestamp.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database to store trade data.
- **Mongoose**: ODM for MongoDB to interact with the database.
- **Multer**: Middleware for handling file uploads.
- **CSV-Parser**: Library to parse CSV files.

## Getting Started

### Prerequisites

- Node.js installed on your local machine.
- MongoDB server running locally or a MongoDB Atlas account.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/veerendra192/trade-balance-calculator/pull/new/master
   cd trade-parser
2. **Install Dependencies**:
   ```bash
   npm install
3. **Set Up Environment Variables**:
- Create a .env file in the root directory of the project.
- Add the following environment variables:
```bash
MONGO_URI=mongodb+srv://username:password@cluster0.9sppz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
PORT=3000
```
4.Start the Application:
```bash
node src/app.js
```
The application should now be running on http://localhost:3000.

API Endpoints
1. Upload CSV File
Endpoint: /api/trades/upload
Method: POST
Description: Upload a CSV file containing trade data. The server will parse the file and store the data in the MongoDB database.
Request: Form-data with a key file (file type) and the CSV file as the value.
2. Calculate Balance
- Endpoint: /api/balance
- Method: POST
- Description: Calculate the balance of each asset before a given timestamp.
- Request:
  Body (JSON):
```bash
{
  "timestamp": "2022-09-28 12:00:00"
}
```
- Response:
  Success (Example):
  ``` bash
  {
  "BTC": 15,
  "MATIC": 100
}











