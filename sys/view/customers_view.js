//----------------------------------------------DATATABLE---------------------------------------------------------

$(document).ready(function () {
    var table = $('#list-customers').DataTable({
        "processing": true,
        "serverSide": true,
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
        },
        "initComplete": function (settings, json) {
            add_button_create_customer();
        },

        "ajax": {
            "url": "../controller/customers/datatable.php",
            "type": "POST"
        }
    });

    function add_button_create_customer() {

        $('#list-customers_filter').prepend(
            '<button type="button" class="btn btn-primary btn_open_create_modal" id="btn_open_create_customer_modal">Adicionar Cliente</button>'
        );

        $('#btn_open_create_customer_modal').on("click", function () {

            $('#modal_create_customer').modal('show');

        });
    }

    //--------------------------------------------CHECK-FIELDS----------------------------------------------------

    function form_update_customer_changed(data) {

        var customer_row = JSON.parse(data);
        var changed = false;

        customer_row['customer_id'] == $('#customer_id').val() ? 0 : changed = true;
        customer_row['customer_name'] == $('#customer_name').val().toUpperCase() ? 0 : changed = true;
        customer_row['customer_trade_name'] == $('#customer_trade_name').val().toUpperCase() ? 0 : changed = true;
        customer_row['customer_email'] == $('#customer_email').val().toUpperCase() ? 0 : changed = true;
        customer_row['customer_cpf'] == $('#customer_cpf').val() ? 0 : changed = true;
        customer_row['customer_natural_legal'] == $('#customer_natural_legal').val() ? 0 : changed = true;
        customer_row['customer_rg'] == $('#customer_rg').val() ? 0 : changed = true;
        customer_row['customer_telephone'] == $('#customer_telephone').val() ? 0 : changed = true;
        customer_row['customer_cellphone'] == $('#customer_cellphone').val() ? 0 : changed = true;
        customer_row['customer_obs'] == $('#customer_obs').val().toUpperCase() ? 0 : changed = true;
        customer_row['customer_address_type'] == $('#customer_address_type').val().toUpperCase() ? 0 : changed = true;
        customer_row['customer_address'] == $('#customer_address').val().toUpperCase() ? 0 : changed = true;
        customer_row['customer_address_number'] == $('#customer_address_number').val() ? 0 : changed = true;
        customer_row['customer_address_complements'] == $('#customer_address_complements').val().toUpperCase() ? 0 : changed = true;
        customer_row['customer_zone'] == $('#customer_zone').val() ? 0 : changed = true;
        customer_row['customer_state'] == $('#customer_state').val() ? 0 : changed = true;
        customer_row['customer_city'] == $('#customer_city').val() ? 0 : changed = true;
        customer_row['customer_cep'] == $('#customer_cep').val() ? 0 : changed = true;

        return changed;

    }

    //--------------------------------------------CREATE----------------------------------------------------------

    $("#btn_create_customer").click(function () {

        if ($('#customer_cellphone_create').val()) {
            document.getElementById("customer_telephone_create").required = false;
        }

    });

    $("#form_create_customer").on('submit', function (e) {

        e.preventDefault();
        var data = $(this).serialize();

        $.ajax({
            url: '../controller/customers/create_customer.php',
            method: 'post',
            data: data,
            success: function (data) {

                if (data) {
                    var error = data;
                    var regExp = /Duplicate entry/;
                    var name_already_used = regExp.test(error);
                    if (name_already_used) {
                        alert("Não é possível cadastrar dois clientes com o mesmo nome.");
                    }

                } else {

                    $('#list-customers').DataTable().ajax.reload();
                    $('#modal_create_customer').modal('hide');
                    $('#modal_create_customer_success_message').modal('show');
                    clean_modal_create_customer();
                }
            }
        });

    });

    function clean_modal_create_customer() {

        form_length = document.getElementById("form_create_customer").length;

        for (let index = 0; index < form_length; index++) {
            var input = document.getElementById("form_create_customer").elements[index]['id'];
            document.getElementById(input).value = '';
        }

        document.getElementById("customer_telephone_create").required = true;
        document.getElementById("form_create_customer").reset();

    };

    $("#modal_create_customer").on('hidden.bs.modal', function () {
        clean_modal_create_customer();
        autocomplete_customer_zones('customer_zone_create');
        autocomplete_customer_adresses('customer_address_create');

    });

    $("#modal_create_customer").on('shown.bs.modal', function () {

        autocomplete_customer_zones('customer_zone_create');
        autocomplete_customer_adresses('customer_address_create');

    });

    $('#customer_natural_legal_create').change(function () {

        var customer_natural_legal = $('#customer_natural_legal_create').val();

        if (customer_natural_legal == 'PESSOA FÍSICA') {
            $('#label_customer_name_create').html('Nome');
            $('#label_customer_trade_name_create').html('Apelido');
            $('#label_customer_rg_create').html('RG');
            $('#label_customer_cpf_create').html('CPF');
            jQuery("#customer_cpf_create").mask('000.000.000-00');
        }

        if (customer_natural_legal == 'PESSOA JURÍDICA') {
            $('#label_customer_name_create').html('Razão Social');
            $('#label_customer_trade_name_create').html('Nome Fantasia');
            $('#label_customer_rg_create').html('Inscrição Estadual');
            $('#label_customer_cpf_create').html('CNPJ');
            jQuery("#customer_cpf_create").mask('00.000.000/0000-00');

        }

    });

    enter_to_send_form('modal_create_customer', 'btn_create_customer');
    enter_to_send_form('modal_create_customer_success_message', 'modal_close_create_customer_success_message');


    //--------------------------------------------READ------------------------------------------------------------

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

                insert_data_on_modal_update_customer(data);

                $('#modal_update_customer').modal('show');

            }
        });
    });

    function insert_data_on_modal_update_customer(data) {

        var customer_row = JSON.parse(data);

        $('#customer_id').val(customer_row['customer_id']);
        $('#customer_name').val(customer_row['customer_name']);
        $('#customer_trade_name').val(customer_row['customer_trade_name']);
        $('#customer_email').val(customer_row['customer_email']);
        $('#customer_cpf').val(customer_row['customer_cpf']);
        $('#customer_natural_legal').val(customer_row['customer_natural_legal']);
        change_customer_natural_legal();
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

    }

    //--------------------------------------------UPDATE----------------------------------------------------------

    $("#form_update_customer").on('submit', function (e) {

        e.preventDefault();
        var customer_id = $('#customer_id').val();

        $.ajax({

            url: '../controller/customers/read_customer.php',
            method: 'post',
            data: {
                customer_id: customer_id
            },
            success: function (data) {

                var form_changed = form_update_customer_changed(data);

                if (form_changed && !$(modal_confirm_delete).hasClass('show')) {

                    send_form_update_customer();

                }
            }
        });
    });


    $('#btn_confirm_customer_update').click(function () {

        form = document.getElementById("form_update_customer");

        if (!form.reportValidity()) {

            $('#modal_update_customer').modal('show');
            $('#modal_confirm_update_customer').modal('hide');
        }

    });

    $("#modal_update_customer").on('hide.bs.modal', function () {

        autocomplete_customer_zones('customer_zone');
        autocomplete_customer_adresses('customer_address');
        var customer_id = $('#customer_id').val();

        $.ajax({

            url: '../controller/customers/read_customer.php',
            method: 'post',
            data: {
                customer_id: customer_id
            },
            success: function (data) {

                var form_changed = form_update_customer_changed(data);

                if (form_changed && !$(modal_confirm_delete).hasClass('show')) {

                    $('#modal_confirm_update_customer').modal('show');
                }
            }
        });
    });

    function send_form_update_customer() {

        var data = $("#form_update_customer").serialize();

        $.ajax({

            url: '../controller/customers/update_customer.php',
            method: 'post',
            data: data,

            success: function (data) {

                if (data) {
                    var error = data;
                    var regExp = /Duplicate entry/;
                    var name_already_used = regExp.test(error);
                    if (name_already_used) {
                        $('#modal_update_customer').modal('show');
                        $('#modal_confirm_update_customer').modal('hide');
                        alert("Não é possível cadastrar dois clientes com o mesmo nome.");
                    }

                } else {

                    $('#list-customers').DataTable().ajax.reload();
                    $('#modal_update_customer').modal('hide');
                    $('#modal_confirm_update_customer').modal('hide');
                    $('#modal_update_customer_success_message').modal('show');
                }
            }
        });

    }

    $("#modal_update_customer").on('shown.bs.modal', function () {
        autocomplete_customer_zones('customer_zone');
        autocomplete_customer_adresses('customer_address');

    });

    $('#customer_natural_legal').change(function () {

        change_customer_natural_legal();

    });

    function change_customer_natural_legal() {

        var customer_natural_legal = $('#customer_natural_legal').val();

        if (customer_natural_legal == 'PESSOA FÍSICA') {
            $('#label_customer_name').html('Nome');
            $('#label_customer_trade_name').html('Apelido');
            $('#label_customer_rg').html('RG');
            $('#label_customer_cpf').html('CPF');
            jQuery("#customer_cpf").mask('000.000.000-00');
            $("#customer_cpf").attr("title", "000.000.000-00");
        }

        if (customer_natural_legal == 'PESSOA JURÍDICA') {
            $('#label_customer_name').html('Razão Social');
            $('#label_customer_trade_name').html('Nome Fantasia');
            $('#label_customer_rg').html('Inscrição Estadual');
            $('#label_customer_cpf').html('CNPJ');
            jQuery("#customer_cpf").mask('00.000.000/0000-00');
            $("#customer_cpf").attr("title", "00.000.000/0000-00");
        }

    };

    enter_to_send_form('modal_update_customer', 'btn_update_customer');
    enter_to_send_form('modal_update_customer_success_message', 'modal_close_update_customer_success_message');
    enter_to_send_form('modal_confirm_update_customer', 'btn_confirm_customer_update');

    //--------------------------------------------DELETE----------------------------------------------------------

    $("#btn_delete_customer").click(function () {

        $('#modal_update_customer').modal('hide');
        var customer_id = $('#customer_id').val();

        $.ajax({

            url: '../controller/customers/read_customer.php',
            method: 'post',
            data: {
                customer_id: customer_id
            },
            success: function (data) {

                var customer_row = JSON.parse(data);
                var selected_customer_name = customer_row['customer_name'];
                $('#txt_delete_customer').text(
                    'Tem certeza que deseja excluir o cliente \"' +
                    selected_customer_name + '\"?');

            }
        });

        $('#modal_confirm_delete').modal('show');
    });


    $("#btn_confirm_customer_deletion").click(function () {

        var customer_id = $('#customer_id').val();

        $.ajax({

            url: '../controller/customers/delete_customer.php',
            method: 'post',
            data: {
                customer_id: customer_id
            },
            success: function (data) {

                console.log(data);
                $('#modal_confirm_delete').modal('hide');
                $('#list-customers').DataTable().ajax.reload();

            }
        });
    });


    $(".btn_cancel_customer_deletion").click(function () {
        $('#modal_update_customer').modal('show');
    });

    enter_to_send_form('modal_confirm_delete', 'btn_confirm_customer_deletion');


    //--------------------------------------------AUTOCOMPLETE----------------------------------------------------

    function autocomplete_customer_adresses(input) {
        $.ajax({

            url: '../controller/customers/read_customer_adresses.php',
            method: 'post',
            success: function (data) {

                var adresses = JSON.parse(data);
                for (var i = 0; i < adresses.length; i++) {
                    adresses[i] = adresses[i].toString();
                }
                autocomplete(document.getElementById(input), adresses);
            }
        });
    };

    function autocomplete_customer_zones(input) {
        $.ajax({

            url: '../controller/customers/read_customer_zones.php',
            method: 'post',
            success: function (data) {

                var zones = JSON.parse(data);
                for (var i = 0; i < zones.length; i++) {
                    zones[i] = zones[i].toString();
                }
                autocomplete(document.getElementById(input), zones);
            }
        });
    };


    //--------------------------------------------OTHERS----------------------------------------------------------

    $("#customer_name").attr("title", "Até 60 caracteres alfanuméricos");
    $("#customer_trade_name").attr("title", "Até 60 caracteres alfanuméricos");
    $("#customer_cpf").attr("title", "000.000.000-00");
    $("#customer_rg").attr("title", "00.000.000-0");
    $("#customer_telephone").attr("title", "(00) 0000-0000");
    $("#customer_cellphone").attr("title", "(00) 00000-0000");
    $("#customer_address").attr("title", "Até 50 caracteres alfanuméricos");
    $("#customer_address_number").attr("title", "Até 11 caracteres numéricos");
    $("#customer_address_complements").attr("title", "Até 50 caracteres alfanuméricos");
    $("#customer_cep").attr("title", "00000-000");

    $("#customer_name").attr("pattern", "[A-Za-zÀ-ú0-9. ]{1,60}");
    $("#customer_trade_name").attr("pattern", "[A-Za-zÀ-ú0-9. ]{1,60}");
    $("#customer_cpf").attr("pattern", "([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2})|([0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})");
    $("#customer_rg").attr("pattern", "[0-9]{2}[\.][0-9]{3}[\.][0-9]{3}[\-][0-9]{1}$");
    $("#customer_telephone").attr("pattern", "[\(][0-9]{2}[\)] [0-9]{4}[\-][0-9]{4}$");
    $("#customer_cellphone").attr("pattern", "[\(][0-9]{2}[\)] [0-9]{5}[\-][0-9]{4}$");
    $("#customer_address").attr("pattern", "[A-Za-zÀ-ú0-9. ]{1,50}");
    $("#customer_address_number").attr("pattern", "[0-9]{1,11}");
    $("#customer_address_complements").attr("pattern", "[A-Za-zÀ-ú0-9. ]{1,50}");
    $("#customer_cep").attr("pattern", "[0-9]{5}[\-]?[0-9]{3}");

    $("#customer_name_create").attr("title", "Até 60 caracteres alfanuméricos");
    $("#customer_trade_name_create").attr("title", "Até 60 caracteres alfanuméricos");
    $("#customer_cpf_create").attr("title", "000.000.000-00");
    $("#customer_rg_create").attr("title", "00.000.000-0");
    $("#customer_telephone_create").attr("title", "(00) 0000-0000");
    $("#customer_cellphone_create").attr("title", "(00) 00000-0000");
    $("#customer_address_create").attr("title", "Até 50 caracteres alfanuméricos");
    $("#customer_address_number_create").attr("title", "Até 11 caracteres numéricos");
    $("#customer_address_complements_create").attr("title", "Até 50 caracteres alfanuméricos");
    $("#customer_cep_create").attr("title", "00000-000");

    $("#customer_name_create").attr("pattern", "[A-Za-zÀ-ú0-9. ]{1,60}");
    $("#customer_trade_name_create").attr("pattern", "[A-Za-zÀ-ú0-9. ]{1,60}");
    $("#customer_cpf_create").attr("pattern", "([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2})|([0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})");
    $("#customer_rg_create").attr("pattern", "[0-9]{2}[\.][0-9]{3}[\.][0-9]{3}[\-][0-9]{1}$");
    $("#customer_telephone_create").attr("pattern", "[\(][0-9]{2}[\)] [0-9]{4}[\-][0-9]{4}$");
    $("#customer_cellphone_create").attr("pattern", "[\(][0-9]{2}[\)] [0-9]{5}[\-][0-9]{4}$");
    $("#customer_address_create").attr("pattern", "[A-Za-zÀ-ú0-9. ]{1,50}");
    $("#customer_address_number_create").attr("pattern", "[0-9]{1,11}");
    $("#customer_address_complements_create").attr("pattern", "[A-Za-zÀ-ú0-9. ]{1,50}");
    $("#customer_cep_create").attr("pattern", "[0-9]{5}[\-]?[0-9]{3}");


    $("#customer_cellphone").keyup(function () {
        jQuery('#customer_cellphone').mask('(00) 00000-0000');
    });

    $("#customer_telephone").keyup(function () {
        jQuery('#customer_telephone').mask('(00) 0000-0000');
    });

    $("#customer_rg").keyup(function () {
        jQuery("#customer_rg").mask('00.000.000-0');
    });

    $("#customer_cep").keyup(function () {
        jQuery('#customer_cep').mask('00000-000');
    });

    $("#customer_cellphone_create").keyup(function () {
        jQuery('#customer_cellphone_create').mask('(00) 00000-0000');
    });

    $("#customer_telephone_create").keyup(function () {
        jQuery('#customer_telephone_create').mask('(00) 0000-0000');
    });

    $("#customer_cep_create").keyup(function () {
        jQuery('#customer_cep_create').mask('00000-000');
    });

    $("#customer_rg_create").keyup(function () {
        jQuery("#customer_rg_create").mask('00.000.000-0');
    });

    $("#customer_cpf").keyup(function () {

        var customer_natural_legal = $('#customer_natural_legal').val();

        if (customer_natural_legal == 'PESSOA FÍSICA') {
            jQuery("#customer_cpf").mask('000.000.000-00');
        }

        if (customer_natural_legal == 'PESSOA JURÍDICA') {
            jQuery("#customer_cpf").mask('00.000.000/0000-00');
        }
    });

    $("#customer_cpf_create").keyup(function () {

        var customer_natural_legal = $('#customer_natural_legal_create').val();

        if (customer_natural_legal == 'PESSOA FÍSICA') {
            jQuery("#customer_cpf_create").mask('000.000.000-00');
        }

        if (customer_natural_legal == 'PESSOA JURÍDICA') {
            jQuery("#customer_cpf_create").mask('00.000.000/0000-00');

        }

    });

    $('#customer_telephone_create').focus(function () {
        $('#customer_telephone_create').val('\(67\) ');
    });

    $('#customer_cellphone_create').focus(function () {
        $('#customer_cellphone_create').val('\(67\) ');
    });


});