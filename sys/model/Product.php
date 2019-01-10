<?php 

class product
{
    private $id_prod;
    private $nome_prod;
    private $desc_prod;
    private $grupo_prod;
    private $marca_prod;
    private $custo_prod;
    private $margem_prod;
    private $preco_prod;
    private $unidade_prod;


    /**
     * Get the value of id_prod
     */
    public function getId_prod()
    {
        return $this->id_prod;
    }

    /**
     * Set the value of id_prod
     *
     * @return  self
     */
    public function setId_prod($id_prod)
    {
        $this->id_prod = $id_prod;

        return $this;
    }

    /**
     * Get the value of nome_prod
     */
    public function getNome_prod()
    {
        return $this->nome_prod;
    }

    /**
     * Set the value of nome_prod
     *
     * @return  self
     */
    public function setNome_prod($nome_prod)
    {
        $this->nome_prod = $nome_prod;

        return $this;
    }

    /**
     * Get the value of desc_prod
     */
    public function getDesc_prod()
    {
        return $this->desc_prod;
    }

    /**
     * Set the value of desc_prod
     *
     * @return  self
     */
    public function setDesc_prod($desc_prod)
    {
        $this->desc_prod = $desc_prod;

        return $this;
    }

    /**
     * Get the value of grupo_prod
     */
    public function getGrupo_prod()
    {
        return $this->grupo_prod;
    }

    /**
     * Set the value of grupo_prod
     *
     * @return  self
     */
    public function setGrupo_prod($grupo_prod)
    {
        $this->grupo_prod = $grupo_prod;

        return $this;
    }

    /**
     * Get the value of marca_prod
     */
    public function getMarca_prod()
    {
        return $this->marca_prod;
    }

    /**
     * Set the value of marca_prod
     *
     * @return  self
     */
    public function setMarca_prod($marca_prod)
    {
        $this->marca_prod = $marca_prod;

        return $this;
    }


    /**
     * Get the value of custo_prod
     */
    public function getCusto_prod()
    {
        return $this->custo_prod;
    }

    /**
     * Set the value of custo_prod
     *
     * @return  self
     */
    public function setCusto_prod($custo_prod)
    {
        $this->custo_prod = $custo_prod;

        return $this;
    }

    /**
     * Get the value of margem_prod
     */
    public function getMargem_prod()
    {
        return $this->margem_prod;
    }

    /**
     * Set the value of margem_prod
     *
     * @return  self
     */
    public function setMargem_prod($margem_prod)
    {
        $this->margem_prod = $margem_prod;

        return $this;
    }

    /**
     * Get the value of preco_prod
     */
    public function getPreco_prod()
    {
        return $this->preco_prod;
    }

    /**
     * Set the value of preco_prod
     *
     * @return  self
     */
    public function setPreco_prod($preco_prod)
    {
        $this->preco_prod = $preco_prod;

        return $this;
    }

    /**
     * Get the value of unidade_prod
     */
    public function getUnidade_prod()
    {
        return $this->unidade_prod;
    }

    /**
     * Set the value of unidade_prod
     *
     * @return  self
     */
    public function setUnidade_prod($unidade_prod)
    {
        $this->unidade_prod = $unidade_prod;

        return $this;
    }
}; ?>