<?php 

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/dao/Services_dao.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/Service.php');

$symbols_to_replace = [".", ","];
$replace_null   = ["", "."];

$service = new Service();
$servicesDao = new Services_dao();

$service->setServ_id($_POST['serv_id']);
$service->setServ_name((mb_strtoupper($_POST['serv_name'], 'UTF-8')));
$service->setServ_desc($_POST['serv_desc']);
$service->setServ_ts($_POST['serv_ts']);
$service->setServ_ts_price(str_replace($symbols_to_replace, $replace_null, $_POST['serv_ts_price']));
$service->setServ_price(str_replace($symbols_to_replace, $replace_null, $_POST['serv_price']));

echo $servicesDao->updateService($service);
 