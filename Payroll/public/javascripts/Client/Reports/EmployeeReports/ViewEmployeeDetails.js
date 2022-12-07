CheckPageRequest();
function FillLocations() {
    var params = { ClientId: $.localStorage.get('ClientId') };
    CallService('Client/LocationService.svc', 'GetLookup', params, OnLocationGetLookupSuccess, false);
}

function OnLocationGetLookupSuccess(Locations) {
    var html = '<option value="0">All Locations</option>';
    if (Locations != undefined) {
        for (var i = 0; i < Locations.length; i++) {
            html += '<option value="' + Locations[i]['LocationId'] + '">' + Locations[i]['LocationName'] + '</option>';
        }
    }
    $('#cmbLocationName').append(html);
    $('#cmbLocationName').val("0");
}
FillLocations();
function FillEmployees() {
    var params = { ClientId: $.localStorage.get('ClientId') };
    CallService('Client/EmployeeService.svc', 'GetLookup', params, OnEmployeeGetLookupSuccess, false);
}

function OnEmployeeGetLookupSuccess(Employees) {
    var html = '<option value="0">All Employees</option>';
    if (Employees != undefined) {
        for (var i = 0; i < Employees.length; i++) {
            html += '<option value="' + Employees[i]['EmployeeId'] + '">' + Employees[i]['FullName'] + '</option>';
        }
    }
    $('#cmbEmployeeName').append(html);
    $('#cmbEmployeeName').val("0");
}
FillEmployees();
function DisplayData3() {
    var params = { ParentClientId: parseInt($.localStorage.get('UserId'), 10), ClientId: parseInt($.localStorage.get('ClientId'), 10) };
    CallService('Client/ClientService.svc', 'GetObject', params, OnClientGetObjectSuccess3, true);
}
function OnClientGetObjectSuccess3(dtoClient) {
    if (dtoClient.ClientId != undefined) {
        $('#spanClientName').html(_.escape(dtoClient.FullName));
    }
}
DisplayData3();
function FillGrid() {    
    var params = {
        ClientId: $.localStorage.get('ClientId'),
        StartIndex: (parseInt($('#txtCurrentPageIndex').val(), 10) - 1) * parseInt($('#txtPageSize').val(), 10),
        PageSize: parseInt($('#txtPageSize').val(), 10),
        SortField: 'FullName',
        SortDirection: 'ASC',
        Status: $('#cmbStatus').val(),
        FilterText: '',
        DepartmentId: 0,
        LocationId: $('#cmbLocationName').val(),
        EmployeeId: $('#cmbEmployeeName').val()
    };
    CallService('Client/EmployeeService.svc', 'GetPage', params, OnEmployeeGetPageSuccess, true);
}
function OnEmployeeGetPageSuccess(dtoEmployeePage) {
    if (dtoEmployeePage != undefined) {
        $('#txtCurrentRecordCount').val(dtoEmployeePage.Employees.length);
        $("#txtTotalRecords").val(_.escape(dtoEmployeePage.TotalRecords));
        var html = '';
        for (var i = 0; i < dtoEmployeePage.Employees.length; i++) {
            html += '<tr>';
            html += '<td style="border-top:1px solid gray;vertical-align:top">'; 
                html += '<table>';
                html += '<tr>';
                html += '<td>' + (dtoEmployeePage.Employees[i].Status == 'Inactive' ? '*' : '') + _.escape(dtoEmployeePage.Employees[i].FullName) + '</td>';
                html += '</tr>';
                html += '<tr>';
                html += '<td>' + _.escape(dtoEmployeePage.Employees[i].Address1) + '</td>';
                html += '</tr>';
                html += '<tr>';
                html += '<td>' + _.escape(dtoEmployeePage.Employees[i].Address2) + '</td>';
                html += '</tr>';               
                html += '<tr>';
                html += '<td>' + _.escape(dtoEmployeePage.Employees[i].CityName) + '</td>';
                html += '</tr>';
                html += '<tr>';
                html += '<td>' + _.escape(dtoEmployeePage.Employees[i].StateCode) + ' ' + _.escape(dtoEmployeePage.Employees[i].ZipCode) + (dtoEmployeePage.Employees[i].ZipCodeExt != '' ? '-' + _.escape(dtoEmployeePage.Employees[i].ZipCodeExt): '') + '</td>';
                html += '</tr>';
                html += '<tr>';
                html += '<td>' + _.escape(dtoEmployeePage.Employees[i].EMailId) + '</td>';
                html += '</tr>';
                if (FormatDateUTC(dtoEmployeePage.Employees[i].HireDate) != '01/01/1900') {
                    html += '<tr>';
                    html += '<td>Hired: ' + _.escape(FormatDateUTC(dtoEmployeePage.Employees[i].HireDate)) + '</td>';
                    html += '</tr>';
                }
                if (FormatDateUTC(dtoEmployeePage.Employees[i].TerminationDate) != '01/01/1900') {
                    html += '<tr>';
                    html += '<td>Termination: ' + _.escape(FormatDateUTC(dtoEmployeePage.Employees[i].TerminationDate)) + '</td>';
                    html += '</tr>';
                }
                if (FormatDateUTC(dtoEmployeePage.Employees[i].DateOfBirth) != '01/01/1900') {
                    html += '<tr>';
                    html += '<td>Born:' + _.escape(FormatDateUTC(dtoEmployeePage.Employees[i].DateOfBirth)) + '</td>';
                    html += '</tr>';
                }
                html += '</table>';
            html += '</td>';
            html += '<td style="border-top:1px solid gray;vertical-align:top">';
            var Salary = '';   
            if (dtoEmployeePage.Employees[i].PayType === 'Hourly') {
                Salary = 'Regular Pay: ' + accounting.formatMoney(dtoEmployeePage.Employees[i].PayRate) + ' Per Hour';
            }
            else {
                Salary = 'Salary: ' + accounting.formatMoney(dtoEmployeePage.Employees[i].PayRate)
                if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'DA') {
                    Salary += ' Per Day';
                }
                else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'WW') {
                    Salary += ' Per Week';
                }
                else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'BW') {
                    Salary += ' Per Bi-Week';
                }
                else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'SM') {
                    Salary += ' Per Semi-Month';
                }
                else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'MM') {
                    Salary += ' Per Month';
                }
                else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'QQ') {
                    Salary += ' Per Quarter';
                }
                else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'SA') {
                    Salary += ' Per Semi-Annual';
                }
                else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'AA') {
                    Salary += ' Per Year';
                }
            }
                html += '<table>';
                html += '<tr>';
                html += '<td>' + _.escape(Salary) + '</td>';
                html += '</tr>';                
                html += '</table>';
            html += '</td>';           
            html += '<td style="border-top:1px solid gray;vertical-align:top">';
                html += '<table>';
                html += '<tr>';
                html += '<td>SSN: ' + _.escape(dtoEmployeePage.Employees[i].SocialSecurityNo) + '</td>';
                html += '</tr>';
                if (dtoEmployeePage.Employees[i].FederalFilingStatusName.trim() != '') {
                    html += '<tr>';
                    html += '<td>Federal: ' + _.escape(dtoEmployeePage.Employees[i].FederalFilingStatusName) + '</td>';
                    html += '</tr>';
                }
                if (dtoEmployeePage.Employees[i].StateCode1.trim() != '') {
                    html += '<tr>';
                    html += '<td>' + _.escape(dtoEmployeePage.Employees[i].StateCode1) + ': ' + _.escape(dtoEmployeePage.Employees[i].FilingStatusName) + '</td>';
                    html += '</tr>';
                }
                html += '</table>';
            html += '</td>';
            html += '</tr>';
        }
        $('#bodyEmployees').html(html);
        if (dtoEmployeePage.TotalRecords > 0) {
            $('#divPager').html(CreatePager());
            $('#cmbPageSize').val(parseInt($('#txtPageSize').val(), 10));
            $("#cmbPageSize").change(function () {
                $('#txtCurrentPageIndex').val(1);
                $('#txtPageSize').val($("#cmbPageSize").val());
                FillGrid();
            });
        }
        else {
            $('#divPager').html("No Records found.");
        }
    }   
}

function CreatePager() {
    var pager = '<table cellspacing="0" border="0" style="width:100%">';
    pager += '<tr style="white-space:nowrap;">';
    pager += '<th style="text-align:left">';
    var pageCount = Math.ceil(parseInt($('#txtTotalRecords').val(), 10) / parseInt($('#txtPageSize').val(), 10));
    //if (pageCount > 1) {
    //pager += '<ul class="pagination">';
    //pager += '<li>';
    pager += '<a class="btn btn-default" title="Go to first page" onclick="MoveFirst()"><i class="fa fa-fast-backward" aria-hidden="true"></i></a>';
    //pager += '</li>';
    //pager += '<li>';
    pager += '<a class="btn btn-default" title="Go to previous page" onclick="MovePrevious()"><i class="fa fa-step-backward" aria-hidden="true"></i></a>';
    //pager += '</li>';

    var j = 0;
    for (var i = parseInt($('#txtCurrentPageIndex').val(), 10); i <= pageCount; i++) {
        j += 1;
        if (i == parseInt($('#txtCurrentPageIndex').val(), 10)) {
            //pager += '<li>';
            pager += '<a class="btn btn-primary" title="Go to page ' + i + '" onclick="MovePageNo(' + i + ')">' + i + '</a>';
            //pager += '</li>';
        }
        else {
            //pager += '<li>';
            pager += '<a class="btn btn-default" title="Go to page ' + i + '" onclick="MovePageNo(' + i + ')">' + i + '</a>';
            // pager += '</li>';
        }
        if (j == 5) {
            break;
        }
    }

    //pager += '<li>';
    pager += '<a class="btn btn-default" title="Go to next page" onclick="MoveNext()"><i class="fa fa-step-forward" aria-hidden="true"></i></a>';
    //pager += '</li>';
    //pager += '<li>';
    pager += '<a class="btn btn-default" title="Go to last page" onclick="MoveLast()"><i class="fa fa-fast-forward" aria-hidden="true"></i></a>';
    // pager += '</li>';
    //}
    //pager += '</ul>';
    pager += '</th>';
    pager += '<th style="text-align:right;">';
    pager += '<div class="row"><div class="col-xs-6">Page Size</div><div class="col-xs-6"><select id="cmbPageSize" class="form-control" style="width:70px"><option value="10">10</option><option value="20">20</option><option value="30">30</option><option value="40">40</option><option value="50">50</option></select></div></div>';
    pager += '</th>';
    pager += '<th style="text-align:right;">';
    pager += 'Viewing records ' + parseInt(((parseInt($("#txtCurrentPageIndex").val(), 10) - 1) * parseInt($("#txtPageSize").val(), 10)) + 1, 10) + ' - ' + parseInt(parseInt(((parseInt($("#txtCurrentPageIndex").val(), 10) - 1) * parseInt($("#txtPageSize").val(), 10)) + 1, 10) + parseInt($('#txtCurrentRecordCount').val(), 10) - 1, 10) + ' of ' + $("#txtTotalRecords").val();
    pager += '</th>';
    pager += '</tr>';
    pager += '</table>';
    return pager;
}

function MoveFirst() {
    $('#txtCurrentPageIndex').val(1);
    FillGrid();
}

function MovePrevious() {
    if (parseInt($('#txtCurrentPageIndex').val(), 10) > 1) {
        $('#txtCurrentPageIndex').val(parseInt($('#txtCurrentPageIndex').val(), 10) - 1);
        FillGrid();
    }
}

function MoveNext() {
    if (parseInt($('#txtCurrentPageIndex').val(), 10) < Math.ceil(parseInt($('#txtTotalRecords').val(), 10) / parseInt($('#txtPageSize').val(), 10))) {
        $('#txtCurrentPageIndex').val(parseInt($('#txtCurrentPageIndex').val(), 10) + 1);
        FillGrid();
    }
}

function MoveLast() {
    $('#txtCurrentPageIndex').val(Math.ceil(parseInt($('#txtTotalRecords').val(), 10) / parseInt($('#txtPageSize').val(), 10)));
    FillGrid();
}

function MovePageNo(pageNo) {
    $('#txtCurrentPageIndex').val(pageNo);
    FillGrid();
}

FillGrid();
socket.on('GetEmployeePage', function () {
    FillGrid();
})
function ExportToExcel() {
    var params = {
        ClientId: $.localStorage.get('ClientId'),
        StartIndex: 0,
        PageSize: 0,
        SortField: 'FullName',
        SortDirection: 'ASC',
        Status: $('#cmbStatus').val(),
        FilterText: '',
        DepartmentId: 0,
        LocationId: $('#cmbLocationName').val(),
        EmployeeId: $('#cmbEmployeeName').val()
    };
    var dtoEmployeePage = CallService1('Client/EmployeeService.svc', 'GetPage', params);
    var params = {
        ParentClientId: parseInt($.localStorage.get('UserId'), 10),
        ClientId: parseInt($.localStorage.get('ClientId'), 10)
    };
    var dtoClient = CallService1('Client/ClientService.svc', 'GetObject', params);
    var html = '<table>';
    html += '<tr><td colspan="3"><strong>' + dtoClient.FullName + '</strong></td></tr>';
    html += '<tr><td colspan="3">Employee Details</td></tr>';
    html += '</table>';            
    html += '<table style="font-size:10px;font-family:"Courier New">';
    html += '<thead>';
    html += '<tr style="background-color:#4267b2;color:#fff">';
    html += '<th style="text-align:left">Personal Info</th>';
    html += '<th style="text-align:left">Pay Info</th>';
    html += '<th style="text-align:left">Tax Info</th>';   
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';    
    for (var i = 0; i < dtoEmployeePage.Employees.length; i++) {
        html += '<tr>';
        html += '<td style="border-top:1px solid gray;vertical-align:top">';
        html += '<table>';
        html += '<tr>';
        html += '<td style="text-align:left">' + (dtoEmployeePage.Employees[i].Status == 'Inactive'? '*': '') + _.escape(dtoEmployeePage.Employees[i].FullName) + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td style="text-align:left">' + _.escape(dtoEmployeePage.Employees[i].Address1) + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td style="text-align:left">' + _.escape(dtoEmployeePage.Employees[i].Address2) + '</td>';
        html += '</tr>';       
        html += '<tr>';
        html += '<td style="text-align:left">' + _.escape(dtoEmployeePage.Employees[i].CityName) + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td style="text-align:left">' + _.escape(dtoEmployeePage.Employees[i].StateCode) + ' ' + _.escape(dtoEmployeePage.Employees[i].ZipCode) + (dtoEmployeePage.Employees[i].ZipCodeExt != '' ? '-' + _.escape(dtoEmployeePage.Employees[i].ZipCodeExt) : '') + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td style="text-align:left">' + _.escape(dtoEmployeePage.Employees[i].EMailId) + '</td>';
        html += '</tr>';
        if (FormatDateUTC(dtoEmployeePage.Employees[i].HireDate) != '01/01/1900') {
            html += '<tr>';
            html += '<td style="text-align:left">Hired: ' + _.escape(FormatDateUTC(dtoEmployeePage.Employees[i].HireDate)) + '</td>';
            html += '</tr>';
        }
        if (FormatDateUTC(dtoEmployeePage.Employees[i].TerminationDate) != '01/01/1900') {
            html += '<tr>';
            html += '<td style="text-align:left">Termination: ' + _.escape(FormatDateUTC(dtoEmployeePage.Employees[i].TerminationDate)) + '</td>';
            html += '</tr>';
        }
        if (FormatDateUTC(dtoEmployeePage.Employees[i].DateOfBirth) != '01/01/1900') {
            html += '<tr>';
            html += '<td style="text-align:left">Born:' + _.escape(FormatDateUTC(dtoEmployeePage.Employees[i].DateOfBirth)) + '</td>';
            html += '</tr>';
        }
        html += '</table>';
        html += '</td>';
        html += '<td style="border-top:1px solid gray;vertical-align:top">';
        var Salary = '';
        if (dtoEmployeePage.Employees[i].PayType === 'Hourly') {
            Salary = 'Regular Pay: ' + accounting.formatMoney(dtoEmployeePage.Employees[i].PayRate) + ' Per Hour';
        }
        else {
            Salary = 'Salary: ' + accounting.formatMoney(dtoEmployeePage.Employees[i].PayRate)
            if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'DA') {
                Salary += ' Per Day';
            }
            else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'WW') {
                Salary += ' Per Week';
            }
            else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'BW') {
                Salary += ' Per Bi-Week';
            }
            else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'SM') {
                Salary += ' Per Semi-Month';
            }
            else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'MM') {
                Salary += ' Per Month';
            }
            else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'QQ') {
                Salary += ' Per Quarter';
            }
            else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'SA') {
                Salary += ' Per Semi-Annual';
            }
            else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'AA') {
                Salary += ' Per Year';
            }
        }
        html += '<table>';
        html += '<tr>';
        html += '<td style="text-align:left">' + _.escape(Salary) + '</td>';
        html += '</tr>';
        html += '</table>';
        html += '</td>';
        html += '<td style="border-top:1px solid gray;vertical-align:top">';
        html += '<table>';
        html += '<tr>';
        html += '<td style="text-align:left">SSN: ' + _.escape(dtoEmployeePage.Employees[i].SocialSecurityNo) + '</td>';
        html += '</tr>';
        if (dtoEmployeePage.Employees[i].FederalFilingStatusName.trim() != '') {
            html += '<tr>';
            html += '<td style="text-align:left">Federal: ' + _.escape(dtoEmployeePage.Employees[i].FederalFilingStatusName) + '</td>';
            html += '</tr>';
        }
        if (dtoEmployeePage.Employees[i].StateCode1.trim() != '') {
            html += '<tr>';
            html += '<td style="text-align:left">' + _.escape(dtoEmployeePage.Employees[i].StateCode1) + ': ' + _.escape(dtoEmployeePage.Employees[i].FilingStatusName) + '</td>';
            html += '</tr>';
        }
        html += '</table>';
        html += '</td>';
        html += '</tr>';
    }
    html += '</tbody>';
    html += '</table>';
    var blob = new Blob([html], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
    });
    saveAs(blob, "EmployeeDetails.xls");
}
function ExportToWord() {
    var params = {
        ClientId: $.localStorage.get('ClientId'),
        StartIndex: 0,
        PageSize: 0,
        SortField: 'FullName',
        SortDirection: 'ASC',
        Status: $('#cmbStatus').val(),
        FilterText: '',
        DepartmentId: 0,
        LocationId: $('#cmbLocationName').val(),
        EmployeeId: $('#cmbEmployeeName').val()
    };
    var dtoEmployeePage = CallService1('Client/EmployeeService.svc', 'GetPage', params);
    var params = {
        ParentClientId: parseInt($.localStorage.get('UserId'), 10),
        ClientId: parseInt($.localStorage.get('ClientId'), 10)
    };
    var dtoClient = CallService1('Client/ClientService.svc', 'GetObject', params);
    var html = '<table style="width:100%">';
    html += '<tr><td colspan="3"><strong>' + dtoClient.FullName + '</strong></td></tr>';
    html += '<tr><td colspan="3">Employee Details</td></tr>';
    html += '</table>';    
    html += '<table style="width:100%;font-size:10px;font-family:"Courier New">';
    html += '<thead>';
    html += '<tr style="background-color:#4267b2;color:#fff">';
    html += '<th style="text-align:left">Personal Info</th>';
    html += '<th style="text-align:left">Pay Info</th>';
    html += '<th style="text-align:left">Tax Info</th>';    
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    for (var i = 0; i < dtoEmployeePage.Employees.length; i++) {
        html += '<tr>';
        html += '<td style="border-top:1px solid gray;vertical-align:top">';
        html += '<table>';
        html += '<tr>';
        html += '<td style="text-align:left">' + (dtoEmployeePage.Employees[i].Status == 'Inactive' ? '*' : '') + _.escape(dtoEmployeePage.Employees[i].FullName) + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td style="text-align:left">' + _.escape(dtoEmployeePage.Employees[i].Address1) + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td style="text-align:left">' + _.escape(dtoEmployeePage.Employees[i].Address2) + '</td>';
        html += '</tr>';        
        html += '<tr>';
        html += '<td style="text-align:left">' + _.escape(dtoEmployeePage.Employees[i].CityName) + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td style="text-align:left">' + _.escape(dtoEmployeePage.Employees[i].StateCode) + ' ' + _.escape(dtoEmployeePage.Employees[i].ZipCode) + (dtoEmployeePage.Employees[i].ZipCodeExt != '' ? '-' + _.escape(dtoEmployeePage.Employees[i].ZipCodeExt) : '') + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td style="text-align:left">' + _.escape(dtoEmployeePage.Employees[i].EMailId) + '</td>';
        html += '</tr>';
        if (FormatDateUTC(dtoEmployeePage.Employees[i].HireDate) != '01/01/1900') {
            html += '<tr>';
            html += '<td style="text-align:left">Hired: ' + _.escape(FormatDateUTC(dtoEmployeePage.Employees[i].HireDate)) + '</td>';
            html += '</tr>';
        }
        if (FormatDateUTC(dtoEmployeePage.Employees[i].TerminationDate) != '01/01/1900') {
            html += '<tr>';
            html += '<td style="text-align:left">Termination: ' + _.escape(FormatDateUTC(dtoEmployeePage.Employees[i].TerminationDate)) + '</td>';
            html += '</tr>';
        }
        if (FormatDateUTC(dtoEmployeePage.Employees[i].DateOfBirth) != '01/01/1900') {
            html += '<tr>';
            html += '<td style="text-align:left">Born:' + _.escape(FormatDateUTC(dtoEmployeePage.Employees[i].DateOfBirth)) + '</td>';
            html += '</tr>';
        }
        html += '</table>';
        html += '</td>';
        html += '<td style="border-top:1px solid gray;vertical-align:top">';
        var Salary = '';
        if (dtoEmployeePage.Employees[i].PayType === 'Hourly') {
            Salary = 'Regular Pay: ' + accounting.formatMoney(dtoEmployeePage.Employees[i].PayRate) + ' Per Hour';
        }
        else {
            Salary = 'Salary: ' + accounting.formatMoney(dtoEmployeePage.Employees[i].PayRate)
            if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'DA') {
                Salary += ' Per Day';
            }
            else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'WW') {
                Salary += ' Per Week';
            }
            else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'BW') {
                Salary += ' Per Bi-Week';
            }
            else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'SM') {
                Salary += ' Per Semi-Month';
            }
            else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'MM') {
                Salary += ' Per Month';
            }
            else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'QQ') {
                Salary += ' Per Quarter';
            }
            else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'SA') {
                Salary += ' Per Semi-Annual';
            }
            else if (dtoEmployeePage.Employees[i].PayScheduleRecurrenceCode === 'AA') {
                Salary += ' Per Year';
            }
        }
        html += '<table>';
        html += '<tr>';
        html += '<td style="text-align:left">' + _.escape(Salary) + '</td>';
        html += '</tr>';
        html += '</table>';
        html += '</td>';
        html += '<td style="border-top:1px solid gray;vertical-align:top">';
        html += '<table>';
        html += '<tr>';
        html += '<td style="text-align:left">SSN: ' + _.escape(dtoEmployeePage.Employees[i].SocialSecurityNo) + '</td>';
        html += '</tr>';
        if (dtoEmployeePage.Employees[i].FederalFilingStatusName.trim() != '') {
            html += '<tr>';
            html += '<td style="text-align:left">Federal: ' + _.escape(dtoEmployeePage.Employees[i].FederalFilingStatusName) + '</td>';
            html += '</tr>';
        }
        if (dtoEmployeePage.Employees[i].StateCode1.trim() != '') {
            html += '<tr>';
            html += '<td style="text-align:left">' + _.escape(dtoEmployeePage.Employees[i].StateCode1) + ': ' + _.escape(dtoEmployeePage.Employees[i].FilingStatusName) + '</td>';
            html += '</tr>';
        }
        html += '</table>';
        html += '</td>';
        html += '</tr>';
    }
    html += '</tbody>';
    html += '</table>';
    var word = '<html ';
    word += "xmlns:o='urn:schemas-microsoft-com:office:office' ";
    word += "xmlns:w='urn:schemas-microsoft-com:office:word'";
    word += "xmlns='http://www.w3.org/TR/REC-html40'>";
    word += "<head><title>Time</title>";

    word += "<!--[if gte mso 9]>";
    word += "<xml>";
    word += "<w:WordDocument>";
    word += "<w:View>Print</w:View>";
    word += "<w:Zoom>100</w:Zoom>";
    word += "<w:DoNotOptimizeForBrowser/>";
    word += "</w:WordDocument>";
    word += "</xml>";
    word += "<![endif]-->";

    word += "<style>";
    word += "<!-- /* Style Definitions */";
    word += "@page Section1";
    word += "   {size:8.5in 11.0in; ";
    word += "   margin:.5in .5in .5in .5in ; ";
    word += "   mso-header-margin:.5in; ";
    word += "   mso-footer-margin:.5in; mso-paper-source:0;}";
    word += " div.Section1";
    word += "   {page:Section1;}";
    word += "-->";
    word += "</style></head>";

    word += "<body lang=EN-US style='tab-interval:.5in'>";
    word += "<div class=Section1>";
    word += html;
    word += "</div></body></html>";
    var blob = new Blob([word], {
        type: "application/msword"
    });
    saveAs(blob, "EmployeeDetails.doc");


}

function ExportToPDF() {
    var params = {
        ClientId: $.localStorage.get('ClientId'),
        StartIndex: 0,
        PageSize: 0,
        SortField: 'FullName',
        SortDirection: 'ASC',
        Status: $('#cmbStatus').val(),
        FilterText: '',
        DepartmentId: 0,
        LocationId: $('#cmbLocationName').val(),
        EmployeeId: $('#cmbEmployeeName').val()
    };
    var FileName = CallService1('Client/EmployeeService.svc', 'GetEmployeeDetailsPDF', params);
    
    var req = new XMLHttpRequest();
    req.open("GET", '/temp/' + FileName, true);
    req.responseType = "blob";

    req.onload = function (event) {
        var blob = req.response;
        console.log(blob.size);
        var link = document.createElement('a');
        var URL = window.URL || window.webkitURL;
        var downloadUrl = URL.createObjectURL(blob);
        if (typeof link.download === 'undefined') {
            window.location = downloadUrl;
        } else {

            link.href = window.URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.target = "_blank";
            link.download = "EmployeeDetails.pdf";
            link.click();
        }
    };

    req.send();

}
$(document).ready(function () { 
    $("#cmbLocationName").change(function () {
        $('#txtCurrentPageIndex').val(1);
        FillGrid();
    });   
    $("#cmbEmployeeName").change(function () {
        $('#txtCurrentPageIndex').val(1);
        FillGrid();
    });
    $("#cmbStatus").change(function () {
        $('#txtCurrentPageIndex').val(1);
        FillGrid();
    });
});
window.scrollTo(0, 0);