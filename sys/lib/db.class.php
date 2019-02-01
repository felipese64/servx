<?php

class db
{

    private $host = 'localhost';
    private $user = 'root';
    private $pass = '';
    private $db = 'servx';

    public function mysql_connect()
    {

        $con = mysqli_connect($this->host, $this->user, $this->pass, $this->db);
        mysqli_set_charset($con, 'utf8');

        if (mysqli_connect_errno()) {
            echo 'Erro ao tentar se conectar com o banco de dados: ' . mysqli_connect_error();
        }

        return $con;
    }
}
?>