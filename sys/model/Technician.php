<?php

class technician
{

    private $technician_id;
    private $technician_name;
    private $technician_registry_date;

    /**
     * Get the value of technician_id
     */
    public function getTechnician_id()
    {
        return $this->technician_id;
    }

    /**
     * Set the value of technician_id
     *
     * @return  self
     */
    public function setTechnician_id($technician_id)
    {
        $this->technician_id = $technician_id;

        return $this;
    }

    /**
     * Get the value of technician_name
     */
    public function getTechnician_name()
    {
        return $this->technician_name;
    }

    /**
     * Set the value of technician_name
     *
     * @return  self
     */
    public function setTechnician_name($technician_name)
    {
        $this->technician_name = $technician_name;

        return $this;
    }

    /**
     * Get the value of technician_registry_date
     */
    public function getTechnician_registry_date()
    {
        return $this->technician_registry_date;
    }

    /**
     * Set the value of technician_registry_date
     *
     * @return  self
     */
    public function setTechnician_registry_date($technician_registry_date)
    {
        $this->technician_registry_date = $technician_registry_date;

        return $this;
    }
};