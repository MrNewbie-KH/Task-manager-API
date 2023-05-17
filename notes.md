# Task manager API

- simply we gonna learn how to make simple crud operation in node
- how to use cloud database
- how to use postman as an api testing tool
- we are building REST api and we can see this from our structure -> Rest is just a pattern we gonna stick to
- mongose is an object data modeling library
- the file goes at this way ->
  - we have app
  - controllers are the functions
  - model have the schema we gonna use
    so when we want to use the model we will use it in the tasks where we CRUD operations
- it's a must to have validation in our project

---

---

# Questions Important to me

1. why we need .gitignore?
   it is a file used to prevent adding some files to git such as node_modules
2. why we need .env file?
   we need env to keep our secrets safe so we need dotenv package to keep our secrets
3. in the url i make we need versioning as /v1/blablabla
   this is in-order to be able to track versions of project and if new app appears so tha last one remains working the same way
4. is PATCH better than PUT ?
5. why we use MVC ?
   we use different routes and different controllers so to keep project easily maintainable and to be able to understand it we must use MVC architecture as beginning
6. why we need middleware? how?
   it handles the project in a handy way
7. where to implement validation of inputs ?
   absolutely in the model schema
8. we gonna work with methods provided by the mongoose such as
   - create()
   - find() which will return all the values
   - findOne({id:"the object id"})
   - findOneAndUpdate({id:"the object id"})
   - findOneAndDelete()
9. why do we need asyncwrapper?

   - to stop redundancy in the project
   - enhance the try catch blocks by adding them inside the wrapper
     so instead of this code

   ```js
   const getAllTasks = async function (req, res) {
     try {
       const tasks = await TASK.find({});
       res.status(200).json({ tasks });
     } catch (error) {
       res.status(500).json({ msg: error });
     }
   };
   ```

   we gonna use this instead
   first in async.js i'm gonna use asyncwrapper function

   ```js
   consr asyncwrapper=(callback)=>{
      return async (req,res,next)=>{
         try{
            await callback(req,res,next);
         }
         catch(error){
            next(error)
         }
      }
   }
   ```

   ad in the controller :

   ```js
   const getAllTasks = asyncwrapper(async (req, res) => {
     const tasks = await TASK.find({});
     res.status(200).json({ tasks });
   });
   ```

10. what is the differencs between ?

```js
res.status(200).json({ taskWanted });
res.status(200).json(taskWanted);
```

The difference between res.status(200).json({ taskWanted }) and res.status(200).json(taskWanted) lies in **the structure of the response payload.**

In the first case, res.status(200).json({ taskWanted }), you are **wrapping the taskWanted object inside another object**. The response payload will be an object with a single key-value pair, where the key is taskWanted and the value is the actual taskWanted object.
In the second case, res.status(200).json(taskWanted), you are **directly sending the taskWanted object as the response payload.** The response payload will be the taskWanted object itself without any additional wrapping.

---

---

### Notes while working

- to build simple CRUD operation application we gonna use those routes
  getTask, getAllTasks, update, delete, create

  - 2 get request
  - 1 update
  - 1 delete
  - 1 patch

- building DB folder in order to handle database stuff
  - we can easily use native mongoDB driver but we gonna use mongose
- in MVC we are using controllers and controllers are just the functions we use in our application
- we use middleware of express.json to be able to use json in the messages
- i was using mongoose.connect().then.catch but this was refactored to async await way
- we are calling start function at the app right? then we gonna require dotenv at app.js too
- we gonna use schema in order to be able to have db structure each record has name, id, completed or not no array of color or number of fingers
- when i was handlimg the getOneTask method iused two different error messages one indicating server error and the other one indicating no task with the given id
- patch is for partial update
- async wrapper function to stop redundancy
- in the app.js we use :

```js
app.use('api/v1/tasks')
-> that means it is the root
but in routes.js
router.get('/',getAllTasks)
-> that means use the root + / to get alltasks
router.get('/:id',getTask)
-> that means use the root + /some dynamic id will be passed  to get the wanted task
---
process.env.MONGO_URI

```

- we gonna use post man to test and handle all our routes
- url we go to is just an end-point

---

---

### notes on things didn't work and then it worked properly

1.  i was writing in router file this code

```js
router.route("/", getAllPeople);
```

- but absolutely it is big WRONG ❌
  the reason why it was wrong because we have twodifferent ways of using route wu mustn't mix between them

```js
router.route("/").get(getAllTasks).get(getOneTask) ||
  router.get("/", getAllTasks);
```

2. when i was building newTask i found out that i'm trying to remember but i really don't understand why this was happening
   so i did that
   - in the controllers i required the model schema named it task
   - then when i tried to create task i made createTask async function and called task.create(req.body) with await
   - and res.status(201).json(theNewCreatedTask) -> so you can look for it in the postman
   ```js
   const task = requitre("../model/model.js");
   const createTask = async (req, res) => {
     const newTaskCreated = await task.create(req.body);
     res.status(201).json({ newTaskCreated });
   };
   ```
3. the returning of

```js
const taskWanted = await TASK.findOne({ _id: TASKID });
```

is the whole jsonof this task

---

---

### npm installs

1. nodemon
2. express
3. mongoose
4. dotenv
