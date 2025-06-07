# Simple Course Management REST API (Node.js + Express)

## What is a REST API?

A **REST API (Representational State Transfer Application Programming Interface)** is a set of rules that allows programs to talk to each other over HTTP (the protocol of the web). REST APIs treat data as "resources" (like users, courses, products), and let you perform actions using standard HTTP methods:
- **GET** – Retrieve data
- **POST** – Add new data
- **PUT** – Update existing data

## About This Project

This project is a basic backend API server built with [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/).  
It demonstrates **course management** by providing endpoints to:
- List all courses
- Fetch a single course by its ID
- Add a new course
- Update the name of a course

**All data is stored in memory**, so any changes will be lost if you stop the server.

## Getting Started

### 1. Clone this Repository

```sh
git clone https://github.com/yourusername/Backend-Api.git
cd Backend-Api
```

### 2. Install Dependencies

Run this command to install the required packages:

```sh
npm install express joi
```

### 3. Run the Server

Start the server with:

```sh
node index.js
```

- The server will listen on **port 3001** by default.  
- You can set a different port by setting a `PORT` environment variable.

## Available Endpoints

### 1. GET `/`

Returns a friendly greeting (use to test if your server is running).

**Example Request:**  
```
GET http://localhost:3001/
```
**Response:**  
```
Hello World
```

---

### 2. GET `/api/courses`

Fetch all available courses.

**Example Request:**  
```
GET http://localhost:3001/api/courses
```

**Sample Response:**
```json
[
  { "id": 1, "course": "course1" },
  { "id": 2, "course": "course2" },
  { "id": 3, "course": "course3" }
]
```

---

### 3. GET `/api/courses/:id`

Fetch a course by its ID.

**Example Request:**  
```
GET http://localhost:3001/api/courses/1
```

**Sample Response:**
```json
{ "id": 1, "course": "course1" }
```

---

### 4. POST `/api/courses`

Add a new course.  
**You must send a JSON body with a "name" field** (string, at least 3 characters).

**Example Request (using Postman or curl):**
```
POST http://localhost:3001/api/courses
Content-Type: application/json

{
  "name": "New Course"
}
```

**Sample Response:**
```json
{ "id": 4, "name": "New Course" }
```

If the "name" is missing or too short, you’ll get a 400 error.

---

### 5. PUT `/api/courses/:id`

Update a course’s name by ID.  
**You must send a JSON body with a new "name".**

**Example Request:**
```
PUT http://localhost:3001/api/courses/2
Content-Type: application/json

{
  "name": "Updated Course Name"
}
```

**Sample Response:**
```json
{ "id": 2, "name": "Updated Course Name" }
```

If the course is not found, you’ll get a 404 error.

---

## How to Test Requests Using Postman

[Postman](https://www.postman.com/) is a free GUI tool to test APIs!

### Steps:
1. **Open Postman.**  
   Download and install from [here](https://www.postman.com/downloads/), if needed.

2. **Create a new Request:**
   - Click `+ New` > `Request`
   - Name your request and select/create a collection.

3. **Set Method and URL:**  
   - Put your method (GET, POST, PUT) using the dropdown.
   - Enter the URL, e.g. `http://localhost:3001/api/courses/`

4. **For POST/PUT, set the Body:**
   - Click the `Body` tab, select `raw`, and choose `JSON` from the dropdown.
   - Enter your JSON (e.g. `{ "name": "Python for Beginners" }`).

5. **Click `Send`.**  
   - The response from your API will appear in the bottom panel.
   - If there’s an error, you’ll see an error message and the HTTP status code.

### Example POST in Postman
- Method: `POST`
- URL: `http://localhost:3001/api/courses`
- Body: raw, JSON:
  ```json
  {
    "name": "JavaScript Essentials"
  }
  ```

- Click `Send` to get the new course in the response.

## Notes

- Data is only stored in memory. When you stop the server (press Ctrl+C), all courses will be lost.
- If you change the port, update the URL in Postman accordingly.

---

## License

This project is for learning and demonstration purposes only.

