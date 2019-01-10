<?php

require_once('../lib/db.class.php');


$objDb = new db();
$link = $objDb->conecta_mysql();




//Receber a requisão da pesquisa 
$requestData = $_REQUEST;


//Indice da coluna na tabela visualizar resultado => nome da coluna no banco de dados
$columns = array(

	0 => 'id_prod',
	1 => 'nome_prod',
	2 => 'desc_prod',
	3 => 'grupo_prod',
	4 => 'marca_prod',
	5 => 'custo_prod',
	6 => 'margem_prod',
	7 => 'preco_prod',
	8 => 'unidade_prod'

);

//Obtendo registros de número total sem qualquer pesquisa
$result_user = "SELECT * FROM tbprodutos";
$resultado_user = mysqli_query($link, $result_user);
$qnt_linhas = mysqli_num_rows($resultado_user);

//Obter os dados a serem apresentados
$result_usuarios = "SELECT * FROM tbprodutos WHERE 1=1";
if (!empty($requestData['search']['value'])) {   // se houver um parâmetro de pesquisa, $requestData['search']['value'] contém o parâmetro de pesquisa
	$result_usuarios .= " AND ( nome_prod LIKE '" . $requestData['search']['value'] . "%' ";
	$result_usuarios .= " OR desc_prod LIKE '" . $requestData['search']['value'] . "%' ";
	$result_usuarios .= " OR grupo_prod LIKE '" . $requestData['search']['value'] . "%' ";
	$result_usuarios .= " OR marca_prod LIKE '" . $requestData['search']['value'] . "%' ";
	$result_usuarios .= " OR custo_prod LIKE '" . $requestData['search']['value'] . "%' ";
	$result_usuarios .= " OR preco_prod LIKE '" . $requestData['search']['value'] . "%' )";
}

$resultado_usuarios = mysqli_query($link, $result_usuarios);
$totalFiltered = mysqli_num_rows($resultado_usuarios);
//Ordenar o resultado
$result_usuarios .= " ORDER BY " . $columns[$requestData['order'][0]['column']] . "   " . $requestData['order'][0]['dir'] . "  LIMIT " . $requestData['start'] . " ," . $requestData['length'] . "   ";
$resultado_usuarios = mysqli_query($link, $result_usuarios);

// Ler e criar o array de dados
$dados = array();
while ($row_usuarios = mysqli_fetch_array($resultado_usuarios)) {
	$dado = array();
	$dado[] = $row_usuarios["id_prod"];
	$dado[] = $row_usuarios["nome_prod"];
	$dado[] = $row_usuarios["desc_prod"];
	$dado[] = $row_usuarios["grupo_prod"];
	$dado[] = $row_usuarios["marca_prod"];
	//$dado[] = $row_usuarios["custo_prod"];
	$dado[] = number_format($row_usuarios["custo_prod"], 2, ',', '.');
	$dado[] = $row_usuarios["margem_prod"];
	//$dado[] = $row_usuarios["preco_prod"];
	$dado[] = number_format($row_usuarios["preco_prod"], 2, ',', '.');
	$dado[] = $row_usuarios["unidade_prod"];




	$dados[] = $dado;
}


//Cria o array de informações a serem retornadas para o Javascript
$json_data = array(

	"draw" => intval($requestData['draw']),//para cada requisição é enviado um número como parâmetro
	"recordsTotal" => intval($qnt_linhas),  //Quantidade de registros que há no banco de dados
	"recordsFiltered" => intval($totalFiltered), //Total de registros quando houver pesquisa
	"data" => $dados   //Array de dados completo dos dados retornados da tabela 
);

echo json_encode($json_data);  //enviar dados como formato json