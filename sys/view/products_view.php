<!doctype html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">


    <title>Home</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
        crossorigin="anonymous">
    <link href="https://cdn.datatables.net/1.10.18/css/dataTables.bootstrap4.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.5.2/css/buttons.dataTables.min.css">
    <link href="../../apps/css/jquery-ui.min.css" rel="stylesheet">
    <link href="../../apps/css/jquery-ui.structure.min.css" rel="stylesheet">
    <link href="../../apps/css/jquery-ui.theme.min.css" rel="stylesheet">
    <link href="../../apps/css/style.css" rel="stylesheet">

    <script src="https://code.jquery.com/jquery-3.3.1.min.js">
    </script>
    <script src="../../apps/js/jquery-ui.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js">
    </script>
    <script src="https://cdn.datatables.net/1.10.18/js/dataTables.bootstrap4.min.js">
    </script>
    <script src="https://cdn.datatables.net/buttons/1.5.2/js/dataTables.buttons.min.js">
    </script>

    <script src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.colVis.min.js">
    </script>
    <script src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.flash.min.js">
    </script>
    <script src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.print.min.js">
    </script>
    <script src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.html5.min.js">
    </script>





    <script type="text/javascript" language="javascript">
    function double_to_real(n) {
        return n.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
    }

    function real_to_double(n) {

        var x = n.replace(/[.]/g, "").replace(",", "");
        var z = x.length;
        if (z > 1) {

            var x1 = x.substring(0, z - 2);
            var x2 = x.substring(z - 2, z);
            var x3 = x1 + "." + x2;
        } else {
            x3 = "0.0" + x;
        }

        return x3;

    }

    function isFloat(n) {
        return parseFloat(n) == n && n != 0;
    }
    </script>



    <script type="text/javascript" language="javascript">
    $(document).ready(function() {
        var table = $('#list-products').DataTable({
            "processing": true,
            "serverSide": true,
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
            },
            "initComplete": function(settings, json) {


                $('#list-products_filter').prepend(
                    '<button type="button" class="btn btn-primary" id="btn_open_create_product_modal">Adicionar Produto</button>'
                );

                $('#btn_open_create_product_modal').on("click", function() {

                    $('#modal_create_product').modal('show');

                });

            },


            "ajax": {
                "url": "../controller/products_controller.php",
                "type": "POST"
            }
        });








        $('#table_body').on('click', 'tr', function() {
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
                success: function(data) {

                    //alert(data);

                    var product_row = JSON.parse(data);
                    //alert(product_row['nome_prod']);

                    $('#id_prod').val(product_row['id_prod']);
                    $('#nome_prod').val(product_row['nome_prod']);
                    $('#desc_prod').val(product_row['desc_prod']);
                    $('#marca_prod').val(product_row['marca_prod']);
                    $('#grupo_prod').val(product_row['grupo_prod']);
                    $('#custo_prod').val(double_to_real(parseFloat(product_row[
                        'custo_prod'])));
                    $('#margem_prod').val(product_row['margem_prod']);
                    $('#preco_prod').val(double_to_real(parseFloat(product_row[
                        'preco_prod'])));
                    $('#unidade_prod').val(product_row['unidade_prod']);

                    $('#modal_edit_product').modal('show');

                }
            });




        });




        $(".btn_cancel_product_deletion").click(function() {
            $('#modal_edit_product').modal('show');
        });




        $("#modal_edit_product").on('hide.bs.modal', function() {

            // $("#modal_edit_product").on('hidden.bs.modal', function() {

            //alert(data_form_prod.toString());
            //console.log(data_form_prod);

            var id_prod = $('#id_prod').val();


            $.ajax({

                url: '../controller/read_product.php',
                method: 'post',
                data: {
                    id_prod1: id_prod
                },
                success: function(data) {

                    //Descobrir como comparar array com objeto p/ simplificar
                    //Unico campo que pode estar vazio nessa verificação é o desc_prod
                    //Unico campo que pode estar vazio nessa verificação é o desc_prod

                    var product_row = JSON.parse(data);

                    var validate_id_prod = product_row['id_prod'] == $('#id_prod').val();
                    var validate_nome_prod = product_row['nome_prod'] == $('#nome_prod')
                        .val();

                    //alert('conteudo:' + product_row['desc_prod']);
                    // var form_desc_prod;
                    // $('#desc_prod').val() ? form_desc_prod = $('#desc_prod').val() :
                    //     form_desc_prod = null;

                    //  var validate_desc_prod = product_row['desc_prod'] == form_desc_prod;
                    var validate_desc_prod = product_row['desc_prod'] == $('#desc_prod')
                        .val();
                    var validate_marca_prod = product_row['marca_prod'] == $(
                        '#marca_prod').val();
                    var validate_grupo_prod = product_row['grupo_prod'] == $(
                        '#grupo_prod').val();
                    var validate_custo_prod = product_row['custo_prod'] ==
                        real_to_double($(
                            '#custo_prod').val());
                    var validate_margem_prod = product_row['margem_prod'] == $(
                        '#margem_prod').val();
                    var validate_preco_prod = product_row['preco_prod'] ==
                        real_to_double($(
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


                        $('#modal_confirm_update_product').modal('show');



                    }

                }




            });


        });


        $("#btn_confirm_product_deletion").click(function() {

            var id_prod = $('#id_prod').val();

            $.ajax({

                url: '../controller/delete_product.php',
                method: 'post',
                data: {
                    id_prod1: id_prod
                },
                success: function(data) {

                    //alert(data);
                    //data = 1 p sucesso



                    $('#modal_confirm_delete').modal('hide');
                    //alert('Produto excluido com sucesso!');
                    $('#list-products').DataTable().ajax.reload();


                }
            });



        });


        $('#btn_update_product').click(function() {

            var id_prod = $('#id_prod').val();


            $.ajax({

                url: '../controller/read_product.php',
                method: 'post',
                data: {
                    id_prod1: id_prod
                },
                success: function(data) {

                    //Descobrir como comparar array com objeto p/ simplificar
                    //Unico campo que pode estar vazio nessa verificação é o desc_prod
                    //Unico campo que pode estar vazio nessa verificação é o desc_prod

                    var product_row = JSON.parse(data);

                    var validate_id_prod = product_row['id_prod'] == $('#id_prod').val();
                    var validate_nome_prod = product_row['nome_prod'] == $('#nome_prod')
                        .val();

                    //alert('conteudo:' + product_row['desc_prod']);
                    // var form_desc_prod;
                    // $('#desc_prod').val() ? form_desc_prod = $('#desc_prod').val() :
                    //     form_desc_prod = null;

                    //  var validate_desc_prod = product_row['desc_prod'] == form_desc_prod;
                    var validate_desc_prod = product_row['desc_prod'] == $('#desc_prod')
                        .val();
                    var validate_marca_prod = product_row['marca_prod'] == $(
                        '#marca_prod').val();
                    var validate_grupo_prod = product_row['grupo_prod'] == $(
                        '#grupo_prod').val();
                    var validate_custo_prod = product_row['custo_prod'] ==
                        real_to_double($(
                            '#custo_prod').val());
                    var validate_margem_prod = product_row['margem_prod'] == $(
                        '#margem_prod').val();
                    var validate_preco_prod = product_row['preco_prod'] ==
                        real_to_double($(
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
                        var nome_prod = $('#nome_prod').val();
                        var desc_prod = $('#desc_prod').val();
                        var marca_prod = $('#marca_prod').val();
                        var grupo_prod = $('#grupo_prod').val();
                        var custo_prod = real_to_double($('#custo_prod').val());
                        var margem_prod = $('#margem_prod').val();
                        var preco_prod = real_to_double($('#preco_prod').val());
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

                            success: function(data) {

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




            });










        });

        $("#btn_confirm_product_update").click(function() {

            var id_prod = $('#id_prod').val();
            var nome_prod = $('#nome_prod').val();
            var desc_prod = $('#desc_prod').val();
            var marca_prod = $('#marca_prod').val();
            var grupo_prod = $('#grupo_prod').val();
            var custo_prod = real_to_double($('#custo_prod').val());
            var margem_prod = $('#margem_prod').val();
            var preco_prod = real_to_double($('#preco_prod').val());
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

                success: function(data) {

                    //alert(data);

                    $('#list-products').DataTable().ajax.reload();
                    $('#modal_edit_product').modal('hide');
                    $('#modal_confirm_update_product').modal('hide');
                    $('#modal_update_product_success_message').modal('show');



                }
            });




        });


        $("#btn_create_product").click(function() {

            var nome_prod = $('#nome_prod_create').val();
            var marca_prod = $('#marca_prod_create').val();
            var grupo_prod = $('#grupo_prod_create').val();
            var custo_prod = real_to_double($('#custo_prod_create').val());
            var margem_prod = $('#margem_prod_create').val();
            var preco_prod = real_to_double($('#preco_prod_create').val());
            var unidade_prod = $('#unidade_prod_create').val();
            var desc_prod = $('#desc_prod_create').val();


            if (nome_prod) {
                document.getElementById('nome_prod_create').style.boxShadow = "0px 0px";
            } else {
                document.getElementById('nome_prod_create').style.boxShadow =
                    "0 0 0 .2rem rgba(255,0,0,.25)";
            }

            if (marca_prod) {
                document.getElementById('marca_prod_create').style.boxShadow = "0px 0px";
            } else {
                document.getElementById('marca_prod_create').style.boxShadow =
                    "0 0 0 .2rem rgba(255,0,0,.25)";
            }

            if (grupo_prod) {
                document.getElementById('grupo_prod_create').style.boxShadow = "0px 0px";
            } else {
                document.getElementById('grupo_prod_create').style.boxShadow =
                    "0 0 0 .2rem rgba(255,0,0,.25)";
            }

            if (custo_prod && isFloat(custo_prod)) {
                document.getElementById('custo_prod_create').style.boxShadow = "0px 0px";
            } else {
                document.getElementById('custo_prod_create').style.boxShadow =
                    "0 0 0 .2rem rgba(255,0,0,.25)";
            }

            if (margem_prod && isFloat(margem_prod)) {
                document.getElementById('margem_prod_create').style.boxShadow = "0px 0px";
            } else {
                document.getElementById('margem_prod_create').style.boxShadow =
                    "0 0 0 .2rem rgba(255,0,0,.25)";
            }

            if (preco_prod && isFloat(preco_prod)) {
                document.getElementById('preco_prod_create').style.boxShadow = "0px 0px";
            } else {
                document.getElementById('preco_prod_create').style.boxShadow =
                    "0 0 0 .2rem rgba(255,0,0,.25)";
            }

            if (unidade_prod && unidade_prod != 'Escolha...') {
                document.getElementById('unidade_prod_create').style.boxShadow = "0px 0px";
            } else {
                document.getElementById('unidade_prod_create').style.boxShadow =
                    "0 0 0 .2rem rgba(255,0,0,.25)";
            }






            var form_ok = false;
            //var custo_prod_float = real_to_double(custo_prod);



            if (nome_prod && marca_prod && grupo_prod && custo_prod && margem_prod && preco_prod &&
                (unidade_prod != 'Escolha...')) {
                alert('form_valido');
            }

            //   

            //$('#modal_create_product').modal('hide');

        });





        $("#btn_delete_product").click(function() {

            //form exclusao pega nome modificado do form de edição


            $('#modal_edit_product').modal('hide');

            var id_prod = $('#id_prod').val();




            $.ajax({

                url: '../controller/read_product.php',
                method: 'post',
                data: {
                    id_prod1: id_prod
                },
                success: function(data) {

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























        var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla",
            "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan",
            "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
            "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil",
            "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia",
            "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad",
            "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia",
            "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
            "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea",
            "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France",
            "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
            "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea",
            "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India",
            "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan",
            "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos",
            "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
            "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
            "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco",
            "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro",
            "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua",
            "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama",
            "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico",
            "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa",
            "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
            "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
            "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts &amp; Nevis",
            "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria",
            "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga",
            "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Tuvalu",
            "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America",
            "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
            "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"
        ];


        function autocomplete(inp, arr) {
            /*the autocomplete function takes two arguments,
            the text field element and an array of possible autocompleted values:*/
            var currentFocus;
            /*execute a function when someone writes in the text field:*/
            inp.addEventListener("input", function(e) {
                var a, b, i, val = this.value;
                /*close any already open lists of autocompleted values*/
                closeAllLists();
                if (!val) {
                    return false;
                }
                currentFocus = -1;
                /*create a DIV element that will contain the items (values):*/
                a = document.createElement("DIV");
                a.setAttribute("id", this.id + "autocomplete-list");
                a.setAttribute("class", "autocomplete-items");
                /*append the DIV element as a child of the autocomplete container:*/
                this.parentNode.appendChild(a);
                /*for each item in the array...*/
                for (i = 0; i < arr.length; i++) {
                    /*check if the item starts with the same letters as the text field value:*/
                    if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                        /*create a DIV element for each matching element:*/
                        b = document.createElement("DIV");
                        /*make the matching letters bold:*/
                        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                        b.innerHTML += arr[i].substr(val.length);
                        /*insert a input field that will hold the current array item's value:*/
                        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                        /*execute a function when someone clicks on the item value (DIV element):*/
                        b.addEventListener("click", function(e) {
                            /*insert the value for the autocomplete text field:*/
                            inp.value = this.getElementsByTagName("input")[0].value;
                            /*close the list of autocompleted values,
                            (or any other open lists of autocompleted values:*/
                            closeAllLists();
                        });
                        a.appendChild(b);
                    }
                }
            });
            /*execute a function presses a key on the keyboard:*/
            inp.addEventListener("keydown", function(e) {
                var x = document.getElementById(this.id + "autocomplete-list");
                if (x) x = x.getElementsByTagName("div");
                if (e.keyCode == 40) {
                    /*If the arrow DOWN key is pressed,
                    increase the currentFocus variable:*/
                    currentFocus++;
                    /*and and make the current item more visible:*/
                    addActive(x);
                } else if (e.keyCode == 38) { //up
                    /*If the arrow UP key is pressed,
                    decrease the currentFocus variable:*/
                    currentFocus--;
                    /*and and make the current item more visible:*/
                    addActive(x);
                } else if (e.keyCode == 13) {
                    /*If the ENTER key is pressed, prevent the form from being submitted,*/
                    e.preventDefault();
                    if (currentFocus > -1) {
                        /*and simulate a click on the "active" item:*/
                        if (x) x[currentFocus].click();
                    }
                }
            });

            function addActive(x) {
                /*a function to classify an item as "active":*/
                if (!x) return false;
                /*start by removing the "active" class on all items:*/
                removeActive(x);
                if (currentFocus >= x.length) currentFocus = 0;
                if (currentFocus < 0) currentFocus = (x.length - 1);
                /*add class "autocomplete-active":*/
                x[currentFocus].classList.add("autocomplete-active");
            }

            function removeActive(x) {
                /*a function to remove the "active" class from all autocomplete items:*/
                for (var i = 0; i < x.length; i++) {
                    x[i].classList.remove("autocomplete-active");
                }
            }

            function closeAllLists(elmnt) {
                /*close all autocomplete lists in the document,
                except the one passed as an argument:*/
                var x = document.getElementsByClassName("autocomplete-items");
                for (var i = 0; i < x.length; i++) {
                    if (elmnt != x[i] && elmnt != inp) {
                        x[i].parentNode.removeChild(x[i]);
                    }
                }
            }
            /*execute a function when someone clicks in the document:*/
            document.addEventListener("click", function(e) {
                closeAllLists(e.target);
            });
        }



        //autocomplete(document.getElementById("marca_prod_create"), countries);
        //https://www.w3schools.com/howto/howto_js_autocomplete.asp







        $("#custo_prod").keyup(function() {

            var string_custo_prod = $("#custo_prod").val().toString();

            var x = string_custo_prod.length;
            var simbolo_decimal = string_custo_prod.substring(x - 3, x);
            //var have_comma = string_custo_prod.includes(",");
            //var have_dot = string_custo_prod.includes(".");


            // var simbolo_decimal = string_custo_prod.charAt(x - 3);

            var custo_prod = real_to_double($("#custo_prod").val());
            //alert ("Custo_prod: " + custo_prod + "custoi prod val" + $("#custo_prod").val());

            // está ignorando a casa decimal










            var margem_prod = $("#margem_prod").val();
            var preco_prod = custo_prod * ((margem_prod / 100) + 1);


            var custo_prod_real = double_to_real(parseFloat(custo_prod));
            var custo_prod_double = real_to_double(custo_prod);
            var custo_prod_real2 = double_to_real(parseFloat(custo_prod_double));

            //echo(custo_prod);

            //alert(custo_prod_real + " Double: " + custo_prod_double + " Segunda conversão" + custo_prod_real2);
            //cursor p/ esquerda
            //$("#preco_prod").val(double_to_real(preco_prod));

            //$("#custo_prod").val(double_to_real(parseFloat(custo_prod)));

            isNaN(preco_prod) ? $("#preco_prod").val('0,00') : $(
                "#preco_prod").val(double_to_real(preco_prod));

            isNaN(custo_prod) ? $("#custo_prod").val('0,00') : $(
                "#custo_prod").val(double_to_real(parseFloat(custo_prod)));



        });

        $("#margem_prod").keyup(function() {

            var string_custo_prod = $("#custo_prod").val().toString();

            var x = string_custo_prod.length;
            var simbolo_decimal = string_custo_prod.substring(x - 3, x);

            //var have_comma = string_custo_prod.includes(",");
            //var have_dot = string_custo_prod.includes(".");

            var custo_prod = real_to_double($("#custo_prod").val());
            var margem_prod = $("#margem_prod").val();
            var preco_prod = custo_prod * ((margem_prod / 100) + 1);
            var custo_prod_real = double_to_real(parseFloat(custo_prod));
            var custo_prod_double = real_to_double(custo_prod);
            var custo_prod_real2 = double_to_real(parseFloat(custo_prod_double));


            //$("#preco_prod").val(double_to_real(preco_prod));
            //$("#margem_prod").val(parseInt(margem_prod));
            isNaN(margem_prod) || margem_prod == '' ? $("#margem_prod").val('0') : $(
                "#margem_prod").val(parseInt(margem_prod));

            isNaN(preco_prod) ? $("#preco_prod").val('0,00') : $(
                "#preco_prod").val(double_to_real(preco_prod));


            //$("#custo_prod").val(double_to_real(parseFloat(custo_prod)));
        });


        $("#preco_prod").keyup(function() {



            var custo_prod = real_to_double($("#custo_prod").val());
            var margem_prod = $("#margem_prod").val();
            var preco_prod = $("#preco_prod").val();

            var preco_prod_double = real_to_double(preco_prod);
            var custo_prod_double = real_to_double(custo_prod);
            var preco_prod_real2 = double_to_real(parseFloat(preco_prod_double));
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








        $("#custo_prod_create").keyup(function() {

            var string_custo_prod = $("#custo_prod_create").val().toString();

            var x = string_custo_prod.length;
            var simbolo_decimal = string_custo_prod.substring(x - 3, x);
            //var have_comma = string_custo_prod.includes(",");
            //var have_dot = string_custo_prod.includes(".");


            // var simbolo_decimal = string_custo_prod.charAt(x - 3);

            var custo_prod = real_to_double($("#custo_prod_create").val());
            //alert ("Custo_prod: " + custo_prod + "custoi prod val" + $("#custo_prod").val());

            // está ignorando a casa decimal










            var margem_prod = $("#margem_prod_create").val();
            var preco_prod = custo_prod * ((margem_prod / 100) + 1);


            var custo_prod_real = double_to_real(parseFloat(custo_prod));
            var custo_prod_double = real_to_double(custo_prod);
            var custo_prod_real2 = double_to_real(parseFloat(custo_prod_double));

            //echo(custo_prod);

            //alert(custo_prod_real + " Double: " + custo_prod_double + " Segunda conversão" + custo_prod_real2);
            //cursor p/ esquerda
            //$("#preco_prod_create").val(double_to_real(preco_prod));

            //$("#custo_prod_create").val(double_to_real(parseFloat(custo_prod)));

            isNaN(preco_prod) ? $("#preco_prod_create").val('0,00') : $(
                "#preco_prod_create").val(double_to_real(preco_prod));

            isNaN(custo_prod) ? $("#custo_prod_create").val('0,00') : $(
                "#custo_prod_create").val(double_to_real(parseFloat(custo_prod)));



        });

        $("#margem_prod_create").keyup(function() {

            var string_custo_prod = $("#custo_prod_create").val().toString();

            var x = string_custo_prod.length;
            var simbolo_decimal = string_custo_prod.substring(x - 3, x);

            //var have_comma = string_custo_prod.includes(",");
            //var have_dot = string_custo_prod.includes(".");

            var custo_prod = real_to_double($("#custo_prod_create").val());
            var margem_prod = $("#margem_prod_create").val();
            var preco_prod = custo_prod * ((margem_prod / 100) + 1);
            var custo_prod_real = double_to_real(parseFloat(custo_prod));
            var custo_prod_double = real_to_double(custo_prod);
            var custo_prod_real2 = double_to_real(parseFloat(custo_prod_double));


            //$("#preco_prod_create").val(double_to_real(preco_prod));
            //$("#margem_prod_create").val(parseInt(margem_prod));
            isNaN(margem_prod) || margem_prod == '' ? $("#margem_prod_create").val('0') : $(
                "#margem_prod_create").val(parseInt(margem_prod));

            isNaN(preco_prod) ? $("#preco_prod_create").val('0,00') : $(
                "#preco_prod_create").val(double_to_real(preco_prod));


            //$("#custo_prod_create").val(double_to_real(parseFloat(custo_prod)));
        });


        $("#preco_prod_create").keyup(function() {



            var custo_prod = real_to_double($("#custo_prod_create").val());
            var margem_prod = $("#margem_prod_create").val();
            var preco_prod = $("#preco_prod_create").val();

            var preco_prod_double = real_to_double(preco_prod);
            var custo_prod_double = real_to_double(custo_prod);
            var preco_prod_real2 = double_to_real(parseFloat(preco_prod_double));
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
    </script>




</head>

<body>
















    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">

            <h1 class="logo">Serv<span class="x_logo">X</span></h1>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">

                    <li class="nav-item">
                        <a class="nav-link" href="../../index.php">Início<span class="sr-only">(current)</span></a>
                    </li>


                    <li class="nav-item">
                        <a class="nav-link" href="#" role="button">OS</a>
                    </li>


                    <li class="nav-item">
                        <a class="nav-link" href="#" role="button">Clientes</a>
                    </li>


                    <li class="nav-item active">
                        <a class="nav-link" href="products.php" role="button">Produtos</a>
                    </li>


                    <li class="nav-item">
                        <a class="nav-link" href="#" role="button">Serviços</a>
                    </li>




                    <li class="nav-item">
                        <a class="nav-link" href="#" role="button">Técnicos</a>
                    </li>


                    <li class="nav-item">
                        <a class="nav-link" href="#" role="button">Usuários</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#">Sair<span class="sr-only">(current)</span></a>
                    </li>





                </ul>

            </div>
        </div>
    </nav>




    <div class="container">


        <div class="row">
            <div class="col-md-12">
                <h1 class="panel_title">Produtos</h1>

            </div>
        </div>
    </div>


    <div class="container">
        <div class="table_panel">



            <table id="list-products" class="display" style="width:100%">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Grupo</th>
                        <th>Marca</th>
                        <th>Custo</th>
                        <th>Margem</th>
                        <th>Preço</th>
                        <th>Unidade</th>

                    </tr>
                </thead>
                <tbody id="table_body"></tbody>
            </table>






        </div>
    </div>

    <!-- Modal Create Product -->

    <div class="modal" id="modal_create_product" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel" style="text-align: center;">Adicionar</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form autocomplete="off" id="form_create_product">
                        <div class="form-group">



                            <br />

                            <div class="row">
                                <div class="col-md-6"><label for="nome_prod">Nome </label><input id="nome_prod_create"
                                        name="nome_prod" type="text" class="form-control"></div>
                                <div class="col-md-3"><label for="marca_prod">Marca </label><input id="marca_prod_create"
                                        name="marca_prod" type="text" class="form-control"></div>
                                <div class="col-md-3"><label for="grupo_prod">Grupo </label><input id="grupo_prod_create"
                                        name="grupo_prod" type="text" class="form-control"></div>
                            </div>



                            <div class="row">
                                <div class="col-md-3"><label for="custo_prod">Custo (R$) </label><input value="0" style=""
                                        id="custo_prod_create" name="custo_prod" type="text" class="form-control"></div>
                                <div class="col-md-3"><label for="margem_prod">Margem (%) </label><input value="50" id="margem_prod_create"
                                        name="margem_prod" type="text" class="form-control"></div>
                                <div class="col-md-3"> <label for="preco_prod">Preço (R$) </label><input value="0" id="preco_prod_create"
                                        name="preco_prod" type="text" class="form-control"></div>
                                <div class="col-md-3"> <label for="unidade_prod">Unidade</label>
                                    <select id="unidade_prod_create" name="unidade_prod" class="form-control">
                                        <option selected>Escolha...</option>
                                        <option value="Pç.">Pç.</option>
                                        <option value="m">m</option>
                                        <option value="Pct.">Pct.</option>
                                        <option value="Cx.">Cx.</option>
                                    </select></div>
                            </div>


                            <div class="row">
                                <div class="col-md-12"><label for="desc_prod">Descrição </label><textarea rows="3" name="desc_prod"
                                        id="desc_prod_create" cols="30" rows="10" class="form-control"></textarea></div>
                            </div>







                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" data-dismiss="modal" class="btn btn-danger mr-auto" id="btn_exit_create_product">Sair</button>
                    <button type="button" class="btn btn-primary" id="btn_create_product">Salvar</button>
                </div>
            </div>
        </div>
    </div>


    <!-- /Modal Create Product -->


    <!-- Modal Edit Product -->


    <div class="modal" id="modal_edit_product" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel" style="text-align: center;">Editar</h5>
                    <button type="button" class="close" id="btn_close_product_edition" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="form_edit_product">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-2"><label for="id_prod">ID </label><input id="id_prod" name="id_prod"
                                        type="text" class="form-control" style="pointer-events: none;" readonly></div>
                                <div class="col-md-10"></div>
                            </div>

                            <div class="row">
                                <div class="col-md-6"><label for="nome_prod">Nome </label><input id="nome_prod" name="nome_prod"
                                        type="text" class="form-control"></div>
                                <div class="col-md-3"><label for="marca_prod">Marca </label><input id="marca_prod" name="marca_prod"
                                        type="text" class="form-control"></div>
                                <div class="col-md-3"><label for="grupo_prod">Grupo </label><input id="grupo_prod" name="grupo_prod"
                                        type="text" class="form-control"></div>
                            </div>



                            <div class="row">
                                <div class="col-md-3"><label for="custo_prod">Custo (R$) </label><input style="" id="custo_prod"
                                        name="custo_prod" type="text" class="form-control"></div>
                                <div class="col-md-3"><label for="margem_prod">Margem (%) </label><input id="margem_prod"
                                        name="margem_prod" type="text" class="form-control"></div>
                                <div class="col-md-3"> <label for="preco_prod">Preço (R$) </label><input id="preco_prod"
                                        name="preco_prod" type="text" class="form-control"></div>
                                <div class="col-md-3"> <label for="unidade_prod">Unidade</label>
                                    <select id="unidade_prod" name="unidade_prod" class="form-control">
                                        <option selected>Escolha...</option>
                                        <option value="Pç.">Pç.</option>
                                        <option value="m">m</option>
                                        <option value="Pct.">Pct.</option>
                                        <option value="Cx.">Cx.</option>
                                    </select></div>
                            </div>


                            <div class="row">
                                <div class="col-md-12"><label for="desc_prod">Descrição </label><textarea rows="3" name="desc_prod"
                                        id="desc_prod" cols="30" rows="10" class="form-control"></textarea></div>
                            </div>







                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger mr-auto" id="btn_delete_product">Excluir</button>
                    <button type="button" class="btn btn-primary" id="btn_update_product">Salvar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- /Modal Edit Product -->



    <div class="modal" tabindex="-1" role="dialog" id="modal_confirm_delete">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Excluir Produto</h5>
                    <button type="button" class="close btn_cancel_product_deletion" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="txt_delete_product">Tem certeza que deseja excluir o produto?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" id="btn_confirm_product_deletion">Excluir</button>
                    <button type="button" class="btn btn-primary btn_cancel_product_deletion" data-dismiss="modal">Voltar</button>
                </div>
            </div>
        </div>
    </div>



    <div class="modal" tabindex="-1" role="dialog" id="modal_confirm_update_product">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Salvar Alterações</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="txt_update_product">Deseja salvar as alterações?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" id="btn_confirm_product_update">Salvar</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Sair</button>
                </div>
            </div>
        </div>
    </div>


    <div class="modal" tabindex="-1" role="dialog" id="modal_update_product_success_message">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Alterações Salvas</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="txt_update_product">Produto atualizado com sucesso!</p>
                </div>
                <div class="modal-footer">

                    <button type="button" class="btn btn-primary" data-dismiss="modal">Sair</button>
                </div>
            </div>
        </div>
    </div>





    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k"
        crossorigin="anonymous"></script>




</body>

</html>