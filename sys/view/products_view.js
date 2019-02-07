$(document).ready(function () {
    var table = $('#list-products').DataTable({
        "processing": true,
        "serverSide": true,
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
        },
        "initComplete": function (settings, json) {

            $('#list-products_filter').prepend(
                '<button type="button" class="btn btn-primary btn_open_create_modal" id="btn_open_create_product_modal">Adicionar Produto</button>'
            );

            $('#btn_open_create_product_modal').on("click", function () {

                $('#modal_create_product').modal('show');

            });

        },

        "ajax": {
            "url": "../controller/products/datatable.php",
            "type": "POST"
        }
    });


    enter_to_send_form('modal_edit_product', 'btn_update_product');
    enter_to_send_form('modal_create_product', 'btn_create_product');
    enter_to_send_form('modal_create_product_success_message', 'modal_close_create_product_success_message');
    enter_to_send_form('modal_update_product_success_message', 'modal_close_update_product_success_message');
    enter_to_send_form('modal_confirm_update_product', 'btn_confirm_product_update');
    enter_to_send_form('modal_confirm_delete', 'btn_confirm_product_deletion');


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

                var product_row = JSON.parse(data);

                $('#prod_id').val(product_row['prod_id']);
                $('#prod_name').val(product_row['prod_name']);
                $('#prod_desc').val(product_row['prod_desc']);
                $('#prod_brand').val(product_row['prod_brand']);
                $('#prod_group').val(product_row['prod_group']);
                $('#prod_cost').val(float_to_brl(parseFloat(product_row[
                    'prod_cost'])));
                $('#prod_markup').val(product_row['prod_markup']);
                $('#prod_price').val(float_to_brl(parseFloat(product_row['prod_price'])));
                $('#prod_unit').val(product_row['prod_unit']);
                $('#modal_edit_product').modal('show');

            }
        });
    });


    $(".btn_cancel_product_deletion").click(function () {
        $('#modal_edit_product').modal('show');
    });


    $("#modal_edit_product").on('hide.bs.modal', function () {

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

                var product_row = JSON.parse(data);
                var validate_prod_id = product_row['prod_id'] == $('#prod_id').val();
                var validate_prod_name = product_row['prod_name'] == $('#prod_name')
                    .val().toUpperCase();
                var validate_prod_desc = product_row['prod_desc'] == $('#prod_desc')
                    .val().toUpperCase();
                var validate_prod_brand = product_row['prod_brand'] == $(
                    '#prod_brand').val().toUpperCase();
                var validate_prod_group = product_row['prod_group'] == $(
                    '#prod_group').val().toUpperCase();
                var validate_prod_cost = product_row['prod_cost'] ==
                    brl_to_float($(
                        '#prod_cost').val());
                var validate_prod_markup = product_row['prod_markup'] == $(
                    '#prod_markup').val();
                var validate_prod_price = product_row['prod_price'] ==
                    brl_to_float($(
                        '#prod_price').val());
                var validate_prod_unit = product_row['prod_unit'] == $(
                    '#prod_unit').val();

                if (validate_prod_id && validate_prod_name && validate_prod_desc &&
                    validate_prod_brand && validate_prod_group &&
                    validate_prod_cost && validate_prod_markup &&
                    validate_prod_price && validate_prod_unit) {
                    var form_equals_db = true;
                } else {
                    var form_equals_db = false;

                }

                var style = getComputedStyle(modal_confirm_delete);

                var display = style.display;

                if (display == 'none' && !form_equals_db) {

                    clean_modal_edit_product();
                    $('#modal_confirm_update_product').modal('show');
                }
            }
        });
    });


    $("#modal_edit_product").on('shown.bs.modal', function () {
        autocomplete_product_groups('prod_group');
        autocomplete_product_brands('prod_brand');
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


                $('#modal_confirm_delete').modal('hide');
                $('#list-products').DataTable().ajax.reload();


            }
        });
    });


    $('#btn_update_product').click(function () {

        var prod_id = $('#prod_id').val();

        $.ajax({

            url: '../controller/products/read_product.php',
            method: 'post',
            data: {
                prod_id: prod_id
            },
            success: function (data) {

                var product_row = JSON.parse(data);

                var validate_prod_id = product_row['prod_id'] == $('#prod_id').val();
                var validate_prod_name = product_row['prod_name'] == $('#prod_name')
                    .val().toUpperCase();
                var validate_prod_desc = product_row['prod_desc'] == $('#prod_desc')
                    .val().toUpperCase();
                var validate_prod_brand = product_row['prod_brand'] == $(
                    '#prod_brand').val().toUpperCase();
                var validate_prod_group = product_row['prod_group'] == $(
                    '#prod_group').val().toUpperCase();
                var validate_prod_cost = product_row['prod_cost'] ==
                    brl_to_float($(
                        '#prod_cost').val());
                var validate_prod_markup = product_row['prod_markup'] == $(
                    '#prod_markup').val();
                var validate_prod_price = product_row['prod_price'] ==
                    brl_to_float($(
                        '#prod_price').val());
                var validate_prod_unit = product_row['prod_unit'] == $(
                    '#prod_unit').val();

                if (validate_prod_id && validate_prod_name && validate_prod_desc &&
                    validate_prod_brand && validate_prod_group &&
                    validate_prod_cost && validate_prod_markup &&
                    validate_prod_price && validate_prod_unit) {
                    var form_equals_db = true;
                } else {
                    var form_equals_db = false;

                }

                var style = getComputedStyle(modal_confirm_delete);

                var display = style.display;

                if (display == 'none' && !form_equals_db) {

                    var prod_id = $('#prod_id').val();
                    var prod_name = $('#prod_name').val().toUpperCase();
                    var prod_brand = $('#prod_brand').val().toUpperCase();
                    var prod_group = $('#prod_group').val().toUpperCase();
                    var prod_cost = brl_to_float($('#prod_cost').val());
                    var prod_markup = $('#prod_markup').val();
                    var prod_price = brl_to_float($('#prod_price').val());
                    var prod_unit = $('#prod_unit').val();
                    var prod_desc = $('#prod_desc').val().toUpperCase();
                    var form_ok = true;

                    if (prod_name) {
                        document.getElementById('prod_name').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('prod_name').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                    }
                    if (prod_brand) {
                        document.getElementById('prod_brand').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('prod_brand').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                    }
                    if (prod_group) {
                        document.getElementById('prod_group').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('prod_group').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                    }
                    if (prod_cost && isFloat(prod_cost)) {
                        document.getElementById('prod_cost').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('prod_cost').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                    }
                    if (prod_markup && isFloat(prod_markup)) {
                        document.getElementById('prod_markup').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('prod_markup').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                    }
                    if (prod_price && isFloat(prod_price)) {
                        document.getElementById('prod_price').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('prod_price').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                    }
                    if (prod_unit && prod_unit != 'Escolha...') {
                        document.getElementById('prod_unit').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('prod_unit').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                    }

                    if (form_ok) {

                        $.ajax({

                            url: '../controller/products/update_product.php',
                            method: 'post',
                            data: {
                                prod_id: prod_id,
                                prod_name: prod_name,
                                prod_desc: prod_desc,
                                prod_brand: prod_brand,
                                prod_group: prod_group,
                                prod_cost: prod_cost,
                                prod_markup: prod_markup,
                                prod_price: prod_price,
                                prod_unit: prod_unit
                            },

                            success: function (data) {

                                $('#list-products').DataTable().ajax.reload();
                                $('#modal_edit_product').modal('hide');
                                $('#modal_update_product_success_message').modal(
                                    'show');
                            }
                        });
                    }
                }
            }
        });
    });


    $("#btn_confirm_product_update").click(function () {

        var prod_id = $('#prod_id').val();

        $.ajax({

            url: '../controller/products/read_product.php',
            method: 'post',
            data: {
                prod_id: prod_id
            },
            success: function (data) {

                var product_row = JSON.parse(data);
                var validate_prod_id = product_row['prod_id'] == $('#prod_id').val();
                var validate_prod_name = product_row['prod_name'] == $('#prod_name')
                    .val().toUpperCase();
                var validate_prod_desc = product_row['prod_desc'] == $('#prod_desc')
                    .val().toUpperCase();
                var validate_prod_brand = product_row['prod_brand'] == $(
                    '#prod_brand').val().toUpperCase();
                var validate_prod_group = product_row['prod_group'] == $(
                    '#prod_group').val().toUpperCase();
                var validate_prod_cost = product_row['prod_cost'] ==
                    brl_to_float($(
                        '#prod_cost').val());
                var validate_prod_markup = product_row['prod_markup'] == $(
                    '#prod_markup').val();
                var validate_prod_price = product_row['prod_price'] ==
                    brl_to_float($(
                        '#prod_price').val());
                var validate_prod_unit = product_row['prod_unit'] == $(
                    '#prod_unit').val();

                if (validate_prod_id && validate_prod_name && validate_prod_desc &&
                    validate_prod_brand && validate_prod_group &&
                    validate_prod_cost && validate_prod_markup &&
                    validate_prod_price && validate_prod_unit) {
                    var form_equals_db = true;
                } else {
                    var form_equals_db = false;

                }

                var style = getComputedStyle(modal_confirm_delete);

                var display = style.display;

                if (display == 'none' && !form_equals_db) {

                    var prod_id = $('#prod_id').val();
                    var prod_name = $('#prod_name').val().toUpperCase();
                    var prod_brand = $('#prod_brand').val().toUpperCase();
                    var prod_group = $('#prod_group').val().toUpperCase();
                    var prod_cost = brl_to_float($('#prod_cost').val());
                    var prod_markup = $('#prod_markup').val();
                    var prod_price = brl_to_float($('#prod_price').val());
                    var prod_unit = $('#prod_unit').val();
                    var prod_desc = $('#prod_desc').val().toUpperCase();
                    var form_ok = true;

                    if (prod_name) {
                        document.getElementById('prod_name').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('prod_name').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                        $('#modal_confirm_update_product').modal('hide');
                        $('#modal_edit_product').modal('show');
                    }
                    if (prod_brand) {
                        document.getElementById('prod_brand').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('prod_brand').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                        $('#modal_confirm_update_product').modal('hide');
                        $('#modal_edit_product').modal('show');
                    }
                    if (prod_group) {
                        document.getElementById('prod_group').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('prod_group').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                        $('#modal_confirm_update_product').modal('hide');
                        $('#modal_edit_product').modal('show');
                    }
                    if (prod_cost && isFloat(prod_cost)) {
                        document.getElementById('prod_cost').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('prod_cost').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                        $('#modal_confirm_update_product').modal('hide');
                        $('#modal_edit_product').modal('show');
                    }
                    if (prod_markup && isFloat(prod_markup)) {
                        document.getElementById('prod_markup').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('prod_markup').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                        $('#modal_confirm_update_product').modal('hide');
                        $('#modal_edit_product').modal('show');
                    }
                    if (prod_price && isFloat(prod_price)) {
                        document.getElementById('prod_price').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('prod_price').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                        $('#modal_confirm_update_product').modal('hide');
                        $('#modal_edit_product').modal('show');
                    }
                    if (prod_unit && prod_unit != 'Escolha...') {
                        document.getElementById('prod_unit').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('prod_unit').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                        $('#modal_confirm_update_product').modal('hide');
                        $('#modal_edit_product').modal('show');
                    }

                    if (form_ok) {

                        $.ajax({

                            url: '../controller/products/update_product.php',
                            method: 'post',
                            data: {
                                prod_id: prod_id,
                                prod_name: prod_name,
                                prod_desc: prod_desc,
                                prod_brand: prod_brand,
                                prod_group: prod_group,
                                prod_cost: prod_cost,
                                prod_markup: prod_markup,
                                prod_price: prod_price,
                                prod_unit: prod_unit
                            },

                            success: function (data) {

                                $('#list-products').DataTable().ajax.reload();
                                $('#modal_edit_product').modal('hide');
                                $('#modal_confirm_update_product').modal('hide');
                                $('#modal_update_product_success_message').modal('show');
                            }
                        });
                    }
                }
            }
        });
    });


    function clean_modal_edit_product() {

        document.getElementById('prod_name').style.boxShadow = "0px 0px";
        document.getElementById('prod_brand').style.boxShadow = "0px 0px";
        document.getElementById('prod_group').style.boxShadow = "0px 0px";
        document.getElementById('prod_cost').style.boxShadow = "0px 0px";
        document.getElementById('prod_markup').style.boxShadow = "0px 0px";
        document.getElementById('prod_price').style.boxShadow = "0px 0px";
        document.getElementById('prod_unit').style.boxShadow = "0px 0px";
    };

    function clean_modal_create_product() {
        $('#prod_name_create').val('');
        $('#prod_brand_create').val('');
        $('#prod_group_create').val('');
        $('#prod_cost_create').val('0,00');
        $('#prod_markup_create').val('60');
        $('#prod_price_create').val('0,00');
        $('#prod_unit_create').val('Escolha...');
        $('#prod_desc_create').val('');

        document.getElementById('prod_name_create').style.boxShadow = "0px 0px";
        document.getElementById('prod_brand_create').style.boxShadow = "0px 0px";
        document.getElementById('prod_group_create').style.boxShadow = "0px 0px";
        document.getElementById('prod_cost_create').style.boxShadow = "0px 0px";
        document.getElementById('prod_markup_create').style.boxShadow = "0px 0px";
        document.getElementById('prod_price_create').style.boxShadow = "0px 0px";
        document.getElementById('prod_unit_create').style.boxShadow = "0px 0px";
    };


    function autocomplete_product_groups(input) {
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

    $("#modal_create_product").on('hidden.bs.modal', function () {
        clean_modal_create_product();
        autocomplete_product_groups('prod_group_create');
        autocomplete_product_brands('prod_brand_create');

    });

    $("#modal_create_product").on('shown.bs.modal', function () {
        autocomplete_product_groups('prod_group_create');
        autocomplete_product_brands('prod_brand_create');
    });


    $("#btn_create_product").click(function () {

        var prod_name = $('#prod_name_create').val().toUpperCase();
        var prod_brand = $('#prod_brand_create').val().toUpperCase();
        var prod_group = $('#prod_group_create').val().toUpperCase();
        var prod_cost = brl_to_float($('#prod_cost_create').val());
        var prod_markup = $('#prod_markup_create').val();
        var prod_price = brl_to_float($('#prod_price_create').val());
        var prod_unit = $('#prod_unit_create').val();
        var prod_desc = $('#prod_desc_create').val();
        var form_ok = true;


        if (prod_name) {
            document.getElementById('prod_name_create').style.boxShadow = "0px 0px";
        } else {
            document.getElementById('prod_name_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }
        if (prod_brand) {
            document.getElementById('prod_brand_create').style.boxShadow = "0px 0px";
        } else {
            document.getElementById('prod_brand_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }
        if (prod_group) {
            document.getElementById('prod_group_create').style.boxShadow = "0px 0px";
        } else {
            document.getElementById('prod_group_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }
        if (prod_cost && isFloat(prod_cost)) {
            document.getElementById('prod_cost_create').style.boxShadow = "0px 0px";
        } else {
            document.getElementById('prod_cost_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }
        if (prod_markup && isFloat(prod_markup)) {
            document.getElementById('prod_markup_create').style.boxShadow = "0px 0px";
        } else {
            document.getElementById('prod_markup_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }
        if (prod_price && isFloat(prod_price)) {
            document.getElementById('prod_price_create').style.boxShadow = "0px 0px";
        } else {
            document.getElementById('prod_price_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }
        if (prod_unit && prod_unit != 'Escolha...') {
            document.getElementById('prod_unit_create').style.boxShadow = "0px 0px";
        } else {
            document.getElementById('prod_unit_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }
        if (form_ok) {

            $.ajax({
                url: '../controller/products/create_product.php',
                method: 'post',
                data: {
                    prod_name: prod_name,
                    prod_brand: prod_brand,
                    prod_group: prod_group,
                    prod_cost: prod_cost,
                    prod_markup: prod_markup,
                    prod_price: prod_price,
                    prod_unit: prod_unit,
                    prod_desc: prod_desc
                },
                success: function (data) {
                    $('#list-products').DataTable().ajax.reload();
                    $('#modal_create_product').modal('hide');
                    $('#modal_create_product_success_message').modal('show');
                    clean_modal_create_product();
                }
            });
        }
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


    $("#btn_delete_product").click(function () {

        $('#modal_edit_product').modal('hide');
        var prod_id = $('#prod_id').val();

        $.ajax({

            url: '../controller/products/read_product.php',
            method: 'post',
            data: {
                prod_id: prod_id
            },
            success: function (data) {

                var product_row = JSON.parse(data);
                var selected_product = product_row['prod_name'];
                $('#txt_delete_product').text(
                    'Tem certeza que deseja excluir o produto \"' +
                    selected_product + '\"?');

            }
        });

        $('#modal_confirm_delete').modal('show');
    });


    $("#prod_cost").keyup(function () {

        var prod_cost = brl_to_float($("#prod_cost").val());
        var prod_markup = $("#prod_markup").val();
        var prod_price = prod_cost * ((prod_markup / 100) + 1);

        isNaN(prod_price) ? $("#prod_price").val('0,00') : $(
            "#prod_price").val(float_to_brl(prod_price));

        isNaN(prod_cost) ? $("#prod_cost").val('0,00') : $(
            "#prod_cost").val(float_to_brl(parseFloat(prod_cost)));
    });


    $("#prod_markup").keyup(function () {

        var prod_cost = brl_to_float($("#prod_cost").val());
        var prod_markup = $("#prod_markup").val();
        var prod_price = prod_cost * ((prod_markup / 100) + 1);

        isNaN(prod_markup) || prod_markup == '' ? $("#prod_markup").val('0') : $(
            "#prod_markup").val(parseInt(prod_markup));

        isNaN(prod_price) ? $("#prod_price").val('0,00') : $(
            "#prod_price").val(float_to_brl(prod_price));
    });


    $("#prod_price").keyup(function () {

        var prod_cost = brl_to_float($("#prod_cost").val());
        var prod_price = $("#prod_price").val();
        var price_toFloat = brl_to_float(prod_price);
        var prod_cost_double = brl_to_float(prod_cost);
        var price_toBrl = float_to_brl(parseFloat(price_toFloat));
        var prod_markup = ((price_toFloat / prod_cost_double) - 1) * 100;

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

        isNaN(prod_price) ? $("#prod_price_create").val('0,00') : $(
            "#prod_price_create").val(float_to_brl(prod_price));

        isNaN(prod_cost) ? $("#prod_cost_create").val('0,00') : $(
            "#prod_cost_create").val(float_to_brl(parseFloat(prod_cost)));
    });


    $("#prod_markup_create").keyup(function () {

        var string_prod_cost = $("#prod_cost_create").val().toString();

        var x = string_prod_cost.length;
        var prod_cost = brl_to_float($("#prod_cost_create").val());
        var prod_markup = $("#prod_markup_create").val();
        var prod_price = prod_cost * ((prod_markup / 100) + 1);
        var prod_cost_double = brl_to_float(prod_cost);

        isNaN(prod_markup) || prod_markup == '' ? $("#prod_markup_create").val('0') : $(
            "#prod_markup_create").val(parseInt(prod_markup));

        isNaN(prod_price) ? $("#prod_price_create").val('0,00') : $(
            "#prod_price_create").val(float_to_brl(prod_price));

    });


    $("#prod_price_create").keyup(function () {

        var prod_cost = brl_to_float($("#prod_cost_create").val());
        var prod_price = $("#prod_price_create").val();

        var price_toFloat = brl_to_float(prod_price);
        var prod_cost_double = brl_to_float(prod_cost);
        var price_toBrl = float_to_brl(parseFloat(price_toFloat));
        var prod_markup = ((price_toFloat / prod_cost_double) - 1) * 100;

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

});