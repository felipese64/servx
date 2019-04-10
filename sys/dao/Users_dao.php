<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/User.php');
class Users_dao
{

    public function createUser(User $user)
    {

        $objDb = new db();
        $link = $objDb->mysql_connect();

        $user_login = $user->getUser_login();
        $user_password = $user->getUser_password();
        $user_profile = $user->getUser_profile();


        $sql = "INSERT INTO `servx`.`tbusers` (`user_login`, `user_password`, `user_profile`) VALUES ('$user_login', '$user_password', '$user_profile')";

        $rs = mysqli_query($link, $sql);
        echo (mysqli_error($link));
    }

    public function readUser(User $user)
    {

        $objDb = new db();
        $link = $objDb->mysql_connect();

        $user_id = $user->getUser_id();
        $sql = "SELECT * FROM tbusers where user_id = $user_id";
        $rs = mysqli_query($link, $sql);
        $reg = mysqli_fetch_array($rs, MYSQLI_ASSOC);

        $user->setUser_login($reg['user_login']);
        $user->setUser_password($reg['user_password']);
        $user->setUser_profile($reg['user_profile']);

        return $user;
    }

    public function updateUser(User $user)
    {
        $objDb = new db();
        $link = $objDb->mysql_connect();

        $user_id = $user->getUser_id();
        $user_login = $user->getUser_login();
        $user_password = $user->getUser_password();
        $user_profile = $user->getUser_profile();

        $sql = "UPDATE `servx`.`tbusers` SET `user_login`= '$user_login', `user_password`= '$user_password', `user_profile`= '$user_profile' WHERE `user_id`='$user_id'";
        $rs = mysqli_query($link, $sql);
        echo (mysqli_error($link));
    }


    public function deleteUser(User $user)
    {
        $objDb = new db();
        $link = $objDb->mysql_connect();

        $user_id = $user->getUser_id();
        $sql = "DELETE FROM `servx`.`tbusers` WHERE `user_id`='$user_id'";
        $rs = mysqli_query($link, $sql);
    }
};