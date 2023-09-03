<?php
require_once 'function/function_db.php';
$query = "SELECT * FROM `user`";
$result =  select($query);
foreach ($result as $res){
    require 'box.php';
}