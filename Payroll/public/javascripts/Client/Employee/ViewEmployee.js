CheckPageRequest();
var StepIndex = 1
var dtoEmployee;
var dtoState;  
app.page("ViewEmployee", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnEmployeeId').val(params);
            DisplayData();
            $('#hdnRootPath').val('Documents/Employees/' + $('#hdnEmployeeId').val());
            $('#hdnCurrentPath').val('Documents/Employees/' + $('#hdnEmployeeId').val());            
            FillFederalTaxes();                      
            FillCompensations();           
            FillSummaries();            
            FillFiles();            
        }
    }
});
function DisplayData() {
    var params = { ClientId: parseInt($.localStorage.get('ClientId'), 10), EmployeeId: parseInt($('#hdnEmployeeId').val(), 10) };
    dtoEmployee = CallService1('Client/EmployeeService.svc', 'GetObject', params);
    if (dtoEmployee.EmployeeId != undefined) {
        $('#spanEmployeeCode').html(_.escape(dtoEmployee.EmployeeCode));
        $('#spanFirstName').html(_.escape(dtoEmployee.FirstName));
        $('#spanMiddleNameInitial').html(_.escape(dtoEmployee.MiddleNameInitial));
        $('#spanLastName').html(_.escape(dtoEmployee.LastName));
        $('#spanAddress1').html(_.escape(dtoEmployee.Address1));
        $('#spanAddress2').html(_.escape(dtoEmployee.Address2));        
        $('#spanCityName').html(_.escape(dtoEmployee.CityName));
        $('#spanCountyName').html(_.escape(dtoEmployee.CountyName));
        $('#spanStateName').html(_.escape(dtoEmployee.StateName));
        $('#spanZipCode').html(_.escape(dtoEmployee.ZipCode) + (dtoEmployee.ZipCodeExt.trim() != '' ? '-' + _.escape(dtoEmployee.ZipCodeExt.trim()) : ''));
        $('#spanGender').html(_.escape(dtoEmployee.Gender));
        $('#spanDateOfBirth').html((FormatDateUTC(_.escape(dtoEmployee.DateOfBirth)) == '01/01/1900' ? '' : FormatDateUTC(_.escape(dtoEmployee.DateOfBirth))));
        $('#spanEMailId').html(_.escape(dtoEmployee.EMailId));
        $('#spanWorkPhoneNo').html(_.escape(dtoEmployee.WorkPhoneNo) + (dtoEmployee.WorkPhoneNoExt.trim() != '' ? '-' + _.escape(dtoEmployee.WorkPhoneNoExt.trim()) : ''));
        $('#spanCellPhoneNo').html(_.escape(dtoEmployee.CellPhoneNo));
        $('#spanFaxNo').html(_.escape(dtoEmployee.FaxNo));
        $('#spanDepartmentName').html(_.escape(dtoEmployee.DepartmentName));
        $('#spanLocationName').html(_.escape(dtoEmployee.LocationName));
        $('#spanPayScheduleName').html(_.escape(dtoEmployee.PayScheduleName));
        $('#spanBankName').html(_.escape(dtoEmployee.BankName));
        $('#spanRoutingNo').html(_.escape(dtoEmployee.RoutingNo));
        $('#spanAccountNo').html(_.escape(dtoEmployee.AccountNo));
        $('#spanAccountTypeName').html(_.escape(dtoEmployee.AccountTypeName));
        $('#spanSocialSecurityNo').html(_.escape(dtoEmployee.SocialSecurityNo));
        $('#spanContractor1099').html((dtoEmployee.Contractor1099 == false ? 'No' : 'Yes'));
        $('#spanNewHireReport').html((dtoEmployee.NewHireReport == false ? 'No' : 'Yes'));
        $('#spanFormI9').html((dtoEmployee.FormI9 == false ? 'No' : 'Yes'));
        $('#spanHireDate').html((FormatDateUTC(_.escape(dtoEmployee.HireDate)) == '01/01/1900' ? '' : FormatDateUTC(_.escape(dtoEmployee.HireDate))));
        $('#spanTerminationDate').html((FormatDateUTC(_.escape(dtoEmployee.TerminationDate)) == '01/01/1900' ? '' : FormatDateUTC(_.escape(dtoEmployee.TerminationDate))));
        $('#spanNotes').html(_.escape(dtoEmployee.Notes).replace('\n', '<br/>'));
        $('#spanVacationHoursAvailable').html(_.escape(dtoEmployee.VacationHoursAvailable.toFixed(2)));
        $('#spanVacationHoursUsed').html(_.escape(dtoEmployee.VacationHoursUsed.toFixed(2)));
        $('#spanSickLeaveHoursAvailable').html(_.escape(dtoEmployee.SickLeaveHoursAvailable.toFixed(2)));
        $('#spanSickLeaveHoursUsed').html(_.escape(dtoEmployee.SickLeaveHoursUsed.toFixed(2)));
        $('#spanCompensationClassName').html(_.escape(dtoEmployee.CompensationClassName));
        $('#spanStatus').html(_.escape(dtoEmployee.Status));
        StateChange()
    }
    else {
        window.location = "/Client/Main.html#ViewAllEmployees";
    }
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
        message: '<form id="formUpload" action="/Payroll.Services/Client/EmployeeService.svc/RenameFile" method="post"><input type="hidden" id="hdnCurrentPath2" name="hdnCurrentPath2" value="' + $('#hdnCurrentPath').val() + '"/><div class="row"><div class="col-md-6"><input type="hidden" name="hdnOldFileName" style="width:250px" value="' + FileName + '"/><input name="txtNewFileName" style="width:250px" value="' + FileName + '"/></div><div class="col-md-6 text-right"><button id="btnSubmit" type="submit" class="btn btn-primary"><i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i> Submit</button></div></div></form>'
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
function FillGrid3() {
    var html = '';
    if ($('#hdnSummaries').val() != "") {
        var arrSummaries = $('#hdnSummaries').val().split(String.fromCharCode(135));
        for (var i = 0; i < arrSummaries.length; i++) {
            var arrSummary = arrSummaries[i].split(String.fromCharCode(134));
            if (arrSummary[12] == "0") {
                html += '<tr id="MRow' + i + '" class="' + (i % 2 == 0 ? "footable-even" : "footable-odd") + '">';
                html += '<td>' + _.escape(arrSummary[3]) + '</td>';
                html += '<td>' + _.escape(arrSummary[5]) + '</td>';
                html += '<td>' + accounting.formatMoney(arrSummary[6]) + '</td>';
                html += '<td>' + _.escape(arrSummary[7]) + '</td>';
                html += '<td>' + _.escape(arrSummary[8]) + '</td>';
                html += '<td>' + _.escape(arrSummary[9]) + '</td>';
                html += '<td>' + _.escape(arrSummary[11]) + '</td>';
                html += '</tr>';
            }
        }
    }
    $('#bodySummaries').html(html);
}
function StateChange() {
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

    var params = { StateId: dtoEmployee.StateId };
    dtoState = CallService1('Client/StateService.svc', 'GetObject', params);
    if (dtoState.StateCode.toUpperCase() == 'GA') {
        $('#tblStateTax').removeClass('hide');
        $('#thFilingStatus').removeClass('hide');
        $('#thAllowanceStatus').removeClass('hide');
        $('#thAllowance').removeClass('hide');
        $('#thDependants').removeClass('hide');
    }
    else if (dtoState.StateCode.toUpperCase() == 'VA') {
        $('#tblStateTax').removeClass('hide');
        $('#thPersonalExemptions').removeClass('hide');
        $('#thDependentExemptions').removeClass('hide');
        $('#thAgeExemptions').removeClass('hide');
        $('#thBlindnessExemptions').removeClass('hide');
    }
    else if (dtoState.StateCode.toUpperCase() == 'MD') {
        $('#tblStateTax').removeClass('hide');
        $('#thFilingStatus').removeClass('hide');
        $('#thPersonalExemptions').removeClass('hide');
        $('#thIsDelawareWorkplace').removeClass('hide');
    }
    else if (dtoState.StateCode.toUpperCase() == 'CA') {
        $('#tblStateTax').removeClass('hide');
        $('#thFilingStatus').removeClass('hide');
        $('#thAdditionalAllowances').removeClass('hide');
    }
    else if (dtoState.StateCode.toUpperCase() == 'IL') {
        $('#tblStateTax').removeClass('hide');
        $('#thAdditionalAllowances').removeClass('hide');
        $('#thBasicAllowances').removeClass('hide');
        $('#thAdditionalAmount').removeClass('hide');
    }
    else if (dtoState.StateCode.toUpperCase() == 'SC') {
        $('#tblStateTax').removeClass('hide');
        $('#thPersonalExemptions').removeClass('hide');
    }
    else if (dtoState.StateCode.toUpperCase() == 'LA') {
        $('#tblStateTax').removeClass('hide');
        $('#thPersonalExemptions').removeClass('hide');
        $('#thDependentExemptions').removeClass('hide');
    }
    else if ((dtoState.StateCode.toUpperCase() == 'FL') || (dtoState.StateCode.toUpperCase() == 'TN') || (dtoState.StateCode.toUpperCase() == 'TX') || (dtoState.StateCode.toUpperCase() == 'NH') || (dtoState.StateCode.toUpperCase() == 'SD') || (dtoState.StateCode.toUpperCase() == 'AK') || (dtoState.StateCode.toUpperCase() == 'NV') || (dtoState.StateCode.toUpperCase() == 'WA') || (dtoState.StateCode.toUpperCase() == 'WY') || (dtoState.StateCode.toUpperCase() == 'DC')) {
        $('#tblStateTax').addClass('hide');
    }
    FillStateTaxes();
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
            html += '<td class="td-center"><a href="javascript:void(0)" onclick=\"RenameFile(\'' + arrFiles[i].Name + '\')\" class="link" title="Rename"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick=\"DeleteFolder(\'' + arrFiles[i].Name + '\')\" class="link" title="Delete"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></a></td>';
        }
        else {
            html += '<td class="td-center"><a href="javascript:void(0)" onclick=\"RenameFile(\'' + arrFiles[i].Name + '\')\" class="link" title="Rename"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick=\"DeleteFile(\'' + arrFiles[i].Name + '\')\" class="link" title="Delete"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></a></td>';
        }
        html += '</tr>';
    }
    $('#bodyFiles').html(html);
}
function FillGrid2() {
    var html = '';
    if ($('#hdnCompensations').val() != "") {
        var arrCompensations = $('#hdnCompensations').val().split(String.fromCharCode(135));
        for (var i = 0; i < arrCompensations.length; i++) {
            var arrCompensation = arrCompensations[i].split(String.fromCharCode(134));
            if (arrCompensation[7] == "0") {
                html += '<tr rowno="' + i + '" class="' + (i % 2 == 0 ? "footable-even" : "footable-odd") + '">';
                html += '<td>' + _.escape(arrCompensation[2]) + '</td>';
                html += '<td>' + _.escape(arrCompensation[3]) + '</td>';
                html += '<td>' + accounting.formatMoney(arrCompensation[4]) + '</td>';
                html += '<td>' + _.escape(arrCompensation[5]) + '</td>';
                html += '<td>' + _.escape(arrCompensation[6]) + '</td>';
                html += '</tr>';
            }
        }
    }
    $('#bodyCompensations').html(html);
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
function FillGrid() {
    var html = '';
    if ($('#hdnFederalTaxes').val() != "") {
        var arrFederalTaxes = $('#hdnFederalTaxes').val().split(String.fromCharCode(135));
        for (var i = 0; i < arrFederalTaxes.length; i++) {
            var arrFederalTax = arrFederalTaxes[i].split(String.fromCharCode(134));
            if (arrFederalTax[11] == "0") {
                html += '<tr rowno="' + i + '" class="' + (i % 2 == 0 ? "footable-even" : "footable-odd") + '">';
                html += '<td>' + _.escape(arrFederalTax[2]) + '</td>';
                html += '<td>' + _.escape(arrFederalTax[4]) + '</td>';
                html += '<td>' + _.escape(arrFederalTax[5]) + '</td>';
                html += '<td>' + _.escape(arrFederalTax[6]) + '</td>';
                html += '<td>' + _.escape(arrFederalTax[8]) + '</td>';
                html += '<td>' + _.escape(arrFederalTax[10]) + '</td>';
                html += '</tr>';
            }
        }
    }
    $('#bodyFederalTaxes').html(html);
}
function FillStateTaxes() {
    var params = { ClientId: $.localStorage.get('ClientId'), EmployeeId: parseInt($('#hdnEmployeeId').val(), 10), StateId: dtoEmployee.StateId };
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
    $('#hdnStateTaxes').val(_.escape(Taxes));
    FillGrid1();
}

function FillGrid1() {
    var html = '';
    if ($('#hdnStateTaxes').val() != "") {
        var arrStateTaxes = $('#hdnStateTaxes').val().split(String.fromCharCode(135));
        for (var i = 0; i < arrStateTaxes.length; i++) {
            var arrStateTax = arrStateTaxes[i].split(String.fromCharCode(134));
            if (arrStateTax[19] == "0") {               
                html += '<tr rowno="' + i + '" class="' + (i % 2 == 0 ? "footable-even" : "footable-odd") + '">';
                html += '<td>' + _.escape(arrStateTax[2]) + '</td>';
                html += '<td class="tdFilingStatus hide">' + _.escape(arrStateTax[4]) + '</td>';
                html += '<td class="tdAllowanceStatus hide">' + _.escape(arrStateTax[6]) + '</td>';
                html += '<td class="tdAllowance hide">' + _.escape(arrStateTax[8]) + '</td>';
                html += '<td class="tdDependants hide">' + _.escape(arrStateTax[9]) + '</td>';
                html += '<td class="tdPersonalExemptions hide">' + _.escape(arrStateTax[10]) + '</td>';
                html += '<td class="tdDependentExemptions hide">' + _.escape(arrStateTax[11]) + '</td>';
                html += '<td class="tdAgeExemptions hide">' + _.escape(arrStateTax[12]) + '</td>';
                html += '<td class="tdBlindExemptions hide">' + _.escape(arrStateTax[13]) + '</td>';
                html += '<td class="tdAdditionalAllowances hide">' + _.escape(arrStateTax[14]) + '</td>';
                html += '<td class="tdBasicAllowances hide">' + _.escape(arrStateTax[15]) + '</td>';
                html += '<td class="tdAdditionalAmount hide">' + _.escape(accounting.formatMoney(arrStateTax[16])) + '</td>';
                html += '<td class="tdIsDelawareWorkplace hide">' + _.escape(arrStateTax[18]) + '</td>';
                html += '</tr>';
            }
        }
    }
    $('#bodyStateTaxes').html(html);
    if (dtoState.StateCode.toUpperCase() == 'GA') {
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
function FillFederalTaxes() {
    var params = { ClientId: $.localStorage.get('ClientId'), EmployeeId: parseInt($('#hdnEmployeeId').val(), 10) };
    CallService('Client/EmployeeService.svc', 'GetEmployeeFederalTaxes', params, OnEmployeeGetFederalTaxesSuccess, true);
}

function OnEmployeeGetFederalTaxesSuccess(FederalTaxes) {
    var i = 0;
    var Taxes = '';
    $.each(FederalTaxes, function () {
        Taxes += i + String.fromCharCode(134);
        Taxes += _.escape(this.FederalTaxId) + String.fromCharCode(134);
        Taxes += FormatDateUTC(_.escape(this.StartDate)) + String.fromCharCode(134);
        Taxes += _.escape(this.FederalFilingStatusId) + String.fromCharCode(134);
        Taxes += _.escape(this.FederalFilingStatusName) + String.fromCharCode(134);
        Taxes += _.escape(this.Allowances) + String.fromCharCode(134);
        Taxes += _.escape(accounting.formatMoney(this.AdditionalWithholdings)) + String.fromCharCode(134);
        Taxes += _.escape(this.Allowance) + String.fromCharCode(134);
        Taxes += _.escape(this.Allowance == 'Y' ? 'Yes' : 'No') + String.fromCharCode(134);
        Taxes += _.escape(this.Exemption) + String.fromCharCode(134);
        Taxes += _.escape(this.ExemptionText) + String.fromCharCode(134);
        Taxes += "0";
        if (i < FederalTaxes.length - 1) {
            Taxes += String.fromCharCode(135);
        }
        i++;
    });
    $('#hdnFederalTaxes').val(Taxes);
    FillGrid();
}
function StepClick(index) {
    StepIndex = index;
}

function Edit() {
    window.location = "/Client/Main.html?StepIndex=" + StepIndex + "#Employee:" + $('#hdnEmployeeId').val();
}

function Close() {
    window.location = "/Client/Main.html#ViewAllEmployees";
}
window.scrollTo(0, 0); 
socket.on('GetEmployeeObject', function (EmployeeId) {
    if ($('#hdnEmployeeId').val() == EmployeeId) {
        DisplayData();
    }
})
