CheckPageRequest();
app.page("PriorTaxPayment", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnPriorTaxPaymentId').val(params);
            $('.page-head').html("Edit Prior Tax Payment");
            var params = { ClientId: $.localStorage.get('ClientId'), PriorTaxPaymentId: parseInt($('#hdnPriorTaxPaymentId').val(), 10) };
            var dtoPriorTaxPayment = CallService1('Client/TaxesAndForms/PriorTaxPaymentService.svc', 'GetObject', params);
            if (dtoPriorTaxPayment.PriorTaxPaymentId != undefined) {
                $('#hdnPriorTaxPaymentId').val(dtoPriorTaxPayment.PriorTaxPaymentId);
                $('#cmbTaxType').val(dtoPriorTaxPayment.TaxType);
                $('#cmbLiabilityPeriod').val(dtoPriorTaxPayment.LiabilityPeriod);
                $("#txtPeriodStartDate").val(dtoPriorTaxPayment.PeriodStartDate);
                $("#txtPeriodEndDate").val(dtoPriorTaxPayment.PeriodEndDate);
                $("#txtPaymentDate").val(dtoPriorTaxPayment.PaymentDate);
                $('#txtCheckNumber').val(dtoPriorTaxPayment.CheckNumber);
                $('#txtNotes').val(dtoPriorTaxPayment.Notes);
                $('#txtFederalIncomeTax').val(dtoPriorTaxPayment.FederalIncome);
                $('#txtSocialSecurity').val(dtoPriorTaxPayment.SocialSecurity);
                $('#txtSocialSecurityEmployer').val(dtoPriorTaxPayment.SocialSecurityEmployer);
                $('#txtMedicare').val(dtoPriorTaxPayment.Medicare);
                $('#txtMedicareEmployer').val(dtoPriorTaxPayment.MedicareEmployer);
                $('#txtFutaEmployer').val(dtoPriorTaxPayment.FutaEmployer);
                $('#txtTotalAmount').val(dtoPriorTaxPayment.TotalAmount);
                $("#txtPeriodEndDate").val(dtoPriorTaxPayment.PeriodEndDate);

                if (dtoPriorTaxPayment.TaxType == "Federal Taxes (941/944)") {
                    $("#trFutaEmployer").addClass('hide');
                    $("#trFederalIncomeTax").removeClass('hide');
                    $("#trSocialSecurity").removeClass('hide');
                    $("#trSocialSecurityEmployer").removeClass('hide');
                    $("#trMedicare").removeClass('hide');
                    $("#trMedicareEmployer").removeClass('hide');
                }
                else {
                    $("#trFutaEmployer").removeClass('hide');
                    $("#trFederalIncomeTax").addClass('hide');
                    $("#trSocialSecurity").addClass('hide');
                    $("#trSocialSecurityEmployer").addClass('hide');
                    $("#trMedicare").addClass('hide');
                    $("#trMedicareEmployer").addClass('hide');
                }

                if (dtoPriorTaxPayment.LiabilityPeriod != "UserDefined") {
                    $("#txtPeriodStartDate").val('');
                    $("#txtPeriodEndDate").val('');
                    $("#trStartDate").addClass('hide');
                    $("#trEndDate").addClass('hide');
                }

                FillLiabilityPeriod();
                $('#cmbLiabilityPeriod').val(dtoPriorTaxPayment.LiabilityPeriod);
                //if (dtoContractor.AlreadyPaid == true)
                //    $("#chkAlreadyPaid").attr('checked', 'checked');
                //else
                //    $("#chkAlreadyPaid").removeAttr('checked', '');
            }
            else {
                window.location = "/Client/Main.html#ViewAllPriorTaxPayments";
            }
        }
    }
});
$("#cmbLiabilityPeriod").focus();
$.validator.addMethod(
    "AlreadyExists",
    function (value, element) {
        var params = {
            ClientId: $.localStorage.get('ClientId'),
            //PriorTaxPaymentId: parseInt($("#hdnPriorTaxPaymentId").val(), 10),
            LiabilityPeriod: $("#cmbLiabilityPeriod").val(),
            TaxType: $('#cmbTaxType').val(),
            PeriodStartDate :  $('#txtPeriodStartDate').val().trim(),
            PeriodEndDate  : $('#txtPeriodEndDate').val().trim()
        };
        var response = CallService1('Client/TaxesAndForms/PriorTaxPaymentService.svc', 'Exists', params);
        return !response;
    },
    "Prior tax payment for this period already exists"
);


$.validator.addMethod(
    "InvalidPaymentDate",
    function (value, element) {
        if ($('#txtPaymentDate').val().trim() != '') {
            return ($('#txtPaymentDate').val().trim().length < 10 ? false : true);
        }
        return true;
    },
    "Invalid Payment Date"
);

$.validator.addMethod(
    "InvalidPeriodStartDate",
    function (value, element) {
        if ($('#txtPeriodStartDate').val().trim() != '') {
            return ($('#txtPeriodStartDate').val().trim().length < 10 ? false : true);
        }
        return true;
    },
    "Invalid Period Start Date"
);

$.validator.addMethod(
    "InvalidPeriodEndDate",
    function (value, element) {
        if ($('#txtPeriodEndDate').val().trim() != '') {
            return ($('#txtPeriodEndDate').val().trim().length < 10 ? false : true);
        }
        return true;
    },
    "Invalid Period End Date"
);

$.validator.addMethod(
    "Required1",
    function (value, element) {
        return ($('#cmbLiabilityPeriod').val() == '0' ? false : true);
    },
    "Liability Period is required"
);

$.validator.addMethod(
    "Required2",
    function (value, element) {

        return ($('#txtFederalIncomeTax').val() == '' ? false : true);
    },
    "Federal Income Tax is required"
);

$.validator.addMethod(
    "Required3",
    function (value, element) {

        return ($('#txtSocialSecurity').val() == '' ? false : true);
    },
    "Social Security Tax is required"
);

$.validator.addMethod(
    "Required4",
    function (value, element) {

        return ($('#txtSocialSecurityEmployer').val() == '' ? false : true);
    },
    "Social Security Employer Tax is required"
);

$.validator.addMethod(
    "Required5",
    function (value, element) {

        return ($('#txtMedicare').val() == '' ? false : true);
    },
    "Medicare Tax is required"
);

$.validator.addMethod(
    "Required6",
    function (value, element) {

        return ($('#txtMedicareEmployer').val() == '' ? false : true);
    },
    "Medicare Employer Tax is required"
);

$.validator.addMethod(
    "Required7",
    function (value, element) {

        return ($('#txtFutaEmployer').val() == '' ? false : true);
    },
    "Futa Employer Tax is required"
);

$(document).ready(function () {

    //iterate through each textboxes and add keyup
    //handler to trigger sum event
    $(".FederalTax").each(function () {

        $(this).keyup(function () {
            calculateFederalTaxSum();
        });
    });
    SetKeyPress();

});

$('#myModal').modal('toggle');
$('.input-date-picker').mask('00/00/0000', {
    placeholder: "MM/DD/YYYY"
});
$('.input-date-picker').datepicker({
    format: 'mm/dd/yyyy',
    orientation: 'bottom',
    autoclose: true,
    todayHighlight: true
});

SetKeyPress();

function SetKeyPress() {
    $('.decimal').keypress(function (event) {
        return isNumber(event, this)
    }).bind('blur', function () {
        var num;
        num = parseFloat($(this).val());
        num = isNaN(num) ? '0.00' : num;
        if (num && num < 0) num = num * -1;
        $(this).val(parseFloat(num).toFixed(2));
    });
}

function calculateFederalTaxSum() {

    var sum = 0;
    //iterate through each textboxes and add the values
    $(".FederalTax").each(function () {

        //add only if the value is number
        if (!isNaN(this.value) && this.value.length != 0) {
            sum += parseFloat(this.value);
        }

    });
    //.toFixed() method will roundoff the final sum to 2 decimal places
    //alert(sum.toFixed(2));
    $("#txtTotalAmount").val(sum.toFixed(2));
}


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
        txtPaymentDate: {
            required: true
        },
        txtPeriodStartDate: {
            required: true
        },
        txtPeriodEndDate: {
            required: true
        },
        txtFederalIncomeTax: {
            required: true
        },
        txtSocialSecurity: {
            Required1: true
        },
        txtSocialSecurityEmployer: {
            required: true
        },
        txtMedicare: {
            required: true
        },
        txtMedicareEmployer: {
            required: true
        },
        txtFutaEmployer: {
            required: true
        }
    },
    messages: {
        txtPaymentDate: {
            required: 'Payment Date is required'
        },
        txtPeriodStartDate: {
            required: 'Period Start Date is required'
        },
        txtPeriodEndDate: {
            required: 'Period End Date is required'
        },
        txtFederalIncomeTax: {
            required: 'Federal Income Tax is required'
        },
        txtSocialSecurity: {
            required: 'Social Security Tax is required'
        },
        txtSocialSecurityEmployer: {
            required: 'Social Security Employer Tax is required'
        },
        txtMedicare: {
            required: 'Medicare Tax is required'
        },
        txtMedicareEmployer: {
            required: 'Medicare Employer Tax is required'
        },
        txtFutaEmployer: {
            required: 'Futa Employer Tax is required'
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
var form1 = $("#frmEntry1");
var valid1 = form1.validate({
    /* @validation states + elements
         ------------------------------------------- */

    errorClass: 'error-view',
    validClass: 'success-view',
    errorElement: 'span',

    /* @validation rules
         ------------------------------------------ */
    rules: {
        txtPayDate:
        {
            required: true,
            InvalidPayDate: true
        }
    },
    messages: {
        txtPayDate:
        {
            required: 'Pay Date is required'
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


function FillTaxType() {
    OnGetTaxTypeSuccess()
    //var params = { PayScheduleId: $("#cmbLiabilityPeriod").val() };
    //CallService('Client/PayCheckService.svc', 'GetPayPeriod', params, OnGetLiabilityPeriodSuccess, false);
}

function OnGetTaxTypeSuccess() {
    //var html = '<option value="0"></option>';
    var html = '<option value="Federal Taxes (941/944)" selected="selected">Federal Taxes (941/944)</option>';
    var html = html + '<option value="Federal Unemployment (940)">Federal Unemployment (940)</option>';
    //if (payPeriods != undefined) {
    //    for (var i = 0; i < payPeriods.length; i++) {
    //        html += '<option value="' + payPeriods[i]['PayPeriod'] + '">' + payPeriods[i]['PayPeriod'] + '</option>';
    //    }
    //}
    //alert(html);
    $('#cmbTaxType').html(html);
    //alert($('#cmbTaxType').val());
}

FillTaxType();
DefaultSetting();


function FillLiabilityPeriod() {
    OnGetLiabilityPeriodSuccess();
    //var params = { PayScheduleId: $("#cmbLiabilityPeriod").val() };
    //CallService('Client/PayCheckService.svc', 'GetPayPeriod', params, OnGetLiabilityPeriodSuccess, false);
}

function OnGetLiabilityPeriodSuccess() {
    var dt = new Date();
    var year = dt.getFullYear();
    var html = '<option value="0"></option>';
 
    if ($('#cmbTaxType').val() == "Federal Taxes (941/944)") {
        var Q1 = '01/01/' + year + ' - 03/31/' + year;
        var Q2 = '04/01/' + year + ' - 06/30/' + year;
        var Q3 = '07/01/' + year + ' - 09/30/' + year;
        var Q4 = '10/01/' + year + ' - 12/31/' + year;
        html += '<option value="' + Q1 + '">' + Q1 + '</option>';
        html += '<option value="' + Q2 + '">' + Q2 + '</option>';
        html += '<option value="' + Q3 + '">' + Q3 + '</option>';
        html += '<option value="' + Q4 + '">' + Q4 + '</option>';
        $('#cmbLiabilityPeriod').html(html);
    }

    if ($('#cmbTaxType').val() == "Federal Unemployment (940)") {
        var yearPeriod = '01/01/' + year + ' - 12/31/' + year;
        html = '<option value="' + yearPeriod + '">' + yearPeriod + '</option>';
    }
    html += '<option value="User Defined">User Defined</option>';
    $('#cmbLiabilityPeriod').html(html);
}
FillLiabilityPeriod();
/*
function FillGrid() {
    var params = {
        ClientId: $.localStorage.get('ClientId'),
        StartIndex: 0,
        PageSize: 0,
        SortField: 'FullName',
        SortDirection: 'ASC',
        Status: 'Active',
        FilterText: '',
        DepartmentId: 0,
        LocationId: 0,
        EmployeeId: 0

    };
    CallService('Client/EmployeeService.svc', 'GetPage', params, OnEmployeeGetPageSuccess, true);
}
function OnEmployeeGetPageSuccess(dtoEmployeePage) {
    if (dtoEmployeePage != undefined) {
        var html = '';
        for (var i = 0; i < dtoEmployeePage.Employees.length; i++) {
            if ($('#cmbPayScheduleName').val() == dtoEmployeePage.Employees[i].PayScheduleId) {
                html += '<tr id="' + dtoEmployeePage.Employees[i].EmployeeId + '" class="' + (i % 2 == 0 ? "footable-even" : "footable-odd") + '">';
                html += '<td>' + _.escape(dtoEmployeePage.Employees[i].FullName) + '</td>';
                html += '<td>' + _.escape(dtoEmployeePage.Employees[i].EMailId) + '</td>';
                html += '<td class="td-center"><a title="Create check" href="javascript:void(0)" onclick=\"NewRecord(' + dtoEmployeePage.Employees[i].EmployeeId + ')\" class="uibutton large confirm">Create Paycheck</a></td>';
                html += '</tr>';
            }
        }
        $('#bodyEmployees').html(html);
    }
}
FillGrid();
function NewRecord(EmployeeId) {
    if (form.valid()) {
        $('#hdnEmployeeId').val(EmployeeId);
        var params = { ClientId: parseInt($.localStorage.get('ClientId'), 10), EmployeeId: parseInt($('#hdnEmployeeId').val(), 10) };
        var dtoEmployee = CallService1('Client/EmployeeService.svc', 'GetObject', params);
        $('#spanPayRate').html(accounting.formatMoney(dtoEmployee.PayRate));

        if (dtoEmployee.PayType === 'Hourly') {
            $('#spanPayType').html('Per Hour');
        }
        else {
            if ($('#hdnPayScheduleRecurrenceCode').val() === 'DA') {
                $('#spanPayType').html('Per Day');
            }
            else if ($('#hdnPayScheduleRecurrenceCode').val() === 'WW') {
                $('#spanPayType').html('Per Week');
            }
            else if ($('#hdnPayScheduleRecurrenceCode').val() === 'BW') {
                $('#spanPayType').html('Per Bi-Week');
            }
            else if ($('#hdnPayScheduleRecurrenceCode').val() === 'SM') {
                $('#spanPayType').html('Per Semi-Month');
            }
            else if ($('#hdnPayScheduleRecurrenceCode').val() === 'MM') {
                $('#spanPayType').html('Per Month');
            }
            else if ($('#hdnPayScheduleRecurrenceCode').val() === 'QQ') {
                $('#spanPayType').html('Per Quarter');
            }
            else if ($('#hdnPayScheduleRecurrenceCode').val() === 'SA') {
                $('#spanPayType').html('Per Semi-Annual');
            }
            else if ($('#hdnPayScheduleRecurrenceCode').val() === 'AA') {
                $('#spanPayType').html('Per Year');
            }
        }
        var params = {
            ClientId: $.localStorage.get('ClientId'),
            StartIndex: 0,
            PageSize: 0,
            SortField: 'PayStubName',
            SortDirection: 'ASC',
            FilterText: ''
        };
        var dtoPayStubPage = CallService1('Client/PayStubService.svc', 'GetPage', params);

        if (dtoPayStubPage != undefined) {
            var html = '';
            var html1 = '';
            for (var i = 0; i < dtoPayStubPage.PayStubs.length; i++) {
                if (dtoPayStubPage.PayStubs[i].PayStubType === 'Addition') {
                    html += '<tr id="' + dtoPayStubPage.PayStubs[i].PayStubId + '" taxable="' + dtoPayStubPage.PayStubs[i].Taxable + '">';
                    html += '<td class="white-space:nowrap"><span class="paystubname">' + _.escape(dtoPayStubPage.PayStubs[i].PayStubName) + '</span></td>';
                    html += '<td><input style="width:100px;text-align:right" class="form-control decimal" value="0.00" onblur="CalculateNetAmount()"></input></td>';
                    html += '</tr>';
                }
                else {
                    html1 += '<tr id="' + dtoPayStubPage.PayStubs[i].PayStubId + '" taxable="' + dtoPayStubPage.PayStubs[i].Taxable + '">';
                    html1 += '<td class="white-space:nowrap"><span class="paystubname">' + _.escape(dtoPayStubPage.PayStubs[i].PayStubName) + '</span></td>';
                    html1 += '<td><input style="width:100px;text-align:right" class="form-control decimal" value="0.00" onblur="CalculateNetAmount()"></input></td>';
                    html1 += '</tr>';
                }
            }
            var htmlBefore = '';
            htmlBefore += '<tr id="-1" taxable="true">';
            htmlBefore += '<td class="white-space:nowrap"><span class="paystubname">Regular Pay</span></td>';
            htmlBefore += '<td><input id="txtRegularPay" class="form-control decimal" style="width:100px;text-align:right" disabled value="0.00" onblur="CalculateNetAmount()"></input></td>';
            htmlBefore += '</tr>';
            var htmlAfter = '';
            htmlAfter += '<tr id="-2" taxable="false">';
            htmlAfter += '<td class="white-space:nowrap"><span class="paystubname">Federal Tax</span></td>';
            htmlAfter += '<td><input id="txtFederalTaxAmount" class="form-control decimal" style="width:100px;text-align:right" value="0.00"></input></td>';
            htmlAfter += '</tr>';
            htmlAfter += '<tr id="-3" taxable="false">';
            htmlAfter += '<td class="white-space:nowrap"><span id="spanStateTax" class="paystubname">State Tax</span></td>';
            htmlAfter += '<td><input id="txtStateTaxAmount" class="form-control decimal" style="width:100px;text-align:right" value="0.00"></input></td>';
            htmlAfter += '</tr>';
            htmlAfter += '<tr id="-4" taxable="false">';
            htmlAfter += '<td class="white-space:nowrap"><span class="paystubname">Social Security</span></td>';
            htmlAfter += '<td><input id="txtSocialSecurityTaxAmount" class="form-control decimal" style="width:100px;text-align:right" value="0.00"></input></td>';
            htmlAfter += '</tr>';
            htmlAfter += '<tr id="-5" taxable="false">';
            htmlAfter += '<td class="white-space:nowrap"><span class="paystubname">Medicare</span></td>';
            htmlAfter += '<td><input id="txtMedicareTaxAmount" class="form-control decimal" style="width:100px;text-align:right" value="0.00"></input></td>';
            htmlAfter += '</tr>';
            htmlAfter += '<tr id="-6" taxable="false">';
            htmlAfter += '<td class="white-space:nowrap"><span class="paystubname">FUTA Employer</span></td>';
            htmlAfter += '<td><input id="txtEmployerFUTATaxAmount" class="form-control decimal" style="width:100px;text-align:right" value="0.00"></input></td>';
            htmlAfter += '</tr>';
            htmlAfter += '<tr id="-7" taxable="false">';
            htmlAfter += '<td class="white-space:nowrap"><span class="paystubname">Social Security Employer</span></td>';
            htmlAfter += '<td><input id="txtEmployerSocialSecurityTaxAmount" class="form-control decimal" style="width:100px;text-align:right" value="0.00"></input></td>';
            htmlAfter += '</tr>';
            htmlAfter += '<tr id="-8" taxable="false">';
            htmlAfter += '<td class="white-space:nowrap"><span class="paystubname">Medicare Employer</span></td>';
            htmlAfter += '<td><input id="txtEmployerMedicareTaxAmount" class="form-control decimal" style="width:100px;text-align:right" value="0.00"></input></td>';
            htmlAfter += '</tr>';
            htmlAfter += '<tr id="-9" taxable="false">';
            htmlAfter += '<td class="white-space:nowrap"><span class="paystubname">SUI Employer</span></td>';
            htmlAfter += '<td><input id="txtEmployerSUITaxAmount" class="form-control decimal" style="width:100px;text-align:right" value="0.00"></input></td>';
            htmlAfter += '</tr>';
            htmlAfter += '<tr id="-10" taxable="false">';
            htmlAfter += '<td class="white-space:nowrap"><span id="spanAdminAssessment" class="paystubname">Administrative Assessment</span></td>';
            htmlAfter += '<td><input id="txtEmployerAdminAssessmentTaxAmount" class="form-control decimal" style="width:100px;text-align:right" value="0.00"></input></td>';
            htmlAfter += '</tr>';
            $('#bodyAddition').html(htmlBefore + html);
            $('#bodyDeduction').html(html1 + htmlAfter);
        }
        $('#spanStateTax').html(dtoEmployee.StateCode1 + ' State Tax');
        $('#spanAdminAssessment').html(dtoEmployee.StateCode1 + ' Administrative Assessment');
        $('#txtRegularHours').val(0);
        $('#spanNetAmount').html('$0.00');

        $('#myModal').modal('toggle');
        $('.input-date-picker').mask('00/00/0000', {
            placeholder: "MM/DD/YYYY"
        });
        $('.input-date-picker').datepicker({
            format: 'mm/dd/yyyy',
            orientation: 'bottom',
            autoclose: true,
            todayHighlight: true
        });
        SetKeyPress();
    }
}



function CalculateNetAmount() {
    if ($('#spanPayType').html() === 'Per Hour') {
        $('#txtRegularPay').val(($('#spanPayRate').html().replace('$', '') * $("#txtRegularHours").val()).toFixed(2));
    }
    else {
        if ($('#spanPayType').html() === 'Per Day') {
            $('#txtRegularPay').val((($('#spanPayRate').html().replace('$', '') / 8) * $("#txtRegularHours").val()).toFixed(2));
        }
        else if ($('#spanPayType').html() === 'Per Week') {
            $('#txtRegularPay').val((($('#spanPayRate').html().replace('$', '') / 40) * $("#txtRegularHours").val()).toFixed(2));
        }
        else if ($('#spanPayType').html() === 'Per Bi-Week') {
            $('#txtRegularPay').val((($('#spanPayRate').html().replace('$', '') / 80) * $("#txtRegularHours").val()).toFixed(2));
        }
        else if ($('#spanPayType').html() === 'Per Semi-Month') {
            $('#txtRegularPay').val((($('#spanPayRate').html().replace('$', '') / 88) * $("#txtRegularHours").val()).toFixed(2));
        }
        else if ($('#spanPayType').html() === 'Per Month') {
            $('#txtRegularPay').val((($('#spanPayRate').html().replace('$', '') / 176) * $("#txtRegularHours").val()).toFixed(2));
        }
        else if ($('#spanPayType').html() === 'Per Quarter') {
            $('#txtRegularPay').val((($('#spanPayRate').html().replace('$', '') / 528) * $("#txtRegularHours").val()).toFixed(2));
        }
        else if ($('#spanPayType').html() === 'Per Semi-Annual') {
            $('#txtRegularPay').val((($('#spanPayRate').html().replace('$', '') / 1056) * $("#txtRegularHours").val()).toFixed(2));
        }
        else if ($('#spanPayType').html() === 'Per Year') {
            $('#txtRegularPay').val((($('#spanPayRate').html().replace('$', '') / 2112) * $("#txtRegularHours").val()).toFixed(2));
        }
    }

    var TaxableAmount = 0;
    var NetAmount = 0;
    $('#txtFederalTaxAmount').val(0);
    $('#txtStateTaxAmount').val(0);
    $('#txtSocialSecurityTaxAmount').val(0);
    $('#txtMedicareTaxAmount').val(0);
    $('#bodyAddition > tr').each(function () {
        var $this = $(this);
        if ($this.attr('taxable') == 'true') {
            TaxableAmount += parseFloat($this.find('.form-control').val());
        }
        NetAmount += parseFloat($this.find('.form-control').val());
    });

    var params = { TaxableAmount: TaxableAmount };
    var dtoTax = CallService1('Client/PayCheckService.svc', 'GetTax', params)
    var params = { ClientId: $.localStorage.get('ClientId'), EmployeeId: $('#hdnEmployeeId').val(), TaxableAmount: TaxableAmount };
    var SUITaxAmount = CallService1('Client/PayCheckService.svc', 'GetSUITax', params)
    $("#txtEmployerSUITaxAmount").val(SUITaxAmount.toFixed(2));
    $('#txtSocialSecurityTaxAmount').val(dtoTax.SocialSecurityTaxAmount.toFixed(2));
    $('#txtMedicareTaxAmount').val(dtoTax.MedicareTaxAmount.toFixed(2));
    $('#txtEmployerSocialSecurityTaxAmount').val(dtoTax.EmployerSocialSecurityTaxAmount.toFixed(2));
    $('#txtEmployerMedicareTaxAmount').val(dtoTax.EmployerMedicareTaxAmount.toFixed(2));
    $('#txtEmployerFUTATaxAmount').val(dtoTax.EmployerFUTATaxAmount.toFixed(2));
    $('#bodyDeduction > tr').each(function () {
        var $this = $(this);
        if ($this.attr('taxable') == 'true') {
            TaxableAmount += parseFloat($this.find('.form-control').val());
        }
        NetAmount -= parseFloat($this.find('.form-control').val());
    });

    var params = { EmployeeId: $('#hdnEmployeeId').val(), TaxableAmount: TaxableAmount };
    var FederalTaxAmount = CallService1('Client/PayCheckService.svc', 'GetFederalTax', params);
    $('#txtFederalTaxAmount').val(FederalTaxAmount.toFixed(2));
    NetAmount -= FederalTaxAmount.toFixed(2);
    var params = { EmployeeId: $('#hdnEmployeeId').val(), TaxableAmount: TaxableAmount };
    var StateTaxAmount = CallService1('Client/PayCheckService.svc', 'GetStateTax', params);
    $('#txtStateTaxAmount').val(StateTaxAmount.toFixed(2));
    NetAmount -= StateTaxAmount.toFixed(2);
    $('#spanNetAmount').html(accounting.formatMoney(NetAmount));
}
$(document).ready(function () {
    $("#cmbPayScheduleName").change(function () {
        var params = { ClientId: $.localStorage.get('ClientId'), PayScheduleId: $("#cmbPayScheduleName").val() };
        var dtoPaySchedule = CallService1('Client/PayScheduleService.svc', 'GetObject', params);
        $('#hdnPayScheduleRecurrenceCode').val(dtoPaySchedule.PayScheduleRecurrenceCode);
        FillPayPeriods();
        FillGrid();
    });
    $("#txtRegularHours").blur(function () {
        CalculateNetAmount();
    });
});

*/
function Save() {
    if (form.valid()) {

        var params = {
            PriorTaxPaymentId: $('#hdnPriorTaxPaymentId').val() == '' ? 0 : $('#hdnPriorTaxPaymentId').val(),
            TaxType: $('#cmbTaxType').val(),
            ClientId: $.localStorage.get('ClientId'),
            LiabilityPeriod: $("#cmbLiabilityPeriod").val(),
            PeriodStartDate: $("#txtPeriodStartDate").val(),
            PeriodEndDate: $("#txtPeriodEndDate").val(),
            PaymentDate: $("#txtPaymentDate").val(),
            CheckNumber: $("#txtCheckNumber").val(),
            Notes: $("#txtNotes").val(),
            FederalIncome: $("#txtFederalIncomeTax").val() == "" ? 0 : $("#txtFederalIncomeTax").val(),
            SocialSecurity: $("#txtSocialSecurity").val() == "" ? 0 : $("#txtSocialSecurity").val(),
            SocialSecurityEmployer: $("#txtSocialSecurityEmployer").val() == "" ? 0 : $("#txtSocialSecurityEmployer").val(),
            Medicare: $("#txtMedicare").val() == "" ? 0 : $("#txtMedicare").val(),
            MedicareEmployer: $("#txtMedicareEmployer").val() == "" ? 0 : $("#txtMedicareEmployer").val(),
            FutaEmployer: $("#txtFutaEmployer").val() == "" ? 0 : $("#txtFutaEmployer").val(),
            TotalAmount: $("#txtTotalAmount").val() == "" ? 0 : $("#txtTotalAmount").val(),          
        };
        CallService('Client/TaxesAndForms/PriorTaxPaymentService.svc', 'Save', params, OnPriorTaxPaymentSaveSuccess, false);
    }
};

function OnPriorTaxPaymentSaveSuccess(PriorTaxPaymentId) {
    if (PriorTaxPaymentId > 0) {
        //alert('Prior Tax Payment created successfully.')
        window.location = "/Client/Main.html#ViewAllPriorTaxPayments";
        
    }
}

function TaxTypeChange()
{
    //alert($('#cmbTaxType').val());
    FillLiabilityPeriod(); // Refill liability period depending upon the selected tax type.

    if ($('#cmbTaxType').val() == "Federal Taxes (941/944)") {
        $("#trFutaEmployer").addClass('hide');
        $("#trFederalIncomeTax").removeClass('hide');
        $("#trSocialSecurity").removeClass('hide');
        $("#trSocialSecurityEmployer").removeClass('hide');
        $("#trMedicare").removeClass('hide');
        $("#trMedicareEmployer").removeClass('hide');

        $("#txtFutaEmployer").val('');
        $("#txtFederalIncomeTax").val('');
        $("#txtSocialSecurity").val('');
        $("#txtSocialSecurityEmployer").val('');
        $("#txtMedicare").val('');
        $("#txtMedicareEmployer").val('');
    }
    else if ($('#cmbTaxType').val() == "Federal Unemployment (940)")
    {
        $("#trFutaEmployer").removeClass('hide');
        $("#trFederalIncomeTax").addClass('hide');
        $("#trSocialSecurity").addClass('hide');
        $("#trSocialSecurityEmployer").addClass('hide');
        $("#trMedicare").addClass('hide');
        $("#trMedicareEmployer").addClass('hide');

        $("#txtFutaEmployer").val('');
        $("#txtFutaEmployer").val('');
        $("#txtFederalIncomeTax").val('');
        $("#txtSocialSecurity").val('');
        $("#txtSocialSecurityEmployer").val('');
        $("#txtMedicare").val('');
        $("#txtMedicareEmployer").val('');
    }
}

function LiabilityPeriodChange()
{
    if ($('#cmbLiabilityPeriod').val() == "User Defined") {
        $("#trStartDate").removeClass('hide');
        $("#trEndDate").removeClass('hide');
        $("#txtStartDate").val('');
        $("#txtEndDate").val('');
    }
    else
    {
        $("#trStartDate").addClass('hide');
        $("#trEndDate").addClass('hide');
        $("#txtStartDate").val('');
        $("#txtEndDate").val('');
    }
}

function DefaultSetting()
{
    $("#trFutaEmployer").addClass('hide');
    $("#trFederalIncomeTax").removeClass('hide');
    $("#trSocialSecurity").removeClass('hide');
    $("#trSocialSecurityEmployer").removeClass('hide');
    $("#trMedicare").removeClass('hide');
    $("#trMedicareEmployer").removeClass('hide');
    $("#trStartDate").addClass('hide');
    $("#trEndDate").addClass('hide');
}

function Close() {
    window.location = "/Client/Main.html#ViewAllPriorTaxPayments";
}
window.scrollTo(0, 0);