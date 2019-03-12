//--------------------------------------------DATATABLE----------------------------------------------------------------------

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

    //--------------------------------------------CHECK-FIELDS--------------------------------------------------------------

    function form_edit_customer_changed(data) {

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
        customer_row['customer_address_complements'] == $('#customer_address_complements').val() ? 0 : changed = true;
        customer_row['customer_zone'] == $('#customer_zone').val() ? 0 : changed = true;
        customer_row['customer_state'] == $('#customer_state').val() ? 0 : changed = true;
        customer_row['customer_city'] == $('#customer_city').val() ? 0 : changed = true;
        customer_row['customer_cep'] == $('#customer_cep').val() ? 0 : changed = true;

        return changed;


    }

    function validate_form_create_customers() {

        var customer_name = $('#customer_name_create').val().toUpperCase();
        var customer_email = $('#customer_email_create').val().toUpperCase();
        var customer_cpf = $('#customer_cpf_create').val();
        var customer_natural_legal = $('#customer_natural_legal_create').val();
        var customer_rg = $('#customer_rg_create').val();
        var customer_telephone = $('#customer_telephone_create').val();
        var customer_cellphone = $('#customer_cellphone_create').val();
        var customer_address_type = $('#customer_address_type_create').val();
        var customer_address = $('#customer_address_create').val().toUpperCase();
        var customer_address_number = $('#customer_address_number_create').val();
        var customer_zone = $('#customer_zone_create').val().toUpperCase();
        var customer_state = $('#customer_state_create').val();
        var customer_city = $('#customer_city_create').val();
        var customer_cep = $('#customer_cep_create').val();
        var form_ok = true;

        if (customer_name) {
            document.getElementById('customer_name_create').style.boxShadow =
                "0px 0px";
        } else {
            document.getElementById('customer_name_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        var regexp_email = /\@/;
        if (customer_email && !regexp_email.test(customer_email)) {
            document.getElementById('customer_email_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        } else {
            document.getElementById('customer_email_create').style.boxShadow =
                "0px 0px";
        }

        if (customer_natural_legal == 'PESSOA FÍSICA' && customer_cpf && customer_cpf.length != 14) {
            document.getElementById('customer_cpf_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        } else if (customer_natural_legal == 'PESSOA JURÍDICA' && customer_cpf && customer_cpf.length != 18) {
            document.getElementById('customer_cpf_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        } else {
            document.getElementById('customer_cpf_create').style.boxShadow =
                "0px 0px";
        }

        if (customer_natural_legal) {
            document.getElementById('customer_natural_legal_create').style.boxShadow =
                "0px 0px";
        } else {
            document.getElementById('customer_natural_legal_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        if (customer_rg && customer_rg.length != 12) {
            document.getElementById('customer_rg_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        } else {
            document.getElementById('customer_rg_create').style.boxShadow = "0px 0px";
        }

        if (customer_telephone && customer_telephone.length == 14) {
            document.getElementById('customer_telephone_create').style.boxShadow =
                "0px 0px";
        } else {
            document.getElementById('customer_telephone_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        if (customer_cellphone && customer_cellphone.length != 16 && customer_cellphone != '(67) ') {
            document.getElementById('customer_cellphone_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        } else {
            document.getElementById('customer_cellphone_create').style.boxShadow =
                "0px 0px";
        }

        if (customer_address_type) {
            document.getElementById('customer_address_type_create').style.boxShadow =
                "0px 0px";
        } else {
            document.getElementById('customer_address_type_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        if (customer_address) {
            document.getElementById('customer_address_create').style.boxShadow =
                "0px 0px";
        } else {
            document.getElementById('customer_address_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        if (customer_address_number == parseInt(customer_address_number)) {
            document.getElementById('customer_address_number_create').style.boxShadow =
                "0px 0px";
        } else {
            document.getElementById('customer_address_number_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        if (customer_zone) {
            document.getElementById('customer_zone_create').style.boxShadow =
                "0px 0px";
        } else {
            document.getElementById('customer_zone_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        if (customer_state) {
            document.getElementById('customer_state_create').style.boxShadow =
                "0px 0px";
        } else {
            document.getElementById('customer_state_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        if (customer_city) {
            document.getElementById('customer_city_create').style.boxShadow =
                "0px 0px";
        } else {
            document.getElementById('customer_city_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        if (customer_cep && customer_cep.length != 9) {
            document.getElementById('customer_cep_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        } else {
            document.getElementById('customer_cep_create').style.boxShadow =
                "0px 0px";
        }

        return form_ok;
    }


    function validate_form_edit_customers() {

        var customer_name = $('#customer_name').val().toUpperCase();
        var customer_email = $('#customer_email').val().toUpperCase();
        var customer_cpf = $('#customer_cpf').val();
        var customer_natural_legal = $('#customer_natural_legal').val();
        var customer_rg = $('#customer_rg').val();
        var customer_telephone = $('#customer_telephone').val();
        var customer_cellphone = $('#customer_cellphone').val();
        var customer_address_type = $('#customer_address_type').val();
        var customer_address = $('#customer_address').val().toUpperCase();
        var customer_address_number = $('#customer_address_number').val();
        var customer_zone = $('#customer_zone').val().toUpperCase();
        var customer_state = $('#customer_state').val();
        var customer_city = $('#customer_city').val();
        var customer_cep = $('#customer_cep').val();
        var form_ok = true;

        if (customer_name) {
            document.getElementById('customer_name').style.boxShadow =
                "0px 0px";
        } else {
            document.getElementById('customer_name').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        var regexp_email = /\@/;
        if (customer_email && !regexp_email.test(customer_email)) {
            document.getElementById('customer_email').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        } else {
            document.getElementById('customer_email').style.boxShadow =
                "0px 0px";
        }

        if (customer_natural_legal == 'PESSOA FÍSICA' && customer_cpf && customer_cpf.length != 14) {
            document.getElementById('customer_cpf').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        } else if (customer_natural_legal == 'PESSOA JURÍDICA' && customer_cpf && customer_cpf.length != 18) {
            document.getElementById('customer_cpf').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        } else {
            document.getElementById('customer_cpf').style.boxShadow =
                "0px 0px";
        }

        if (customer_natural_legal) {
            document.getElementById('customer_natural_legal').style.boxShadow =
                "0px 0px";
        } else {
            document.getElementById('customer_natural_legal').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        if (customer_rg && customer_rg.length != 12) {
            document.getElementById('customer_rg').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        } else {
            document.getElementById('customer_rg').style.boxShadow = "0px 0px";
        }

        if (customer_telephone && customer_telephone.length == 14) {
            document.getElementById('customer_telephone').style.boxShadow =
                "0px 0px";
        } else {
            document.getElementById('customer_telephone').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        if (customer_cellphone && customer_cellphone.length != 16) {
            document.getElementById('customer_cellphone').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        } else {
            document.getElementById('customer_cellphone').style.boxShadow =
                "0px 0px";
        }

        if (customer_address_type) {
            document.getElementById('customer_address_type').style.boxShadow =
                "0px 0px";
        } else {
            document.getElementById('customer_address_type').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        if (customer_address) {
            document.getElementById('customer_address').style.boxShadow =
                "0px 0px";
        } else {
            document.getElementById('customer_address').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        if (customer_address_number == parseInt(customer_address_number)) {
            document.getElementById('customer_address_number').style.boxShadow =
                "0px 0px";
        } else {
            document.getElementById('customer_address_number').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        if (customer_zone) {
            document.getElementById('customer_zone').style.boxShadow =
                "0px 0px";
        } else {
            document.getElementById('customer_zone').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        if (customer_state) {
            document.getElementById('customer_state').style.boxShadow =
                "0px 0px";
        } else {
            document.getElementById('customer_state').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        if (customer_city) {
            document.getElementById('customer_city').style.boxShadow =
                "0px 0px";
        } else {
            document.getElementById('customer_city').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        if (customer_cep && customer_cep.length != 9) {
            document.getElementById('customer_cep').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        } else {
            document.getElementById('customer_cep').style.boxShadow =
                "0px 0px";
        }

        return form_ok;
    }


    //--------------------------------------------CREATE--------------------------------------------------------------------


    $("#btn_create_customer").click(function () {

        var customer_name = $('#customer_name_create').val().toUpperCase();
        var customer_trade_name = $('#customer_trade_name_create').val().toUpperCase();
        var customer_email = $('#customer_email_create').val().toUpperCase();
        var customer_cpf = $('#customer_cpf_create').val().replace(/[.]/g, "").replace("-", "").replace("/", "");
        var customer_natural_legal = $('#customer_natural_legal_create').val();
        var customer_rg = $('#customer_rg_create').val().replace(/[.]/g, "").replace("-", "");
        var customer_telephone = $('#customer_telephone_create').val().replace(/[ ]/g, "").replace("\(", "").replace("\)", "");
        var customer_cellphone = $('#customer_cellphone_create').val().replace(/[ ]/g, "").replace("\(", "").replace("\)", "");
        customer_cellphone == '(67) ' ? customer_cellphone = '' : 0;
        var customer_obs = $('#customer_obs_create').val().toUpperCase();
        var customer_address_type = $('#customer_address_type_create').val();
        var customer_address = $('#customer_address_create').val().toUpperCase();
        var customer_address_number = $('#customer_address_number_create').val();
        var customer_address_complements = $('#customer_address_complements_create').val().toUpperCase();
        var customer_zone = $('#customer_zone_create').val().toUpperCase();
        var customer_state = $('#customer_state_create').val();
        var customer_city = $('#customer_city_create').val();
        var customer_cep = $('#customer_cep_create').val();


        if (validate_form_create_customers()) {

            $.ajax({
                url: '../controller/customers/create_customer.php',
                method: 'post',
                data: {
                    customer_name: customer_name,
                    customer_trade_name: customer_trade_name,
                    customer_email: customer_email,
                    customer_cpf: customer_cpf,
                    customer_natural_legal: customer_natural_legal,
                    customer_rg: customer_rg,
                    customer_telephone: customer_telephone,
                    customer_cellphone: customer_cellphone,
                    customer_obs: customer_obs,
                    customer_address_type: customer_address_type,
                    customer_address: customer_address,
                    customer_address_number: customer_address_number,
                    customer_address_complements: customer_address_complements,
                    customer_zone: customer_zone,
                    customer_state: customer_state,
                    customer_city: customer_city,
                    customer_cep: customer_cep
                },
                success: function (data) {

                    if (data != '') {
                        var error = data;
                        var regExp = /Duplicate entry/;
                        var name_already_used = regExp.test(error);
                        if (name_already_used) {
                            document.getElementById('customer_name_create').style.boxShadow =
                                "0 0 0 .2rem rgba(255,0,0,.25)";
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
        }
    });

    function clean_modal_create_customer() {

        $('#customer_name_create').val('');
        $('#customer_trade_name_create').val('');
        $('#customer_email_create').val('');
        $('#customer_cpf_create').val('');
        $('#customer_natural_legal_create').val('PESSOA FÍSICA');
        $('#customer_rg_create').val('');
        //$('#customer_telephone_create').val('\(67\) ');
        //$('#customer_cellphone_create').val('\(67\) ');
        $('#customer_obs_create').val('');
        $('#customer_address_type_create').val('RESIDÊNCIA');
        $('#customer_address_create').val('');
        $('#customer_address_number_create').val('');
        $('#customer_address_complements_create').val('');
        $('#customer_zone_create').val('');
        $('#customer_state_create').val('MS');
        $('#customer_city_create').val('CAMPO GRANDE');
        $('#customer_cep_create').val('');

        document.getElementById('customer_name_create').style.boxShadow = "0px 0px";
        document.getElementById('customer_trade_name_create').style.boxShadow = "0px 0px";
        document.getElementById('customer_email_create').style.boxShadow = "0px 0px";
        document.getElementById('customer_cpf_create').style.boxShadow = "0px 0px";
        document.getElementById('customer_natural_legal_create').style.boxShadow = "0px 0px";
        document.getElementById('customer_rg_create').style.boxShadow = "0px 0px";
        document.getElementById('customer_telephone_create').style.boxShadow = "0px 0px";
        document.getElementById('customer_cellphone_create').style.boxShadow = "0px 0px";
        document.getElementById('customer_obs_create').style.boxShadow = "0px 0px";
        document.getElementById('customer_address_type_create').style.boxShadow = "0px 0px";
        document.getElementById('customer_address_create').style.boxShadow = "0px 0px";
        document.getElementById('customer_address_number_create').style.boxShadow = "0px 0px";
        document.getElementById('customer_address_complements_create').style.boxShadow = "0px 0px";
        document.getElementById('customer_zone_create').style.boxShadow = "0px 0px";
        document.getElementById('customer_state_create').style.boxShadow = "0px 0px";
        document.getElementById('customer_city_create').style.boxShadow = "0px 0px";
        document.getElementById('customer_cep_create').style.boxShadow = "0px 0px";
    };

    $("#modal_create_customer").on('hidden.bs.modal', function () {
        clean_modal_create_customer();
        autocomplete_customer_zones('customer_zone_create');
        autocomplete_customer_adresses('customer_address_create');

    });

    $("#modal_create_customer").on('shown.bs.modal', function () {
        autocomplete_customer_zones('customer_zone_create');
        autocomplete_customer_adresses('customer_address_create');
        jQuery("#customer_cpf_create").mask('000.000.000-00');
        jQuery("#customer_rg_create").mask('00.000.000-0');
        jQuery('#customer_cep_create').mask('00000-000');
        jQuery('#customer_telephone_create').mask('(00) 0000 0000');
        jQuery('#customer_cellphone_create').mask('(00) 00 000 0000');
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


    //--------------------------------------------READ----------------------------------------------------------------------

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

                insert_data_on_modal_edit_customer(data);

                $('#modal_edit_customer').modal('show');

            }
        });
    });

    function insert_data_on_modal_edit_customer(data) {

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


    //--------------------------------------------UPDATE--------------------------------------------------------------------

    $('#btn_update_customer').click(function () {

        var customer_id = $('#customer_id').val();

        $.ajax({

            url: '../controller/customers/read_customer.php',
            method: 'post',
            data: {
                customer_id: customer_id
            },
            success: function (data) {

                var form_changed = form_edit_customer_changed(data);

                if (form_changed && !$(modal_confirm_delete).hasClass('show')) {

                    if (validate_form_edit_customers()) {

                        send_form_update_customer();
                        //hide_modal_edit_customer();
                        setTimeout(hide_modal_edit_customer, 50);

                    }
                }
            }
        });
    });

    $("#modal_edit_customer").on('hide.bs.modal', function () {

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

                var form_changed = form_edit_customer_changed(data);

                if (form_changed && !$(modal_confirm_delete).hasClass('show')) {

                    clean_modal_edit_customer();
                    $('#modal_confirm_update_customer').modal('show');
                }
            }
        });
    });


    $("#btn_confirm_customer_update").click(function () {

        var customer_id = $('#customer_id').val();

        $.ajax({

            url: '../controller/customers/read_customer.php',
            method: 'post',
            data: {
                customer_id: customer_id
            },
            success: function (data) {

                var form_changed = form_edit_customer_changed(data);

                if (form_changed && !$(modal_confirm_delete).hasClass('show')) {

                    if (validate_form_edit_customers()) {

                        send_form_update_customer();
                        $('#modal_confirm_update_customer').modal('hide');

                    } else {
                        $('#modal_edit_customer').modal('show');
                        $('#modal_confirm_update_customer').modal('hide');
                    }

                }
            }
        });
    });

    function send_form_update_customer() {

        var customer_id = $('#customer_id').val();
        var customer_name = $('#customer_name').val().toUpperCase();
        var customer_trade_name = $('#customer_trade_name').val().toUpperCase();
        var customer_email = $('#customer_email').val().toUpperCase();
        var customer_cpf = $('#customer_cpf').val();
        var customer_natural_legal = $('#customer_natural_legal').val();
        var customer_rg = $('#customer_rg').val();
        var customer_telephone = $('#customer_telephone').val();
        var customer_cellphone = $('#customer_cellphone').val();
        var customer_obs = $('#customer_obs').val().toUpperCase();
        var customer_address_type = $('#customer_address_type').val();
        var customer_address = $('#customer_address').val().toUpperCase();
        var customer_address_number = $('#customer_address_number').val();
        var customer_address_complements = $('#customer_address_complements').val().toUpperCase();
        var customer_zone = $('#customer_zone').val().toUpperCase();
        var customer_state = $('#customer_state').val();
        var customer_city = $('#customer_city').val();
        var customer_cep = $('#customer_cep').val();

        $.ajax({

            url: '../controller/customers/update_customer.php',
            method: 'post',
            data: {
                customer_id: customer_id,
                customer_name: customer_name,
                customer_trade_name: customer_trade_name,
                customer_email: customer_email,
                customer_cpf: customer_cpf,
                customer_natural_legal: customer_natural_legal,
                customer_rg: customer_rg,
                customer_telephone: customer_telephone,
                customer_cellphone: customer_cellphone,
                customer_obs: customer_obs,
                customer_address_type: customer_address_type,
                customer_address: customer_address,
                customer_address_number: customer_address_number,
                customer_address_complements: customer_address_complements,
                customer_zone: customer_zone,
                customer_state: customer_state,
                customer_city: customer_city,
                customer_cep: customer_cep

            },

            success: function (data) {

                $('#list-customers').DataTable().ajax.reload();
                //$('#modal_edit_customer').modal('hide');
                $('#modal_update_customer_success_message').modal('show');
            }
        });

    }

    function hide_modal_edit_customer() {
        $('#modal_edit_customer').modal('hide');

    }


    $("#modal_edit_customer").on('shown.bs.modal', function () {
        autocomplete_customer_zones('customer_zone');
        autocomplete_customer_adresses('customer_address');
        jQuery("#customer_rg").mask('00.000.000-0');
        jQuery('#customer_cep').mask('00000-000');
        jQuery('#customer_telephone').mask('(00) 0000 0000');
        jQuery('#customer_cellphone').mask('(00) 00 000 0000');
    });

    function clean_modal_edit_customer() {

        document.getElementById('customer_name').style.boxShadow = "0px 0px";
        document.getElementById('customer_trade_name').style.boxShadow = "0px 0px";
        document.getElementById('customer_email').style.boxShadow = "0px 0px";
        document.getElementById('customer_cpf').style.boxShadow = "0px 0px";
        document.getElementById('customer_natural_legal').style.boxShadow = "0px 0px";
        document.getElementById('customer_rg').style.boxShadow = "0px 0px";
        document.getElementById('customer_telephone').style.boxShadow = "0px 0px";
        document.getElementById('customer_cellphone').style.boxShadow = "0px 0px";
        document.getElementById('customer_obs').style.boxShadow = "0px 0px";
        document.getElementById('customer_address').style.boxShadow = "0px 0px";
        document.getElementById('customer_address_number').style.boxShadow = "0px 0px";
        document.getElementById('customer_address_complements').style.boxShadow = "0px 0px";
        document.getElementById('customer_zone').style.boxShadow = "0px 0px";
        document.getElementById('customer_state').style.boxShadow = "0px 0px";
        document.getElementById('customer_city').style.boxShadow = "0px 0px";
        document.getElementById('customer_cep').style.boxShadow = "0px 0px";

    };

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
        }

        if (customer_natural_legal == 'PESSOA JURÍDICA') {
            $('#label_customer_name').html('Razão Social');
            $('#label_customer_trade_name').html('Nome Fantasia');
            $('#label_customer_rg').html('Inscrição Estadual');
            $('#label_customer_cpf').html('CNPJ');
            jQuery("#customer_cpf").mask('00.000.000/0000-00');

        }

    };

    enter_to_send_form('modal_edit_customer', 'btn_update_customer');
    enter_to_send_form('modal_update_customer_success_message', 'modal_close_update_customer_success_message');
    enter_to_send_form('modal_confirm_update_customer', 'btn_confirm_customer_update');


    //--------------------------------------------DELETE--------------------------------------------------------------------

    $("#btn_delete_customer").click(function () {

        $('#modal_edit_customer').modal('hide');
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
        $('#modal_edit_customer').modal('show');
    });

    enter_to_send_form('modal_confirm_delete', 'btn_confirm_customer_deletion');


    //--------------------------------------------AUTOCOMPLETE---------------------------------------------------------------

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


    //--------------------------------------------OTHERS---------------------------------------------------------------------




    $('#customer_telephone_create').focus(function () {
        $('#customer_telephone_create').val('\(67\) ');
    });

    $('#customer_cellphone_create').focus(function () {
        $('#customer_cellphone_create').val('\(67\) ');
    });


});