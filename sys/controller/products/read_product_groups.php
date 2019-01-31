<?php 

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/dao/Products_dao.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/Product.php');

//$product = new Product();
$productsDao = new Products_dao();

echo json_encode($productsDao->readGroups());

?>