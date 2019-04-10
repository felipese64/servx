<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');

$objDb = new db();
$link = $objDb->mysql_connect();

//Receber a requisão da pesquisa 
$requestData = $_REQUEST;

//Indice da coluna na tabela visualizar resultado => nome da coluna no banco de dados
$columns = array(

    0 => 'os_id',
    1 => 'os_date',
    2 => 'os_status',
    3 => 'customer_name',
    4 => 'customer_address'
);

//Obtendo registros de número total sem qualquer pesquisa
$sql = "select * from tbos as os join tbcustomers as cust where os.customer_id = cust.customer_id;";
$tb_results = mysqli_query($link, $sql);
$rows_number = mysqli_num_rows($tb_results);

//Obter os dados a serem apresentados
$search_result = "select * from tbos as os join tbcustomers as cust where os.customer_id = cust.customer_id and 1=1";
if (!empty($requestData['search']['value'])) {   // se houver um parâmetro de pesquisa, $requestData['search']['value'] contém o parâmetro de pesquisa
    $search_result .= " AND ( os_date LIKE '%" . $requestData['search']['value'] . "%' ";
    $search_result .= " OR os_status LIKE '%" . $requestData['search']['value'] . "%' ";
    $search_result .= " OR customer_name LIKE '%" . $requestData['search']['value'] . "%' ";
    $search_result .= " OR customer_address LIKE '%" . $requestData['search']['value'] . "%' )";
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
    $data[] = $tb_row["os_id"];
    $data[] = $tb_row["os_date"];
    $data[] = $tb_row["os_status"];
    $data[] = $tb_row["customer_name"];
    $data[] = $tb_row["customer_address"];
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