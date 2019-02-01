<?php 
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/product.php');
class Products_dao
{

    public function createProduct(Product $product)
    {

        $objDb = new db();
        $link = $objDb->mysql_connect();

        $prod_name = $product->getProd_name();
        $prod_desc = $product->getProd_desc();
        $prod_group = $product->getProd_group();
        $prod_brand = $product->getProd_brand();
        $prod_cost = $product->getProd_cost();
        $prod_markup = $product->getProd_markup();
        $prod_price = $product->getProd_price();
        $prod_unit = $product->getProd_unit();

        $sql = "INSERT INTO `servx`.`tbproducts` (`prod_name`, `prod_group`, `prod_desc`, `prod_brand`, `prod_cost`, `prod_markup`, `prod_price`, `prod_unit`) VALUES ('$prod_name', '$prod_group', '$prod_desc', '$prod_brand', '$prod_cost', '$prod_markup', '$prod_price', '$prod_unit')";

        $rs = mysqli_query($link, $sql);
    }

    public function readProduct(Product $product)
    {

        $objDb = new db();
        $link = $objDb->mysql_connect();

        $prod_id = $product->getProd_id();
        $sql = "SELECT * FROM tbproducts where prod_id = $prod_id";
        $rs = mysqli_query($link, $sql);
        $reg = mysqli_fetch_array($rs, MYSQLI_ASSOC);

        $product->setProd_name($reg['prod_name']);
        $product->setProd_group($reg['prod_group']);
        $product->setProd_desc($reg['prod_desc']);
        $product->setProd_brand($reg['prod_brand']);
        $product->setProd_cost($reg['prod_cost']);
        $product->setProd_markup($reg['prod_markup']);
        $product->setProd_price($reg['prod_price']);
        $product->setProd_unit($reg['prod_unit']);

        $prod_array['prod_id'] = $product->getProd_id();
        $prod_array['prod_name'] = $product->getProd_name();
        $prod_array['prod_desc'] = $product->getProd_desc();
        $prod_array['prod_brand'] = $product->getProd_brand();
        $prod_array['prod_group'] = $product->getProd_group();
        $prod_array['prod_cost'] = $product->getProd_cost();
        $prod_array['prod_markup'] = $product->getProd_markup();
        $prod_array['prod_price'] = $product->getProd_price();
        $prod_array['prod_unit'] = $product->getProd_unit();

        return $prod_array;
    }


    public function readGroups()
    {

        $objDb = new db();
        $link = $objDb->mysql_connect();
        $i = 0;

        $sql = "select prod_group from tbproducts group by prod_group";
        $rs = mysqli_query($link, $sql);
        while ($reg = mysqli_fetch_array($rs, MYSQLI_NUM)) {
            $group[$i] = $reg;
            $i++;
        }
        return $group;
    }

    public function readBrands()
    {

        $objDb = new db();
        $link = $objDb->mysql_connect();
        $i = 0;

        $sql = "select prod_brand from tbproducts group by prod_brand";
        $rs = mysqli_query($link, $sql);
        while ($reg = mysqli_fetch_array($rs, MYSQLI_NUM)) {
            $brands[$i] = $reg;
            $i++;
        }
        return $brands;
    }

    public function updateProduct(Product $product)
    {
        $objDb = new db();
        $link = $objDb->mysql_connect();

        $prod_id = $product->getProd_id();
        $prod_name = $product->getProd_name();
        $prod_desc = $product->getProd_desc();
        $prod_group = $product->getProd_group();
        $prod_brand = $product->getProd_brand();
        $prod_cost = $product->getProd_cost();
        $prod_markup = $product->getProd_markup();
        $prod_price = $product->getProd_price();
        $prod_unit = $product->getProd_unit();

        $sql = "UPDATE `servx`.`tbproducts` SET `prod_name`= '$prod_name', `prod_desc`= '$prod_desc', `prod_group`='$prod_group', `prod_brand`='$prod_brand', `prod_cost`='$prod_cost', `prod_markup`='$prod_markup', `prod_price`='$prod_price', `prod_unit`='$prod_unit' WHERE `prod_id`='$prod_id'";
        $rs = mysqli_query($link, $sql);
    }


    public function deleteProduct(Product $product)
    {
        $objDb = new db();
        $link = $objDb->mysql_connect();

        $prod_id = $product->getProd_id();
        $sql = "DELETE FROM `servx`.`tbproducts` WHERE `prod_id`='$prod_id'";
        $rs = mysqli_query($link, $sql);
    }
};
?>