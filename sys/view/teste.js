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
        var customer_registry_date = data[0];

        $.ajax({

            url: '../controller/customers/read_customer.php',
            method: 'post',
            data: {
                customer_registry_date: customer_registry_date
            },
            success: function (data) {

                var customer_row = JSON.parse(data);

                $('#customer_registry_date').val(customer_row['customer_registry_date']);
                $('#customer_obs').val(customer_row['customer_obs']);
                $('#customer_address_type').val(customer_row['customer_address_type']);
                $('#customer_address').val(customer_row['customer_address']);
                $('#customer_address_number').val(customer_row['customer_address_number']);
                $('#customer_address_complements').val(customer_row['customer_address_complements']);
                $('#customer_zone').val(customer_row['customer_zone']);
                $('#customer_state').val(customer_row['customer_state']);
                $('#customer_city').val(customer_row['customer_city']);
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

        // autocomplete_customer_groups('customer_address_number');
        // autocomplete_customer_brands('customer_address');
        var customer_registry_date = $('#customer_registry_date').val();

        $.ajax({

            url: '../controller/customers/read_customer.php',
            method: 'post',
            data: {
                customer_registry_date: customer_registry_date
            },
            success: function (data) {

                var customer_row = JSON.parse(data);
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





















                if (validate_customer_registry_date && validate_customer_obs && validate_customer_address_type &&
                    validate_customer_address && validate_customer_address_number &&
                    validate_customer_address_complements && validate_customer_zone &&
                    validate_customer_state && validate_customer_city) {
                    var form_equals_db = true;
                } else {
                    var form_equals_db = false;

                }

                var style = getComputedStyle(modal_confirm_delete);

                var display = style.display;

                if (display == 'none' && !form_equals_db) {

                    clean_modal_edit_customer();
                    $('#modal_confirm_update_customer').modal('show');
                }
            }
        });
    });


    // $("#modal_edit_customer").on('shown.bs.modal', function () {
    //     autocomplete_customer_groups('customer_address_number');
    //     autocomplete_customer_brands('customer_address');
    // });


    // $("#btn_confirm_customer_deletion").click(function () {

    //     var customer_registry_date = $('#customer_registry_date').val();

    //     $.ajax({

    //         url: '../controller/customers/delete_customer.php',
    //         method: 'post',
    //         data: {
    //             customer_registry_date: customer_registry_date
    //         },
    //         success: function (data) {


    //             $('#modal_confirm_delete').modal('hide');
    //             $('#list-customer').DataTable().ajax.reload();


    //         }
    //     });
    // });


    // $('#btn_update_customer').click(function () {

    //     var customer_registry_date = $('#customer_registry_date').val();

    //     $.ajax({

    //         url: '../controller/customers/read_customer.php',
    //         method: 'post',
    //         data: {
    //             customer_registry_date: customer_registry_date
    //         },
    //         success: function (data) {

    //             var customer_row = JSON.parse(data);

    //             var validate_customer_registry_date = customer_row['customer_registry_date'] == $('#customer_registry_date').val();
    //             var validate_customer_obs = customer_row['customer_obs'] == $('#customer_obs')
    //                 .val().toUpperCase();
    //             var validate_customer_address_type = customer_row['customer_address_type'] == $('#customer_address_type')
    //                 .val().toUpperCase();
    //             var validate_customer_address = customer_row['customer_address'] == $(
    //                 '#customer_address').val().toUpperCase();
    //             var validate_customer_address_number = customer_row['customer_address_number'] == $(
    //                 '#customer_address_number').val().toUpperCase();
    //             var validate_customer_address_complements = customer_row['customer_address_complements'] ==
    //                 brl_to_float($(
    //                     '#customer_address_complements').val());
    //             var validate_customer_zone = customer_row['customer_zone'] == $(
    //                 '#customer_zone').val();
    //             var validate_customer_state = customer_row['customer_state'] ==
    //                 brl_to_float($(
    //                     '#customer_state').val());
    //             var validate_customer_city = customer_row['customer_city'] == $(
    //                 '#customer_city').val();

    //             if (validate_customer_registry_date && validate_customer_obs && validate_customer_address_type &&
    //                 validate_customer_address && validate_customer_address_number &&
    //                 validate_customer_address_complements && validate_customer_zone &&
    //                 validate_customer_state && validate_customer_city) {
    //                 var form_equals_db = true;
    //             } else {
    //                 var form_equals_db = false;

    //             }

    //             var style = getComputedStyle(modal_confirm_delete);

    //             var display = style.display;

    //             if (display == 'none' && !form_equals_db) {

    //                 var customer_registry_date = $('#customer_registry_date').val();
    //                 var customer_obs = $('#customer_obs').val().toUpperCase();
    //                 var customer_address = $('#customer_address').val().toUpperCase();
    //                 var customer_address_number = $('#customer_address_number').val().toUpperCase();
    //                 var customer_address_complements = $('#customer_address_complements').val();
    //                 var customer_zone = $('#customer_zone').val();
    //                 var customer_state = $('#customer_state').val();
    //                 var customer_city = $('#customer_city').val();
    //                 var customer_address_type = $('#customer_address_type').val().toUpperCase();
    //                 var form_ok = true;

    //                 if (customer_obs) {
    //                     document.getElementById('customer_obs').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_obs').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                 }
    //                 if (customer_address) {
    //                     document.getElementById('customer_address').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_address').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                 }
    //                 if (customer_address_number) {
    //                     document.getElementById('customer_address_number').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_address_number').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                 }
    //                 if (customer_address_complements && isFloat(customer_address_complements)) {
    //                     document.getElementById('customer_address_complements').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_address_complements').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                 }
    //                 if (customer_zone && isFloat(customer_zone)) {
    //                     document.getElementById('customer_zone').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_zone').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                 }
    //                 if (customer_state && isFloat(customer_state)) {
    //                     document.getElementById('customer_state').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_state').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                 }
    //                 if (customer_city && customer_city != 'Escolha...') {
    //                     document.getElementById('customer_city').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_city').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                 }

    //                 if (form_ok) {

    //                     $.ajax({

    //                         url: '../controller/customers/update_customer.php',
    //                         method: 'post',
    //                         data: {
    //                             customer_registry_date: customer_registry_date,
    //                             customer_obs: customer_obs,
    //                             customer_address_type: customer_address_type,
    //                             customer_address: customer_address,
    //                             customer_address_number: customer_address_number,
    //                             customer_address_complements: customer_address_complements,
    //                             customer_zone: customer_zone,
    //                             customer_state: customer_state,
    //                             customer_city: customer_city
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

    //     var customer_registry_date = $('#customer_registry_date').val();

    //     $.ajax({

    //         url: '../controller/customers/read_customer.php',
    //         method: 'post',
    //         data: {
    //             customer_registry_date: customer_registry_date
    //         },
    //         success: function (data) {

    //             var customer_row = JSON.parse(data);
    //             var validate_customer_registry_date = customer_row['customer_registry_date'] == $('#customer_registry_date').val();
    //             var validate_customer_obs = customer_row['customer_obs'] == $('#customer_obs')
    //                 .val().toUpperCase();
    //             var validate_customer_address_type = customer_row['customer_address_type'] == $('#customer_address_type')
    //                 .val().toUpperCase();
    //             var validate_customer_address = customer_row['customer_address'] == $(
    //                 '#customer_address').val().toUpperCase();
    //             var validate_customer_address_number = customer_row['customer_address_number'] == $(
    //                 '#customer_address_number').val().toUpperCase();
    //             var validate_customer_address_complements = customer_row['customer_address_complements'] ==
    //                 brl_to_float($(
    //                     '#customer_address_complements').val());
    //             var validate_customer_zone = customer_row['customer_zone'] == $(
    //                 '#customer_zone').val();
    //             var validate_customer_state = customer_row['customer_state'] ==
    //                 brl_to_float($(
    //                     '#customer_state').val());
    //             var validate_customer_city = customer_row['customer_city'] == $(
    //                 '#customer_city').val();

    //             if (validate_customer_registry_date && validate_customer_obs && validate_customer_address_type &&
    //                 validate_customer_address && validate_customer_address_number &&
    //                 validate_customer_address_complements && validate_customer_zone &&
    //                 validate_customer_state && validate_customer_city) {
    //                 var form_equals_db = true;
    //             } else {
    //                 var form_equals_db = false;

    //             }

    //             var style = getComputedStyle(modal_confirm_delete);

    //             var display = style.display;

    //             if (display == 'none' && !form_equals_db) {

    //                 var customer_registry_date = $('#customer_registry_date').val();
    //                 var customer_obs = $('#customer_obs').val().toUpperCase();
    //                 var customer_address = $('#customer_address').val().toUpperCase();
    //                 var customer_address_number = $('#customer_address_number').val().toUpperCase();
    //                 var customer_address_complements = $('#customer_address_complements').val();
    //                 var customer_zone = $('#customer_zone').val();
    //                 var customer_state = $('#customer_state').val();
    //                 var customer_city = $('#customer_city').val();
    //                 var customer_address_type = $('#customer_address_type').val().toUpperCase();
    //                 var form_ok = true;

    //                 if (customer_obs) {
    //                     document.getElementById('customer_obs').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_obs').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                     $('#modal_confirm_update_customer').modal('hide');
    //                     $('#modal_edit_customer').modal('show');
    //                 }
    //                 if (customer_address) {
    //                     document.getElementById('customer_address').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_address').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                     $('#modal_confirm_update_customer').modal('hide');
    //                     $('#modal_edit_customer').modal('show');
    //                 }
    //                 if (customer_address_number) {
    //                     document.getElementById('customer_address_number').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_address_number').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                     $('#modal_confirm_update_customer').modal('hide');
    //                     $('#modal_edit_customer').modal('show');
    //                 }
    //                 if (customer_address_complements && isFloat(customer_address_complements)) {
    //                     document.getElementById('customer_address_complements').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_address_complements').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                     $('#modal_confirm_update_customer').modal('hide');
    //                     $('#modal_edit_customer').modal('show');
    //                 }
    //                 if (customer_zone && isFloat(customer_zone)) {
    //                     document.getElementById('customer_zone').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_zone').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                     $('#modal_confirm_update_customer').modal('hide');
    //                     $('#modal_edit_customer').modal('show');
    //                 }
    //                 if (customer_state && isFloat(customer_state)) {
    //                     document.getElementById('customer_state').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_state').style.boxShadow =
    //                         "0 0 0 .2rem rgba(255,0,0,.25)";
    //                     form_ok = false;
    //                     $('#modal_confirm_update_customer').modal('hide');
    //                     $('#modal_edit_customer').modal('show');
    //                 }
    //                 if (customer_city && customer_city != 'Escolha...') {
    //                     document.getElementById('customer_city').style.boxShadow =
    //                         "0px 0px";
    //                 } else {
    //                     document.getElementById('customer_city').style.boxShadow =
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
    //                             customer_registry_date: customer_registry_date,
    //                             customer_obs: customer_obs,
    //                             customer_address_type: customer_address_type,
    //                             customer_address: customer_address,
    //                             customer_address_number: customer_address_number,
    //                             customer_address_complements: customer_address_complements,
    //                             customer_zone: customer_zone,
    //                             customer_state: customer_state,
    //                             customer_city: customer_city
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

    //     document.getElementById('customer_obs').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_address').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_address_number').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_address_complements').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_zone').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_state').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_city').style.boxShadow = "0px 0px";
    // };

    // function clean_modal_create_customer() {
    //     $('#customer_obs_create').val('');
    //     $('#customer_address_create').val('');
    //     $('#customer_address_number_create').val('');
    //     $('#customer_address_complements_create').val('0,00');
    //     $('#customer_zone_create').val('60');
    //     $('#customer_state_create').val('0,00');
    //     $('#customer_city_create').val('Escolha...');
    //     $('#customer_address_type_create').val('');

    //     document.getElementById('customer_obs_create').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_address_create').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_address_number_create').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_address_complements_create').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_zone_create').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_state_create').style.boxShadow = "0px 0px";
    //     document.getElementById('customer_city_create').style.boxShadow = "0px 0px";
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
    //     autocomplete_customer_groups('customer_address_number_create');
    //     autocomplete_customer_brands('customer_address_create');

    // });

    // $("#modal_create_customer").on('shown.bs.modal', function () {
    //     autocomplete_customer_groups('customer_address_number_create');
    //     autocomplete_customer_brands('customer_address_create');
    // });


    // $("#btn_create_customer").click(function () {

    //     var customer_obs = $('#customer_obs_create').val().toUpperCase();
    //     var customer_address = $('#customer_address_create').val().toUpperCase();
    //     var customer_address_number = $('#customer_address_number_create').val().toUpperCase();
    //     var customer_address_complements = $('#customer_address_complements_create').val();
    //     var customer_zone = $('#customer_zone_create').val();
    //     var customer_state = $('#customer_state_create').val();
    //     var customer_city = $('#customer_city_create').val();
    //     var customer_address_type = $('#customer_address_type_create').val();
    //     var form_ok = true;


    //     if (customer_obs) {
    //         document.getElementById('customer_obs_create').style.boxShadow = "0px 0px";
    //     } else {
    //         document.getElementById('customer_obs_create').style.boxShadow =
    //             "0 0 0 .2rem rgba(255,0,0,.25)";
    //         form_ok = false;
    //     }
    //     if (customer_address) {
    //         document.getElementById('customer_address_create').style.boxShadow = "0px 0px";
    //     } else {
    //         document.getElementById('customer_address_create').style.boxShadow =
    //             "0 0 0 .2rem rgba(255,0,0,.25)";
    //         form_ok = false;
    //     }
    //     if (customer_address_number) {
    //         document.getElementById('customer_address_number_create').style.boxShadow = "0px 0px";
    //     } else {
    //         document.getElementById('customer_address_number_create').style.boxShadow =
    //             "0 0 0 .2rem rgba(255,0,0,.25)";
    //         form_ok = false;
    //     }
    //     if (customer_address_complements && isFloat(customer_address_complements)) {
    //         document.getElementById('customer_address_complements_create').style.boxShadow = "0px 0px";
    //     } else {
    //         document.getElementById('customer_address_complements_create').style.boxShadow =
    //             "0 0 0 .2rem rgba(255,0,0,.25)";
    //         form_ok = false;
    //     }
    //     if (customer_zone && isFloat(customer_zone)) {
    //         document.getElementById('customer_zone_create').style.boxShadow = "0px 0px";
    //     } else {
    //         document.getElementById('customer_zone_create').style.boxShadow =
    //             "0 0 0 .2rem rgba(255,0,0,.25)";
    //         form_ok = false;
    //     }
    //     if (customer_state && isFloat(customer_state)) {
    //         document.getElementById('customer_state_create').style.boxShadow = "0px 0px";
    //     } else {
    //         document.getElementById('customer_state_create').style.boxShadow =
    //             "0 0 0 .2rem rgba(255,0,0,.25)";
    //         form_ok = false;
    //     }
    //     if (customer_city && customer_city != 'Escolha...') {
    //         document.getElementById('customer_city_create').style.boxShadow = "0px 0px";
    //     } else {
    //         document.getElementById('customer_city_create').style.boxShadow =
    //             "0 0 0 .2rem rgba(255,0,0,.25)";
    //         form_ok = false;
    //     }
    //     if (form_ok) {

    //         $.ajax({
    //             url: '../controller/customers/create_customer.php',
    //             method: 'post',
    //             data: {
    //                 customer_obs: customer_obs,
    //                 customer_address: customer_address,
    //                 customer_address_number: customer_address_number,
    //                 customer_address_complements: customer_address_complements,
    //                 customer_zone: customer_zone,
    //                 customer_state: customer_state,
    //                 customer_city: customer_city,
    //                 customer_address_type: customer_address_type
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


    // $('#customer_address_complements').click(function () {
    //     selectAllText(jQuery(this))
    // });

    // $('#customer_zone').click(function () {
    //     selectAllText(jQuery(this))
    // });

    // $('#customer_state').click(function () {
    //     selectAllText(jQuery(this))
    // });

    // $('#customer_address_complements_create').click(function () {
    //     selectAllText(jQuery(this))
    // });

    // $('#customer_zone_create').click(function () {
    //     selectAllText(jQuery(this))
    // });

    // $('#customer_state_create').click(function () {
    //     selectAllText(jQuery(this))
    // });


    // $("#btn_delete_customer").click(function () {

    //     $('#modal_edit_customer').modal('hide');
    //     var customer_registry_date = $('#customer_registry_date').val();

    //     $.ajax({

    //         url: '../controller/customers/read_customer.php',
    //         method: 'post',
    //         data: {
    //             customer_registry_date: customer_registry_date
    //         },
    //         success: function (data) {

    //             var customer_row = JSON.parse(data);
    //             var selected_customer = customer_row['customer_obs'];
    //             $('#txt_delete_customer').text(
    //                 'Tem certeza que deseja excluir o cliente \"' +
    //                 selected_customer + '\"?');

    //         }
    //     });

    //     $('#modal_confirm_delete').modal('show');
    // });


    // $("#customer_address_complements").keyup(function () {

    //     var customer_address_complements = brl_to_float($("#customer_address_complements").val());
    //     var customer_zone = $("#customer_zone").val();
    //     var customer_state = customer_address_complements * ((customer_zone / 100) + 1);

    //     isNaN(customer_state) ? $("#customer_state").val('0,00') : $(
    //         "#customer_state").val(customer_state);

    //     isNaN(customer_address_complements) ? $("#customer_address_complements").val('0,00') : $(
    //         "#customer_address_complements").val(float_to_brl(parseFloat(customer_address_complements)));
    // });


    // $("#customer_zone").keyup(function () {

    //     var customer_address_complements = brl_to_float($("#customer_address_complements").val());
    //     var customer_zone = $("#customer_zone").val();
    //     var customer_state = customer_address_complements * ((customer_zone / 100) + 1);

    //     isNaN(customer_zone) || customer_zone == '' ? $("#customer_zone").val('0') : $(
    //         "#customer_zone").val(parseInt(customer_zone));

    //     isNaN(customer_state) ? $("#customer_state").val('0,00') : $(
    //         "#customer_state").val(customer_state);
    // });


    // $("#customer_state").keyup(function () {

    //     var customer_address_complements = brl_to_float($("#customer_address_complements").val());
    //     var customer_state = $("#customer_state").val();
    //     var price_toFloat = brl_to_float(customer_state);
    //     var customer_address_complements_double = brl_to_float(customer_address_complements);
    //     var price_toBrl = float_to_brl(parseFloat(price_toFloat));
    //     var customer_zone = ((price_toFloat / customer_address_complements_double) - 1) * 100;

    //     if (customer_zone < 1 || isNaN(customer_zone) || customer_zone ==
    //         Infinity) {
    //         $("#customer_zone").val('0');
    //     } else {
    //         $("#customer_zone").val(parseInt(customer_zone));
    //     }

    //     isNaN(parseFloat(price_toBrl)) ? $("#customer_state").val('0,00') : $(
    //         "#customer_state").val(
    //             price_toBrl);
    // });


    // $("#customer_address_complements_create").keyup(function () {

    //     var customer_address_complements = brl_to_float($("#customer_address_complements_create").val());
    //     var customer_zone = $("#customer_zone_create").val();
    //     var customer_state = customer_address_complements * ((customer_zone / 100) + 1);

    //     isNaN(customer_state) ? $("#customer_state_create").val('0,00') : $(
    //         "#customer_state_create").val(customer_state);

    //     isNaN(customer_address_complements) ? $("#customer_address_complements_create").val('0,00') : $(
    //         "#customer_address_complements_create").val(float_to_brl(parseFloat(customer_address_complements)));
    // });


    // $("#customer_zone_create").keyup(function () {

    //     var string_customer_address_complements = $("#customer_address_complements_create").val().toString();

    //     var x = string_customer_address_complements.length;
    //     var customer_address_complements = brl_to_float($("#customer_address_complements_create").val());
    //     var customer_zone = $("#customer_zone_create").val();
    //     var customer_state = customer_address_complements * ((customer_zone / 100) + 1);
    //     var customer_address_complements_double = brl_to_float(customer_address_complements);

    //     isNaN(customer_zone) || customer_zone == '' ? $("#customer_zone_create").val('0') : $(
    //         "#customer_zone_create").val(parseInt(customer_zone));

    //     isNaN(customer_state) ? $("#customer_state_create").val('0,00') : $(
    //         "#customer_state_create").val(customer_state);

    // });


    // $("#customer_state_create").keyup(function () {

    //     var customer_address_complements = brl_to_float($("#customer_address_complements_create").val());
    //     var customer_state = $("#customer_state_create").val();

    //     var price_toFloat = brl_to_float(customer_state);
    //     var customer_address_complements_double = brl_to_float(customer_address_complements);
    //     var price_toBrl = float_to_brl(parseFloat(price_toFloat));
    //     var customer_zone = ((price_toFloat / customer_address_complements_double) - 1) * 100;

    //     if (customer_zone < 1 || isNaN(customer_zone) || customer_zone ==
    //         Infinity) {
    //         $("#customer_zone_create").val('0');
    //     } else {
    //         $("#customer_zone_create").val(parseInt(customer_zone));
    //     }

    //     isNaN(parseFloat(price_toBrl)) ? $("#customer_state_create").val('0,00') : $(
    //         "#customer_state_create").val(
    //             price_toBrl);

    // });



});