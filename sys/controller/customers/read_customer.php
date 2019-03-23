<?php 

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/dao/Customers_dao.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/Customer.php');

$customer_id = $_POST['customer_id'];
$customer = new Customer();
$customersDao = new Customers_dao();

$customer->setCustomer_id($customer_id);
echo json_encode($customersDao->readCustomer($customer));
 