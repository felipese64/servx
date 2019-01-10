<?php 

require_once('../lib/db.class.php');
require_once('../dao/Products_dao.php');
require_once('../model/Product.php');


$id_prod = $_POST['id_prod1'];



$product = new Product();
$productsDao = new Products_dao();

$product->setId_prod($id_prod);
//$productsDao->readProduct($product);
echo json_encode($productsDao->readProduct($product));




//echo ($product->getNome_prod());





//echo "$nome_prod";
//echo json_encode($linha);

//retornar em json









?>