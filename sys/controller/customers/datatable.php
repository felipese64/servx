<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/db.class.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/servx/sys/lib/functions.php');

$objDb = new db();
$link = $objDb->mysql_connect();

//Receber a requisão da pesquisa 
$requestData = $_REQUEST;

//Indice da coluna na tabela visualizar resultado => nome da coluna no banco de dados
$columns = array(

    0 => 'customer_id',
    1 => 'customer_name',
    2 => 'customer_address',
    3 => 'customer_telephone',
    4 => 'customer_cellphone',
    5 => 'customer_email',
    6 => 'customer_cpf'
);

//Obtendo registros de número total sem qualquer pesquisa
$sql = "SELECT * FROM tbcustomers";
$tb_results = mysqli_query($link, $sql);
$rows_number = mysqli_num_rows($tb_results);

//Obter os dados a serem apresentados
$search_result = "SELECT * FROM tbcustomers WHERE 1=1";
if (!empty($requestData['search']['value'])) {   // se houver um parâmetro de pesquisa, $requestData['search']['value'] contém o parâmetro de pesquisa
    $search_result .= " AND ( customer_name LIKE '%" . $requestData['search']['value'] . "%' ";
    $search_result .= " OR customer_address LIKE '%" . $requestData['search']['value'] . "%' ";
    $search_result .= " OR customer_telephone LIKE '%" . $requestData['search']['value'] . "%' ";
    $search_result .= " OR customer_cellphone LIKE '%" . $requestData['search']['value'] . "%' ";
    $search_result .= " OR customer_email LIKE '%" . $requestData['search']['value'] . "%' ";
    $search_result .= " OR customer_cpf LIKE '%" . $requestData['search']['value'] . "%' )";
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
    $data[] = $tb_row["customer_id"];
    $data[] = $tb_row["customer_name"];
    $data[] = $tb_row["customer_address"];
    $data[] = mask($tb_row["customer_telephone"], "(##) ####-####");
    $data[] = mask($tb_row["customer_cellphone"], "(##) #####-####");
    $data[] = $tb_row["customer_email"];
    
    if (strlen ($tb_row["customer_cpf"]) == 11) {
        $data[] = mask($tb_row["customer_cpf"], "###.###.###-##");
    }
    else{
        $data[] = mask($tb_row["customer_cpf"], "##.###.###/####-##");
    }
  
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