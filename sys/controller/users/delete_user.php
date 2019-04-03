<?php 

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/dao/Users_dao.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/User.php');

$user_id = $_POST['user_id'];
$user = new User();
$usersDao = new Users_dao();
$user->setUser_id($user_id);
$usersDao->deleteUser($user);
 