<?php 

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/dao/Products_dao.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/Product.php');

$prod_id = $_POST['prod_id'];
$product = new Product();
$productsDao = new Products_dao();

$product->setProd_id($prod_id);
$product = $productsDao->readProduct($product);

$prod_array['prod_id'] = $product->getProd_id();
$prod_array['prod_name'] = $product->getProd_name();
$prod_array['prod_desc'] = $product->getProd_desc();
$prod_array['prod_brand'] = $product->getProd_brand();
$prod_array['prod_group'] = $product->getProd_group();
$prod_array['prod_cost'] = number_format($product->getProd_cost(), 2, ',', '.');
$prod_array['prod_markup'] = $product->getProd_markup();
$prod_array['prod_price'] = number_format($product->getProd_price(), 2, ',', '.');
$prod_array['prod_unit'] = $product->getProd_unit();


echo json_encode($prod_array);
 