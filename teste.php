<div class="modal" id="modal_update_user" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" style="text-align: center;">Editar</h5>
                <button type="button" class="close" id="btn_close_user_update" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="form_update_user">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-2"><label for="user_id">ID </label><input id="user_id" name="user_id"
                                    type="text" class="form-control" style="pointer-events: none;" readonly></div>
                            <div class="col-md-10"></div>
                        </div>
                        <div class="row">
                            <div class="col-md-12"><label for="user_profile">Nome
                                </label><input id="user_profile" name="user_profile" type="text" class="form-control"
                                    autocomplete="off" required>
                            </div>

                        </div>

                        <div class="row">

                            <div class="col-md-4"><label for="user_password">Tempo Estimado(Min)
                                </label><input id="user_password" name="user_password" type="text" class="form-control">
                            </div>
                            <div class="col-md-4"><label for="user_profile"><br />Preço/Min(R$) </label><input
                                    id="user_profile" name="user_profile" type="text" class="form-control">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger mr-auto" id="btn_delete_user">Excluir</button>
                <button type="submit" form="form_update_user" class="btn btn-primary"
                    id="btn_update_user">Salvar</button>
            </div>
        </div>
    </div>
</div>