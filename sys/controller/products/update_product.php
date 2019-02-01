<?php 

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/dao/Products_dao.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/Product.php');

$product = new Product();
$productsDao = new Products_dao();

$product->setProd_id($_POST['prod_id']);
$product->setProd_name($_POST['prod_name']);
$product->setProd_group($_POST['prod_group']);
$product->setProd_desc($_POST['prod_desc']);
$product->setProd_brand($_POST['prod_brand']);
$product->setProd_cost($_POST['prod_cost']);
$product->setProd_markup($_POST['prod_markup']);
$product->setProd_price($_POST['prod_price']);
$product->setProd_unit($_POST['prod_unit']);

echo $productsDao->updateProduct($product);

?>