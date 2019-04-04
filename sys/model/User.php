<?php 
class user
{
    private $user_id;
    private $user_login;
    private $user_password;
    private $user_profile;
    /**
     * Get the value of user_id
     */
    public function getUser_id()
    {
        return $this->user_id;
    }
    /**
     * Set the value of user_id
     *
     * @return  self
     */
    public function setUser_id($user_id)
    {
        $this->user_id = $user_id;
        return $this;
    }
    /**
     * Get the value of user_login
     */
    public function getUser_login()
    {
        return $this->user_login;
    }
    /**
     * Set the value of user_login
     *
     * @return  self
     */
    public function setUser_login($user_login)
    {
        $this->user_login = $user_login;
        return $this;
    }
    /**
     * Get the value of user_password
     */
    public function getUser_password()
    {
        return $this->user_password;
    }
    /**
     * Set the value of user_password
     *
     * @return  self
     */
    public function setUser_password($user_password)
    {
        $this->user_password = $user_password;
        return $this;
    }
    /**
     * Get the value of user_profile
     */
    public function getUser_profile()
    {
        return $this->user_profile;
    }
    /**
     * Set the value of user_profile
     *
     * @return  self
     */
    public function setUser_profile($user_profile)
    {
        $this->user_profile = $user_profile;
        return $this;
    }
};