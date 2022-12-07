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
$(document).on("focusin", "#txtPeriodStartDate", function () {
    $(this).prop('readonly', true);
});
$(document).on("focusout", "#txtPeriodStartDate", function () {
    $(this).prop('readonly', false);
});
$(document).on("focusin", "#txtPeriodEndDate", function () {
    $(this).prop('readonly', true);
});
$(document).on("focusout", "#txtPeriodEndDate", function () {
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
        txtPayDate:
        {
            required: true,
            InvalidPayDate: true
        },
        txtPeriodStartDate:
        {
            required: true,
            InvalidPeriodStartDate: true
        },
        txtPeriodEndDate:
        {
            required: true,
            InvalidPeriodEndDate: true
        }
    },
    messages: {
        txtPayDate:
        {
            required: 'Pay Date is required'
        },
        txtPeriodStartDate:
        {
            required: 'Period Start Date is required'
        },
        txtPeriodEndDate:
        {
            required: 'Period End Date is required'
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
var params = { ClientId: $.localStorage.get('ClientId'), PayStubCode: 'COM' };
CallService('Client/EmployeeService.svc', 'GetByPayStubCode', params, OnEmployeeGetByPayStubCodeSuccess, true);
function OnEmployeeGetByPayStubCodeSuccess(Employees) {
    if (Employees != undefined) {             
        var params = { ClientId: $.localStorage.get('ClientId'), PayStubCode: 'COM' };
        PayStubs = CallService1('Client/PayStubService.svc', 'GetByPayStubCode', params);

        var html = '';
        html += '<table id="tblMain" class="table foo-data-table-filterable">';
        html += '<thead>';
        html += '<tr >';
        html += '<th style="width: 25px" data-sort-ignore="true" class="hide">';
        html += '<input id="chkAll" type="checkbox" name="0" onclick="CheckAll()" />';
        html += '</th>';
        html += '<th class="hide">';
        html += '<a>';
        html += 'Pay Type';
        html += '</a>';
        html += '</th>';
        html += '<th class="hide">';
        html += '<a>';
        html += 'Pay Rate';
        html += '</a>';
        html += '</th>';
        html += '<th>';
        html += '<a>';
        html += 'Employee Name';
        html += '</a>';
        html += '</th>'; 
        html += '<th class="hide">';
        html += '<a>';
        html += 'Regular Hours';
        html += '</a>';
        html += '</th>';            
        for (var j = 0; j < PayStubs.length; j++) {
            html += '<th ' + (PayStubs[j].PayStubCode == 'COM'? '': 'class="hide"') + '>' + _.escape(PayStubs[j].PayStubName) + '</th>';
        }
        html += '<th class="hide" style="text-align:right">';
        html += '<a>';
        html += 'Federal Tax Amount';
        html += '</a>';
        html += '</th>';
        html += '<th class="hide" style="text-align:right">';
        html += '<a>';
        html += 'State Tax Amount';
        html += '</a>';
        html += '</th>';
        html += '<th class="hide" style="text-align:right">';
        html += '<a>';
        html += 'County Tax Amount';
        html += '</a>';
        html += '</th>';
        html += '<th class="hide" style="text-align:right">';
        html += '<a>';
        html += 'Social Security Tax Amount';
        html += '</a>';
        html += '</th>';
        html += '<th class="hide" style="text-align:right">';
        html += '<a>';
        html += 'Medicare Tax Amount';
        html += '</a>';
        html += '</th>';
        html += '<th class="hide" style="text-align:right">';
        html += '<a>';
        html += 'Employer FUTA Tax Amount';
        html += '</a>';
        html += '</th>';
        html += '<th class="hide" style="text-align:right">';
        html += '<a>';
        html += 'Employer Social Security Tax Amount';
        html += '</a>';
        html += '</th>';
        html += '<th class="hide" style="text-align:right">';
        html += '<a>';
        html += 'Employer Medicare Tax Amount';
        html += '</a>';
        html += '</th>';
        html += '<th class="hide" style="text-align:right">';
        html += '<a>';
        html += 'Employer SUI Tax Amount';
        html += '</a>';
        html += '</th>';             
        html += '<th>';
        html += 'Last Pay Date';
        html += '</th>';
        html += '<th>';
        html += 'Pay Type';
        html += '</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        for (var i = 0; i < Employees.length; i++) {
            html += '<tr id="' + Employees[i].EmployeeId + '" class="' + (i % 2 == 0 ? "footable-even" : "footable-odd") + '">';
            //if (Employees[i].PayCheckMainId > 0) {
            //    html += '<td></td>';
            //    html += '<td class="hide"></td>';
            //    html += '<td class="hide"></td>';
            //    html += '<td><a href="/Client/Main.html#ViewEmployee:' + Employees[i].EmployeeId + '" class="link">' + _.escape(Employees[i].FullName) + '</a></td>';
            //    html += '<td class="hide"></td>';
            //    if (Employees[i].Approved) {
            //        html += '<td colspan="' + (PayStubs.length) + '"><a style="cursor:pointer" class="link" href="/Client/Main.html#ViewPayCheck:' + Employees[i].PayCheckId + '">' + accounting.formatMoney(Employees[i].NetPay) + ' check</a> paid on ' + FormatDateUTC(Employees[i].PayDate) + ' <a href="javascript:void(0)" class="link" onclick="NewRecord(' + Employees[i].EmployeeId + ')" >Create 2nd check</a></td>';
            //    }
            //    else {
            //        html += '<td colspan="' + (PayStubs.length) + '">You must <a style="cursor:pointer" class="link" onclick="Step(2)">approve</a> check dated ' + FormatDateUTC(Employees[i].PayDate) + '</td>';
            //    }
            //    html += '<td>' + FormatDateUTC(Employees[i].LastPayDate) + '</td>';
            //}
            //else {
            html += '<td class="hide"><input type="checkbox" name="chk"/></td>';
                if (Employees[i].PayType === 'Hourly') {
                    html += '<td class="hide"><span id="' + Employees[i].EmployeeId + '_PayType">Per Hour</span></td>';
                }
                else {
                    if (Employees[i].PayScheduleRecurrenceCode === 'DA') {
                        html += '<td class="hide"><span id="' + Employees[i].EmployeeId + '_PayType">Per Day</span></td>';
                    }
                    else if (Employees[i].PayScheduleRecurrenceCode === 'WW') {
                        html += '<td class="hide"><span id="' + Employees[i].EmployeeId + '_PayType">Per Week</span></td>';
                    }
                    else if (Employees[i].PayScheduleRecurrenceCode === 'BW') {
                        html += '<td class="hide"><span id="' + Employees[i].EmployeeId + '_PayType">Per Bi-Week</span></td>';
                    }
                    else if (Employees[i].PayScheduleRecurrenceCode === 'SM') {
                        html += '<td class="hide"><span id="' + Employees[i].EmployeeId + '_PayType">Per Semi-Month</span></td>';
                    }
                    else if (Employees[i].PayScheduleRecurrenceCode === 'MM') {
                        html += '<td class="hide"><span id="' + Employees[i].EmployeeId + '_PayType">Per Month</span></td>';
                    }
                    else if (Employees[i].PayScheduleRecurrenceCode === 'QQ') {
                        html += '<td class="hide"><span id="' + Employees[i].EmployeeId + '_PayType">Per Quarter</span></td>';
                    }
                    else if (Employees[i].PayScheduleRecurrenceCode === 'SA') {
                        html += '<td class="hide"><span id="' + Employees[i].EmployeeId + '_PayType">Per Semi-Annual</span></td>';
                    }
                    else if (Employees[i].PayScheduleRecurrenceCode === 'AA') {
                        html += '<td class="hide"><span id="' + Employees[i].EmployeeId + '_PayType">Per Year</span></td>';
                    }
                }
                html += '<td class="hide" style="text-align:right;"><input id="' + Employees[i].EmployeeId + '_PayRate" class="form-control decimal" style="text-align:right;width:80px;" value="' + Employees[i].PayRate + '"/><input id="' + Employees[i].EmployeeId + '_PayRatePerHour" class="form-control decimal" style="text-align:right;width:80px;" value="0.00"/></td>';
                html += '<td style="white-space:nowrap"><a href="/Client/Main.html#ViewEmployee:' + Employees[i].EmployeeId + '" class="link">' + _.escape(Employees[i].FullName) + '</a></td>';
                //html += '<td class="hide" style="text-align:right;"><input id="' + Employees[i].EmployeeId + '_-2" class="form-control decimal" style="text-align:right;width:80px;" value="0.00"/></td>';
                html += '<td class="hide" style="text-align:right;"><input id="' + Employees[i].EmployeeId + '_-2" class="form-control decimal" style="text-align:right;width:80px;" valuein="Hours" value="0.00" /></td>';
                for (var j = 0; j < PayStubs.length; j++) {                   
                    html += '<td style="text-align:right;"><input id="' + Employees[i].EmployeeId + '_' + PayStubs[j].PayStubId + '" paystubtype="' + PayStubs[j].PayStubType + '" taxable="' + PayStubs[j].Taxable + '" valuein="' + PayStubs[j].ValueIn + '" paystubcode="' + PayStubs[j].PayStubCode + '" class="form-control decimal' + (PayStubs[j].ValueIn == 'Amount' ? ' textbox' : '') + '" style="text-align:right;width:80px;" value="' + (PayStubs[j].ValueIn == 'Amount' ? '$' : '') + '0.00"/></td>';
                }
                html += '<td class="hide" style="text-align:right;"><input id="' + Employees[i].EmployeeId + '_-7" class="form-control decimal" style="text-align:right;width:80px;" value="$0.00"/></td>';
                html += '<td class="hide" style="text-align:right;"><input id="' + Employees[i].EmployeeId + '_-8" class="form-control decimal" style="text-align:right;width:80px;" value="$0.00"/></td>';
                html += '<td class="hide" style="text-align:right;"><input id="' + Employees[i].EmployeeId + '_-9" class="form-control decimal" style="text-align:right;width:80px;" value="$0.00"/></td>';
                html += '<td class="hide" style="text-align:right;"><input id="' + Employees[i].EmployeeId + '_-10" class="form-control decimal" style="text-align:right;width:80px;" value="$0.00"/></td>';
                html += '<td class="hide" style="text-align:right;"><input id="' + Employees[i].EmployeeId + '_-11" class="form-control decimal" style="text-align:right;width:80px;" value="$0.00"/></td>';
                html += '<td class="hide" style="text-align:right;"><input id="' + Employees[i].EmployeeId + '_-12" class="form-control decimal" style="text-align:right;width:80px;" value="$0.00"/></td>';
                html += '<td class="hide" style="text-align:right;"><input id="' + Employees[i].EmployeeId + '_-14" class="form-control decimal" style="text-align:right;width:80px;" value="$0.00"/></td>';
                html += '<td class="hide" style="text-align:right;"><input id="' + Employees[i].EmployeeId + '_-15" class="form-control decimal" style="text-align:right;width:80px;" value="$0.00"/></td>';
                html += '<td class="hide" style="text-align:right;"><input id="' + Employees[i].EmployeeId + '_-13" class="form-control decimal" style="text-align:right;width:80px;" value="$0.00"/></td>';
                //html += '<td class="hide" style="text-align:right;"><input id="' + Employees[i].EmployeeId + '_-12" class="form-control decimal textbox" style="text-align:right;width:80px;" value="$0.00"/></td>';
                //html += '<td class="td-center"><a title="Create check" href="javascript:void(0)" onclick=\"NewRecord(' + Employees[i].EmployeeId + ')\" class="btn btn-primary"><i class="fa fa-plus" aria-hidden="true"></i> Create Paycheck</a></td>';
                html += '<td>' + FormatDateUTC(Employees[i].LastPayDate) + '</td>';
                html += '<td><select id="' + Employees[i].EmployeeId + '_PayType1" class="form-control"><option value="Check" ' + (Employees[i].PaymentMethod == 'Check' ? 'selected' : '') + '>Check</option><option value="Deposit" ' + (Employees[i].PaymentMethod == 'Deposit' ? 'selected' : '') + '>Direct Deposit</option></select></td>';
            //}
            html += '</tr>';
        }
        html += '</tbody>';
        html += '</table>';
        $('#divEmployees').html(html);
        FocusInFocusOut();
        SetKeyPress();
        $(".decimal").blur(function (e) {
            CalculateNetAmount(e.target.id.split('_')[0]);
        });
    }
}

function FocusInFocusOut() {
    $('.textbox').off('focusout');
    $('.textbox').off('focusin');
    $('.textbox').focusout(function () {
        $(this).val('$' + $(this).val());
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
function CalculateNetAmount(EmployeeId) {
    if ($('#' + EmployeeId + '_PayType').html() === 'Per Hour') {
        //$('#' + EmployeeId + '_-2').val(($('#' + EmployeeId + '_PayRate').val() * $('#' + EmployeeId + '_-1').val()).toFixed(2));
        $('#' + EmployeeId + '_PayRatePerHour').val($('#' + EmployeeId + '_PayRate').val());
    }
    else {
        if ($('#' + EmployeeId + '_PayType').html() === 'Per Day') {
            //$('#' + EmployeeId + '_-2').val((($('#' + EmployeeId + '_PayRate').val() / 8) * $('#' + EmployeeId + '_-1').val()).toFixed(2));
            $('#' + EmployeeId + '_PayRatePerHour').val($('#' + EmployeeId + '_PayRate').val() / 8);
        }
        else if ($('#' + EmployeeId + '_PayType').html() === 'Per Week') {
            //$('#' + EmployeeId + '_-2').val((($('#' + EmployeeId + '_PayRate').val() / 40) * $('#' + EmployeeId + '_-1').val()).toFixed(2));
            $('#' + EmployeeId + '_PayRatePerHour').val($('#' + EmployeeId + '_PayRate').val() / 40);
        }
        else if ($('#' + EmployeeId + '_PayType').html() === 'Per Bi-Week') {
            //$('#' + EmployeeId + '_-2').val((($('#' + EmployeeId + '_PayRate').val() / 80) * $('#' + EmployeeId + '_-1').val()).toFixed(2));
            $('#' + EmployeeId + '_PayRatePerHour').val($('#' + EmployeeId + '_PayRate').val() / 80);
        }
        else if ($('#' + EmployeeId + '_PayType').html() === 'Per Semi-Month') {
            //$('#' + EmployeeId + '_-2').val((($('#' + EmployeeId + '_PayRate').val() / 88) * $('#' + EmployeeId + '_-1').val()).toFixed(2));
            $('#' + EmployeeId + '_PayRatePerHour').val($('#' + EmployeeId + '_PayRate').val() / 88);
        }
        else if ($('#' + EmployeeId + '_PayType').html() === 'Per Month') {
            //$('#' + EmployeeId + '_-2').val((($('#' + EmployeeId + '_PayRate').val() / 176) * $('#' + EmployeeId + '_-1').val()).toFixed(2));
            $('#' + EmployeeId + '_PayRatePerHour').val($('#' + EmployeeId + '_PayRate').val() / 176);
        }
        else if ($('#' + EmployeeId + '_PayType').html() === 'Per Quarter') {
            //$('#' + EmployeeId + '_-2').val((($('#' + EmployeeId + '_PayRate').val() / 528) * $('#' + EmployeeId + '_-1').val()).toFixed(2));
            $('#' + EmployeeId + '_PayRatePerHour').val($('#' + EmployeeId + '_PayRate').val() / 528);
        }
        else if ($('#' + EmployeeId + '_PayType').html() === 'Per Semi-Annual') {
            //$('#' + EmployeeId + '_-2').val((($('#' + EmployeeId + '_PayRate').val() / 1056) * $('#' + EmployeeId + '_-1').val()).toFixed(2));
            $('#' + EmployeeId + '_PayRatePerHour').val($('#' + EmployeeId + '_PayRate').val() / 1056);
        }
        else if ($('#' + EmployeeId + '_PayType').html() === 'Per Year') {
            //$('#' + EmployeeId + '_-2').val((($('#' + EmployeeId + '_PayRate').val() / 2112) * $('#' + EmployeeId + '_-1').val()).toFixed(2));
            $('#' + EmployeeId + '_PayRatePerHour').val($('#' + EmployeeId + '_PayRate').val() / 2112);
        }
    }

    var TaxableAmount = $('#' + EmployeeId + '_-2').val() * $('#' + EmployeeId + '_PayRatePerHour').val();
    $('#' + EmployeeId + '_-7').val(0);
    $('#' + EmployeeId + '_-8').val(0);
    $('#' + EmployeeId + '_-10').val(0);
    $('#' + EmployeeId + '_-11').val(0);
    for (var i = 0; i < PayStubs.length; i++) {
        if (($('#' + EmployeeId + '_' + PayStubs[i].PayStubId).attr('paystubtype') == 'Addition') && ($('#' + EmployeeId + '_' + PayStubs[i].PayStubId).attr('taxable').toLowerCase() == 'true')) {
            if ($('#' + EmployeeId + '_' + PayStubs[i].PayStubId).attr('valuein') == 'Hours') {
                //if ($('#' + EmployeeId + '_' + PayStubs[i].PayStubId).attr('paystubcode') == 'OT') {
                //    TaxableAmount += parseFloat($('#' + EmployeeId + '_' + PayStubs[i].PayStubId).val() * $('#' + EmployeeId + '_PayRatePerHour').val() * 1.5);
                //}
                //else if ($('#' + EmployeeId + '_' + PayStubs[i].PayStubId).attr('paystubcode') == 'Double OT') {
                //    TaxableAmount += parseFloat($('#' + EmployeeId + '_' + PayStubs[i].PayStubId).val() * $('#' + EmployeeId + '_PayRatePerHour').val() * 2);
                //}
                //else {
                    TaxableAmount += parseFloat($('#' + EmployeeId + '_' + PayStubs[i].PayStubId).val() * $('#' + EmployeeId + '_PayRatePerHour').val());
                //}
            }
            else {
                TaxableAmount += parseFloat($('#' + EmployeeId + '_' + PayStubs[i].PayStubId).val().replace('$', '').replace(',', ''));
            }
        }
        //NetAmount += parseFloat($('#' + EmployeeId + '_' + PayStubs[i].PayStubId).val());
    }

    var params = { EmployeeId: EmployeeId, TaxableAmount: TaxableAmount };
    var dtoTax = CallService1('Client/PayCheckService.svc', 'GetTax', params)
    var params = { ClientId: $.localStorage.get('ClientId'), EmployeeId: EmployeeId, PayCheckId: 0, TaxableAmount: TaxableAmount };
    var SUITaxAmount = CallService1('Client/PayCheckService.svc', 'GetSUITax', params)
    $('#' + EmployeeId + '_-13').val(accounting.toFixed(SUITaxAmount, 2));
    $('#' + EmployeeId + '_-10').val(accounting.toFixed(dtoTax.SocialSecurityTaxAmount, 2));
    $('#' + EmployeeId + '_-11').val(accounting.toFixed(dtoTax.MedicareTaxAmount, 2));
    $('#' + EmployeeId + '_-14').val(accounting.toFixed(dtoTax.EmployerSocialSecurityTaxAmount, 2));
    $('#' + EmployeeId + '_-15').val(accounting.toFixed(dtoTax.EmployerMedicareTaxAmount, 2));
    $('#' + EmployeeId + '_-12').val(accounting.toFixed(dtoTax.EmployerFUTATaxAmount, 2));
    for (var i = 0; i < PayStubs.length; i++) {
        if (($('#' + EmployeeId + '_' + PayStubs[i].PayStubId).attr['paystubtype'] == 'Deduction') && ($('#' + EmployeeId + '_' + PayStubs[i].PayStubId).attr['taxable'].toLowerCase() == 'true')) {
            TaxableAmount += parseFloat($('#' + EmployeeId + '_' + PayStubs[i].PayStubId).val());
        }
        //NetAmount -= parseFloat($('#' + EmployeeId + '_' + PayStubs[i].PayStubId).val());
    }
    var FederalTaxAmount = 0;
    if ($('#chkSupplementalTaxRate').is(':checked')) {
        FederalTaxAmount = TaxableAmount * $('#cmbFederalTaxRate').val() * 0.01;
    }
    else {
        var params = { EmployeeId: EmployeeId, TaxableAmount: TaxableAmount };
        FederalTaxAmount = CallService1('Client/PayCheckService.svc', 'GetFederalTax', params);
    }
    $('#' + EmployeeId + '_-7').val(accounting.toFixed(FederalTaxAmount, 2));

    var params = { EmployeeId: EmployeeId, TaxableAmount: TaxableAmount };
    var StateTaxAmount = CallService1('Client/PayCheckService.svc', 'GetStateTax', params);
    $('#' + EmployeeId + '_-8').val(accounting.toFixed(StateTaxAmount, 2));

}

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
//});
function Save() {   
    if (form.valid()) {   
        var counter = 0;     
        var rowLength = document.getElementById('tblMain').rows.length;
        for (var i = 1; i < rowLength; i++) {
            var cellLength = document.getElementById('tblMain').rows[i].cells.length;
            for (var j = 5; j < 6; j++) {
                var cell = $(document.getElementById('tblMain').rows[i].cells[j]).find('.form-control');                    
                if (!cell.hasClass('hide')) {
                    cell.attr('style', 'text-align:right;width:80px;');                        
                }                
            }
        }
        for (var i = 1; i < rowLength; i++) {
            var cellLength = document.getElementById('tblMain').rows[i].cells.length;
            for (var j = 5; j < 6 ; j++) {                
                var cell = $(document.getElementById('tblMain').rows[i].cells[j]).find('.form-control');                    
                if (!cell.hasClass('hide')) {
                    var found = false;                       
                    if (parseFloat(cell.val() == undefined ? 0 : cell.val().replace('$', '').replace(',', '')) == 0) {                            
                       
                    }
                    else {
                        found = true;
                    }
                    if (found) {
                        counter++;
                        $(document.getElementById('tblMain').rows[i]).find('input[type="checkbox"]').prop("checked", true);
                    }
                    else {                                                     
                        cell.attr('style', 'text-align:right;width:80px;background-color:red');                           
                    }                       
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
                            for (var i = 1; i < rowLength; i++) {
                                var cellLength = document.getElementById('tblMain').rows[i].cells.length;
                                for (var j = 4; j < cellLength - 2; j++) {
                                    if ($(document.getElementById('tblMain').rows[i]).find('input[type="checkbox"]').is(':checked')) {
                                        var cell = $(document.getElementById('tblMain').rows[i].cells[j]).find('.form-control');
                                        var arrCell = cell.attr('id').split('_');
                                        var PayRatePerHour = $('#' + arrCell[0] + '_PayRatePerHour').val();
                                        var Hours = 0;
                                        var Amount = cell.val().replace('$', '').replace(',', '');
                                        if (cell.attr('valuein') == 'Hours') {
                                            //if (cell.attr('paystubcode') == 'OT') {
                                            //    Hours = parseFloat(cell.val());
                                            //    PayRatePerHour = PayRatePerHour * 1.5;
                                            //    Amount = Hours * PayRatePerHour;
                                            //}
                                            //else if (cell.attr('paystubcode') == 'Double OT') {
                                            //    Hours = parseFloat(cell.val());
                                            //    PayRatePerHour = PayRatePerHour * 2
                                            //    Amount = Hours * PayRatePerHour;
                                            //}
                                            //else {
                                            Hours = parseFloat(cell.val());
                                            Amount = Hours * PayRatePerHour;
                                            //}
                                        }
                                        else {
                                            PayRatePerHour = 0;
                                        }
                                        if (!cell.hasClass('hide')) {
                                            PayCheckDetails += '0' + String.fromCharCode(134) + $('#cmbPayCheckType').val() + String.fromCharCode(134) + $('#chkSupplementalTaxRate').is(':checked') + String.fromCharCode(134) + $('#cmbFederalTaxRate').val() + String.fromCharCode(134) + '0' + String.fromCharCode(134) + arrCell[0] + String.fromCharCode(134) + $('#txtPayDate').val() + String.fromCharCode(134) + arrCell[1] + String.fromCharCode(134) + Hours + String.fromCharCode(134) + parseFloat(Amount) + String.fromCharCode(134) + PayRatePerHour + String.fromCharCode(134) + $('#' + arrCell[0] + '_PayRate').val() + String.fromCharCode(134) + $('#' + arrCell[0] + '_PayType1').val() + String.fromCharCode(134) + $("#txtNotes").val() + String.fromCharCode(135);
                                        }
                                    }
                                }
                            }
                            if (PayCheckDetails != '') {
                                PayCheckDetails = PayCheckDetails.substring(0, PayCheckDetails.length - 1);
                            }
                            var params = {
                                PayCheckMainId: 0,
                                PayScheduleId: 0,
                                PayPeriod: $("#txtPeriodStartDate").val() + ' - ' + $("#txtPeriodEndDate").val(),
                                PayCheckDetails: PayCheckDetails
                            };
                            CallService('Client/PayCheckService.svc', 'Save', params, OnPayCheckSaveSuccess, false);
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

function OnPayCheckSaveSuccess(PayCheckMainId) {
    if (PayCheckMainId > 0) {
        dtoPayCheckMain.PayCheckMainId = PayCheckMainId;
        Step(2);
    }
}

function Close() {
    window.location = "/Client/Main.html#ViewAllPayChecks";
}
function CheckAll() {
    $('input[type="checkbox"]').each(function () {
        if ($(this).context.name == "chk") {
            $(this).prop("checked", $('input[name="0"]')[0].checked);
        }
    });
}

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
$(document).on("change", "#chkSupplementalTaxRate", function () { 
    if ($(this).is(":checked")) {
        $('#trFederalTaxRate').removeClass('hide');
    }
    else
    {
        $('#trFederalTaxRate').addClass('hide');
    }  
});
window.scrollTo(0, 0);