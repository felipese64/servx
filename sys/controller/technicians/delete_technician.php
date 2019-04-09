<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/dao/Technicians_dao.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/Technician.php');

$technician_id = $_POST['technician_id'];
$technician = new Technician();
$techniciansDao = new Technicians_dao();
$technician->setTechnician_id($technician_id);
$techniciansDao->deleteTechnician($technician);