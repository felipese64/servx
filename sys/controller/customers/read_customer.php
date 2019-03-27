<?php 

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/dao/Customers_dao.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/Customer.php');

$customer_id = $_POST['customer_id'];
$customer = new Customer();
$customersDao = new Customers_dao();

$customer->setCustomer_id($customer_id);
$customer = $customersDao->readCustomer($customer);

$customer_array['customer_id'] = $customer->getCustomer_id();
$customer_array['customer_name'] = $customer->getCustomer_name();
$customer_array['customer_trade_name'] = $customer->getCustomer_trade_name();
$customer_array['customer_email'] = $customer->getCustomer_email();
$customer_array['customer_cpf'] = mask($customer->getCustomer_cpf(), "###.###.###-##");
$customer_array['customer_natural_legal'] = $customer->getCustomer_natural_legal();
if($customer->getCustomer_natural_legal() != 'PESSOA FÍSICA'){
    $customer_array['customer_cpf'] = mask($customer->getCustomer_cpf(), "##.###.###/####-##");
}
$customer_array['customer_rg'] = mask($customer->getCustomer_rg(), "##.###.###-#");
$customer_array['customer_telephone'] = mask($customer->getCustomer_telephone(), "(##) ####-####");
$customer_array['customer_cellphone'] = mask($customer->getCustomer_cellphone(), "(##) #####-####");
$customer_registry_date = strtotime($customer->getCustomer_registry_date());
$customer_array['customer_registry_date'] = date('d-m-Y', $customer_registry_date);
$customer_array['customer_obs'] = $customer->getCustomer_obs();
$customer_array['customer_address_type'] = $customer->getCustomer_address_type();
$customer_array['customer_address'] = $customer->getCustomer_address();
$customer_array['customer_address_number'] = $customer->getCustomer_address_number();
$customer_array['customer_address_complements'] = $customer->getCustomer_address_complements();
$customer_array['customer_zone'] = $customer->getCustomer_zone();
$customer_array['customer_state'] = $customer->getCustomer_state();
$customer_array['customer_city'] = $customer->getCustomer_city();
$customer_array['customer_cep'] = mask($customer->getCustomer_cep(), "#####-###");

echo json_encode($customer_array);
 