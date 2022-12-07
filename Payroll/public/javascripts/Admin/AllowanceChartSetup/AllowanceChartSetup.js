app.page("AllowanceChartSetup", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnAllowanceChartSetupId').val(params);
            $('.page-head').html("Edit Allowance Chart Setup");
            DisplayData();
            FillAllowanceChartSetupDetails();
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

html = '<tr class="footable-odd">';
html += '<td>Frequency</td>';
html += '<td>Amount for one Allowance($)</td>';
html += '</tr>';
$('#tblAllowance thead').html(html);
html = '';
for (var i = 0; i < PayScheduleRecurrences.length; i++) {
    html += '<tr>';
    html += '<td>' + _.escape(PayScheduleRecurrences[i].PayScheduleRecurrenceName) + '</td>';    
    html += '<td><input id="C_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '" class="form-control decimal text-right c" style="width:150px;" value="0.00"></input></td>';    
    html += '</tr>';
}
$('#bodyAllowance').html(html);

function DisplayData() {    
    var params = { AllowanceChartSetupId: parseInt($('#hdnAllowanceChartSetupId').val(), 10) };
    CallService('Admin/AllowanceChartSetupService.svc', 'GetObject', params, OnAllowanceChartSetupGetObjectSuccess, true);    
}
function OnAllowanceChartSetupGetObjectSuccess(dtoAllowanceChartSetup) {
    if (dtoAllowanceChartSetup.AllowanceChartSetupId != undefined) {
        $('#cmbStateName').val(dtoAllowanceChartSetup.StateId);
        $('#txtEffectiveDate').val(FormatDateUTC(dtoAllowanceChartSetup.EffectiveDate));
    }
    else {
        window.location = "/Admin/Main.html#ViewAllAllowanceChartSetups";
    }    
}

function FillAllowanceChartSetupDetails() {
    var params = { AllowanceChartSetupId: parseInt($('#hdnAllowanceChartSetupId').val(), 10) };
    CallService('Admin/AllowanceChartSetupService.svc', 'GetAllowanceChartSetupDetail', params, OnGetAllowanceChartSetupDetailSuccess, true);
}

function OnGetAllowanceChartSetupDetailSuccess(response) {
    for (var i = 0; i < PayScheduleRecurrences.length; i++) {       
        for (var j = 0; j < response.length; j++) {
            if (PayScheduleRecurrences[i].PayScheduleRecurrenceId === response[j].PayScheduleRecurrenceId)  {
                $('#C_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId).val(response[j].Amount.toFixed(2));
            }
        }        
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
        var AllowanceChartSetupDetails = '';
        $('.c').each(function (index, data) {
            var arrC = $(this).attr('id').split('_');
            AllowanceChartSetupDetails += arrC[1] + String.fromCharCode(134) + $(this).val();
            if (index < $('.c').length - 1) {
                AllowanceChartSetupDetails += String.fromCharCode(135);
            }
        });
        var params = { AllowanceChartSetupId: parseInt($("#hdnAllowanceChartSetupId").val(), 10), StateId: parseInt($("#cmbStateName").val(), 10), EffectiveDate: $("#txtEffectiveDate").val(), AllowanceChartSetupDetails: AllowanceChartSetupDetails};
        CallService('Admin/AllowanceChartSetupService.svc', 'Save', params, OnAllowanceChartSetupSaveSuccess, false);
    }
};

function OnAllowanceChartSetupSaveSuccess(AllowanceChartSetupId) {
    if (AllowanceChartSetupId > 0) {
        window.location = "/Admin/Main.html#ViewAllAllowanceChartSetups";
    }
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllAllowanceChartSetups";
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