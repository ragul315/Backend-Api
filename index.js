/*
  index.js - Beginner Example: Express.js REST API

  This file demonstrates a basic REST API using Express.js.
  A REST API lets your application exchange data over HTTP (for example, using GET, POST, PUT commands),
  which is very useful for web or mobile apps.

  This API is for a simple "course" resource.
  It keeps courses in memory (all data goes away when the server restarts).

  Endpoints:
  - GET /                  : Returns "Hello World" (to test server is running)
  - GET /api/courses       : Returns a list of all courses
  - GET /api/courses/:id   : Returns a course with a given id
  - POST /api/courses      : Adds a new course (expects a JSON body with a 'name')
  - PUT /api/courses/:id   : Updates the name of a course by id

  Input validation uses Joi (checks course names are at least 3 chars, present, and a string).
*/

// Import Express framework and Joi validation library
const express = require("express");
const app = express();
const Joi = require("joi"); // For input validation

// Middleware to parse JSON in request bodies
app.use(express.json());

// In-memory array to store list of courses
// (This data is reset every time the server stops)
courses=[
    {id: 1, course: "course1"},
    {id: 2, course: "course2"},
    {id: 3, course: "course3"}
];

// Basic test endpoint, visit http://localhost:3001/ to check your server
app.get("/", (req, res) => {
    res.send("Hello World");
});

/*
  GET /api/courses
  Returns the list of all courses as JSON.
  Example response:
  [
     { "id": 1, "course": "course1" },
     { "id": 2, "course": "course2" },
     { "id": 3, "course": "course3" }
  ]
*/
app.get("/api/courses", (req, res) => {
    res.send(courses);
});

/*
  GET /api/courses/:id
  Returns the course with the specified id. If not found, returns 404.
  Example: GET /api/courses/1
*/
app.get('/api/courses/:id', (req, res) => {
    // Parse the id parameter from URL and look for a matching course
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('this course not found');
    res.send(course);
});

/*
  POST /api/courses
  Adds a new course. Requires a JSON body like { "name": "New Course" }.
  Validation: name is required, must be at least 3 characters.
*/
app.post('/api/courses', (req, res) => {
    // Define validation schema for course names
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    // Validate the request body
    const result = schema.validate(req.body);
    console.log(result);

    // If invalid, respond with error
    if(result.error){
        res.status(400).send(result.error);
        return;
    }

    // Create new course with next id and the provided name
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course); // Return the newly created course
});

/*
  PUT /api/courses/:id
  Updates the 'name' for a course by id.
  Requires a JSON body like { "name": "Updated Course" }.
  Validation: name is required, must be at least 3 characters.
*/
app.put('/api/courses/:id', (req, res) => {
    // Find the course by id
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('this course not found');

    // Validate the new data
    const result = validatecourse(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    // Update the course name
    course.name = req.body.name;
    res.send(course); // Return the updated course
});

// Configure port: use PORT environment variable or default to 3001
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));

/*
  Helper function for validating a course.
  NOTE: This uses the old Joi.validate API, which may cause issues with newer Joi versions.
        To update, use:
        const schema = Joi.object({ name: Joi.string().min(3).required() });
        return schema.validate(course);
*/
function validatecourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

// End of code. 
// Note: There is also a sample.js file in this project directory. It is empty and used for demonstration only.
