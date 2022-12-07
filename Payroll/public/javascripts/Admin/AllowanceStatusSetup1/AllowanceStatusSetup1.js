app.page("AllowanceStatusSetup1", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnAllowanceStatusSetupId').val(params);            
            $('.page-head').html("Edit Allowance Status Setup 1");
            DisplayData();
            FillAllowanceStatusSetup1Detail();
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
    html += '<td><input class="form-control decimal text-right b" style="width:100px;" value="0.00"></input></td>';
    html += '<td><input class="form-control decimal text-right c" style="width:100px;" value="0.00"></input></td>';
    html += '</tr>';
}
$('#bodyAllowance').html(html);

function DisplayData() {    
    var params = { AllowanceStatusSetupId: parseInt($('#hdnAllowanceStatusSetupId').val(), 10) };
    CallService('Admin/AllowanceStatusSetup1Service.svc', 'GetObject', params, OnAllowanceStatusSetup1GetObjectSuccess, true);    
}
function OnAllowanceStatusSetup1GetObjectSuccess(dtoAllowanceStatusSetup1) {
    if (dtoAllowanceStatusSetup1.AllowanceStatusSetupId != undefined) {
        $('#cmbStateName').val(dtoAllowanceStatusSetup1.StateId);
        $('#txtAllowancePercentage').val(dtoAllowanceStatusSetup1.AllowancePercentage.toFixed(2));
        $('#txtEffectiveDate').val(FormatDateUTC(dtoAllowanceStatusSetup1.EffectiveDate));
    }
    else {
        window.location = "/Admin/Main.html#ViewAllAllowanceStatusSetup1s";
    }   
}
function FillAllowanceStatusSetup1Detail() {
    var params = { AllowanceStatusSetupId: parseInt($('#hdnAllowanceStatusSetupId').val(), 10) };
    CallService('Admin/AllowanceStatusSetup1Service.svc', 'GetAllowanceStatusSetup1Detail', params, OnGetAllowanceStatusSetup1DetailSuccess, true);
}

function OnGetAllowanceStatusSetup1DetailSuccess(response) {        
    for (var i = 0; i < response.length; i++)
    {        
        $('#' + response[i].PayScheduleRecurrenceId).find('.a').val(response[i].OneExemption.toFixed(2));
        $('#' + response[i].PayScheduleRecurrenceId).find('.b').val(response[i].MinimumStandardDeduction.toFixed(2));
        $('#' + response[i].PayScheduleRecurrenceId).find('.c').val(response[i].MaximumStandardDeduction.toFixed(2));       
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
        var AllowanceStatusSetup1Details = '';
        $('#bodyAllowance > tr').each(function () {
            var $this = $(this);
            AllowanceStatusSetup1Details += $this.attr('id') + String.fromCharCode(134) + $this.find('.a').val() + String.fromCharCode(134) + $this.find('.b').val() + String.fromCharCode(134) + $this.find('.c').val() + String.fromCharCode(135);           
        });
        if (AllowanceStatusSetup1Details != '')
        {
            AllowanceStatusSetup1Details = AllowanceStatusSetup1Details.substring(0, AllowanceStatusSetup1Details.length - 1);
        }       
        var params = { AllowanceStatusSetupId: parseInt($("#hdnAllowanceStatusSetupId").val(), 10), StateId: parseInt($("#cmbStateName").val(), 10), AllowancePercentage: $("#txtAllowancePercentage").val(), EffectiveDate: $("#txtEffectiveDate").val(), AllowanceStatusSetup1Details: AllowanceStatusSetup1Details};
        CallService('Admin/AllowanceStatusSetup1Service.svc', 'Save', params, OnAllowanceStatusSetup1SaveSuccess, false);
    }
};

function OnAllowanceStatusSetup1SaveSuccess(AllowanceStatusSetupId) {
    if (AllowanceStatusSetupId > 0) {
        window.location = "/Admin/Main.html#ViewAllAllowanceStatusSetup1s";
    }
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllAllowanceStatusSetup1s";
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