<?php 

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/dao/Customers_dao.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/Customer.php');

$symbols_to_replace = ["(", ")", ".", "-", "/", " "];
$replace_null   = [""];

$customer = new Customer();
$customersDao = new Customers_dao();

$customer->setCustomer_name(mb_strtoupper ($_POST['customer_name'], 'UTF-8'));
$customer->setCustomer_trade_name(mb_strtoupper ($_POST['customer_trade_name'], 'UTF-8'));
$customer->setCustomer_email(mb_strtoupper ($_POST['customer_email'], 'UTF-8'));
$customer->setCustomer_cpf(str_replace($symbols_to_replace, $replace_null, $_POST['customer_cpf']));
$customer->setCustomer_natural_legal($_POST['customer_natural_legal']);
$customer->setCustomer_rg(str_replace($symbols_to_replace, $replace_null, $_POST['customer_rg']));
$customer->setCustomer_telephone(str_replace($symbols_to_replace, $replace_null, $_POST['customer_telephone']));
$customer->setCustomer_cellphone(str_replace($symbols_to_replace, $replace_null, $_POST['customer_cellphone']));
$customer->setCustomer_obs(mb_strtoupper ($_POST['customer_obs'], 'UTF-8'));
$customer->setCustomer_address_type($_POST['customer_address_type']);
$customer->setCustomer_address(mb_strtoupper ($_POST['customer_address'], 'UTF-8'));
$customer->setCustomer_address_number($_POST['customer_address_number']);
$customer->setCustomer_address_complements(mb_strtoupper ($_POST['customer_address_complements'], 'UTF-8'));
$customer->setCustomer_zone(mb_strtoupper ($_POST['customer_zone'], 'UTF-8'));
$customer->setCustomer_state($_POST['customer_state']);
$customer->setCustomer_city($_POST['customer_city']);
$customer->setCustomer_cep(str_replace($symbols_to_replace, $replace_null, $_POST['customer_cep']));


echo ($customersDao->createCustomer($customer));
 