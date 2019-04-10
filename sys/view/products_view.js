//----------------------------------------------DATATABLE---------------------------------------------------------

$(document).ready(function () {
    var table = $('#list-products').DataTable({
        "processing": true,
        "serverSide": true,
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
        },
        "initComplete": function (settings, json) {
            add_button_create_product();
        },

        "ajax": {
            "url": "../controller/products/datatable.php",
            "type": "POST"
        }
    });

    function add_button_create_product() {

        $('#list-products_filter').prepend(
            '<button type="button" class="btn btn-primary btn_open_create_modal" id="btn_open_create_product_modal">Adicionar Produto</button>'
        );

        $('#btn_open_create_product_modal').on("click", function () {

            $('#modal_create_product').modal('show');

        });
    }

    //--------------------------------------------CHECK-FIELDS----------------------------------------------------

    function form_update_product_changed(data) {

        var prod_row = JSON.parse(data);
        var changed = false;

        prod_row['prod_id'] == $('#prod_id').val() ? 0 : changed = true;
        prod_row['prod_name'] == $('#prod_name').val().toUpperCase() ? 0 : changed = true;
        prod_row['prod_desc'] == $('#prod_desc').val().toUpperCase() ? 0 : changed = true;
        prod_row['prod_brand'] == $('#prod_brand').val().toUpperCase() ? 0 : changed = true;
        prod_row['prod_group'] == $('#prod_group').val().toUpperCase() ? 0 : changed = true;
        prod_row['prod_cost'] == $('#prod_cost').val() ? 0 : changed = true;
        prod_row['prod_markup'] == $('#prod_markup').val() ? 0 : changed = true;
        prod_row['prod_price'] == $('#prod_price').val() ? 0 : changed = true;
        prod_row['prod_unit'] == $('#prod_unit').val() ? 0 : changed = true;

        return changed;

    }

    //--------------------------------------------CREATE----------------------------------------------------------

    $("#form_create_product").on('submit', function (e) {

        e.preventDefault();
        var data = $(this).serialize();

        $.ajax({
            url: '../controller/products/create_product.php',
            method: 'post',
            data: data,
            success: function (data) {

                if (data) {
                    var error = data;
                    var regExp = /Duplicate entry/;
                    var name_already_used = regExp.test(error);
                    if (name_already_used) {
                        alert("Não é possível cadastrar dois produtos com o mesmo nome.");
                    }

                } else {

                    $('#list-products').DataTable().ajax.reload();
                    $('#modal_create_product').modal('hide');
                    $('#modal_create_product_success_message').modal('show');
                    clean_modal_create_product();
                }
            }
        });

    });

    function clean_modal_create_product() {

        form_length = document.getElementById("form_create_product").length;

        for (let index = 0; index < form_length; index++) {
            var input = document.getElementById("form_create_product").elements[index]['id'];
            document.getElementById(input).value = '';
        }

        document.getElementById("form_create_product").reset();

    };

    $("#modal_create_product").on('hidden.bs.modal', function () {

        autocomplete_product_groups('prod_group_create');
        autocomplete_product_brands('prod_brand_create');
        clean_modal_create_product();

    });

    $("#modal_create_product").on('shown.bs.modal', function () {

        autocomplete_product_groups('prod_group_create');
        autocomplete_product_brands('prod_brand_create');
    });


    enter_to_send_form('modal_create_product_success_message', 'modal_close_create_product_success_message');


    //--------------------------------------------READ------------------------------------------------------------

    $('#table_body').on('click', 'tr', function () {

        var data = table.row(this).data();
        var prod_id = data[0];

        $.ajax({

            url: '../controller/products/read_product.php',
            method: 'post',
            data: {
                prod_id: prod_id
            },
            success: function (data) {

                insert_data_on_modal_update_product(data);

                $('#modal_update_product').modal('show');

            }
        });
    });

    function insert_data_on_modal_update_product(data) {

        var prod_row = JSON.parse(data);

        $('#prod_id').val(prod_row['prod_id']);
        $('#prod_name').val(prod_row['prod_name']);
        $('#prod_desc').val(prod_row['prod_desc']);
        $('#prod_brand').val(prod_row['prod_brand']);
        $('#prod_group').val(prod_row['prod_group']);
        $('#prod_cost').val(prod_row['prod_cost']);
        $('#prod_markup').val(prod_row['prod_markup']);
        $('#prod_price').val(prod_row['prod_price']);
        $('#prod_unit').val(prod_row['prod_unit']);

    }

    //--------------------------------------------UPDATE----------------------------------------------------------

    $("#form_update_product").on('submit', function (e) {

        e.preventDefault();
        var prod_id = $('#prod_id').val();

        $.ajax({

            url: '../controller/products/read_product.php',
            method: 'post',
            data: {
                prod_id: prod_id
            },
            success: function (data) {

                var form_changed = form_update_product_changed(data);

                if (form_changed && !$(modal_confirm_delete).hasClass('show')) {

                    send_form_update_product();

                }
            }
        });
    });


    $('#btn_confirm_product_update').click(function () {

        form = document.getElementById("form_update_product");

        if (!form.reportValidity()) {

            $('#modal_update_product').modal('show');
            $('#modal_confirm_update_product').modal('hide');
        }

    });

    $("#modal_update_product").on('hide.bs.modal', function () {

        autocomplete_product_groups('prod_group');
        autocomplete_product_brands('prod_brand');
        var prod_id = $('#prod_id').val();

        $.ajax({

            url: '../controller/products/read_product.php',
            method: 'post',
            data: {
                prod_id: prod_id
            },
            success: function (data) {

                var form_changed = form_update_product_changed(data);

                if (form_changed && !$(modal_confirm_delete).hasClass('show')) {

                    $('#modal_confirm_update_product').modal('show');
                }
            }
        });
    });

    function send_form_update_product() {

        var data = $("#form_update_product").serialize();

        $.ajax({

            url: '../controller/products/update_product.php',
            method: 'post',
            data: data,

            success: function (data) {

                if (data) {
                    var error = data;
                    var regExp = /Duplicate entry/;
                    var name_already_used = regExp.test(error);
                    if (name_already_used) {
                        $('#modal_update_product').modal('show');
                        $('#modal_confirm_update_product').modal('hide');
                        alert("Não é possível cadastrar dois produtos com o mesmo nome.");
                    }

                } else {

                    $('#list-products').DataTable().ajax.reload();
                    $('#modal_update_product').modal('hide');
                    $('#modal_confirm_update_product').modal('hide');
                    $('#modal_update_product_success_message').modal('show');
                }
            }
        });

    }

    $("#modal_update_product").on('shown.bs.modal', function () {
        autocomplete_product_groups('prod_group');
        autocomplete_product_brands('prod_brand');

    });

    enter_to_send_form('modal_update_product_success_message', 'modal_close_update_product_success_message');
    enter_to_send_form('modal_confirm_update_product', 'btn_confirm_product_update');

    //--------------------------------------------DELETE----------------------------------------------------------

    $("#btn_delete_product").click(function () {

        $('#modal_update_product').modal('hide');
        var prod_id = $('#prod_id').val();

        $.ajax({

            url: '../controller/products/read_product.php',
            method: 'post',
            data: {
                prod_id: prod_id
            },
            success: function (data) {

                var prod_row = JSON.parse(data);
                var selected_product_name = prod_row['prod_name'];
                $('#txt_delete_product').text(
                    'Tem certeza que deseja excluir o produto \"' +
                    selected_product_name + '\"?');

            }
        });

        $('#modal_confirm_delete').modal('show');
    });


    $("#btn_confirm_product_deletion").click(function () {

        var prod_id = $('#prod_id').val();

        $.ajax({

            url: '../controller/products/delete_product.php',
            method: 'post',
            data: {
                prod_id: prod_id
            },
            success: function (data) {

                console.log(data);
                $('#modal_confirm_delete').modal('hide');
                $('#list-products').DataTable().ajax.reload();

            }
        });
    });


    $(".btn_cancel_product_deletion").click(function () {
        $('#modal_update_product').modal('show');
    });

    enter_to_send_form('modal_confirm_delete', 'btn_confirm_product_deletion');


    //--------------------------------------------AUTOCOMPLETE----------------------------------------------------

    function autocomplete_product_groups(input) {

        //console.log(document.getElementById('prod_group').style.width);

        $.ajax({

            url: '../controller/products/read_product_groups.php',
            method: 'post',
            success: function (data) {



                var groups = JSON.parse(data);
                for (var i = 0; i < groups.length; i++) {
                    groups[i] = groups[i].toString();
                }
                autocomplete(document.getElementById(input), groups);
            }
        });
    };

    function autocomplete_product_brands(input) {
        $.ajax({

            url: '../controller/products/read_product_brands.php',
            method: 'post',
            success: function (data) {

                var brands = JSON.parse(data);
                for (var i = 0; i < brands.length; i++) {
                    brands[i] = brands[i].toString();
                }
                autocomplete(document.getElementById(input), brands);
            }
        });
    };


    //--------------------------------------------OTHERS----------------------------------------------------------



    $('#prod_cost').mask('000.000,00', { reverse: true });
    $('#prod_price').mask('000.000,00', { reverse: true });
    $('#prod_markup').mask('0000');

    $("#prod_name").attr("title", "Até 60 caracteres alfanuméricos");
    $("#prod_group").attr("title", "Até 30 caracteres alfanuméricos");
    $("#prod_brand").attr("title", "Até 30 caracteres alfanuméricos");
    $("#prod_cost").attr("title", "Caracteres numéricos");
    $("#prod_markup").attr("title", "Caracteres numéricos");
    $("#prod_price").attr("title", "Caracteres numéricos");

    $("#prod_name").attr("pattern", "[A-Za-zÀ-ú0-9-.,_ ]{1,60}");
    $("#prod_group").attr("pattern", "[A-Za-zÀ-ú0-9-.,_ ]{1,30}");
    $("#prod_brand").attr("pattern", "[A-Za-zÀ-ú0-9-.,_ ]{1,30}");
    $("#prod_cost").attr("pattern", "^((?!(^0\,00$)).)*$");
    $("#prod_markup").attr("pattern", "[0-9]{1,}");
    $("#prod_price").attr("pattern", "^((?!(^0\,00$)).)*$");
    $("#prod_unit").attr("pattern", "/[^(escolha)]/i");

    $('#prod_cost_create').mask('000.000,00', { reverse: true });
    $('#prod_price_create').mask('000.000,00', { reverse: true });
    $('#prod_markup_create').mask('0000');

    $("#prod_name_create").attr("title", "Até 60 caracteres alfanuméricos");
    $("#prod_group_create").attr("title", "Até 30 caracteres alfanuméricos");
    $("#prod_brand_create").attr("title", "Até 30 caracteres alfanuméricos");
    $("#prod_cost_create").attr("title", "Caracteres numéricos");
    $("#prod_markup_create").attr("title", "Caracteres numéricos");
    $("#prod_price_create").attr("title", "Caracteres numéricos");

    $("#prod_name_create").attr("pattern", "[A-Za-zÀ-ú0-9-.,_ ]{1,60}");
    $("#prod_group_create").attr("pattern", "[A-Za-zÀ-ú0-9-.,_ ]{1,30}");
    $("#prod_brand_create").attr("pattern", "[A-Za-zÀ-ú0-9-.,_ ]{1,30}");
    $("#prod_cost_create").attr("pattern", "^((?!(^0\,00$)).)*$");
    $("#prod_markup_create").attr("pattern", "[0-9]{1,}");
    $("#prod_price_create").attr("pattern", "^((?!(^0\,00$)).)*$");



    $("#prod_cost").keyup(function () {

        var prod_cost = brl_to_float($("#prod_cost").val());
        var prod_markup = $("#prod_markup").val();
        var prod_price = prod_cost * ((prod_markup / 100) + 1);
        $("#prod_cost").val(float_to_brl(parseFloat(prod_cost)));
        $("#prod_price").val(float_to_brl(prod_price));

    });


    $("#prod_markup").keyup(function () {

        var prod_cost = brl_to_float($("#prod_cost").val());
        var prod_markup = $("#prod_markup").val();
        var prod_price = prod_cost * ((prod_markup / 100) + 1);
        $("#prod_price").val(float_to_brl(prod_price));
    });


    $("#prod_price").keyup(function () {

        var prod_cost = brl_to_float($("#prod_cost").val());
        var prod_price = $("#prod_price").val();
        var price_toFloat = brl_to_float(prod_price);
        var prod_cost_double = brl_to_float(prod_cost);
        var price_toBrl = float_to_brl(parseFloat(price_toFloat));
        var prod_markup = ((price_toFloat / prod_cost_double) - 1) * 100;
        prod_markup > 9999 ? prod_markup = 9999 : prod_markup = prod_markup;

        if (prod_markup < 1 || isNaN(prod_markup) || prod_markup ==
            Infinity) {
            $("#prod_markup").val('0');
        } else {
            $("#prod_markup").val(parseInt(prod_markup));
        }

        isNaN(parseFloat(price_toBrl)) ? $("#prod_price").val('0,00') : $(
            "#prod_price").val(
                price_toBrl);
    });


    $("#prod_cost_create").keyup(function () {

        var prod_cost = brl_to_float($("#prod_cost_create").val());
        var prod_markup = $("#prod_markup_create").val();
        var prod_price = prod_cost * ((prod_markup / 100) + 1);
        $("#prod_cost_create").val(float_to_brl(parseFloat(prod_cost)));
        $("#prod_price_create").val(float_to_brl(prod_price));

    });


    $("#prod_markup_create").keyup(function () {

        var prod_cost = brl_to_float($("#prod_cost_create").val());
        var prod_markup = $("#prod_markup_create").val();
        var prod_price = prod_cost * ((prod_markup / 100) + 1);
        $("#prod_price_create").val(float_to_brl(prod_price));
    });


    $("#prod_price_create").keyup(function () {

        var prod_cost = brl_to_float($("#prod_cost_create").val());
        var prod_price = $("#prod_price_create").val();
        var price_toFloat = brl_to_float(prod_price);
        var prod_cost_double = brl_to_float(prod_cost);
        var price_toBrl = float_to_brl(parseFloat(price_toFloat));
        var prod_markup = ((price_toFloat / prod_cost_double) - 1) * 100;
        prod_markup > 9999 ? prod_markup = 9999 : prod_markup = prod_markup;

        if (prod_markup < 1 || isNaN(prod_markup) || prod_markup ==
            Infinity) {
            $("#prod_markup_create").val('0');
        } else {
            $("#prod_markup_create").val(parseInt(prod_markup));
        }

        isNaN(parseFloat(price_toBrl)) ? $("#prod_price_create").val('0,00') : $(
            "#prod_price_create").val(
                price_toBrl);
    });

    $('#prod_cost').click(function () {
        selectAllText(jQuery(this))
    });

    $('#prod_markup').click(function () {
        selectAllText(jQuery(this))
    });

    $('#prod_price').click(function () {
        selectAllText(jQuery(this))
    });

    $('#prod_cost_create').click(function () {
        selectAllText(jQuery(this))
    });

    $('#prod_markup_create').click(function () {
        selectAllText(jQuery(this))
    });

    $('#prod_price_create').click(function () {
        selectAllText(jQuery(this))
    });

    clean_modal_create_product();

});