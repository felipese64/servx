<?php 

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/dao/Services_dao.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/Service.php');

$serv_id = $_POST['serv_id'];
$service = new Service();
$servicesDao = new Services_dao();

$service->setServ_id($serv_id);
$service = $servicesDao->readService($service);

$serv_array['serv_id'] = $service->getServ_id();
$serv_array['serv_name'] = $service->getServ_name();
$serv_array['serv_desc'] = $service->getServ_desc();
$serv_array['serv_ts'] = $service->getServ_ts();
$serv_array['serv_ts_price'] = number_format($service->getServ_ts_price(), 2, ',', '.');
$serv_array['serv_price'] = number_format($service->getServ_price(), 2, ',', '.');

echo json_encode($serv_array);

// return $serv_array;
//echo json_encode($servicesDao->readService($service));
 