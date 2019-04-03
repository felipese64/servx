<?php 

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/dao/Users_dao.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/User.php');

$user_id = $_POST['user_id'];
$user = new User();
$usersDao = new Users_dao();

$user->setUser_id($user_id);
$user = $usersDao->readUser($user);

$user_array['user_id'] = $user->getUser_id();
$user_array['user_login'] = $user->getUser_login();
$user_array['user_password'] = $user->getUser_password();
$user_array['user_profile'] = $user->getUser_profile();

echo json_encode($user_array);

 