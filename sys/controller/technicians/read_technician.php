<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/dao/Technicians_dao.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/model/Technician.php');

$technician_id = $_POST['technician_id'];
$technician = new Technician();
$techniciansDao = new Technicians_dao();

$technician->setTechnician_id($technician_id);
$technician = $techniciansDao->readTechnician($technician);

$technician_array['technician_id'] = $technician->getTechnician_id();
$technician_array['technician_name'] = $technician->getTechnician_name();
$technician_registry_date = strtotime($technician->getTechnician_registry_date());
$technician_array['technician_registry_date'] = date('d-m-Y', $technician_registry_date);

echo json_encode($technician_array);