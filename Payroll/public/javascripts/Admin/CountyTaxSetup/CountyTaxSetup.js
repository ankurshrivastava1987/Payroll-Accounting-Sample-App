app.page("CountyTaxSetup", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnCountyTaxSetupId').val(params);
            $('.page-head').html("Edit County Tax Setup");
            DisplayData();
            FillCountyTaxSetupDetail();
        }       
    }
});
$('#txtEffectiveDate').val(FormatJSDate(new Date(), 'mm/dd/yy'));
$('#txtEffectiveDate').datepicker({
    format: 'mm/dd/yyyy',
    orientation: 'bottom',
    autoclose: true,
    todayHighlight: true
});
function FillStates() {
    var params = {};
    CallService('Admin/StateService.svc', 'GetLookup', params, OnStateGetLookupSuccess, false);
}

function OnStateGetLookupSuccess(States) {
    var html = '<option value="0"></option>';
    if (States != undefined) {
        for (var i = 0; i < States.length; i++) {
            html += '<option value="' + States[i]['StateId'] + '">' + States[i]['StateName'] + '</option>';
        }
    }
    $('#cmbStateName').append(html);
    $('#cmbStateName').val("0");
}
$("#cmbStateName").change(function () {
    var params = { StateId: $("#cmbStateName").val() };
    var Counties = CallService1('Admin/CountyService.svc', 'GetLookup', params);
    var html = '';
    for (var i = 0; i < Counties.length; i++) {
        html += '<tr id="' + Counties[i].CountyId + '">';
        html += '<td>' + Counties[i].CountyName + '</td>';
        html += '<td style="text-align:right"><input class="form-control decimal3 text-right a" style="width:150px;" value="0.00"></input></td>';        
        html += '</tr>';
    }
    $('#bodyCountyTaxSetupDetails').html(html); 
    SetKeyPress();
});

FillStates();

function DisplayData() {    
    var params = { CountyTaxSetupId: parseInt($('#hdnCountyTaxSetupId').val(), 10) };
    CallService('Admin/CountyTaxSetupService.svc', 'GetObject', params, OnCountyTaxSetupGetObjectSuccess, true);    
}
function OnCountyTaxSetupGetObjectSuccess(dtoCountyTaxSetup) {
    if (dtoCountyTaxSetup.CountyTaxSetupId != undefined) {
        $('#cmbStateName').val(dtoCountyTaxSetup.StateId);
        $('#cmbStateName').change();
        $('#txtEffectiveDate').val(FormatDateUTC(dtoCountyTaxSetup.EffectiveDate));
    }
    else {
        window.location = "/Admin/Main.html#ViewAllCountyTaxSetups";
    }    
}

function FillCountyTaxSetupDetail() {
    var params = { CountyTaxSetupId: parseInt($('#hdnCountyTaxSetupId').val(), 10)};
    CallService('Admin/CountyTaxSetupService.svc', 'GetCountyTaxSetupDetail', params, OnGetCountyTaxSetupDetailSuccess, true);
}

function OnGetCountyTaxSetupDetailSuccess(response) {   
    $.each(response, function () {
        $('#' + this.CountyId).find('.a').val((this.TaxRate === null ? 0 : this.TaxRate).toFixed(9));        
    });
}

$.validator.addMethod(
    "Required1",
    function (value, element) {
        return ($('#cmbStateName').val() === '0' ? false : true);
    },
    "State is required"
);
var form = $("#frmEntry");
var valid = form.validate({
   
    /* @validation Countys + elements
         ------------------------------------------- */

    errorClass: 'error-view',
    validClass: 'success-view',
    errorElement: 'span',
    
    /* @validation rules
         ------------------------------------------ */
    rules: {
        cmbStateName: {
            Required1: true
        },
        txtEffectiveDate: {
            required:true
        }            
    },
    messages: {
        txtEffectiveDate: {
            required:'Effective Date is required'
        }
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
function Save() {
    if (form.valid()) {
        var CountyTaxSetupDetails = '';
        $('#bodyCountyTaxSetupDetails > tr').each(function () {
            var $this = $(this);
            CountyTaxSetupDetails += $this.attr('id') + String.fromCharCode(134) + $this.find('.a').val() + String.fromCharCode(135);
        });
        if (CountyTaxSetupDetails != '') {
            CountyTaxSetupDetails = CountyTaxSetupDetails.substring(0, CountyTaxSetupDetails.length - 1);
        }           
        var params = { CountyTaxSetupId: parseInt($("#hdnCountyTaxSetupId").val(), 10), StateId: parseInt($("#cmbStateName").val(), 10), EffectiveDate: $("#txtEffectiveDate").val(), CountyTaxSetupDetails: CountyTaxSetupDetails };
        CallService('Admin/CountyTaxSetupService.svc', 'Save', params, OnCountyTaxSetupSaveSuccess, false);
    }
};

function OnCountyTaxSetupSaveSuccess(CountyTaxSetupId) {
    if (CountyTaxSetupId > 0) {
        window.location = "/Admin/Main.html#ViewAllCountyTaxSetups";
    }
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllCountyTaxSetups";
}
function SetKeyPress() {
    $('.decimal3').keypress(function (event) {
        return isNumber(event, this)
    }).bind('blur', function () {
        var num;
        
        num = parseFloat($(this).val());
        
        num = isNaN(num) ? '0.00' : num;
        if (num && num < 0) num = num * -1;
        $(this).val(parseFloat(num));
    });
}

var CurrentStepIndex = 1;
function StepClick(index) {
    CurrentStepIndex = index;
    CommandManager();
}
function CommandManager() {
    if (CurrentStepIndex == 1) {
        $('#liStep1').addClass('completed');
        $('#liStep2').removeClass('completed');

        $('#divStep1').removeClass('hide');
        $('#divStep2').addClass('hide');

        $("#btnBack").attr('disabled', 'disabled');
        $("#btnNext").removeAttr('disabled');
    }
    else if (CurrentStepIndex == 2) {
        $('#liStep1').addClass('completed');
        $('#liStep2').addClass('completed');

        $('#divStep1').addClass('hide');
        $('#divStep2').removeClass('hide');

        $("#btnBack").removeAttr('disabled');
        $("#btnNext").attr('disabled', 'disabled');
    }
}
$("#btnBack").click(function (e) {
    CurrentStepIndex = CurrentStepIndex - 1
    CommandManager();
});
$("#btnNext").click(function (e) {
    CurrentStepIndex = CurrentStepIndex + 1
    CommandManager();
});