<?php
require_once 'function/function_db.php';
$selectedAction = $_POST['selectedAction'];

$query = "SELECT * FROM `user` WHERE `status` = 'false'";
$result =  select($query);
foreach ($result as $res){
    require 'box.php';
}