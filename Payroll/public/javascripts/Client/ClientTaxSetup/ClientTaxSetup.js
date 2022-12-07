CheckPageRequest();
app.page("ClientTaxSetup", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnClientTaxSetupId').val(params);
            $('.page-head').html("Edit Client Tax Setup");
            var params = { ClientId: $.localStorage.get('ClientId'), ClientTaxSetupId: parseInt($('#hdnClientTaxSetupId').val(), 10) };
            var dtoClientTaxSetup = CallService1('Client/ClientTaxSetupService.svc', 'GetObject', params);
            if (dtoClientTaxSetup.ClientTaxSetupId != undefined) {
                $('#txtEffectiveDate').val(FormatDateUTC(dtoClientTaxSetup.EffectiveDate));
                $('#cmbStateName').val(dtoClientTaxSetup.StateId);
                $('#txtSUITaxEmployer').val(dtoClientTaxSetup.SUITaxEmployer.toFixed(6));
                $('#txtMinLimit').val(accounting.formatMoney(dtoClientTaxSetup.MinLimit));
                $('#txtMaxLimit').val(accounting.formatMoney(dtoClientTaxSetup.MaxLimit));
            }
            else {
                window.location = "/Client/Main.html#ViewAllClientTaxSetups";
            }
        }
    }
}); 



$("#txtEffectiveDate").focus();
$('#txtEffectiveDate').val(FormatJSDate(new Date(), 'mm/dd/yy'));
$('#txtEffectiveDate').datepicker({
    format: 'mm/dd/yyyy',
    orientation: 'bottom',
    autoclose: true,
    todayHighlight: true
});

$.validator.addMethod(
    "Required1",
    function (value, element) {

        return ($('#cmbStateName').val() == '0' ? false : true);
    },
    "State is required"
);
var form = $("#frmEntry");
var valid = form.validate({

    /* @validation states + elements
         ------------------------------------------- */

    errorClass: 'error-view',
    validClass: 'success-view',
    errorElement: 'span',

    /* @validation rules
         ------------------------------------------ */
    ignore: "",
    rules: {       
        cmbStateName: {
            Required1: true
        }
    },
    messages: {
      
    },
    highlight: function (element, errorClass, validClass) {
        $(element).closest('.input').removeClass(validClass).addClass(errorClass);
        if ($(element).is(':checkbox') || $(element).is(':radio')) {
            $(element).closest('.check').removeClass(validClass).addClass(errorClass);
        }
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).closest('.input').removeClass(errorClass).addClass(validClass);
        if ($(element).is(':checkbox') || $(element).is(':radio')) {
            $(element).closest('.check').removeClass(errorClass).addClass(validClass);
        }
    },
    errorPlacement: function (error, element) {
        if ($(element).is(':checkbox') || $(element).is(':radio')) {
            $(element).closest('.check').append(error);
        } else {
            $(element).closest('.unit').append(error);
        }
    }
});
function FillStates() {
    var params = {};
    CallService('Public/StateService.svc', 'GetLookup', params, OnStateGetLookupSuccess, false);
}

function OnStateGetLookupSuccess(states) {
    var html = '<option value="0"></option>';
    if (states != undefined) {
        for (var i = 0; i < states.length; i++) {
            html += '<option value="' + states[i]['StateId'] + '">' + states[i]['StateName'] + '</option>';
        }
    }
    $('#cmbStateName').append(html);
    $('#cmbStateName').val("0");
}
FillStates();

function Save() {
    if (form.valid()) {
        var params = { ClientTaxSetupId: parseInt($("#hdnClientTaxSetupId").val(), 10), ClientId: $.localStorage.get('ClientId'), EffectiveDate: $("#txtEffectiveDate").val(), StateId: $('#cmbStateName').val(), SUITaxEmployer: $("#txtSUITaxEmployer").val(), MinLimit: $("#txtMinLimit").val(), MaxLimit: $("#txtMaxLimit").val() };
        CallService('Client/ClientTaxSetupService.svc', 'Save', params, OnClientTaxSetupSaveSuccess, false);
    }
};

function OnClientTaxSetupSaveSuccess(ClientTaxSetupId) {
    if (ClientTaxSetupId > 0) {
        window.location = "/Client/Main.html#ViewAllClientTaxSetups";
    }
}

function Close() {
    window.location = "/Client/Main.html#ViewAllClientTaxSetups";
}
function FocusInFocusOut() {
    $('.textbox').off('focusout');
    $('.textbox').off('focusin');
    $('.textbox').focusout(function () {
        $(this).val(accounting.formatMoney($(this).val()));
    })
    $('.textbox').focusin(function () {
        $(this).val($(this).val().replace('$', '').replace(',', ''));
    })
}
FocusInFocusOut();
window.scrollTo(0, 0);