<?php 
   if(isset($_POST)){
      $data = file_get_contents("php://input");
      $user = json_decode($data, true);
      
      // do whatever we want with the users array.
   }
