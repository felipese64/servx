//----------------------------------------------DATATABLE---------------------------------------------------------

$(document).ready(function () {
    var table = $('#list-os').DataTable({
        "processing": true,
        "serverSide": true,
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
        },
        "initComplete": function (settings, json) {
            add_button_create_os();
        },

        "ajax": {
            "url": "../controller/os/datatable.php",
            "type": "POST"
        }
    });

    function add_button_create_os() {

        $('#list-os_filter').prepend(
            '<button type="button" class="btn btn-primary btn_open_create_modal" id="btn_open_create_os_modal">Adicionar OS</button>'
        );

        $('#btn_open_create_os_modal').on("click", function () {

            $('#modal_create_os').modal('show');

        });
    }
});