<?php 

require_once('../lib/db.class.php');
require_once('../dao/Products_dao.php');
require_once('../model/Product.php');


$product = new Product();
$productsDao = new Products_dao();


$product->setNome_prod($_POST['nome_prod']);
$product->setGrupo_prod($_POST['grupo_prod']);
$product->setDesc_prod($_POST['desc_prod']);
$product->setMarca_prod($_POST['marca_prod']);
$product->setCusto_prod($_POST['custo_prod']);
$product->setMargem_prod($_POST['margem_prod']);
$product->setPreco_prod($_POST['preco_prod']);
$product->setUnidade_prod($_POST['unidade_prod']);


echo $productsDao->createProduct($product);




?>