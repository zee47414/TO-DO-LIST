const express = require('express');
const port = 8080;

const db = require('./config/mongoose');
const Todo = require('./models/todo')
const app = express();

// setting up the view engine/ template engine
app.set('view engine','ejs');
app.set('views','./views');


// middlewares
app.use(express.urlencoded());
app.use(express.static('./assets'));


// to get response from the server

app.get('/',(req,res)=>{
    // to fetch the data from db
    Todo.find({},(err,todolst)=>{
        if(err){
            console.log(`error:${err} while fetching the data`);
            return;
        }
        return res.render('home',{
            title:"to do list",
            todolist : todolst
        });
    });
  
});

// to post on server
app.post('/add-task',(req,res)=>{
//     console.log(req.body);
//    todo_list.push(req.body);
   
Todo.create({
    description : req.body.description,
    category:req.body.category,
    date : req.body.date
},function(err,newTodo){
    if(err){
        console.log("error in creating todo list");
    }
    console.log("********",newTodo);
    return res.redirect('/');
});
    // by this above code we only creating the database and popul;ating the database 
    //  we need to fetch data from database 
});

// to delete the task 
app.get('/delete-task/',(req,res)=>{
    console.log(req.query);
    // get the id from query and params
    let id = req.query.id;
    // find the task in the db using id and delete
   Todo.findByIdAndDelete(id,(err)=>{
    if(err){
        console.log(`error:${err} while deleting the task`);
        return;
    }
    return res.redirect('back');
   });
});

// listenning to the server on port :8080
app.listen(port,(err)=>{
    if(err){
        console.log(`Error:${err} while running the server `);
    }
    console.log(`Server is up running smoothly on port:${port}`);
});


