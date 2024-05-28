<link rel="stylesheet" href="css/markdown.css">

# How to Write To and Read From a JSON file Using Express.js

## Introduction

If you're a front-end developer who needs to store and then retrieve information that didn't come from a form, this article is for you. Since  you're here, I'm going to assume you've decided you want to save your information to a file rather than Local Storage, and that you've already chosen Node.js 
as your backend. 

I'm also going to assume that you're comfortable with Javascript, have a basic knowledge of <a href="https://www.w3schools.com/js/js_json_intro.asp">JSON</a>, and have already installed Node.js. 

This artice  will walk you through the process of posting information to a JSON file and then retrieving it. It's not comprehensive &mdash; there are any number of ways
to read and write to a file &mdash; but it will get the job done, get you familiar with the process, and provide a jumping off point if you decide you'd like
to learn more about backend development.  

This article will show you how to:

* <a href="#set-up-the-project">Set-up Your Project</a>
* <a href="#install-express">Install Express</a>
* <a href="#set-up-a-server-in-express">Create an Express Server</a>
* <a href="#post-to-a-json-file">Post to your JSON File</a>
* <a href="#read-from-your-json-file">Read from your JSON File</a>

<p class = "note"><b>NOTE:</b> A word about the Express framework, if you're not familiar with it. First, it's the most popular framework for Node.js, which means that it's well-supported, and that there's a lot of information about how to use it out on the internet.  Most important, it's painless to install and greatly simplifies your life by doing a lot of the development set-up tasks for you.</p>


## <a id="set-up-the-project"></a>Set-up the Project 

1. Create a directory to contain your project. I named mine *'ExpressProject'*. 
2. Within that directory, create a folder named *'public'.*  
3. At your terminal command prompt, navigate to your Express project.
4. In your project directory, create a file called *server.js*
5. In your *'public'* directory, create an *index.html* file. 


## <a id="install-express"></a>Install Express

<p class="note"><b>NOTE:</b> If you have already installed Express, you can skip to the next step, <a href="#set-up-a-server-in-express">Set Up a Server in Express</a></p>

Use the *npm init* command to create a package.json file for your application. 
In the terminal, type:

```text
npm init
```

The installation will prompt you through your setup. For this project, go ahead and press Enter to accept the defaults &mdash; **except for one prompt**:

```text
 entry point: (index.js)
```

At this prompt, change ***index.js*** to ***server.js*** This will be the name of your main file, 
and is the name I will be using throughout this article. 

<p class = "note"><b>NOTE:</b> If you forget or accidentally miss this step, you can change the name in the <i>package.json</i> file, found in the main directory of your project. For more information about *package.json* go to <a href = "https://docs.npmjs.com/cli/v10/configuring-npm/package-json">package.json </a>
in the npm docs.</p>

Now, install the Express framework: 

```text
npm install express
```

That's it. Step one accomplished.

## <a id="set-up-a-server-in-express"></a>Set Up a Server in Express</a>

One of the great advantages of Node.js as a back-end language is that it comes with it's own server, and one of the lovely things about 
Express is that it makes it very easy to set up that server. 

Open your *server.js* file and paste the following code into it:

```javascript

const express = require('express')      //creates the Express application
const app = express()
const port = 3000                       //The port that index.html runs on.
                                        //See note below.


app.get('/', (req, res) => {            // Defines a route for handling client communication.
  res.send(index.html)
})

app.listen(port, () => {                //Starts the server and listens on port 3000 for connections.
  console.log(`Server listening on port ${port}`)
})
```

<p class = "note"><b>NOTE:</b> There's nothing particularly magic about the number 3000. It's often chosen because it allows you to experiment with Express on your local machine
without elevated privilege/root access. Ports 8000 and 8080 are also often used. Ports 80 and 443 are the default HTTP and HTTPS ports but they require elevated privilege in most environments, as do most ports below 1024.</p>

## <a id="post-to-a-json-file"></a>Post to a JSON File

So now we've reached the good stuff. Let's start with the HTML.

### HTML

Open your *index.html* file and paste the following code into it. 

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>ExpressProject</title>
  </head>
  <body>

    <h1>Reading and Writing to a JSON file</h1>
    
    <button id="btnPost">Post</button> <button id="btnGet">Get</button>
    <p id = "output"></p>
  
  <body>
  <html>
```

Not a lot of explanation needed here. You've created an HTML file with a heading, two buttons, and an output paragraph. 

Let's carry on.

### Client-side Javascript

Add a script section to *index.html*, and paste the followinging code into it. It should look like so:

```javascript
<script>
  
    document.getElementById("btnPost").addEventListener("click", postToJSON); 
    document.getElementById("btnGet").addEventListener("click", getFromFile); 


    function postToJSON(){
    
      //Variables containing data in different formats.
      var numbers = ["1942", "1984", "1995"];
      var singers = [{"name":"Paul McCartney","age": "81", "birthplace": "Liverpool"},{"name":"Taylor Swift ","age":"34","birthplace":"West Reading, PA"}];
      var greeting = "Are we having fun yet?";
      var foods = {"food" : "chocolate", "taste":"very very good", "necessary": "true"};
    
      //Variable containing the info that will be posted
      var data = {numbers:numbers, singers:singers, greeting:greeting, foods:foods} 
      
      /*To post to a file, you need the POST method,
        headers that define the type of content, in this
        case JSON, and the body, which defines the data 
         you want to send to your JSON file.*/ 
      fetch('/amendJsonFile', {                 //the url your sending your data to.
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
    },
          body: JSON.stringify(data)
    
      })
     
      .then(response => response.json())          //Receives a response
        if (!response.ok) {
        throw new Error('something went wrong');  
    }
      .then(data => alert(JSON.stringify(data)))  //processes the message returned. 
      .catch(error => console.log(error));        //catches errors
    }

    function getFromFile(){
      
    }
  
  </script>
  ```
In this code you've created two event listeners for the buttons, and a function.

In the function, you've defined four variables: an array, an array of objects, a string, and an object. I'm going to post all four of them to our JSON file, which
hasn't been created yet.  (We'll get to that.)

Data is posted to and retrieved from a JSON file in key-value pairs, so you've defined a variable, `data`, that contains the key value pairs you will be posting. For simplicity,
and ease of retrieval, our key names match the names of the variables that hold the values. 

<p class = "note"><b>NOTE:</b> For demonstration purposes all four variables are posted, but this is arbitrary. You could just have easily sent one, or many more.</p>

You're using the fetch API to send your request. The fetch API is straightforward and more or less replaces XMLHttpRequest. You give it the url you'll be sending your data to, (in this case *amendJsonFile*) define the type of content you're sending, define the data you're sending, process the response, and catch any errors. If you'd rather not receive a response, you can remove these lines of code:

```javascript
then(response => response.json())          
      .then(data => alert(JSON.stringify(data)))
```
Note that the data has been stringified (`JSON.stringify(data)`) in order to pack it into an http request sent to the server.

<p class = "note"><b>NOTE:</b> <a href="https://www.freecodecamp.org/news/how-to-fetch-data-from-an-api-using-the-fetch-api-in-javascript/#:~:text=The%20Fetch%20API%20is%20a,and%20fetch%20data%20from%20servers.">This article</a> by freeCodeCamp is an excellent resource for learning how to use fetch.</p>

And now for the server side of things.
### <a id="server-side-javascript"></a>Server-side Javascript. 

In order to post and then write to a file, you will add a couple of lines of code to your server file, *server.js*.

```javascript
var fs = require('fs');
 app.use(express.json());
```

`var fs = require('fs');` allows us to read and write to a file.

`app.use(express.json());` parses the JSON info coming in. 

Open your server file and paste those lines into it. Your file should look like this:

```javascript
const express = require('express');
 const app = express();
 var fs = require('fs');
 const port = 3000;
 
 //Parses the JSON info coming in.
 app.use(express.json()); 

 // Serving static files (HTML, CSS, JS)
 app.use(express.static('public'))
   
 // Defines a route for handling client communication
 app.get("/", function (res) { 
    res.sendFile("index.html"); 
 }); 

 // Starting the server
 app.listen(port, () => {
     console.log(`Server is listening at http://localhost:${port}`);
 });
```
 
Now you will add the POST request method that writes your data to a JSON file. Paste the following code into your *server.js* file.

```javascript
app.post("/amendJsonFile", function(req, res){

  var newStr = req.body;
  var key = Object.keys(newStr);
  var obj;
  var file = "public/myJson.json";     

  //Check if file exists. If it does, read file.
  if (fs.existsSync(file)) {
    console.log('file exists');
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) throw err;

      //if the JSON file is empty, use newStr for data
      if (data == []){
        data = JSON.stringify(newStr);
      }   

      /* On the client side, you had to stringify the data in order to send it. To work with it, you
      must  parse it back into JSON format again.*/
      obj = JSON.parse(data);

    //Update each record 
    for (var i = 0; i < key.length; i++){
      obj[key[i]] = newStr[key[i]];
    }     

    //Then write it to file.
    fs.writeFile("file", JSON.stringify(obj, null, 2), function(err) {
        if (err) throw err;
    });
  });

  //If it's a new file, create and write newStr to it.
  } else {
    console.log('file not found');

    fs.writeFile("file", JSON.stringify(newStr, null, 2), function(err) {
      if (err) throw err;
    });
  }

  res.json(`Data posted to file`); 

});
```

Your file should look like this:

```javascript
const express = require('express');
const app = express();
var fs = require('fs');
const port = 3000;
 
//Parses the JSON info coming in.
app.use(express.json()); 

// Serving static files (HTML, CSS, JS)
app.use(express.static('public'))
   
// Defines a route for handling client communication
app.get("/", function (res) { 
    res.sendFile("index.html"); 
}); 

app.post("/amendJsonFile", function(req, res){

  var newStr = req.body;
  var key = Object.keys(newStr);
  var obj;
  var file = "public/myJson.json";     

  //Check if file exists. If it does, read file.
  if (fs.existsSync(file)) {
    console.log('file exists');
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) throw err;

      //if the JSON file is empty, use newStr for data
      if (data == []){
        data = JSON.stringify(newStr);
      }   

      /* On the client side, you had to stringify the data in order to send it. To work with it, you
      must  parse it back into JSON format again.*/
      obj = JSON.parse(data);

    //Update each record 
    for (var i = 0; i < key.length; i++){
      obj[key[i]] = newStr[key[i]];
    }     

    //Then write it to file.
    fs.writeFile("file", JSON.stringify(obj, null, 2), function(err) {
        if (err) throw err;
    });
  });

  //If it's a new file, create and write newStr to it.
  } else {
    console.log('file not found');

    fs.writeFile("file", JSON.stringify(newStr, null, 2), function(err) {
      if (err) throw err;
    });
  }

  res.json(`Data posted to file`); 

});

// Starting the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
```

This code contains four variables. The first, `newStr`, pulls in the data sent by the client.

The second variable, `key`, then pulls just the keys from that data.

`obj` is left empty because its value changes based on the result of different if statements.

 `file` is the JSON file you will be writing to. 

I've documented the code so you can see each step in context. Essentially, the method reads, updates, and writes to the JSON file. But if that file doesn't exist, an error is thrown when it tries to read the file. So, first you check to see if the file exists. 

if the file doesn't exist, then `newString` is written to the JSON file. 

It the file does exist, it's opened and and its contents read into the `obj` variable. 

On the client side, you had to stringify the data. In order to work with it, you need to parse it back into JSON format again. Then, using a for loop, 
each record from `newstring` is individually pushed into `obj`. If the record doesn't yet exist, it is added. If the record exists, it is updated with the value from `newStr`. 
This is the code that allows you to update individual records in your file. Without it, you would have to send all your data, every time. 

Finally, the data in `obj` is stringified again and written to the file. 

This function covers all bases. It allows you to create the file, add more records, or update the records you've already written. You can add or amend one or multiple records. 

Now let's see it in action. 

### Pulling It All Together

To start your server, enter the following code into your terminal:

```text
node server.js
```

Then go to your browser and enter:

```text
http://localhost:3000/
```

You should see a web page that looks like this:

![Web Page](images/webpage.png)

Click the **Post** button. You should get an alert that says "Data Posted to File."

Finally, you should find a *myJson.json* file in the *public* folder of your project. Open it, and you should see something like this:

![JSON File](images/jsonfile.png)

Congratulations! You've successfully written to a JSON file.

## <a id="read-from-your-json-file"></a>Read From Your JSON File

Now that you've set up your server and created a JSON file, getting information from that file is pretty straightforward. 

Paste the following code into the script section of your HTML file.

```javascript
function getFromFile(){
      
      const info = "singers"             //Defines the key of the object being retrieved.
      const file = "myJson.json"       //Defines the file being retrieved from.
      
      fetch(file)

      .then(response => response.json())   //Receives a response
      .then(data => {                      
              
        const obj = data[info];            //Parses the response
        
        //Prints the response to the browser.
        document.getElementById("output").innerHTML = JSON.stringify(obj);
        
      });
```

In this function, you define the record you want to retrieve, and the file you want to retrieve it from. In our case, we're retrieving the object array, *singers* from the JSON file, *myJson.json*.  The file is fetched, and then the record stored as "singers" is extracted. 

If instead of a single record, you wanted to extract the entire file, instead of `const obj = data[info], the code would be `const obj = data`. 

Once extracted, the data
is yours to manipulate. 

For the purposes of this article, the variable `obj` is stringified so it can be printed to the web page. This is only necessary if you want to use it as a string. 

Now, start the server if it's not already running. 

```text
node server.js
```

Go to your browser as before: 

```text
http://localhost:3000/
```

Click the **Get** button. Your page should look like this:

![Output of the JSON file](images/getOutput.png)

Congratulations! You've successfully read from a JSON file.

## Summary

In this article you've learned how to send data to the server from the client side, how to extract that data and write to a file on the server side, and
how to retrieve that data from the file you created. Again, this is only one way to do it. What I've tried to do is show both sides of the 
equation, the client-side and the server side, with enough explanation so that you understand how it works, and with a couple of resources thrown in if you'd like
a deeper understanding of the steps involved.

Happy Coding.

