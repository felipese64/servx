<?php 

class product
{
    private $prod_id;
    private $prod_name;
    private $prod_desc;
    private $prod_group;
    private $prod_brand;
    private $prod_cost;
    private $prod_markup;
    private $prod_price;
    private $prod_unit;


    /**
     * Get the value of prod_id
     */
    public function getProd_id()
    {
        return $this->prod_id;
    }

    /**
     * Set the value of prod_id
     *
     * @return  self
     */
    public function setProd_id($prod_id)
    {
        $this->prod_id = $prod_id;

        return $this;
    }

    /**
     * Get the value of prod_name
     */
    public function getProd_name()
    {
        return $this->prod_name;
    }

    /**
     * Set the value of prod_name
     *
     * @return  self
     */
    public function setProd_name($prod_name)
    {
        $this->prod_name = $prod_name;

        return $this;
    }

    /**
     * Get the value of prod_desc
     */
    public function getProd_desc()
    {
        return $this->prod_desc;
    }

    /**
     * Set the value of prod_desc
     *
     * @return  self
     */
    public function setProd_desc($prod_desc)
    {
        $this->prod_desc = $prod_desc;

        return $this;
    }

    /**
     * Get the value of prod_group
     */
    public function getProd_group()
    {
        return $this->prod_group;
    }

    /**
     * Set the value of prod_group
     *
     * @return  self
     */
    public function setProd_group($prod_group)
    {
        $this->prod_group = $prod_group;

        return $this;
    }

    /**
     * Get the value of prod_brand
     */
    public function getProd_brand()
    {
        return $this->prod_brand;
    }

    /**
     * Set the value of prod_brand
     *
     * @return  self
     */
    public function setProd_brand($prod_brand)
    {
        $this->prod_brand = $prod_brand;

        return $this;
    }


    /**
     * Get the value of prod_cost
     */
    public function getProd_cost()
    {
        return $this->prod_cost;
    }

    /**
     * Set the value of prod_cost
     *
     * @return  self
     */
    public function setProd_cost($prod_cost)
    {
        $this->prod_cost = $prod_cost;

        return $this;
    }

    /**
     * Get the value of prod_markup
     */
    public function getProd_markup()
    {
        return $this->prod_markup;
    }

    /**
     * Set the value of prod_markup
     *
     * @return  self
     */
    public function setProd_markup($prod_markup)
    {
        $this->prod_markup = $prod_markup;

        return $this;
    }

    /**
     * Get the value of prod_price
     */
    public function getProd_price()
    {
        return $this->prod_price;
    }

    /**
     * Set the value of prod_price
     *
     * @return  self
     */
    public function setProd_price($prod_price)
    {
        $this->prod_price = $prod_price;

        return $this;
    }

    /**
     * Get the value of prod_unit
     */
    public function getProd_unit()
    {
        return $this->prod_unit;
    }

    /**
     * Set the value of prod_unit
     *
     * @return  self
     */
    public function setProd_unit($prod_unit)
    {
        $this->prod_unit = $prod_unit;

        return $this;
    }
}; ?>