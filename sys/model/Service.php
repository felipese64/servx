<?php 

class service
{

    private $serv_id;
    private $serv_name;
    private $serv_desc;
    private $serv_ts;
    private $serv_ts_price;
    private $serv_price;

    /**
     * Get the value of serv_id
     */
    public function getServ_id()
    {
        return $this->serv_id;
    }

    /**
     * Set the value of serv_id
     *
     * @return  self
     */
    public function setServ_id($serv_id)
    {
        $this->serv_id = $serv_id;

        return $this;
    }

    /**
     * Get the value of serv_name
     */
    public function getServ_name()
    {
        return $this->serv_name;
    }

    /**
     * Set the value of serv_name
     *
     * @return  self
     */
    public function setServ_name($serv_name)
    {
        $this->serv_name = $serv_name;

        return $this;
    }

    /**
     * Get the value of serv_desc
     */
    public function getServ_desc()
    {
        return $this->serv_desc;
    }

    /**
     * Set the value of serv_desc
     *
     * @return  self
     */
    public function setServ_desc($serv_desc)
    {
        $this->serv_desc = $serv_desc;

        return $this;
    }

    /**
     * Get the value of serv_ts
     */
    public function getServ_ts()
    {
        return $this->serv_ts;
    }

    /**
     * Set the value of serv_ts
     *
     * @return  self
     */
    public function setServ_ts($serv_ts)
    {
        $this->serv_ts = $serv_ts;

        return $this;
    }

    /**
     * Get the value of serv_ts_price
     */
    public function getServ_ts_price()
    {
        return $this->serv_ts_price;
    }

    /**
     * Set the value of serv_ts_price
     *
     * @return  self
     */
    public function setServ_ts_price($serv_ts_price)
    {
        $this->serv_ts_price = $serv_ts_price;

        return $this;
    }

    /**
     * Get the value of serv_price
     */
    public function getServ_price()
    {
        return $this->serv_price;
    }

    /**
     * Set the value of serv_price
     *
     * @return  self
     */
    public function setServ_price($serv_price)
    {
        $this->serv_price = $serv_price;

        return $this;
    }
}; ?>