<?php 

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/dao/Services_dao.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/Service.php');

$service = new Service();
$servicesDao = new Services_dao();

$service->setServ_id($_POST['serv_id']);
$service->setServ_name($_POST['serv_name']);
$service->setServ_desc($_POST['serv_desc']);
$service->setServ_ts($_POST['serv_ts']);
$service->setServ_ts_price($_POST['serv_ts_price']);
$service->setServ_price($_POST['serv_price']);

echo $servicesDao->updateService($service);

?>