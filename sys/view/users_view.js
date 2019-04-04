//----------------------------------------------DATATABLE---------------------------------------------------------

$(document).ready(function () {
    var table = $('#list-users').DataTable({
        "processing": true,
        "serverSide": true,
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
        },
        "initComplete": function (settings, json) {
            add_button_create_user();
        },

        "ajax": {
            "url": "../controller/users/datatable.php",
            "type": "POST"
        }
    });

    function add_button_create_user() {

        $('#list-users_filter').prepend(
            '<button type="button" class="btn btn-primary btn_open_create_modal" id="btn_open_create_user_modal">Adicionar Usuário</button>'
        );

        $('#btn_open_create_user_modal').on("click", function () {

            $('#modal_create_user').modal('show');

        });
    }

    //--------------------------------------------CHECK-FIELDS----------------------------------------------------

    function form_update_user_changed(data) {

        var user_row = JSON.parse(data);
        var changed = false;

        user_row['user_id'] == $('#user_id').val() ? 0 : changed = true;
        user_row['user_login'] == $('#user_login').val() ? 0 : changed = true;
        user_row['user_profile'] == $('#user_profile').val() ? 0 : changed = true;

        return changed;

    }

    //--------------------------------------------CREATE----------------------------------------------------------

    $("#form_create_user").on('submit', function (e) {

        e.preventDefault();
        var data = $(this).serialize();

        $.ajax({
            url: '../controller/users/create_user.php',
            method: 'post',
            data: data,
            success: function (data) {

                $('#list-users').DataTable().ajax.reload();
                $('#modal_create_user').modal('hide');
                $('#modal_create_user_success_message').modal('show');
                clean_modal_create_user();

            }
        });

    });

    function clean_modal_create_user() {

        form_length = document.getElementById("form_create_user").length;

        for (let index = 0; index < form_length; index++) {
            var input = document.getElementById("form_create_user").elements[index]['id'];
            document.getElementById(input).value = '';
        }

        document.getElementById("form_create_user").reset();

    };

    $("#modal_create_user").on('hidden.bs.modal', function () {

        clean_modal_create_user();

    });


    enter_to_send_form('modal_create_user', 'btn_create_user');
    enter_to_send_form('modal_create_user_success_message', 'modal_close_create_user_success_message');


    //--------------------------------------------READ------------------------------------------------------------

    $('#table_body').on('click', 'tr', function () {

        var data = table.row(this).data();
        var user_id = data[0];

        $.ajax({

            url: '../controller/users/read_user.php',
            method: 'post',
            data: {
                user_id: user_id
            },
            success: function (data) {

                insert_data_on_modal_update_user(data);
                //alert(data);

                $('#modal_update_user').modal('show');

            }
        });
    });

    function insert_data_on_modal_update_user(data) {

        $('#user_password').val('');
        $('#user_password_confirmation').val('');
        document.getElementById("form_update_user").reset();

        var user_row = JSON.parse(data);

        $('#user_id').val(user_row['user_id']);
        $('#user_login').val(user_row['user_login']);
        $('#user_profile').val(user_row['user_profile']);

    }

    //--------------------------------------------UPDATE----------------------------------------------------------

    $("#form_update_user").on('submit', function (e) {

        e.preventDefault();
        var user_id = $('#user_id').val();

        $.ajax({

            url: '../controller/users/read_user.php',
            method: 'post',
            data: {
                user_id: user_id
            },
            success: function (data) {

                var form_changed = form_update_user_changed(data);

                if ((form_changed && !$(modal_confirm_delete).hasClass('show')) || $('#user_password').val()) {

                    send_form_update_user();

                }
            }
        });
    });


    $('#btn_confirm_user_update').click(function () {

        form = document.getElementById("form_update_user");

        if (!form.reportValidity()) {

            $('#modal_update_user').modal('show');
            $('#modal_confirm_update_user').modal('hide');
        }

    });

    // $("#modal_update_user").on('hide.bs.modal', function () {

    //     $('#user_password').val('');
    //     $('#user_password_confirmation').val('');
    //     document.getElementById("form_update_user").reset();

    // });

    function send_form_update_user() {

        var data = $("#form_update_user").serialize();

        $.ajax({

            url: '../controller/users/update_user.php',
            method: 'post',
            data: data,

            success: function (data) {

                $('#list-users').DataTable().ajax.reload();
                $('#modal_update_user').modal('hide');
                $('#modal_confirm_update_user').modal('hide');
                $('#modal_update_user_success_message').modal('show');
                $('#user_password').val('');
                $('#user_password_confirmation').val('');
                document.getElementById("form_update_user").reset();

            }
        });

    }

    enter_to_send_form('modal_update_user', 'btn_update_user');
    enter_to_send_form('modal_update_user_success_message', 'modal_close_update_user_success_message');
    enter_to_send_form('modal_confirm_update_user', 'btn_confirm_user_update');

    //--------------------------------------------DELETE----------------------------------------------------------

    $("#btn_delete_user").click(function () {

        $('#modal_update_user').modal('hide');
        var user_id = $('#user_id').val();

        $.ajax({

            url: '../controller/users/read_user.php',
            method: 'post',
            data: {
                user_id: user_id
            },
            success: function (data) {

                var user_row = JSON.parse(data);
                var selected_user_login = user_row['user_login'];
                $('#txt_delete_user').text(
                    'Tem certeza que deseja excluir o usuário \"' +
                    selected_user_login + '\"?');

            }
        });

        $('#modal_confirm_delete').modal('show');
    });


    $("#btn_confirm_user_deletion").click(function () {

        var user_id = $('#user_id').val();

        $.ajax({

            url: '../controller/users/delete_user.php',
            method: 'post',
            data: {
                user_id: user_id
            },
            success: function (data) {

                console.log(data);
                $('#modal_confirm_delete').modal('hide');
                $('#list-users').DataTable().ajax.reload();

            }
        });
    });


    $(".btn_cancel_user_deletion").click(function () {
        $('#modal_update_user').modal('show');
    });

    enter_to_send_form('modal_confirm_delete', 'btn_confirm_user_deletion');


    //--------------------------------------------OTHERS----------------------------------------------------------

    $("#user_login").attr("title", "De 5 a 15 caracteres alfanuméricos");
    $("#user_password").attr("title", "De 5 a 15 caracteres alfanuméricos");
    $("#user_password_confirmation").attr("title", "As duas senhas devem ser idênticas");

    $("#user_login").attr("pattern", "[A-Za-zÀ-ú0-9-.,_ ]{5,15}");
    $("#user_password").attr("pattern", "[A-Za-zÀ-ú0-9-.,_ ]{5,15}");
    $("#user_password").keyup(function () {
        var pattern = this.value;
        $("#user_password_confirmation").attr("pattern", pattern);
    });

    $("#user_login_create").attr("title", "De 5 a 15 caracteres alfanuméricos");
    $("#user_password_create").attr("title", "De 5 a 15 caracteres alfanuméricos");
    $("#user_password_confirmation_create").attr("title", "As duas senhas devem ser idênticas");

    $("#user_login_create").attr("pattern", "[A-Za-zÀ-ú0-9-.,_ ]{5,15}");
    $("#user_password_create").attr("pattern", "[A-Za-zÀ-ú0-9-.,_ ]{5,15}");
    $("#user_password_create").keyup(function () {
        var pattern = this.value;
        $("#user_password_confirmation_create").attr("pattern", pattern);
    });


});