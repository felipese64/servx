//----------------------------------------------DATATABLE---------------------------------------------------------

$(document).ready(function () {
    var table = $('#list-technicians').DataTable({
        "processing": true,
        "serverSide": true,
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
        },
        "initComplete": function (settings, json) {
            add_button_create_technician();
        },

        "ajax": {
            "url": "../controller/technicians/datatable.php",
            "type": "POST"
        }
    });

    function add_button_create_technician() {

        $('#list-technicians_filter').prepend(
            '<button type="button" class="btn btn-primary btn_open_create_modal" id="btn_open_create_technician_modal">Adicionar Técnico</button>'
        );

        $('#btn_open_create_technician_modal').on("click", function () {

            $('#modal_create_technician').modal('show');

        });
    }

    //--------------------------------------------CHECK-FIELDS----------------------------------------------------

    function form_update_technician_changed(data) {

        var technician_row = JSON.parse(data);
        var changed = false;

        technician_row['technician_id'] == $('#technician_id').val() ? 0 : changed = true;
        technician_row['technician_name'] == $('#technician_name').val().toUpperCase() ? 0 : changed = true;
        technician_row['technician_registry_date'] == $('#technician_registry_date').val().toUpperCase() ? 0 : changed = true;

        return changed;

    }

    //--------------------------------------------CREATE----------------------------------------------------------

    $("#form_create_technician").on('submit', function (e) {

        e.preventDefault();
        var data = $(this).serialize();

        $.ajax({
            url: '../controller/technicians/create_technician.php',
            method: 'post',
            data: data,
            success: function (data) {

                if (data) {
                    var error = data;
                    var regExp = /Duplicate entry/;
                    var name_already_used = regExp.test(error);
                    if (name_already_used) {
                        alert("Não é possível cadastrar dois técnicos com o mesmo nome.");
                    }

                } else {

                    $('#list-technicians').DataTable().ajax.reload();
                    $('#modal_create_technician').modal('hide');
                    $('#modal_create_technician_success_message').modal('show');
                    clean_modal_create_technician();
                }
            }
        });

    });

    function clean_modal_create_technician() {

        form_length = document.getElementById("form_create_technician").length;

        for (let index = 0; index < form_length; index++) {
            var input = document.getElementById("form_create_technician").elements[index]['id'];
            document.getElementById(input).value = '';
        }

        document.getElementById("form_create_technician").reset();

    };

    $("#modal_create_technician").on('hidden.bs.modal', function () {

        clean_modal_create_technician();

    });


    enter_to_send_form('modal_create_technician_success_message', 'modal_close_create_technician_success_message');


    //--------------------------------------------READ------------------------------------------------------------

    $('#table_body').on('click', 'tr', function () {

        var data = table.row(this).data();
        var technician_id = data[0];

        $.ajax({

            url: '../controller/technicians/read_technician.php',
            method: 'post',
            data: {
                technician_id: technician_id
            },
            success: function (data) {

                insert_data_on_modal_update_technician(data);

                $('#modal_update_technician').modal('show');

            }
        });
    });

    function insert_data_on_modal_update_technician(data) {

        var technician_row = JSON.parse(data);

        $('#technician_id').val(technician_row['technician_id']);
        $('#technician_name').val(technician_row['technician_name']);
        $('#technician_registry_date').val(technician_row['technician_registry_date']);

    }

    //--------------------------------------------UPDATE----------------------------------------------------------

    $("#form_update_technician").on('submit', function (e) {

        e.preventDefault();
        var technician_id = $('#technician_id').val();

        $.ajax({

            url: '../controller/technicians/read_technician.php',
            method: 'post',
            data: {
                technician_id: technician_id
            },
            success: function (data) {

                var form_changed = form_update_technician_changed(data);

                if (form_changed && !$(modal_confirm_delete).hasClass('show')) {

                    send_form_update_technician();

                }
            }
        });
    });


    $('#btn_confirm_technician_update').click(function () {

        form = document.getElementById("form_update_technician");

        if (!form.reportValidity()) {

            $('#modal_update_technician').modal('show');
            $('#modal_confirm_update_technician').modal('hide');
        }

    });

    $("#modal_update_technician").on('hide.bs.modal', function () {

        var technician_id = $('#technician_id').val();

        $.ajax({

            url: '../controller/technicians/read_technician.php',
            method: 'post',
            data: {
                technician_id: technician_id
            },
            success: function (data) {

                var form_changed = form_update_technician_changed(data);

                if (form_changed && !$(modal_confirm_delete).hasClass('show')) {

                    $('#modal_confirm_update_technician').modal('show');
                }
            }
        });
    });

    function send_form_update_technician() {

        var data = $("#form_update_technician").serialize();

        $.ajax({

            url: '../controller/technicians/update_technician.php',
            method: 'post',
            data: data,

            success: function (data) {

                if (data) {
                    var error = data;
                    var regExp = /Duplicate entry/;
                    var name_already_used = regExp.test(error);
                    if (name_already_used) {
                        alert("Não é possível cadastrar dois técnicos com o mesmo nome.");
                    }

                } else {

                    $('#list-technicians').DataTable().ajax.reload();
                    $('#modal_update_technician').modal('hide');
                    $('#modal_confirm_update_technician').modal('hide');
                    $('#modal_update_technician_success_message').modal('show');
                }
            }
        });

    }

    enter_to_send_form('modal_update_technician_success_message', 'modal_close_update_technician_success_message');
    enter_to_send_form('modal_confirm_update_technician', 'btn_confirm_technician_update');

    //--------------------------------------------DELETE----------------------------------------------------------

    $("#btn_delete_technician").click(function () {

        $('#modal_update_technician').modal('hide');
        var technician_id = $('#technician_id').val();

        $.ajax({

            url: '../controller/technicians/read_technician.php',
            method: 'post',
            data: {
                technician_id: technician_id
            },
            success: function (data) {

                var technician_row = JSON.parse(data);
                var selected_technician_name = technician_row['technician_name'];
                $('#txt_delete_technician').text(
                    'Tem certeza que deseja excluir o técnico \"' +
                    selected_technician_name + '\"?');

            }
        });

        $('#modal_confirm_delete').modal('show');
    });


    $("#btn_confirm_technician_deletion").click(function () {

        var technician_id = $('#technician_id').val();

        $.ajax({

            url: '../controller/technicians/delete_technician.php',
            method: 'post',
            data: {
                technician_id: technician_id
            },
            success: function (data) {

                console.log(data);
                $('#modal_confirm_delete').modal('hide');
                $('#list-technicians').DataTable().ajax.reload();

            }
        });
    });


    $(".btn_cancel_technician_deletion").click(function () {
        $('#modal_update_technician').modal('show');
    });

    enter_to_send_form('modal_confirm_delete', 'btn_confirm_technician_deletion');


    //--------------------------------------------OTHERS----------------------------------------------------------

    $("#technician_name").attr("title", "Até 30 caracteres alfanuméricos");
    $("#technician_name").attr("pattern", "[A-Za-zÀ-ú0-9-.,_ ]{1,30}");
    $("#technician_name_create").attr("title", "Até 30 caracteres alfanuméricos");
    $("#technician_name_create").attr("pattern", "[A-Za-zÀ-ú0-9-.,_ ]{1,30}");

    clean_modal_create_technician();

});