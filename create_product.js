$("#btn_create_product").click(function () {

    var nome_prod = $('#nome_prod_create').val().toUpperCase();
    var marca_prod = $('#marca_prod_create').val().toUpperCase();
    var grupo_prod = $('#grupo_prod_create').val().toUpperCase();
    var custo_prod = real_to_double($('#custo_prod_create').val());
    var margem_prod = $('#margem_prod_create').val();
    var preco_prod = real_to_double($('#preco_prod_create').val());
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