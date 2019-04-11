<?php; ?>
<!doctype html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>Produtos</title>
    <link href="../../apps/css/autocomplete.css" rel="stylesheet">
    <link href="../../apps/css/datatable-custom.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/1.10.18/css/dataTables.bootstrap4.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">

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
    <script src="../../sys/lib/functions.js"></script>
    <script src="products_view.js"></script>
    <script src="../../apps/js/jquery.mask.min.js"></script>

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
                        <a class="nav-link" href="os_view.php" role="button">OS</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="customers_view.php" role="button">Clientes</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="#" role="button">Produtos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="services_view.php" role="button">Serviços</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="technicians_view.php" role="button">Técnicos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="users_view.php" role="button">Usuários</a>
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
                        <th>Unidade</th>
                        <th>Marca</th>
                        <th>Grupo</th>
                        <th>Custo(R$)</th>
                        <th>Margem(%)</th>
                        <th>Preço(R$)</th>
                    </tr>
                </thead>
                <tbody id="table_body"></tbody>
            </table>
        </div>
    </div>

    <!-- Modal Create Product -->
    <div class="modal" id="modal_create_product" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Adicionar</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="form_create_product">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6"><label for="prod_name_create">Nome
                                    </label><input id="prod_name_create" name="prod_name" type="text"
                                        class="form-control uppercase" autocomplete="off" required></div>
                                <div class="col-md-3"><label for="prod_brand_create">Marca </label><input
                                        id="prod_brand_create" name="prod_brand" type="text"
                                        class="form-control uppercase" autocomplete="off" required></div>
                                <div class="col-md-3"><label for="prod_group_create">Grupo </label><input
                                        id="prod_group_create" name="prod_group" type="text"
                                        class="form-control uppercase" autocomplete="off" required></div>
                            </div>
                            <div class="row">
                                <div class="col-md-3"><label for="prod_cost_create">Custo (R$) </label><input
                                        id="prod_cost_create" name="prod_cost" type="text" class="form-control"
                                        required></div>
                                <div class="col-md-3"><label for="prod_markup_create">Margem (%) </label><input
                                        value="60" id="prod_markup_create" name="prod_markup" type="text"
                                        class="form-control" required>
                                </div>
                                <div class="col-md-3"> <label for="prod_price_create">Preço (R$) </label><input
                                        id="prod_price_create" name="prod_price" type="text" class="form-control"
                                        required></div>
                                <div class="col-md-3"> <label for="prod_unit_create">Unidade</label>
                                    <select id="prod_unit_create" name="prod_unit" class="form-control" required>
                                        <option value="">Escolha...</option>
                                        <option>Pç.</option>
                                        <option>m</option>
                                        <option>Pct.</option>
                                        <option>Cx.</option>
                                    </select></div>
                            </div>
                            <div class="row">
                                <div class="col-md-12"><label for="prod_desc_create">Descrição </label><textarea
                                        rows="3" name="prod_desc" id="prod_desc_create" cols="30" rows="10"
                                        class="form-control uppercase"></textarea></div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" data-dismiss="modal" class="btn btn-danger mr-auto"
                        id="btn_exit_creating_product">Sair</button>
                    <button type="submit" form="form_create_product" class="btn btn-primary"
                        id="btn_create_product">Salvar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- /Modal Create Product -->

    <!-- Modal Update Product -->
    <div class="modal" id="modal_update_product" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel" style="text-align: center;">Editar</h5>
                    <button type="button" class="close" id="btn_close_product_update" data-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="form_update_product">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-2"><label for="prod_id">ID </label><input id="prod_id" name="prod_id"
                                        type="text" class="form-control" style="pointer-events: none;" readonly></div>
                            </div>
                            <div class="row">
                                <div class="col-md-6"><label for="prod_name">Nome </label><input id="prod_name"
                                        name="prod_name" type="text" class="form-control uppercase" autocomplete="off"
                                        required>
                                </div>
                                <div class="col-md-3"><label for="prod_brand">Marca </label><input id="prod_brand"
                                        name="prod_brand" type="text" class="form-control uppercase" autocomplete="off"
                                        required>
                                </div>
                                <div class="col-md-3"><label for="prod_group">Grupo </label><input id="prod_group"
                                        name="prod_group" type="text" class="form-control uppercase" autocomplete="off"
                                        required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3"><label for="prod_cost">Custo (R$) </label><input style=""
                                        id="prod_cost" name="prod_cost" type="text" class="form-control" required>
                                </div>
                                <div class="col-md-3"><label for="prod_markup">Margem (%) </label><input
                                        id="prod_markup" name="prod_markup" type="text" class="form-control" required>
                                </div>
                                <div class="col-md-3"> <label for="prod_price">Preço (R$) </label><input id="prod_price"
                                        name="prod_price" type="text" class="form-control" required>
                                </div>
                                <div class="col-md-3"> <label for="prod_unit">Unidade</label>
                                    <select id="prod_unit" name="prod_unit" class="form-control" required>
                                        <option>Pç.</option>
                                        <option>m</option>
                                        <option>Pct.</option>
                                        <option>Cx.</option>
                                    </select></div>
                            </div>
                            <div class="row">
                                <div class="col-md-12"><label for="prod_desc">Descrição </label><textarea rows="3"
                                        name="prod_desc" id="prod_desc" cols="30" rows="10"
                                        class="form-control uppercase"></textarea></div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger mr-auto" id="btn_delete_product">Excluir</button>
                    <button type="submit" form="form_update_product" class="btn btn-primary"
                        id="btn_update_product">Salvar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- /Modal Edit Product -->

    <!-- Modal Delete Product -->
    <div class="modal" tabindex="-1" role="dialog" id="modal_confirm_delete">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Excluir Produto</h5>
                    <button type="button" class="close btn_cancel_product_deletion" data-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="txt_delete_product">Tem certeza que deseja excluir o produto?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" id="btn_confirm_product_deletion">Excluir</button>
                    <button type="button" class="btn btn-primary btn_cancel_product_deletion"
                        data-dismiss="modal">Voltar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Delete Product -->

    <!-- Modal Confirm Update Product -->
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
                    <button type="submit" form="form_update_product" class="btn btn-primary"
                        id="btn_confirm_product_update">Salvar</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Sair</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Confirm Update Product -->

    <!-- Modal Update Product Success -->
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

                    <button type="button" class="btn btn-primary" id="modal_close_update_product_success_message"
                        data-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Update Product Success -->

    <!-- Modal Create Product Success -->
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

                    <button type="button" class="btn btn-primary" id="modal_close_create_product_success_message"
                        data-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Create Product Success -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
        integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
        integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous">
    </script>

</body>

</html>