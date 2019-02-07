$(document).ready(function () {
    var table = $('#list-customers').DataTable({
        "processing": true,
        "serverSide": true,
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
        },
        "initComplete": function (settings, json) {

            $('#list-customers_filter').prepend(
                '<button type="button" class="btn btn-primary btn_open_create_modal" id="btn_open_create_customer_modal">Adicionar Cliente</button>'
            );

            $('#btn_open_create_customer_modal').on("click", function () {

                $('#modal_create_customer').modal('show');

            });

        },

        "ajax": {
            "url": "../controller/customers/datatable.php",
            "type": "POST"
        }
    });


});