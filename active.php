<?php
require_once 'function/function_db.php';
//$selectedAction = $_POST['selectedAction'];
//
//$query = "SELECT * FROM `user` WHERE `status` = 'true'";
//$result =  select($query);
//foreach ($result as $res){
//    require 'box.php';
//}
$selectedIds = $_POST['selectedIds'];

for($i = 0; $i < count($selectedIds); $i++){
    $query = "UPDATE `user` SET `status` = 'true' WHERE `user`.`id` = $selectedIds[$i]";
    execQuery($query);
}
