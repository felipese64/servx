/********************************************CORRIGIR************************************************************* 

    modal window se desloca p/ esquerda por causa da barra de rolagem
    Corrigir *** Criar objeto DB em todas as funcoes do DAO
    arrumar design entre navbar e body
    navbar collapse
    mostrar % da margem na datatable
    fazer regEXP p/ real->double
    usar int ao inves de double
    database e variaveis em ingles

    ******************************************************************************************************************/

$(document).ready(function () {
    var table = $('#list-products').DataTable({
        "processing": true,
        "serverSide": true,
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
        },
        "initComplete": function (settings, json) {


            $('#list-products_filter').prepend(
                '<button type="button" class="btn btn-primary" id="btn_open_create_product_modal">Adicionar Produto</button>'
            );

            $('#btn_open_create_product_modal').on("click", function () {

                $('#modal_create_product').modal('show');

            });

        },


        "ajax": {
            "url": "../controller/products_controller.php",
            "type": "POST"
        }
    });

    function isFloat(n) {
        return parseFloat(n) == n && n != 0;
    }



    /*
    document.getElementById('modal_edit_product').onkeydown = function (evt) {
        var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
        if (keyCode == 13) {
            $('#btn_update_product').click();
        }
    }

    */

    function enter_to_send_form(id_form, id_button) {
        document.getElementById(id_form).onkeydown = function (evt) {
            var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
            if (keyCode == 13) {
                $("#" + id_button).click();
            }
        }
    }

    enter_to_send_form('modal_edit_product', 'btn_update_product');
    enter_to_send_form('modal_create_product', 'btn_create_product');
    enter_to_send_form('modal_create_product_success_message', 'modal_close_create_product_success_message');
    enter_to_send_form('modal_update_product_success_message', 'modal_close_update_product_success_message');
    enter_to_send_form('modal_confirm_update_product', 'btn_confirm_product_update');
    enter_to_send_form('modal_confirm_delete', 'btn_confirm_product_deletion');




    $('#table_body').on('click', 'tr', function () {
        var data = table.row(this).data();


        var id_prod = data[0];


        //var id_prod = document.getElementById("input_id_prod");
        //id_prod.value = data[0];

        //$("#id_prod").value(data[0]);
        //document.getElementById("form_id_prod").submit();
        //alert(id_prod);


        $.ajax({

            url: '../controller/read_product.php',
            method: 'post',
            data: {
                id_prod1: id_prod
            },
            success: function (data) {

                //alert(data);

                var product_row = JSON.parse(data);
                //alert(product_row['nome_prod']);

                $('#id_prod').val(product_row['id_prod']);
                $('#nome_prod').val(product_row['nome_prod']);
                $('#desc_prod').val(product_row['desc_prod']);
                $('#marca_prod').val(product_row['marca_prod']);
                $('#grupo_prod').val(product_row['grupo_prod']);
                $('#custo_prod').val(float_to_brl(parseFloat(product_row[
                    'custo_prod'])));
                $('#margem_prod').val(product_row['margem_prod']);
                $('#preco_prod').val(float_to_brl(parseFloat(product_row[
                    'preco_prod'])));
                $('#unidade_prod').val(product_row['unidade_prod']);

                $('#modal_edit_product').modal('show');

            }
        });




    });




    $(".btn_cancel_product_deletion").click(function () {
        $('#modal_edit_product').modal('show');
    });




    $("#modal_edit_product").on('hide.bs.modal', function () {

        // $("#modal_edit_product").on('hidden.bs.modal', function() {

        //alert(data_form_prod.toString());
        //console.log(data_form_prod);
        autocomplete_product_groups('grupo_prod');
        autocomplete_product_brands('marca_prod');

        var id_prod = $('#id_prod').val();


        $.ajax({

            url: '../controller/read_product.php',
            method: 'post',
            data: {
                id_prod1: id_prod
            },
            success: function (data) {

                //Descobrir como comparar array com objeto p/ simplificar
                //Unico campo que pode estar vazio nessa verificação é o desc_prod
                //Unico campo que pode estar vazio nessa verificação é o desc_prod

                var product_row = JSON.parse(data);

                var validate_id_prod = product_row['id_prod'] == $('#id_prod').val();
                var validate_nome_prod = product_row['nome_prod'] == $('#nome_prod')
                    .val().toUpperCase();

                //alert('conteudo:' + product_row['desc_prod']);
                // var form_desc_prod;
                // $('#desc_prod').val() ? form_desc_prod = $('#desc_prod').val() :
                //     form_desc_prod = null;

                //  var validate_desc_prod = product_row['desc_prod'] == form_desc_prod;
                var validate_desc_prod = product_row['desc_prod'] == $('#desc_prod')
                    .val().toUpperCase();
                var validate_marca_prod = product_row['marca_prod'] == $(
                    '#marca_prod').val().toUpperCase();
                var validate_grupo_prod = product_row['grupo_prod'] == $(
                    '#grupo_prod').val().toUpperCase();
                var validate_custo_prod = product_row['custo_prod'] ==
                    brl_to_float($(
                        '#custo_prod').val());
                var validate_margem_prod = product_row['margem_prod'] == $(
                    '#margem_prod').val();
                var validate_preco_prod = product_row['preco_prod'] ==
                    brl_to_float($(
                        '#preco_prod').val());
                var validate_unidade_prod = product_row['unidade_prod'] == $(
                    '#unidade_prod').val();


                if (validate_id_prod && validate_nome_prod && validate_desc_prod &&
                    validate_marca_prod && validate_grupo_prod &&
                    validate_custo_prod && validate_margem_prod &&
                    validate_preco_prod && validate_unidade_prod) {
                    var form_equals_db = true;
                } else {
                    var form_equals_db = false;

                }

                var style = getComputedStyle(modal_confirm_delete);

                var display = style.display;

                if (display == 'none' && !form_equals_db) {

                    /*
                    alert(validate_id_prod + ' ' + validate_nome_prod + ' ' +
                        validate_desc_prod + ' ' + validate_marca_prod + ' ' +
                        validate_grupo_prod + ' ' + validate_custo_prod + ' ' +
                        validate_margem_prod + ' ' + validate_preco_prod + ' ' +
                        validate_unidade_prod);
                    */

                    clean_modal_edit_product();
                    $('#modal_confirm_update_product').modal('show');



                }

            }




        });


    });

    $("#modal_edit_product").on('shown.bs.modal', function () {
        autocomplete_product_groups('grupo_prod');
        autocomplete_product_brands('marca_prod');
    });


    $("#btn_confirm_product_deletion").click(function () {

        var id_prod = $('#id_prod').val();

        $.ajax({

            url: '../controller/delete_product.php',
            method: 'post',
            data: {
                id_prod1: id_prod
            },
            success: function (data) {

                //alert(data);
                //data = 1 p sucesso



                $('#modal_confirm_delete').modal('hide');
                //alert('Produto excluido com sucesso!');
                $('#list-products').DataTable().ajax.reload();


            }
        });



    });


    $('#btn_update_product').click(function () {

        var id_prod = $('#id_prod').val();


        $.ajax({

            url: '../controller/read_product.php',
            method: 'post',
            data: {
                id_prod1: id_prod
            },
            success: function (data) {

                //Descobrir como comparar array com objeto p/ simplificar
                //Unico campo que pode estar vazio nessa verificação é o desc_prod
                //Unico campo que pode estar vazio nessa verificação é o desc_prod

                var product_row = JSON.parse(data);

                var validate_id_prod = product_row['id_prod'] == $('#id_prod').val();
                var validate_nome_prod = product_row['nome_prod'] == $('#nome_prod')
                    .val().toUpperCase();

                //alert('conteudo:' + product_row['desc_prod']);
                // var form_desc_prod;
                // $('#desc_prod').val() ? form_desc_prod = $('#desc_prod').val() :
                //     form_desc_prod = null;

                //  var validate_desc_prod = product_row['desc_prod'] == form_desc_prod;
                var validate_desc_prod = product_row['desc_prod'] == $('#desc_prod')
                    .val().toUpperCase();
                var validate_marca_prod = product_row['marca_prod'] == $(
                    '#marca_prod').val().toUpperCase();
                var validate_grupo_prod = product_row['grupo_prod'] == $(
                    '#grupo_prod').val().toUpperCase();
                var validate_custo_prod = product_row['custo_prod'] ==
                    brl_to_float($(
                        '#custo_prod').val());
                var validate_margem_prod = product_row['margem_prod'] == $(
                    '#margem_prod').val();
                var validate_preco_prod = product_row['preco_prod'] ==
                    brl_to_float($(
                        '#preco_prod').val());
                var validate_unidade_prod = product_row['unidade_prod'] == $(
                    '#unidade_prod').val();


                if (validate_id_prod && validate_nome_prod && validate_desc_prod &&
                    validate_marca_prod && validate_grupo_prod &&
                    validate_custo_prod && validate_margem_prod &&
                    validate_preco_prod && validate_unidade_prod) {
                    var form_equals_db = true;
                } else {
                    var form_equals_db = false;

                }

                var style = getComputedStyle(modal_confirm_delete);

                var display = style.display;

                if (display == 'none' && !form_equals_db) {

                    var id_prod = $('#id_prod').val();
                    var nome_prod = $('#nome_prod').val().toUpperCase();
                    var marca_prod = $('#marca_prod').val().toUpperCase();
                    var grupo_prod = $('#grupo_prod').val().toUpperCase();
                    var custo_prod = brl_to_float($('#custo_prod').val());
                    var margem_prod = $('#margem_prod').val();
                    var preco_prod = brl_to_float($('#preco_prod').val());
                    var unidade_prod = $('#unidade_prod').val();
                    var desc_prod = $('#desc_prod').val().toUpperCase();
                    var form_ok = true;


                    if (nome_prod) {
                        document.getElementById('nome_prod').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('nome_prod').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                    }

                    if (marca_prod) {
                        document.getElementById('marca_prod').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('marca_prod').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                    }

                    if (grupo_prod) {
                        document.getElementById('grupo_prod').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('grupo_prod').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                    }

                    if (custo_prod && isFloat(custo_prod)) {
                        document.getElementById('custo_prod').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('custo_prod').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                    }

                    if (margem_prod && isFloat(margem_prod)) {
                        document.getElementById('margem_prod').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('margem_prod').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                    }

                    if (preco_prod && isFloat(preco_prod)) {
                        document.getElementById('preco_prod').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('preco_prod').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                    }

                    if (unidade_prod && unidade_prod != 'Escolha...') {
                        document.getElementById('unidade_prod').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('unidade_prod').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                    }



                    if (form_ok) {


                        $.ajax({

                            url: '../controller/update_product.php',
                            method: 'post',
                            data: {
                                id_prod: id_prod,
                                nome_prod: nome_prod,
                                desc_prod: desc_prod,
                                marca_prod: marca_prod,
                                grupo_prod: grupo_prod,
                                custo_prod: custo_prod,
                                margem_prod: margem_prod,
                                preco_prod: preco_prod,
                                unidade_prod: unidade_prod
                            },

                            success: function (data) {

                                //alert(data);

                                $('#list-products').DataTable().ajax.reload();
                                $('#modal_edit_product').modal('hide');
                                $('#modal_update_product_success_message').modal(
                                    'show');


                                //  $('#modal_confirm_update_product').modal('hide');
                            }
                        });


                    }




                }

            }




        });










    });

    $("#btn_confirm_product_update").click(function () {

        var id_prod = $('#id_prod').val();


        $.ajax({

            url: '../controller/read_product.php',
            method: 'post',
            data: {
                id_prod1: id_prod
            },
            success: function (data) {

                //Descobrir como comparar array com objeto p/ simplificar
                //Unico campo que pode estar vazio nessa verificação é o desc_prod
                //Unico campo que pode estar vazio nessa verificação é o desc_prod

                var product_row = JSON.parse(data);

                var validate_id_prod = product_row['id_prod'] == $('#id_prod').val();
                var validate_nome_prod = product_row['nome_prod'] == $('#nome_prod')
                    .val().toUpperCase();

                //alert('conteudo:' + product_row['desc_prod']);
                // var form_desc_prod;
                // $('#desc_prod').val() ? form_desc_prod = $('#desc_prod').val() :
                //     form_desc_prod = null;

                //  var validate_desc_prod = product_row['desc_prod'] == form_desc_prod;
                var validate_desc_prod = product_row['desc_prod'] == $('#desc_prod')
                    .val().toUpperCase();
                var validate_marca_prod = product_row['marca_prod'] == $(
                    '#marca_prod').val().toUpperCase();
                var validate_grupo_prod = product_row['grupo_prod'] == $(
                    '#grupo_prod').val().toUpperCase();
                var validate_custo_prod = product_row['custo_prod'] ==
                    brl_to_float($(
                        '#custo_prod').val());
                var validate_margem_prod = product_row['margem_prod'] == $(
                    '#margem_prod').val();
                var validate_preco_prod = product_row['preco_prod'] ==
                    brl_to_float($(
                        '#preco_prod').val());
                var validate_unidade_prod = product_row['unidade_prod'] == $(
                    '#unidade_prod').val();


                if (validate_id_prod && validate_nome_prod && validate_desc_prod &&
                    validate_marca_prod && validate_grupo_prod &&
                    validate_custo_prod && validate_margem_prod &&
                    validate_preco_prod && validate_unidade_prod) {
                    var form_equals_db = true;
                } else {
                    var form_equals_db = false;

                }

                var style = getComputedStyle(modal_confirm_delete);

                var display = style.display;

                if (display == 'none' && !form_equals_db) {

                    var id_prod = $('#id_prod').val();
                    var nome_prod = $('#nome_prod').val().toUpperCase();
                    var marca_prod = $('#marca_prod').val().toUpperCase();
                    var grupo_prod = $('#grupo_prod').val().toUpperCase();
                    var custo_prod = brl_to_float($('#custo_prod').val());
                    var margem_prod = $('#margem_prod').val();
                    var preco_prod = brl_to_float($('#preco_prod').val());
                    var unidade_prod = $('#unidade_prod').val();
                    var desc_prod = $('#desc_prod').val().toUpperCase();
                    var form_ok = true;


                    if (nome_prod) {
                        document.getElementById('nome_prod').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('nome_prod').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                        $('#modal_confirm_update_product').modal('hide');
                        $('#modal_edit_product').modal('show');
                    }

                    if (marca_prod) {
                        document.getElementById('marca_prod').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('marca_prod').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                        $('#modal_confirm_update_product').modal('hide');
                        $('#modal_edit_product').modal('show');
                    }

                    if (grupo_prod) {
                        document.getElementById('grupo_prod').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('grupo_prod').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                        $('#modal_confirm_update_product').modal('hide');
                        $('#modal_edit_product').modal('show');
                    }

                    if (custo_prod && isFloat(custo_prod)) {
                        document.getElementById('custo_prod').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('custo_prod').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                        $('#modal_confirm_update_product').modal('hide');
                        $('#modal_edit_product').modal('show');
                    }

                    if (margem_prod && isFloat(margem_prod)) {
                        document.getElementById('margem_prod').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('margem_prod').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                        $('#modal_confirm_update_product').modal('hide');
                        $('#modal_edit_product').modal('show');
                    }

                    if (preco_prod && isFloat(preco_prod)) {
                        document.getElementById('preco_prod').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('preco_prod').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                        $('#modal_confirm_update_product').modal('hide');
                        $('#modal_edit_product').modal('show');
                    }

                    if (unidade_prod && unidade_prod != 'Escolha...') {
                        document.getElementById('unidade_prod').style.boxShadow =
                            "0px 0px";
                    } else {
                        document.getElementById('unidade_prod').style.boxShadow =
                            "0 0 0 .2rem rgba(255,0,0,.25)";
                        form_ok = false;
                        $('#modal_confirm_update_product').modal('hide');
                        $('#modal_edit_product').modal('show');
                    }



                    if (form_ok) {


                        $.ajax({

                            url: '../controller/update_product.php',
                            method: 'post',
                            data: {
                                id_prod: id_prod,
                                nome_prod: nome_prod,
                                desc_prod: desc_prod,
                                marca_prod: marca_prod,
                                grupo_prod: grupo_prod,
                                custo_prod: custo_prod,
                                margem_prod: margem_prod,
                                preco_prod: preco_prod,
                                unidade_prod: unidade_prod
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

        /*
        
        
                var id_prod = $('#id_prod').val();
                var nome_prod = $('#nome_prod').val().toUpperCase();
                var desc_prod = $('#desc_prod').val().toUpperCase();
                var marca_prod = $('#marca_prod').val().toUpperCase();
                var grupo_prod = $('#grupo_prod').val().toUpperCase();
                var custo_prod = brl_to_float($('#custo_prod').val());
                var margem_prod = $('#margem_prod').val();
                var preco_prod = brl_to_float($('#preco_prod').val());
                var unidade_prod = $('#unidade_prod').val();
        
        
        
                $.ajax({
        
                    url: '../controller/update_product.php',
                    method: 'post',
                    data: {
                        id_prod: id_prod,
                        nome_prod: nome_prod,
                        desc_prod: desc_prod,
                        marca_prod: marca_prod,
                        grupo_prod: grupo_prod,
                        custo_prod: custo_prod,
                        margem_prod: margem_prod,
                        preco_prod: preco_prod,
                        unidade_prod: unidade_prod
                    },
        
                    success: function (data) {
        
                        //alert(data);
        
                        $('#list-products').DataTable().ajax.reload();
                        $('#modal_edit_product').modal('hide');
                        $('#modal_confirm_update_product').modal('hide');
                        $('#modal_update_product_success_message').modal('show');
        
        
        
                    }
                });
        */



    });

    function clean_modal_edit_product() {

        document.getElementById('nome_prod').style.boxShadow = "0px 0px";
        document.getElementById('marca_prod').style.boxShadow = "0px 0px";
        document.getElementById('grupo_prod').style.boxShadow = "0px 0px";
        document.getElementById('custo_prod').style.boxShadow = "0px 0px";
        document.getElementById('margem_prod').style.boxShadow = "0px 0px";
        document.getElementById('preco_prod').style.boxShadow = "0px 0px";
        document.getElementById('unidade_prod').style.boxShadow = "0px 0px";
    };

    function clean_modal_create_product() {
        $('#nome_prod_create').val('');
        $('#marca_prod_create').val('');
        $('#grupo_prod_create').val('');
        $('#custo_prod_create').val('0,00');
        $('#margem_prod_create').val('60');
        $('#preco_prod_create').val('0,00');
        $('#unidade_prod_create').val('Escolha...');
        $('#desc_prod_create').val('');

        document.getElementById('nome_prod_create').style.boxShadow = "0px 0px";
        document.getElementById('marca_prod_create').style.boxShadow = "0px 0px";
        document.getElementById('grupo_prod_create').style.boxShadow = "0px 0px";
        document.getElementById('custo_prod_create').style.boxShadow = "0px 0px";
        document.getElementById('margem_prod_create').style.boxShadow = "0px 0px";
        document.getElementById('preco_prod_create').style.boxShadow = "0px 0px";
        document.getElementById('unidade_prod_create').style.boxShadow = "0px 0px";
    };


    function autocomplete_product_groups(input) {
        $.ajax({

            url: '../controller/read_product_groups.php',
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

            url: '../controller/read_product_brands.php',
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
        autocomplete_product_groups('grupo_prod_create');
        autocomplete_product_brands('marca_prod_create');

    });

    $("#modal_create_product").on('shown.bs.modal', function () {
        autocomplete_product_groups('grupo_prod_create');
        autocomplete_product_brands('marca_prod_create');
    });




    $("#btn_create_product").click(function () {

        var nome_prod = $('#nome_prod_create').val().toUpperCase();
        var marca_prod = $('#marca_prod_create').val().toUpperCase();
        var grupo_prod = $('#grupo_prod_create').val().toUpperCase();
        var custo_prod = brl_to_float($('#custo_prod_create').val());
        var margem_prod = $('#margem_prod_create').val();
        var preco_prod = brl_to_float($('#preco_prod_create').val());
        var unidade_prod = $('#unidade_prod_create').val();
        var desc_prod = $('#desc_prod_create').val();
        var form_ok = true;


        if (nome_prod) {
            document.getElementById('nome_prod_create').style.boxShadow = "0px 0px";
        } else {
            document.getElementById('nome_prod_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        if (marca_prod) {
            document.getElementById('marca_prod_create').style.boxShadow = "0px 0px";
        } else {
            document.getElementById('marca_prod_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        if (grupo_prod) {
            document.getElementById('grupo_prod_create').style.boxShadow = "0px 0px";
        } else {
            document.getElementById('grupo_prod_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        if (custo_prod && isFloat(custo_prod)) {
            document.getElementById('custo_prod_create').style.boxShadow = "0px 0px";
        } else {
            document.getElementById('custo_prod_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        if (margem_prod && isFloat(margem_prod)) {
            document.getElementById('margem_prod_create').style.boxShadow = "0px 0px";
        } else {
            document.getElementById('margem_prod_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        if (preco_prod && isFloat(preco_prod)) {
            document.getElementById('preco_prod_create').style.boxShadow = "0px 0px";
        } else {
            document.getElementById('preco_prod_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }

        if (unidade_prod && unidade_prod != 'Escolha...') {
            document.getElementById('unidade_prod_create').style.boxShadow = "0px 0px";
        } else {
            document.getElementById('unidade_prod_create').style.boxShadow =
                "0 0 0 .2rem rgba(255,0,0,.25)";
            form_ok = false;
        }



        if (form_ok) {


            $.ajax({
                url: '../controller/create_product.php',
                method: 'post',
                data: {
                    nome_prod: nome_prod,
                    marca_prod: marca_prod,
                    grupo_prod: grupo_prod,
                    custo_prod: custo_prod,
                    margem_prod: margem_prod,
                    preco_prod: preco_prod,
                    unidade_prod: unidade_prod,
                    desc_prod: desc_prod
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


    function selectAllText(textbox) {
        textbox.focus();
        textbox.select();
    }

    $('#custo_prod').click(function () {
        selectAllText(jQuery(this))
    });

    $('#margem_prod').click(function () {
        selectAllText(jQuery(this))
    });

    $('#preco_prod').click(function () {
        selectAllText(jQuery(this))
    });

    $('#custo_prod_create').click(function () {
        selectAllText(jQuery(this))
    });

    $('#margem_prod_create').click(function () {
        selectAllText(jQuery(this))
    });

    $('#preco_prod_create').click(function () {
        selectAllText(jQuery(this))
    });


    $("#btn_delete_product").click(function () {

        //form exclusao pega nome modificado do form de edição


        $('#modal_edit_product').modal('hide');

        var id_prod = $('#id_prod').val();




        $.ajax({

            url: '../controller/read_product.php',
            method: 'post',
            data: {
                id_prod1: id_prod
            },
            success: function (data) {

                //alert(data);

                var product_row = JSON.parse(data);
                //alert(product_row['nome_prod']);




                var selected_product = product_row['nome_prod'];


                $('#txt_delete_product').text(
                    'Tem certeza que deseja excluir o produto \"' +
                    selected_product + '\"?');

            }
        });

        $('#modal_confirm_delete').modal('show');
    });


    $("#custo_prod").keyup(function () {

        var string_custo_prod = $("#custo_prod").val().toString();

        var x = string_custo_prod.length;
        var simbolo_decimal = string_custo_prod.substring(x - 3, x);
        //var have_comma = string_custo_prod.includes(",");
        //var have_dot = string_custo_prod.includes(".");


        // var simbolo_decimal = string_custo_prod.charAt(x - 3);

        var custo_prod = brl_to_float($("#custo_prod").val());
        //alert ("Custo_prod: " + custo_prod + "custoi prod val" + $("#custo_prod").val());

        // está ignorando a casa decimal










        var margem_prod = $("#margem_prod").val();
        var preco_prod = custo_prod * ((margem_prod / 100) + 1);


        var custo_prod_real = float_to_brl(parseFloat(custo_prod));
        var custo_prod_double = brl_to_float(custo_prod);
        var custo_prod_real2 = float_to_brl(parseFloat(custo_prod_double));

        //echo(custo_prod);

        //alert(custo_prod_real + " Double: " + custo_prod_double + " Segunda conversão" + custo_prod_real2);
        //cursor p/ esquerda
        //$("#preco_prod").val(float_to_brl(preco_prod));

        //$("#custo_prod").val(float_to_brl(parseFloat(custo_prod)));

        isNaN(preco_prod) ? $("#preco_prod").val('0,00') : $(
            "#preco_prod").val(float_to_brl(preco_prod));

        isNaN(custo_prod) ? $("#custo_prod").val('0,00') : $(
            "#custo_prod").val(float_to_brl(parseFloat(custo_prod)));



    });

    $("#margem_prod").keyup(function () {

        var string_custo_prod = $("#custo_prod").val().toString();

        var x = string_custo_prod.length;
        var simbolo_decimal = string_custo_prod.substring(x - 3, x);

        //var have_comma = string_custo_prod.includes(",");
        //var have_dot = string_custo_prod.includes(".");

        var custo_prod = brl_to_float($("#custo_prod").val());
        var margem_prod = $("#margem_prod").val();
        var preco_prod = custo_prod * ((margem_prod / 100) + 1);
        var custo_prod_real = float_to_brl(parseFloat(custo_prod));
        var custo_prod_double = brl_to_float(custo_prod);
        var custo_prod_real2 = float_to_brl(parseFloat(custo_prod_double));


        //$("#preco_prod").val(float_to_brl(preco_prod));
        //$("#margem_prod").val(parseInt(margem_prod));
        isNaN(margem_prod) || margem_prod == '' ? $("#margem_prod").val('0') : $(
            "#margem_prod").val(parseInt(margem_prod));

        isNaN(preco_prod) ? $("#preco_prod").val('0,00') : $(
            "#preco_prod").val(float_to_brl(preco_prod));


        //$("#custo_prod").val(float_to_brl(parseFloat(custo_prod)));
    });


    $("#preco_prod").keyup(function () {



        var custo_prod = brl_to_float($("#custo_prod").val());
        var margem_prod = $("#margem_prod").val();
        var preco_prod = $("#preco_prod").val();

        var preco_prod_double = brl_to_float(preco_prod);
        var custo_prod_double = brl_to_float(custo_prod);
        var preco_prod_real2 = float_to_brl(parseFloat(preco_prod_double));
        var margem_prod_calculada = ((preco_prod_double / custo_prod_double) - 1) * 100;

        if (margem_prod_calculada < 1 || isNaN(margem_prod_calculada) || margem_prod_calculada ==
            Infinity) {
            $("#margem_prod").val('0');
        } else {
            $("#margem_prod").val(parseInt(margem_prod_calculada));
        }

        //$("#preco_prod").val(preco_prod_real2);


        isNaN(parseFloat(preco_prod_real2)) ? $("#preco_prod").val('0,00') : $(
            "#preco_prod").val(
                preco_prod_real2);

    });





    //funções do form criar produto








    $("#custo_prod_create").keyup(function () {

        var string_custo_prod = $("#custo_prod_create").val().toString();

        var x = string_custo_prod.length;
        var simbolo_decimal = string_custo_prod.substring(x - 3, x);
        //var have_comma = string_custo_prod.includes(",");
        //var have_dot = string_custo_prod.includes(".");


        // var simbolo_decimal = string_custo_prod.charAt(x - 3);

        var custo_prod = brl_to_float($("#custo_prod_create").val());
        //alert ("Custo_prod: " + custo_prod + "custoi prod val" + $("#custo_prod").val());

        // está ignorando a casa decimal










        var margem_prod = $("#margem_prod_create").val();
        var preco_prod = custo_prod * ((margem_prod / 100) + 1);


        var custo_prod_real = float_to_brl(parseFloat(custo_prod));
        var custo_prod_double = brl_to_float(custo_prod);
        var custo_prod_real2 = float_to_brl(parseFloat(custo_prod_double));

        //echo(custo_prod);

        //alert(custo_prod_real + " Double: " + custo_prod_double + " Segunda conversão" + custo_prod_real2);
        //cursor p/ esquerda
        //$("#preco_prod_create").val(float_to_brl(preco_prod));

        //$("#custo_prod_create").val(float_to_brl(parseFloat(custo_prod)));

        isNaN(preco_prod) ? $("#preco_prod_create").val('0,00') : $(
            "#preco_prod_create").val(float_to_brl(preco_prod));

        isNaN(custo_prod) ? $("#custo_prod_create").val('0,00') : $(
            "#custo_prod_create").val(float_to_brl(parseFloat(custo_prod)));



    });

    $("#margem_prod_create").keyup(function () {

        var string_custo_prod = $("#custo_prod_create").val().toString();

        var x = string_custo_prod.length;
        var simbolo_decimal = string_custo_prod.substring(x - 3, x);

        //var have_comma = string_custo_prod.includes(",");
        //var have_dot = string_custo_prod.includes(".");

        var custo_prod = brl_to_float($("#custo_prod_create").val());
        var margem_prod = $("#margem_prod_create").val();
        var preco_prod = custo_prod * ((margem_prod / 100) + 1);
        var custo_prod_real = float_to_brl(parseFloat(custo_prod));
        var custo_prod_double = brl_to_float(custo_prod);
        var custo_prod_real2 = float_to_brl(parseFloat(custo_prod_double));


        //$("#preco_prod_create").val(float_to_brl(preco_prod));
        //$("#margem_prod_create").val(parseInt(margem_prod));
        isNaN(margem_prod) || margem_prod == '' ? $("#margem_prod_create").val('0') : $(
            "#margem_prod_create").val(parseInt(margem_prod));

        isNaN(preco_prod) ? $("#preco_prod_create").val('0,00') : $(
            "#preco_prod_create").val(float_to_brl(preco_prod));


        //$("#custo_prod_create").val(float_to_brl(parseFloat(custo_prod)));
    });


    $("#preco_prod_create").keyup(function () {



        var custo_prod = brl_to_float($("#custo_prod_create").val());
        var margem_prod = $("#margem_prod_create").val();
        var preco_prod = $("#preco_prod_create").val();

        var preco_prod_double = brl_to_float(preco_prod);
        var custo_prod_double = brl_to_float(custo_prod);
        var preco_prod_real2 = float_to_brl(parseFloat(preco_prod_double));
        var margem_prod_calculada = ((preco_prod_double / custo_prod_double) - 1) * 100;

        if (margem_prod_calculada < 1 || isNaN(margem_prod_calculada) || margem_prod_calculada ==
            Infinity) {
            $("#margem_prod_create").val('0');
            //alert('NaN: ' + margem_prod_calculada);
        } else {
            $("#margem_prod_create").val(parseInt(margem_prod_calculada));
            //alert('Number: ' + margem_prod_calculada);
        }

        //$("#preco_prod_create").val(preco_prod_real2);


        isNaN(parseFloat(preco_prod_real2)) ? $("#preco_prod_create").val('0,00') : $(
            "#preco_prod_create").val(
                preco_prod_real2);

    });

    //funções do form criar produto











});