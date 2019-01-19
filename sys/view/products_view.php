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
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.5.2/css/buttons.dataTables.min.css">
    <link href="../../apps/css/jquery-ui.min.css" rel="stylesheet">
    <link href="../../apps/css/jquery-ui.structure.min.css" rel="stylesheet">
    <link href="../../apps/css/jquery-ui.theme.min.css" rel="stylesheet">
    <link href="../../apps/css/autocomplete.css" rel="stylesheet">
    <link href="../../apps/css/style.css" rel="stylesheet">

    <script src="https://code.jquery.com/jquery-3.3.1.min.js">
    </script>
    <script src="../../apps/js/autocomplete.js"></script>
    <script src="https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js">
    </script>
    <script src="https://cdn.datatables.net/1.10.18/js/dataTables.bootstrap4.min.js">
    </script>
    <script src="https://cdn.datatables.net/buttons/1.5.2/js/dataTables.buttons.min.js">
    </script>

    <script src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.colVis.min.js">
    </script>
    <script src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.flash.min.js">
    </script>
    <script src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.print.min.js">
    </script>
    <script src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.html5.min.js">
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

    function isFloat(n) {
        return parseFloat(n) == n && n != 0;
    }
    </script>



    <script src="products_view.js">
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
                    <h5 class="modal-title" id="exampleModalLabel" style="text-align: center;">Adicionar</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form autocomplete="off" id="form_create_product">
                        <div class="form-group">



                            <br />

                            <div class="row">
                                <div class="col-md-6"><label for="nome_prod">Nome </label><input id="nome_prod_create"
                                        name="nome_prod" type="text" class="form-control"></div>
                                <div class="col-md-3 autocomplete"><label for="marca_prod">Marca </label><input id="marca_prod_create"
                                        name="marca_prod" type="text" class="form-control"></div>
                                <div class="col-md-3"><label for="grupo_prod">Grupo </label><input id="grupo_prod_create"
                                        name="grupo_prod" type="text" class="form-control"></div>
                            </div>



                            <div class="row">
                                <div class="col-md-3"><label for="custo_prod">Custo (R$) </label><input value="0,00"
                                        style="" id="custo_prod_create" name="custo_prod" type="text" class="form-control"></div>
                                <div class="col-md-3"><label for="margem_prod">Margem (%) </label><input value="60" id="margem_prod_create"
                                        name="margem_prod" type="text" class="form-control"></div>
                                <div class="col-md-3"> <label for="preco_prod">Preço (R$) </label><input value="0,00"
                                        id="preco_prod_create" name="preco_prod" type="text" class="form-control"></div>
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

                    <button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" tabindex="-1" role="dialog" id="modal_create_product_success_message">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Novo Produto</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Produto criado com sucesso!</p>
                </div>
                <div class="modal-footer">

                    <button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>
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