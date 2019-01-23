<?php 

require_once('../lib/db.class.php');
require_once('../dao/Products_dao.php');
require_once('../model/Product.php');

//$product = new Product();
$productsDao = new Products_dao();

echo json_encode($productsDao->readBrands());

?>