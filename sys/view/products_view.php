<!doctype html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">


    <title>Home</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
        crossorigin="anonymous">
    <link href="https://cdn.datatables.net/1.10.18/css/dataTables.bootstrap4.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
    <link href="../../apps/css/style.css" rel="stylesheet">

    <script src="https://code.jquery.com/jquery-3.3.1.min.js">
    </script>
    <script src="https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js">
    </script>
    <script src="https://cdn.datatables.net/1.10.18/js/dataTables.bootstrap4.min.js">
    </script>

    <script type="text/javascript" language="javascript">
        function double_to_real(n) {
            return n.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
        }

        function real_to_double(n) {

            var x = n.replace(/[.]/g, "").replace(",", "");
            var z = x.length;
            if (z > 1) {

                var x1 = x.substring(0, z - 2);
                var x2 = x.substring(z - 2, z);
                var x3 = x1 + "." + x2;
            } else {
                x3 = "0.0" + x;
            }

            return x3;

        }
    </script>



    <script type="text/javascript" language="javascript">
        $(document).ready(function() {
            var table = $('#list-products').DataTable({
                "processing": true,
                "serverSide": true,
                "language": {
                    "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
                },
                "ajax": {
                    "url": "../controller/products_controller.php",
                    "type": "POST"
                }
            });




            $('#table_body').on('click', 'tr', function() {
                var data = table.row(this).data();


                var id_prod = data[0];


                //var id_prod = document.getElementById("input_id_prod");
                //id_prod.value = data[0];

                //$("#id_prod").value(data[0]);
                //document.getElementById("form_id_prod").submit();
                //alert(id_prod);


                $.ajax({

                    url: '../controller/read_product.php',
                    method: 'post',
                    data: {
                        id_prod1: id_prod
                    },
                    success: function(data) {

                        //alert(data);

                        var product_row = JSON.parse(data);
                        //alert(product_row['nome_prod']);

                        $('#id_prod').val(product_row['id_prod']);
                        $('#nome_prod').val(product_row['nome_prod']);
                        $('#desc_prod').val(product_row['desc_prod']);
                        $('#marca_prod').val(product_row['marca_prod']);
                        $('#grupo_prod').val(product_row['grupo_prod']);
                        $('#custo_prod').val(double_to_real(parseFloat(product_row[
                            'custo_prod'])));
                        $('#margem_prod').val(product_row['margem_prod']);
                        $('#preco_prod').val(double_to_real(parseFloat(product_row[
                            'preco_prod'])));
                        $('#unidade_prod').val(product_row['unidade_prod']);

                        $('#modal_edit_product').modal('show');

                    }
                });




            });





            $(".btn_cancel_product_deletion").click(function() {
                $('#modal_edit_product').modal('show');
            });




            $("#modal_edit_product").on('hide.bs.modal', function() {

                // $("#modal_edit_product").on('hidden.bs.modal', function() {

                //alert(data_form_prod.toString());
                //console.log(data_form_prod);

                var id_prod = $('#id_prod').val();


                $.ajax({

                    url: '../controller/read_product.php',
                    method: 'post',
                    data: {
                        id_prod1: id_prod
                    },
                    success: function(data) {

                        //Descobrir como comparar array com objeto p/ simplificar
                        //Unico campo que pode estar vazio nessa verificação é o desc_prod
                        //Unico campo que pode estar vazio nessa verificação é o desc_prod

                        var product_row = JSON.parse(data);

                        var validate_id_prod = product_row['id_prod'] == $('#id_prod').val();
                        var validate_nome_prod = product_row['nome_prod'] == $('#nome_prod')
                            .val();

                        //alert('conteudo:' + product_row['desc_prod']);
                        // var form_desc_prod;
                        // $('#desc_prod').val() ? form_desc_prod = $('#desc_prod').val() :
                        //     form_desc_prod = null;

                        //  var validate_desc_prod = product_row['desc_prod'] == form_desc_prod;
                        var validate_desc_prod = product_row['desc_prod'] == $('#desc_prod')
                            .val();
                        var validate_marca_prod = product_row['marca_prod'] == $(
                            '#marca_prod').val();
                        var validate_grupo_prod = product_row['grupo_prod'] == $(
                            '#grupo_prod').val();
                        var validate_custo_prod = product_row['custo_prod'] ==
                            real_to_double($(
                                '#custo_prod').val());
                        var validate_margem_prod = product_row['margem_prod'] == $(
                            '#margem_prod').val();
                        var validate_preco_prod = product_row['preco_prod'] ==
                            real_to_double($(
                                '#preco_prod').val());
                        var validate_unidade_prod = product_row['unidade_prod'] == $(
                            '#unidade_prod').val();


                        if (validate_id_prod && validate_nome_prod && validate_desc_prod &&
                            validate_marca_prod && validate_grupo_prod &&
                            validate_custo_prod && validate_margem_prod &&
                            validate_preco_prod && validate_unidade_prod) {
                            var form_equals_db = true;
                        } else {
                            var form_equals_db = false;

                        }

                        var style = getComputedStyle(modal_confirm_delete);

                        var display = style.display;

                        if (display == 'none' && !form_equals_db) {

                            /*
                            alert(validate_id_prod + ' ' + validate_nome_prod + ' ' +
                                validate_desc_prod + ' ' + validate_marca_prod + ' ' +
                                validate_grupo_prod + ' ' + validate_custo_prod + ' ' +
                                validate_margem_prod + ' ' + validate_preco_prod + ' ' +
                                validate_unidade_prod);
                            */


                            $('#modal_confirm_update_product').modal('show');



                        }

                    }




                });


            });


            $("#btn_confirm_product_deletion").click(function() {

                var id_prod = $('#id_prod').val();

                $.ajax({

                    url: '../controller/delete_product.php',
                    method: 'post',
                    data: {
                        id_prod1: id_prod
                    },
                    success: function(data) {

                        //alert(data);
                        //data = 1 p sucesso



                        $('#modal_confirm_delete').modal('hide');
                        //alert('Produto excluido com sucesso!');
                        $('#list-products').DataTable().ajax.reload();


                    }
                });



            });


            $('#btn_update_product').click(function() {

                var id_prod = $('#id_prod').val();


                $.ajax({

                    url: '../controller/read_product.php',
                    method: 'post',
                    data: {
                        id_prod1: id_prod
                    },
                    success: function(data) {

                        //Descobrir como comparar array com objeto p/ simplificar
                        //Unico campo que pode estar vazio nessa verificação é o desc_prod
                        //Unico campo que pode estar vazio nessa verificação é o desc_prod

                        var product_row = JSON.parse(data);

                        var validate_id_prod = product_row['id_prod'] == $('#id_prod').val();
                        var validate_nome_prod = product_row['nome_prod'] == $('#nome_prod')
                            .val();

                        //alert('conteudo:' + product_row['desc_prod']);
                        // var form_desc_prod;
                        // $('#desc_prod').val() ? form_desc_prod = $('#desc_prod').val() :
                        //     form_desc_prod = null;

                        //  var validate_desc_prod = product_row['desc_prod'] == form_desc_prod;
                        var validate_desc_prod = product_row['desc_prod'] == $('#desc_prod')
                            .val();
                        var validate_marca_prod = product_row['marca_prod'] == $(
                            '#marca_prod').val();
                        var validate_grupo_prod = product_row['grupo_prod'] == $(
                            '#grupo_prod').val();
                        var validate_custo_prod = product_row['custo_prod'] ==
                            real_to_double($(
                                '#custo_prod').val());
                        var validate_margem_prod = product_row['margem_prod'] == $(
                            '#margem_prod').val();
                        var validate_preco_prod = product_row['preco_prod'] ==
                            real_to_double($(
                                '#preco_prod').val());
                        var validate_unidade_prod = product_row['unidade_prod'] == $(
                            '#unidade_prod').val();


                        if (validate_id_prod && validate_nome_prod && validate_desc_prod &&
                            validate_marca_prod && validate_grupo_prod &&
                            validate_custo_prod && validate_margem_prod &&
                            validate_preco_prod && validate_unidade_prod) {
                            var form_equals_db = true;
                        } else {
                            var form_equals_db = false;

                        }

                        var style = getComputedStyle(modal_confirm_delete);

                        var display = style.display;

                        if (display == 'none' && !form_equals_db) {






                            var id_prod = $('#id_prod').val();
                            var nome_prod = $('#nome_prod').val();
                            var desc_prod = $('#desc_prod').val();
                            var marca_prod = $('#marca_prod').val();
                            var grupo_prod = $('#grupo_prod').val();
                            var custo_prod = real_to_double($('#custo_prod').val());
                            var margem_prod = $('#margem_prod').val();
                            var preco_prod = real_to_double($('#preco_prod').val());
                            var unidade_prod = $('#unidade_prod').val();



                            $.ajax({

                                url: '../controller/update_product.php',
                                method: 'post',
                                data: {
                                    id_prod: id_prod,
                                    nome_prod: nome_prod,
                                    desc_prod: desc_prod,
                                    marca_prod: marca_prod,
                                    grupo_prod: grupo_prod,
                                    custo_prod: custo_prod,
                                    margem_prod: margem_prod,
                                    preco_prod: preco_prod,
                                    unidade_prod: unidade_prod
                                },

                                success: function(data) {

                                    //alert(data);

                                    $('#list-products').DataTable().ajax.reload();
                                    $('#modal_edit_product').modal('hide');
                                    $('#modal_update_product_success_message').modal(
                                        'show');


                                    //  $('#modal_confirm_update_product').modal('hide');
                                }
                            });




                        }

                    }




                });










            });

            $("#btn_confirm_product_update").click(function() {

                var id_prod = $('#id_prod').val();
                var nome_prod = $('#nome_prod').val();
                var desc_prod = $('#desc_prod').val();
                var marca_prod = $('#marca_prod').val();
                var grupo_prod = $('#grupo_prod').val();
                var custo_prod = real_to_double($('#custo_prod').val());
                var margem_prod = $('#margem_prod').val();
                var preco_prod = real_to_double($('#preco_prod').val());
                var unidade_prod = $('#unidade_prod').val();



                $.ajax({

                    url: '../controller/update_product.php',
                    method: 'post',
                    data: {
                        id_prod: id_prod,
                        nome_prod: nome_prod,
                        desc_prod: desc_prod,
                        marca_prod: marca_prod,
                        grupo_prod: grupo_prod,
                        custo_prod: custo_prod,
                        margem_prod: margem_prod,
                        preco_prod: preco_prod,
                        unidade_prod: unidade_prod
                    },

                    success: function(data) {

                        //alert(data);

                        $('#list-products').DataTable().ajax.reload();
                        $('#modal_edit_product').modal('hide');
                        $('#modal_confirm_update_product').modal('hide');
                        $('#modal_update_product_success_message').modal('show');



                    }
                });




            });


            $('#btn_open_create_product_modal').click(function() {


                $('#modal_create_product').modal('show');

                /*
                $("#list-products_filter").prepend(
                    "<button type=\"button\" class=\"btn btn-success\" id=\"btn_open_create_product_modal\">Criar Produto</button>"
                );
                */

            });

            $("#custo_prod").keyup(function() {

                var string_custo_prod = $("#custo_prod").val().toString();

                var x = string_custo_prod.length;
                var simbolo_decimal = string_custo_prod.substring(x - 3, x);
                //var have_comma = string_custo_prod.includes(",");
                //var have_dot = string_custo_prod.includes(".");


                // var simbolo_decimal = string_custo_prod.charAt(x - 3);

                var custo_prod = real_to_double($("#custo_prod").val());
                //alert ("Custo_prod: " + custo_prod + "custoi prod val" + $("#custo_prod").val());

                // está ignorando a casa decimal










                var margem_prod = $("#margem_prod").val();
                var preco_prod = custo_prod * ((margem_prod / 100) + 1);


                var custo_prod_real = double_to_real(parseFloat(custo_prod));
                var custo_prod_double = real_to_double(custo_prod);
                var custo_prod_real2 = double_to_real(parseFloat(custo_prod_double));

                //echo(custo_prod);

                //alert(custo_prod_real + " Double: " + custo_prod_double + " Segunda conversão" + custo_prod_real2);
                //cursor p/ esquerda
                $("#preco_prod").val(double_to_real(preco_prod));
                //alert("Preco Double: " + preco_prod + " Preco Reais: " + double_to_real(preco_prod) + "\n Custo Double: " + custo_prod + " Custo Reais: " + double_to_real(parseFloat(custo_prod)));

                $("#custo_prod").val(double_to_real(parseFloat(custo_prod)));

                // nao esta fazendo loop, é a conversao



            });

            $("#margem_prod").keyup(function() {

                var string_custo_prod = $("#custo_prod").val().toString();

                var x = string_custo_prod.length;
                var simbolo_decimal = string_custo_prod.substring(x - 3, x);

                //var have_comma = string_custo_prod.includes(",");
                //var have_dot = string_custo_prod.includes(".");

                var custo_prod = real_to_double($("#custo_prod").val());
                var margem_prod = $("#margem_prod").val();
                var preco_prod = custo_prod * ((margem_prod / 100) + 1);
                var custo_prod_real = double_to_real(parseFloat(custo_prod));
                var custo_prod_double = real_to_double(custo_prod);
                var custo_prod_real2 = double_to_real(parseFloat(custo_prod_double));


                $("#preco_prod").val(double_to_real(preco_prod));

                $("#custo_prod").val(double_to_real(parseFloat(custo_prod)));
            });


            $("#preco_prod").keyup(function() {



                var custo_prod = real_to_double($("#custo_prod").val());
                var margem_prod = $("#margem_prod").val();
                var preco_prod = $("#preco_prod").val();

                var preco_prod_double = real_to_double(preco_prod);
                var custo_prod_double = real_to_double(custo_prod);
                var preco_prod_real2 = double_to_real(parseFloat(preco_prod_double));
                var margem_prod_calculada = ((preco_prod_double / custo_prod_double) - 1) * 100;

                if (margem_prod_calculada < 1) {
                    $("#margem_prod").val('0');
                } else {
                    $("#margem_prod").val(margem_prod_calculada);
                }

                $("#preco_prod").val(preco_prod_real2);

            });




            $("#btn_delete_product").click(function() {

                //form exclusao pega nome modificado do form de edição


                $('#modal_edit_product').modal('hide');

                var id_prod = $('#id_prod').val();




                $.ajax({

                    url: '../controller/read_product.php',
                    method: 'post',
                    data: {
                        id_prod1: id_prod
                    },
                    success: function(data) {

                        //alert(data);

                        var product_row = JSON.parse(data);
                        //alert(product_row['nome_prod']);




                        var selected_product = product_row['nome_prod'];


                        $('#txt_delete_product').text(
                            'Tem certeza que deseja excluir o produto \"' +
                            selected_product + '\"?');

                    }
                });




                $('#modal_confirm_delete').modal('show');

            });

        });
    </script>




</head>

<body>
















    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">

            <h1 class="logo">Serv<span class="x_logo">X</span></h1>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">

                    <li class="nav-item">
                        <a class="nav-link" href="../../index.php">Início<span class="sr-only">(current)</span></a>
                    </li>


                    <li class="nav-item">
                        <a class="nav-link" href="#" role="button">OS</a>
                    </li>


                    <li class="nav-item">
                        <a class="nav-link" href="#" role="button">Clientes</a>
                    </li>


                    <li class="nav-item active">
                        <a class="nav-link" href="products.php" role="button">Produtos</a>
                    </li>


                    <li class="nav-item">
                        <a class="nav-link" href="#" role="button">Serviços</a>
                    </li>




                    <li class="nav-item">
                        <a class="nav-link" href="#" role="button">Técnicos</a>
                    </li>


                    <li class="nav-item">
                        <a class="nav-link" href="#" role="button">Usuários</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#">Sair<span class="sr-only">(current)</span></a>
                    </li>





                </ul>

            </div>
        </div>
    </nav>




    <div class="container">


        <div class="row">
            <div class="col-md-12">
                <h1 class="panel_title">Produtos</h1>
                <button type="button" class="btn btn-primary" id="btn_open_create_product_modal">Adicionar Produto</button>

            </div>
        </div>
    </div>


    <div class="container">
        <div class="table_panel">



            <table id="list-products" class="display" style="width:100%">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Grupo</th>
                        <th>Marca</th>
                        <th>Custo</th>
                        <th>Margem</th>
                        <th>Preço</th>
                        <th>Unidade</th>

                    </tr>
                </thead>
                <tbody id="table_body"></tbody>
            </table>






        </div>
    </div>

    <!-- Modal Create Product -->

    <div class="modal" id="modal_create_product" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel" style="text-align: center;">Editar</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="form_edit_product">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-2"><label for="id_prod">ID </label><input id="id_prod_create" name="id_prod"
                                        type="text" class="form-control" style="pointer-events: none;" readonly></div>
                                <div class="col-md-10"></div>
                            </div>

                            <div class="row">
                                <div class="col-md-6"><label for="nome_prod">Nome </label><input id="nome_prod_create"
                                        name="nome_prod" type="text" class="form-control"></div>
                                <div class="col-md-3"><label for="marca_prod">Marca </label><input id="marca_prod_create"
                                        name="marca_prod" type="text" class="form-control"></div>
                                <div class="col-md-3"><label for="grupo_prod">Grupo </label><input id="grupo_prod_create"
                                        name="grupo_prod" type="text" class="form-control"></div>
                            </div>



                            <div class="row">
                                <div class="col-md-3"><label for="custo_prod">Custo (R$) </label><input style="" id="custo_prod_create"
                                        name="custo_prod" type="text" class="form-control"></div>
                                <div class="col-md-3"><label for="margem_prod">Margem (%) </label><input id="margem_prod_create"
                                        name="margem_prod" type="text" class="form-control"></div>
                                <div class="col-md-3"> <label for="preco_prod">Preço (R$) </label><input id="preco_prod_create"
                                        name="preco_prod" type="text" class="form-control"></div>
                                <div class="col-md-3"> <label for="unidade_prod">Unidade</label>
                                    <select id="unidade_prod_create" name="unidade_prod" class="form-control">
                                        <option selected>Escolha...</option>
                                        <option value="Pç.">Pç.</option>
                                        <option value="m">m</option>
                                        <option value="Pct.">Pct.</option>
                                        <option value="Cx.">Cx.</option>
                                    </select></div>
                            </div>


                            <div class="row">
                                <div class="col-md-12"><label for="desc_prod">Descrição </label><textarea rows="3" name="desc_prod"
                                        id="desc_prod_create" cols="30" rows="10" class="form-control"></textarea></div>
                            </div>







                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" data-dismiss="modal" class="btn btn-danger mr-auto" id="btn_exit_create_product">Sair</button>
                    <button type="button" class="btn btn-primary" id="btn_create_product">Salvar</button>
                </div>
            </div>
        </div>
    </div>


    <!-- /Modal Create Product -->


    <!-- Modal Edit Product -->


    <div class="modal" id="modal_edit_product" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel" style="text-align: center;">Editar</h5>
                    <button type="button" class="close" id="btn_close_product_edition" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="form_edit_product">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-2"><label for="id_prod">ID </label><input id="id_prod" name="id_prod"
                                        type="text" class="form-control" style="pointer-events: none;" readonly></div>
                                <div class="col-md-10"></div>
                            </div>

                            <div class="row">
                                <div class="col-md-6"><label for="nome_prod">Nome </label><input id="nome_prod" name="nome_prod"
                                        type="text" class="form-control"></div>
                                <div class="col-md-3"><label for="marca_prod">Marca </label><input id="marca_prod" name="marca_prod"
                                        type="text" class="form-control"></div>
                                <div class="col-md-3"><label for="grupo_prod">Grupo </label><input id="grupo_prod" name="grupo_prod"
                                        type="text" class="form-control"></div>
                            </div>



                            <div class="row">
                                <div class="col-md-3"><label for="custo_prod">Custo (R$) </label><input style="" id="custo_prod"
                                        name="custo_prod" type="text" class="form-control"></div>
                                <div class="col-md-3"><label for="margem_prod">Margem (%) </label><input id="margem_prod"
                                        name="margem_prod" type="text" class="form-control"></div>
                                <div class="col-md-3"> <label for="preco_prod">Preço (R$) </label><input id="preco_prod"
                                        name="preco_prod" type="text" class="form-control"></div>
                                <div class="col-md-3"> <label for="unidade_prod">Unidade</label>
                                    <select id="unidade_prod" name="unidade_prod" class="form-control">
                                        <option selected>Escolha...</option>
                                        <option value="Pç.">Pç.</option>
                                        <option value="m">m</option>
                                        <option value="Pct.">Pct.</option>
                                        <option value="Cx.">Cx.</option>
                                    </select></div>
                            </div>


                            <div class="row">
                                <div class="col-md-12"><label for="desc_prod">Descrição </label><textarea rows="3" name="desc_prod"
                                        id="desc_prod" cols="30" rows="10" class="form-control"></textarea></div>
                            </div>







                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger mr-auto" id="btn_delete_product">Excluir</button>
                    <button type="button" class="btn btn-primary" id="btn_update_product">Salvar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- /Modal Edit Product -->



    <div class="modal" tabindex="-1" role="dialog" id="modal_confirm_delete">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Excluir Produto</h5>
                    <button type="button" class="close btn_cancel_product_deletion" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="txt_delete_product">Tem certeza que deseja excluir o produto?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" id="btn_confirm_product_deletion">Excluir</button>
                    <button type="button" class="btn btn-primary btn_cancel_product_deletion" data-dismiss="modal">Voltar</button>
                </div>
            </div>
        </div>
    </div>



    <div class="modal" tabindex="-1" role="dialog" id="modal_confirm_update_product">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Salvar Alterações</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="txt_update_product">Deseja salvar as alterações?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" id="btn_confirm_product_update">Salvar</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Sair</button>
                </div>
            </div>
        </div>
    </div>


    <div class="modal" tabindex="-1" role="dialog" id="modal_update_product_success_message">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Alterações Salvas</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="txt_update_product">Produto atualizado com sucesso!</p>
                </div>
                <div class="modal-footer">

                    <button type="button" class="btn btn-primary" data-dismiss="modal">Sair</button>
                </div>
            </div>
        </div>
    </div>





    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k"
        crossorigin="anonymous"></script>




</body>

</html>