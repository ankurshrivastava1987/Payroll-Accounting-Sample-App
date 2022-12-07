CheckPageRequest();
var CurrentStepIndex = 1;
var dtoState;
app.page("Employee", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnEmployeeId').val(params);
            $('#hdnRootPath').val('Documents/Employees/' + $('#hdnEmployeeId').val());
            $('#hdnCurrentPath').val('Documents/Employees/' + $('#hdnEmployeeId').val());
            $('.page-head').html("Edit Employee");
            var params = { ClientId: parseInt($.localStorage.get('ClientId'), 10), EmployeeId: parseInt($('#hdnEmployeeId').val(), 10) };
            var dtoEmployee = CallService1('Client/EmployeeService.svc', 'GetObject', params);
            if (dtoEmployee.EmployeeId != undefined) {
                $('#txtEmployeeCode').val(dtoEmployee.EmployeeCode);
                $('#txtFirstName').val(dtoEmployee.FirstName);
                $('#txtMiddleNameInitial').val(dtoEmployee.MiddleNameInitial);
                $('#txtLastName').val(dtoEmployee.LastName);
                $('#txtAddress1').val(dtoEmployee.Address1);
                $('#txtAddress2').val(dtoEmployee.Address2);                
                $('#txtCityName').val(dtoEmployee.CityName);
                $('#cmbStateName').val(dtoEmployee.StateId);
                StateChange();
                $('#cmbCountyName').val(dtoEmployee.CountyId);
                $('#txtZipCode').val(dtoEmployee.ZipCode);
                $('#txtZipCodeExt').val(dtoEmployee.ZipCodeExt);
                $('#cmbGender').val(dtoEmployee.Gender);
                $('#txtDateOfBirth').val((FormatDateUTC(dtoEmployee.DateOfBirth) == '01/01/1900' ? '' : FormatDateUTC(dtoEmployee.DateOfBirth)));
                $('#txtEMailId').val(dtoEmployee.EMailId);
                $('#txtWorkPhoneNo').val(dtoEmployee.WorkPhoneNo);
                $('#txtWorkPhoneNoExt').val(dtoEmployee.WorkPhoneNoExt);
                $('#txtCellPhoneNo').val(dtoEmployee.CellPhoneNo);
                $('#txtFaxNo').val(dtoEmployee.FaxNo);
                $('#cmbDepartmentName').val(dtoEmployee.DepartmentId);
                $('#cmbLocationName').val(dtoEmployee.LocationId);
                $('#cmbPayScheduleName').val(dtoEmployee.PayScheduleId);
                $('#txtBankName').val(dtoEmployee.BankName);
                $('#txtRoutingNo').val(dtoEmployee.RoutingNo);
                $('#txtAccountNo').val(dtoEmployee.AccountNo);
                $('#cmbAccountTypeName').val(dtoEmployee.AccountTypeId);
                $('#txtSocialSecurityNo').val(dtoEmployee.SocialSecurityNo);
                $('#chkContractor1099').prop('checked', dtoEmployee.Contractor1099);
                $('#chkNewHireReport').prop('checked', dtoEmployee.NewHireReport);
                $('#chkFormI9').prop('checked', dtoEmployee.FormI9);
                $('#txtHireDate').val((FormatDateUTC(dtoEmployee.HireDate) == '01/01/1900' ? '' : FormatDateUTC(dtoEmployee.HireDate)));
                $('#txtTerminationDate').val((FormatDateUTC(dtoEmployee.TerminationDate) == '01/01/1900' ? '' : FormatDateUTC(dtoEmployee.TerminationDate)));
                $('#txtNotes').val(dtoEmployee.Notes);
                $('#txtVacationHoursAvailable').val(dtoEmployee.VacationHoursAvailable.toFixed(2));
                $('#txtVacationHoursUsed').val(dtoEmployee.VacationHoursUsed.toFixed(2));
                $('#txtSickLeaveHoursAvailable').val(dtoEmployee.SickLeaveHoursAvailable.toFixed(2));
                $('#txtSickLeaveHoursUsed').val(dtoEmployee.SickLeaveHoursUsed.toFixed(2));
                $('#cmbCompensationClassName').val(dtoEmployee.CompensationClassId);
                $('#cmbPaymentMethod').val(dtoEmployee.PaymentMethod);
                $('#cmbStatus').val(dtoEmployee.Status);
            }
            else {
                window.location = "/Client/Main.html#ViewAllEmployees";
            }
            FillFederalTaxes();
            FillCompensations();
            FillSummaries();
            FillFiles();
            FillPayStub();
        }
        else
        {
            FillPayStub();
        }
        if (parseInt($('#hdnEmployeeId').val(), 10) == 0) {
            $('#liStep5').addClass('hide');
        }
    }
});

if (GetQueryParameter('StepIndex') > 0) {   
    CurrentStepIndex = parseInt(GetQueryParameter('StepIndex'), 10);
    StepClick(CurrentStepIndex);
}

$("#txtEmployeeCode").focus();
$('#btnGo').hide();
$('.phoneno').mask('(000) 000-0000', {
    placeholder: "(000) 000-0000"
});
$('.ssn').mask('000-00-0000', {
    placeholder: "000-00-0000"
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
    "AlreadyExists4",
    function (value, element) {
        if (value.trim() == '')
        {
            return true;
        }
        var params = { ClientId: $.localStorage.get('ClientId'), EmployeeId: parseInt($("#hdnEmployeeId").val(), 10), EmployeeCode: value };
        var response = CallService1('Client/EmployeeService.svc', 'Exists', params);

        return !response;
    },
    "Employee Code already exists"
);
$.validator.addMethod(
    "InvalidDateOfBirth",
    function (value, element) {
        if ($('#txtDateOfBirth').val().trim() != '') {
            return ($('#txtDateOfBirth').val().trim().length < 10 ? false : true);
        }
        return true;
    },
    "Invalid Date Of Birth"
);
$.validator.addMethod(
    "InvalidHireDate",
    function (value, element) {
        if ($('#txtHireDate').val().trim() != '') {
            return ($('#txtHireDate').val().trim().length < 10 ? false : true);
        }
        return true;
    },
    "Invalid Hire Date"
);
$.validator.addMethod(
    "InvalidTerminationDate",
    function (value, element) {
        if ($('#txtTerminationDate').val().trim() != '') {
            return ($('#txtTerminationDate').val().trim().length < 10 ? false : true);
        }
        return true;
    },
    "Invalid Hire Date"
);
$.validator.addMethod(
    "InvalidWorkPhoneNo",
    function (value, element) {
        if ($('#txtWorkPhoneNo').val().trim() != '') {
            return ($('#txtWorkPhoneNo').val().trim().length < 14 ? false : true);
        }
        return true;
    },
    "Invalid Work Phone #"
);
$.validator.addMethod(
    "InvalidCellPhoneNo",
    function (value, element) {
        if ($('#txtCellPhoneNo').val().trim() != '') {
            return ($('#txtCellPhoneNo').val().trim().length < 14 ? false : true);
        }
        return true;
    },
    "Invalid Cell Phone #"
);
$.validator.addMethod(
    "Required1", 
        function (value, element) {        
        
        return ($('#cmbStateName').val()=='0'?false:true);
    },
        "State is required"
);

$.validator.addMethod(
    "InvalidSSN",
    function (value, element) {
        if ($('#txtSocialSecurityNo').val().trim() == '')
        {
            return true;
        }
        return ($('#txtSocialSecurityNo').val().trim().length < 11 ? false : true);
    },
    "Invalid Social Security #"
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
        txtEmployeeCode: {
            AlreadyExists4: true
        },
        txtFirstName: {
            required: true
        },
        txtLastName: {
            required: true
        },
        txtAddress1: {
            required: true
        },
        txtCityName: {
            required: true
        },       
        cmbStateName: {
            Required1: true
        },        
        txtZipCode: {
            required: true
        },
        txtWorkPhoneNo: {
            InvalidWorkPhoneNo: true
        },
        txtCellPhoneNo: {
            InvalidCellPhoneNo: true
        },
        txtDateOfBirth: {           
            InvalidDateOfBirth: true
        },
        txtEMailId: {            
            email: true            
        },
        txtSocialSecurityNo: { 
            required: true,           
            InvalidSSN: true
        },
        txtHireDate: {            
            InvalidHireDate: true
        },
        txtTerminationDate: {
            InvalidTerminationDate: true
        },
    },
    messages: {
        txtFirstName: {
            required: 'First Name is required'
        },
        txtLastName: {
            required: 'Last Name is required'
        },
        txtAddress1: {
            required: 'Address is required'
        },
        txtCityName: {
            required: 'City is required'
        },           
        txtZipCode: {
            required: 'Zip is required'
        },
        txtSocialSecurityNo: {
            required: 'Social Security # is required'
        },
        txtEMailId: {           
            email: 'Incorrect E-Mail format'
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
function FillStates() {
    var params = {};
    var states = CallService1('Client/StateService.svc', 'GetLookup', params);
    var html = '<option value="0"></option>';
    if (states != undefined) {
        for (var i = 0; i < states.length; i++) {
            html += '<option value="' + states[i]['StateId'] + '">' + states[i]['StateName'] + '</option>';
        }
    }
    $('#cmbStateName').append(html);
    $('#cmbStateName').val("0");
    $('#cmbStateName1').append(html);
    $('#cmbStateName1').val("0");
}
FillStates();
function FillPayStub() {
    var params = { ClientId: $.localStorage.get('ClientId'), EmployeeId: $('#hdnEmployeeId').val()};
    CallService('Client/EmployeeService.svc', 'GetEmployeePayStubs', params, OnPayStubGetEmployeePayStubsSuccess, true);
}
function OnPayStubGetEmployeePayStubsSuccess(payStubs) {
    if (payStubs != undefined) {       
        var html = '';
        for (var i = 0; i < payStubs.length; i++) {
            html += '<tr id="' + _.escape(payStubs[i].PayStubId) + '" class="' + (i % 2 == 0 ? "footable-even" : "footable-odd") + '">';
            html += '<td><input type="checkbox" name="chk"' + (payStubs[i].PayStubId1 > 0 ? ' checked': '') + '/></td>';            
            html += '<td>' + _.escape(payStubs[i].PayStubName) + '</td>';                        
            html += '</tr>';
        }
        $('#bodyPayStubs').html(html);        
    }
}
function InitializeDateControls() {   
    $('.input-date-picker').datepicker({
        format: 'mm/dd/yyyy',
        orientation: 'bottom',
        autoclose: true,
        todayHighlight: true
    });
    $('.input-date-picker').mask('00/00/0000', {
        placeholder: "MM/DD/YYYY"
    });
    $(".cancel").click(function () {
        if ($(this).closest('tr').attr('id') != undefined) {            
            $(this).closest('tr').find('.spanStartDate').removeClass('hide');
            $(this).closest('tr').find('.txtStartDate').addClass('hide');            
            $(this).closest('tr').find('.spanFederalFilingStatusName').removeClass('hide');
            $(this).closest('tr').find('.cmbFederalFilingStatusName').addClass('hide'); 
            $(this).closest('tr').find('.spanAllowances').removeClass('hide');
            $(this).closest('tr').find('.txtAllowances').addClass('hide'); 
            $(this).closest('tr').find('.spanAdditionalWithholdings').removeClass('hide');
            $(this).closest('tr').find('.txtAdditionalWithholdings').addClass('hide'); 
            $(this).closest('tr').find('.spanAllowance').removeClass('hide');
            $(this).closest('tr').find('.cmbAllowance').addClass('hide');
            $(this).closest('tr').find('.spanExemption').removeClass('hide');
            $(this).closest('tr').find('.cmbExemption').addClass('hide'); 
            $(this).closest('tr').find('.ok').addClass('hide');
            $(this).closest('tr').find('.cancel').addClass('hide');
            $(this).closest('tr').find('.edit').removeClass('hide');
            $(this).closest('tr').find('.delete').removeClass('hide');
        }
        else {
            $(this).closest('tr').remove();
        }
        return false;
    });
    $(".ok").click(function () { 
        if ($(this).closest('tr').find('.txtStartDate').val() == "") {           
            bootbox.dialog({
                message: "Start Date is required",
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
            $(this).closest('tr').find('.txtStartDate').focus(); 
            return false;     
        }
        if ($(this).closest('tr').find('.txtStartDate').val().trim().length < 10) {           
            bootbox.dialog({
                message: "Invalid Start Date",
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
            $(this).closest('tr').find('.txtStartDate').focus();
            return false;
        }
        var arrFederalTaxes = $('#hdnFederalTaxes').val().split(String.fromCharCode(135));
        if (arrFederalTaxes[0] == "") {
            arrFederalTaxes.splice(0, 1);
        }
        var found = false;
        for (var i = 0; i < arrFederalTaxes.length; i++) {
            var arrFederalTax = arrFederalTaxes[i].split(String.fromCharCode(134))
            if (($(this).closest('tr').attr('id') != 'FRow' + arrFederalTax[0]) && ($(this).closest('tr').find('.txtStartDate').val() == arrFederalTax[2]) && arrFederalTax[11]=="0") {
                found = true;
                break;
            }
        }
        if (found) {            
            bootbox.dialog({
                message: "Start Date already exists",
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
            $(this).closest('tr').find('.txtStartDate').focus();         
            return false;
        }
        if ($(this).closest('tr').find('.cmbFederalFilingStatusName').val().trim() == "0") {            
            bootbox.dialog({
                message: "Filing Status is required",
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
            $(this).closest('tr').find('.cmbFederalFilingStatusName').focus();   
            return false;
        }
        if ($(this).closest('tr').attr('id') == undefined) {
            $(this).closest('tr').attr('id', 'FRow' + arrFederalTaxes.length);
            var FederalTax = '';
            FederalTax += arrFederalTaxes.length + String.fromCharCode(134);
            FederalTax += '0' + String.fromCharCode(134);
            FederalTax += $(this).closest('tr').find('.txtStartDate').val() + String.fromCharCode(134);
            FederalTax += $(this).closest('tr').find('.cmbFederalFilingStatusName').val() + String.fromCharCode(134);
            FederalTax += $(this).closest('tr').find('.cmbFederalFilingStatusName option:selected').text() + String.fromCharCode(134);            
            FederalTax += $(this).closest('tr').find('.txtAllowances').val() + String.fromCharCode(134);
            FederalTax += $(this).closest('tr').find('.txtAdditionalWithholdings').val() + String.fromCharCode(134);
            FederalTax += $(this).closest('tr').find('.cmbAllowance').val() + String.fromCharCode(134);
            FederalTax += $(this).closest('tr').find('.cmbAllowance option:selected').text() + String.fromCharCode(134);
            FederalTax += $(this).closest('tr').find('.cmbExemption').val() + String.fromCharCode(134);
            FederalTax += $(this).closest('tr').find('.cmbExemption option:selected').text() + String.fromCharCode(134);
            FederalTax += "0";
            arrFederalTaxes.push(FederalTax);            
        }
        else {
            var FederalTax = '';
            FederalTax += $(this).closest('tr').attr('id').replace('FRow', '') + String.fromCharCode(134);
            FederalTax += '0' + String.fromCharCode(134);
            FederalTax += $(this).closest('tr').find('.txtStartDate').val() + String.fromCharCode(134);
            FederalTax += $(this).closest('tr').find('.cmbFederalFilingStatusName').val() + String.fromCharCode(134);
            FederalTax += $(this).closest('tr').find('.cmbFederalFilingStatusName option:selected').text() + String.fromCharCode(134);            
            FederalTax += $(this).closest('tr').find('.txtAllowances').val() + String.fromCharCode(134);
            FederalTax += $(this).closest('tr').find('.txtAdditionalWithholdings').val() + String.fromCharCode(134);
            FederalTax += $(this).closest('tr').find('.cmbAllowance').val() + String.fromCharCode(134);
            FederalTax += $(this).closest('tr').find('.cmbAllowance option:selected').text() + String.fromCharCode(134);
            FederalTax += $(this).closest('tr').find('.cmbExemption').val() + String.fromCharCode(134);
            FederalTax += $(this).closest('tr').find('.cmbExemption option:selected').text() + String.fromCharCode(134);
            FederalTax += "0";
            arrFederalTaxes[parseInt($(this).closest('tr').attr('id').replace('FRow', ''))] = FederalTax;
        }
        $('#hdnFederalTaxes').val(arrFederalTaxes.join(String.fromCharCode(135)));     
        FillGrid();
        return false;
    });
    $(".edit").click(function () {
        var arrFederalTaxes = $('#hdnFederalTaxes').val().split(String.fromCharCode(135));
        var arrFederalTax = arrFederalTaxes[$(this).closest('tr').attr('id').replace('FRow', '')].split(String.fromCharCode(134));
        $(this).closest('tr').find('.txtStartDate').val(arrFederalTax[2]);
        $(this).closest('tr').find('.txtStartDate').removeClass('hide');
        $(this).closest('tr').find('.spanStartDate').addClass('hide');
        $(this).closest('tr').find('.cmbFederalFilingStatusName').val(arrFederalTax[3]);
        $(this).closest('tr').find('.cmbFederalFilingStatusName').removeClass('hide');
        $(this).closest('tr').find('.spanFederalFilingStatusName').addClass('hide'); 
        $(this).closest('tr').find('.txtAllowances').val(arrFederalTax[5]);
        $(this).closest('tr').find('.txtAllowances').removeClass('hide');
        $(this).closest('tr').find('.spanAllowances').addClass('hide');
        $(this).closest('tr').find('.txtAdditionalWithholdings').val(accounting.formatMoney(arrFederalTax[6]));
        $(this).closest('tr').find('.txtAdditionalWithholdings').removeClass('hide');
        $(this).closest('tr').find('.spanAdditionalWithholdings').addClass('hide');
        $(this).closest('tr').find('.cmbAllowance').val(arrFederalTax[7]);
        $(this).closest('tr').find('.cmbAllowance').removeClass('hide');
        $(this).closest('tr').find('.spanAllowance').addClass('hide');
        $(this).closest('tr').find('.cmbExemption').val(arrFederalTax[9]);
        $(this).closest('tr').find('.cmbExemption').removeClass('hide');
        $(this).closest('tr').find('.spanExemption').addClass('hide');
        $(this).closest('tr').find('.ok').removeClass('hide');
        $(this).closest('tr').find('.cancel').removeClass('hide');
        $(this).closest('tr').find('.edit').addClass('hide');
        $(this).closest('tr').find('.delete').addClass('hide');       
        SetKeyPress(); 
        FocusInFocusOut();      
        return false;
    });
    $(".delete").click(function () {
        var id = $(this).closest('tr').attr('id').replace('FRow', '');       
        bootbox.dialog({
            message: "Are you sure to delete selected record?",
            title: "Payroll",
            buttons: {
                ok: {
                    label: "<i class=\"fa fa-check\" aria-hidden=\"true\"></i> OK",
                    className: "btn btn-primary",
                    callback: function () {
                        var arrFederalTaxes = $('#hdnFederalTaxes').val().split(String.fromCharCode(135));
                        for (var i = 0; i < arrFederalTaxes.length; i++) {
                            var arrFederalTax = arrFederalTaxes[i].split(String.fromCharCode(134));
                            if (arrFederalTax[0] == id) {
                                arrFederalTax[11] = "1";
                                arrFederalTaxes[i] = arrFederalTax.join(String.fromCharCode(134));
                                $('#hdnFederalTaxes').val(arrFederalTaxes.join(String.fromCharCode(135)));
                                break;
                            }
                        }
                        FillGrid();
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
        
        return false;
    });   
};
function InitializeDateControls1() {   
    $('.input-date-picker').datepicker({
        format: 'mm/dd/yyyy',
        orientation: 'bottom',
        autoclose: true,
        todayHighlight: true
    });
    $('.input-date-picker').mask('00/00/0000', {
        placeholder: "MM/DD/YYYY"
    });
    $(".cancel1").click(function () {
        if ($(this).closest('tr').attr('id') != undefined) {
            $(this).closest('tr').find('.spanStartDate1').removeClass('hide');
            $(this).closest('tr').find('.txtStartDate1').addClass('hide');            
            $(this).closest('tr').find('.spanFilingStatusName1').removeClass('hide');
            $(this).closest('tr').find('.cmbFilingStatusName1').addClass('hide');
            $(this).closest('tr').find('.spanFilingStatusName2').removeClass('hide');
            $(this).closest('tr').find('.cmbFilingStatusName2').addClass('hide');            
            $(this).closest('tr').find('.spanAllowance').removeClass('hide');
            $(this).closest('tr').find('.cmbAllowance').addClass('hide');
            $(this).closest('tr').find('.spanDependants').removeClass('hide');
            $(this).closest('tr').find('.txtDependants').addClass('hide');
            $(this).closest('tr').find('.spanPersonalExemptions').removeClass('hide');
            $(this).closest('tr').find('.txtPersonalExemptions').addClass('hide');
            $(this).closest('tr').find('.spanDependentExemptions').removeClass('hide');
            $(this).closest('tr').find('.txtDependentExemptions').addClass('hide');
            $(this).closest('tr').find('.spanAgeExemptions').removeClass('hide');
            $(this).closest('tr').find('.txtAgeExemptions').addClass('hide');
            $(this).closest('tr').find('.spanBlindExemptions').removeClass('hide');
            $(this).closest('tr').find('.txtBlindExemptions').addClass('hide');
            $(this).closest('tr').find('.spanAdditionalAllowances').removeClass('hide');
            $(this).closest('tr').find('.txtAdditionalAllowances').addClass('hide');
            $(this).closest('tr').find('.spanBasicAllowances').removeClass('hide');
            $(this).closest('tr').find('.txtBasicAllowances').addClass('hide');
            $(this).closest('tr').find('.spanAdditionalAmount').removeClass('hide');
            $(this).closest('tr').find('.txtAdditionalAmount').addClass('hide');
            $(this).closest('tr').find('.spanIsDelawareWorkplace').removeClass('hide');
            $(this).closest('tr').find('.cmbIsDelawareWorkplace').addClass('hide'); 
            $(this).closest('tr').find('.ok1').addClass('hide');
            $(this).closest('tr').find('.cancel1').addClass('hide');
            $(this).closest('tr').find('.edit1').removeClass('hide');
            $(this).closest('tr').find('.delete1').removeClass('hide');
        }
        else {
            $(this).closest('tr').remove();
        }
        return false;
    });
    $(".ok1").click(function () {
        if ($(this).closest('tr').find('.txtStartDate1').val() == "") {           
            bootbox.dialog({
                message: "Start Date is required",
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
            $(this).closest('tr').find('.txtStartDate1').focus();
            return false;
        }
        if ($(this).closest('tr').find('.txtStartDate1').val().trim().length < 10) {           
            bootbox.dialog({
                message: "Invalid Start Date",
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
            $(this).closest('tr').find('.txtStartDate1').focus();
            return false;
        }
        var arrStateTaxes = $('#hdnStateTaxes').val().split(String.fromCharCode(135));
        if (arrStateTaxes[0] == "") {
            arrStateTaxes.splice(0, 1);
        }
        var found = false;
        for (var i = 0; i < arrStateTaxes.length; i++) {
            var arrStateTax = arrStateTaxes[i].split(String.fromCharCode(134))
            if (($(this).closest('tr').attr('id') != 'SRow' + arrStateTax[0]) && ($(this).closest('tr').find('.txtStartDate1').val() == arrStateTax[2]) && arrStateTax[19]=='0') {
                found = true;
                break;
            }
        }
        if (found) {           
            bootbox.dialog({
                message: "Start Date already exists",
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
            $(this).closest('tr').find('.txtStartDate1').focus();
            return false;
        }       
       
        if ($(this).closest('tr').attr('id') == undefined) {
            $(this).closest('tr').attr('id', 'SRow' + arrStateTaxes.length);
            var StateTax = '';
            StateTax += arrStateTaxes.length + String.fromCharCode(134);           
            StateTax += '0' + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.txtStartDate1').val() + String.fromCharCode(134);           
            StateTax += $(this).closest('tr').find('.cmbFilingStatusName1').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.cmbFilingStatusName1 option:selected').text() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.cmbFilingStatusName2').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.cmbFilingStatusName2 option:selected').text() + String.fromCharCode(134);            
            StateTax += $(this).closest('tr').find('.cmbAllowance').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.cmbAllowance option:selected').text() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.txtDependants').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.txtPersonalExemptions').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.txtDependentExemptions').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.txtAgeExemptions').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.txtBlindExemptions').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.txtAdditionalAllowances').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.txtBasicAllowances').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.txtAdditionalAmount').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.cmbIsDelawareWorkplace').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.cmbIsDelawareWorkplace option:selected').text() + String.fromCharCode(134);
            StateTax += "0";
            arrStateTaxes.push(StateTax);

        }
        else {
            var StateTax = '';
            StateTax += $(this).closest('tr').attr('id').replace('SRow', '') + String.fromCharCode(134);            
            StateTax += '0' + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.txtStartDate1').val() + String.fromCharCode(134);            
            StateTax += $(this).closest('tr').find('.cmbFilingStatusName1').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.cmbFilingStatusName1 option:selected').text() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.cmbFilingStatusName2').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.cmbFilingStatusName2 option:selected').text() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.cmbAllowance').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.cmbAllowance option:selected').text() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.txtDependants').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.txtPersonalExemptions').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.txtDependentExemptions').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.txtAgeExemptions').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.txtBlindExemptions').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.txtAdditionalAllowances').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.txtBasicAllowances').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.txtAdditionalAmount').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.cmbIsDelawareWorkplace').val() + String.fromCharCode(134);
            StateTax += $(this).closest('tr').find('.cmbIsDelawareWorkplace option:selected').text() + String.fromCharCode(134);
            StateTax += "0";
            arrStateTaxes[parseInt($(this).closest('tr').attr('id').replace('SRow', ''))] = StateTax;
        }
        $('#hdnStateTaxes').val(arrStateTaxes.join(String.fromCharCode(135)));        
        
        FillGrid1();
        return false;
    });
    $(".edit1").click(function () {        
        var arrStateTaxes = $('#hdnStateTaxes').val().split(String.fromCharCode(135));
        var arrStateTax = arrStateTaxes[$(this).closest('tr').attr('id').replace('SRow', '')].split(String.fromCharCode(134));
        $(this).closest('tr').find('.txtStartDate1').val(arrStateTax[2]);
        $(this).closest('tr').find('.txtStartDate1').removeClass('hide');
        $(this).closest('tr').find('.spanStartDate1').addClass('hide');        
        $(this).closest('tr').find('.cmbFilingStatusName1').val(arrStateTax[3]);
        $(this).closest('tr').find('.cmbFilingStatusName1').removeClass('hide');
        $(this).closest('tr').find('.spanFilingStatusName1').addClass('hide');
        $(this).closest('tr').find('.cmbFilingStatusName2').val(arrStateTax[5]);
        $(this).closest('tr').find('.cmbFilingStatusName2').removeClass('hide');
        $(this).closest('tr').find('.spanFilingStatusName2').addClass('hide');  
        $(this).closest('tr').find('.cmbAllowance').val(arrStateTax[7]);
        $(this).closest('tr').find('.cmbAllowance').removeClass('hide');
        $(this).closest('tr').find('.spanAllowance').addClass('hide');
        $(this).closest('tr').find('.txtDependants').val(arrStateTax[9]);
        $(this).closest('tr').find('.txtDependants').removeClass('hide');
        $(this).closest('tr').find('.spanDependants').addClass('hide');
        $(this).closest('tr').find('.txtPersonalExemptions').val(arrStateTax[10]);
        $(this).closest('tr').find('.txtPersonalExemptions').removeClass('hide');
        $(this).closest('tr').find('.spanPersonalExemptions').addClass('hide');
        $(this).closest('tr').find('.txtDependentExemptions').val(arrStateTax[11]);
        $(this).closest('tr').find('.txtDependentExemptions').removeClass('hide');
        $(this).closest('tr').find('.spanDependentExemptions').addClass('hide');
        $(this).closest('tr').find('.txtAgeExemptions').val(arrStateTax[12]);
        $(this).closest('tr').find('.txtAgeExemptions').removeClass('hide');
        $(this).closest('tr').find('.spanAgeExemptions').addClass('hide');
        $(this).closest('tr').find('.txtBlindExemptions').val(arrStateTax[13]);
        $(this).closest('tr').find('.txtBlindExemptions').removeClass('hide');
        $(this).closest('tr').find('.spanBlindExemptions').addClass('hide');
        $(this).closest('tr').find('.txtAdditionalAllowances').val(arrStateTax[14]);
        $(this).closest('tr').find('.txtAdditionalAllowances').removeClass('hide');
        $(this).closest('tr').find('.spanAdditionalAllowances').addClass('hide');
        $(this).closest('tr').find('.txtBasicAllowances').val(arrStateTax[15]);
        $(this).closest('tr').find('.txtBasicAllowances').removeClass('hide');
        $(this).closest('tr').find('.spanBasicAllowances').addClass('hide');
        $(this).closest('tr').find('.txtAdditionalAmount').val(arrStateTax[16]);
        $(this).closest('tr').find('.txtAdditionalAmount').removeClass('hide');
        $(this).closest('tr').find('.spanAdditionalAmount').addClass('hide');
        $(this).closest('tr').find('.cmbIsDelawareWorkplace').val(arrStateTax[17]);
        $(this).closest('tr').find('.cmbIsDelawareWorkplace').removeClass('hide');
        $(this).closest('tr').find('.spanIsDelawareWorkplace').addClass('hide');
        $(this).closest('tr').find('.ok1').removeClass('hide');
        $(this).closest('tr').find('.cancel1').removeClass('hide');
        $(this).closest('tr').find('.edit1').addClass('hide');
        $(this).closest('tr').find('.delete1').addClass('hide');       
        SetKeyPress();
        return false;
    });
    $(".delete1").click(function () {
        var id = $(this).closest('tr').attr('id').replace('SRow', '');       
        bootbox.dialog({
            message: "Are you sure to delete selected record?",
            title: "Payroll",
            buttons: {
                ok: {
                    label: "<i class=\"fa fa-check\" aria-hidden=\"true\"></i> OK",
                    className: "btn btn-primary",
                    callback: function () {
                        var arrStateTaxes = $('#hdnStateTaxes').val().split(String.fromCharCode(135));
                        for (var i = 0; i < arrStateTaxes.length; i++) {
                            var arrStateTax = arrStateTaxes[i].split(String.fromCharCode(134));
                            if (arrStateTax[0] == id) {
                                arrStateTax[19] = "1";
                                arrStateTaxes[i] = arrStateTax.join(String.fromCharCode(134));
                                $('#hdnStateTaxes').val(arrStateTaxes.join(String.fromCharCode(135)));
                                break;
                            }
                        }
                        FillGrid1();
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
        return false;
    });
};
function InitializeDateControls2() { 
    $('.input-date-picker').datepicker({
        format: 'mm/dd/yyyy',
        orientation: 'bottom',
        autoclose: true,
        todayHighlight: true
    });
    $('.input-date-picker').mask('00/00/0000', {
        placeholder: "MM/DD/YYYY"
    });
    $(".cancel2").click(function () {
        if ($(this).closest('tr').attr('id') != undefined) {
            $(this).closest('tr').find('.spanStartDate2').removeClass('hide');
            $(this).closest('tr').find('.txtStartDate2').addClass('hide');
            $(this).closest('tr').find('.spanPayTypeName1').removeClass('hide');
            $(this).closest('tr').find('.cmbPayTypeName1').addClass('hide');
            $(this).closest('tr').find('.spanPayRate').removeClass('hide');
            $(this).closest('tr').find('.txtPayRate').addClass('hide');
            $(this).closest('tr').find('.spanVacationDays1').removeClass('hide');
            $(this).closest('tr').find('.txtVacationDays1').addClass('hide');
            $(this).closest('tr').find('.spanSickDays1').removeClass('hide');
            $(this).closest('tr').find('.txtSickDays1').addClass('hide');           
            $(this).closest('tr').find('.ok2').addClass('hide');
            $(this).closest('tr').find('.cancel2').addClass('hide');
            $(this).closest('tr').find('.edit2').removeClass('hide');
            $(this).closest('tr').find('.delete2').removeClass('hide');
        }
        else {
            $(this).closest('tr').remove();
        }
        return false;
    });
    $(".ok2").click(function () {
        if ($(this).closest('tr').find('.txtStartDate2').val() == "") {            
            bootbox.dialog({
                message: "Start Date is required",
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
            $(this).closest('tr').find('.txtStartDate2').focus();
            return false;
        }
        if ($(this).closest('tr').find('.txtStartDate2').val().trim().length < 10) {            
            bootbox.dialog({
                message: "Invalid Start Date",
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
            $(this).closest('tr').find('.txtStartDate2').focus();
            return false;
        }
        var arrCompensations = $('#hdnCompensations').val().split(String.fromCharCode(135));
        if (arrCompensations[0] == "") {
            arrCompensations.splice(0, 1);
        }
        var found = false;
        for (var i = 0; i < arrCompensations.length; i++) {
            var arrCompensation = arrCompensations[i].split(String.fromCharCode(134))
            if (($(this).closest('tr').attr('id') != 'CRow' + arrCompensation[0]) && ($(this).closest('tr').find('.txtStartDate2').val() == arrCompensation[2]) && arrCompensation[7]=='0') {
                found = true;
                break;
            }
        }
        if (found) {            
            bootbox.dialog({
                message: "Start Date already exists",
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
            $(this).closest('tr').find('.txtStartDate2').focus();
            return false;
        }
        if ($(this).closest('tr').find('.cmbPayTypeName1').val().trim() == "") {            
            bootbox.dialog({
                message: "Pay Type is required",
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
            $(this).closest('tr').find('.cmbPayTypeName1').focus();
            return false;
        }       
        if ($(this).closest('tr').attr('id') == undefined) {
            $(this).closest('tr').attr('id', 'CRow' + arrCompensations.length);
            var Compensation = '';
            Compensation += arrCompensations.length + String.fromCharCode(134);
            Compensation += '0' + String.fromCharCode(134);
            Compensation += $(this).closest('tr').find('.txtStartDate2').val() + String.fromCharCode(134);          
            Compensation += $(this).closest('tr').find('.cmbPayTypeName1 option:selected').text() + String.fromCharCode(134);
            Compensation += $(this).closest('tr').find('.txtPayRate').val() + String.fromCharCode(134);
            Compensation += $(this).closest('tr').find('.txtVacationDays1').val() + String.fromCharCode(134);
            Compensation += $(this).closest('tr').find('.txtSickDays1').val() + String.fromCharCode(134);            
            Compensation += "0";
            arrCompensations.push(Compensation);

        }
        else {
            var Compensation = '';
            Compensation += $(this).closest('tr').attr('id').replace('CRow', '') + String.fromCharCode(134);
            Compensation += '0' + String.fromCharCode(134);
            Compensation += $(this).closest('tr').find('.txtStartDate2').val() + String.fromCharCode(134);            
            Compensation += $(this).closest('tr').find('.cmbPayTypeName1 option:selected').text() + String.fromCharCode(134);
            Compensation += $(this).closest('tr').find('.txtPayRate').val() + String.fromCharCode(134);
            Compensation += $(this).closest('tr').find('.txtVacationDays1').val() + String.fromCharCode(134);
            Compensation += $(this).closest('tr').find('.txtSickDays1').val() + String.fromCharCode(134);           
            Compensation += "0";
            arrCompensations[parseInt($(this).closest('tr').attr('id').replace('CRow', ''))] = Compensation;
        }
        $('#hdnCompensations').val(arrCompensations.join(String.fromCharCode(135)));      
        FillGrid2();
        return false;
    });
    $(".edit2").click(function () {        
        var arrCompensations = $('#hdnCompensations').val().split(String.fromCharCode(135));
        var arrCompensation = arrCompensations[$(this).closest('tr').attr('id').replace('CRow', '')].split(String.fromCharCode(134));
        $(this).closest('tr').find('.txtStartDate2').val(arrCompensation[2]);
        $(this).closest('tr').find('.txtStartDate2').removeClass('hide');
        $(this).closest('tr').find('.spanStartDate2').addClass('hide');
        $(this).closest('tr').find('.cmbPayTypeName1').val(arrCompensation[3]);
        $(this).closest('tr').find('.cmbPayTypeName1').removeClass('hide');
        $(this).closest('tr').find('.spanPayTypeName1').addClass('hide');
        $(this).closest('tr').find('.txtPayRate').val(accounting.formatMoney(arrCompensation[4]));
        $(this).closest('tr').find('.txtPayRate').removeClass('hide');
        $(this).closest('tr').find('.spanPayRate').addClass('hide');
        $(this).closest('tr').find('.txtVacationDays1').val(arrCompensation[5]);
        $(this).closest('tr').find('.txtVacationDays1').removeClass('hide');
        $(this).closest('tr').find('.spanVacationDays1').addClass('hide');
        $(this).closest('tr').find('.txtSickDays1').val(arrCompensation[6]);
        $(this).closest('tr').find('.txtSickDays1').removeClass('hide');
        $(this).closest('tr').find('.spanSickDays1').addClass('hide');            
        $(this).closest('tr').find('.ok2').removeClass('hide');
        $(this).closest('tr').find('.cancel2').removeClass('hide');
        $(this).closest('tr').find('.edit2').addClass('hide');
        $(this).closest('tr').find('.delete2').addClass('hide');       
        SetKeyPress();
        FocusInFocusOut();
        return false;
    });
    $(".delete2").click(function () {
        var id = $(this).closest('tr').attr('id').replace('CRow', '');       
        bootbox.dialog({
            message: "Are you sure to delete selected record?",
            title: "Payroll",
            buttons: {
                ok: {
                    label: "<i class=\"fa fa-check\" aria-hidden=\"true\"></i> OK",
                    className: "btn btn-primary",
                    callback: function () {
                        var arrCompensations = $('#hdnCompensations').val().split(String.fromCharCode(135));
                        for (var i = 0; i < arrCompensations.length; i++) {
                            var arrCompensation = arrCompensations[i].split(String.fromCharCode(134));
                            if (arrCompensation[0] == id) {
                                arrCompensation[7] = "1";
                                arrCompensations[i] = arrCompensation.join(String.fromCharCode(134));
                                $('#hdnCompensations').val(arrCompensations.join(String.fromCharCode(135)));
                                break;
                            }
                        }
                        FillGrid2();
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
        return false;
    }); 
};
function InitializeDateControls3() {   
    $(".cancel3").click(function () {
        if ($(this).closest('tr').attr('id') != undefined) {
            $(this).closest('tr').find('.spanPayStubName').removeClass('hide');
            $(this).closest('tr').find('.cmbPayStubName').addClass('hide');
            $(this).closest('tr').find('.spanPayStubSide').removeClass('hide');
            $(this).closest('tr').find('.cmbPayStubSide').addClass('hide');
            $(this).closest('tr').find('.spanAmount').removeClass('hide');
            $(this).closest('tr').find('.txtAmount').addClass('hide');
            $(this).closest('tr').find('.spanFederalIncomeTax').removeClass('hide');
            $(this).closest('tr').find('.chkFederalIncomeTax').addClass('hide');
            $(this).closest('tr').find('.spanSocialSecurity').removeClass('hide');
            $(this).closest('tr').find('.chkSocialSecurity').addClass('hide');
            $(this).closest('tr').find('.spanMedicare').removeClass('hide');
            $(this).closest('tr').find('.chkMedicare').addClass('hide');
            $(this).closest('tr').find('.spanQuarter').removeClass('hide');
            $(this).closest('tr').find('.cmbQuarter').addClass('hide');           
            $(this).closest('tr').find('.ok3').addClass('hide');
            $(this).closest('tr').find('.cancel3').addClass('hide');
            $(this).closest('tr').find('.edit3').removeClass('hide');
            $(this).closest('tr').find('.delete3').removeClass('hide');
        }
        else {
            $(this).closest('tr').remove();
        }
        return false;
    });
    $(".ok3").click(function () {
        if ($(this).closest('tr').find('.cmbPayStubName').val() == "0") {          
            bootbox.dialog({
                message: "Pay Stub is required",
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
            $(this).closest('tr').find('.cmbPayStubName').focus();
            return false;
        }        
        var arrSummaries = $('#hdnSummaries').val().split(String.fromCharCode(135));
        if (arrSummaries[0] == "") {
            arrSummaries.splice(0, 1);
        }      
       
        if ($(this).closest('tr').attr('id') == undefined) {
            $(this).closest('tr').attr('id', 'MRow' + arrSummaries.length);
            var Summary = '';
            Summary += arrSummaries.length + String.fromCharCode(134);
            Summary += '0' + String.fromCharCode(134);
            Summary += $(this).closest('tr').find('.cmbPayStubName').val() + String.fromCharCode(134);
            Summary += $(this).closest('tr').find('.cmbPayStubName option:selected').text() + String.fromCharCode(134);
            Summary += $(this).closest('tr').find('.cmbPayStubSide').val() + String.fromCharCode(134);
            Summary += $(this).closest('tr').find('.cmbPayStubSide option:selected').text() + String.fromCharCode(134);
            Summary += $(this).closest('tr').find('.txtAmount').val() + String.fromCharCode(134);
            Summary += ($(this).closest('tr').find('.chkFederalIncomeTax').is(':checked')? 'Yes': 'No') + String.fromCharCode(134);
            Summary += ($(this).closest('tr').find('.chkSocialSecurity').is(':checked')?'Yes':'No') + String.fromCharCode(134);
            Summary += ($(this).closest('tr').find('.chkMedicare').is(':checked')?'Yes':'No') + String.fromCharCode(134);
            Summary += $(this).closest('tr').find('.cmbQuarter').val() + String.fromCharCode(134);
            Summary += $(this).closest('tr').find('.cmbQuarter option:selected').text() + String.fromCharCode(134);           
            Summary += "0";
            arrSummaries.push(Summary);

        }
        else {
            var Summary = '';
            Summary += $(this).closest('tr').attr('id').replace('MRow', '') + String.fromCharCode(134);
            Summary += '0' + String.fromCharCode(134);
            Summary += $(this).closest('tr').find('.cmbPayStubName').val() + String.fromCharCode(134);
            Summary += $(this).closest('tr').find('.cmbPayStubName option:selected').text() + String.fromCharCode(134);
            Summary += $(this).closest('tr').find('.cmbPayStubSide').val() + String.fromCharCode(134);
            Summary += $(this).closest('tr').find('.cmbPayStubSide option:selected').text() + String.fromCharCode(134);
            Summary += $(this).closest('tr').find('.txtAmount').val() + String.fromCharCode(134);
            Summary += ($(this).closest('tr').find('.chkFederalIncomeTax').is(':checked') ? 'Yes' : 'No') + String.fromCharCode(134);
            Summary += ($(this).closest('tr').find('.chkSocialSecurity').is(':checked') ? 'Yes' : 'No') + String.fromCharCode(134);
            Summary += ($(this).closest('tr').find('.chkMedicare').is(':checked') ? 'Yes' : 'No') + String.fromCharCode(134);
            Summary += $(this).closest('tr').find('.cmbQuarter').val() + String.fromCharCode(134);
            Summary += $(this).closest('tr').find('.cmbQuarter option:selected').text() + String.fromCharCode(134); 
            Summary += "0";
            arrSummaries[parseInt($(this).closest('tr').attr('id').replace('MRow', ''))] = Summary;
        }
        $('#hdnSummaries').val(arrSummaries.join(String.fromCharCode(135)));        
        FillGrid3();
        return false;
    });
    $(".edit3").click(function () {        
        var arrSummaries = $('#hdnSummaries').val().split(String.fromCharCode(135));
        var arrSummary = arrSummaries[$(this).closest('tr').attr('id').replace('MRow', '')].split(String.fromCharCode(134));
        $(this).closest('tr').find('.cmbPayStubName').val(arrSummary[2]);
        $(this).closest('tr').find('.cmbPayStubName').removeClass('hide');
        $(this).closest('tr').find('.spanPayStubName').addClass('hide');
        $(this).closest('tr').find('.cmbPayStubSide').val(arrSummary[4]);
        $(this).closest('tr').find('.cmbPayStubSide').removeClass('hide');
        $(this).closest('tr').find('.spanPayStubSide').addClass('hide');
        $(this).closest('tr').find('.txtAmount').val(accounting.formatMoney(arrSummary[6]));
        $(this).closest('tr').find('.txtAmount').removeClass('hide');
        $(this).closest('tr').find('.spanAmount').addClass('hide');
        $(this).closest('tr').find('.chkFederalIncomeTax').prop('checked', (arrSummary[7] == 'Yes' ? true : false));
        $(this).closest('tr').find('.chkFederalIncomeTax').removeClass('hide');
        $(this).closest('tr').find('.spanFederalIncomeTax').addClass('hide');
        $(this).closest('tr').find('.chkSocialSecurity').prop('checked', (arrSummary[8] == 'Yes' ? true : false));
        $(this).closest('tr').find('.chkSocialSecurity').removeClass('hide');
        $(this).closest('tr').find('.spanSocialSecurity').addClass('hide');
        $(this).closest('tr').find('.chkMedicare').prop('checked', (arrSummary[9] == 'Yes' ? true : false));
        $(this).closest('tr').find('.chkMedicare').removeClass('hide');
        $(this).closest('tr').find('.spanMedicare').addClass('hide');
        $(this).closest('tr').find('.cmbQuarter').val(arrSummary[10]);
        $(this).closest('tr').find('.cmbQuarter').removeClass('hide');
        $(this).closest('tr').find('.spanQuarter').addClass('hide');            
        $(this).closest('tr').find('.ok3').removeClass('hide');
        $(this).closest('tr').find('.cancel3').removeClass('hide');
        $(this).closest('tr').find('.edit3').addClass('hide');
        $(this).closest('tr').find('.delete3').addClass('hide');               
        SetKeyPress();
        FocusInFocusOut();
        return false;
    });
    $(".delete3").click(function () {
        var id = $(this).closest('tr').attr('id').replace('MRow', '');
        bootbox.dialog({
            message: "Are you sure to delete selected record?",
            title: "Payroll",
            buttons: {
                ok: {
                    label: "<i class=\"fa fa-check\" aria-hidden=\"true\"></i> OK",
                    className: "btn btn-primary",
                    callback: function () {
                        var arrSummaries = $('#hdnSummaries').val().split(String.fromCharCode(135));
                        for (var i = 0; i < arrSummaries.length; i++) {
                            var arrSummary = arrSummaries[i].split(String.fromCharCode(134));
                            if (arrSummary[0] == id) {
                                arrSummary[12] = "1";
                                arrSummaries[i] = arrSummary.join(String.fromCharCode(134));
                                $('#hdnSummaries').val(arrSummaries.join(String.fromCharCode(135)));
                                break;
                            }
                        }
                        FillGrid3();
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
        return false;
    });
};

function FillDepartments() {
    var params = { ClientId: $.localStorage.get('ClientId') };
    CallService('Client/DepartmentService.svc', 'GetLookup', params, OnDepartmentGetLookupSuccess, false);
}

function OnDepartmentGetLookupSuccess(Departments) {
    var html = '<option value="-1">Add New</option>';  
    html += '<option value="0"></option>';
    if (Departments != undefined) {
        for (var i = 0; i < Departments.length; i++) {            
            html += '<option value="' + Departments[i]['DepartmentId'] + '">' + Departments[i]['DepartmentName'] + '</option>';           
        }
    }
    $('#cmbDepartmentName').html(html);   
    $('#cmbDepartmentName').val("0");   
}
FillDepartments();
function FillLocations() {
    var params = { ClientId: $.localStorage.get('ClientId') };
    CallService('Client/LocationService.svc', 'GetLookup', params, OnLocationGetLookupSuccess, false);
}

function OnLocationGetLookupSuccess(Locations) {
    var html = '<option value="-1">Add New</option>';
    html += '<option value="0"></option>';
    if (Locations != undefined) {
        for (var i = 0; i < Locations.length; i++) {
            html += '<option value="' + Locations[i]['LocationId'] + '">' + Locations[i]['LocationName'] + '</option>';
        }
    }
    $('#cmbLocationName').html(html);
    $('#cmbLocationName').val("0");
}
FillLocations();
function FillCompensationClasses() {
    var params = { ClientId: $.localStorage.get('ClientId') };
    CallService('Client/CompensationClassService.svc', 'GetLookup', params, OnCompensationClassGetLookupSuccess, false);
}

function OnCompensationClassGetLookupSuccess(CompensationClasses) {
    var html = '<option value="-1">Add New</option>';
    html += '<option value="0"></option>';
    if (CompensationClasses != undefined) {
        for (var i = 0; i < CompensationClasses.length; i++) {
            html += '<option value="' + CompensationClasses[i]['CompensationClassId'] + '">' + CompensationClasses[i]['CompensationClassName'] + '</option>';
        }
    }
    $('#cmbCompensationClassName').html(html);
    $('#cmbCompensationClassName').val("0");
}
FillCompensationClasses();
function FillPaySchedules() {
    var params = { ClientId: $.localStorage.get('ClientId')};
    CallService('Client/PayScheduleService.svc', 'GetLookup', params, OnPayScheduleGetLookupSuccess, false);
}

function OnPayScheduleGetLookupSuccess(paySchedules) {
    var html = '<option value="-1">Add New</option>';
    html += '<option value="0"></option>';
    var found = false;
    if (paySchedules != undefined) {
        for (var i = 0; i < paySchedules.length; i++) {
            if (paySchedules[i]['Default']) {
                html += '<option selected="true" value="' + paySchedules[i]['PayScheduleId'] + '">' + paySchedules[i]['PayScheduleName'] + '</option>';
                found = true;
            }
            else
            {
                html += '<option value="' + paySchedules[i]['PayScheduleId'] + '">' + paySchedules[i]['PayScheduleName'] + '</option>';
            }
        }
    }
    $('#cmbPayScheduleName').html(html); 
    if (!found) {
        $('#cmbPayScheduleName').val("0");
    }
}
FillPaySchedules();
function FillAccountTypes() {
    var params = {};
    CallService('Client/AccountTypeService.svc', 'GetLookup', params, OnAccountTypeGetLookupSuccess, false);
}

function OnAccountTypeGetLookupSuccess(accountTypes) {
    var html = '<option value="0"></option>';
    if (accountTypes != undefined) {
        for (var i = 0; i < accountTypes.length; i++) {
            html += '<option value="' + accountTypes[i]['AccountTypeId'] + '">' + accountTypes[i]['AccountTypeName'] + '</option>';
        }
    }
    $('#cmbAccountTypeName').append(html);
    $('#cmbAccountTypeName').val("0");
}
FillAccountTypes();

function Finish() {
    if (form.valid()) {
        var EmployeePayStubs = '';
        $('#bodyPayStubs').find('tr').each(function () {
            var row = $(this);
            if (row.find('input[type="checkbox"]').is(':checked')) {
                EmployeePayStubs += row.context['id'] + ',';
            }
        });
        if (EmployeePayStubs != '') {
            EmployeePayStubs = EmployeePayStubs.substring(0, EmployeePayStubs.length - 1);
        }
        var params = {
            EmployeeId: parseInt($("#hdnEmployeeId").val(), 10),
            ClientId: $.localStorage.get('ClientId'),
            EmployeeCode: $("#txtEmployeeCode").val(),
            FirstName: $("#txtFirstName").val(),
            MiddleNameInitial: $("#txtMiddleNameInitial").val(),
            LastName: $("#txtLastName").val(),
            Address1: $("#txtAddress1").val(),
            Address2: $("#txtAddress2").val(),            
            CityName: $("#txtCityName").val(),
            CountyId: $("#cmbCountyName").val(),
            StateId: $("#cmbStateName").val(),
            ZipCode: $("#txtZipCode").val(),
            ZipCodeExt: $("#txtZipCodeExt").val(),
            Gender: $("#cmbGender").val(),
            DateOfBirth: $("#txtDateOfBirth").val(),
            EMailId: $("#txtEMailId").val(),
            WorkPhoneNo: $("#txtWorkPhoneNo").val(),
            WorkPhoneNoExt: $("#txtWorkPhoneNoExt").val(),
            CellPhoneNo: $("#txtCellPhoneNo").val(),
            FaxNo: $("#txtFaxNo").val(),
            DepartmentId: $("#cmbDepartmentName").val(),
            LocationId: $("#cmbLocationName").val(),
            PayScheduleId: $("#cmbPayScheduleName").val(),
            BankName: $("#txtBankName").val(),
            RoutingNo: $("#txtRoutingNo").val(),
            AccountNo: $("#txtAccountNo").val(),
            AccountTypeId: $("#cmbAccountTypeName").val(),
            SocialSecurityNo: $("#txtSocialSecurityNo").val(),
            Contractor1099: $('#chkContractor1099').is(':checked'),
            NewHireReport: $('#chkNewHireReport').is(':checked'),
            FormI9: $('#chkFormI9').is(':checked'),
            HireDate: $("#txtHireDate").val(),
            TerminationDate: $("#txtTerminationDate").val(),
            Notes: $("#txtNotes").val(),
            VacationHoursAvailable: $("#txtVacationHoursAvailable").val(),
            VacationHoursUsed: $("#txtVacationHoursUsed").val(),
            SickLeaveHoursAvailable: $("#txtSickLeaveHoursAvailable").val(),
            SickLeaveHoursUsed: $("#txtSickLeaveHoursUsed").val(),
            CompensationClassId: $("#cmbCompensationClassName").val(),
            PaymentMethod: $("#cmbPaymentMethod").val(),
            Status: $("#cmbStatus").val(),
            FederalTaxes: $('#hdnFederalTaxes').val(),
            StateTaxes: $('#hdnStateTaxes').val(),
            Compensations: $('#hdnCompensations').val(),
            Summaries: $('#hdnSummaries').val(),
            EmployeePayStubs: EmployeePayStubs
        };
        CallService('Client/EmployeeService.svc', 'Save', params, OnEmployeeSaveSuccess, false);
    }
    else
    {
        StepClick(1);
    }
};
function OnEmployeeSaveSuccess(EmployeeId) {
    if (EmployeeId > 0) {
        window.location = "/Client/Main.html#ViewAllEmployees";
    }
}
function Save() {
    var EmployeePayStubs = '';
    $('#bodyPayStubs').find('tr').each(function () {
        var row = $(this);
        if (row.find('input[type="checkbox"]').is(':checked')) {
            EmployeePayStubs += row.context['id'] + ',';
        }
    });
    if (EmployeePayStubs != '')
    {
        EmployeePayStubs = EmployeePayStubs.substring(0, EmployeePayStubs.length - 1);
    }
    var params = {
        EmployeeId: parseInt($("#hdnEmployeeId").val(), 10),
        ClientId: $.localStorage.get('ClientId'),
        EmployeeCode: $("#txtEmployeeCode").val(),
        FirstName: $("#txtFirstName").val(),
        MiddleNameInitial: $("#txtMiddleNameInitial").val(),
        LastName: $("#txtLastName").val(),
        Address1: $("#txtAddress1").val(),
        Address2: $("#txtAddress2").val(),        
        CityName: $("#txtCityName").val(),
        CountyId: $("#cmbCountyName").val(),
        StateId: $("#cmbStateName").val(),
        ZipCode: $("#txtZipCode").val(),
        ZipCodeExt: $("#txtZipCodeExt").val(),
        Gender: $("#cmbGender").val(),
        DateOfBirth: $("#txtDateOfBirth").val(),
        EMailId: $("#txtEMailId").val(),
        WorkPhoneNo: $("#txtWorkPhoneNo").val(),
        WorkPhoneNoExt: $("#txtWorkPhoneNoExt").val(),
        CellPhoneNo: $("#txtCellPhoneNo").val(),
        FaxNo: $("#txtFaxNo").val(),
        DepartmentId: $("#cmbDepartmentName").val(),
        LocationId: $("#cmbLocationName").val(),
        PayScheduleId: $("#cmbPayScheduleName").val(),
        BankName: $("#txtBankName").val(),
        RoutingNo: $("#txtRoutingNo").val(),
        AccountNo: $("#txtAccountNo").val(),
        AccountTypeId: $("#cmbAccountTypeName").val(),
        SocialSecurityNo: $("#txtSocialSecurityNo").val(),
        Contractor1099: $('#chkContractor1099').is(':checked'),
        NewHireReport: $('#chkNewHireReport').is(':checked'),
        FormI9: $('#chkFormI9').is(':checked'),
        HireDate: $("#txtHireDate").val(),
        TerminationDate: $("#txtTerminationDate").val(),
        Notes: $("#txtNotes").val(),
        VacationHoursAvailable: $("#txtVacationHoursAvailable").val(),
        VacationHoursUsed: $("#txtVacationHoursUsed").val(),
        SickLeaveHoursAvailable: $("#txtSickLeaveHoursAvailable").val(),
        SickLeaveHoursUsed: $("#txtSickLeaveHoursUsed").val(),
        CompensationClassId: $("#cmbCompensationClassName").val(),
        PaymentMethod: $("#cmbPaymentMethod").val(),
        Status: $("#cmbStatus").val(),
        FederalTaxes: $('#hdnFederalTaxes').val(),
        StateTaxes: $('#hdnStateTaxes').val(),
        Compensations: $('#hdnCompensations').val(),
        Summaries: $('#hdnSummaries').val(),
        EmployeePayStubs: EmployeePayStubs
    };
    CallService('Client/EmployeeService.svc', 'Save', params, OnEmployeeSaveSuccess1, false);        
};
function SaveAndContinue() {
    if (CurrentStepIndex == 1)
    {
        if (form.valid()) {
            Save();
            StepClick(2); 
        }           
    }
    else if (CurrentStepIndex == 2) {       
        Save();
        StepClick(3);       
    }   
    else if (CurrentStepIndex == 3) {       
        Save();   
        StepClick(4);     
    }
    else if (CurrentStepIndex == 4) {
        Save();
        if (parseInt($('#hdnEmployeeId').val(), 10) == 0) {
            StepClick(6);
        }
        else {
            StepClick(5);
        }
    }
    else if (CurrentStepIndex == 5) {
        Save();
        StepClick(6);
    } 
    else if (CurrentStepIndex == 6) {
        Save();
        StepClick(7);
    }     
}
function OnEmployeeSaveSuccess1(EmployeeId) {
    if (EmployeeId > 0) {
        $('#hdnEmployeeId').val(EmployeeId);
        $('#liStep6').removeClass('hide');
    }
}
function Close() {
    window.location = "/Client/Main.html#ViewAllEmployees";
}
function FillFederalTaxes() {
    var params = { ClientId: $.localStorage.get('ClientId'), EmployeeId: parseInt($('#hdnEmployeeId').val(), 10) };
    CallService('Client/EmployeeService.svc', 'GetEmployeeFederalTaxes', params, OnEmployeeGetFederalTaxesSuccess, true);
}

function OnEmployeeGetFederalTaxesSuccess(FederalTaxes) {
    var i = 0;
    var Taxes = '';
    $.each(FederalTaxes, function () {
        Taxes += i + String.fromCharCode(134);
        Taxes += this.FederalTaxId + String.fromCharCode(134);
        Taxes += FormatDateUTC(this.StartDate) + String.fromCharCode(134);
        Taxes += this.FederalFilingStatusId + String.fromCharCode(134);
        Taxes += this.FederalFilingStatusName + String.fromCharCode(134);  
        Taxes += this.Allowances + String.fromCharCode(134); 
        Taxes += this.AdditionalWithholdings.toFixed(2) + String.fromCharCode(134);   
        Taxes += this.Allowance + String.fromCharCode(134);
        Taxes += (this.Allowance == 'Y' ? 'Yes' : 'No') + String.fromCharCode(134);
        Taxes += this.Exemption + String.fromCharCode(134);
        Taxes += this.ExemptionText + String.fromCharCode(134);
        Taxes += "0";
        if (i < FederalTaxes.length - 1) {
            Taxes += String.fromCharCode(135);
        }
        i++;
    });
    $('#hdnFederalTaxes').val(Taxes);
    FillGrid();
}


function Delete(rowNo) {
    var arrFederalTaxes = $('#hdnFederalTaxes').val().split(String.fromCharCode(135));
    var arrFederalTax = arrFederalTaxes[rowNo].split(String.fromCharCode(134));
    arrFederalTax[11] = "1";
    arrFederalTaxes[rowNo] = arrFederalTax.join(String.fromCharCode(134));
    $('#hdnFederalTaxes').val(arrFederalTaxes.join(String.fromCharCode(135)));
}

function NewRecord() {    
    var arrFederalTaxes = $('#hdnFederalTaxes').val().split(String.fromCharCode(135));
    if (arrFederalTaxes[0] == "") {
        arrFederalTaxes.splice(0, 1);
    }
    var html = '<tr><td><span class="spanStartDate"></span><input type="text" class="form-control input-date-picker txtStartDate" ' + (arrFederalTaxes.length == 0 ? 'disabled' : '') + ' value="' + (arrFederalTaxes.length==0 ? $('#txtHireDate').val(): '') + '"></td><td><span class="spanFederalFilingStatusName"></span><select class="form-control cmbFederalFilingStatusName">';
    var params = {};
    var FederalFilingStatuses = CallService1('Client/FederalFilingStatusService.svc', 'GetLookup', params);
    html += '<option value="0"></option>';
    if (FederalFilingStatuses != undefined) {
        for (var i = 0; i < FederalFilingStatuses.length; i++) {
            html += '<option value="' + FederalFilingStatuses[i]['FederalFilingStatusId'] + '">' + FederalFilingStatuses[i]['FederalFilingStatusName'] + '</option>';
        }
    }
    html += '</select></td>';
    html += '<td><span class="spanAllowances"></span><input type="text" class="form-control integer txtAllowances" value="0"/></td>';
    html += '<td><span class="spanAdditionalWithholdings"></span><input type="text" class="form-control textbox txtAdditionalWithholdings" value="$0.00"/></td>';
    html += '<td><span class="spanAllowance"></span><select class="form-control cmbAllowance"><option value="N">No</option><option value="Y">Yes</option></select></td>';
    html += '<td><span class="spanExemption"></span><select class="form-control cmbExemption"><option value="0"></option><option value="1">Medicare</option><option value="2">Social Security</option><option value="3">Medicare & Social Security</option></select></td> <td class="td-center"><a href="javascript:void(0)" title="Save" class="ok"><i class="fa fa-floppy-o" aria-hidden="true"></i></a>&nbsp; &nbsp; &nbsp; <a href="javascript:void(0)" title="Cancel" class="cancel"><i class="fa fa-times" aria-hidden="true"></i></ a> <a href="javascript:void(0)" class="edit hide link"><i class="fa fa-pencil" aria-hidden="true"></i></a>&nbsp; &nbsp; &nbsp; <a href="javascript:void(0)" class="delete hide link"><i class="fa fa-trash" aria-hidden="true"></i></a></td></tr > ';
    $('#tblFederalTaxes tbody').append(html);

    InitializeDateControls();    
    SetKeyPress();
    FocusInFocusOut();
};

function FillGrid() {
    var html = '';
    if ($('#hdnFederalTaxes').val() != "") {
        var params = {};
        var FederalFilingStatuses = CallService1('Client/FederalFilingStatusService.svc', 'GetLookup', params);        
        var arrFederalTaxes = $('#hdnFederalTaxes').val().split(String.fromCharCode(135));
        var k = 0;
        for (var i = 0; i < arrFederalTaxes.length; i++) {
            var arrFederalTax = arrFederalTaxes[i].split(String.fromCharCode(134));
            if (arrFederalTax[11] == "0") {                
                html += '<tr id="FRow' + i + '" class="' + (k % 2 == 0 ? "footable-even" : "footable-odd") + '">';               
                html += '<td><span class="spanStartDate">' + arrFederalTax[2] + '</span><input type="text" class="form-control input-date-picker txtStartDate hide" /></td>';
                html += '<td><span class="spanFederalFilingStatusName">' + arrFederalTax[4] + '</span><select class="form-control cmbFederalFilingStatusName hide">';
                html += '<option value="0"></option>';
                if (FederalFilingStatuses != undefined) {
                    for (var j = 0; j < FederalFilingStatuses.length; j++) {
                        html += '<option value="' + FederalFilingStatuses[j]['FederalFilingStatusId'] + '">' + FederalFilingStatuses[j]['FederalFilingStatusName'] + '</option>';
                    }
                }
                html += '</select></td>';      
                html += '<td><span class="spanAllowances">' + arrFederalTax[5] + '</span><input type="text" class="form-control integer txtAllowances hide" /></td>';
                html += '<td><span class="spanAdditionalWithholdings">' + accounting.formatMoney(arrFederalTax[6]) + '</span><input type="text" class="form-control textbox txtAdditionalWithholdings hide" /></td>';         
                html += '<td><span class="spanAllowance">' + arrFederalTax[8] + '</span><select class="form-control cmbAllowance hide">';
                html += '<option value="N">No</option>';
                html += '<option value="Y">Yes</option>';
                html += '</select></td>';
                html += '<td><span class="spanExemption">' + arrFederalTax[10] + '</span><select class="form-control cmbExemption hide">';
                html += '<option value="0"></option>';
                html += '<option value="1">Medicare</option>';
                html += '<option value="2">Social Security</option>';
                html += '<option value="3">Medicare & Social Security</option>';
                html += '</select></td>';
                html += '<td class="td-center"><a href="javascript:void(0)" title="Save" class="ok hide"><i class="fa fa-floppy-o" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" title="Cancel" class="cancel hide"><i class="fa fa-times" aria-hidden="true"></i></ a><a href="javascript:void(0)" class="edit link"><i class="fa fa-pencil" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" class="delete link"><i class="fa fa-trash" aria-hidden="true"></i></a></td>';                
                html += '</tr>';
                k++;
            }
        }
    }
    $('#bodyFederalTaxes').html(html);
    InitializeDateControls(); 
    SetKeyPress();
}

function FillStateTaxes() {
    var params = { ClientId: $.localStorage.get('ClientId'), EmployeeId: parseInt($('#hdnEmployeeId').val(), 10), StateId: parseInt($('#cmbStateName').val(), 10) };
    var StateTaxes = CallService1('Client/EmployeeService.svc', 'GetEmployeeStateTaxes', params);
    var i = 0;
    var Taxes = '';
    $.each(StateTaxes, function () {
        Taxes += i + String.fromCharCode(134);
        Taxes += this.StateTaxId + String.fromCharCode(134);
        Taxes += FormatDateUTC(this.StartDate) + String.fromCharCode(134);
        Taxes += this.FilingStatusId + String.fromCharCode(134);
        Taxes += this.FilingStatusName + String.fromCharCode(134);
        Taxes += this.AllowanceStatusId + String.fromCharCode(134);
        Taxes += this.FilingStatusName1 + String.fromCharCode(134);
        Taxes += this.Allowance + String.fromCharCode(134);
        Taxes += (this.Allowance == 'Y' ? 'Yes' : 'No') + String.fromCharCode(134);
        Taxes += this.Dependants + String.fromCharCode(134);
        Taxes += this.PersonalExemptions + String.fromCharCode(134);
        Taxes += this.DependentExemptions + String.fromCharCode(134);
        Taxes += this.AgeExemptions + String.fromCharCode(134);
        Taxes += this.BlindExemptions + String.fromCharCode(134);
        Taxes += this.AdditionalAllowances + String.fromCharCode(134);
        Taxes += this.BasicAllowances + String.fromCharCode(134);
        Taxes += this.AdditionalAmount + String.fromCharCode(134);
        Taxes += this.IsDelawareWorkplace + String.fromCharCode(134);
        Taxes += (this.IsDelawareWorkplace == 'Y' ? 'Yes' : 'No') + String.fromCharCode(134);
        Taxes += "0";
        if (i < StateTaxes.length - 1) {
            Taxes += String.fromCharCode(135);
        }
        i++;
    });
    $('#hdnStateTaxes').val(Taxes);
    FillGrid1();
}

function SetKeyPress() {
    $('.integer').keydown(function (event) {
        var kc, num, rt = false;
        kc = event.keyCode;
        if (kc == 8 || ((kc > 47 && kc < 58) || (kc > 95 && kc < 106))) rt = true;
        return rt;
    })
        .bind('blur', function () {
            num = parseInt($(this).val());
            num = isNaN(num) ? '0' : num;
            if (num && num < 0) num = num * -1;
            $(this).val(num);
        });
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

function Delete1(rowNo) {
    var arrStateTaxes = $('#hdnStateTaxes').val().split(String.fromCharCode(135));
    var arrStateTax = arrStateTaxes[rowNo].split(String.fromCharCode(134));
    arrStateTax[19] = "1";
    arrStateTaxes[rowNo] = arrStateTax.join(String.fromCharCode(134));
    $('#hdnStateTaxes').val(arrStateTaxes.join(String.fromCharCode(135)));
}
function NewRecord1() {    
    var arrStateTaxes = $('#hdnStateTaxes').val().split(String.fromCharCode(135));
    if (arrStateTaxes[0] == "") {
        arrStateTaxes.splice(0, 1);
    }
    var html = '<tr><td><span class="spanStartDate1"></span><input type="text" class="form-control input-date-picker txtStartDate1" value="' + (arrStateTaxes.length == 0 ? $('#txtHireDate').val() : '') + '"/></td>';       
    html += '<td class="tdFilingStatus hide"><span class="spanFilingStatusName1"></span><select class="form-control cmbFilingStatusName1">';
    var params = { StateId: $('#cmbStateName').val()};
    FilingStatuses = CallService1('Client/FilingStatusService.svc', 'GetLookup', params);
    html += '<option value="0"></option>';
    if (FilingStatuses != undefined) {
        for (var i = 0; i < FilingStatuses.length; i++) {
            html += '<option value="' + FilingStatuses[i]['FilingStatusId'] + '">' + FilingStatuses[i]['FilingStatusName'] + '</option>';
        }
    }
    html += '</select></td>';
    html += '<td class="tdAllowanceStatus hide"><span class="spanFilingStatusName2"></span><select class="form-control cmbFilingStatusName2">';    
    html += '<option value="0"></option>';
    if (FilingStatuses != undefined) {
        for (var i = 0; i < FilingStatuses.length; i++) {
            html += '<option value="' + FilingStatuses[i]['FilingStatusId'] + '">' + FilingStatuses[i]['FilingStatusName'] + '</option>';
        }
    }
    html += '</select></td>';
    html += '<td class="tdAllowance hide"><span class="spanAllowance"></span> <select class="form-control cmbAllowance"><option value="N">No</option><option value="Y">Yes</option></select></td>';
    html += '<td class="tdDependants hide"><span class="spanDependants"></span><input class="form-control integer txtDependants" value="0"/></td>';
    html += '<td class="tdPersonalExemptions hide"><span class="spanPersonalExemptions"></span><input class="form-control integer txtPersonalExemptions" value="0"/></td>';
    html += '<td class="tdDependentExemptions hide"><span class="spanDependentExemptions"></span><input class="form-control integer txtDependentExemptions" value="0"/></td>';
    html += '<td class="tdAgeExemptions hide"><span class="spanAgeExemptions"></span><input class="form-control integer txtAgeExemptions" value="0"/></td>';
    html += '<td class="tdBlindExemptions hide"><span class="spanBlindExemptions"></span><input class="form-control integer txtBlindExemptions" value="0"/></td>';
    html += '<td class="tdAdditionalAllowances hide"><span class="spanAdditionalAllowances"></span><input class="form-control integer txtAdditionalAllowances" value="0"/></td>';
    html += '<td class="tdBasicAllowances hide"><span class="spanBasicAllowances"></span><input class="form-control integer txtBasicAllowances" value="0"/></td>';
    html += '<td class="tdAdditionalAmount hide"><span class="spanAdditionalAmount"></span><input class="form-control decimal txtAdditionalAmount" value="0"/></td>';
    html += '<td class="tdIsDelawareWorkplace hide"><span class="spanIsDelawareWorkplace"></span><select class="form-control cmbIsDelawareWorkplace"><option value="N">No</option><option value="Y">Yes</option></select></td>';
    html += '<td class="td-center"><a href="javascript:void(0)" title="Save" class="ok1"><i class="fa fa-floppy-o" aria-hidden="true"></i></a>&nbsp; &nbsp; &nbsp; <a href="javascript:void(0)" title="Cancel" class="cancel1"><i class="fa fa-times" aria-hidden="true"></i></ a> <a href="javascript:void(0)" class="edit1 hide link"><i class="fa fa-pencil" aria-hidden="true"></i></a>&nbsp; &nbsp; &nbsp; <a href="javascript:void(0)" class="delete1 hide link"><i class="fa fa-trash" aria-hidden="true"></i></a></td></tr>';
    $('#tblStateTaxes tbody').append(html);
    if (dtoState.StateCode.toUpperCase() == 'GA')
    {
        $('.tdFilingStatus').removeClass('hide');
        $('.tdAllowanceStatus').removeClass('hide');
        $('.tdAllowance').removeClass('hide');
        $('.tdDependants').removeClass('hide');
    }
    else if (dtoState.StateCode.toUpperCase() == 'VA') {
        $('.tdPersonalExemptions').removeClass('hide');
        $('.tdDependentExemptions').removeClass('hide');
        $('.tdAgeExemptions').removeClass('hide');
        $('.tdBlindExemptions').removeClass('hide');
    }
    else if (dtoState.StateCode.toUpperCase() == 'MD') {
        $('.tdFilingStatus').removeClass('hide'); 
        $('.tdPersonalExemptions').removeClass('hide');  
        $('.tdIsDelawareWorkplace').removeClass('hide');          
    }
    else if (dtoState.StateCode.toUpperCase() == 'CA') {
        $('.tdFilingStatus').removeClass('hide');
        $('.tdAdditionalAllowances').removeClass('hide');        
    }
    else if (dtoState.StateCode.toUpperCase() == 'IL') {
        $('.tdAdditionalAllowances').removeClass('hide');
        $('.tdBasicAllowances').removeClass('hide');
        $('.tdAdditionalAmount').removeClass('hide');
    }
    else if (dtoState.StateCode.toUpperCase() == 'SC') {
        $('.tdPersonalExemptions').removeClass('hide');        
    }
    else if (dtoState.StateCode.toUpperCase() == 'LA') {
        $('.tdPersonalExemptions').removeClass('hide');
        $('.tdDependentExemptions').removeClass('hide');
    }
    InitializeDateControls1();
   
    SetKeyPress();
};
function StateChange()
{
    var params = { StateId: $('#cmbStateName').val() };
    var Counties = CallService1('Client/CountyService.svc', 'GetLookup', params);
    var html = '<option value="0"></option>';
    if (Counties != undefined) {
        for (var i = 0; i < Counties.length; i++) {
            html += '<option value="' + Counties[i]['CountyId'] + '">' + Counties[i]['CountyName'] + '</option>';
        }
    }
    $("#cmbCountyName").html(html);
    $("#cmbCountyName").val('0');
    $('#thFilingStatus').addClass('hide');
    $('#thAllowanceStatus').addClass('hide');
    $('#thAllowance').addClass('hide');
    $('#thDependants').addClass('hide');
    $('#thPersonalExemptions').addClass('hide');
    $('#thDependentExemptions').addClass('hide');
    $('#thAgeExemptions').addClass('hide');
    $('#thBlindnessExemptions').addClass('hide');
    $('#thAdditionalAllowances').addClass('hide');
    $('#thBasicAllowances').addClass('hide');
    $('#thAdditionalAmount').addClass('hide');
    $('#thIsDelawareWorkplace').addClass('hide');

    var params = { StateId: $('#cmbStateName').val() };
    dtoState = CallService1('Client/StateService.svc', 'GetObject', params);
    if (dtoState.StateCode.toUpperCase() == 'GA') {
        //$('#tblStateTax').removeClass('hide');
        $('#thFilingStatus').removeClass('hide');
        $('#thAllowanceStatus').removeClass('hide');
        $('#thAllowance').removeClass('hide');
        $('#thDependants').removeClass('hide');
    }
    else if (dtoState.StateCode.toUpperCase() == 'VA') {
        //$('#tblStateTax').removeClass('hide');
        $('#thPersonalExemptions').removeClass('hide');
        $('#thDependentExemptions').removeClass('hide');
        $('#thAgeExemptions').removeClass('hide');
        $('#thBlindnessExemptions').removeClass('hide');
    }
    else if (dtoState.StateCode.toUpperCase() == 'MD') {
        //$('#tblStateTax').removeClass('hide');
        $('#thFilingStatus').removeClass('hide'); 
        $('#thPersonalExemptions').removeClass('hide');
        $('#thIsDelawareWorkplace').removeClass('hide');            
    }
    else if (dtoState.StateCode.toUpperCase() == 'CA') {
        //$('#tblStateTax').removeClass('hide');
        $('#thFilingStatus').removeClass('hide');
        $('#thAdditionalAllowances').removeClass('hide');        
    }
    else if (dtoState.StateCode.toUpperCase() == 'IL') {
        //$('#tblStateTax').removeClass('hide');
        $('#thAdditionalAllowances').removeClass('hide');
        $('#thBasicAllowances').removeClass('hide');
        $('#thAdditionalAmount').removeClass('hide');
    }
    else if (dtoState.StateCode.toUpperCase() == 'SC') {
        //$('#tblStateTax').removeClass('hide');
        $('#thPersonalExemptions').removeClass('hide');        
    }
    else if (dtoState.StateCode.toUpperCase() == 'LA') {
        //$('#tblStateTax').removeClass('hide');
        $('#thPersonalExemptions').removeClass('hide');
        $('#thDependentExemptions').removeClass('hide');
    }
    //else if ((dtoState.StateCode.toUpperCase() == 'FL') || (dtoState.StateCode.toUpperCase() == 'TN') || (dtoState.StateCode.toUpperCase() == 'TX') || (dtoState.StateCode.toUpperCase() == 'NH') || (dtoState.StateCode.toUpperCase() == 'SD') || (dtoState.StateCode.toUpperCase() == 'AK') || (dtoState.StateCode.toUpperCase() == 'NV') || (dtoState.StateCode.toUpperCase() == 'WA') || (dtoState.StateCode.toUpperCase() == 'WY') || (dtoState.StateCode.toUpperCase() == 'DC')) {
    //    $('#tblStateTax').addClass('hide');
    //}
    FillStateTaxes();   
    
}
$("#cmbStateName").change(function () {   
    StateChange();
});
function FillGrid1() {
    var html = '';
    if ($('#hdnStateTaxes').val() != "") {
        var params = {};
        States = CallService1('Client/StateService.svc', 'GetLookup', params);        

        var arrStateTaxes = $('#hdnStateTaxes').val().split(String.fromCharCode(135));
        var k = 0;        
        for (var i = 0; i < arrStateTaxes.length; i++) {
            var arrStateTax = arrStateTaxes[i].split(String.fromCharCode(134));
            if (arrStateTax[19] == "0") {
                html += '<tr id="SRow' + i + '" class="' + (k % 2 == 0 ? "footable-even" : "footable-odd") + '">';                
                html += '<td><span class="spanStartDate1">' + arrStateTax[2] + '</span><input type="text" class="form-control input-date-picker txtStartDate1 hide" /></td>';
                html += '<td class="tdFilingStatus hide"><span class="spanFilingStatusName1">' + arrStateTax[4] + '</span><span class="spanFilingStatusName1"></span><select class="form-control cmbFilingStatusName1 hide">';               
                var params = { StateId: $('#cmbStateName').val() };
                var FilingStatuses = CallService1('Client/FilingStatusService.svc', 'GetLookup', params);
                html += '<option value="0"></option>';
                if (FilingStatuses != undefined) {
                    for (var j = 0; j < FilingStatuses.length; j++) {
                        html += '<option value="' + FilingStatuses[j]['FilingStatusId'] + '">' + FilingStatuses[j]['FilingStatusName'] + '</option>';
                    }
                }
                html += '</select></td>';
                html += '<td class="tdAllowanceStatus hide"><span class="spanFilingStatusName2">' + arrStateTax[6] + '</span><span class="spanFilingStatusName2"></span><select class="form-control cmbFilingStatusName2 hide">';
                html += '<option value="0"></option>';
                if (FilingStatuses != undefined) {
                    for (var j = 0; j < FilingStatuses.length; j++) {
                        html += '<option value="' + FilingStatuses[j]['FilingStatusId'] + '">' + FilingStatuses[j]['FilingStatusName'] + '</option>';
                    }
                }
                html += '</select></td>';                
                html += '<td class="tdAllowance hide"><span class="spanAllowance">' + arrStateTax[8] + '</span><select class="form-control cmbAllowance hide"><option value="N">No</option><option value="Y">Yes</option></select></td>';
                html += '<td class="tdDependants hide"><span class="spanDependants">' + arrStateTax[9] + '</span><input class="form-control integer txtDependants hide" value="0"/></td>';
                html += '<td class="tdPersonalExemptions hide"><span class="spanPersonalExemptions">' + arrStateTax[10] + '</span><input class="form-control integer txtPersonalExemptions hide" value="0"/></td>';
                html += '<td class="tdDependentExemptions hide"><span class="spanDependentExemptions">' + arrStateTax[11] + '</span><input class="form-control integer txtDependentExemptions hide" value="0"/></td>';
                html += '<td class="tdAgeExemptions hide"><span class="spanAgeExemptions">' + arrStateTax[12] + '</span><input class="form-control integer txtAgeExemptions hide" value="0"/></td>';
                html += '<td class="tdBlindExemptions hide"><span class="spanBlindExemptions">' + arrStateTax[13] + '</span><input class="form-control integer txtBlindExemptions hide" value="0"/></td>';
                html += '<td class="tdAdditionalAllowances hide"><span class="spanAdditionalAllowances">' + arrStateTax[14] + '</span><input class="form-control integer txtAdditionalAllowances hide" value="0"/></td>';
                html += '<td class="tdBasicAllowances hide"><span class="spanBasicAllowances">' + arrStateTax[15] + '</span><input class="form-control integer txtBasicAllowances hide" value="0"/></td>';
                html += '<td class="tdAdditionalAmount hide"><span class="spanAdditionalAmount">' + accounting.formatMoney(arrStateTax[16]) + '</span><input class="form-control decimal txtAdditionalAmount hide" value="0.00"/></td>';
                html += '<td class="tdIsDelawareWorkplace hide"><span class="spanIsDelawareWorkplace">' + arrStateTax[18] + '</span><select class="form-control cmbIsDelawareWorkplace hide"><option value="N">No</option><option value="Y">Yes</option></select></td>';
                html += '<td class="td-center"><a href="javascript:void(0)" title="Save" class="ok1 hide"><i class="fa fa-floppy-o" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" title="Cancel" class="cancel1 hide"><i class="fa fa-times" aria-hidden="true"></i></ a><a href="javascript:void(0)" class="edit1 link"><i class="fa fa-pencil" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" class="delete1 link"><i class="fa fa-trash" aria-hidden="true"></i></a></td>';                
                html += '</tr>';
                k++;
            }
        }
    }
    $('#bodyStateTaxes').html(html);
    if (dtoState.StateCode.toUpperCase() == 'GA') {
        $('#tblStateTax').removeClass('hide');
        $('.tdFilingStatus').removeClass('hide');
        $('.tdAllowanceStatus').removeClass('hide');
        $('.tdAllowance').removeClass('hide');
        $('.tdDependants').removeClass('hide');
    }    
    else if (dtoState.StateCode.toUpperCase() == 'VA') {
        $('#tblStateTax').removeClass('hide');
        $('.tdPersonalExemptions').removeClass('hide');
        $('.tdDependentExemptions').removeClass('hide');
        $('.tdAgeExemptions').removeClass('hide');
        $('.tdBlindExemptions').removeClass('hide');
    }    
    else if (dtoState.StateCode.toUpperCase() == 'MD') {
        $('#tblStateTax').removeClass('hide');
        $('.tdFilingStatus').removeClass('hide'); 
        $('.tdPersonalExemptions').removeClass('hide'); 
        $('.tdIsDelawareWorkplace').removeClass('hide');    
    }    
    else if (dtoState.StateCode.toUpperCase() == 'CA') {
        $('#tblStateTax').removeClass('hide');
        $('.tdFilingStatus').removeClass('hide');
        $('.tdAdditionalAllowances').removeClass('hide');        
    }  
    else if (dtoState.StateCode.toUpperCase() == 'IL') {
        $('#tblStateTax').removeClass('hide');
        $('.tdAdditionalAllowances').removeClass('hide');
        $('.tdBasicAllowances').removeClass('hide');
        $('.tdAdditionalAmount').removeClass('hide');
    }      
    else if (dtoState.StateCode.toUpperCase() == 'SC') {
        $('#tblStateTax').removeClass('hide');
        $('.tdPersonalExemptions').removeClass('hide');        
    }   
    else if (dtoState.StateCode.toUpperCase() == 'LA') {
        $('#tblStateTax').removeClass('hide');
        $('.tdPersonalExemptions').removeClass('hide');
        $('.tdDependentExemptions').removeClass('hide');
    }         
    InitializeDateControls1(); 
    SetKeyPress();
}

function FillCompensations() {
    var params = { ClientId: $.localStorage.get('ClientId'), EmployeeId: parseInt($('#hdnEmployeeId').val(), 10) };
    CallService('Client/EmployeeService.svc', 'GetEmployeeCompensations', params, OnEmployeeGetCompensationsSuccess, true);
}

function OnEmployeeGetCompensationsSuccess(arrCompensations) {
    var i = 0;
    var Compensations = '';
    $.each(arrCompensations, function () {
        Compensations += i + String.fromCharCode(134);
        Compensations += this.CompensationId + String.fromCharCode(134);
        Compensations += FormatDateUTC(this.StartDate) + String.fromCharCode(134);
        Compensations += this.PayType + String.fromCharCode(134);               
        Compensations += this.PayRate + String.fromCharCode(134);
        Compensations += this.VacationDays + String.fromCharCode(134);
        Compensations += this.SickDays + String.fromCharCode(134);        
        Compensations += "0";
        if (i < arrCompensations.length - 1) {
            Compensations += String.fromCharCode(135);
        }
        i++;
    });
    $('#hdnCompensations').val(Compensations);
    FillGrid2();
}

function Delete2(rowNo) {
    var arrCompensations = $('#hdnCompensations').val().split(String.fromCharCode(135));
    var arrCompensation = arrCompensations[rowNo].split(String.fromCharCode(134));
    arrCompensation[7] = "1";
    arrCompensations[rowNo] = arrCompensation.join(String.fromCharCode(134));
    $('#hdnCompensations').val(arrCompensations.join(String.fromCharCode(135)));
}
function NewRecord2() {    
    var arrCompensations = $('#hdnCompensations').val().split(String.fromCharCode(135));
    if (arrCompensations[0] == "") {
        arrCompensations.splice(0, 1);
    }   
    var html = '<tr><td><span class="spanStartDate2"></span><input type="text" class="form-control input-date-picker txtStartDate2" ' + (arrCompensations.length == 0 ? 'disabled' : '') + ' value="' + (arrCompensations.length == 0 ? $('#txtHireDate').val() : '') + '"/></td><td><span class="spanPayTypeName1"></span><select class="form-control cmbPayTypeName1">';        
    html += '<option value=""></option>';
    html += '<option value="Hourly">Hourly</option>';
    html += '<option value="Salary">Salary</option>';
    html += '</select><td><span class="spanPayRate"></span><input class="form-control textbox txtPayRate" value="$0.00"></td><td><span class="spanVacationDays1"></span><input class="form-control integer txtVacationDays1" value="0"/></td><td><span class="spanSickDays1"></span><input  class="form-control integer txtSickDays1" value="0"/></td>';                
    html += '<td class="td-center"><a href="javascript:void(0)" title="Save" class="ok2"><i class="fa fa-floppy-o" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" title="Cancel" class="cancel2"><i class="fa fa-times" aria-hidden="true"></i></ a> <a href="javascript:void(0)" class="edit2 hide link"><i class="fa fa-pencil" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp; <a href="javascript:void(0)" class="delete2 hide link"><i class="fa fa-trash" aria-hidden="true"></i></a></td></tr > ';
    $('#tblCompensations tbody').append(html);
    InitializeDateControls2();   
    SetKeyPress();
    FocusInFocusOut();
};

function FillGrid2() {
    var html = '';
    if ($('#hdnCompensations').val() != "") {   
        var arrCompensations = $('#hdnCompensations').val().split(String.fromCharCode(135));
        var k = 0;
        for (var i = 0; i < arrCompensations.length; i++) {
            var arrCompensation = arrCompensations[i].split(String.fromCharCode(134));
            if (arrCompensation[7] == "0") {
                html += '<tr id="CRow' + i + '" class="' + (k % 2 == 0 ? "footable-even" : "footable-odd") + '">';                
                html += '<td><span class="spanStartDate2">' + arrCompensation[2] + '</span><input type="text" class="form-control input-date-picker txtStartDate2 hide" /></td>';
                html += '<td><span class="spanPayTypeName1">' + arrCompensation[3] + '</span><select class="form-control cmbPayTypeName1 hide">';
                html += '<option value=""></option>';
                html += '<option value="Hourly">Hourly</option>';
                html += '<option value="Salary">Salary</option>';               
                html += '</select></td>';
                html += '<td><span class="spanPayRate">' + accounting.formatMoney(arrCompensation[4]) + '</span><input class="form-control textbox txtPayRate hide" value="$0.00"/></td>';
                html += '<td><span class="spanVacationDays1">' + arrCompensation[5] + '</span><input class="form-control integer txtVacationDays1 hide" value="0"/></td>';
                html += '<td><span class="spanSickDays1">' + arrCompensation[6] + '</span><input class="form-control integer txtSickDays1 hide" value="0"/></td>';                               
                html += '<td class="td-center"><a href="javascript:void(0)" title="Save" class="ok2 hide"><i class="fa fa-floppy-o" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" title="Cancel" class="cancel2 hide"><i class="fa fa-times" aria-hidden="true"></i></ a><a href="javascript:void(0)" class="edit2 link"><i class="fa fa-pencil" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" class="delete2 link"><i class="fa fa-trash" aria-hidden="true"></i></a></td>';                
                html += '</tr>';
                k++;
            }
        }
    }
    $('#bodyCompensations').html(html);
    InitializeDateControls2(); 
}
function FillSummaries() {
    var params = { ClientId: $.localStorage.get('ClientId'), EmployeeId: parseInt($('#hdnEmployeeId').val(), 10) };
    CallService('Client/EmployeeService.svc', 'GetEmployeeSummaries', params, OnEmployeeGetSummariesSuccess, true);
}

function OnEmployeeGetSummariesSuccess(arrSummaries) {
    var i = 0;
    var Summaries = '';
    $.each(arrSummaries, function () {
        Summaries += i + String.fromCharCode(134);
        Summaries += this.SummaryId + String.fromCharCode(134);
        Summaries += this.PayStubId + String.fromCharCode(134);
        Summaries += this.PayStubName + String.fromCharCode(134);
        Summaries += this.PayStubSideId + String.fromCharCode(134);
        Summaries += this.PayStubSideName + String.fromCharCode(134);
        Summaries += this.Amount + String.fromCharCode(134);
        Summaries += this.FederalIncomeTaxText + String.fromCharCode(134);
        Summaries += this.SocialSecurityText + String.fromCharCode(134);
        Summaries += this.MedicareText + String.fromCharCode(134);
        Summaries += this.Quarter + String.fromCharCode(134);
        Summaries += this.QuarterName + String.fromCharCode(134);        
        Summaries += "0";
        if (i < arrSummaries.length - 1) {
            Summaries += String.fromCharCode(135);
        }
        i++;
    });
    $('#hdnSummaries').val(Summaries);
    FillGrid3();
}

function NewRecord3() { 
    var html = '';
    var params = { ClientId: $.localStorage.get('ClientId')};
    PayStubs = CallService1('Client/PayStubService.svc', 'GetLookup', params);
    html += '<tr>';
    html += '<td><span class="spanPayStubName hide"></span><select class="form-control cmbPayStubName">';
    html += '<option value="0"></option>';
    html += '<option value="-1">Regular Pay</option>';
    html += '<option value="-3">OT Pay</option>';
    html += '<option value="-4">Double OT Pay</option>';
    html += '<option value="-5">Sick Pay</option>';
    html += '<option value="-6">Vacation Pay</option>';
    if (PayStubs != undefined) {
        for (var j = 0; j < PayStubs.length; j++) {
            html += '<option value="' + PayStubs[j]['PayStubId'] + '">' + PayStubs[j]['PayStubName'] + '</option>';
        }
    }
    html += '</select></td>';
    html += '<td><span class="spanPayStubSide hide"></span><select class="form-control cmbPayStubSide">';
    html += '<option value="0"></option>';
    html += '<option value="1">Gross Pay</option>';
    html += '<option value="2">Deduction</option>';
    html += '<option value="3">Additions to net pay</option>';
    html += '<option value="4">Other employer Pay</option>';
    html += '</select></td>';
    html += '<td><span class="spanAmount hide"></span><input class="form-control textbox txtAmount" value="$0.00"/></td>';
    html += '<td><span class="spanFederalIncomeTax hide"></span><input type="checkbox" class="chkFederalIncomeTax"/></td>';
    html += '<td><span class="spanSocialSecurity hide"></span><input type="checkbox" class="chkSocialSecurity"/></td>';
    html += '<td><span class="spanMedicare hide"></span><input type="checkbox" class="chkMedicare"/></td>';
    html += '<td><span class="spanQuarter hide"></span><select class="form-control cmbQuarter">';
    html += '<option value="0"></option>';
    html += '<option value="1">Q1</option>';
    html += '<option value="2">Q2</option>';
    html += '<option value="3">Q3</option>';
    html += '<option value="4">Q4</option>';
    html += '</select></td>';
    html += '<td class="td-center"><a href="javascript:void(0)" title="Save" class="ok3"><i class="fa fa-floppy-o" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" title="Cancel" class="cancel3"><i class="fa fa-times" aria-hidden="true"></i></ a> <a href="javascript:void(0)" class="edit3 hide link"><i class="fa fa-pencil" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp; <a href="javascript:void(0)" class="delete3 hide link"><i class="fa fa-trash" aria-hidden="true"></i></a></td></tr > ';
    html += '</tr>';     
        
    $('#tblSummaries tbody').append(html);

    InitializeDateControls3();    
    SetKeyPress();
    FocusInFocusOut();
};

function FillGrid3() {
    var html = '';
    if ($('#hdnSummaries').val() != "") {
        var params = { ClientId: $.localStorage.get('ClientId')};
        var PayStubs = CallService1('Client/PayStubService.svc', 'GetLookup', params);       
        var arrSummaries = $('#hdnSummaries').val().split(String.fromCharCode(135));
        var k = 0;
        for (var i = 0; i < arrSummaries.length; i++) {
            var arrSummary = arrSummaries[i].split(String.fromCharCode(134));
            if (arrSummary[12] == "0") {
                html += '<tr id="MRow' + i + '" class="' + (k % 2 == 0 ? "footable-even" : "footable-odd") + '">';
                html += '<td><span class="spanPayStubName">' + arrSummary[3] + '</span><select class="form-control cmbPayStubName hide">';
                html += '<option value="0"></option>';
                html += '<option value="-2">Regular Pay</option>';
                if (PayStubs != undefined) {
                    for (var j = 0; j < PayStubs.length; j++) {
                        html += '<option value="' + PayStubs[j]['PayStubId'] + '">' + PayStubs[j]['PayStubName'] + '</option>';
                    }
                }
                html += '</select></td>';
                html += '<td><span class="spanPayStubSide">' + arrSummary[5] + '</span><select class="form-control cmbPayStubSide hide">';
                html += '<option value="0"></option>';
                html += '<option value="1">Gross Pay</option>';
                html += '<option value="2">Deduction</option>';
                html += '<option value="3">Additions to net pay</option>';
                html += '<option value="4">Other employer Pay</option>';
                html += '</select></td>';
                html += '<td><span class="spanAmount">' + accounting.formatMoney(arrSummary[6]) + '</span><input class="form-control textbox txtAmount hide" value="0"/></td>';
                html += '<td><span class="spanFederalIncomeTax">' + arrSummary[7] + '</span><input type="checkbox" class="chkFederalIncomeTax hide"/></td>';
                html += '<td><span class="spanSocialSecurity">' + arrSummary[8] + '</span><input type="checkbox" class="chkSocialSecurity hide"/></td>';
                html += '<td><span class="spanMedicare">' + arrSummary[9] + '</span><input type="checkbox" class="chkMedicare hide"/></td>';
                html += '<td><span class="spanQuarter">' + arrSummary[11] + '</span><select class="form-control cmbQuarter hide">';
                html += '<option value="0"></option>'; 
                html += '<option value="1">Q1</option>';       
                html += '<option value="2">Q2</option>';       
                html += '<option value="3">Q3</option>';       
                html += '<option value="4">Q4</option>';                      
                html += '</select></td>';               
                html += '<td class="td-center"><a href="javascript:void(0)" title="Save" class="ok3 hide"><i class="fa fa-floppy-o" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" title="Cancel" class="cancel3 hide"><i class="fa fa-times" aria-hidden="true"></i></ a><a href="javascript:void(0)" class="edit3 link"><i class="fa fa-pencil" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" class="delete3 link"><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
                html += '</tr>';
                k++;
            }
        }
    }
    $('#bodySummaries').html(html);
    InitializeDateControls3();
}

function StepClick(index) {
    CurrentStepIndex = index;
    CommandManager();
}
function CommandManager() {
    if (CurrentStepIndex == 1) {
        $('#liStep1').addClass('completed');
        $('#liStep2').removeClass('completed');        
        $('#liStep3').removeClass('completed');
        $('#liStep4').removeClass('completed');
        $('#liStep5').removeClass('completed');        
        $('#liStep6').removeClass('completed');
        $('#liStep7').removeClass('completed');

        $('#divStep1').removeClass('hide');
        $('#divStep2').addClass('hide');        
        $('#divStep3').addClass('hide');
        $('#divStep4').addClass('hide');
        $('#divStep5').addClass('hide');    
        $('#divStep6').addClass('hide'); 
        $('#divStep7').addClass('hide'); 

        $("#btnSaveAndContinue").removeAttr('disabled');
        $("#btnBack").attr('disabled', 'disabled');
        $("#btnNext").removeAttr('disabled');
    }
    else if (CurrentStepIndex == 2) {
        $('#liStep1').addClass('completed');
        $('#liStep2').addClass('completed');        
        $('#liStep3').removeClass('completed');
        $('#liStep4').removeClass('completed');
        $('#liStep5').removeClass('completed');        
        $('#liStep6').removeClass('completed');
        $('#liStep7').removeClass('completed');

        $('#divStep1').addClass('hide');
        $('#divStep2').removeClass('hide');       
        $('#divStep3').addClass('hide');
        $('#divStep4').addClass('hide');
        $('#divStep5').addClass('hide');
        $('#divStep6').addClass('hide');
        $('#divStep7').addClass('hide');

        $("#btnSaveAndContinue").removeAttr('disabled');
        $("#btnBack").removeAttr('disabled');
        $("#btnNext").removeAttr('disabled');
    }    
    else if (CurrentStepIndex == 3) {
        $('#liStep1').addClass('completed');
        $('#liStep2').addClass('completed');        
        $('#liStep3').addClass('completed');
        $('#liStep4').removeClass('completed');
        $('#liStep5').removeClass('completed');       
        $('#liStep6').removeClass('completed');
        $('#liStep7').removeClass('completed');

        $('#divStep1').addClass('hide');
        $('#divStep2').addClass('hide');        
        $('#divStep3').removeClass('hide');
        $('#divStep4').addClass('hide');
        $('#divStep5').addClass('hide');    
        $('#divStep6').addClass('hide');
        $('#divStep7').addClass('hide');

        $("#btnSaveAndContinue").removeAttr('disabled');
        $("#btnBack").removeAttr('disabled');
        $("#btnNext").removeAttr('disabled');
    }
    else if (CurrentStepIndex == 4) {
        $('#liStep1').addClass('completed');
        $('#liStep2').addClass('completed');        
        $('#liStep3').addClass('completed');
        $('#liStep4').addClass('completed');
        $('#liStep5').removeClass('completed');        
        $('#liStep6').removeClass('completed');
        $('#liStep7').removeClass('completed');

        $('#divStep1').addClass('hide');
        $('#divStep2').addClass('hide');        
        $('#divStep3').addClass('hide');
        $('#divStep4').removeClass('hide');
        $('#divStep5').addClass('hide');     
        $('#divStep6').addClass('hide'); 
        $('#divStep7').addClass('hide'); 

        $("#btnSaveAndContinue").removeAttr('disabled');
        $("#btnBack").removeAttr('disabled');
        $("#btnNext").removeAttr('disabled');
    }   
    else if (CurrentStepIndex == 5) {
        if (parseInt($('#hdnEmployeeId').val(), 10) == 0) {
            StepClick(6);
        }
        else {
            $('#liStep1').addClass('completed');
            $('#liStep2').addClass('completed');            
            $('#liStep3').addClass('completed');
            $('#liStep4').addClass('completed');
            $('#liStep5').addClass('completed');
            $('#liStep6').removeClass('completed');
            $('#liStep7').removeClass('completed');

            $('#divStep1').addClass('hide');
            $('#divStep2').addClass('hide');           
            $('#divStep3').addClass('hide');
            $('#divStep4').addClass('hide');
            $('#divStep5').removeClass('hide');
            $('#divStep6').addClass('hide');
            $('#divStep7').addClass('hide');

            $("#btnSaveAndContinue").removeAttr('disabled');
            $("#btnBack").removeAttr('disabled');
            $("#btnNext").removeAttr('disabled');
        }
    }
    else if (CurrentStepIndex == 6) {
        $('#liStep1').addClass('completed');
        $('#liStep2').addClass('completed');        
        $('#liStep3').addClass('completed');
        $('#liStep4').addClass('completed');
        $('#liStep5').addClass('completed');
        $('#liStep6').addClass('completed');
        $('#liStep7').removeClass('completed');

        $('#divStep1').addClass('hide');
        $('#divStep2').addClass('hide');        
        $('#divStep3').addClass('hide');
        $('#divStep4').addClass('hide');
        $('#divStep5').addClass('hide');
        $('#divStep6').removeClass('hide');
        $('#divStep7').addClass('hide');

        $("#btnSaveAndContinue").removeAttr('disabled');
        $("#btnBack").removeAttr('disabled');
        $("#btnNext").removeAttr('disabled');
    }
    else if (CurrentStepIndex == 7) {
        $('#liStep1').addClass('completed');
        $('#liStep2').addClass('completed');
        $('#liStep3').addClass('completed');
        $('#liStep4').addClass('completed');
        $('#liStep5').addClass('completed');
        $('#liStep6').addClass('completed');
        $('#liStep7').addClass('completed');

        $('#divStep1').addClass('hide');
        $('#divStep2').addClass('hide');
        $('#divStep3').addClass('hide');
        $('#divStep4').addClass('hide');
        $('#divStep5').addClass('hide');
        $('#divStep6').addClass('hide');
        $('#divStep7').removeClass('hide');

        $("#btnSaveAndContinue").attr('disabled', 'disabled');
        $("#btnBack").removeAttr('disabled');
        $("#btnNext").attr('disabled', 'disabled');
    }
}
$("#btnSaveAndContinue").click(function (e) {
    SaveAndContinue();
});
$("#btnBack").click(function (e) {
    CurrentStepIndex = CurrentStepIndex - 1   
    if ((parseInt($('#hdnEmployeeId').val(), 10) == 0) && (CurrentStepIndex == 5)){
        CurrentStepIndex = CurrentStepIndex - 1
    }
    CommandManager();
});
$("#btnNext").click(function (e) {    
    if (CurrentStepIndex == 1)
    {
        if (!form.valid()) {
            return false;
        }
    }
    CurrentStepIndex = CurrentStepIndex + 1
    CommandManager();
});
$("#btnFinish").click(function (e) {
    Finish();
});
$("#btnClose").click(function (e) {
    Close();
});
$("#cmbDepartmentName").change(function () {
    if ($("#cmbDepartmentName").val() == -1) {
        $('#myModal').modal('toggle');
        $("#txtDepartmentName").val('');
    }
});
$("#btnSaveDepartment").click(function (e) {
    SaveDepartment();
});
$.validator.addMethod(
    "AlreadyExists",
    function (value, element) {
        var params = { ClientId: $.localStorage.get('ClientId'), DepartmentId: 0, DepartmentName: value };
        var response = CallService1('Client/DepartmentService.svc', 'Exists', params);

        return !response;
    },
    "Department Name already exists"
);

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
        txtDepartmentName: {
            required: true,
            AlreadyExists: true
        }
    },
    messages: {
        txtDepartmentName: {
            required: 'Department Name is required'
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

function SaveDepartment() {    
    if (form1.valid()) {
        var params = {
            DepartmentId: 0,
            ClientId: $.localStorage.get('ClientId'),
            DepartmentName: $("#txtDepartmentName").val()
        };
        CallService('Client/DepartmentService.svc', 'Save', params, OnDepartmentSaveSuccess, false);
    }
};

function OnDepartmentSaveSuccess(DepartmentId) {    
    if (DepartmentId > 0) {
        FillDepartments();
        $('#cmbDepartmentName').val(DepartmentId);
        $('#myModal').modal('toggle');
    }
}
$("#cmbLocationName").change(function () {
    if ($("#cmbLocationName").val() == -1) {
        $('#myModal1').modal('toggle');
        $("#txtLocationName").val('');
        $("#txtAddress11").val('');
        $("#txtAddress21").val('');        
        $("#txtCityName1").val('');
        $("#cmbStateName1").val('0');
        $("#txtZipCode1").val('');
        $("#txtZipCodeExt1").val('');
    }
});
$("#btnSaveLocation").click(function (e) {
    SaveLocation();
});
$.validator.addMethod(
    "AlreadyExists1",
    function (value, element) {
        var params = { ClientId: $.localStorage.get('ClientId'), LocationId: 0, LocationName: value };
        var response = CallService1('Client/LocationService.svc', 'Exists', params);

        return !response;
    },
    "Location Name already exists"
);
$.validator.addMethod(
    "Required5",
    function (value, element) {

        return ($('#cmbStateName1').val() == '0' ? false : true);
    },
    "State is required"
);
var form2 = $("#frmEntry2");
var valid2 = form2.validate({

    /* @validation states + elements
         ------------------------------------------- */

    errorClass: 'error-view',
    validClass: 'success-view',
    errorElement: 'span',

    /* @validation rules
         ------------------------------------------ */
    rules: {
        txtLocationName: {
            required: true,
            AlreadyExists1: true
        },
        txtAddress11: {
            required: true
        },
        txtCityName1: {
            required: true
        },
        cmbStateName1: {
            Required5: true
        },
        txtZipCode1: {
            required: true
        }
    },
    messages: {
        txtLocationName: {
            required: 'Location Name is required'
        },
        txtAddress11: {
            required: 'Address is required'
        },
        txtCityName1: {
            required: 'City is required'
        },
        txtZipCode1: {
            required: 'Zip is required'
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
//function FillStates1() {
//    var params = {};
//    CallService('Public/StateService.svc', 'GetLookup', params, OnStateGetLookupSuccess1, false);
//}

//function OnStateGetLookupSuccess1(states) {
//    var html = '<option value="0"></option>';
//    if (states != undefined) {
//        for (var i = 0; i < states.length; i++) {
//            html += '<option value="' + states[i]['StateId'] + '">' + states[i]['StateName'] + '</option>';
//        }
//    }
//    $('#cmbStateName1').html(html);
//    $('#cmbStateName1').val("0");
//}
//FillStates1();
function SaveLocation() {
    if (form2.valid()) {
        var params = {
            LocationId: 0,
            ClientId: $.localStorage.get('ClientId'),
            LocationName: $("#txtLocationName").val(),
            Address1: $("#txtAddress11").val(),
            Address2: $("#txtAddress21").val(),           
            CityName: $("#txtCityName1").val(),
            StateId: $("#cmbStateName1").val(),
            ZipCode: $("#txtZipCode1").val(),
            ZipCodeExt: $("#txtZipCodeExt1").val()
        };
        CallService('Client/LocationService.svc', 'Save', params, OnLocationSaveSuccess, false);
    }
};

function OnLocationSaveSuccess(LocationId) {
    if (LocationId > 0) {
        FillLocations();
        $('#cmbLocationName').val(LocationId);
        $('#myModal1').modal('toggle');
    }
}
$("#cmbCompensationClassName").change(function () {
    if ($("#cmbCompensationClassName").val() == -1) {
        $('#myModal2').modal('toggle');
        $("#txtCompensationClassName").val('');
    }
});
$("#btnSaveClass").click(function (e) {
    SaveClass();
});
$.validator.addMethod(
    "AlreadyExists2",
    function (value, element) {
        var params = { ClientId: $.localStorage.get('ClientId'), CompensationClassId: 0, CompensationClassName: value };
        var response = CallService1('Client/CompensationClassService.svc', 'Exists', params);

        return !response;
    },
    "Compensation Class Name already exists"
);

var form3 = $("#frmEntry3");
var valid3 = form3.validate({

    /* @validation states + elements
         ------------------------------------------- */

    errorClass: 'error-view',
    validClass: 'success-view',
    errorElement: 'span',

    /* @validation rules
         ------------------------------------------ */
    rules: {
        txtCompensationClassName: {
            required: true,
            AlreadyExists2: true
        }
    },
    messages: {
        txtCompensationClassName: {
            required: 'Compensation Class Name is required'
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
function SaveClass() {
    if (form3.valid()) {
        var params = {
            CompensationClassId: 0,
            ClientId: $.localStorage.get('ClientId'),
            CompensationClassName: $("#txtCompensationClassName").val()
        };
        CallService('Client/CompensationClassService.svc', 'Save', params, OnCompensationClassSaveSuccess, false);
    }
};

function OnCompensationClassSaveSuccess(CompensationClassId) {
    if (CompensationClassId > 0) {
        FillCompensationClasses();
        $('#cmbCompensationClassName').val(CompensationClassId);
        $('#myModal2').modal('toggle');
    }
}
function FillFiles() {
    var params = { Path: $('#hdnCurrentPath').val() };
    CallService('Client/EmployeeService.svc', 'GetFiles', params, OnEmployeeGetFilesSuccess, false);
}
function OnEmployeeGetFilesSuccess(arrFiles) {
    var arrFiles = arrFiles.slice(0);
    arrFiles.sort(function (a, b) {
        return b.Type - a.Type;
    });
    var html = '';
    if ($('#hdnRootPath').val() != $('#hdnCurrentPath').val()) {
        html += '<tr>';
        html += '<td><a href="javascript:void(0)" onclick="GoBack()" class="link"><i class="fa fa-folder" aria-hidden="true"></i>&nbsp;..</a></td>';
        html += '<td></td>';
        html += '<td class="hide"></td>';
        html += '<td></td>';
        html += '<td></td>';
        html += '</tr>';
    }
    for (var i = 0; i < arrFiles.length; i++) {
        html += '<tr class="' + (i % 2 == 0 ? "footable-even" : "footable-odd") + '">';
        if (arrFiles[i].Type == 1) {
            html += '<td><a href="javascript:void(0)" onclick="OpenFolder(\'' + $('#hdnCurrentPath').val() + '/' + arrFiles[i].Name + '\')" class="link"><i class="fa fa-folder" aria-hidden="true"></i>&nbsp;' + arrFiles[i].Name + '</a></td>';
        }
        else {
            html += '<td><a href="javascript:void(0)" onclick="DownloadFile(\'' + $('#hdnCurrentPath').val() + '/' + arrFiles[i].Name + '\')" class="link"><i class="fa fa-file" aria-hidden="true"></i>&nbsp;' + arrFiles[i].Name + '</a></td>';
        }
        html += '<td style="text-align:right">' + (arrFiles[i].Type == 1 ? '' : (arrFiles[i].Size / 1024).toFixed(0) + ' KB') + '</td>';
        html += '<td class="hide">' + arrFiles[i].Type + '</td>';
        html += '<td>' + IntToDate(arrFiles[i].Time) + '</td>';
        if (arrFiles[i].Type == 1) {
            html += '<td class="td-center"><a href="javascript:void(0)" onclick=\"RenameFile(\'' + arrFiles[i].Name + '\')\" class="link" title="Rename"><i class="fa fa-pencil" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick=\"DeleteFolder(\'' + arrFiles[i].Name + '\')\" class="link" title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
        }
        else {
            html += '<td class="td-center"><a href="javascript:void(0)" onclick=\"RenameFile(\'' + arrFiles[i].Name + '\')\" class="link" title="Rename"><i class="fa fa-pencil" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick=\"DeleteFile(\'' + arrFiles[i].Name + '\')\" class="link" title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
        }
        html += '</tr>';
    }
    $('#bodyFiles').html(html);
}

function GoBack() {
    var arrFiles = $('#hdnCurrentPath').val().split('/');
    arrFiles.splice(arrFiles.length - 1, 1);
    $('#hdnCurrentPath').val(arrFiles.join('/'));
    FillFiles();
}
function RenameFile(FileName) {
    var MyDialog = bootbox.dialog({
        title: "Rename",
        message: '<form id="formUpload" action="/Payroll.Services/Client/EmployeeService.svc/RenameFile" method="post"><input type="hidden" id="hdnCurrentPath2" name="hdnCurrentPath2" value="' + $('#hdnCurrentPath').val() + '"/><div class="row"><div class="col-md-6"><input type="hidden" name="hdnOldFileName" style="width:250px" value="' + FileName + '"/><input name="txtNewFileName" style="width:250px" value="' + FileName + '"/></div><div class="col-md-6 text-right"><button id="btnSubmit" type="submit" class="btn btn-primary"><i class="fa fa-floppy-o" aria-hidden="true"></i> Submit</button></div></div></form>'
    });
    $('#formUpload').submit(function () {

        $(this).ajaxSubmit({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Key', parseInt($.localStorage.get('UserId'), 10));
                xhr.setRequestHeader('X-Access-Token', $.localStorage.get('Token'));
            },
            error: function (xhr) {
                //status('Error: ' + xhr.status);
            },
            success: function (response) {
                FillFiles();
                MyDialog.modal('hide');
            }
        });
        //Very important line, it disable the page refresh.           
        return false;
    });

}
function DeleteFile(FileName) {
    bootbox.dialog({
        message: "Are you sure to delete selected record?",
        title: "Payroll",
        buttons: {
            ok: {
                label: "<i class=\"fa fa-check\" aria-hidden=\"true\"></i> OK",
                className: "btn btn-primary",
                callback: function () {
                    var params = { Path: $('#hdnCurrentPath').val() + '/' + FileName };
                    var response = CallService1('Client/EmployeeService.svc', 'DeleteFile', params);
                    if (response) {
                        FillFiles();
                    }
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
function DeleteFolder(FolderName) {
    bootbox.dialog({
        message: "Are you sure to delete selected record?",
        title: "Payroll",
        buttons: {
            ok: {
                label: "<i class=\"fa fa-check\" aria-hidden=\"true\"></i> OK",
                className: "btn btn-primary",
                callback: function () {
                    var params = { Path: $('#hdnCurrentPath').val() + '/' + FolderName };
                    var response = CallService1('Client/EmployeeService.svc', 'DeleteFolder', params);
                    if (response) {
                        FillFiles();
                    }
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
function OpenFolder(Path) {
    $('#hdnCurrentPath').val(Path);
    FillFiles();
}
function DownloadFile(Path) {
    window.location.href = '/Payroll.Services/Client/EmployeeService.svc/Download/' + Path;
}

$.validator.addMethod(
    "InvalidPayPeriodEndDate",
    function (value, element) {
        if ($('#txtPayPeriodEndDate').val().trim() != '') {
            return ($('#txtPayPeriodEndDate').val().trim().length < 10 ? false : true);
        }
        return true;
    },
    "Invalid Pay Period End Date"
);
$.validator.addMethod(
    "AlreadyExists3",
    function (value, element) {
        var params = { ClientId: $.localStorage.get('ClientId'), PayScheduleId: 0, PayScheduleName: value };
        var response = CallService1('Client/PayScheduleService.svc', 'Exists', params);
        return !response;
    },
    "Pay Schedule Name already exists"
);
$.validator.addMethod(
    "Required6",
    function (value, element) {

        return ($('#cmbPayScheduleRecurrenceName').val() == '0' ? false : true);
    },
    "Recurrence is required"
);
var form4 = $("#frmEntry4");
var valid4 = form4.validate({

    /* @validation states + elements
         ------------------------------------------- */

    errorClass: 'error-view',
    validClass: 'success-view',
    errorElement: 'span',

    /* @validation rules
         ------------------------------------------ */
    rules: {
        txtPayScheduleName: {
            required: true,
            AlreadyExists3: true
        },
        txtPayPeriodEndDate:
        {
            required: true,
            InvalidPayPeriodEndDate: true
        },
        cmbPayScheduleRecurrenceName: {
            Required6: true
        }
    },
    messages: {
        txtPayScheduleName: {
            required: 'Pay Schedule Name is required'
        },
        txtPayPeriodEndDate:
        {
            required: 'Pay Period End Date is required'
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
function FillPayScheduleRecurrences() {
    var params = {};
    CallService('Client/PayScheduleRecurrenceService.svc', 'GetLookup', params, OnPayScheduleRecurrenceGetLookupSuccess, false);
}

function OnPayScheduleRecurrenceGetLookupSuccess(PayScheduleRecurrences) {
    var html = '<option value="0"></option>';
    if (PayScheduleRecurrences != undefined) {
        for (var i = 0; i < PayScheduleRecurrences.length; i++) {
            html += '<option value="' + PayScheduleRecurrences[i]['PayScheduleRecurrenceId'] + '">' + PayScheduleRecurrences[i]['PayScheduleRecurrenceName'] + '</option>';
        }
    }
    $('#cmbPayScheduleRecurrenceName').html(html);
    $('#cmbPayScheduleRecurrenceName').val("0");
}
FillPayScheduleRecurrences();
function SavePaySchedule() {
    if (form4.valid()) {
        var params = {
            PayScheduleId:0,
            ClientId: $.localStorage.get('ClientId'),
            PayScheduleName: $("#txtPayScheduleName").val(),
            DaysAfterClose: $("#txtDaysAfterClose").val(),
            PayPeriodEndDate: $("#txtPayPeriodEndDate").val(),
            PayScheduleRecurrenceId: $("#cmbPayScheduleRecurrenceName").val(),
            DailyEveryWeekDay: $("#chkDailyEveryWeekDay").is(':checked'),
            Status: $("#cmbStatus1").val(),
            Default: $("#chkDefault").is(':checked')
        };
        CallService('Client/PayScheduleService.svc', 'Save', params, OnPayScheduleSaveSuccess, false);
    }
};

function OnPayScheduleSaveSuccess(PayScheduleId) {
    if (PayScheduleId > 0) {
        FillPaySchedules();
        $('#cmbPayScheduleName').val(PayScheduleId);
        $('#myModal3').modal('toggle');
    }
}

$("#cmbPayScheduleRecurrenceName").change(function () {
    $('#trRecur').removeClass('hide');
    var params = { PayScheduleRecurrenceId: parseInt($(this).val(), 10) };
    var dtoPayScheduleRecurrence = CallService1('Client/PayScheduleRecurrenceService.svc', 'GetObject', params);
    if (dtoPayScheduleRecurrence.PayScheduleRecurrenceCode == 'DA') {
        $('#trRecur').removeClass('hide');
    }
    else if (dtoPayScheduleRecurrence.PayScheduleRecurrenceCode == 'WW') {
        $('#trRecur').addClass('hide');
    }
    else if (dtoPayScheduleRecurrence.PayScheduleRecurrenceCode == 'BW') {
        $('#trRecur').addClass('hide');
    }
    else if (dtoPayScheduleRecurrence.PayScheduleRecurrenceCode == 'SM') {
        $('#trRecur').addClass('hide');
    }
    else if (dtoPayScheduleRecurrence.PayScheduleRecurrenceCode == 'MM') {
        $('#trRecur').addClass('hide');
    }
    else if (dtoPayScheduleRecurrence.PayScheduleRecurrenceCode == 'QQ') {
        $('#trRecur').addClass('hide');
    }
    else if (dtoPayScheduleRecurrence.PayScheduleRecurrenceCode == 'SA') {
        $('#trRecur').addClass('hide');
    }
    else if (dtoPayScheduleRecurrence.PayScheduleRecurrenceCode == 'AA') {
        $('#trRecur').addClass('hide');
    }
    else {
        $('#trRecur').addClass('hide');
    }
});
$("#btnSavePaySchedule").click(function (e) {
    SavePaySchedule();
});
$("#cmbPayScheduleName").change(function () {
    if ($("#cmbPayScheduleName").val() == -1) {
        $('#myModal3').modal('toggle');
        $("#txtPayScheduleName").val('');
        $("#txtDaysAfterClose").val('0');
        $("#txtPayPeriodEndDate").val('');
        $("#cmbPayScheduleRecurrenceName").val('0');
        $("#chkDailyEveryWeekDay").removeAttr('checked');
        $("#cmbStatus1").val('Active');
        $("#chkDefault").removeAttr('checked');
    }
});
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
window.scrollTo(0, 0); 