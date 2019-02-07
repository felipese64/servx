$(document).ready(function () {
    var table = $('#list-services').DataTable({
        "processing": true,
        "serverSide": true,
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
        },
        "initComplete": function (settings, json) {

            $('#list-services_filter').prepend(
                '<button type="button" class="btn btn-primary btn_open_create_modal" id="btn_open_create_service_modal">Adicionar Serviço</button>'
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

    enter_to_send_form('modal_edit_service', 'btn_update_service');
    enter_to_send_form('modal_create_service', 'btn_create_service');
    enter_to_send_form('modal_create_service_success_message', 'modal_close_create_service_success_message');
    enter_to_send_form('modal_update_service_success_message', 'modal_close_update_service_success_message');
    enter_to_send_form('modal_confirm_update_service', 'btn_confirm_service_update');
    enter_to_send_form('modal_confirm_delete', 'btn_confirm_service_deletion');


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

                var serv_row = JSON.parse(data);

                $('#serv_id').val(serv_row['serv_id']);
                $('#serv_name').val(serv_row['serv_name']);
                $('#serv_desc').val(serv_row['serv_desc']);
                $('#serv_ts').val(serv_row['serv_ts']);
                $('#serv_ts_price').val(float_to_brl(parseFloat(serv_row[
                    'serv_ts_price'])));
                $('#serv_price').val(float_to_brl(parseFloat(serv_row['serv_price'])));
                $('#modal_edit_service').modal('show');

            }
        });
    });

    $(".btn_cancel_service_deletion").click(function () {
        $('#modal_edit_service').modal('show');
    });



    $("#modal_edit_service").on('hide.bs.modal', function () {

        var serv_id = $('#serv_id').val();

        $.ajax({

            url: '../controller/services/read_service.php',
            method: 'post',
            data: {
                serv_id: serv_id
            },
            success: function (data) {

                var service_row = JSON.parse(data);
                var validate_serv_id = service_row['serv_id'] == $('#serv_id').val();
                var validate_serv_name = service_row['serv_name'] == $('#serv_name')
                    .val().toUpperCase();
                var validate_serv_desc = service_row['serv_desc'] == $('#serv_desc')
                    .val().toUpperCase();
                var validate_serv_ts = service_row['serv_ts'] == $('#serv_ts').val();
                var validate_serv_ts_price = service_row['serv_ts_price'] ==
                    brl_to_float($(
                        '#serv_ts_price').val());
                var validate_serv_price = service_row['serv_price'] ==
                    brl_to_float($(
                        '#serv_price').val());



                if (validate_serv_id && validate_serv_name && validate_serv_desc &&
                    validate_serv_ts && validate_serv_ts_price && validate_serv_price) {
                    var form_equals_db = true;
                } else {
                    var form_equals_db = false;

                }

                var style = getComputedStyle(modal_confirm_delete);

                var display = style.display;

                if (display == 'none' && !form_equals_db) {

                    clean_modal_edit_service();
                    $('#modal_confirm_update_service').modal('show');
                }
            }
        });
    });


    function clean_modal_edit_service() {

        document.getElementById('serv_name').style.boxShadow = "0px 0px";
        document.getElementById('serv_ts').style.boxShadow = "0px 0px";
        document.getElementById('serv_ts_price').style.boxShadow = "0px 0px";
        document.getElementById('serv_price').style.boxShadow = "0px 0px";
    };

    function clean_modal_create_service() {
        $('#serv_name_create').val('');
        $('#serv_desc_create').val('');
        $('#serv_ts_create').val('60');
        $('#serv_ts_price_create').val('1,00');
        $('#serv_price_create').val('0,00');

        document.getElementById('serv_name').style.boxShadow = "0px 0px";
        document.getElementById('serv_ts').style.boxShadow = "0px 0px";
        document.getElementById('serv_ts_price').style.boxShadow = "0px 0px";
        document.getElementById('serv_price').style.boxShadow = "0px 0px";
    };



    $("#btn_confirm_service_deletion").click(function () {

        var serv_id = $('#serv_id').val();

        $.ajax({

            url: '../controller/services/delete_service.php',
            method: 'post',
            data: {
                serv_id: serv_id
            },
            success: function (data) {


                $('#modal_confirm_delete').modal('hide');
                $('#list-services').DataTable().ajax.reload();


            }
        });
    });


    $('#btn_update_service').click(function () {

        var serv_id = $('#serv_id').val();

        $.ajax({

            url: '../controller/services/read_service.php',
            method: 'post',
            data: {
                serv_id: serv_id
            },
            success: function (data) {

                var service_row = JSON.parse(data);

                var validate_serv_id = service_row['serv_id'] == $('#serv_id').val();
                var validate_serv_name = service_row['serv_name'] == $('#serv_name')
                    .val().toUpperCase();
                var validate_serv_desc = service_row['serv_desc'] == $('#serv_desc')
                    .val().toUpperCase();
                var validate_serv_ts = service_row['serv_ts'] == $('#serv_ts').val();
                var validate_serv_ts_price = service_row['serv_ts_price'] ==
                    brl_to_float($(
                        '#serv_ts_price').val());
                var validate_serv_price = service_row['serv_price'] ==
                    brl_to_float($(
                        '#serv_price').val());



                if (validate_serv_id && validate_serv_name && validate_serv_desc &&
                    validate_serv_ts && validate_serv_ts_price && validate_serv_price) {
                    var form_equals_db = true;
                } else {
                    var form_equals_db = false;

                }

                var style = getComputedStyle(modal_confirm_delete);

                var display = style.display;

                if (display == 'none' && !form_equals_db) {

                    var serv_id = $('#serv_id').val();
                    var serv_name = $('#serv_name').val().toUpperCase();
                    var serv_ts = $('#serv_ts').val();
                    var serv_ts_price = brl_to_float($('#serv_ts_price').val());
                    var serv_price = brl_to_float($('#serv_price').val());
                    var serv_desc = $('#serv_desc').val().toUpperCase();
                    var form_ok = true;

                    if (serv_name) {
                        document.getElementById('serv_name').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('serv_name').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                    }
                    if (serv_ts) {
                        document.getElementById('serv_ts').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('serv_ts').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                    }
                    if (serv_ts_price && isFloat(serv_ts_price)) {
                        document.getElementById('serv_ts_price').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('serv_ts_price').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                    }
                    if (serv_price && isFloat(serv_price)) {
                        document.getElementById('serv_price').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('serv_price').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                    }

                    if (form_ok) {

                        $.ajax({

                            url: '../controller/services/update_service.php',
                            method: 'post',
                            data: {
                                serv_id: serv_id,
                                serv_name: serv_name,
                                serv_desc: serv_desc,
                                serv_ts: serv_ts,
                                serv_ts_price: serv_ts_price,
                                serv_price: serv_price
                            },

                            success: function (data) {

                                $('#list-services').DataTable().ajax.reload();
                                $('#modal_edit_service').modal('hide');
                                $('#modal_update_service_success_message').modal(
                                    'show');
                            }
                        });
                    }
                }
            }
        });
    });


    $('#btn_confirm_service_update').click(function () {

        var serv_id = $('#serv_id').val();

        $.ajax({

            url: '../controller/services/read_service.php',
            method: 'post',
            data: {
                serv_id: serv_id
            },
            success: function (data) {

                var service_row = JSON.parse(data);

                var validate_serv_id = service_row['serv_id'] == $('#serv_id').val();
                var validate_serv_name = service_row['serv_name'] == $('#serv_name')
                    .val().toUpperCase();
                var validate_serv_desc = service_row['serv_desc'] == $('#serv_desc')
                    .val().toUpperCase();
                var validate_serv_ts = service_row['serv_ts'] == $('#serv_ts').val();
                var validate_serv_ts_price = service_row['serv_ts_price'] ==
                    brl_to_float($(
                        '#serv_ts_price').val());
                var validate_serv_price = service_row['serv_price'] ==
                    brl_to_float($(
                        '#serv_price').val());



                if (validate_serv_id && validate_serv_name && validate_serv_desc &&
                    validate_serv_ts && validate_serv_ts_price && validate_serv_price) {
                    var form_equals_db = true;
                } else {
                    var form_equals_db = false;

                }

                var style = getComputedStyle(modal_confirm_delete);

                var display = style.display;

                if (display == 'none' && !form_equals_db) {

                    var serv_id = $('#serv_id').val();
                    var serv_name = $('#serv_name').val().toUpperCase();
                    var serv_ts = $('#serv_ts').val();
                    var serv_ts_price = brl_to_float($('#serv_ts_price').val());
                    var serv_price = brl_to_float($('#serv_price').val());
                    var serv_desc = $('#serv_desc').val().toUpperCase();
                    var form_ok = true;

                    if (serv_name) {
                        document.getElementById('serv_name').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('serv_name').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                        $('#modal_confirm_update_service').modal('hide');
                        $('#modal_edit_service').modal('show');
                    }
                    if (serv_ts) {
                        document.getElementById('serv_ts').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('serv_ts').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                        $('#modal_confirm_update_service').modal('hide');
                        $('#modal_edit_service').modal('show');
                    }
                    if (serv_ts_price && isFloat(serv_ts_price)) {
                        document.getElementById('serv_ts_price').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('serv_ts_price').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                        $('#modal_confirm_update_service').modal('hide');
                        $('#modal_edit_service').modal('show');
                    }
                    if (serv_price && isFloat(serv_price)) {
                        document.getElementById('serv_price').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('serv_price').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                        $('#modal_confirm_update_service').modal('hide');
                        $('#modal_edit_service').modal('show');
                    }

                    if (form_ok) {

                        $.ajax({

                            url: '../controller/services/update_service.php',
                            method: 'post',
                            data: {
                                serv_id: serv_id,
                                serv_name: serv_name,
                                serv_desc: serv_desc,
                                serv_ts: serv_ts,
                                serv_ts_price: serv_ts_price,
                                serv_price: serv_price
                            },

                            success: function (data) {

                                $('#list-services').DataTable().ajax.reload();
                                $('#modal_edit_service').modal('hide');
                                $('#modal_confirm_update_service').modal('hide');
                                $('#modal_update_service_success_message').modal(
                                    'show');
                            }
                        });
                    }
                }
            }
        });
    });

    $("#modal_create_service").on('hidden.bs.modal', function () {
        clean_modal_create_service();
    });


    $("#btn_create_service").click(function () {

        var serv_name = $('#serv_name_create').val().toUpperCase();
        var serv_ts = $('#serv_ts_create').val();
        var serv_ts_price = brl_to_float($('#serv_ts_price_create').val());
        var serv_price = brl_to_float($('#serv_price_create').val());
        var serv_desc = $('#serv_desc_create').val().toUpperCase();
        var form_ok = true;


        if (serv_name) {
            document.getElementById('serv_name_create').style.boxShadow = "0px 0px";
        } else {
            document.getElementById('serv_name_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }
        if (serv_ts && serv_ts > 0) {
            document.getElementById('serv_ts_create').style.boxShadow = "0px 0px";
        } else {
            document.getElementById('serv_ts_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }
        if (serv_ts_price && isFloat(serv_ts_price)) {
            document.getElementById('serv_ts_price_create').style.boxShadow = "0px 0px";
        } else {
            document.getElementById('serv_ts_price_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }
        if (serv_price && isFloat(serv_price)) {
            document.getElementById('serv_price_create').style.boxShadow = "0px 0px";
        } else {
            document.getElementById('serv_price_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        if (form_ok) {

            $.ajax({
                url: '../controller/services/create_service.php',
                method: 'post',
                data: {
                    serv_name: serv_name,
                    serv_ts: serv_ts,
                    serv_ts_price: serv_ts_price,
                    serv_price: serv_price,
                    serv_desc: serv_desc
                },
                success: function (data) {
                    $('#list-services').DataTable().ajax.reload();
                    $('#modal_create_service').modal('hide');
                    $('#modal_create_service_success_message').modal('show');
                    clean_modal_create_service();
                }
            });
        }
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

    $("#btn_delete_service").click(function () {

        $('#modal_edit_service').modal('hide');
        var serv_id = $('#serv_id').val();

        $.ajax({

            url: '../controller/services/read_service.php',
            method: 'post',
            data: {
                serv_id: serv_id
            },
            success: function (data) {

                var service_row = JSON.parse(data);
                var selected_service = service_row['serv_name'];
                $('#txt_delete_service').text(
                    'Tem certeza que deseja excluir o serviço \"' +
                    selected_service + '\"?');

            }
        });

        $('#modal_confirm_delete').modal('show');
    });




    $("#serv_ts_price").keyup(function () {

        var serv_ts_price = brl_to_float($("#serv_ts_price").val());
        var serv_ts = $("#serv_ts").val();
        var serv_price = serv_ts_price * serv_ts;

        isNaN(serv_price) ? $("#serv_price").val('0,00') : $(
            "#serv_price").val(float_to_brl(serv_price));

        isNaN(serv_ts_price) ? $("#serv_ts_price").val('0,00') : $(
            "#serv_ts_price").val(float_to_brl(parseFloat(serv_ts_price)));
    });


    $("#serv_ts").keyup(function () {

        var serv_ts_price = brl_to_float($("#serv_ts_price").val());
        var serv_ts = $("#serv_ts").val();
        var serv_price = serv_ts_price * serv_ts;

        isNaN(serv_ts) || serv_ts == '' ? $("#serv_ts").val('0') : $(
            "#serv_ts").val(parseInt(serv_ts));

        isNaN(serv_price) ? $("#serv_price").val('0,00') : $(
            "#serv_price").val(float_to_brl(serv_price));
    });


    $("#serv_price").keyup(function () {

        var serv_ts_price = brl_to_float($("#serv_ts_price").val());
        var serv_price = $("#serv_price").val();
        var price_toFloat = brl_to_float(serv_price);
        var serv_ts_price_double = brl_to_float(serv_ts_price);
        var price_toBrl = float_to_brl(parseFloat(price_toFloat));
        var serv_ts = price_toFloat / serv_ts_price_double;

        if (serv_ts < 1 || isNaN(serv_ts) || serv_ts ==
            Infinity) {
            $("#serv_ts").val('0');
        } else {
            $("#serv_ts").val(parseInt(serv_ts));
        }

        isNaN(parseFloat(price_toBrl)) ? $("#serv_price").val('0,00') : $(
            "#serv_price").val(
                price_toBrl);
    });



    $("#serv_ts_price_create").keyup(function () {

        var serv_ts_price_create = brl_to_float($("#serv_ts_price_create").val());
        var serv_ts_create = $("#serv_ts_create").val();
        var serv_price_create = serv_ts_price_create * serv_ts_create;

        isNaN(serv_price_create) ? $("#serv_price_create").val('0,00') : $(
            "#serv_price_create").val(float_to_brl(serv_price_create));

        isNaN(serv_ts_price_create) ? $("#serv_ts_price_create").val('0,00') : $(
            "#serv_ts_price_create").val(float_to_brl(parseFloat(serv_ts_price_create)));
    });


    $("#serv_ts_create").keyup(function () {

        var serv_ts_price_create = brl_to_float($("#serv_ts_price_create").val());
        var serv_ts_create = $("#serv_ts_create").val();
        var serv_price_create = serv_ts_price_create * serv_ts_create;

        isNaN(serv_ts_create) || serv_ts_create == '' ? $("#serv_ts_create").val('0') : $(
            "#serv_ts_create").val(parseInt(serv_ts_create));

        isNaN(serv_price_create) ? $("#serv_price_create").val('0,00') : $(
            "#serv_price_create").val(float_to_brl(serv_price_create));
    });


    $("#serv_price_create").keyup(function () {

        var serv_ts_price_create = brl_to_float($("#serv_ts_price_create").val());
        var serv_price_create = $("#serv_price_create").val();
        var price_toFloat = brl_to_float(serv_price_create);
        var serv_ts_price_create_double = brl_to_float(serv_ts_price_create);
        var price_toBrl = float_to_brl(parseFloat(price_toFloat));
        var serv_ts_create = price_toFloat / serv_ts_price_create_double;

        if (serv_ts_create < 1 || isNaN(serv_ts_create) || serv_ts_create ==
            Infinity) {
            $("#serv_ts_create").val('0');
        } else {
            $("#serv_ts_create").val(parseInt(serv_ts_create));
        }

        isNaN(parseFloat(price_toBrl)) ? $("#serv_price_create").val('0,00') : $(
            "#serv_price_create").val(
                price_toBrl);
    });


});