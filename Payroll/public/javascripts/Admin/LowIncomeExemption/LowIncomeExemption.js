app.page("LowIncomeExemption", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnLowIncomeExemptionId').val(params);
            $('.page-head').html("Edit Low Income Exemption");
            DisplayData();
            FillLowIncomeExemptionDetail();
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

var html = '';
html += '<tr class="footable-odd">';
html += '<td rowspan="2">Frequency</td>';
html += '<td rowspan="2">SINGLE PERSONS($)</td>';  
html += '<td rowspan="2">DUAL INCOME MARRIED($)</td>'; 
html += '<td rowspan="2">MARRIED WITH MULTIPLE EMPLOYERS($)</td>'; 
html += '<td colspan="2">MARRIED PERSONS</td>'; 
html += '<td rowspan="2">UNMARRIED/HEAD OF HOUSEHOLD($)</td>';
html += '</tr>';
html += '<tr class="footable-odd">';
html += '<td>0 OR 1($)</td>';
html += '<td>2 OR MORE($)</td>';
html += '</tr>';
$('#tblLowIncomeExemption thead').html(html);

var params = {};
var PayScheduleRecurrences = CallService1('Admin/PayScheduleRecurrenceService.svc', 'GetLookup', params);
html = '';
for (var i = 0; i < PayScheduleRecurrences.length; i++){
    html += '<tr id="' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '" class="a">';
    html += '<td>' + _.escape(PayScheduleRecurrences[i].PayScheduleRecurrenceName) + '</td>';
    html += '<td><input id="A_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_S" class="form-control decimal text-right s" style="width:90px;" value="0.00"></input></td>';
    html += '<td><input id="B_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_MJ" class="form-control decimal text-right mj" style="width:90px;" value="0.00"></input></td>';
    html += '<td><input id="C_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_MM" class="form-control decimal text-right mm" style="width:90px;" value="0.00"></input></td>';
    html += '<td><input id="D_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_M01" class="form-control decimal text-right m01" style="width:90px;" value="0.00"></input></td>';
    html += '<td><input id="E_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_M2" class="form-control decimal text-right m2" style="width:90px;" value="0.00"></input></td>';
    html += '<td><input id="F_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_HH" class="form-control decimal text-right hh" style="width:90px;" value="0.00"></input></td>';    
    html += '</tr>';
}

$('#bodyLowIncomeExemption').html(html);

function DisplayData() {    
    var params = { LowIncomeExemptionId: parseInt($('#hdnLowIncomeExemptionId').val(), 10) };
    CallService('Admin/LowIncomeExemptionService.svc', 'GetObject', params, OnLowIncomeExemptionGetObjectSuccess, true);
    
}
function OnLowIncomeExemptionGetObjectSuccess(dtoLowIncomeExemption) {
    if (dtoLowIncomeExemption.LowIncomeExemptionId != undefined) {
        $('#cmbStateName').val(dtoLowIncomeExemption.StateId);
        $('#txtEffectiveDate').val(FormatDateUTC(dtoLowIncomeExemption.EffectiveDate));
    }
    else {
        window.location = "/Admin/Main.html#ViewAllLowIncomeExemptions";
    }    
}

function FillLowIncomeExemptionDetail() {
    var params = { LowIncomeExemptionId: parseInt($('#hdnLowIncomeExemptionId').val(), 10) };
    CallService('Admin/LowIncomeExemptionService.svc', 'GetLowIncomeExemptionDetail', params, OnGetLowIncomeExemptionDetailSuccess, true);
}

function OnGetLowIncomeExemptionDetailSuccess(response) {
    for (var i = 0; i < PayScheduleRecurrences.length; i++)
    {       
        for (var j = 0; j < response.length; j++)
        {
            if (PayScheduleRecurrences[i].PayScheduleRecurrenceId === response[j].PayScheduleRecurrenceId)
            {
                $('#A_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_S').val(response[j].S.toFixed(2));
                $('#B_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_MJ').val(response[j].MJ.toFixed(2));
                $('#C_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_MM').val(response[j].MM.toFixed(2));
                $('#D_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_M01').val(response[j].M01.toFixed(2));
                $('#E_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_M2').val(response[j].M2.toFixed(2));
                $('#F_' + PayScheduleRecurrences[i].PayScheduleRecurrenceId + '_HH').val(response[j].HH.toFixed(2));
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
        var LowIncomeExemptionDetails = '';
        $('.a').each(function (index, data) {
            var arrA = $(this).attr('id');
            LowIncomeExemptionDetails += $(this).attr('id') + String.fromCharCode(134) + $(this).find('.s').val() + String.fromCharCode(134) + $(this).find('.mj').val() + String.fromCharCode(134) + $(this).find('.mm').val() + String.fromCharCode(134) + $(this).find('.m01').val() + String.fromCharCode(134) + $(this).find('.m2').val() + String.fromCharCode(134) + $(this).find('.hh').val();
            if (index < $('.a').length - 1)
            {
                LowIncomeExemptionDetails += String.fromCharCode(135);
            }
        });       
        var params = { LowIncomeExemptionId: parseInt($("#hdnLowIncomeExemptionId").val(), 10), StateId: parseInt($("#cmbStateName").val(), 10), EffectiveDate: $("#txtEffectiveDate").val(), LowIncomeExemptionDetails: LowIncomeExemptionDetails};
        CallService('Admin/LowIncomeExemptionService.svc', 'Save', params, OnLowIncomeExemptionSaveSuccess, false);
    }
};

function OnLowIncomeExemptionSaveSuccess(LowIncomeExemptionId) {
    if (LowIncomeExemptionId > 0) {
        window.location = "/Admin/Main.html#ViewAllLowIncomeExemptions";
    }
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllLowIncomeExemptions";
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