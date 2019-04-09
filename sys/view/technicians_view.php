<!doctype html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>Técnicos</title>
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
    <script src="technicians_view.js"></script>
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
                        <a class="nav-link" href="#" role="button">OS</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="customers_view.php" role="button">Clientes</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="products_view.php" role="button">Produtos</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="technicians_view.php" role="button">Serviços</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" role="button">Técnicos</a>
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
                <h1 class="panel_title">Técnicos</h1>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="table_panel">
            <table id="list-technicians" class="display" style="width:100%">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody id="table_body"></tbody>
            </table>
        </div>
    </div>

    <!-- Modal Create technician -->
    <div class="modal" id="modal_create_technician" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Adicionar</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="form_create_technician">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-12"><label for="technician_name_create">Nome
                                    </label><input id="technician_name_create" name="technician_name" type="text"
                                        class="form-control uppercase" autocomplete="off" required></div>

                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" data-dismiss="modal" class="btn btn-danger mr-auto"
                        id="btn_exit_creating_technician">Sair</button>
                    <button type="submit" form="form_create_technician" class="btn btn-primary"
                        id="btn_create_technician">Salvar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- /Modal Create technician -->

    <!-- Modal Update technician -->
    <div class="modal" id="modal_update_technician" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel" style="text-align: center;">Editar</h5>
                    <button type="button" class="close" id="btn_close_technician_update" data-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="form_update_technician">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-2"><label for="technician_id">ID </label><input id="technician_id"
                                        name="technician_id" type="text" class="form-control"
                                        style="pointer-events: none;" readonly></div>
                                <div class="col-md-4"><label for="technician_registry_date">ID </label><input
                                        id="technician_registry_date" name="technician_registry_date" type="text"
                                        class="form-control" style="pointer-events: none;" readonly></div>
                                <div class="col-md-6"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-12"><label for="technician_name">Nome
                                    </label><input id="technician_name" name="technician_name" type="text"
                                        class="form-control uppercase" autocomplete="off" required>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger mr-auto" id="btn_delete_technician">Excluir</button>
                    <button type="submit" form="form_update_technician" class="btn btn-primary"
                        id="btn_update_technician">Salvar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- /Modal Update technician -->

    <!-- Modal Delete technician -->
    <div class="modal" tabindex="-1" role="dialog" id="modal_confirm_delete">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Excluir Técnico</h5>
                    <button type="button" class="close btn_cancel_technician_deletion" data-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="txt_delete_technician">Tem certeza que deseja excluir o técnico?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" id="btn_confirm_technician_deletion">Excluir</button>
                    <button type="button" class="btn btn-primary btn_cancel_technician_deletion"
                        data-dismiss="modal">Voltar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Delete technician -->

    <!-- Modal Confirm Update technician -->
    <div class="modal" tabindex="-1" role="dialog" id="modal_confirm_update_technician">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Salvar Alterações</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="txt_update_technician">Deseja salvar as alterações?</p>
                </div>
                <div class="modal-footer">
                    <button type="submit" form="form_update_technician" class="btn btn-primary"
                        id="btn_confirm_technician_update">Salvar</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Sair</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Confirm Update technician -->

    <!-- Modal Update technician Success -->
    <div class="modal" tabindex="-1" role="dialog" id="modal_update_technician_success_message">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Alterações Salvas</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="txt_update_technician">Técnico atualizado com sucesso!</p>
                </div>
                <div class="modal-footer">

                    <button type="button" class="btn btn-primary" id="modal_close_update_technician_success_message"
                        data-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Update technician Success -->

    <!-- Modal Create technician Success -->
    <div class="modal" tabindex="-1" role="dialog" id="modal_create_technician_success_message">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Novo Técnico</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Técnico criado com sucesso!</p>
                </div>
                <div class="modal-footer">

                    <button type="button" class="btn btn-primary" id="modal_close_create_technician_success_message"
                        data-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Create technician Success -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
        integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
        integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous">
    </script>

</body>

</html>