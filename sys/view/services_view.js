$(document).ready(function () {
    var table = $('#list-services').DataTable({
        "processing": true,
        "serverSide": true,
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
        },
        "initComplete": function (settings, json) {

            $('#list-services_filter').prepend(
                '<button type="button" class="btn btn-primary" id="btn_open_create_service_modal">Adicionar Serviço</button>'
            );

            $('#btn_open_create_service_modal').on("click", function () {

                $('#modal_create_service').modal('show');

            });

        },

        "ajax": {
            "url": "../controller/services/datatable.php",
            "type": "POST"
        }
    });

    //$('#modal_edit_service').modal('show');

});