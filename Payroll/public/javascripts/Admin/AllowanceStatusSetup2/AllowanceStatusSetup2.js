app.page("AllowanceStatusSetup2", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnAllowanceStatusSetupId').val(params);
            $('.page-head').html("Edit Allowance Status Setup 2");
            DisplayData();
            FillAllowanceStatusSetup2Detail();
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
var params = {};
var PayScheduleRecurrences = CallService1('Admin/PayScheduleRecurrenceService.svc', 'GetLookup', params);
var html = '';
for (var i = 0; i < PayScheduleRecurrences.length; i++)
{
    html += '<tr id="' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '">';
    html += '<td>' + PayScheduleRecurrences[i].PayScheduleRecurrenceName + '</td>';    
    html += '<td><input class="form-control decimal text-right a" style="width:100px;" value="0.00"></input></td>';    
    html += '</tr>';
}
$('#bodyAllowance').html(html);

function DisplayData() {    
    var params = { AllowanceStatusSetupId: parseInt($('#hdnAllowanceStatusSetupId').val(), 10) };
    CallService('Admin/AllowanceStatusSetup2Service.svc', 'GetObject', params, OnAllowanceStatusSetup2GetObjectSuccess, true);    
}
function OnAllowanceStatusSetup2GetObjectSuccess(dtoAllowanceStatusSetup2) {
    if (dtoAllowanceStatusSetup2.AllowanceStatusSetupId != undefined) {
        $('#cmbStateName').val(dtoAllowanceStatusSetup2.StateId);
        $('#txtEffectiveDate').val(FormatDateUTC(dtoAllowanceStatusSetup2.EffectiveDate));
    }
    else {
        window.location = "/Admin/Main.html#ViewAllAllowanceStatusSetup2s";
    }    
}

function FillAllowanceStatusSetup2Detail() {
    var params = { AllowanceStatusSetupId: parseInt($('#hdnAllowanceStatusSetupId').val(), 10) };
    CallService('Admin/AllowanceStatusSetup2Service.svc', 'GetAllowanceStatusSetup2Detail', params, OnGetAllowanceStatusSetup2DetailSuccess, true);
}

function OnGetAllowanceStatusSetup2DetailSuccess(response) {        
    for (var i = 0; i < response.length; i++)
    {        
        $('#' + response[i].PayScheduleRecurrenceId).find('.a').val(response[i].OneExemption.toFixed(2));            
    }
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
    
    /* @validation states + elements
         ------------------------------------------- */

    errorClass: 'error-view',
    validClass: 'success-view',
    errorElement: 'span',
    
    /* @validation rules
         ------------------------------------------ */
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
function Save() {
    if (form.valid()) {      
        var AllowanceStatusSetup2Details = '';
        $('#bodyAllowance > tr').each(function () {
            var $this = $(this);
            AllowanceStatusSetup2Details += $this.attr('id') + String.fromCharCode(134) + $this.find('.a').val() + String.fromCharCode(135);           
        });
        if (AllowanceStatusSetup2Details != '')
        {
            AllowanceStatusSetup2Details = AllowanceStatusSetup2Details.substring(0, AllowanceStatusSetup2Details.length - 1);
        }       
        var params = { AllowanceStatusSetupId: parseInt($("#hdnAllowanceStatusSetupId").val(), 10), StateId: parseInt($("#cmbStateName").val(), 10), EffectiveDate: $("#txtEffectiveDate").val(), AllowanceStatusSetup2Details: AllowanceStatusSetup2Details};
        CallService('Admin/AllowanceStatusSetup2Service.svc', 'Save', params, OnAllowanceStatusSetup2SaveSuccess, false);
    }
};

function OnAllowanceStatusSetup2SaveSuccess(AllowanceStatusSetupId) {
    if (AllowanceStatusSetupId > 0) {
        window.location = "/Admin/Main.html#ViewAllAllowanceStatusSetup2s";
    }
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllAllowanceStatusSetup2s";
}
$('.decimal').keypress(function (event) {
    return isNumber(event, this)
}).bind('blur', function () {
    var num;

    num = parseFloat($(this).val());

    num = isNaN(num) ? '0.00' : num;
    if (num && num < 0) num = num * -1;
    $(this).val(parseFloat(num).toFixed(2));
});

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