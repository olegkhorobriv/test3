<?php
require_once 'function/function_db.php';
$selectedIds = $_POST['selectedIds'];
for($i = 0; $i < count($selectedIds); $i++){
    $query = "DELETE FROM `user` WHERE `user`.`id` = $selectedIds[$i]";
    execQuery($query);
}