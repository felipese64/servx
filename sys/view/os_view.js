//----------------------------------------------DATATABLE---------------------------------------------------------

$(document).ready(function () {
    var table = $('#list-os').DataTable({
        "processing": true,
        "serverSide": true,
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
        },
        "initComplete": function (settings, json) {
            add_button_create_os();
        },

        "ajax": {
            "url": "../controller/os/datatable.php",
            "type": "POST"
        }
    });

    function add_button_create_os() {

        $('#list-os_filter').prepend(
            '<button type="button" class="btn btn-primary btn_open_create_modal" id="btn_open_create_os_modal">Abrir OS</button>'
        );



        $('#btn_open_create_os_modal').click(function () {

            $("#os_view_content").load("os_select_customer_view.php", function () {
                load_select_customer_section();
            });
        });
    }



    //----------------------------------------------CREATE-----------------------------------------------------------


    function load_select_customer_section() {

        var table = $('#select-customer').DataTable({
            "processing": true,
            "serverSide": true,
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
            },
            "initComplete": function (settings, json) {
                add_button_exit_select_customer();
            },
            "ajax": {
                "url": "../controller/os/datatable_select_customer.php",
                "type": "POST"
            }
        });


        function add_button_exit_select_customer() {

            $('#select-customer_filter').prepend(
                '<button type="button" class="btn btn-primary" id="button_exit_select_customer">Voltar</button>'
            );

            $('#button_exit_select_customer').click(function () {

                window.location = "os_view.php";


            });


        }


        $('#table_body_select_customer').on('click', 'tr', function () {

            var data = table.row(this).data();
            var customer_id = data[0];



            alert('customer_id=' + customer_id)
            //agora cria uma os e preenche uma tela
            //como enviar o id? nao enviar. faz o request e so manda os dados

            // $.ajax({

            //     url: '../controller/customers/read_customer.php',
            //     method: 'post',
            //     data: {
            //         customer_id: customer_id
            //     },
            //     success: function (data) {

            //         insert_data_on_modal_update_customer(data);

            //         $('#modal_update_customer').modal('show');

            //     }
            // });
        });


    }



    //----------------------------------------------READ-------------------------------------------------------------

    $('#table_body').on('click', 'tr', function () {

        var data = table.row(this).data();
        var os_id = data[0];



        alert('os_id=' + os_id)

        // $.ajax({

        //     url: '../controller/customers/read_customer.php',
        //     method: 'post',
        //     data: {
        //         customer_id: customer_id
        //     },
        //     success: function (data) {

        //         insert_data_on_modal_update_customer(data);

        //         $('#modal_update_customer').modal('show');

        //     }
        // });
    });



















});


