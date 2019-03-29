<?php 

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/dao/Products_dao.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/Product.php');

$symbols_to_replace = [".", ","];
$replace_null   = ["","."];

$product = new Product();
$productsDao = new Products_dao();

$product->setProd_name((mb_strtoupper ($_POST['prod_name'], 'UTF-8')));
$product->setProd_group((mb_strtoupper ($_POST['prod_group'], 'UTF-8')));
$product->setProd_desc((mb_strtoupper ($_POST['prod_desc'], 'UTF-8')));
$product->setProd_brand((mb_strtoupper ($_POST['prod_brand'], 'UTF-8')));
$product->setProd_cost(str_replace($symbols_to_replace, $replace_null, $_POST['prod_cost']));
$product->setProd_markup($_POST['prod_markup']);
$product->setProd_price(str_replace($symbols_to_replace, $replace_null, $_POST['prod_price']));
$product->setProd_unit($_POST['prod_unit']);
echo $productsDao->createProduct($product);
 