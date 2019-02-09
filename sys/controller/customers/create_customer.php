<?php 

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/dao/Customers_dao.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/Customer.php');

$customer = new Customer();
$customersDao = new Customers_dao();

$customer->setCustomer_name($_POST['customer_name']);
$customer->setCustomer_trade_name($_POST['customer_trade_name']);
$customer->setCustomer_email($_POST['customer_email']);
$customer->setCustomer_cpf($_POST['customer_cpf']);
$customer->setCustomer_natural_legal($_POST['customer_natural_legal']);
$customer->setCustomer_rg($_POST['customer_rg']);
$customer->setCustomer_telephone($_POST['customer_telephone']);
$customer->setCustomer_cellphone($_POST['customer_cellphone']);
$customer->setCustomer_registry_date($_POST['registry_date']);
$customer->setCustomer_obs($_POST['customer_obs']);
$customer->setCustomer_address_type($_POST['customer_address_type']);
$customer->setCustomer_address($_POST['customer_address']);
$customer->setCustomer_address_complements($_POST['customer_address_complements']);
$customer->setCustomer_zone($_POST['customer_zone']);
$customer->setCustomer_state($_POST['customer_state']);
$customer->setCustomer_city($_POST['customer_city']);
$customer->setCustomer_cep($_POST['customer_cep']);

$customersDao->createCustomer($customer);

?>