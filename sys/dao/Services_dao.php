<?php 
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/Service.php');
class Services_dao
{

    public function createService(Service $service)
    {

        $objDb = new db();
        $link = $objDb->mysql_connect();

        $serv_name = $service->getServ_name();
        $serv_desc = $service->getServ_desc();
        $serv_ts = $service->getServ_ts();
        $serv_ts_price = $service->getServ_ts_price();
        $serv_price = $service->getServ_price();


        $sql = "INSERT INTO `servx`.`tbservices` (`serv_name`, `serv_desc`, `serv_ts`, `serv_ts_price`, `serv_price`) VALUES ('$serv_name', '$serv_desc', '$serv_ts', '$serv_ts_price', '$serv_price')";

        $rs = mysqli_query($link, $sql);
    }

    public function readService(Service $service)
    {

        $objDb = new db();
        $link = $objDb->mysql_connect();

        $serv_id = $service->getServ_id();
        $sql = "SELECT * FROM tbservices where serv_id = $serv_id";
        $rs = mysqli_query($link, $sql);
        $reg = mysqli_fetch_array($rs, MYSQLI_ASSOC);

        $service->setServ_name($reg['serv_name']);
        $service->setServ_desc($reg['serv_desc']);
        $service->setServ_ts($reg['serv_ts']);
        $service->setServ_ts_price($reg['serv_ts_price']);
        $service->setServ_price($reg['serv_price']);


        $serv_array['serv_id'] = $service->getServ_id();
        $serv_array['serv_name'] = $service->getServ_name();
        $serv_array['serv_desc'] = $service->getServ_desc();
        $serv_array['serv_ts'] = $service->getServ_ts();
        $serv_array['serv_ts_price'] = $service->getServ_ts_price();
        $serv_array['serv_price'] = $service->getServ_price();


        return $serv_array;
    }

    public function updateService(Service $service)
    {
        $objDb = new db();
        $link = $objDb->mysql_connect();

        $serv_id = $service->getServ_id();
        $serv_name = $service->getServ_name();
        $serv_desc = $service->getServ_desc();
        $serv_ts = $service->getServ_ts();
        $serv_ts_price = $service->getServ_ts_price();
        $serv_price = $service->getServ_price();


        $sql = "UPDATE `servx`.`tbservices` SET `serv_name`= '$serv_name', `serv_desc`= '$serv_desc', `serv_ts`= '$serv_ts', `serv_ts_price`='$serv_ts_price', `serv_price`='$serv_price' WHERE `serv_id`='$serv_id'";
        $rs = mysqli_query($link, $sql);
    }


    public function deleteService(Service $service)
    {
        $objDb = new db();
        $link = $objDb->mysql_connect();

        $serv_id = $service->getServ_id();
        $sql = "DELETE FROM `servx`.`tbservices` WHERE `serv_id`='$serv_id'";
        $rs = mysqli_query($link, $sql);
    }
};
?>