<!doctype html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>Usuários</title>
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
    <script src="users_view.js"></script>
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
                        <a class="nav-link" href="services_view.php" role="button">Serviços</a>
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
                <h1 class="panel_title">Usuários</h1>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="table_panel">
            <table id="list-users" class="display" style="width:100%">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Login</th>
                        <th>Perfil</th>
                    </tr>
                </thead>
                <tbody id="table_body"></tbody>
            </table>
        </div>
    </div>

    <!-- Modal Create User -->
    <div class="modal" id="modal_create_user" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
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
                    <form id="form_create_user">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6"><label for="user_login_create">Login
                                    </label><input id="user_login_create" name="user_login" type="text"
                                        class="form-control" autocomplete="off" required>
                                </div>
                                <div class="col-md-6"><label for="user_profile_create">Perfil </label> <select
                                        class="form-control" id="user_profile_create" name="user_profile">
                                        <option>admin</option>
                                        <option>user</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6"><label for="user_password_create">Senha</label><input
                                        id="user_password_create" name="user_password" type="password"
                                        class="form-control" autocomplete="off" required>
                                </div>
                                <div class="col-md-6"><label for="user_password_confirmation_create">Senha (outra
                                        vez)</label><input id="user_password_confirmation_create"
                                        name="user_password_confirmation" type="password" class="form-control"
                                        autocomplete="off" required>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" data-dismiss="modal" class="btn btn-danger mr-auto"
                        id="btn_exit_creating_user">Sair</button>
                    <button type="submit" form="form_create_user" class="btn btn-primary"
                        id="btn_create_user">Salvar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- /Modal Create User -->

    <!-- Modal Update User -->
    <div class="modal" id="modal_update_user" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel" style="text-align: center;">Editar</h5>
                    <button type="button" class="close" id="btn_close_user_update" data-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="form_update_user">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-2"><label for="user_id">ID </label><input id="user_id" name="user_id"
                                        type="text" class="form-control" style="pointer-events: none" readonly></div>
                            </div>
                            <div class="row">
                                <div class="col-md-6"><label for="user_login">Login
                                    </label><input id="user_login" name="user_login" type="text" class="form-control"
                                        autocomplete="off" required>
                                </div>
                                <div class="col-md-6"><label for="user_profile">Perfil </label> <select
                                        class="form-control" id="user_profile" name="user_profile">
                                        <option>admin</option>
                                        <option>user</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6"><label for="user_password">Nova Senha</label><input
                                        id="user_password" name="user_password" type="password" class="form-control"
                                        autocomplete="off" required>
                                </div>
                                <div class="col-md-6"><label for="user_password_confirmation">Nova Senha (outra
                                        vez)</label><input id="user_password_confirmation"
                                        name="user_password_confirmation" type="password" class="form-control"
                                        autocomplete="off" required>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger mr-auto" id="btn_delete_user">Excluir</button>
                    <button type="submit" form="form_update_user" class="btn btn-primary"
                        id="btn_update_user">Salvar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- /Modal Update User -->

    <!-- Modal Delete User -->
    <div class="modal" tabindex="-1" role="dialog" id="modal_confirm_delete">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Excluir Usuário</h5>
                    <button type="button" class="close btn_cancel_user_deletion" data-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="txt_delete_user">Tem certeza que deseja excluir o usuário?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" id="btn_confirm_user_deletion">Excluir</button>
                    <button type="button" class="btn btn-primary btn_cancel_user_deletion"
                        data-dismiss="modal">Voltar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Delete User -->

    <!-- Modal Confirm Password -->
    <div class="modal" tabindex="-1" role="dialog" id="modal_confirm_password">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirmar senha</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="form_confirm_password">
                        <input id="user_id_confirm_password" name="user_id" type="hidden">
                        <label for="confirm_user_password">Senha</label><input type="password" class="form-control"
                            name="user_password" id="confirm_user_password" required>
                    </form>

                </div>
                <div class="modal-footer">
                    <button type="submit" form="form_confirm_password" class="btn btn-primary"
                        id="btn_confirm_password">Enviar</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Sair</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Confirm Password -->

    <!-- Modal Update User Success -->
    <div class="modal" tabindex="-1" role="dialog" id="modal_update_user_success_message">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Alterações Salvas</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="txt_update_user">Usuário atualizado com sucesso!</p>
                </div>
                <div class="modal-footer">

                    <button type="button" class="btn btn-primary" id="modal_close_update_user_success_message"
                        data-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Update User Success -->

    <!-- Modal Create User Success -->
    <div class="modal" tabindex="-1" role="dialog" id="modal_create_user_success_message">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Novo Usuário</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Usuário criado com sucesso!</p>
                </div>
                <div class="modal-footer">

                    <button type="button" class="btn btn-primary" id="modal_close_create_user_success_message"
                        data-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Create User Success -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
        integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
        integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous">
    </script>

</body>

</html>