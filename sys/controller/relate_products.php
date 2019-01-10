<?php 

require_once('../lib/db.class.php');
require_once('../dao/Products_dao.php');
require_once('../model/Product.php');


//$id_prod_db = $_POST['id_prod'];


$id_prod_db = json_decode($_POST['id_prod']);



$db_product = new Product();
$productsDao = new Products_dao();
$db_product->setId_prod($id_prod_db);
$productsDao->readProduct($db_product);


$form_product = new Product();
$form_productDao = new Products_dao();

$form_product->setId_prod($_POST['id_prod']);
$form_product->setNome_prod($_POST['nome_prod']);
$form_product->setGrupo_prod($_POST['grupo_prod']);
$form_product->setDesc_prod($_POST['desc_prod']);
$form_product->setMarca_prod($_POST['marca_prod']);
$form_product->setCusto_prod($_POST['custo_prod']);
$form_product->setMargem_prod($_POST['margem_prod']);
$form_product->setPreco_prod($_POST['preco_prod']);
$form_product->setUnidade_prod($_POST['unidade_prod']);


if ($form_product == $db_product) {
    $related = "true";
} else {
    $related = "true";
}

echo $related;



?>