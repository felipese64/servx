<?php 

class customer
{

    private $customer_id;
    private $customer_name;
    private $customer_trade_name;
    private $customer_email;
    private $customer_cpf;
    private $customer_natural_legal;
    private $customer_rg;
    private $customer_telephone;
    private $customer_cellphone;
    private $customer_registry_date;
    private $customer_obs;
    private $customer_address_type;
    private $customer_address;
    private $customer_address_number;
    private $customer_address_complements;
    private $customer_zone;
    private $customer_state;
    private $customer_city;
    private $customer_cep;

    /**
     * Get the value of customer_id
     */
    public function getCustomer_id()
    {
        return $this->customer_id;
    }

    /**
     * Set the value of customer_id
     *
     * @return  self
     */
    public function setCustomer_id($customer_id)
    {
        $this->customer_id = $customer_id;

        return $this;
    }

    /**
     * Get the value of customer_name
     */
    public function getCustomer_name()
    {
        return $this->customer_name;
    }

    /**
     * Set the value of customer_name
     *
     * @return  self
     */
    public function setCustomer_name($customer_name)
    {
        $this->customer_name = $customer_name;

        return $this;
    }

    /**
     * Get the value of customer_trade_name
     */
    public function getCustomer_trade_name()
    {
        return $this->customer_trade_name;
    }

    /**
     * Set the value of customer_trade_name
     *
     * @return  self
     */
    public function setCustomer_trade_name($customer_trade_name)
    {
        $this->customer_trade_name = $customer_trade_name;

        return $this;
    }

    /**
     * Get the value of customer_email
     */
    public function getCustomer_email()
    {
        return $this->customer_email;
    }

    /**
     * Set the value of customer_email
     *
     * @return  self
     */
    public function setCustomer_email($customer_email)
    {
        $this->customer_email = $customer_email;

        return $this;
    }

    /**
     * Get the value of customer_cpf
     */
    public function getCustomer_cpf()
    {
        return $this->customer_cpf;
    }

    /**
     * Set the value of customer_cpf
     *
     * @return  self
     */
    public function setCustomer_cpf($customer_cpf)
    {
        $this->customer_cpf = $customer_cpf;

        return $this;
    }

    /**
     * Get the value of customer_natural_legal
     */
    public function getCustomer_natural_legal()
    {
        return $this->customer_natural_legal;
    }

    /**
     * Set the value of customer_natural_legal
     *
     * @return  self
     */
    public function setCustomer_natural_legal($customer_natural_legal)
    {
        $this->customer_natural_legal = $customer_natural_legal;

        return $this;
    }

    /**
     * Get the value of customer_rg
     */
    public function getCustomer_rg()
    {
        return $this->customer_rg;
    }

    /**
     * Set the value of customer_rg
     *
     * @return  self
     */
    public function setCustomer_rg($customer_rg)
    {
        $this->customer_rg = $customer_rg;

        return $this;
    }

    /**
     * Get the value of customer_telephone
     */
    public function getCustomer_telephone()
    {
        return $this->customer_telephone;
    }

    /**
     * Set the value of customer_telephone
     *
     * @return  self
     */
    public function setCustomer_telephone($customer_telephone)
    {
        $this->customer_telephone = $customer_telephone;

        return $this;
    }

    /**
     * Get the value of customer_cellphone
     */
    public function getCustomer_cellphone()
    {
        return $this->customer_cellphone;
    }

    /**
     * Set the value of customer_cellphone
     *
     * @return  self
     */
    public function setCustomer_cellphone($customer_cellphone)
    {
        $this->customer_cellphone = $customer_cellphone;

        return $this;
    }

    /**
     * Get the value of customer_registry_date
     */
    public function getCustomer_registry_date()
    {
        return $this->customer_registry_date;
    }

    /**
     * Set the value of customer_registry_date
     *
     * @return  self
     */
    public function setCustomer_registry_date($customer_registry_date)
    {
        $this->customer_registry_date = $customer_registry_date;

        return $this;
    }

    /**
     * Get the value of customer_obs
     */
    public function getCustomer_obs()
    {
        return $this->customer_obs;
    }

    /**
     * Set the value of customer_obs
     *
     * @return  self
     */
    public function setCustomer_obs($customer_obs)
    {
        $this->customer_obs = $customer_obs;

        return $this;
    }

    /**
     * Get the value of customer_address_type
     */
    public function getCustomer_address_type()
    {
        return $this->customer_address_type;
    }

    /**
     * Set the value of customer_address_type
     *
     * @return  self
     */
    public function setCustomer_address_type($customer_address_type)
    {
        $this->customer_address_type = $customer_address_type;

        return $this;
    }

    /**
     * Get the value of customer_address
     */
    public function getCustomer_address()
    {
        return $this->customer_address;
    }

    /**
     * Set the value of customer_address
     *
     * @return  self
     */
    public function setCustomer_address($customer_address)
    {
        $this->customer_address = $customer_address;

        return $this;
    }

    /**
     * Get the value of customer_address_complements
     */
    public function getCustomer_address_complements()
    {
        return $this->customer_address_complements;
    }

    /**
     * Set the value of customer_address_complements
     *
     * @return  self
     */
    public function setCustomer_address_complements($customer_address_complements)
    {
        $this->customer_address_complements = $customer_address_complements;

        return $this;
    }

    /**
     * Get the value of customer_zone
     */
    public function getCustomer_zone()
    {
        return $this->customer_zone;
    }

    /**
     * Set the value of customer_zone
     *
     * @return  self
     */
    public function setCustomer_zone($customer_zone)
    {
        $this->customer_zone = $customer_zone;

        return $this;
    }

    /**
     * Get the value of customer_state
     */
    public function getCustomer_state()
    {
        return $this->customer_state;
    }

    /**
     * Set the value of customer_state
     *
     * @return  self
     */
    public function setCustomer_state($customer_state)
    {
        $this->customer_state = $customer_state;

        return $this;
    }

    /**
     * Get the value of customer_city
     */
    public function getCustomer_city()
    {
        return $this->customer_city;
    }

    /**
     * Set the value of customer_city
     *
     * @return  self
     */
    public function setCustomer_city($customer_city)
    {
        $this->customer_city = $customer_city;

        return $this;
    }

    /**
     * Get the value of customer_cep
     */
    public function getCustomer_cep()
    {
        return $this->customer_cep;
    }

    /**
     * Set the value of customer_cep
     *
     * @return  self
     */
    public function setCustomer_cep($customer_cep)
    {
        $this->customer_cep = $customer_cep;

        return $this;
    }

    /**
     * Get the value of customer_address_number
     */
    public function getCustomer_address_number()
    {
        return $this->customer_address_number;
    }

    /**
     * Set the value of customer_address_number
     *
     * @return  self
     */
    public function setCustomer_address_number($customer_address_number)
    {
        $this->customer_address_number = $customer_address_number;

        return $this;
    }
};


?>