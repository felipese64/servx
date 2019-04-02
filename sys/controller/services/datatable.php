<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');

$objDb = new db();
$link = $objDb->mysql_connect();

//Receber a requisão da pesquisa 
$requestData = $_REQUEST;

//Indice da coluna na tabela visualizar resultado => nome da coluna no banco de dados
$columns = array(

    0 => 'serv_id',
    1 => 'serv_name',
    2 => 'serv_ts',
    3 => 'serv_ts_price',
    4 => 'serv_price'
);

//Obtendo registros de número total sem qualquer pesquisa
$sql = "SELECT * FROM tbservices";
$tb_results = mysqli_query($link, $sql);
$rows_number = mysqli_num_rows($tb_results);

//Obter os dados a serem apresentados
$search_result = "SELECT * FROM tbservices WHERE 1=1";
if (!empty($requestData['search']['value'])) {   // se houver um parâmetro de pesquisa, $requestData['search']['value'] contém o parâmetro de pesquisa
    $search_result .= " AND ( serv_name LIKE '%" . $requestData['search']['value'] . "%' ";
    $search_result .= " OR serv_desc LIKE '%" . $requestData['search']['value'] . "%' ";
    $search_result .= " OR serv_ts LIKE '%" . $requestData['search']['value'] . "%' ";
    $search_result .= " OR serv_ts_price LIKE '%" . $requestData['search']['value'] . "%' ";
    $search_result .= " OR serv_price LIKE '%" . $requestData['search']['value'] . "%' )";
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
    $data[] = $tb_row["serv_id"];
    $data[] = $tb_row["serv_name"];
    $data[] = $tb_row["serv_ts"];
    $data[] = number_format($tb_row["serv_ts_price"], 2, ',', '.');
    $data[] = number_format($tb_row["serv_price"], 2, ',', '.');
    $tb_data[] = $data;
}

//Cria o array de informações a serem retornadas para o Javascript
$json_data = array(

    "draw" => intval($requestData['draw']), //para cada requisição é enviado um número como parâmetro
    "recordsTotal" => intval($rows_number),  //Quantidade de registros que há no banco de dados
    "recordsFiltered" => intval($totalFiltered), //Total de registros quando houver pesquisa
    "data" => $tb_data   //Array de dados completo dos dados retornados da tabela 
);

echo json_encode($json_data);  