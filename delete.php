<?php
require_once 'function/function_db.php';

if(isset($_POST['userId'])) {
    $userId = $_POST['userId'];
    $query = "DELETE FROM `user` WHERE `user`.`id` = $userId";
    execQuery($query);
}