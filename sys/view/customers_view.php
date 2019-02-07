<!doctype html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>Clientes</title>
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
    <script src="customers_view.js"></script>

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
                    <li class="nav-item active">
                        <a class="nav-link" href="#" role="button">Clientes</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="products_view.php" role="button">Produtos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="services_view.php" role="button">Serviços</a>
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
                <h1 class="panel_title">Clientes</h1>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="table_panel">
            <table id="list-customers" class="display" style="width:100%">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Telefone</th>
                        <th>Celular</th>
                        <th>E-mail</th>
                        <th>CPF/CNPJ</th>
                    </tr>
                </thead>
                <tbody id="table_body"></tbody>
            </table>
        </div>
    </div>

    <!-- Modal Create customer -->
    <div class="modal" id="modal_create_customer" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
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
                    <form id="form_create_customer">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6"><label for="customer_name_create">Nome
                                    </label><input id="customer_name_create" name="customer_name" type="text"
                                        class="form-control"></div>
                                <div class="col-md-3"><label for="customer_natural_legal_create">Tipo </label><select
                                        id="customer_natural_legal_create" name="customer_natural_legal"
                                        class="form-control">
                                        <option selected value="Pessoa Física">Pessoa Física</option>
                                        <option value="Pessoa Jurídica">Pessoa Jurídica</option>
                                    </select></div>
                                <div class="col-md-3"><label for="customer_telephone_create">Telefone
                                    </label><input id="customer_telephone_create" name="customer_telephone" type="text"
                                        class="form-control"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-6"><label for="customer_trade_name_create">Nome Fantasia/Apelido
                                    </label><input id="customer_trade_name_create" name="customer_trade_name"
                                        type="text" class="form-control"></div>
                                <div class="col-md-3"><label for="customer_rg_create">RG </label><input
                                        id="customer_rg_create" name="customer_rg" type="text" class="form-control">
                                </div>
                                <div class="col-md-3"><label for="customer_cellphone_create">Celular
                                    </label><input id="customer_cellphone_create" name="customer_cellphone" type="text"
                                        class="form-control"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-6"><label for="customer_email_create">E-mail </label><input
                                        id="customer_email_create" name="customer_email" type="text"
                                        class="form-control"></div>

                                <div class="col-md-3"><label for="customer_cpf_create">CPF
                                    </label><input id="customer_cpf_create" name="customer_cpf" type="text"
                                        class="form-control"></div>

                                <div class="col-md-3"><label for="customer_adress_type_create">Tipo de endereço
                                    </label><select id="customer_adress_type_create" name="customer_adress_type"
                                        class="form-control">
                                        <option selected value="Residência">Residência</option>
                                        <option value="Apartamento">Apartamento</option>
                                        <option value="Comércio">Comércio</option>
                                        <option value="Industria">Industria</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6"><label for="customer_adress_create">Endereço
                                    </label><input id="customer_adress_create" name="customer_adress" type="text"
                                        class="form-control"></div>
                                <div class="col-md-2"><label for="customer_adress_number_create">Nº
                                    </label><input id="customer_adress_number_create" name="customer_adress_number"
                                        type="text" class="form-control"></div>
                                <div class="col-md-4"><label for="customer_zone_create">Bairro </label><input
                                        id="customer_zone_create" name="customer_zone" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4"><label for="customer_adress_complements_create">Complemento
                                    </label><input id="customer_adress_complements_create"
                                        name="customer_adress_complements" type="text" class="form-control"></div>

                                <div class="col-md-2"><label for="customer_cep_create">CEP </label><input
                                        id="customer_cep_create" name="customer_cep" type="text" class="form-control">
                                </div>
                                <div class="col-md-4"><label for="customer_city_create">Cidade
                                    </label>
                                    <select id="customer_city_create" name="customer_city" class="form-control">
                                        <option selected value="Campo Grande">Campo Grande</option>
                                        <option value="São Paulo">São Paulo</option>
                                        <option value="Rio de Janeiro">Rio de Janeiro</option>
                                    </select>
                                </div>
                                <div class="col-md-2"><label for="customer_state_create">Estado
                                    </label>
                                    <select id="customer_state_create" name="customer_state" class="form-control">
                                        <option selected value="MS">MS</option>
                                        <option value="SP">SP</option>
                                        <option value="RJ">RJ</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12"><label for="customer_obs_create">Observações </label><textarea
                                        rows="1" name="customer_obs" id="customer_obs_create" cols="30" rows="10"
                                        class="form-control"></textarea></div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" data-dismiss="modal" class="btn btn-danger mr-auto"
                        id="btn_exit_creating_customer">Sair</button>
                    <button type="button" class="btn btn-primary" id="btn_create_customer">Salvar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- /Modal Create customer -->

    <!-- Modal Edit customer -->
    <div class="modal" id="modal_edit_customer" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel" style="text-align: center;">Editar</h5>
                    <button type="button" class="close" id="btn_close_customer_edition" data-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="form_edit_customer">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6"><label for="customer_name">Nome
                                    </label><input id="customer_name" name="customer_name" type="text"
                                        class="form-control"></div>
                                <div class="col-md-3"><label for="customer_natural_legal">Tipo </label><select
                                        id="customer_natural_legal" name="customer_natural_legal" class="form-control">
                                        <option selected value="Pessoa Física">Pessoa Física</option>
                                        <option value="Pessoa Jurídica">Pessoa Jurídica</option>
                                    </select></div>
                                <div class="col-md-3"><label for="customer_telephone">Telefone
                                    </label><input id="customer_telephone" name="customer_telephone" type="text"
                                        class="form-control"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-6"><label for="customer_trade_name">Nome Fantasia/Apelido
                                    </label><input id="customer_trade_name" name="customer_trade_name" type="text"
                                        class="form-control"></div>
                                <div class="col-md-3"><label for="customer_rg">RG </label><input id="customer_rg"
                                        name="customer_rg" type="text" class="form-control">
                                </div>
                                <div class="col-md-3"><label for="customer_cellphone">Celular
                                    </label><input id="customer_cellphone" name="customer_cellphone" type="text"
                                        class="form-control"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-6"><label for="customer_email">E-mail </label><input
                                        id="customer_email" name="customer_email" type="text" class="form-control">
                                </div>

                                <div class="col-md-3"><label for="customer_cpf">CPF
                                    </label><input id="customer_cpf" name="customer_cpf" type="text"
                                        class="form-control"></div>

                                <div class="col-md-3"><label for="customer_adress_type">Tipo de endereço
                                    </label><select id="customer_adress_type" name="customer_adress_type"
                                        class="form-control">
                                        <option selected value="Residência">Residência</option>
                                        <option value="Apartamento">Apartamento</option>
                                        <option value="Comércio">Comércio</option>
                                        <option value="Industria">Industria</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6"><label for="customer_adress">Endereço
                                    </label><input id="customer_adress" name="customer_adress" type="text"
                                        class="form-control"></div>
                                <div class="col-md-2"><label for="customer_adress_number">Nº
                                    </label><input id="customer_adress_number" name="customer_adress_number" type="text"
                                        class="form-control"></div>
                                <div class="col-md-4"><label for="customer_zone">Bairro </label><input
                                        id="customer_zone" name="customer_zone" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4"><label for="customer_adress_complements">Complemento
                                    </label><input id="customer_adress_complements" name="customer_adress_complements"
                                        type="text" class="form-control"></div>

                                <div class="col-md-2"><label for="customer_cep">CEP </label><input id="customer_cep"
                                        name="customer_cep" type="text" class="form-control">
                                </div>
                                <div class="col-md-4"><label for="customer_city">Cidade
                                    </label>
                                    <select id="customer_city" name="customer_city" class="form-control">
                                        <option selected value="Campo Grande">Campo Grande</option>
                                        <option value="São Paulo">São Paulo</option>
                                        <option value="Rio de Janeiro">Rio de Janeiro</option>
                                    </select>
                                </div>
                                <div class="col-md-2"><label for="customer_state">Estado
                                    </label>
                                    <select id="customer_state" name="customer_state" class="form-control">
                                        <option selected value="MS">MS</option>
                                        <option value="SP">SP</option>
                                        <option value="RJ">RJ</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12"><label for="customer_obs">Observações </label><textarea rows="1"
                                        name="customer_obs" id="customer_obs" cols="30" rows="10"
                                        class="form-control"></textarea></div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger mr-auto" id="btn_delete_customer">Excluir</button>
                    <button type="button" class="btn btn-primary" id="btn_update_customer">Salvar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- /Modal Edit customer -->

    <!-- Modal Delete customer -->
    <div class="modal" tabindex="-1" role="dialog" id="modal_confirm_delete">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Excluir Cliente</h5>
                    <button type="button" class="close btn_cancel_customer_deletion" data-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="txt_delete_customer">Tem certeza que deseja excluir o cliente?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" id="btn_confirm_customer_deletion">Excluir</button>
                    <button type="button" class="btn btn-primary btn_cancel_customer_deletion"
                        data-dismiss="modal">Voltar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Delete customer -->

    <!-- Modal Confirm Update customer -->
    <div class="modal" tabindex="-1" role="dialog" id="modal_confirm_update_customer">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Salvar Alterações</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="txt_update_customer">Deseja salvar as alterações?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="btn_confirm_customer_update">Salvar</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Sair</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Confirm Update customer -->

    <!-- Modal Update customer Success -->
    <div class="modal" tabindex="-1" role="dialog" id="modal_update_customer_success_message">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Alterações Salvas</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="txt_update_customer">Cliente atualizado com sucesso!</p>
                </div>
                <div class="modal-footer">

                    <button type="button" class="btn btn-primary" id="modal_close_update_customer_success_message"
                        data-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Update customer Success -->

    <!-- Modal Create customer Success -->
    <div class="modal" tabindex="-1" role="dialog" id="modal_create_customer_success_message">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Novo Cliente</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Cliente criado com sucesso!</p>
                </div>
                <div class="modal-footer">

                    <button type="button" class="btn btn-primary" id="modal_close_create_customer_success_message"
                        data-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Create customer Success -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
        integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
        integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous">
    </script>

</body>

</html>