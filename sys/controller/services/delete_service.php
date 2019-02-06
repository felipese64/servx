<?php 

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/dao/Services_dao.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/Service.php');

$serv_id = $_POST['serv_id'];
$service = new Service();
$servicesDao = new Services_dao();
$service->setServ_id($serv_id);
$servicesDao->deleteService($service);

?>