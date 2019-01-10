<!doctype html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">


    <title>Home</title>

    <link href="apps/css/bootstrap.min.css" rel="stylesheet">


    <!-- Documentation extras -->

    <link href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css" rel="stylesheet">

    <link href="apps/css/docs.min.css" rel="stylesheet">
    <link href="apps/css/all.min.css" rel="stylesheet">



    <link rel="stylesheet" href="apps/css/jquery.dataTables.min.css">
    <script src="apps/js/jquery-3.3.1.js">
    </script>
    <script src="apps/js/jquery.dataTables.min.js">
    </script>
    <script src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js">
    </script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/css/bootstrap.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css">
    <link href="apps/css/style.css" rel="stylesheet">






    <script type="text/javascript" language="javascript">
        $(document).ready(function() {
            var table = $('#list-products').DataTable({
                "processing": true,
                "serverSide": true,
                "language": {
                    "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
                },
                "ajax": {
                    "url": "get_produtos.php",
                    "type": "POST"
                }
            });




            $('#table_body').on('click', 'tr', function() {
                var data = table.row(this).data();
                //alert(data[0]);
                $('#modal_edit_product').modal('show');
            });




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






            $("#custo_prod").keyup(function() {

                var string_custo_prod = $("#custo_prod").val().toString();

                var x = string_custo_prod.length;
                var simbolo_decimal = string_custo_prod.substring(x - 3, x);
                var have_comma = string_custo_prod.includes(",");
                var have_dot = string_custo_prod.includes(".");


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
                        <a class="nav-link" href="index.php">Início<span class="sr-only">(current)</span></a>
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




    <div class="modal fade" id="modal_edit_product" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel" style="text-align: center;">Editar</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
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
                                    <select id="unidade_prod" id="unidade_prod" class="form-control">
                                        <option selected>Escolha...</option>
                                        <option>Pç.</option>
                                        <option>m</option>
                                        <option>Pct.</option>
                                        <option>Cx.</option>
                                    </select></div>
                            </div>


                            <div class="row">
                                <div class="col-md-12"><label for="descricao_prod">Descrição </label><textarea rows="3"
                                        name="descricao_prod" id="descricao_prod" cols="30" rows="10" class="form-control"></textarea></div>
                            </div>







                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger mr-auto">Excluir</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary">Salvar</button>
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







    <script src="apps/js/popper.min.js">
    </script>
    <script src="apps/js/bootstrap.min.js">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js">
    </script>
    <script src="apps/js/docs.min.js">
    </script>
</body>

</html>