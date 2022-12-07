CheckPageRequest();
var dtoPayCheckMain = new Object();
dtoPayCheckMain.PayCheckMainId = 0;
var PayStubs;
$(document).on("focusin", "#txtPayDate", function () {
    $(this).prop('readonly', true);
});
$(document).on("focusout", "#txtPayDate", function () {
    $(this).prop('readonly', false);
});
$('.input-date-picker').mask('00/00/0000', {
    placeholder: "MM/DD/YYYY"
});
$('.input-date-picker').datepicker({
    format: 'mm/dd/yyyy',
    orientation: 'bottom',
    autoclose: true,
    todayHighlight: true
});
$.validator.addMethod(
    "InvalidPayDate",
    function (value, element) {
        if ($('#txtPayDate').val().trim() != '') {
            return ($('#txtPayDate').val().trim().length < 10 ? false : true);
        }
        return true;
    },
    "Invalid Pay Date"
);
$.validator.addMethod(
    "Required2",
    function (value, element) {

        return (($('#cmbPayPeriod').val() == '0') || ($('#cmbPayPeriod').val() == undefined) ? false : true);
    },
    "Pay Period is required"
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
        //cmbPayScheduleName:
        //{
        //    Required1: true            
        //},
        cmbPayPeriod:
        {
            Required2: true
        },
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
var form1 = $("#frmEntry");
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
function FillPaySchedules() {
    var params = { ClientId: $.localStorage.get('ClientId') };
    CallService('Client/PayScheduleService.svc', 'GetLookup', params, OnPayScheduleGetLookupSuccess, false);
}

function OnPayScheduleGetLookupSuccess(paySchedules) {
    var html = '<option value="-1"></option>';
    if (paySchedules != undefined) {
        for (var i = 0; i < paySchedules.length; i++) {
            html += '<option value="' + paySchedules[i]['PayScheduleId'] + '">' + paySchedules[i]['PayScheduleName'] + '</option>';
        }
    }
    $('#cmbPaySchedule').html(html);
}
FillPaySchedules();
function FillPayPeriods() {
    var params = { ClientId: $.localStorage.get('ClientId'), PayScheduleId: $('#hdnPayScheduleId').val() };
    CallService('Client/PayCheckService.svc', 'GetPayPeriod', params, OnPayCheckGetPayPeriodSuccess, false);
}

function OnPayCheckGetPayPeriodSuccess(payPeriods) {
    var html = '<option value="0"></option>';
    if (payPeriods != undefined) {
        for (var i = 0; i < payPeriods.length; i++) {
            html += '<option value="' + payPeriods[i]['PayPeriod'] + '" paydate="' + FormatDateUTC(payPeriods[i]['PayDate']) + '" ' + (payPeriods[i]['CurrentPayPeriod'] == 1 ? 'selected' : '') + '>' + payPeriods[i]['PayPeriod'] + '</option>';
        }
    }
    $('#cmbPayPeriod').html(html);
    $('#cmbPayPeriod').change();
}

function OnEmployeeGetByPayScheduleIdSuccess(Employees) {
    if (Employees != undefined) {
        var params = { ClientId: $.localStorage.get('ClientId'), PayScheduleId: $('#hdnPayScheduleId').val() };
        var PayStubAll = CallService1('Client/PayStubService.svc', 'GetEmployeePayStubAll', params);

        var params = { ClientId: $.localStorage.get('ClientId'), PayScheduleId: $('#hdnPayScheduleId').val() };
        PayStubs = CallService1('Client/PayStubService.svc', 'GetByPayScheduleId', params);

        var html = '';
        html += '<table id="tblMain" class="table foo-data-table-filterable">';
        html += '<thead>';
        html += '<tr >';
        html += '<th style="width: 25px" data-sort-ignore="true" class="hide">';
        html += '<input id="chkAll" type="checkbox" name="0" onclick="CheckAll()" />';
        html += '</th>';
        html += '<th class="hide">';
        html += '<a>';
        html += 'Type';
        html += '</a>';
        html += '</th>';
        html += '<th>';
        html += '<a>';
        html += 'Employee Name';
        html += '</a>';
        html += '</th>';
        html += '<th style="text-align:right">';
        html += '<a>';
        html += 'Hourly Rate';
        html += '</a>';
        html += '</th>';
        html += '<th class="hide">';
        html += '<a>';
        html += 'Regular Pay';
        html += '</a>';
        html += '</th>';
        html += '<th>';
        html += '<a>';
        html += 'Regular Hrs.';
        html += '</a>';
        html += '</th>';
        html += '<th style="text-align:right;white-space:nowrap">';
        html += '<a>';
        html += 'Other Earnings';
        html += '</a>';
        html += '</th>';
        html += '<th style="text-align:right;">';
        html += '<a>';
        html += 'Gross Pay';
        html += '</a>';
        html += '</th>';
        html += '<th style="text-align:right;white-space:nowrap">';
        html += '<a>';
        html += 'Employee Tax';
        html += '</a>';
        html += '</th>';
        html += '<th style="text-align:right;">';
        html += '<a>';
        html += 'Deductions';
        html += '</a>';
        html += '</th>';
        html += '<th style="text-align:right;">';
        html += '<a>';
        html += 'Net Pay';
        html += '</a>';
        html += '</th>';
        html += '<th style="text-align:right;white-space:nowrap">';
        html += '<a>';
        html += 'Employer Tax';
        html += '</a>';
        html += '</th>';
        html += '<th style="text-align:right">';
        html += 'Total Cost';
        html += '</th>';
        html += '<th>';
        html += 'Pay Type';
        html += '</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        for (var i = 0; i < Employees.length; i++) {
            html += '<tr id="' + Employees[i].EmployeeId + '" class="' + (i % 2 == 0 ? "footable-even" : "footable-odd") + '">';
            if (Employees[i].PayCheckMainId > 0) {
                html += '<td class="hide"></td>';
                html += '<td class="hide">E</td>';
                html += '<td><a href="/Client/Main.html#ViewEmployee:' + Employees[i].EmployeeId + '" class="link">' + _.escape(Employees[i].FullName) + (Employees[i].PayType == 'Salary' ? ' (Salaried)' : '') + '</a></td>';
                html += '<td colspan="11"><a style="cursor:pointer" class="link" href="/Client/Main.html#ViewPayCheck:' + Employees[i].PayCheckId + '">' + accounting.formatMoney(Employees[i].NetPay) + ' check</a> paid on ' + FormatDateUTC(Employees[i].PayDate) + ' <a href="javascript:void(0)" class="link" onclick="NewRecord(' + Employees[i].EmployeeId + ')" >Create 2nd check</a></td>';
            }
            else {
                html += '<td class="hide"><input type="checkbox" name="chk"/></td>';
                html += '<td class="hide">E</td>';
                html += '<td style="white-space:nowrap"><a href="/Client/Main.html#ViewEmployee:' + Employees[i].EmployeeId + '" class="link">' + _.escape(Employees[i].FullName) + (Employees[i].PayType == 'Salary' ? ' (Salaried)' : '') + '</a></td>';
                if (Employees[i].PayType === 'Hourly') {
                    html += '<td style="text-align:right"><span id="' + Employees[i].EmployeeId + '_PayRatePerHour">' + accounting.formatMoney(Employees[i].PayRate) + '</span></td>';
                }
                else {
                    if ($('#hdnPayScheduleRecurrenceCode').val() === 'DA') {
                        html += '<td style="text-align:right"><span id="' + Employees[i].EmployeeId + '_PayRatePerHour">' + accounting.formatMoney(Employees[i].PayRate / 8) + '</span></td>';
                    }
                    else if ($('#hdnPayScheduleRecurrenceCode').val() === 'WW') {
                        html += '<td style="text-align:right"><span id="' + Employees[i].EmployeeId + '_PayRatePerHour">' + accounting.formatMoney(Employees[i].PayRate / 40) + '</span></td>';
                    }
                    else if ($('#hdnPayScheduleRecurrenceCode').val() === 'BW') {
                        html += '<td style="text-align:right"><span id="' + Employees[i].EmployeeId + '_PayRatePerHour">' + accounting.formatMoney(Employees[i].PayRate / 80) + '</span></td>';
                    }
                    else if ($('#hdnPayScheduleRecurrenceCode').val() === 'SM') {
                        html += '<td style="text-align:right"><span id="' + Employees[i].EmployeeId + '_PayRatePerHour">' + accounting.formatMoney(Employees[i].PayRate / 88) + '</span></td>';
                    }
                    else if ($('#hdnPayScheduleRecurrenceCode').val() === 'MM') {
                        html += '<td style="text-align:right"><span id="' + Employees[i].EmployeeId + '_PayRatePerHour">' + accounting.formatMoney(Employees[i].PayRate / 176) + '</span></td>';
                    }
                    else if ($('#hdnPayScheduleRecurrenceCode').val() === 'QQ') {
                        html += '<td style="text-align:right"><span id="' + Employees[i].EmployeeId + '_PayRatePerHour">' + accounting.formatMoney(Employees[i].PayRate / 528) + '</span></td>';
                    }
                    else if ($('#hdnPayScheduleRecurrenceCode').val() === 'SA') {
                        html += '<td style="text-align:right"><span id="' + Employees[i].EmployeeId + '_PayRatePerHour">' + accounting.formatMoney(Employees[i].PayRate / 1056) + '</span></td>';
                    }
                    else if ($('#hdnPayScheduleRecurrenceCode').val() === 'AA') {
                        html += '<td style="text-align:right"><span id="' + Employees[i].EmployeeId + '_PayRatePerHour">' + accounting.formatMoney(Employees[i].PayRate / 2112) + '</span></td>';
                    }
                }
                html += '<td style="text-align:right;" class="hide"><input id="' + Employees[i].EmployeeId + '_-1" class="form-control decimal" style="text-align:right;width:80px;" value="$0.00"/></td>';
                html += '<td style="text-align:right;"><input id="' + Employees[i].EmployeeId + '_-2" class="form-control decimal keyup" style="text-align:right;width:80px;" taxable="true" valuein="Hours" value="';
                if (Employees[i].PayType == 'Salary') {
                    if ($('#hdnPayScheduleRecurrenceCode').val() === 'DA') {
                        html += '8.00';
                    }
                    else if ($('#hdnPayScheduleRecurrenceCode').val() === 'WW') {
                        html += '40.00';
                    }
                    else if ($('#hdnPayScheduleRecurrenceCode').val() === 'BW') {
                        html += '80.00';
                    }
                    else if ($('#hdnPayScheduleRecurrenceCode').val() === 'SM') {
                        html += '88.00';
                    }
                    else if ($('#hdnPayScheduleRecurrenceCode').val() === 'MM') {
                        html += '176.00';
                    }
                    else if ($('#hdnPayScheduleRecurrenceCode').val() === 'QQ') {
                        html += '528.00';
                    }
                    else if ($('#hdnPayScheduleRecurrenceCode').val() === 'SA') {
                        html += '1056.00';
                    }
                    else if ($('#hdnPayScheduleRecurrenceCode').val() === 'AA') {
                        html += '2112.00';
                    }
                }
                else {
                    html += '0.00';
                }
                html += '" /></td>';
                html += '<td style="text-align:right;white-space:nowrap"><a id="' + Employees[i].EmployeeId + '_OtherEarnings" class="collapsible" href="javascript:void(0)">$0.00</a><div class="content">';
                html += '<table style="white-space:nowrap" class="hide">';
                html += '<tr><td>OT Hours:</td><td style="text-align:right;"><input id="' + Employees[i].EmployeeId + '_-3" class="form-control decimal keyup" style="text-align:right;width:80px;" taxable="true" valuein="Hours" value="0.00" paystubcode="OT"/></td></tr>';
                html += '<tr><td>Double OT Hours:</td><td style="text-align:right;"><input id="' + Employees[i].EmployeeId + '_-4" class="form-control decimal keyup" style="text-align:right;width:80px;" taxable="true" valuein="Hours" value="0.00" paystubcode="Double OT"/></td></tr>';
                html += '<tr><td>Sick Hours:</td><td style="text-align:right;"><input id="' + Employees[i].EmployeeId + '_-5" class="form-control decimal keyup" style="text-align:right;width:80px;" taxable="true" valuein="Hours" value="0.00"/></td></tr>';
                html += '<tr><td>Vacation Hours:</td><td style="text-align:right;"><input id="' + Employees[i].EmployeeId + '_-6" class="form-control decimal keyup" style="text-align:right;width:80px;" taxable="true" valuein="Hours" value="0.00"/></td></tr>';
                for (var j = 0; j < PayStubs.length; j++) {
                    if (PayStubs[j].PayStubType == 'Addition') {
                        var blnFound = false;
                        var PayStubCode = '';
                        var ValueIn = '';
                        for (var k = 0; k < PayStubAll.length; k++) {
                            if ((Employees[i].EmployeeId === PayStubAll[k].EmployeeId) && (PayStubs[j].PayStubId === PayStubAll[k].PayStubId)) {
                                blnFound = true;
                                ValueIn = PayStubs[j].ValueIn;
                                PayStubCode = PayStubs[j].PayStubCode;
                            }
                        }
                        if (blnFound) {
                            html += '<tr><td>' + PayStubs[j].PayStubName + ': </td><td><input id="' + Employees[i].EmployeeId + '_' + PayStubs[j].PayStubId + '" paystubtype="' + PayStubs[j].PayStubType + '" taxable="' + PayStubs[j].Taxable + '" valuein="' + PayStubs[j].ValueIn + '" paystubcode="' + PayStubs[j].PayStubCode + '" class="form-control decimal keyup ' + (ValueIn == 'Amount' ? ' textbox' : '') + '" style="text-align:right;width:80px;" value="' + (ValueIn == 'Amount' ? '$' : '') + '0.00"/></td>';
                        }
                    }
                }
                html += '</table>';
                html += '</div></td>';
                html += '<td style="text-align:right;"><span id="' + Employees[i].EmployeeId + '_GrossPay">$0.00</span></td>';
                html += '<td style="text-align:right;"><a id="' + Employees[i].EmployeeId + '_EmployeeTax" class="collapsible" href="javascript:void(0)">$0.00</a><div class="content">';
                html += '<table style="white-space:nowrap" class="hide">';
                html += '<tr><td>Federal Tax:</td><td><input id="' + Employees[i].EmployeeId + '_-7" class="form-control decimal keyup1 textbox" style="text-align:right;width:80px;" value="$0.00"/><td></tr>';
                html += '<tr><td>State Tax:</td><td><input id="' + Employees[i].EmployeeId + '_-8" class="form-control decimal keyup1 textbox" style="text-align:right;width:80px;" value="$0.00"/><td></tr>';
                html += '<tr><td>County Tax:</td><td><input id="' + Employees[i].EmployeeId + '_-9" class="form-control decimal keyup1 textbox" style="text-align:right;width:80px;" value="$0.00"/><td></tr>';
                html += '<tr><td>Social Security:</td><td><input id="' + Employees[i].EmployeeId + '_-10" class="form-control decimal keyup1 textbox" style="text-align:right;width:80px;" value="$0.00"/><td></tr>';
                html += '<tr><td>Medicare:</td><td><input id="' + Employees[i].EmployeeId + '_-11" class="form-control decimal keyup1 textbox" style="text-align:right;width:80px;" value="$0.00"/><td></tr>';
                html += '</table>';
                html += '</div></td>';
                html += '<td style="text-align:right;white-space:nowrap"><a id="' + Employees[i].EmployeeId + '_Deductions" class="collapsible" href="javascript:void(0)">$0.00</a><div class="content">';
                html += '<table style="white-space:nowrap" class="hide">';
                for (var j = 0; j < PayStubs.length; j++) {
                    if (PayStubs[j].PayStubType == 'Deduction') {
                        var blnFound = false;
                        var PayStubCode = '';
                        var ValueIn = '';
                        for (var k = 0; k < PayStubAll.length; k++) {
                            if ((Employees[i].EmployeeId === PayStubAll[k].EmployeeId) && (PayStubs[j].PayStubId === PayStubAll[k].PayStubId)) {
                                blnFound = true;
                                ValueIn = PayStubs[j].ValueIn;
                                PayStubCode = PayStubs[j].PayStubCode;
                            }
                        }
                        if (blnFound) {
                            html += '<tr><td>' + PayStubs[j].PayStubName + ': </td><td><input id="' + Employees[i].EmployeeId + '_' + PayStubs[j].PayStubId + '" paystubtype="' + PayStubs[j].PayStubType + '" taxable="' + PayStubs[j].Taxable + '" valuein="' + PayStubs[j].ValueIn + '" paystubcode="' + PayStubs[j].PayStubCode + '" class="form-control decimal keyup1 ' + (ValueIn == 'Amount' ? ' textbox' : '') + '" style="text-align:right;width:80px;" value="' + (ValueIn == 'Amount' ? '$' : '') + '0.00"/></td>';
                        }
                    }
                }
                html += '</table>';
                html += '</div></td>';
                html += '<td style="text-align:right;"><span id="' + Employees[i].EmployeeId + '_NetPay">$0.00</span></td>';
                html += '<td style="text-align:right;"><a id="' + Employees[i].EmployeeId + '_EmployerTax" class="collapsible" href="javascript:void(0)">$0.00</a><div class="content">';
                html += '<table style="white-space:nowrap" class="hide">';
                html += '<tr><td>FUTA:</td><td><input id="' + Employees[i].EmployeeId + '_-12" class="form-control decimal keyup1 textbox" style="text-align:right;width:80px;" value="$0.00"/><td></tr>';
                html += '<tr><td>SUI:</td><td><input id="' + Employees[i].EmployeeId + '_-13" class="form-control decimal keyup1 textbox" style="text-align:right;width:80px;" value="$0.00"/><td></tr>';
                html += '<tr><td>Social Security:</td><td><input id="' + Employees[i].EmployeeId + '_-14" class="form-control decimal keyup1 textbox" style="text-align:right;width:80px;" value="$0.00"/><td></tr>';
                html += '<tr><td>Medicare:</td><td><input id="' + Employees[i].EmployeeId + '_-15" class="form-control decimal keyup1 textbox" style="text-align:right;width:80px;" value="$0.00"/><td></tr>';
                html += '</table>';
                html += '</div></td>';
                html += '<td style="text-align:right;"><span id="' + Employees[i].EmployeeId + '_TotalCost">$0.00</span></td>';
                html += '<td><select id="' + Employees[i].EmployeeId + '_PayType" class="form-control"><option value="Check" ' + (Employees[i].PaymentMethod == 'Check' ? 'selected' : '') + '>Check</option><option value="Deposit" ' + (Employees[i].PaymentMethod == 'Deposit' ? 'selected' : '') + '>Direct Deposit</option></select></td>';
            }
            html += '</tr>';
        }
        var params = { ClientId: $.localStorage.get('ClientId') };
        var Contractors = CallService1('Client/Contractor/ContractorService.svc', 'GetLookup', params);
        if (Contractors.length > 0) {
            html += '<tr style="background-color:#4267b2!important; color:#fff">';
            html += '<th style="width: 25px" data-sort-ignore="true" class="hide">';
            html += '';
            html += '</th>';
            html += '<th class="hide">';
            html += '<a>';
            html += 'Type';
            html += '</a>';
            html += '</th>';
            html += '<th>';
            html += '<a>';
            html += 'Contractor Name';
            html += '</a>';
            html += '</th>';
            html += '<th style="text-align:right">';
            html += '<a>';
            html += 'Hourly Rate';
            html += '</a>';
            html += '</th>';
            html += '<th class="hide">';
            html += '<a>';
            html += 'Regular Pay';
            html += '</a>';
            html += '</th>';
            html += '<th>';
            html += '<a>';
            html += 'Regular Hrs.';
            html += '</a>';
            html += '</th>';            
            html += '<th>';
            html += '<a>';
            html += 'Reimbursement';
            html += '</a>';
            html += '</th>';
            html += '<th style="text-align:right;">';
            html += '<a>';
            html += 'Gross Pay';
            html += '</a>';
            html += '</th>';
            html += '<th style="text-align:right">';
            html += '<a>';
            html += '';
            html += '</a>';
            html += '</th>';
            html += '<th style="text-align:right;">';
            html += '<a>';
            html += 'Deductions';
            html += '</a>';
            html += '</th>';
            html += '<th style="text-align:right;">';
            html += '<a>';
            html += 'Net Pay';
            html += '</a>';
            html += '</th>';
            html += '<th style="text-align:right;white-space:nowrap">';
            html += '<a>';
            html += '';
            html += '</a>';
            html += '</th>';
            html += '<th style="text-align:right">';
            html += 'Total Cost';
            html += '</th>';
            html += '<th>';
            html += 'Pay Type';
            html += '</th>';
            html += '</tr>';
            for (var i = 0; i < Contractors.length; i++) {
                html += '<tr>';
                html += '<td class="hide"><input type="checkbox" name="chk"/></td>';
                html += '<td class="hide">C</td>';
                html += '<td style="white-space:nowrap"><a href="/Client/Main.html#ViewContractor:' + Contractors[i].ContractorId + '" class="link">' + _.escape(Contractors[i].Line1) + '</a></td>';
                html += '<td style="text-align:right">';
                html += '<span id="' + Contractors[i].ContractorId + '_PayRatePerHour_C">';
                html += '$30.00';
                html += '</span>';
                html += '</td>';
                html += '<td class="hide">';
                html += '<span id="' + Contractors[i].ContractorId + '_Payment_C">';
                html += '$0.00';
                html += '</span>';
                html += '</td>';
                html += '<td style="text-align:right;"><input id="' + Contractors[i].ContractorId + '_-16_C" class="form-control decimal keyup2" style="text-align:right;width:80px;" value="0.00" /></td>';
                html += '<td style="text-align:right;"><input id="' + Contractors[i].ContractorId + '_-17_C" class="form-control decimal keyup2 textbox" style="text-align:right;width:80px;" value="$0.00" /></td>';
                html += '<td style="text-align:right">';
                html += '<span id="' + Contractors[i].ContractorId + '_GrossPay_C">';
                html += '$0.00';
                html += '</span>';
                html += '</td>';
                html += '<td></td>';
                html += '<td style="text-align:right;"><input id="' + Contractors[i].ContractorId + '_-18_C" class="form-control decimal keyup2 textbox" style="text-align:right;width:80px;" value="$0.00" /></td>';
                html += '<td style="text-align:right">';
                html += '<span id="' + Contractors[i].ContractorId + '_NetPay_C">';
                html += '$0.00';
                html += '</span>';
                html += '</td>';
                html += '<td style="text-align:right;white-space:nowrap">';
                html += '</td>';
                html += '<td style="text-align:right">';
                html += '<span id="' + Contractors[i].ContractorId + '_TotalCost_C">';
                html += '$0.00';
                html += '</span>';
                html += '</td>';
                html += '<td>';
                html += '<select id="' + Contractors[i].ContractorId + '_PayType_C" class="form-control"><option value="Check" ' + (Contractors[i].PaymentMethod == 'Check' ? 'selected' : '') + '>Check</option><option value="Deposit" ' + (Contractors[i].PaymentMethod == 'Deposit' ? 'selected' : '') + '>Direct Deposit</option></select>';
                html += '</td>';
                html += '</tr>';
            }
        }
        html += '</tbody>';
        html += '</table>';
        $('#divEmployees').html(html);
        FocusInFocusOut();
        SetKeyPress();
        for (var i = 0; i < Employees.length; i++) {
            if (Employees[i].PayCheckMainId > 0) {
            }
            else {
                if (Employees[i].PayType == 'Salary') {
                    CalculateNetAmount1(Employees[i].EmployeeId);
                }
            }
        }
        $(".keyup").blur(function (e) {
            CalculateNetAmount1(e.target.id.split('_')[0]);
        });
        $(".keyup1").blur(function (e) {
            CalculateNetAmount3(e.target.id.split('_')[0]);
        });
        $(".keyup2").blur(function (e) {
            CalculateNetAmount4(e.target.id.split('_')[0]);
        });
        $('.collapsible').click(function () {
            if ($(this).parent().find('table').hasClass('hide')) {
                $(this).parent().find('table').removeClass('hide');
            }
            else {
                $(this).parent().find('table').addClass('hide');
            }
        });

        var coll = document.getElementsByClassName("collapsible");
        for (var i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        }
    }
}

function NewRecord(EmployeeId) {
    if (form.valid()) {
        $('#hdnEmployeeId').val(EmployeeId);
        var params = { ClientId: parseInt($.localStorage.get('ClientId'), 10), EmployeeId: parseInt($('#hdnEmployeeId').val(), 10) };
        var dtoEmployee = CallService1('Client/EmployeeService.svc', 'GetObject', params);
        $('.modal-title').html('Create Pay Check for ' + dtoEmployee.FullName);
        $('#spanPayRate').html(accounting.formatMoney(dtoEmployee.PayRate));
        $('#cmbPayType').val(dtoEmployee.PaymentMethod);
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
            PayScheduleId: $('#hdnPayScheduleId').val(),
            EmployeeId: EmployeeId
        };
        var arrPayStubs = CallService1('Client/PayStubService.svc', 'GetByEmployeeIdPayStubs', params);

        if (arrPayStubs != undefined) {
            var html = '';
            var html1 = '';
            for (var i = 0; i < arrPayStubs.length; i++) {
                if (arrPayStubs[i].PayStubType === 'Addition') {
                    html += '<tr id="' + arrPayStubs[i].PayStubId + '" taxable="' + arrPayStubs[i].Taxable + '">';
                    html += '<td style="white-space:nowrap"><span class="paystubname">' + _.escape(arrPayStubs[i].PayStubName) + (arrPayStubs[i].ValueIn == 'Hours' ? '(Hrs.)' : '') + '</span></td>';
                    html += '<td><input style="width:100px;text-align:right" class="form-control decimal ' + (arrPayStubs[i].ValueIn == 'Hours' ? '' : 'textbox') + '" value="' + (arrPayStubs[i].ValueIn == 'Hours' ? '' : '$') + '0.00" valuein="' + arrPayStubs[i].ValueIn + '" paystubcode="' + arrPayStubs[i].PayStubCode + '" onblur="CalculateNetAmount()"></input></td>';
                    html += '</tr>';
                }
                else {
                    html1 += '<tr id="' + arrPayStubs[i].PayStubId + '" taxable="' + arrPayStubs[i].Taxable + '">';
                    html1 += '<td style="white-space:nowrap"><span class="paystubname">' + _.escape(arrPayStubs[i].PayStubName) + (arrPayStubs[i].ValueIn == 'Hours' ? '(Hrs.)' : '') + '</span></td>';
                    html1 += '<td><input style="width:100px;text-align:right" class="form-control decimal ' + (arrPayStubs[i].ValueIn == 'Hours' ? '' : 'textbox') + '" value="' + (arrPayStubs[i].ValueIn == 'Hours' ? '' : '$') + '0.00"  valuein="' + arrPayStubs[i].ValueIn + '" paystubcode="' + arrPayStubs[i].PayStubCode + '" onblur="CalculateNetAmount()"></input></td>';
                    html1 += '</tr>';
                }
            }
            var htmlBefore = '';
            htmlBefore += '<tr id="-1" taxable="true">';
            htmlBefore += '<td class="white-space:nowrap"><span class="paystubname">Regular Pay</span></td>';
            htmlBefore += '<td><input id="txtRegularPay" class="form-control decimal" style="width:100px;text-align:right" disabled value="0.00"></input></td>';
            htmlBefore += '</tr>';
            htmlBefore += '<tr id="-3" taxable="true">';
            htmlBefore += '<td class="white-space:nowrap"><span class="paystubname">OT Hours</span></td>';
            htmlBefore += '<td><input id="txtOTHours" paystubcode="OT" taxable="true" class="form-control decimal" style="width:100px;text-align:right" value="0.00" valuein="Hours" onblur="CalculateNetAmount()"></input></td>';
            htmlBefore += '</tr>';
            htmlBefore += '<tr id="-4" taxable="true">';
            htmlBefore += '<td class="white-space:nowrap"><span class="paystubname">Double OT Hours</span></td>';
            htmlBefore += '<td><input id="txtDoubleOTHours" paystubcode="Double OT" taxable="true" class="form-control decimal" style="width:100px;text-align:right" value="0.00" valuein="Hours" onblur="CalculateNetAmount()"></input></td>';
            htmlBefore += '</tr>';
            htmlBefore += '<tr id="-5" taxable="true">';
            htmlBefore += '<td class="white-space:nowrap"><span class="paystubname">Sick Hours</span></td>';
            htmlBefore += '<td><input id="txtSickHours" taxable="true" class="form-control decimal" style="width:100px;text-align:right" value="0.00" valuein="Hours" onblur="CalculateNetAmount()"></input></td>';
            htmlBefore += '</tr>';
            htmlBefore += '<tr id="-6" taxable="true">';
            htmlBefore += '<td class="white-space:nowrap"><span class="paystubname">Vacation Hours</span></td>';
            htmlBefore += '<td><input id="txtVacationHours" taxable="true" class="form-control decimal" style="width:100px;text-align:right" value="0.00" valuein="Hours" onblur="CalculateNetAmount()"></input></td>';
            htmlBefore += '</tr>';

            var htmlAfter = '';
            htmlAfter += '<tr id="-7" taxable="false">';
            htmlAfter += '<td class="white-space:nowrap"><span class="paystubname">Federal Tax</span></td>';
            htmlAfter += '<td><input id="txtFederalTaxAmount" class="form-control decimal textbox" style="width:100px;text-align:right" value="$0.00" onblur="CalculateNetAmount2()"></input></td>';
            htmlAfter += '</tr>';
            htmlAfter += '<tr id="-8" taxable="false">';
            htmlAfter += '<td class="white-space:nowrap"><span id="spanStateTax" class="paystubname">State Tax</span></td>';
            htmlAfter += '<td><input id="txtStateTaxAmount" class="form-control decimal textbox" style="width:100px;text-align:right" value="$0.00" onblur="CalculateNetAmount2()"></input></td>';
            htmlAfter += '</tr>';
            htmlAfter += '<tr id="-9" taxable="false">';
            htmlAfter += '<td class="white-space:nowrap"><span id="spanCountyTax" class="paystubname">County Tax</span></td>';
            htmlAfter += '<td><input id="txtCountyTaxAmount" class="form-control decimal textbox" style="width:100px;text-align:right" value="$0.00" onblur="CalculateNetAmount2()"></input></td>';
            htmlAfter += '</tr>';
            htmlAfter += '<tr id="-10" taxable="false">';
            htmlAfter += '<td class="white-space:nowrap"><span class="paystubname">Social Security</span></td>';
            htmlAfter += '<td><input id="txtSocialSecurityTaxAmount" class="form-control decimal textbox" style="width:100px;text-align:right" value="$0.00" onblur="CalculateNetAmount2()"></input></td>';
            htmlAfter += '</tr>';
            htmlAfter += '<tr id="-11" taxable="false">';
            htmlAfter += '<td class="white-space:nowrap"><span class="paystubname">Medicare</span></td>';
            htmlAfter += '<td><input id="txtMedicareTaxAmount" class="form-control decimal textbox" style="width:100px;text-align:right" value="$0.00" onblur="CalculateNetAmount2()"></input></td>';
            htmlAfter += '</tr>';
            htmlAfter += '<tr class="hide" id="-12" taxable="false">';
            htmlAfter += '<td class="white-space:nowrap"><span class="paystubname">FUTA Employer</span></td>';
            htmlAfter += '<td><input id="txtEmployerFUTATaxAmount" class="form-control decimal textbox" style="width:100px;text-align:right" value="$0.00"></input></td>';
            htmlAfter += '</tr>';
            htmlAfter += '<tr class="hide" id="-14" taxable="false">';
            htmlAfter += '<td class="white-space:nowrap"><span class="paystubname">Social Security Employer</span></td>';
            htmlAfter += '<td><input id="txtEmployerSocialSecurityTaxAmount" class="form-control decimal textbox" style="width:100px;text-align:right" value="$0.00"></input></td>';
            htmlAfter += '</tr>';
            htmlAfter += '<tr class="hide" id="-15" taxable="false">';
            htmlAfter += '<td class="white-space:nowrap"><span class="paystubname">Medicare Employer</span></td>';
            htmlAfter += '<td><input id="txtEmployerMedicareTaxAmount" class="form-control decimal textbox" style="width:100px;text-align:right" value="$0.00"></input></td>';
            htmlAfter += '</tr>';
            htmlAfter += '<tr class="hide" id="-13" taxable="false">';
            htmlAfter += '<td class="white-space:nowrap"><span class="paystubname">SUI Employer</span></td>';
            htmlAfter += '<td><input id="txtEmployerSUITaxAmount" class="form-control decimal textbox" style="width:100px;text-align:right" value="$0.00"></input></td>';
            htmlAfter += '</tr>';
            //htmlAfter += '<tr class="hide" id="-12" taxable="false">';
            //htmlAfter += '<td class="white-space:nowrap"><span id="spanAdminAssessment" class="paystubname">Administrative Assessment</span></td>';
            //htmlAfter += '<td><input id="txtEmployerAdminAssessmentTaxAmount" class="form-control decimal textbox" style="width:100px;text-align:right" value="$0.00"></input></td>';
            //htmlAfter += '</tr>';
            $('#bodyAddition').html(htmlBefore + html);
            $('#bodyDeduction').html(html1 + htmlAfter);
        }
        $('#spanStateTax').html(dtoEmployee.StateCode1 + ' State Tax');
        //$('#spanAdminAssessment').html(dtoEmployee.StateCode1 + ' Administrative Assessment');
        $('#txtRegularHours').val('0.00');
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
        FocusInFocusOut();
    }
}
function FocusInFocusOut() {
    $('.textbox').off('focusout');
    $('.textbox').off('focusin');
    $('.textbox').focusout(function () {
        if ($(this).val().trim() == '') {
            $(this).val('0');
        }
        $(this).val(accounting.formatMoney($(this).val()));
    })
    $('.textbox').focusin(function () {
        $(this).val($(this).val().replace('$', '').replace(',', ''));
    })
}
function SetKeyPress() {
    //$('.decimal').keypress(function (event) {
    //    return isNumber(event, this)
    //}).bind('blur', function () {
    //    var num;
    //    num = parseFloat($(this).val());
    //    num = isNaN(num) ? '0.00' : num;
    //    if (num && num < 0) num = num * -1;
    //    $(this).val(parseFloat(num).toFixed(2));
    //});
}
function CalculateNetAmount4(ContractorId) {
    $('#' + ContractorId + '_Payment_C').html(accounting.formatMoney($('#' + ContractorId + '_-16_C').val() * $('#' + ContractorId + '_PayRatePerHour_C').html().replace('$', '').replace(',', '')));
    var NetAmount = parseFloat($('#' + ContractorId + '_Payment_C').html().replace('$', '').replace(',', ''));
    NetAmount += parseFloat($('#' + ContractorId + '_-17_C').val().replace('$', '').replace(',', ''));
    $('#' + ContractorId + '_GrossPay_C').html(accounting.formatMoney(NetAmount));
    NetAmount -= parseFloat($('#' + ContractorId + '_-18_C').val().replace('$', '').replace(',', ''));
    $('#' + ContractorId + '_NetPay_C').html(accounting.formatMoney(NetAmount));
    $('#' + ContractorId + '_TotalCost_C').html(accounting.formatMoney(NetAmount));
}
function CalculateNetAmount3(EmployeeId) {
    $('#' + EmployeeId + '_-1').val(accounting.formatMoney($('#' + EmployeeId + '_-2').val() * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', '')));
    var TaxableAmount = parseFloat($('#' + EmployeeId + '_-1').val().replace('$', '').replace(',', ''));
    var NetAmount = TaxableAmount;
    //TaxableAmount += parseFloat($('#' + EmployeeId + '_-3').val() * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', '') * 1.5);
    //NetAmount += parseFloat($('#' + EmployeeId + '_-3').val() * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', '') * 1.5);
    //TaxableAmount += parseFloat($('#' + EmployeeId + '_-4').val() * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', '') * 2);
    //NetAmount += parseFloat($('#' + EmployeeId + '_-4').val() * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', '') * 2);
    //TaxableAmount += parseFloat($('#' + EmployeeId + '_-5').val() * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', ''));
    //NetAmount += parseFloat($('#' + EmployeeId + '_-5').val() * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', ''));
    //TaxableAmount += parseFloat($('#' + EmployeeId + '_-6').val() * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', ''));
    //NetAmount += parseFloat($('#' + EmployeeId + '_-6').val() * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', ''));

    var OtherEarnings = 0;
    var cell = $(document.getElementById(EmployeeId + '_-1').closest('tr').cells[6]).find('.form-control');
    for (j = 0; j < cell.length; j++) {
        if ($(cell[j]).attr('taxable') == 'true') {
            if ($(cell[j]).attr('valuein') == 'Hours') {
                //OtherEarnings += parseFloat($(cell[j]).val().replace('$', '').replace(',', '') * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', ''));
                //TaxableAmount += parseFloat($(cell[j]).val().replace('$', '').replace(',', '') * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', ''));
                if ($(cell[j]).attr('paystubcode') == 'OT') {
                    NetAmount += parseFloat($(cell[j]).val().replace('$', '').replace(',', '') * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', '') * 1.5);
                }
                else if ($(cell[j]).attr('paystubcode') == 'Double OT') {
                    NetAmount += parseFloat($(cell[j]).val().replace('$', '').replace(',', '') * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', '') * 2);
                }
                else {
                    NetAmount += parseFloat($(cell[j]).val().replace('$', '').replace(',', '') * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', ''));
                }
            }
            else {
                //OtherEarnings += parseFloat($(cell[j]).val().replace('$', '').replace(',', ''));
                //TaxableAmount += parseFloat($(cell[j]).val().replace('$', '').replace(',', ''));
                NetAmount += parseFloat($(cell[j]).val().replace('$', '').replace(',', ''));
            }
        }
        else {
            if ($(cell[j]).attr('valuein') == 'Hours') {
                //OtherEarnings += parseFloat($(cell[j]).val().replace('$', '').replace(',', '') * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', ''));
                NetAmount += parseFloat($(cell[j]).val().replace('$', '').replace(',', '') * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', ''));
            }
            else {
                //OtherEarnings += parseFloat($(cell[j]).val().replace('$', '').replace(',', ''));
                NetAmount += parseFloat($(cell[j]).val().replace('$', '').replace(',', ''));
            }
        }
    }
    //$('#' + EmployeeId + '_OtherEarnings').html(accounting.formatMoney(OtherEarnings));
    //$('#' + EmployeeId + '_GrossPay').html(accounting.formatMoney(NetAmount));
    var TotalCost = NetAmount;

    //var params = { EmployeeId: EmployeeId, TaxableAmount: TaxableAmount };
    //var dtoTax = CallService1('Client/PayCheckService.svc', 'GetTax', params)
    //var params = { ClientId: $.localStorage.get('ClientId'), EmployeeId: EmployeeId, PayCheckId: 0, TaxableAmount: TaxableAmount };
    //var SUITaxAmount = CallService1('Client/PayCheckService.svc', 'GetSUITax', params)
    //$('#' + EmployeeId + '_-10').val(accounting.formatMoney(dtoTax.SocialSecurityTaxAmount));
    //$('#' + EmployeeId + '_-11').val(accounting.formatMoney(dtoTax.MedicareTaxAmount));
    //$('#' + EmployeeId + '_-12').val(accounting.formatMoney(dtoTax.EmployerFUTATaxAmount));
    //$('#' + EmployeeId + '_-13').val(accounting.formatMoney(SUITaxAmount));
    //$('#' + EmployeeId + '_-14').val(accounting.formatMoney(dtoTax.EmployerSocialSecurityTaxAmount));
    //$('#' + EmployeeId + '_-15').val(accounting.formatMoney(dtoTax.EmployerMedicareTaxAmount));

    //var params = { EmployeeId: EmployeeId, TaxableAmount: TaxableAmount };
    //var FederalTaxAmount = CallService1('Client/PayCheckService.svc', 'GetFederalTax', params);
    //$('#' + EmployeeId + '_-7').val(accounting.formatMoney(FederalTaxAmount));

    //var params = { EmployeeId: EmployeeId, TaxableAmount: TaxableAmount };
    //var StateTaxAmount = CallService1('Client/PayCheckService.svc', 'GetStateTax', params);
    //$('#' + EmployeeId + '_-8').val(accounting.formatMoney(StateTaxAmount));

    var EmployeeTax = 0;
    EmployeeTax += parseFloat($('#' + EmployeeId + '_-7').val().replace('$', '').replace(',', ''));
    EmployeeTax += parseFloat($('#' + EmployeeId + '_-8').val().replace('$', '').replace(',', ''));
    EmployeeTax += parseFloat($('#' + EmployeeId + '_-9').val().replace('$', '').replace(',', ''));
    EmployeeTax += parseFloat($('#' + EmployeeId + '_-10').val().replace('$', '').replace(',', ''));
    EmployeeTax += parseFloat($('#' + EmployeeId + '_-11').val().replace('$', '').replace(',', ''));
    $('#' + EmployeeId + '_EmployeeTax').html(accounting.formatMoney(EmployeeTax));
    NetAmount -= EmployeeTax;

    var Deductions = 0;
    var cell = $(document.getElementById(EmployeeId + '_-1').closest('tr').cells[9]).find('.form-control');
    for (j = 0; j < cell.length; j++) {
        if ($(cell[j]).attr('valuein') == 'Hours') {
            Deductions += parseFloat($(cell[j]).val().replace('$', '').replace(',', '') * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', ''));
        }
        else {
            Deductions += parseFloat($(cell[j]).val().replace('$', '').replace(',', ''));
        }
    }
    $('#' + EmployeeId + '_Deductions').html(accounting.formatMoney(Deductions));
    NetAmount -= Deductions;
    $('#' + EmployeeId + '_NetPay').html(accounting.formatMoney(NetAmount));
    TotalCost -= Deductions;

    var EmployerTax = 0;
    EmployerTax += parseFloat($('#' + EmployeeId + '_-12').val().replace('$', '').replace(',', ''));
    EmployerTax += parseFloat($('#' + EmployeeId + '_-13').val().replace('$', '').replace(',', ''));
    EmployerTax += parseFloat($('#' + EmployeeId + '_-14').val().replace('$', '').replace(',', ''));
    EmployerTax += parseFloat($('#' + EmployeeId + '_-15').val().replace('$', '').replace(',', ''));
    $('#' + EmployeeId + '_EmployerTax').html(accounting.formatMoney(EmployerTax));

    TotalCost += EmployerTax;
    $('#' + EmployeeId + '_TotalCost').html(accounting.formatMoney(TotalCost));
}
function CalculateNetAmount1(EmployeeId) {
    $('#' + EmployeeId + '_-1').val(accounting.formatMoney($('#' + EmployeeId + '_-2').val() * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', '')));
    var TaxableAmount = parseFloat($('#' + EmployeeId + '_-1').val().replace('$', '').replace(',', ''));
    var NetAmount = TaxableAmount;
    //TaxableAmount += parseFloat($('#' + EmployeeId + '_-3').val() * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', '') * 1.5);
    //NetAmount += parseFloat($('#' + EmployeeId + '_-3').val() * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', '') * 1.5);
    //TaxableAmount += parseFloat($('#' + EmployeeId + '_-4').val() * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', '') * 2);
    //NetAmount += parseFloat($('#' + EmployeeId + '_-4').val() * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', '') * 2);
    //TaxableAmount += parseFloat($('#' + EmployeeId + '_-5').val() * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', ''));
    //NetAmount += parseFloat($('#' + EmployeeId + '_-5').val() * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', ''));
    //TaxableAmount += parseFloat($('#' + EmployeeId + '_-6').val() * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', ''));
    //NetAmount += parseFloat($('#' + EmployeeId + '_-6').val() * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', ''));

    var OtherEarnings = 0;
    var cell = $(document.getElementById(EmployeeId + '_-1').closest('tr').cells[6]).find('.form-control');
    for (j = 0; j < cell.length; j++) {
        if ($(cell[j]).attr('taxable') == 'true') {
            if ($(cell[j]).attr('valuein') == 'Hours') {
                if ($(cell[j]).attr('paystubcode') == 'OT') {
                    OtherEarnings += parseFloat($(cell[j]).val().replace('$', '').replace(',', '') * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', '') * 1.5);
                    TaxableAmount += parseFloat($(cell[j]).val().replace('$', '').replace(',', '') * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', '') * 1.5);
                    NetAmount += parseFloat($(cell[j]).val().replace('$', '').replace(',', '') * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', '') * 1.5);
                }
                else if ($(cell[j]).attr('paystubcode') == 'Double OT') {
                    OtherEarnings += parseFloat($(cell[j]).val().replace('$', '').replace(',', '') * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', '') * 2);
                    TaxableAmount += parseFloat($(cell[j]).val().replace('$', '').replace(',', '') * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', '') * 2);
                    NetAmount += parseFloat($(cell[j]).val().replace('$', '').replace(',', '') * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', '') * 2);
                }
                else {
                    OtherEarnings += parseFloat($(cell[j]).val().replace('$', '').replace(',', '') * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', ''));
                    TaxableAmount += parseFloat($(cell[j]).val().replace('$', '').replace(',', '') * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', ''));
                    NetAmount += parseFloat($(cell[j]).val().replace('$', '').replace(',', '') * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', ''));
                }
            }
            else {
                OtherEarnings += parseFloat($(cell[j]).val().replace('$', '').replace(',', ''));
                TaxableAmount += parseFloat($(cell[j]).val().replace('$', '').replace(',', ''));
                NetAmount += parseFloat($(cell[j]).val().replace('$', '').replace(',', ''));
            }
        }
        else {
            if ($(cell[j]).attr('valuein') == 'Hours') {
                OtherEarnings += parseFloat($(cell[j]).val().replace('$', '').replace(',', '') * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', ''));
                NetAmount += parseFloat($(cell[j]).val().replace('$', '').replace(',', '') * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', ''));
            }
            else {
                OtherEarnings += parseFloat($(cell[j]).val().replace('$', '').replace(',', ''));
                NetAmount += parseFloat($(cell[j]).val().replace('$', '').replace(',', ''));
            }
        }
    }
    $('#' + EmployeeId + '_OtherEarnings').html(accounting.formatMoney(OtherEarnings));
    $('#' + EmployeeId + '_GrossPay').html(accounting.formatMoney(NetAmount));
    var TotalCost = NetAmount;

    var params = { EmployeeId: EmployeeId, TaxableAmount: TaxableAmount };
    var dtoTax = CallService1('Client/PayCheckService.svc', 'GetTax', params)
    var params = { ClientId: $.localStorage.get('ClientId'), EmployeeId: EmployeeId, PayCheckId: 0, TaxableAmount: TaxableAmount };
    var SUITaxAmount = CallService1('Client/PayCheckService.svc', 'GetSUITax', params)
    $('#' + EmployeeId + '_-10').val(accounting.formatMoney(dtoTax.SocialSecurityTaxAmount));
    $('#' + EmployeeId + '_-11').val(accounting.formatMoney(dtoTax.MedicareTaxAmount));
    $('#' + EmployeeId + '_-12').val(accounting.formatMoney(dtoTax.EmployerFUTATaxAmount));
    $('#' + EmployeeId + '_-13').val(accounting.formatMoney(SUITaxAmount));
    $('#' + EmployeeId + '_-14').val(accounting.formatMoney(dtoTax.EmployerSocialSecurityTaxAmount));
    $('#' + EmployeeId + '_-15').val(accounting.formatMoney(dtoTax.EmployerMedicareTaxAmount));

    var params = { EmployeeId: EmployeeId, TaxableAmount: TaxableAmount };
    var FederalTaxAmount = CallService1('Client/PayCheckService.svc', 'GetFederalTax', params);
    $('#' + EmployeeId + '_-7').val(accounting.formatMoney(FederalTaxAmount));

    var params = { EmployeeId: EmployeeId, TaxableAmount: TaxableAmount };
    var StateTaxAmount = CallService1('Client/PayCheckService.svc', 'GetStateTax', params);
    $('#' + EmployeeId + '_-8').val(accounting.formatMoney(StateTaxAmount));

    var EmployeeTax = 0;
    EmployeeTax += parseFloat($('#' + EmployeeId + '_-7').val().replace('$', '').replace(',', ''));
    EmployeeTax += parseFloat($('#' + EmployeeId + '_-8').val().replace('$', '').replace(',', ''));
    EmployeeTax += parseFloat($('#' + EmployeeId + '_-9').val().replace('$', '').replace(',', ''));
    EmployeeTax += parseFloat($('#' + EmployeeId + '_-10').val().replace('$', '').replace(',', ''));
    EmployeeTax += parseFloat($('#' + EmployeeId + '_-11').val().replace('$', '').replace(',', ''));
    $('#' + EmployeeId + '_EmployeeTax').html(accounting.formatMoney(EmployeeTax));
    NetAmount -= EmployeeTax;

    var Deductions = 0;
    var cell = $(document.getElementById(EmployeeId + '_-1').closest('tr').cells[9]).find('.form-control');
    for (j = 0; j < cell.length; j++) {
        if ($(cell[j]).attr('valuein') == 'Hours') {
            Deductions += parseFloat($(cell[j]).val().replace('$', '').replace(',', '') * $('#' + EmployeeId + '_PayRatePerHour').html().replace('$', '').replace(',', ''));
        }
        else {
            Deductions += parseFloat($(cell[j]).val().replace('$', '').replace(',', ''));
        }
    }
    $('#' + EmployeeId + '_Deductions').html(accounting.formatMoney(Deductions));
    NetAmount -= Deductions;
    $('#' + EmployeeId + '_NetPay').html(accounting.formatMoney(NetAmount));
    TotalCost -= Deductions;

    var EmployerTax = 0;
    EmployerTax += parseFloat($('#' + EmployeeId + '_-12').val().replace('$', '').replace(',', ''));
    EmployerTax += parseFloat($('#' + EmployeeId + '_-13').val().replace('$', '').replace(',', ''));
    EmployerTax += parseFloat($('#' + EmployeeId + '_-14').val().replace('$', '').replace(',', ''));
    EmployerTax += parseFloat($('#' + EmployeeId + '_-15').val().replace('$', '').replace(',', ''));
    $('#' + EmployeeId + '_EmployerTax').html(accounting.formatMoney(EmployerTax));

    TotalCost += EmployerTax;
    $('#' + EmployeeId + '_TotalCost').html(accounting.formatMoney(TotalCost));
}

function CalculateNetAmount() {
    if ($('#spanPayType').html() === 'Per Hour') {
        $('#txtRegularPay').val(accounting.formatMoney($('#spanPayRate').html().replace('$', '').replace(',', '') * $("#txtRegularHours").val()));
        $('#spanPayRatePerHour').html($('#spanPayRate').html().replace('$', '').replace(',', ''));
    }
    else {
        if ($('#spanPayType').html() === 'Per Day') {
            $('#txtRegularPay').val(accounting.formatMoney(($('#spanPayRate').html().replace('$', '').replace(',', '') / 8) * $("#txtRegularHours").val()));
            $('#spanPayRatePerHour').html(accounting.toFixed($('#spanPayRate').html().replace('$', '').replace(',', '') / 8), 2);
        }
        else if ($('#spanPayType').html() === 'Per Week') {
            $('#txtRegularPay').val(accounting.formatMoney(($('#spanPayRate').html().replace('$', '').replace(',', '') / 40) * $("#txtRegularHours").val()));
            $('#spanPayRatePerHour').html(accounting.toFixed($('#spanPayRate').html().replace('$', '').replace(',', '') / 40), 2);
        }
        else if ($('#spanPayType').html() === 'Per Bi-Week') {
            $('#txtRegularPay').val(accounting.formatMoney(($('#spanPayRate').html().replace('$', '').replace(',', '') / 80) * $("#txtRegularHours").val()));
            $('#spanPayRatePerHour').html(accounting.toFixed($('#spanPayRate').html().replace('$', '').replace(',', '') / 80), 2);
        }
        else if ($('#spanPayType').html() === 'Per Semi-Month') {
            $('#txtRegularPay').val(accounting.formatMoney(($('#spanPayRate').html().replace('$', '').replace(',', '') / 88) * $("#txtRegularHours").val()));
            $('#spanPayRatePerHour').html(accounting.toFixed($('#spanPayRate').html().replace('$', '').replace(',', '') / 88), 2);
        }
        else if ($('#spanPayType').html() === 'Per Month') {
            $('#txtRegularPay').val(accounting.formatMoney(($('#spanPayRate').html().replace('$', '').replace(',', '') / 176) * $("#txtRegularHours").val()));
            $('#spanPayRatePerHour').html(accounting.toFixed($('#spanPayRate').html().replace('$', '').replace(',', '') / 176), 2);
        }
        else if ($('#spanPayType').html() === 'Per Quarter') {
            $('#txtRegularPay').val(accounting.formatMoney(($('#spanPayRate').html().replace('$', '').replace(',', '') / 528) * $("#txtRegularHours").val()));
            $('#spanPayRatePerHour').html(accounting.toFixed($('#spanPayRate').html().replace('$', '').replace(',', '') / 528), 2);
        }
        else if ($('#spanPayType').html() === 'Per Semi-Annual') {
            $('#txtRegularPay').val(accounting.formatMoney(($('#spanPayRate').html().replace('$', '').replace(',', '') / 1056) * $("#txtRegularHours").val()));
            $('#spanPayRatePerHour').html(accounting.toFixed($('#spanPayRate').html().replace('$', '').replace(',', '') / 1056), 2);
        }
        else if ($('#spanPayType').html() === 'Per Year') {
            $('#txtRegularPay').val(accounting.formatMoney(($('#spanPayRate').html().replace('$', '').replace(',', '') / 2112) * $("#txtRegularHours").val()));
            $('#spanPayRatePerHour').html(accounting.toFixed($('#spanPayRate').html().replace('$', '').replace(',', '') / 2112), 2);
        }
    }

    var TaxableAmount = 0;
    var NetAmount = 0;
    $('#txtFederalTaxAmount').val('$0.00');
    $('#txtStateTaxAmount').val('$0.00');
    $('#txtSocialSecurityTaxAmount').val('$0.00');
    $('#txtMedicareTaxAmount').val('$0.00');
    $('#bodyAddition > tr').each(function () {
        var $this = $(this);
        if ($this.attr('taxable') == 'true') {
            if ($this.find('.form-control').attr('valuein') == 'Hours') {
                if ($this.find('.form-control').attr('paystubcode') == 'OT') {
                    TaxableAmount += parseFloat($this.find('.form-control').val() * $('#spanPayRatePerHour').html().replace('$', '').replace(',', '') * 1.5);
                    NetAmount += parseFloat($this.find('.form-control').val() * $('#spanPayRatePerHour').html().replace('$', '').replace(',', '') * 1.5);
                }
                else if ($this.find('.form-control').attr('paystubcode') == 'Double OT') {
                    TaxableAmount += parseFloat($this.find('.form-control').val() * $('#spanPayRatePerHour').html().replace('$', '').replace(',', '') * 2);
                    NetAmount += parseFloat($this.find('.form-control').val() * $('#spanPayRatePerHour').html().replace('$', '').replace(',', '') * 2);
                }
                else {
                    TaxableAmount += parseFloat($this.find('.form-control').val() * $('#spanPayRatePerHour').html().replace('$', '').replace(',', ''));
                    NetAmount += parseFloat($this.find('.form-control').val() * $('#spanPayRatePerHour').html().replace('$', '').replace(',', ''));
                }
            }
            else {
                TaxableAmount += parseFloat($this.find('.form-control').val().replace('$', '').replace(',', ''));
                NetAmount += parseFloat($this.find('.form-control').val().replace('$', '').replace(',', ''));
            }
        }
        else {
            NetAmount += parseFloat($this.find('.form-control').val().replace('$', '').replace(',', ''));
        }
    });

    var params = { EmployeeId: $('#hdnEmployeeId').val(), TaxableAmount: TaxableAmount };
    var dtoTax = CallService1('Client/PayCheckService.svc', 'GetTax', params)
    var params = { ClientId: $.localStorage.get('ClientId'), EmployeeId: $('#hdnEmployeeId').val(), PayCheckId: 0, TaxableAmount: TaxableAmount };
    var SUITaxAmount = CallService1('Client/PayCheckService.svc', 'GetSUITax', params)
    $("#txtEmployerSUITaxAmount").val(accounting.formatMoney(SUITaxAmount));
    $('#txtSocialSecurityTaxAmount').val(accounting.formatMoney(dtoTax.SocialSecurityTaxAmount));
    $('#txtMedicareTaxAmount').val(accounting.formatMoney(dtoTax.MedicareTaxAmount));
    $('#txtEmployerSocialSecurityTaxAmount').val(accounting.formatMoney(dtoTax.EmployerSocialSecurityTaxAmount));
    $('#txtEmployerMedicareTaxAmount').val(accounting.formatMoney(dtoTax.EmployerMedicareTaxAmount));
    $('#txtEmployerFUTATaxAmount').val(accounting.formatMoney(dtoTax.EmployerFUTATaxAmount));
    $('#bodyDeduction > tr').each(function () {
        var $this = $(this);
        if ($this.attr('taxable') == 'true') {
            TaxableAmount += parseFloat($this.find('.form-control').val().replace('$', '').replace(',', ''));
        }
        if (($this.attr('id') != -12) && ($this.attr('id') != -13) && ($this.attr('id') != -14) && ($this.attr('id') != -15)) {
            NetAmount -= parseFloat($this.find('.form-control').val().replace('$', '').replace(',', ''));
        }
    });

    var params = { EmployeeId: $('#hdnEmployeeId').val(), TaxableAmount: TaxableAmount };
    var FederalTaxAmount = CallService1('Client/PayCheckService.svc', 'GetFederalTax', params);
    $('#txtFederalTaxAmount').val(accounting.formatMoney(FederalTaxAmount));
    NetAmount -= accounting.toFixed(FederalTaxAmount, 2);

    var params = { EmployeeId: $('#hdnEmployeeId').val(), TaxableAmount: TaxableAmount };
    var StateTaxAmount = CallService1('Client/PayCheckService.svc', 'GetStateTax', params);
    $('#txtStateTaxAmount').val(accounting.formatMoney(StateTaxAmount));
    NetAmount -= accounting.toFixed(StateTaxAmount, 2);

    $('#spanNetAmount').html(accounting.formatMoney(NetAmount));
}
function CalculateNetAmount2() {
    var TaxableAmount = 0;
    var NetAmount = 0;
    $('#bodyAddition > tr').each(function () {
        var $this = $(this);
        if ($this.attr('taxable') == 'true') {
            if ($this.find('.form-control').attr('valuein') == 'Hours') {
                if ($this.find('.form-control').attr('paystubcode') == 'OT') {
                    //TaxableAmount += parseFloat($this.find('.form-control').val() * $('#spanPayRate').html().replace('$', '').replace(',', '') * 1.5);
                    NetAmount += parseFloat($this.find('.form-control').val() * $('#spanPayRate').html().replace('$', '').replace(',', '') * 1.5);
                }
                else if ($this.find('.form-control').attr('paystubcode') == 'Double OT') {
                    //TaxableAmount += parseFloat($this.find('.form-control').val() * $('#spanPayRate').html().replace('$', '').replace(',', '') * 2);
                    NetAmount += parseFloat($this.find('.form-control').val() * $('#spanPayRate').html().replace('$', '').replace(',', '') * 2);
                }
                else {
                    //TaxableAmount += parseFloat($this.find('.form-control').val() * $('#spanPayRate').html().replace('$', '').replace(',', ''));
                    NetAmount += parseFloat($this.find('.form-control').val() * $('#spanPayRate').html().replace('$', '').replace(',', ''));
                }
            }
            else {
                //TaxableAmount += parseFloat($this.find('.form-control').val().replace('$', '').replace(',', ''));
                NetAmount += parseFloat($this.find('.form-control').val().replace('$', '').replace(',', ''));
            }
        }
        else {
            NetAmount += parseFloat($this.find('.form-control').val().replace('$', '').replace(',', ''));
        }
    });

    //var params = { TaxableAmount: TaxableAmount };
    //var dtoTax = CallService1('Client/PayCheckService.svc', 'GetTax', params)
    //var params = { ClientId: $.localStorage.get('ClientId'), EmployeeId: $('#hdnEmployeeId').val(), TaxableAmount: TaxableAmount };
    //var SUITaxAmount = CallService1('Client/PayCheckService.svc', 'GetSUITax', params)
    //$("#txtEmployerSUITaxAmount").val(accounting.formatMoney(SUITaxAmount));
    //$('#txtSocialSecurityTaxAmount').val(accounting.formatMoney(dtoTax.SocialSecurityTaxAmount));
    //$('#txtMedicareTaxAmount').val(accounting.formatMoney(dtoTax.MedicareTaxAmount));
    //$('#txtEmployerSocialSecurityTaxAmount').val(accounting.formatMoney(dtoTax.EmployerSocialSecurityTaxAmount));
    //$('#txtEmployerMedicareTaxAmount').val(accounting.formatMoney(dtoTax.EmployerMedicareTaxAmount));
    //$('#txtEmployerFUTATaxAmount').val(accounting.formatMoney(dtoTax.EmployerFUTATaxAmount));
    $('#bodyDeduction > tr').each(function () {
        var $this = $(this);
        if ($this.attr('taxable') == 'true') {
            TaxableAmount += parseFloat($this.find('.form-control').val().replace('$', '').replace(',', ''));
        }
        if (($this.attr('id') != -12) && ($this.attr('id') != -13) && ($this.attr('id') != -14) && ($this.attr('id') != -15)) {
            NetAmount -= parseFloat($this.find('.form-control').val().replace('$', '').replace(',', ''));
        }
    });

    //var params = { EmployeeId: $('#hdnEmployeeId').val(), TaxableAmount: TaxableAmount };
    //var FederalTaxAmount = CallService1('Client/PayCheckService.svc', 'GetFederalTax', params);
    //$('#txtFederalTaxAmount').val(accounting.formatMoney(FederalTaxAmount.toFixed));
    //NetAmount -= $('#txtFederalTaxAmount').val().replace('$', '').replace(',', '');

    //var params = { EmployeeId: $('#hdnEmployeeId').val(), TaxableAmount: TaxableAmount };
    //var StateTaxAmount = CallService1('Client/PayCheckService.svc', 'GetStateTax', params);
    //$('#txtStateTaxAmount').val(accounting.formatMoney(StateTaxAmount));
    //NetAmount -= $('#txtStateTaxAmount').val().replace('$', '').replace(',', '');

    $('#spanNetAmount').html(accounting.formatMoney(NetAmount));
}
$(document).on("change", "#cmbPaySchedule", function () {
    if ($("#cmbPaySchedule").val() != -1) {
        var PayScheduleId = $("#cmbPaySchedule").val();
        $('#hdnPayScheduleId').val(PayScheduleId);
        var params = { ClientId: $.localStorage.get('ClientId'), PayScheduleId: PayScheduleId };
        var dtoPaySchedule = CallService1('Client/PayScheduleService.svc', 'GetObject', params);
        $('#hdnPayScheduleRecurrenceCode').val(dtoPaySchedule.PayScheduleRecurrenceCode);

        //if (PayScheduleId == 0) {
        //$('#trPayPeriod').addClass('hide');
        //$('#trNotes').addClass('hide');
        FillPayPeriods();
        //FillContractors();
        //}
        //else {

        //}
        $('#divPaySchedules').addClass('hide');
        $('#divMain').removeClass('hide');
    }
})
//$(document).ready(function () {
$(document).on("change", "#cmbPayCheckType", function () {
    if ($("#cmbPayCheckType").val() == 1) {
        window.location = '/Client/Main.html#PayCheck';
    }
    else if ($("#cmbPayCheckType").val() == 2) {
        window.location = '/Client/Main.html#BonusPayCheck';
    }
    else if ($("#cmbPayCheckType").val() == 3) {
        window.location = '/Client/Main.html#CommissionPayCheck';
    }
})
$("#cmbPayPeriod").change(function () {
    $('#txtPayDate').val($('option:selected', this).attr('paydate'));
    var params = { ClientId: $.localStorage.get('ClientId'), PayScheduleId: $('#hdnPayScheduleId').val(), PayPeriod: $("#cmbPayPeriod").val() };
    dtoPayCheckMain = CallService1('Client/PayCheckService.svc', 'GetObjectMain', params);
    if (dtoPayCheckMain.PayCheckMainId != undefined) {
        //$('#txtNotes').val(dtoPayCheckMain.Notes);
    }
    else {
        dtoPayCheckMain.PayCheckMainId = 0;
    }
    var params = {
        ClientId: $.localStorage.get('ClientId'),
        PayScheduleId: $('#hdnPayScheduleId').val(),
        PayCheckMainId: dtoPayCheckMain.PayCheckMainId,
        PayPeriod: $('#cmbPayPeriod').val()
    };
    CallService('Client/EmployeeService.svc', 'GetByPayScheduleId', params, OnEmployeeGetByPayScheduleIdSuccess, true);

});
$("#txtRegularHours").blur(function () {
    CalculateNetAmount();
});

function Save() {
    if (form.valid() && form1.valid()) {
        var counter = 0;
        var PayCheckDetails = '';
        var rowLength = document.getElementById('tblMain').rows.length;
        for (var i = 1; i < rowLength; i++) {
            if ($(document.getElementById('tblMain').rows[i].cells[1]).html() == 'E') {               
                $(document.getElementById('tblMain').rows[i]).find('input[type="checkbox"]').prop("checked", false);
                var cell = $(document.getElementById('tblMain').rows[i].cells[5]).find('.form-control');               
                cell.attr('style', 'text-align:right;width:80px;');
               
                var cells = $(document.getElementById('tblMain').rows[i].cells[6]).find('.form-control');
                for (var j = 0; j < cells.length; j++) {                    
                        $(cells[j]).attr('style', 'text-align:right;width:80px;');
                }                    
            }
            else if ($(document.getElementById('tblMain').rows[i].cells[1]).html() == 'C') {  
                $(document.getElementById('tblMain').rows[i]).find('input[type="checkbox"]').prop("checked", false);             
                var cell = $(document.getElementById('tblMain').rows[i].cells[5]).find('.form-control');                
                cell.attr('style', 'text-align:right;width:80px;');
              
                cell = $(document.getElementById('tblMain').rows[i].cells[6]).find('.form-control');                
                cell.attr('style', 'text-align:right;width:80px;');               
            }
        }
        for (var i = 1; i < rowLength; i++) {
            if ($(document.getElementById('tblMain').rows[i].cells[1]).html() == 'E') {
                var found = false;
                var cell = $(document.getElementById('tblMain').rows[i].cells[5]).find('.form-control');                               
                if (parseFloat(cell.val() == undefined ? 0 : cell.val()) == 0) {
                    //cell.attr('style', 'text-align:right;width:80px;background-color:red');
                }
                else {
                    found = true;
                }
                var cells = $(document.getElementById('tblMain').rows[i].cells[6]).find('.form-control');
                for (var j = 0; j < cells.length; j++) {
                    if (parseFloat($(cells[j]).val() == undefined ? 0 : $(cells[j]).val().replace('$', '').replace(',', '')) == 0) {
                        //$(cells[j]).attr('style', 'text-align:right;width:80px;background-color:red');
                    }
                    else {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    counter += 1;
                    $(document.getElementById('tblMain').rows[i]).find('input[type="checkbox"]').prop("checked", true);
                }
                else {
                    var cell = $(document.getElementById('tblMain').rows[i].cells[5]).find('.form-control');
                    //if (parseFloat(cell.val()) == 0) {
                    cell.attr('style', 'text-align:right;width:80px;background-color:red');
                    //}                   
                    var cells = $(document.getElementById('tblMain').rows[i].cells[6]).find('.form-control');
                    for (var j = 0; j < cells.length; j++) {
                        //if (parseFloat($(cells[j]).val().replace('$', '').replace(',', '')) == 0) {
                        $(cells[j]).attr('style', 'text-align:right;width:80px;background-color:red');
                        //}                        
                    }
                }
            }
            else if ($(document.getElementById('tblMain').rows[i].cells[1]).html() == 'C') {
                var found = false;
                var cell = $(document.getElementById('tblMain').rows[i].cells[5]).find('.form-control');
                if (parseFloat(cell.val()) == 0) {
                    //cell.attr('style', 'text-align:right;width:80px;background-color:red');
                }
                else {
                    found = true;
                }
                cell = $(document.getElementById('tblMain').rows[i].cells[6]).find('.form-control');
                if (parseFloat(cell.val().replace('$', '').replace(',', '')) == 0) {
                    //cell.attr('style', 'text-align:right;width:80px;background-color:red');
                }
                else {
                    found = true;
                }
                if (found) {
                    counter += 1;
                    $(document.getElementById('tblMain').rows[i]).find('input[type="checkbox"]').prop("checked", true);
                }
                else {
                    var cell = $(document.getElementById('tblMain').rows[i].cells[5]).find('.form-control');                   
                    cell.attr('style', 'text-align:right;width:80px;background-color:red');      
                                                 
                    cell = $(document.getElementById('tblMain').rows[i].cells[6]).find('.form-control');                    
                    cell.attr('style', 'text-align:right;width:80px;background-color:red');                                
                }
            }
        }
        if (counter == 0) {
            bootbox.dialog({
                message: 'Please enter data',
                title: "Payroll",
                buttons: {
                    ok: {
                        label: "<i class=\"fa fa-check\" aria-hidden=\"true\"></i> OK",
                        className: "btn btn-primary",
                        callback: function () {
                        }
                    }
                }
            });
            return false;
        }
        else {
            bootbox.dialog({
                message: "Are you sure you only want to Approve " + counter + " person(s)?",
                title: "Payroll",
                buttons: {
                    ok: {
                        label: "<i class=\"fa fa-check\" aria-hidden=\"true\"></i> OK",
                        className: "btn btn-primary",
                        callback: function () {
                            var PayCheckDetails = '';
                            var rowLength = document.getElementById('tblMain').rows.length;
                            for (var i = 1; i < rowLength; i++) {
                                if (($(document.getElementById('tblMain').rows[i]).find('input[type="checkbox"]').is(':checked')) && ($(document.getElementById('tblMain').rows[i].cells[1]).html() == 'E')) {
                                    var cell = $(document.getElementById('tblMain').rows[i].cells[5]).find('.form-control');
                                    var arrCell = cell.attr('id').split('_');
                                    PayCheckDetails += '0' + String.fromCharCode(134) + $('#cmbPayCheckType').val() + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + arrCell[0] + String.fromCharCode(134) + $('#txtPayDate').val() + String.fromCharCode(134) + arrCell[1] + String.fromCharCode(134) + $(document.getElementById('tblMain').rows[i].cells[5]).find('.form-control').val() + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $(document.getElementById('tblMain').rows[i].cells[3]).find('#' + arrCell[0] + '_PayRatePerHour').html().replace('$', '').replace(',', '') + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $(document.getElementById('tblMain').rows[i].cells[13]).find('#' + arrCell[0] + '_PayType').val() + String.fromCharCode(134) + $("#txtNotes").val() + String.fromCharCode(135);

                                    var cells = $(document.getElementById('tblMain').rows[i].cells[6]).find('.form-control');
                                    for (var j = 0; j < cells.length; j++) {
                                        var arrCell = $(cells[j]).attr('id').split('_');
                                        var PayRatePerHour = $('#' + arrCell[0] + '_PayRatePerHour').html().replace('$', '').replace(',', '');
                                        var Hours = 0;
                                        var Amount = $(cells[j]).val().replace('$', '').replace(',', '');
                                        if ($(cells[j]).attr('valuein') == 'Hours') {
                                            if ($(cells[j]).attr('paystubcode') == 'OT') {
                                                PayRatePerHour = PayRatePerHour * 1.5;
                                                Hours = parseFloat($(cells[j]).val());
                                                Amount = Hours * PayRatePerHour;
                                            }
                                            else if ($(cells[j]).attr('paystubcode') == 'Double OT') {
                                                PayRatePerHour = PayRatePerHour * 2;
                                                Hours = parseFloat($(cells[j]).val());
                                                Amount = Hours * PayRatePerHour;
                                            }
                                            else {
                                                Hours = parseFloat($(cells[j]).val());
                                                Amount = Hours * PayRatePerHour;
                                            }
                                        }
                                        else {
                                            PayRatePerHour = 0;
                                        }
                                        PayCheckDetails += '0' + String.fromCharCode(134) + $('#cmbPayCheckType').val() + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + arrCell[0] + String.fromCharCode(134) + $('#txtPayDate').val() + String.fromCharCode(134) + arrCell[1] + String.fromCharCode(134) + Hours + String.fromCharCode(134) + parseFloat(Amount) + String.fromCharCode(134) + PayRatePerHour + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $(document.getElementById('tblMain').rows[i].cells[13]).find('#' + arrCell[0] + '_PayType').val() + String.fromCharCode(134) + $("#txtNotes").val() + String.fromCharCode(135);
                                    }
                                    cells = $(document.getElementById('tblMain').rows[i].cells[8]).find('.form-control');
                                    for (var j = 0; j < cells.length; j++) {
                                        var arrCell = $(cells[j]).attr('id').split('_');
                                        var PayRatePerHour = 0;
                                        var Hours = 0;
                                        var Amount = $(cells[j]).val().replace('$', '').replace(',', '');
                                        PayCheckDetails += '0' + String.fromCharCode(134) + $('#cmbPayCheckType').val() + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + arrCell[0] + String.fromCharCode(134) + $('#txtPayDate').val() + String.fromCharCode(134) + arrCell[1] + String.fromCharCode(134) + Hours + String.fromCharCode(134) + parseFloat(Amount) + String.fromCharCode(134) + PayRatePerHour + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $(document.getElementById('tblMain').rows[i].cells[13]).find('#' + arrCell[0] + '_PayType').val() + String.fromCharCode(134) + $("#txtNotes").val() + String.fromCharCode(135);
                                    }
                                    cells = $(document.getElementById('tblMain').rows[i].cells[9]).find('.form-control');
                                    for (var j = 0; j < cells.length; j++) {
                                        var arrCell = $(cells[j]).attr('id').split('_');
                                        var PayRatePerHour = 0;
                                        var Hours = 0;
                                        var Amount = $(cells[j]).val().replace('$', '').replace(',', '');
                                        PayCheckDetails += '0' + String.fromCharCode(134) + $('#cmbPayCheckType').val() + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + arrCell[0] + String.fromCharCode(134) + $('#txtPayDate').val() + String.fromCharCode(134) + arrCell[1] + String.fromCharCode(134) + Hours + String.fromCharCode(134) + parseFloat(Amount) + String.fromCharCode(134) + PayRatePerHour + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $(document.getElementById('tblMain').rows[i].cells[13]).find('#' + arrCell[0] + '_PayType').val() + String.fromCharCode(134) + $("#txtNotes").val() + String.fromCharCode(135);
                                    }
                                    cells = $(document.getElementById('tblMain').rows[i].cells[11]).find('.form-control');
                                    for (var j = 0; j < cells.length; j++) {
                                        var arrCell = $(cells[j]).attr('id').split('_');
                                        var PayRatePerHour = 0;
                                        var Hours = 0;
                                        var Amount = $(cells[j]).val().replace('$', '').replace(',', '');
                                        PayCheckDetails += '0' + String.fromCharCode(134) + $('#cmbPayCheckType').val() + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + arrCell[0] + String.fromCharCode(134) + $('#txtPayDate').val() + String.fromCharCode(134) + arrCell[1] + String.fromCharCode(134) + Hours + String.fromCharCode(134) + parseFloat(Amount) + String.fromCharCode(134) + PayRatePerHour + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $(document.getElementById('tblMain').rows[i].cells[13]).find('#' + arrCell[0] + '_PayType').val() + String.fromCharCode(134) + $("#txtNotes").val() + String.fromCharCode(135);
                                    }
                                }
                            }
                            if (PayCheckDetails != '') {
                                PayCheckDetails = PayCheckDetails.substring(0, PayCheckDetails.length - 1);
                                var params = {
                                    PayCheckMainId: dtoPayCheckMain.PayCheckMainId,
                                    PayScheduleId: $('#hdnPayScheduleId').val(),
                                    PayPeriod: $("#cmbPayPeriod").val(),
                                    PayCheckDetails: PayCheckDetails
                                };
                                CallService1('Client/PayCheckService.svc', 'Save', params);
                            }
                            if (form1.valid()) {
                                var PayCheckDetails = '';
                                var rowLength = document.getElementById('tblMain').rows.length;
                                for (var i = 1; i < rowLength; i++) {
                                    if (($(document.getElementById('tblMain').rows[i]).find('input[type="checkbox"]').is(':checked')) && ($(document.getElementById('tblMain').rows[i].cells[1]).html() == 'C')) {
                                        var cell = $(document.getElementById('tblMain').rows[i].cells[5]).find('.form-control');
                                        var arrCell = cell.attr('id').split('_');
                                        var Hours = cell.val().replace('$', '').replace(',', '');
                                        PayCheckDetails += '0' + String.fromCharCode(134) +
                                            $('#cmbPayCheckType').val() + String.fromCharCode(134) +
                                            '0' + String.fromCharCode(134) +
                                            '0' + String.fromCharCode(134) +
                                            '0' + String.fromCharCode(134) +
                                            arrCell[0] + String.fromCharCode(134) +
                                            $('#txtPayDate').val() + String.fromCharCode(134) +
                                            arrCell[1] + String.fromCharCode(134) +
                                            parseFloat(Hours) + String.fromCharCode(134) +
                                            '0' + String.fromCharCode(134) +
                                            $(document.getElementById('tblMain').rows[i].cells[3]).find('#' + arrCell[0] + '_PayRatePerHour_C').html().replace('$', '').replace(',', '') + String.fromCharCode(134) +
                                            '0' + String.fromCharCode(134) +
                                            $(document.getElementById('tblMain').rows[i].cells[13]).find('#' + arrCell[0] + '_PayType_C').val() + String.fromCharCode(134) +
                                            $("#txtNotes").val() + String.fromCharCode(135);

                                        var cell = $(document.getElementById('tblMain').rows[i].cells[6]).find('.form-control');
                                        var arrCell = cell.attr('id').split('_');
                                        var Amount = cell.val().replace('$', '').replace(',', '');
                                        PayCheckDetails += '0' + String.fromCharCode(134) +
                                            $('#cmbPayCheckType').val() + String.fromCharCode(134) +
                                            '0' + String.fromCharCode(134) +
                                            '0' + String.fromCharCode(134) +
                                            '0' + String.fromCharCode(134) +
                                            arrCell[0] + String.fromCharCode(134) +
                                            $('#txtPayDate').val() + String.fromCharCode(134) +
                                            arrCell[1] + String.fromCharCode(134) +
                                            '0' + String.fromCharCode(134) +
                                            parseFloat(Amount) + String.fromCharCode(134) +
                                            '0' + String.fromCharCode(134) +
                                            '0' + String.fromCharCode(134) +
                                            $(document.getElementById('tblMain').rows[i].cells[13]).find('#' + arrCell[0] + '_PayType_C').val() + String.fromCharCode(134) +
                                            $("#txtNotes").val() + String.fromCharCode(135);

                                        var cell = $(document.getElementById('tblMain').rows[i].cells[9]).find('.form-control');
                                        var arrCell = cell.attr('id').split('_');
                                        var Amount = cell.val().replace('$', '').replace(',', '');
                                        PayCheckDetails += '0' + String.fromCharCode(134) +
                                            $('#cmbPayCheckType').val() + String.fromCharCode(134) +
                                            '0' + String.fromCharCode(134) +
                                            '0' + String.fromCharCode(134) +
                                            '0' + String.fromCharCode(134) +
                                            arrCell[0] + String.fromCharCode(134) +
                                            $('#txtPayDate').val() + String.fromCharCode(134) +
                                            arrCell[1] + String.fromCharCode(134) +
                                            '0' + String.fromCharCode(134) +
                                            parseFloat(Amount) + String.fromCharCode(134) +
                                            '0' + String.fromCharCode(134) +
                                            '0' + String.fromCharCode(134) +
                                            $(document.getElementById('tblMain').rows[i].cells[13]).find('#' + arrCell[0] + '_PayType_C').val() + String.fromCharCode(134) +
                                            $("#txtNotes").val() + String.fromCharCode(135);

                                    }
                                }

                                if (PayCheckDetails != '') {
                                    PayCheckDetails = PayCheckDetails.substring(0, PayCheckDetails.length - 1);
                                    var params = {
                                        PayCheckMainId: 0,
                                        PayScheduleId: 0,
                                        PayPeriod: '',
                                        PayCheckDetails: PayCheckDetails
                                    };
                                    CallService1('Client/PayCheckService.svc', 'Save', params);
                                }
                            }
                            Step(2);
                        }
                    },
                    cancel: {
                        label: "<i class=\"fa fa-times\" aria-hidden=\"true\"></i> Cancel",
                        className: "btn btn-primary",
                        callback: function () {
                        }
                    }
                }
            });
        }
    }
};

function Close() {
    window.location = "/Client/Main.html#ViewAllPayChecks";
}

//function Check()
//{    
//    $(event.target).closest('tr').find('.form-control').attr('style', 'text-align:right;width:80px;'); 
//}

//function CheckAll() {
//    $('input[type="checkbox"]').each(function () {
//        if ($(this).context.name == "chk") {
//            $(this).prop("checked", $('input[name="0"]')[0].checked);
//        }
//    });
//}
//function CheckAll1() {
//    $('input[type="checkbox"]').each(function () {
//        if ($(this).context.name == "chk1") {
//            $(this).prop("checked", $('input[name="1"]')[0].checked);
//        }
//    });
//}
function Step(index) {
    if (index == 1) {
        window.location = '/Client/Main.html#PayCheck';
    }
    else if (index == 2) {
        window.location = '/Client/Main.html#ModifyCheckNumbers';
    }
    else if (index == 3) {
        window.location = '/Client/Main.html#PrintPaychecks';
    }
}

function Save1() {
    if (form.valid()) {
        var PayCheckDetails = '0' + String.fromCharCode(134) + $('#cmbPayCheckType').val() + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#txtPayDate').val() + String.fromCharCode(134) + '-2' + String.fromCharCode(134) + $('#txtRegularHours').val() + String.fromCharCode(134) + $('#txtRegularPay').val().replace('$', '').replace(',', '') + String.fromCharCode(134) + $('#spanPayRate').html().replace('$', '').replace(',', '') + String.fromCharCode(134) + $('#spanPayRate').html().replace('$', '').replace(',', '') + String.fromCharCode(134) + $("#cmbPayType").val() + String.fromCharCode(134) + $("#txtNotes").val() + String.fromCharCode(135);
        var i = 0;
        $('#bodyAddition > tr').each(function () {
            var $this = $(this);
            if ((i > 0) && ($this.find('.form-control').attr('id') != -1)) {
                if ($this.find('.form-control').attr('valuein') == 'Hours') {
                    if ($this.find('.form-control').attr('paystubcode') == 'OT') {
                        //TaxableAmount += parseFloat($this.find('.form-control').val() * $('#spanPayRate').html().replace('$', '').replace(',', '') * 1.5);
                        //NetAmount += parseFloat($this.find('.form-control').val() * $('#spanPayRate').html().replace('$', '').replace(',', '') * 1.5);
                        PayCheckDetails += '0' + String.fromCharCode(134) + $('#cmbPayCheckType').val() + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#txtPayDate').val() + String.fromCharCode(134) + $this.attr('id') + String.fromCharCode(134) + parseFloat($this.find('.form-control').val()) + String.fromCharCode(134) + (parseFloat($this.find('.form-control').val()) * $('#spanPayRatePerHour').html().replace('$', '').replace(',', '') * 1.5) + String.fromCharCode(134) + ($('#spanPayRatePerHour').html().replace('$', '').replace(',', '') * 1.5) + String.fromCharCode(134) + $('#spanPayRate').html().replace('$', '').replace(',', '') + String.fromCharCode(134) + $("#cmbPayType").val() + String.fromCharCode(134) + $("#txtNotes").val() + String.fromCharCode(135);
                    }
                    else if ($this.find('.form-control').attr('paystubcode') == 'Double OT') {
                        //TaxableAmount += parseFloat($this.find('.form-control').val() * $('#spanPayRate').html().replace('$', '').replace(',', '') * 2);
                        //NetAmount += parseFloat($this.find('.form-control').val() * $('#spanPayRate').html().replace('$', '').replace(',', '') * 2);
                        PayCheckDetails += '0' + String.fromCharCode(134) + $('#cmbPayCheckType').val() + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#txtPayDate').val() + String.fromCharCode(134) + $this.attr('id') + String.fromCharCode(134) + parseFloat($this.find('.form-control').val()) + String.fromCharCode(134) + (parseFloat($this.find('.form-control').val()) * $('#spanPayRatePerHour').html().replace('$', '').replace(',', '') * 2) + String.fromCharCode(134) + ($('#spanPayRatePerHour').html().replace('$', '').replace(',', '') * 2) + String.fromCharCode(134) + $('#spanPayRate').html().replace('$', '').replace(',', '') + String.fromCharCode(134) + $("#cmbPayType").val() + String.fromCharCode(134) + $("#txtNotes").val() + String.fromCharCode(135);
                    }
                    else {
                        //TaxableAmount += parseFloat($this.find('.form-control').val() * $('#spanPayRate').html().replace('$', '').replace(',', ''));
                        //NetAmount += parseFloat($this.find('.form-control').val() * $('#spanPayRate').html().replace('$', '').replace(',', ''));
                        PayCheckDetails += '0' + String.fromCharCode(134) + $('#cmbPayCheckType').val() + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#txtPayDate').val() + String.fromCharCode(134) + $this.attr('id') + String.fromCharCode(134) + parseFloat($this.find('.form-control').val()) + String.fromCharCode(134) + (parseFloat($this.find('.form-control').val()) * $('#spanPayRatePerHour').html().replace('$', '').replace(',', '')) + String.fromCharCode(134) + ($('#spanPayRatePerHour').html().replace('$', '').replace(',', '')) + String.fromCharCode(134) + $('#spanPayRate').html().replace('$', '').replace(',', '') + String.fromCharCode(134) + $("#cmbPayType").val() + String.fromCharCode(134) + $("#txtNotes").val() + String.fromCharCode(135);
                    }
                }
                else {
                    //TaxableAmount += parseFloat($this.find('.form-control').val().replace('$', '').replace(',', ''));
                    //NetAmount += parseFloat($this.find('.form-control').val().replace('$', '').replace(',', ''));
                    PayCheckDetails += '0' + String.fromCharCode(134) + $('#cmbPayCheckType').val() + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#txtPayDate').val() + String.fromCharCode(134) + $this.attr('id') + String.fromCharCode(134) + '0' + String.fromCharCode(134) + parseFloat($this.find('.form-control').val().replace('$', '').replace(',', '')) + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#spanPayRate').html().replace('$', '').replace(',', '') + String.fromCharCode(134) + $("#cmbPayType").val() + String.fromCharCode(134) + $("#txtNotes").val() + String.fromCharCode(135);
                }
            }
            i += 1;
        });

        $('#bodyDeduction > tr').each(function () {
            var $this = $(this);
            if ($this.find('.form-control').attr('valuein') == 'Hours') {
                //TaxableAmount += parseFloat($this.find('.form-control').val() * $('#spanPayRate').html().replace('$', '').replace(',', ''));
                //NetAmount += parseFloat($this.find('.form-control').val() * $('#spanPayRate').html().replace('$', '').replace(',', ''));
                PayCheckDetails += '0' + String.fromCharCode(134) + $('#cmbPayCheckType').val() + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#txtPayDate').val() + String.fromCharCode(134) + $this.attr('id') + String.fromCharCode(134) + parseFloat($this.find('.form-control').val()) + String.fromCharCode(134) + (parseFloat($this.find('.form-control').val()) * $('#spanPayRatePerHour').html().replace('$', '').replace(',', '')) + String.fromCharCode(134) + ($('#spanPayRatePerHour').html().replace('$', '').replace(',', '')) + String.fromCharCode(134) + $('#spanPayRate').html().replace('$', '').replace(',', '') + String.fromCharCode(134) + $("#cmbPayType").val() + String.fromCharCode(134) + $("#txtNotes").val() + String.fromCharCode(135);
            }
            else {
                //TaxableAmount += parseFloat($this.find('.form-control').val().replace('$', '').replace(',', ''));
                //NetAmount += parseFloat($this.find('.form-control').val().replace('$', '').replace(',', ''));
                PayCheckDetails += '0' + String.fromCharCode(134) + $('#cmbPayCheckType').val() + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#txtPayDate').val() + String.fromCharCode(134) + $this.attr('id') + String.fromCharCode(134) + '0' + String.fromCharCode(134) + parseFloat($this.find('.form-control').val().replace('$', '').replace(',', '')) + String.fromCharCode(134) + '0' + String.fromCharCode(134) + $('#spanPayRate').html().replace('$', '').replace(',', '') + String.fromCharCode(134) + $("#cmbPayType").val() + String.fromCharCode(134) + $("#txtNotes").val() + String.fromCharCode(135);
            }
            //PayCheckDetails += '0' + String.fromCharCode(134) + $('#hdnEmployeeId').val() + String.fromCharCode(134) + $('#txtPayDate').val() + String.fromCharCode(134) + $this.attr('id') + String.fromCharCode(134) + parseFloat($this.find('.form-control').val()) + String.fromCharCode(134) + $('#spanPayRate').html().replace('$', '').replace(',', '') + String.fromCharCode(135);            
        });
        if (PayCheckDetails != '') {
            PayCheckDetails = PayCheckDetails.substring(0, PayCheckDetails.length - 1);
        }
        var params = {
            PayCheckMainId: dtoPayCheckMain.PayCheckMainId,
            PayScheduleId: $('#hdnPayScheduleId').val(),
            PayPeriod: $("#cmbPayPeriod").val(),
            //Notes: $("#txtNotes").val(),
            PayCheckDetails: PayCheckDetails
        };
        CallService('Client/PayCheckService.svc', 'Save', params, OnPayCheckSave1Success, false);
    }
};

function OnPayCheckSave1Success(PayCheckMainId) {
    if (PayCheckMainId > 0) {
        dtoPayCheckMain.PayCheckMainId = PayCheckMainId;
        $("#cmbPayPeriod").change();
        $('#myModal').modal('hide');
    }
}
//function FillContractors()
//{    
//    var params = { ClientId: $.localStorage.get('ClientId') };
//    var Contractors = CallService1('Client/Contractor/ContractorService.svc', 'GetLookup', params);
//    var html = '';
//    html += '<table id="tblMain1" class="table foo-data-table-filterable">';
//    html += '<thead>';
//    html += '<tr >';
//    html += '<th style="width: 25px" data-sort-ignore="true">';
//    html += '<input id="chkAll1" type="checkbox" name="1" onclick="CheckAll1()" checked />';
//    html += '</th>';
//    html += '<th>';
//    html += '<a>';
//    html += 'Contractor';
//    html += '</a>';
//    html += '</th>';
//    html += '<th>';
//    html += '<a>';
//    html += 'Payment';
//    html += '</a>';
//    html += '</th>';
//    html += '<th>';
//    html += '<a>';
//    html += 'Reimbursement';
//    html += '</a>';
//    html += '</th>';
//    html += '<th>';
//    html += '<a>';
//    html += 'Memo';
//    html += '</a>';
//    html += '</th>';   
//    html += '<th>';
//    html += 'Last Pay Date';
//    html += '</th>';
//    html += '</tr>';
//    html += '</thead>';
//    html += '<tbody>';
//    for (var i = 0; i < Contractors.length; i++) {
//        html += '<tr id="' + Contractors[i].ContractorId + '" class="' + (i % 2 == 0 ? "footable-even" : "footable-odd") + '">';
//        html += '<td><input type="checkbox" name="chk1" onclick="Check()" checked/></td>'; 
//        html += '<td style="white-space:nowrap"><a href="/Client/Main.html#ViewContractor:' + Contractors[i].ContractorId + '" class="link">' + _.escape(Contractors[i].Line1) + '</a></td>';           
//        html += '<td style="text-align:right;"><input id="' + Contractors[i].ContractorId + '_-13" class="form-control decimal textbox" style="text-align:right;width:80px;" value="$0.00"/></td>';
//        html += '<td style="text-align:right;"><input id="' + Contractors[i].ContractorId + '_-14" class="form-control decimal textbox" style="text-align:right;width:80px;" value="$0.00"/></td>';   
//        html += '<td style="text-align:right;"><input id="' + Contractors[i].ContractorId + '_Notes" class="form-control" style="width:350px;" value=""/></td>';                     
//        html += '<td>' + FormatDateUTC(Contractors[i].LastPayDate) + '</td>';        
//        html += '</tr>';
//    }
//    html += '</tbody>';
//    html += '</table>';
//    $('#divContractors').html(html);
//    FocusInFocusOut();
//    SetKeyPress();    
//}

window.scrollTo(0, 0);