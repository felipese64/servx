<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/Technician.php');
class Technicians_dao
{

    public function createTechnician(Technician $technician)
    {

        $objDb = new db();
        $link = $objDb->mysql_connect();
        $technician_name = $technician->getTechnician_name();
        $sql = "INSERT INTO `servx`.`tbtechnicians` (`technician_name`) VALUES ('$technician_name')";
        $rs = mysqli_query($link, $sql);
        echo (mysqli_error($link));
    }

    public function readTechnician(Technician $technician)
    {

        $objDb = new db();
        $link = $objDb->mysql_connect();

        $technician_id = $technician->getTechnician_id();
        $sql = "SELECT * FROM tbtechnicians where technician_id = $technician_id";
        $rs = mysqli_query($link, $sql);
        $reg = mysqli_fetch_array($rs, MYSQLI_ASSOC);

        $technician->setTechnician_name($reg['technician_name']);
        $technician->setTechnician_registry_date($reg['technician_registry_date']);

        return $technician;
    }

    public function updateTechnician(Technician $technician)
    {
        $objDb = new db();
        $link = $objDb->mysql_connect();

        $technician_id = $technician->getTechnician_id();
        $technician_name = $technician->getTechnician_name();
        $technician_registry_date = $technician->getTechnician_registry_date();

        $sql = "UPDATE `servx`.`tbtechnicians` SET `technician_name`= '$technician_name', `technician_registry_date`= '$technician_registry_date' WHERE `technician_id`='$technician_id'";
        $rs = mysqli_query($link, $sql);
        echo (mysqli_error($link));
    }


    public function deleteTechnician(Technician $technician)
    {
        $objDb = new db();
        $link = $objDb->mysql_connect();

        $technician_id = $technician->getTechnician_id();
        $sql = "DELETE FROM `servx`.`tbtechnicians` WHERE `technician_id`='$technician_id'";
        $rs = mysqli_query($link, $sql);
    }
};