<?php 
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/customer.php');
class Customers_dao
{

    public function createCustomer(Customer $customer)
    {

        $objDb = new db();
        $link = $objDb->mysql_connect();

        $customer_name = $customer->getCustomer_name();
        $customer_trade_name = $customer->getCustomer_trade_name();
        $customer_email = $customer->getCustomer_email();
        $customer_cpf = $customer->getCustomer_cpf();
        $customer_natural_legal = $customer->getCustomer_natural_legal();
        $customer_rg = $customer->getCustomer_rg();
        $customer_telephone = $customer->getCustomer_telephone();
        $customer_cellphone = $customer->getCustomer_cellphone();
        $customer_registry_date = $customer->getCustomer_registry_date();
        $customer_obs = $customer->getCustomer_obs();
        $customer_address_type = $customer->getCustomer_address_type();
        $customer_address = $customer->getCustomer_address();
        $customer_address_number = $customer->getCustomer_address_number();
        $customer_address_complements = $customer->getCustomer_address_complements();
        $customer_zone = $customer->getCustomer_zone();
        $customer_state = $customer->getCustomer_state();
        $customer_city = $customer->getCustomer_city();
        $customer_cep = $customer->getCustomer_cep();



        $sql = "INSERT INTO `servx`.`tbcustomers` (`customer_name`, `customer_trade_name`, `customer_email`, `customer_cpf`, `customer_natural_legal`, `customer_rg`, `customer_telephone`, `customer_cellphone`, `customer_registry_date`, `customer_obs`, `customer_address_type`, `customer_address`, `customer_address_number`, `customer_address_complements`, `customer_zone`, `customer_state`, `customer_city`, `customer_cep`) VALUES (`$customer_name`, `$customer_trade_name`, `$customer_email`, `$customer_cpf`, `$customer_natural_legal`, `$customer_rg`, `$customer_telephone`, `$customer_cellphone`, `$customer_registry_date`, `$customer_obs`, `$customer_address_type`, `$customer_address`, `$customer_address_number`, `$customer_address_complements`, `$customer_zone`, `$customer_state`, `$customer_city`, `$customer_cep`)";

        $rs = mysqli_query($link, $sql);
    }

    public function readCustomer(Customer $customer)
    {

        $objDb = new db();
        $link = $objDb->mysql_connect();

        $customer_id = $customer->getCustomer_id();
        $sql = "SELECT * FROM tbcustomers where customer_id = $customer_id";
        $rs = mysqli_query($link, $sql);
        $reg = mysqli_fetch_array($rs, MYSQLI_ASSOC);

        $customer->setCustomer_name($reg['customer_name']);
        $customer->setCustomer_trade_name($reg['customer_trade_name']);
        $customer->setCustomer_email($reg['customer_email']);
        $customer->setCustomer_cpf($reg['customer_cpf']);
        $customer->setCustomer_natural_legal($reg['customer_natural_legal']);
        $customer->setCustomer_rg($reg['customer_rg']);
        $customer->setCustomer_telephone($reg['customer_telephone']);
        $customer->setCustomer_cellphone($reg['customer_cellphone']);
        $customer->setCustomer_registry_date($reg['customer_registry_date']);
        $customer->setCustomer_obs($reg['customer_obs']);
        $customer->setCustomer_address_type($reg['customer_address_type']);
        $customer->setCustomer_address($reg['customer_address']);
        $customer->setCustomer_address_number($reg['customer_address_number']);
        $customer->setCustomer_address_complements($reg['customer_address_complements']);
        $customer->setCustomer_zone($reg['customer_zone']);
        $customer->setCustomer_state($reg['customer_state']);
        $customer->setCustomer_city($reg['customer_city']);
        $customer->setCustomer_cep($reg['customer_cep']);

        $customer_array['customer_id'] = $customer->getCustomer_id();
        $customer_array['customer_name'] = $customer->getCustomer_name();
        $customer_array['customer_trade_name'] = $customer->getCustomer_trade_name();
        $customer_array['customer_email'] = $customer->getCustomer_email();
        $customer_array['customer_cpf'] = $customer->getCustomer_cpf();
        $customer_array['customer_natural_legal'] = $customer->getCustomer_natural_legal();
        $customer_array['customer_rg'] = $customer->getCustomer_rg();
        $customer_array['customer_telephone'] = $customer->getCustomer_telephone();
        $customer_array['customer_cellphone'] = $customer->getCustomer_cellphone();
        $customer_array['customer_registry_date'] = $customer->getCustomer_registry_date();
        $customer_array['customer_obs'] = $customer->getCustomer_obs();
        $customer_array['customer_address_type'] = $customer->getCustomer_address_type();
        $customer_array['customer_address'] = $customer->getCustomer_address();
        $customer_array['customer_address_number'] = $customer->getCustomer_address_number();
        $customer_array['customer_address_complements'] = $customer->getCustomer_address_complements();
        $customer_array['customer_zone'] = $customer->getCustomer_zone();
        $customer_array['customer_state'] = $customer->getCustomer_state();
        $customer_array['customer_city'] = $customer->getCustomer_city();
        $customer_array['customer_cep'] = $customer->getCustomer_cep();

        return $customer_array;
    }


    public function updateCustomer(Customer $customer)
    {
        $objDb = new db();
        $link = $objDb->mysql_connect();

        $customer_id = $customer->getCustomer_id();
        $customer_name = $customer->getCustomer_name();
        $customer_trade_name = $customer->getCustomer_trade_name();
        $customer_email = $customer->getCustomer_email();
        $customer_cpf = $customer->getCustomer_cpf();
        $customer_natural_legal = $customer->getCustomer_natural_legal();
        $customer_rg = $customer->getCustomer_rg();
        $customer_telephone = $customer->getCustomer_telephone();
        $customer_cellphone = $customer->getCustomer_cellphone();
        $customer_registry_date = $customer->getCustomer_registry_date();
        $customer_obs = $customer->getCustomer_obs();
        $customer_address_type = $customer->getCustomer_address_type();
        $customer_address = $customer->getCustomer_address();
        $customer_address_number = $customer->getCustomer_address_number();
        $customer_address_complements = $customer->getCustomer_address_complements();
        $customer_zone = $customer->getCustomer_zone();
        $customer_state = $customer->getCustomer_state();
        $customer_city = $customer->getCustomer_city();
        $customer_cep = $customer->getCustomer_cep();

        $sql = "UPDATE `servx`.`tbcustomers` SET `customer_name`= '$customer_name', `customer_trade_name`= '$customer_trade_name', `customer_email`='$customer_email', `customer_cpf`='$customer_cpf', `customer_natural_legal`='$customer_natural_legal', `customer_rg`='$customer_rg', `customer_telephone`='$customer_telephone', `customer_cellphone`='$customer_cellphone', `customer_registry_date`='$customer_registry_date', `customer_obs`= '$customer_obs', `customer_address_type`= '$customer_address_type', `customer_address`='$customer_address', `customer_address_number`='$customer_address_number', `customer_address_complements`='$customer_address_complements', `customer_zone`='$customer_zone', `customer_state`='$customer_state', `customer_city`='$customer_city', `customer_cep`='$customer_cep' WHERE `customer_id`='$customer_id'";
        $rs = mysqli_query($link, $sql);
    }


    public function deleteCustomer(Customer $customer)
    {
        $objDb = new db();
        $link = $objDb->mysql_connect();

        $customer_id = $customer->getCustomer_id();
        $sql = "DELETE FROM `servx`.`tbcustomers` WHERE `customer_id`='$customer_id'";
        $rs = mysqli_query($link, $sql);
    }


    public function readAdresses()
    {

        $objDb = new db();
        $link = $objDb->mysql_connect();
        $i = 0;

        $sql = "select customer_address from tbcustomers group by customer_address";
        $rs = mysqli_query($link, $sql);
        while ($reg = mysqli_fetch_array($rs, MYSQLI_NUM)) {
            $group[$i] = $reg;
            $i++;
        }
        return $group;
    }

    public function readZones()
    {

        $objDb = new db();
        $link = $objDb->mysql_connect();
        $i = 0;

        $sql = "select customer_zone from tbcustomers group by customer_zone";
        $rs = mysqli_query($link, $sql);
        while ($reg = mysqli_fetch_array($rs, MYSQLI_NUM)) {
            $brands[$i] = $reg;
            $i++;
        }
        return $brands;
    }

};
?>