//----------------------------------------------DATATABLE---------------------------------------------------------

$(document).ready(function () {
    var table = $('#list-services').DataTable({
        "processing": true,
        "serverSide": true,
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
        },
        "initComplete": function (settings, json) {
            add_button_create_service();
        },

        "ajax": {
            "url": "../controller/services/datatable.php",
            "type": "POST"
        }
    });

    function add_button_create_service() {

        $('#list-services_filter').prepend(
            '<button type="button" class="btn btn-primary btn_open_create_modal" id="btn_open_create_service_modal">Adicionar Serviço</button>'
        );

        $('#btn_open_create_service_modal').on("click", function () {

            $('#modal_create_service').modal('show');

        });
    }

    //--------------------------------------------CHECK-FIELDS----------------------------------------------------

    function form_update_service_changed(data) {

        var serv_row = JSON.parse(data);
        var changed = false;

        serv_row['serv_id'] == $('#serv_id').val() ? 0 : changed = true;
        serv_row['serv_name'] == $('#serv_name').val().toUpperCase() ? 0 : changed = true;
        serv_row['serv_desc'] == $('#serv_desc').val().toUpperCase() ? 0 : changed = true;
        serv_row['serv_ts_price'] == $('#serv_ts_price').val() ? 0 : changed = true;
        serv_row['serv_ts'] == $('#serv_ts').val() ? 0 : changed = true;
        serv_row['serv_price'] == $('#serv_price').val() ? 0 : changed = true;

        return changed;

    }

    //--------------------------------------------CREATE----------------------------------------------------------

    $("#form_create_service").on('submit', function (e) {

        e.preventDefault();
        var data = $(this).serialize();

        $.ajax({
            url: '../controller/services/create_service.php',
            method: 'post',
            data: data,
            success: function (data) {

                $('#list-services').DataTable().ajax.reload();
                $('#modal_create_service').modal('hide');
                $('#modal_create_service_success_message').modal('show');
                clean_modal_create_service();

            }
        });

    });

    function clean_modal_create_service() {

        form_length = document.getElementById("form_create_service").length;

        for (let index = 0; index < form_length; index++) {
            var input = document.getElementById("form_create_service").elements[index]['id'];
            document.getElementById(input).value = '';
        }

        document.getElementById("form_create_service").reset();

    };

    $("#modal_create_service").on('hidden.bs.modal', function () {

        clean_modal_create_service();

    });


    enter_to_send_form('modal_create_service_success_message', 'modal_close_create_service_success_message');


    //--------------------------------------------READ------------------------------------------------------------

    $('#table_body').on('click', 'tr', function () {

        var data = table.row(this).data();
        var serv_id = data[0];

        $.ajax({

            url: '../controller/services/read_service.php',
            method: 'post',
            data: {
                serv_id: serv_id
            },
            success: function (data) {

                insert_data_on_modal_update_service(data);

                $('#modal_update_service').modal('show');

            }
        });
    });

    function insert_data_on_modal_update_service(data) {

        var serv_row = JSON.parse(data);

        $('#serv_id').val(serv_row['serv_id']);
        $('#serv_name').val(serv_row['serv_name']);
        $('#serv_desc').val(serv_row['serv_desc']);
        $('#serv_ts_price').val(serv_row['serv_ts_price']);
        $('#serv_ts').val(serv_row['serv_ts']);
        $('#serv_price').val(serv_row['serv_price']);

    }

    //--------------------------------------------UPDATE----------------------------------------------------------

    $("#form_update_service").on('submit', function (e) {

        e.preventDefault();
        var serv_id = $('#serv_id').val();

        $.ajax({

            url: '../controller/services/read_service.php',
            method: 'post',
            data: {
                serv_id: serv_id
            },
            success: function (data) {

                var form_changed = form_update_service_changed(data);

                if (form_changed && !$(modal_confirm_delete).hasClass('show')) {

                    send_form_update_service();

                }
            }
        });
    });


    $('#btn_confirm_service_update').click(function () {

        form = document.getElementById("form_update_service");

        if (!form.reportValidity()) {

            $('#modal_update_service').modal('show');
            $('#modal_confirm_update_service').modal('hide');
        }

    });

    $("#modal_update_service").on('hide.bs.modal', function () {

        var serv_id = $('#serv_id').val();

        $.ajax({

            url: '../controller/services/read_service.php',
            method: 'post',
            data: {
                serv_id: serv_id
            },
            success: function (data) {

                var form_changed = form_update_service_changed(data);

                if (form_changed && !$(modal_confirm_delete).hasClass('show')) {

                    $('#modal_confirm_update_service').modal('show');
                }
            }
        });
    });

    function send_form_update_service() {

        var data = $("#form_update_service").serialize();

        $.ajax({

            url: '../controller/services/update_service.php',
            method: 'post',
            data: data,

            success: function (data) {

                $('#list-services').DataTable().ajax.reload();
                $('#modal_update_service').modal('hide');
                $('#modal_confirm_update_service').modal('hide');
                $('#modal_update_service_success_message').modal('show');

            }
        });

    }

    enter_to_send_form('modal_update_service_success_message', 'modal_close_update_service_success_message');
    enter_to_send_form('modal_confirm_update_service', 'btn_confirm_service_update');

    //--------------------------------------------DELETE----------------------------------------------------------

    $("#btn_delete_service").click(function () {

        $('#modal_update_service').modal('hide');
        var serv_id = $('#serv_id').val();

        $.ajax({

            url: '../controller/services/read_service.php',
            method: 'post',
            data: {
                serv_id: serv_id
            },
            success: function (data) {

                var serv_row = JSON.parse(data);
                var selected_service_name = serv_row['serv_name'];
                $('#txt_delete_service').text(
                    'Tem certeza que deseja excluir o serviço \"' +
                    selected_service_name + '\"?');

            }
        });

        $('#modal_confirm_delete').modal('show');
    });


    $("#btn_confirm_service_deletion").click(function () {

        var serv_id = $('#serv_id').val();

        $.ajax({

            url: '../controller/services/delete_service.php',
            method: 'post',
            data: {
                serv_id: serv_id
            },
            success: function (data) {

                console.log(data);
                $('#modal_confirm_delete').modal('hide');
                $('#list-services').DataTable().ajax.reload();

            }
        });
    });


    $(".btn_cancel_service_deletion").click(function () {
        $('#modal_update_service').modal('show');
    });

    enter_to_send_form('modal_confirm_delete', 'btn_confirm_service_deletion');


    //--------------------------------------------OTHERS----------------------------------------------------------



    $('#serv_ts_price').mask('000.000,00', { reverse: true });
    $('#serv_price').mask('000.000,00', { reverse: true });
    $('#serv_ts').mask('0000');

    $("#serv_name").attr("title", "Até 60 caracteres alfanuméricos");
    $("#serv_ts_price").attr("title", "Caracteres numéricos");
    $("#serv_ts").attr("title", "Caracteres numéricos");
    $("#serv_price").attr("title", "Caracteres numéricos");

    $("#serv_name").attr("pattern", "[A-Za-zÀ-ú0-9-.,_ ]{1,60}");
    $("#serv_ts_price").attr("pattern", "^((?!(^0\,00$)).)*$");
    $("#serv_ts").attr("pattern", "^((?!(^0$)).)*$");
    $("#serv_price").attr("pattern", "^((?!(^0\,00$)).)*$");

    $('#serv_ts_price_create').mask('000.000,00', { reverse: true });
    $('#serv_price_create').mask('000.000,00', { reverse: true });
    $('#serv_ts_create').mask('0000');

    $("#serv_name_create").attr("title", "Até 60 caracteres alfanuméricos");
    $("#serv_ts_price_create").attr("title", "Caracteres numéricos");
    $("#serv_ts_create").attr("title", "Caracteres numéricos");
    $("#serv_price_create").attr("title", "Caracteres numéricos");

    $("#serv_name_create").attr("pattern", "[A-Za-zÀ-ú0-9-.,_ ]{1,60}");
    $("#serv_ts_price_create").attr("pattern", "^((?!(^0\,00$)).)*$");
    $("#serv_ts_create").attr("pattern", "^((?!(^0$)).)*$");
    $("#serv_price_create").attr("pattern", "^((?!(^0\,00$)).)*$");


    $("#serv_ts_price").keyup(function () {

        var serv_ts_price = brl_to_float($("#serv_ts_price").val());
        var serv_ts = $("#serv_ts").val();
        var serv_price = serv_ts_price * serv_ts;
        $("#serv_price").val(float_to_brl(serv_price));
        $("#serv_ts_price").val(float_to_brl(parseFloat(serv_ts_price)));
    });

    $("#serv_ts").keyup(function () {

        var serv_ts_price = brl_to_float($("#serv_ts_price").val());
        var serv_ts = $("#serv_ts").val();
        var serv_price = serv_ts_price * serv_ts;
        $("#serv_price").val(float_to_brl(serv_price));
    });

    $("#serv_price").keyup(function () {

        var serv_ts_price = brl_to_float($("#serv_ts_price").val());
        var serv_price = $("#serv_price").val();
        var price_toFloat = brl_to_float(serv_price);
        var serv_ts_price_double = brl_to_float(serv_ts_price);
        var price_toBrl = float_to_brl(parseFloat(price_toFloat));
        var serv_ts = price_toFloat / serv_ts_price_double;
        $("#serv_ts").val(parseInt(serv_ts));
        $("#serv_price").val(price_toBrl);
    });

    $("#serv_ts_price_create").keyup(function () {

        var serv_ts_price_create = brl_to_float($("#serv_ts_price_create").val());
        var serv_ts_create = $("#serv_ts_create").val();
        var serv_price_create = serv_ts_price_create * serv_ts_create;
        $("#serv_price_create").val(float_to_brl(serv_price_create));
        $("#serv_ts_price_create").val(float_to_brl(parseFloat(serv_ts_price_create)));
    });


    $("#serv_ts_create").keyup(function () {

        var serv_ts_price_create = brl_to_float($("#serv_ts_price_create").val());
        var serv_ts_create = $("#serv_ts_create").val();
        var serv_price_create = serv_ts_price_create * serv_ts_create;
        $("#serv_price_create").val(float_to_brl(serv_price_create));
    });


    $("#serv_price_create").keyup(function () {

        var serv_ts_price_create = brl_to_float($("#serv_ts_price_create").val());
        var serv_price_create = $("#serv_price_create").val();
        var price_toFloat = brl_to_float(serv_price_create);
        var serv_ts_price_create_double = brl_to_float(serv_ts_price_create);
        var price_toBrl = float_to_brl(parseFloat(price_toFloat));
        var serv_ts_create = price_toFloat / serv_ts_price_create_double;
        $("#serv_ts_create").val(parseInt(serv_ts_create));
        $("#serv_price_create").val(price_toBrl);
    });

    $('#serv_ts').click(function () {
        selectAllText(jQuery(this))
    });

    $('#serv_ts_price').click(function () {
        selectAllText(jQuery(this))
    });

    $('#serv_price').click(function () {
        selectAllText(jQuery(this))
    });

    $('#serv_ts_create').click(function () {
        selectAllText(jQuery(this))
    });

    $('#serv_ts_price_create').click(function () {
        selectAllText(jQuery(this))
    });

    $('#serv_price_create').click(function () {
        selectAllText(jQuery(this))
    });

    clean_modal_create_service();

});