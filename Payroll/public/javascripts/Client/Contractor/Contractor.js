CheckPageRequest();
var CurrentStepIndex = 1;

app.page("Contractor", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnContractorId').val(params);
            $('.page-head').html("Edit Contractor");
            var params = { ClientId: $.localStorage.get('ClientId'), ContractorId: parseInt($('#hdnContractorId').val(), 10) };
            var dtoContractor = CallService1('Client/Contractor/ContractorService.svc', 'GetObject', params);
            if (dtoContractor.ContractorId != undefined) {
                $('#hdnContractorId').val(dtoContractor.ContractorId);
                $('#txtFederalEIN').val(dtoContractor.FederalEIN);
                //dtoContractor.Type == 1 ? $('#radioBusiness').attr('checked', 'checked') : $('#radioIndividual').attr('checked', 'checked');
                //dtoContractor.Type == 1 ? $("#trLine2").attr('style', 'display:inline;') : $("#trLine2").attr('style', 'display:none;');
                $('#txtAddress1').val(dtoContractor.Address1);
                $('#txtAddress2').val(dtoContractor.Address2);               
                $('#txtLine1').val(dtoContractor.Line1);
                $('#txtLine2').val(dtoContractor.Line2);
                $('#txtCityName').val(dtoContractor.CityName);
                $('#cmbStateName').val(dtoContractor.StateId);
                $('#txtZipCode').val(dtoContractor.ZipCode);
                $('#txtZipCodeExt').val(dtoContractor.ZipCodeExt);
                $('#txtEmail').val(dtoContractor.Email);
                $("#cmbStatus").val(dtoContractor.Status);

                if (dtoContractor.Type == 1) {
                    $('#radioBusiness').attr('checked', 'checked');
                    $("#trLine2").removeClass('hide');
                    $("#spanSSN").html("Contractor's Federal EIN:");
                    $("#spanLine1").html("Business Name(Line 1):");
                }
                else {
                    $('#radioIndividual').attr('checked', 'checked');
                    $("#trLine2").addClass('hide');
                    $("#spanSSN").html("SSN:");
                    $("#spanLine1").html("Full Name");
                }

                if (dtoContractor.PaymentMethod == "Check")
                    $('#radioCheck').attr('checked', 'checked');
                else
                    $('#radioDeposit').attr('checked', 'checked');

                //if (dtoContractor.AlreadyPaid == true)
                //    $("#chkAlreadyPaid").attr('checked', 'checked');
                //else
                //    $("#chkAlreadyPaid").removeAttr('checked', '');
            }
            else {
                window.location = "/Client/Main.html#ViewAllContractors";
            }
        }
    }
}); 

if (GetQueryParameter('StepIndex') > 0) {
    CurrentStepIndex = parseInt(GetQueryParameter('StepIndex'), 10);
    StepClick(CurrentStepIndex);
}

$("#txtFederalEIN").focus();
$.validator.addMethod(
    "AlreadyExists",
    function (value, element) {
        var params = { ClientId: $.localStorage.get('ClientId'), ContractorId: parseInt($("#hdnContractorId").val(), 10), FederalEIN: value };
        var response = CallService1('Client/Contractor/ContractorService.svc', 'Exists', params);

        return !response;
    },
    "Federal EIN/SSN already exists"
);

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
    rules: {
        txtFederalEIN: {
            required: true,
            AlreadyExists: true
        },
        txtLine1: {
            required: true,
            AlreadyExists: true
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
        txtEMail: {
            required: true,
            email: true
        }
    },
    messages: {
        txtFederalEIN: {
            required: 'Federal EIN / SSN is required'
        },
        txtLine1: {
            required: 'Business or Individual name is required'
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
        txtEMail: {
            required: 'E-Mail is required',
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

function TypeChange() {
    if ($("input:radio[name='Type']:checked").val() == "1") {
        $("#spanSSN").html("Contractor's Federal EIN:");
        $("#spanLine1").html("Business Name(Line 1):");
        $("#trLine2").removeClass('hide');
    }
    else {
        $("#spanSSN").html("SSN:");
        $("#spanLine1").html("Full Name");
        $("#trLine2").addClass('hide');
    }
}

function Save() {
    if (form.valid()) {
        //alert($("#chkInactive:checkbox:checked").length);
        var params = {
            ContractorId: $("#hdnContractorId").val()== '' ? 0 : parseInt($("#hdnContractorId").val(), 10),
            ClientId: $.localStorage.get('ClientId'),
            Type: $("input:radio[name='Type']:checked").val(),
            FederalEIN: $("#txtFederalEIN").val(),
            Line1: $("#txtLine1").val(),
            Line2: $("#txtLine2").val(),
            Address1: $("#txtAddress1").val(),
            Address2: $("#txtAddress2").val(),           
            CityName: $("#txtCityName").val(),
            StateId: $("#cmbStateName").val(),
            ZipCode: $("#txtZipCode").val(),
            ZipCodeExt: $("#txtZipCodeExt").val(),
            Email: $("#txtEmail").val(),
            Status: $("#cmbStatus").val(),
            PaymentMethod: $("input:radio[name='PaymentMethod']:checked").val(),
            AlreadyPaid: false, //$("#chkAlreadyPaid:checkbox:checked").length == 0 ? false : true,
            Compensations: $('#hdnCompensations').val(),
        };
        CallService('Client/Contractor/ContractorService.svc', 'Save', params, OnContractorSaveSuccess, false);
    }
};

$("#btnNext").click(function (e) {
    if (CurrentStepIndex == 1) {
        if (!form.valid()) {
            return false;
        }
        else
        {
            CurrentStepIndex = CurrentStepIndex + 1;
            CommandManager();
        }
    }
   
});

$("#btnBack").click(function (e) {
    if (CurrentStepIndex == 2) {
        if (!form.valid()) {
            return false;
        }
        else {
            CurrentStepIndex = CurrentStepIndex - 1;
            CommandManager();
        }
    }

});

function StepClick(index) {
    StepIndex = index;
}

function OnContractorSaveSuccess(ContractorId) {
    if (ContractorId > 0) {
        $('#hdnContractorId').val(ContractorId);
        $('#liStep2').removeClass('hide');
        //window.location = "/Client/Main.html#ViewAllContractors";
    }
}



function Close() {
    window.location = "/Client/Main.html#ViewAllContractors";
}


$("#btnClose").click(function (e) {
    Close();
});

$("#btnSave").click(function (e) {
    Save();
});




//---------------------Contractor Compensation----------------------------

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

function InitializeDateControlsCompensation() {
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
            $(this).closest('tr').find('.spanPayRate').removeClass('hide');
            $(this).closest('tr').find('.txtPayRate').addClass('hide');
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
            if (($(this).closest('tr').attr('id') != 'CRow' + arrCompensation[0]) && ($(this).closest('tr').find('.txtStartDate2').val() == arrCompensation[2]) && arrCompensation[7] == '0') {
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
        if ($(this).closest('tr').find('.txtPayRate').val().trim() == "") {
            bootbox.dialog({
                message: "Pay Rate is required",
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
            Compensation += $(this).closest('tr').find('.txtPayRate').val() + String.fromCharCode(134);
            Compensation += "0";
            arrCompensations.push(Compensation);
        }
        else {
            var Compensation = '';
            Compensation += $(this).closest('tr').attr('id').replace('CRow', '') + String.fromCharCode(134);
            Compensation += '0' + String.fromCharCode(134);
            Compensation += $(this).closest('tr').find('.txtStartDate2').val() + String.fromCharCode(134);
            Compensation += $(this).closest('tr').find('.txtPayRate').val() + String.fromCharCode(134);
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
   
        $(this).closest('tr').find('.txtPayRate').val(accounting.formatMoney(arrCompensation[4]));
        $(this).closest('tr').find('.txtPayRate').removeClass('hide');
        $(this).closest('tr').find('.spanPayRate').addClass('hide');
       
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

function FillCompensations() {
    var params = { ClientId: $.localStorage.get('ClientId'), EmployeeId: parseInt($('#hdnContractorId').val(), 10) };
    CallService('Client/EmployeeService.svc', 'GetEmployeeCompensations', params, OnEmployeeGetCompensationsSuccess, true);
}

function Delete2(rowNo) {
    var arrCompensations = $('#hdnCompensations').val().split(String.fromCharCode(135));
    var arrCompensation = arrCompensations[rowNo].split(String.fromCharCode(134));
    arrCompensation[7] = "1";
    arrCompensations[rowNo] = arrCompensation.join(String.fromCharCode(134));
    $('#hdnCompensations').val(arrCompensations.join(String.fromCharCode(135)));
}

function NewRecord2() {
    alert($('#hdnCompensations').val());
    var arrCompensations = $('#hdnCompensations').val().split(String.fromCharCode(135));
    if (arrCompensations[0] == "") {
        arrCompensations.splice(0, 1);
    }
    var html = '<tr><td><span class="spanStartDate2"></span><input type="text" class="form-control input-date-picker txtStartDate2" ' + (arrCompensations.length == 0 ? 'disabled' : '') + ' value="' + (arrCompensations.length == 0 ? $('#txtHireDate').val() : '') + '"/></td>';
    html += '<td><span class="spanPayRate"></span><input class="form-control textbox txtPayRate" value="$0.00"></td><td><span class="spanVacationDays1"></span><input class="form-control integer txtVacationDays1" value="0"/></td><td><span class="spanSickDays1"></span><input  class="form-control integer txtSickDays1" value="0"/></td>';
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
                html += '<td><span class="spanPayRate">' + accounting.formatMoney(arrCompensation[4]) + '</span><input class="form-control textbox txtPayRate hide" value="$0.00"/></td>';
             
                html += '<td class="td-center"><a href="javascript:void(0)" title="Save" class="ok2 hide"><i class="fa fa-floppy-o" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" title="Cancel" class="cancel2 hide"><i class="fa fa-times" aria-hidden="true"></i></ a><a href="javascript:void(0)" class="edit2 link"><i class="fa fa-pencil" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" class="delete2 link"><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
                html += '</tr>';
                k++;
            }
        }
    }
    $('#bodyCompensations').html(html);
    InitializeDateControls2();
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

        //$("#btnSaveAndContinue").removeAttr('disabled');
        $("#btnBack").removeAttr('disabled');
        $("#btnNext").attr('disabled', 'disabled');
    }
}

window.scrollTo(0, 0);