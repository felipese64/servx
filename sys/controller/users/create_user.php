<?php 

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/dao/Users_dao.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/User.php');

$user = new User();
$usersDao = new Users_dao();

$user->setUser_login($_POST['user_login']);
$user->setUser_password($_POST['user_password']);
$user->setUser_profile($_POST['user_profile']);
$usersDao->createUser($user);
 