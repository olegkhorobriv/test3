<?php
require_once 'function/function_db.php';
$userId = $_POST['userId'];
$firstName = trim($_POST['firstName']);
$lastName = trim($_POST['lastName']);

$firstName = strip_tags($firstName);
$lastName = strip_tags($lastName);

$firstName = htmlspecialchars($firstName, ENT_QUOTES, 'UTF-8');
$lastName = htmlspecialchars($lastName, ENT_QUOTES, 'UTF-8');

$status = $_POST['status'];
$role = $_POST['role'];

if (filter_var($firstName, FILTER_SANITIZE_STRING) && filter_var($lastName, FILTER_SANITIZE_STRING)) {
    $query = "UPDATE `user` SET `name` = '$firstName', `surnames` = '$lastName', `status` = '$status', `role` = '$role' WHERE `user`.`id` = $userId";
    execQuery($query);
    $query = "SELECT * FROM `user`";
    $result =  select($query);
    foreach ($result as $res){
        require 'box.php';
    }
    execQuery($query);

}


