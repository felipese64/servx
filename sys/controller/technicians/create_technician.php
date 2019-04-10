<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/dao/Technicians_dao.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/Technician.php');

$technician = new Technician();
$techniciansDao = new Technicians_dao();

$technician->setTechnician_name((mb_strtoupper($_POST['technician_name'], 'UTF-8')));
echo $techniciansDao->createTechnician($technician);