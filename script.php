<?php 
   if(isset($_POST)){
      $data = file_get_contents("php://input");
      $user = json_decode($data, true);
      
      // do whatever we want with the users array.


      $json = json_encode($user);
 
echo "$json";
 
// Generate json file
file_put_contents("testJson.json", json);
}
 ?>
   
