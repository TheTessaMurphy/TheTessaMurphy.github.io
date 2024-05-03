<!doctype html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>
<body>
<div id="card">Today is fri-5</div>

<script>
let user = {
   "username": "Mike",
   "password": "Mike567",
   "gender": "male",
   "email": "mike@mail.com"
}
 
jsonString = JSON.stringify(user);
let http = new XMLHttpRequest();
 
http.open('post', "script.php", true);
http.setRequestHeader("content-type", "application/x-www-form-urlencoded");
http.send(jsonString);  
</script>

  </body>

  </html>
