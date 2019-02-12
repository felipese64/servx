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




























    enter_to_send_form('modal_edit_customer', 'btn_update_customer');
    enter_to_send_form('modal_create_customer', 'btn_create_customer');
    enter_to_send_form('modal_create_customer_success_message', 'modal_close_create_customer_success_message');
    enter_to_send_form('modal_update_customer_success_message', 'modal_close_update_customer_success_message');
    enter_to_send_form('modal_confirm_update_customer', 'btn_confirm_customer_update');
    enter_to_send_form('modal_confirm_delete', 'btn_confirm_customer_deletion');


    $('#table_body').on('click', 'tr', function () {

        var data = table.row(this).data();
        var customer_id = data[0];

        $.ajax({

            url: '../controller/customers/read_customer.php',
            method: 'post',
            data: {
                customer_id: customer_id
            },
            success: function (data) {

                var customer_row = JSON.parse(data);

                $('#customer_id').val(customer_row['customer_id']);
                $('#customer_name').val(customer_row['customer_name']);
                $('#customer_trade_name').val(customer_row['customer_trade_name']);
                $('#customer_email').val(customer_row['customer_email']);
                $('#customer_cpf').val(customer_row['customer_cpf']);
                $('#customer_natural_legal').val(customer_row['customer_natural_legal']);
                $('#customer_rg').val(customer_row['customer_rg']);
                $('#customer_telephone').val(customer_row['customer_telephone']);
                $('#customer_cellphone').val(customer_row['customer_cellphone']);
                $('#customer_registry_date').val(customer_row['customer_registry_date']);
                $('#customer_obs').val(customer_row['customer_obs']);
                $('#customer_address_type').val(customer_row['customer_address_type']);
                $('#customer_address').val(customer_row['customer_address']);
                $('#customer_address_number').val(customer_row['customer_address_number']);
                $('#customer_address_complements').val(customer_row['customer_address_complements']);
                $('#customer_zone').val(customer_row['customer_zone']);
                $('#customer_state').val(customer_row['customer_state']);
                $('#customer_city').val(customer_row['customer_city']);
                $('#customer_cep').val(customer_row['customer_cep']);

                $('#modal_edit_customer').modal('show');

            }
        });
    });


    $(".btn_cancel_customer_deletion").click(function () {
        $('#modal_edit_customer').modal('show');
    });


    $("#modal_edit_customer").on('hide.bs.modal', function () {

        // autocomplete_customer_groups('customer_cpf');
        // autocomplete_customer_brands('customer_email');
        var customer_id = $('#customer_id').val();

        $.ajax({

            url: '../controller/customers/read_customer.php',
            method: 'post',
            data: {
                customer_id: customer_id
            },
            success: function (data) {

                //alert(data);
                var customer_row = JSON.parse(data);



                var validate_customer_id = customer_row['customer_id'] == $('#customer_id').val();
                var validate_customer_name = customer_row['customer_name'] == $('#customer_name')
                    .val().toUpperCase();
                var validate_customer_trade_name = customer_row['customer_trade_name'] == $('#customer_trade_name')
                    .val().toUpperCase();
                var validate_customer_email = customer_row['customer_email'] == $(
                    '#customer_email').val().toUpperCase();
                var validate_customer_cpf = customer_row['customer_cpf'] == $(
                    '#customer_cpf').val();
                var validate_customer_natural_legal = customer_row['customer_natural_legal'] == $('#customer_natural_legal').val();
                var validate_customer_rg = customer_row['customer_rg'] == $(
                    '#customer_rg').val();
                var validate_customer_telephone = customer_row['customer_telephone'] ==
                    $('#customer_telephone').val();
                var validate_customer_cellphone = customer_row['customer_cellphone'] == $(
                    '#customer_cellphone').val();

                var validate_customer_registry_date = customer_row['customer_registry_date'] == $('#customer_registry_date').val();
                var validate_customer_obs = customer_row['customer_obs'] == $('#customer_obs')
                    .val().toUpperCase();
                var validate_customer_address_type = customer_row['customer_address_type'] == $('#customer_address_type')
                    .val().toUpperCase();
                var validate_customer_address = customer_row['customer_address'] == $(
                    '#customer_address').val().toUpperCase();
                var validate_customer_address_number = customer_row['customer_address_number'] == $(
                    '#customer_address_number').val();
                var validate_customer_address_complements = customer_row['customer_address_complements'] == $('#customer_address_complements').val();
                var validate_customer_zone = customer_row['customer_zone'] == $(
                    '#customer_zone').val();
                var validate_customer_state = customer_row['customer_state'] ==
                    $('#customer_state').val();
                var validate_customer_city = customer_row['customer_city'] == $(
                    '#customer_city').val();
                var validate_customer_cep = customer_row['customer_cep'] == $(
                    '#customer_cep').val();


                if (validate_customer_id && validate_customer_name && validate_customer_trade_name &&
                    validate_customer_email && validate_customer_cpf &&
                    validate_customer_natural_legal && validate_customer_rg &&
                    validate_customer_telephone && validate_customer_cellphone && validate_customer_registry_date && validate_customer_obs && validate_customer_address_type &&
                    validate_customer_address && validate_customer_address_number &&
                    validate_customer_address_complements && validate_customer_zone &&
                    validate_customer_state && validate_customer_city && validate_customer_cep) {
                    var form_equals_db = true;
                } else {
                    var form_equals_db = false;

                }

                var style = getComputedStyle(modal_confirm_delete);

                var display = style.display;

                if (display == 'none' && !form_equals_db) {

                    //clean_modal_edit_customer();
                    $('#modal_confirm_update_customer').modal('show');
                }
            }
        });
    });


    // $("#modal_edit_customer").on('shown.bs.modal', function () {
    //     autocomplete_customer_groups('customer_cpf');
    //     autocomplete_customer_brands('customer_email');
    // });


    $("#btn_confirm_customer_deletion").click(function () {

        var customer_id = $('#customer_id').val();

        $.ajax({

            url: '../controller/customers/delete_customer.php',
            method: 'post',
            data: {
                customer_id: customer_id
            },
            success: function (data) {


                $('#modal_confirm_delete').modal('hide');
                $('#list-customer').DataTable().ajax.reload();


            }
        });
    });


    // $('#btn_update_customer').click(function () {

    //     var customer_id = $('#customer_id').val();

    //     $.ajax({

    //         url: '../controller/customers/read_customer.php',
    //         method: 'post',
    //         data: {
    //             customer_id: customer_id
    //         },
    //         success: function (data) {

    //             var customer_row = JSON.parse(data);

    //             var validate_customer_id = customer_row['customer_id'] == $('#customer_id').val();
    //             var validate_customer_name = customer_row['customer_name'] == $('#customer_name')
    //                 .val().toUpperCase();
    //             var validate_customer_trade_name = customer_row['customer_trade_name'] == $('#customer_trade_name')
    //                 .val().toUpperCase();
    //             var validate_customer_email = customer_row['customer_email'] == $(
    //                 '#customer_email').val().toUpperCase();
    //             var validate_customer_cpf = customer_row['customer_cpf'] == $(
    //                 '#customer_cpf').val().toUpperCase();
    //             var validate_customer_natural_legal = customer_row['customer_natural_legal'] ==
    //                 brl_to_float($(
    //                     '#customer_natural_legal').val());
    //             var validate_customer_rg = customer_row['customer_rg'] == $(
    //                 '#customer_rg').val();
    //             var validate_customer_telephone = customer_row['customer_telephone'] ==
    //                 brl_to_float($(
    //                     '#customer_telephone').val());
    //             var validate_customer_cellphone = customer_row['customer_cellphone'] == $(
    //                 '#customer_cellphone').val();

    //             if (validate_customer_id && validate_customer_name && validate_customer_trade_name &&
    //                 validate_customer_email && validate_customer_cpf &&
    //                 validate_customer_natural_legal && validate_customer_rg &&
    //                 validate_customer_telephone && validate_customer_cellphone) {
    //                 var form_equals_db = true;
    //             } else {
    //                 var form_equals_db = false;

    //             }

    //             var style = getComputedStyle(modal_confirm_delete);

    //             var display = style.display;

    //             if (display == 'none' && !form_equals_db) {

    //                 var customer_id = $('#customer_id').val();
    //                 var customer_name = $('#customer_name').val().toUpperCase();
    //                 var customer_email = $('#customer_email').val().toUpperCase();
    //                 var customer_cpf = $('#customer_cpf').val().toUpperCase();
    //                 var customer_natural_legal = $('#customer_natural_legal').val();
    //                 var customer_rg = $('#customer_rg').val();
    //                 var customer_telephone = $('#customer_telephone').val();
    //                 var customer_cellphone = $('#customer_cellphone').val();
    //                 var customer_trade_name = $('#customer_trade_name').val().toUpperCase();
    //                 var form_ok = true;

    //                 if (customer_name) {
    //                     document.getElementById('customer_name').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_name').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                 }
    //                 if (customer_email) {
    //                     document.getElementById('customer_email').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_email').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                 }
    //                 if (customer_cpf) {
    //                     document.getElementById('customer_cpf').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_cpf').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                 }
    //                 if (customer_natural_legal && isFloat(customer_natural_legal)) {
    //                     document.getElementById('customer_natural_legal').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_natural_legal').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                 }
    //                 if (customer_rg && isFloat(customer_rg)) {
    //                     document.getElementById('customer_rg').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_rg').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                 }
    //                 if (customer_telephone && isFloat(customer_telephone)) {
    //                     document.getElementById('customer_telephone').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_telephone').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                 }
    //                 if (customer_cellphone && customer_cellphone != 'Escolha...') {
    //                     document.getElementById('customer_cellphone').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_cellphone').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                 }

    //                 if (form_ok) {

    //                     $.ajax({

    //                         url: '../controller/customers/update_customer.php',
    //                         method: 'post',
    //                         data: {
    //                             customer_id: customer_id,
    //                             customer_name: customer_name,
    //                             customer_trade_name: customer_trade_name,
    //                             customer_email: customer_email,
    //                             customer_cpf: customer_cpf,
    //                             customer_natural_legal: customer_natural_legal,
    //                             customer_rg: customer_rg,
    //                             customer_telephone: customer_telephone,
    //                             customer_cellphone: customer_cellphone
    //                         },

    //                         success: function (data) {

    //                             $('#list-customer').DataTable().ajax.reload();
    //                             $('#modal_edit_customer').modal('hide');
    //                             $('#modal_update_customer_success_message').modal(
    //                                 'show');
    //                         }
    //                     });
    //                 }
    //             }
    //         }
    //     });
    // });


    // $("#btn_confirm_customer_update").click(function () {

    //     var customer_id = $('#customer_id').val();

    //     $.ajax({

    //         url: '../controller/customers/read_customer.php',
    //         method: 'post',
    //         data: {
    //             customer_id: customer_id
    //         },
    //         success: function (data) {

    //             var customer_row = JSON.parse(data);
    //             var validate_customer_id = customer_row['customer_id'] == $('#customer_id').val();
    //             var validate_customer_name = customer_row['customer_name'] == $('#customer_name')
    //                 .val().toUpperCase();
    //             var validate_customer_trade_name = customer_row['customer_trade_name'] == $('#customer_trade_name')
    //                 .val().toUpperCase();
    //             var validate_customer_email = customer_row['customer_email'] == $(
    //                 '#customer_email').val().toUpperCase();
    //             var validate_customer_cpf = customer_row['customer_cpf'] == $(
    //                 '#customer_cpf').val().toUpperCase();
    //             var validate_customer_natural_legal = customer_row['customer_natural_legal'] ==
    //                 brl_to_float($(
    //                     '#customer_natural_legal').val());
    //             var validate_customer_rg = customer_row['customer_rg'] == $(
    //                 '#customer_rg').val();
    //             var validate_customer_telephone = customer_row['customer_telephone'] ==
    //                 brl_to_float($(
    //                     '#customer_telephone').val());
    //             var validate_customer_cellphone = customer_row['customer_cellphone'] == $(
    //                 '#customer_cellphone').val();

    //             if (validate_customer_id && validate_customer_name && validate_customer_trade_name &&
    //                 validate_customer_email && validate_customer_cpf &&
    //                 validate_customer_natural_legal && validate_customer_rg &&
    //                 validate_customer_telephone && validate_customer_cellphone) {
    //                 var form_equals_db = true;
    //             } else {
    //                 var form_equals_db = false;

    //             }

    //             var style = getComputedStyle(modal_confirm_delete);

    //             var display = style.display;

    //             if (display == 'none' && !form_equals_db) {

    //                 var customer_id = $('#customer_id').val();
    //                 var customer_name = $('#customer_name').val().toUpperCase();
    //                 var customer_email = $('#customer_email').val().toUpperCase();
    //                 var customer_cpf = $('#customer_cpf').val().toUpperCase();
    //                 var customer_natural_legal = $('#customer_natural_legal').val();
    //                 var customer_rg = $('#customer_rg').val();
    //                 var customer_telephone = $('#customer_telephone').val();
    //                 var customer_cellphone = $('#customer_cellphone').val();
    //                 var customer_trade_name = $('#customer_trade_name').val().toUpperCase();
    //                 var form_ok = true;

    //                 if (customer_name) {
    //                     document.getElementById('customer_name').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_name').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                     $('#modal_confirm_update_customer').modal('hide');
    //                     $('#modal_edit_customer').modal('show');
    //                 }
    //                 if (customer_email) {
    //                     document.getElementById('customer_email').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_email').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                     $('#modal_confirm_update_customer').modal('hide');
    //                     $('#modal_edit_customer').modal('show');
    //                 }
    //                 if (customer_cpf) {
    //                     document.getElementById('customer_cpf').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_cpf').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                     $('#modal_confirm_update_customer').modal('hide');
    //                     $('#modal_edit_customer').modal('show');
    //                 }
    //                 if (customer_natural_legal && isFloat(customer_natural_legal)) {
    //                     document.getElementById('customer_natural_legal').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_natural_legal').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                     $('#modal_confirm_update_customer').modal('hide');
    //                     $('#modal_edit_customer').modal('show');
    //                 }
    //                 if (customer_rg && isFloat(customer_rg)) {
    //                     document.getElementById('customer_rg').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_rg').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                     $('#modal_confirm_update_customer').modal('hide');
    //                     $('#modal_edit_customer').modal('show');
    //                 }
    //                 if (customer_telephone && isFloat(customer_telephone)) {
    //                     document.getElementById('customer_telephone').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_telephone').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                     $('#modal_confirm_update_customer').modal('hide');
    //                     $('#modal_edit_customer').modal('show');
    //                 }
    //                 if (customer_cellphone && customer_cellphone != 'Escolha...') {
    //                     document.getElementById('customer_cellphone').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_cellphone').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                     $('#modal_confirm_update_customer').modal('hide');
    //                     $('#modal_edit_customer').modal('show');
    //                 }

    //                 if (form_ok) {

    //                     $.ajax({

    //                         url: '../controller/customers/update_customer.php',
    //                         method: 'post',
    //                         data: {
    //                             customer_id: customer_id,
    //                             customer_name: customer_name,
    //                             customer_trade_name: customer_trade_name,
    //                             customer_email: customer_email,
    //                             customer_cpf: customer_cpf,
    //                             customer_natural_legal: customer_natural_legal,
    //                             customer_rg: customer_rg,
    //                             customer_telephone: customer_telephone,
    //                             customer_cellphone: customer_cellphone
    //                         },

    //                         success: function (data) {

    //                             $('#list-customer').DataTable().ajax.reload();
    //                             $('#modal_edit_customer').modal('hide');
    //                             $('#modal_confirm_update_customer').modal('hide');
    //                             $('#modal_update_customer_success_message').modal('show');
    //                         }
    //                     });
    //                 }
    //             }
    //         }
    //     });
    // });


    // function clean_modal_edit_customer() {

    //     document.getElementById('customer_name').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_email').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_cpf').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_natural_legal').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_rg').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_telephone').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_cellphone').style.boxShadow = "0px 0px";
    // };

    // function clean_modal_create_customer() {
    //     $('#customer_name_create').val('');
    //     $('#customer_email_create').val('');
    //     $('#customer_cpf_create').val('');
    //     $('#customer_natural_legal_create').val('0,00');
    //     $('#customer_rg_create').val('60');
    //     $('#customer_telephone_create').val('0,00');
    //     $('#customer_cellphone_create').val('Escolha...');
    //     $('#customer_trade_name_create').val('');

    //     document.getElementById('customer_name_create').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_email_create').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_cpf_create').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_natural_legal_create').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_rg_create').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_telephone_create').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_cellphone_create').style.boxShadow = "0px 0px";
    // };


    // function autocomplete_customer_groups(input) {
    //     $.ajax({

    //         url: '../controller/customers/read_customer_groups.php',
    //         method: 'post',
    //         success: function (data) {

    //             var groups = JSON.parse(data);
    //             for (var i = 0; i < groups.length; i++) {
    //                 groups[i] = groups[i].toString();
    //             }
    //             autocomplete(document.getElementById(input), groups);
    //         }
    //     });
    // };

    // function autocomplete_customer_brands(input) {
    //     $.ajax({

    //         url: '../controller/customers/read_customer_brands.php',
    //         method: 'post',
    //         success: function (data) {

    //             var brands = JSON.parse(data);
    //             for (var i = 0; i < brands.length; i++) {
    //                 brands[i] = brands[i].toString();
    //             }
    //             autocomplete(document.getElementById(input), brands);
    //         }
    //     });
    // };

    // $("#modal_create_customer").on('hidden.bs.modal', function () {
    //     clean_modal_create_customer();
    //     autocomplete_customer_groups('customer_cpf_create');
    //     autocomplete_customer_brands('customer_email_create');

    // });

    // $("#modal_create_customer").on('shown.bs.modal', function () {
    //     autocomplete_customer_groups('customer_cpf_create');
    //     autocomplete_customer_brands('customer_email_create');
    // });


    // $("#btn_create_customer").click(function () {

    //     var customer_name = $('#customer_name_create').val().toUpperCase();
    //     var customer_email = $('#customer_email_create').val().toUpperCase();
    //     var customer_cpf = $('#customer_cpf_create').val().toUpperCase();
    //     var customer_natural_legal = $('#customer_natural_legal_create').val();
    //     var customer_rg = $('#customer_rg_create').val();
    //     var customer_telephone = $('#customer_telephone_create').val();
    //     var customer_cellphone = $('#customer_cellphone_create').val();
    //     var customer_trade_name = $('#customer_trade_name_create').val();
    //     var form_ok = true;


    //     if (customer_name) {
    //         document.getElementById('customer_name_create').style.boxShadow = "0px 0px";
    //     } else {
    //         document.getElementById('customer_name_create').style.boxShadow =
    //             "0 0 0 .2rem rgba(255,0,0,.25)";
    //         form_ok = false;
    //     }
    //     if (customer_email) {
    //         document.getElementById('customer_email_create').style.boxShadow = "0px 0px";
    //     } else {
    //         document.getElementById('customer_email_create').style.boxShadow =
    //             "0 0 0 .2rem rgba(255,0,0,.25)";
    //         form_ok = false;
    //     }
    //     if (customer_cpf) {
    //         document.getElementById('customer_cpf_create').style.boxShadow = "0px 0px";
    //     } else {
    //         document.getElementById('customer_cpf_create').style.boxShadow =
    //             "0 0 0 .2rem rgba(255,0,0,.25)";
    //         form_ok = false;
    //     }
    //     if (customer_natural_legal && isFloat(customer_natural_legal)) {
    //         document.getElementById('customer_natural_legal_create').style.boxShadow = "0px 0px";
    //     } else {
    //         document.getElementById('customer_natural_legal_create').style.boxShadow =
    //             "0 0 0 .2rem rgba(255,0,0,.25)";
    //         form_ok = false;
    //     }
    //     if (customer_rg && isFloat(customer_rg)) {
    //         document.getElementById('customer_rg_create').style.boxShadow = "0px 0px";
    //     } else {
    //         document.getElementById('customer_rg_create').style.boxShadow =
    //             "0 0 0 .2rem rgba(255,0,0,.25)";
    //         form_ok = false;
    //     }
    //     if (customer_telephone && isFloat(customer_telephone)) {
    //         document.getElementById('customer_telephone_create').style.boxShadow = "0px 0px";
    //     } else {
    //         document.getElementById('customer_telephone_create').style.boxShadow =
    //             "0 0 0 .2rem rgba(255,0,0,.25)";
    //         form_ok = false;
    //     }
    //     if (customer_cellphone && customer_cellphone != 'Escolha...') {
    //         document.getElementById('customer_cellphone_create').style.boxShadow = "0px 0px";
    //     } else {
    //         document.getElementById('customer_cellphone_create').style.boxShadow =
    //             "0 0 0 .2rem rgba(255,0,0,.25)";
    //         form_ok = false;
    //     }
    //     if (form_ok) {

    //         $.ajax({
    //             url: '../controller/customers/create_customer.php',
    //             method: 'post',
    //             data: {
    //                 customer_name: customer_name,
    //                 customer_email: customer_email,
    //                 customer_cpf: customer_cpf,
    //                 customer_natural_legal: customer_natural_legal,
    //                 customer_rg: customer_rg,
    //                 customer_telephone: customer_telephone,
    //                 customer_cellphone: customer_cellphone,
    //                 customer_trade_name: customer_trade_name
    //             },
    //             success: function (data) {
    //                 $('#list-customer').DataTable().ajax.reload();
    //                 $('#modal_create_customer').modal('hide');
    //                 $('#modal_create_customer_success_message').modal('show');
    //                 clean_modal_create_customer();
    //             }
    //         });
    //     }
    // });


    // $('#customer_natural_legal').click(function () {
    //     selectAllText(jQuery(this))
    // });

    // $('#customer_rg').click(function () {
    //     selectAllText(jQuery(this))
    // });

    // $('#customer_telephone').click(function () {
    //     selectAllText(jQuery(this))
    // });

    // $('#customer_natural_legal_create').click(function () {
    //     selectAllText(jQuery(this))
    // });

    // $('#customer_rg_create').click(function () {
    //     selectAllText(jQuery(this))
    // });

    // $('#customer_telephone_create').click(function () {
    //     selectAllText(jQuery(this))
    // });


    // $("#btn_delete_customer").click(function () {

    //     $('#modal_edit_customer').modal('hide');
    //     var customer_id = $('#customer_id').val();

    //     $.ajax({

    //         url: '../controller/customers/read_customer.php',
    //         method: 'post',
    //         data: {
    //             customer_id: customer_id
    //         },
    //         success: function (data) {

    //             var customer_row = JSON.parse(data);
    //             var selected_customer = customer_row['customer_name'];
    //             $('#txt_delete_customer').text(
    //                 'Tem certeza que deseja excluir o cliente \"' +
    //                 selected_customer + '\"?');

    //         }
    //     });

    //     $('#modal_confirm_delete').modal('show');
    // });


    // $("#customer_natural_legal").keyup(function () {

    //     var customer_natural_legal = brl_to_float($("#customer_natural_legal").val());
    //     var customer_rg = $("#customer_rg").val();
    //     var customer_telephone = customer_natural_legal * ((customer_rg / 100) + 1);

    //     isNaN(customer_telephone) ? $("#customer_telephone").val('0,00') : $(
    //         "#customer_telephone").val(customer_telephone);

    //     isNaN(customer_natural_legal) ? $("#customer_natural_legal").val('0,00') : $(
    //         "#customer_natural_legal").val(float_to_brl(parseFloat(customer_natural_legal)));
    // });


    // $("#customer_rg").keyup(function () {

    //     var customer_natural_legal = brl_to_float($("#customer_natural_legal").val());
    //     var customer_rg = $("#customer_rg").val();
    //     var customer_telephone = customer_natural_legal * ((customer_rg / 100) + 1);

    //     isNaN(customer_rg) || customer_rg == '' ? $("#customer_rg").val('0') : $(
    //         "#customer_rg").val(parseInt(customer_rg));

    //     isNaN(customer_telephone) ? $("#customer_telephone").val('0,00') : $(
    //         "#customer_telephone").val(customer_telephone);
    // });


    // $("#customer_telephone").keyup(function () {

    //     var customer_natural_legal = brl_to_float($("#customer_natural_legal").val());
    //     var customer_telephone = $("#customer_telephone").val();
    //     var price_toFloat = brl_to_float(customer_telephone);
    //     var customer_natural_legal_double = brl_to_float(customer_natural_legal);
    //     var price_toBrl = float_to_brl(parseFloat(price_toFloat));
    //     var customer_rg = ((price_toFloat / customer_natural_legal_double) - 1) * 100;

    //     if (customer_rg < 1 || isNaN(customer_rg) || customer_rg ==
    //         Infinity) {
    //         $("#customer_rg").val('0');
    //     } else {
    //         $("#customer_rg").val(parseInt(customer_rg));
    //     }

    //     isNaN(parseFloat(price_toBrl)) ? $("#customer_telephone").val('0,00') : $(
    //         "#customer_telephone").val(
    //             price_toBrl);
    // });


    // $("#customer_natural_legal_create").keyup(function () {

    //     var customer_natural_legal = brl_to_float($("#customer_natural_legal_create").val());
    //     var customer_rg = $("#customer_rg_create").val();
    //     var customer_telephone = customer_natural_legal * ((customer_rg / 100) + 1);

    //     isNaN(customer_telephone) ? $("#customer_telephone_create").val('0,00') : $(
    //         "#customer_telephone_create").val(customer_telephone);

    //     isNaN(customer_natural_legal) ? $("#customer_natural_legal_create").val('0,00') : $(
    //         "#customer_natural_legal_create").val(float_to_brl(parseFloat(customer_natural_legal)));
    // });


    // $("#customer_rg_create").keyup(function () {

    //     var string_customer_natural_legal = $("#customer_natural_legal_create").val().toString();

    //     var x = string_customer_natural_legal.length;
    //     var customer_natural_legal = brl_to_float($("#customer_natural_legal_create").val());
    //     var customer_rg = $("#customer_rg_create").val();
    //     var customer_telephone = customer_natural_legal * ((customer_rg / 100) + 1);
    //     var customer_natural_legal_double = brl_to_float(customer_natural_legal);

    //     isNaN(customer_rg) || customer_rg == '' ? $("#customer_rg_create").val('0') : $(
    //         "#customer_rg_create").val(parseInt(customer_rg));

    //     isNaN(customer_telephone) ? $("#customer_telephone_create").val('0,00') : $(
    //         "#customer_telephone_create").val(customer_telephone);

    // });


    // $("#customer_telephone_create").keyup(function () {

    //     var customer_natural_legal = brl_to_float($("#customer_natural_legal_create").val());
    //     var customer_telephone = $("#customer_telephone_create").val();

    //     var price_toFloat = brl_to_float(customer_telephone);
    //     var customer_natural_legal_double = brl_to_float(customer_natural_legal);
    //     var price_toBrl = float_to_brl(parseFloat(price_toFloat));
    //     var customer_rg = ((price_toFloat / customer_natural_legal_double) - 1) * 100;

    //     if (customer_rg < 1 || isNaN(customer_rg) || customer_rg ==
    //         Infinity) {
    //         $("#customer_rg_create").val('0');
    //     } else {
    //         $("#customer_rg_create").val(parseInt(customer_rg));
    //     }

    //     isNaN(parseFloat(price_toBrl)) ? $("#customer_telephone_create").val('0,00') : $(
    //         "#customer_telephone_create").val(
    //             price_toBrl);

    // });



});