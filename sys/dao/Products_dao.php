<?php 
require_once('../lib/db.class.php');
require_once('../model/product.php');





class Products_dao
{



    public function createProduct(Product $product)
    {


        $sql = "INSERT INTO `servx`.`tbprodutos` (`nome_prod`, `grupo_prod`, `desc_prod`, `marca_prod`, `custo_prod`, `margem_prod`, `preco_prod`, `unidade_prod`) VALUES ('$product->setNome_prod()', '$product->setDesc_prod()', '$product->setGrupo_prod()', '$product->setMarca_prod()', '$product->setCusto_prod()', '$product->setMargem_prod()', '$product->setPreco_prod()', '$product->setUnidade_prod()')";

        $rs = mysqli_query($link, $sql);
        //$registro = mysqli_fetch_array($rs, MYSQLI_ASSOC);
        //echo ($registro);

    }

    public function readProduct(Product $product)
    {

        $objDb = new db();
        $link = $objDb->conecta_mysql();

        $id_prod = $product->getId_prod();
        $sql = "SELECT * FROM tbprodutos where id_prod = $id_prod";
        $rs = mysqli_query($link, $sql);
        $registro = mysqli_fetch_array($rs, MYSQLI_ASSOC);

        $product->setNome_prod($registro['nome_prod']);
        $product->setGrupo_prod($registro['grupo_prod']);
        $product->setDesc_prod($registro['desc_prod']);
        $product->setMarca_prod($registro['marca_prod']);
        $product->setCusto_prod($registro['custo_prod']);
        $product->setMargem_prod($registro['margem_prod']);
        $product->setPreco_prod($registro['preco_prod']);
        $product->setUnidade_prod($registro['unidade_prod']);

        $product_row['id_prod'] = $product->getId_prod();
        $product_row['nome_prod'] = $product->getNome_prod();
        $product_row['desc_prod'] = $product->getDesc_prod();
        $product_row['marca_prod'] = $product->getMarca_prod();
        $product_row['grupo_prod'] = $product->getGrupo_prod();
        $product_row['custo_prod'] = $product->getCusto_prod();
        $product_row['margem_prod'] = $product->getMargem_prod();
        $product_row['preco_prod'] = $product->getPreco_prod();
        $product_row['unidade_prod'] = $product->getUnidade_prod();

        return $product_row;
        
       
        //echo ($registro);


    }




    public function updateProduct(Product $product)
    {
        $objDb = new db();
        $link = $objDb->conecta_mysql();

        $id_prod = $product->getId_prod();
        $nome_prod = $product->getNome_prod();
        $desc_prod = $product->getDesc_prod();
        $grupo_prod = $product->getGrupo_prod();
        $marca_prod = $product->getMarca_prod();
        $custo_prod = $product->getCusto_prod();
        $margem_prod = $product->getMargem_prod();
        $preco_prod = $product->getPreco_prod();
        $unidade_prod = $product->getUnidade_prod();

        $sql = "UPDATE `servx`.`tbprodutos` SET `nome_prod`= '$nome_prod', `desc_prod`= '$desc_prod', `grupo_prod`='$grupo_prod', `marca_prod`='$marca_prod', `custo_prod`='$custo_prod', `margem_prod`='$margem_prod', `preco_prod`='$preco_prod', `unidade_prod`='$unidade_prod' WHERE `id_prod`='$id_prod'";

        $rs = mysqli_query($link, $sql);
        echo mysqli_error($link);


    }


    public function deleteProduct(Product $product)
    {
        $objDb = new db();
        $link = $objDb->conecta_mysql();

        $id_prod = $product->getId_prod();
        $sql = "DELETE FROM `servx`.`tbprodutos` WHERE `id_prod`='$id_prod'";
        //$sql = "DELETE FROM `servx`.`tbprodutos` WHERE `id_prod`='50'";
        $rs = mysqli_query($link, $sql);
        return $rs;

    }

};



?>