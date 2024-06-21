const express = require("express");
const app = express();
const Joi = require("joi");

app.use(express.json());
courses=[
    {id: 1,course: "course1"},
    {id: 2,course: "course2"},
    {id: 3,course: "course3"}
];
app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.get("/api/courses",(req,res)=>{
    res.send(courses);
});

app.get( '/api/courses/:id',( req, res)=> {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('this course not found');
    res.send(course);
});    

app.post('/api/courses',(req,res)=>{

    const schema =Joi.object({
        name: Joi.string().min(3).required()
    });
    const result = schema.validate(req.body);
    console.log(result);
    if(result.error){
        res.status(400).send(result.error);
        return;
    }
    const course = {
        id: courses.length +1,
        name:req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id',(req,res)=>{
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('this course not found');

    const result = validatecourse(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    course.name=req.body.name;
    res.send(course);
    
});

const port = process.env.PORT||3001
app.listen(port,() => console.log("listening"));



function validatecourse(course){
    const schema={
        name:Joi.string().min(3).required()
    };
    return Joi.validate(course,schema);
}