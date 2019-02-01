<?php 

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/dao/Products_dao.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/Product.php');

$prod_id = $_POST['prod_id'];
$product = new Product();
$productsDao = new Products_dao();
$product->setProd_id($prod_id);
$productsDao->deleteProduct($product);

?>