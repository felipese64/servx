<?php 

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/dao/Customers_dao.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/Customer.php');

$customersDao = new Customers_dao();

echo json_encode($customersDao->readAdresses());

?>