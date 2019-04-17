<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h1 class="panel_title">OS - 16</h1>
        </div>
    </div>
</div>


<div class="container">
    <form id="form_update_customer" method="post">
        <div class="form-group">
            <div class="row">
                <div class="col-md-4"><label id="label_customer_name" for="customer_name">Cliente
                    </label><input id="customer_name" name="customer_name" type="text" class="form-control uppercase"
                        autocomplete="off" required></div>

                <div class="col-md-2"><label id="label_customer_cpf" for="customer_cpf">CPF
                    </label><input id="customer_cpf" name="customer_cpf" type="text" class="form-control"></div>

                <div class="col-md-2"><label id="label_customer_rg" for="customer_rg">RG </label><input id="customer_rg"
                        name="customer_rg" type="text" class="form-control">
                </div>

                <div class="col-md-2"><label for="customer_telephone">Telefone
                    </label><input id="customer_telephone" name="customer_telephone" type="tel" class="form-control"
                        required></div>
                <div class="col-md-2"><label for="customer_cellphone">Celular
                    </label><input id="customer_cellphone" name="customer_cellphone" type="tel" class="form-control">
                </div>
            </div>
            <div class="row">
                <!-- <div class="col-md-4"><label for="customer_email">E-mail </label><input id="customer_email"
                        name="customer_email" type="email" class="form-control uppercase" autocomplete="off">
                </div>
                <div class="col-md-3"><label for="customer_natural_legal">Tipo </label><select
                        id="customer_natural_legal" name="customer_natural_legal" class="form-control">
                        <option>PESSOA FÍSICA</option>
                        <option>PESSOA JURÍDICA</option>
                    </select></div> -->


                <div class="col-md-5"><label for="customer_address">Endereço
                    </label><input id="customer_address" name="customer_address" type="text"
                        class="form-control uppercase" autocomplete="off" required></div>
                <div class="col-md-3"><label for="customer_zone">Bairro </label><input id="customer_zone"
                        name="customer_zone" type="text" class="form-control uppercase" autocomplete="off" required>
                </div>
                <div class="col-md-2"><label for="customer_address_type">Tipo</label><input id="customer_address_type"
                        name="customer_address_type" type="text" class="form-control">
                </div>

                <div class="col-md-2"><label for="customer_cep">CEP </label><input id="customer_cep" name="customer_cep"
                        type="text" class="form-control">
                </div>


            </div>

            <div class="row">
                <div class="col-md-12"><label for="os_description">Reclamação </label><textarea rows="1"
                        name="os_description" id="os_description" cols="30" rows="10" class="form-control uppercase"
                        autocomplete="off"></textarea></div>
            </div>
            <div class="row">
                <div class="col-md-12"><label for="os_solution">Solução </label><textarea rows="1" name="os_solution"
                        id="os_solution" cols="30" rows="10" class="form-control uppercase"
                        autocomplete="off"></textarea></div>
            </div>


            <div class="row">
                <div class="col-md-12">
                    <h3>Produtos</h3>
                </div>
            </div>


            <div class="row">
                <div class="col-md-12">


                    <table id="list-os-products" class="display" style="width:100%">
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>UNID.</th>
                                <th>QUANT.</th>
                                <th>PREÇO UNIT. (R$)</th>
                                <th>PREÇO TOTAL (R$)</th>
                            </tr>
                        </thead>
                        <tbody id="table-body_list-os-products"></tbody>
                    </table>


                </div>
            </div>


        </div>
    </form>
</div>