<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/dao/Users_dao.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/User.php');

$user_id = $_POST['user_id'];

$password_confirmation = $_POST['user_password'];

$user = new User();
$usersDao = new Users_dao();

$user->setUser_id($user_id);
$user = $usersDao->readUser($user);

$user_original_password = $user->getUser_password();

if (password_verify($password_confirmation, $user_original_password)) {
    echo true;
} else {
    echo false;
}