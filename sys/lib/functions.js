function selectAllText(textbox) {
    textbox.focus();
    textbox.select();
}

function isFloat(n) {
    return parseFloat(n) == n && n != 0;
}

function float_to_brl(n) {
    return n.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
}

function brl_to_float(n) {

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

function enter_to_send_form(id_form, id_button) {
    document.getElementById(id_form).onkeydown = function (evt) {
        var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
        if (keyCode == 13) {
            $("#" + id_button).click();
        }
    }
}
