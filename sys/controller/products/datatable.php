<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');

$objDb = new db();
$link = $objDb->mysql_connect();

//Receber a requisão da pesquisa 
$requestData = $_REQUEST;

//Indice da coluna na tabela visualizar resultado => nome da coluna no banco de dados
$columns = array(

	0 => 'prod_id',
	1 => 'prod_name',
	2 => 'prod_unit',
	3 => 'prod_brand',
	4 => 'prod_group',
	5 => 'prod_cost',
	6 => 'prod_markup',
	7 => 'prod_price'
);

//Obtendo registros de número total sem qualquer pesquisa
$sql = "SELECT * FROM tbproducts";
$tb_results = mysqli_query($link, $sql);
$rows_number = mysqli_num_rows($tb_results);

//Obter os dados a serem apresentados
$search_result = "SELECT * FROM tbproducts WHERE 1=1";
if (!empty($requestData['search']['value'])) {   // se houver um parâmetro de pesquisa, $requestData['search']['value'] contém o parâmetro de pesquisa
	$search_result .= " AND ( prod_name LIKE '" . $requestData['search']['value'] . "%' ";
	$search_result .= " OR prod_desc LIKE '" . $requestData['search']['value'] . "%' ";
	$search_result .= " OR prod_group LIKE '" . $requestData['search']['value'] . "%' ";
	$search_result .= " OR prod_brand LIKE '" . $requestData['search']['value'] . "%' ";
	$search_result .= " OR prod_cost LIKE '" . $requestData['search']['value'] . "%' ";
	$search_result .= " OR prod_price LIKE '" . $requestData['search']['value'] . "%' )";
}

$rs = mysqli_query($link, $search_result);
$totalFiltered = mysqli_num_rows($rs);
//Ordenar o resultado
$search_result .= " ORDER BY " . $columns[$requestData['order'][0]['column']] . "   " . $requestData['order'][0]['dir'] . "  LIMIT " . $requestData['start'] . " ," . $requestData['length'] . "   ";
$rs = mysqli_query($link, $search_result);

// Ler e criar o array de dados
$tb_data = array();
while ($tb_row = mysqli_fetch_array($rs)) {
	$data = array();
	$data[] = $tb_row["prod_id"];
	$data[] = $tb_row["prod_name"];
	$data[] = $tb_row["prod_unit"];
	$data[] = $tb_row["prod_brand"];
	$data[] = $tb_row["prod_group"];
	$data[] = number_format($tb_row["prod_cost"], 2, ',', '.');
	$data[] = $tb_row["prod_markup"];
	$data[] = number_format($tb_row["prod_price"], 2, ',', '.');

	$tb_data[] = $data;
}

//Cria o array de informações a serem retornadas para o Javascript
$json_data = array(

	"draw" => intval($requestData['draw']),//para cada requisição é enviado um número como parâmetro
	"recordsTotal" => intval($rows_number),  //Quantidade de registros que há no banco de dados
	"recordsFiltered" => intval($totalFiltered), //Total de registros quando houver pesquisa
	"data" => $tb_data   //Array de dados completo dos dados retornados da tabela 
);

echo json_encode($json_data);  //enviar dados como formato json