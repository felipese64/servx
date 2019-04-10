<!doctype html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>Ordens de serviço</title>
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
    <script src="os_view.js"></script>
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
                    <li class="nav-item active">
                        <a class="nav-link" href="#" role="button">OS</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="customers_view.php" role="button">Clientes</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="products_view.php" role="button">Produtos</a>
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
                <h1 class="panel_title">Ordens de Serviço</h1>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="table_panel">
            <table id="list-os" class="display" style="width:100%">
                <thead>
                    <tr>
                        <th>OS</th>
                        <th>Data</th>
                        <th>Status</th>
                        <th>Cliente</th>
                        <th>Endereço</th>
                    </tr>
                </thead>
                <tbody id="table_body"></tbody>
            </table>
        </div>
    </div>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
        integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
        integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous">
    </script>

</body>

</html>