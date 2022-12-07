CheckPageRequest();
function FillDepartments() {
    var params = { ClientId: $.localStorage.get('ClientId') };
    CallService('Client/DepartmentService.svc', 'GetLookup', params, OnDepartmentGetLookupSuccess, false);
}

function OnDepartmentGetLookupSuccess(Departments) {
    var html = '<option value="0">All Departments</option>';
    if (Departments != undefined) {
        for (var i = 0; i < Departments.length; i++) {
            html += '<option value="' + Departments[i]['DepartmentId'] + '">' + Departments[i]['DepartmentName'] + '</option>';
        }
    }
    $('#cmbDepartmentName').append(html);
    $('#cmbDepartmentName').val("0");
}
FillDepartments();
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
        Status: 'Active',
        FilterText: '',
        DepartmentId: $('#cmbDepartmentName').val(),
        LocationId: $('#cmbLocationName').val(),
        EmployeeId: 0
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
            html += '<td>' + _.escape(dtoEmployeePage.Employees[i].FullName) + '</td>';            
            html += '<td>' + _.escape(dtoEmployeePage.Employees[i].EMailId) + '</td>';
            html += '<td>' + _.escape(dtoEmployeePage.Employees[i].WorkPhoneNo) + (dtoEmployeePage.Employees[i].WorkPhoneNoExt.trim() == '' ? '' : '-' + _.escape(dtoEmployeePage.Employees[i].WorkPhoneNoExt.trim())) + '</td>';            
            html += '<td>' + _.escape(dtoEmployeePage.Employees[i].CellPhoneNo) + '</td>';     
            html += '<td>' + _.escape(dtoEmployeePage.Employees[i].FaxNo) + '</td>';       
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
$("#cmbDepartmentName").change(function () {
    $('#txtCurrentPageIndex').val(1);
    FillGrid();
});
$("#cmbLocationName").change(function () {
    $('#txtCurrentPageIndex').val(1);
    FillGrid();
});
socket.on('GetEmployeePage', function () {
    FillGrid();
})
function ExportToExcel()
{
    var params = {
        ClientId: $.localStorage.get('ClientId'),
        StartIndex: 0,
        PageSize: 0,
        SortField: 'FullName',
        SortDirection: 'ASC',
        Status: 'Active',
        FilterText: '',
        DepartmentId: $('#cmbDepartmentName').val(),
        LocationId: $('#cmbLocationName').val(),
        EmployeeId: 0
    };
    var dtoEmployeePage = CallService1('Client/EmployeeService.svc', 'GetPage', params);
     
    var params = {
        ParentClientId: parseInt($.localStorage.get('UserId'), 10),
        ClientId: parseInt($.localStorage.get('ClientId'), 10)
    };
    var dtoClient = CallService1('Client/ClientService.svc', 'GetObject', params);
    var html = '<table>';
    html += '<tr><td colspan="5"><strong>' + dtoClient.FullName + '</strong></td></tr>';
    html += '<tr><td colspan="5">Directory</td></tr>';
    html += '</table>';            
    html += '<table style="font-size:10px;font-family:"Courier New">';
    html += '<thead>';
    html += '<tr>';
    html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Name</th>';
    html += '<th style="background-color:#4267b2;color:#fff;text-align:left">E-Mail</th>';
    html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Work Phone #</th>';
    html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Cell Phone #</th>';
    html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Fax #</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    for (var i = 0; i < dtoEmployeePage.Employees.length; i++) {
        html += '<tr>';
        html += '<td style="text-align:left">' + _.escape(dtoEmployeePage.Employees[i].FullName) + '</td>';
        html += '<td style="text-align:left">' + _.escape(dtoEmployeePage.Employees[i].EMailId) + '</td>';
        html += '<td style="text-align:left">' + _.escape(dtoEmployeePage.Employees[i].WorkPhoneNo) + (dtoEmployeePage.Employees[i].WorkPhoneNoExt.trim() == '' ? '' : '-' + _.escape(dtoEmployeePage.Employees[i].WorkPhoneNoExt.trim())) + '</td>';
        html += '<td style="text-align:left">' + _.escape(dtoEmployeePage.Employees[i].CellPhoneNo) + '</td>';
        html += '<td style="text-align:left">' + _.escape(dtoEmployeePage.Employees[i].FaxNo) + '</td>';
        html += '</tr>';
    }
    html += '</tbody>';
    html += '</table>';
    var blob = new Blob([html], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
    });
    saveAs(blob, "Directory.xls");
}
function ExportToWord()
{
    var params = {
        ClientId: $.localStorage.get('ClientId'),
        StartIndex: 0,
        PageSize: 0,
        SortField: 'FullName',
        SortDirection: 'ASC',
        Status: 'Active',
        FilterText: '',
        DepartmentId: $('#cmbDepartmentName').val(),
        LocationId: $('#cmbLocationName').val(),
        EmployeeId: 0
    };
    var dtoEmployeePage = CallService1('Client/EmployeeService.svc', 'GetPage', params);

    var params = {
        ParentClientId: parseInt($.localStorage.get('UserId'), 10),
        ClientId: parseInt($.localStorage.get('ClientId'), 10)
    };
    var dtoClient = CallService1('Client/ClientService.svc', 'GetObject', params);

    var html = '<table>';
    html += '<tr><td colspan="5"><strong>' + dtoClient.FullName + '</strong></td></tr>';
    html += '<tr><td colspan="5">Directory</td></tr>';
    html += '</table>';   
    html += '<table style="font-size:10px;font-family:"Courier New">';
    html += '<thead>';
    html += '<tr>';
    html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Name</th>';
    html += '<th style="background-color:#4267b2;color:#fff;text-align:left">E-Mail</th>';
    html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Work Phone #</th>';
    html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Cell Phone #</th>';
    html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Fax #</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    for (var i = 0; i < dtoEmployeePage.Employees.length; i++) {
        html += '<tr>';
        html += '<td style="text-align:left">' + _.escape(dtoEmployeePage.Employees[i].FullName) + '</td>';
        html += '<td style="text-align:left">' + _.escape(dtoEmployeePage.Employees[i].EMailId) + '</td>';
        html += '<td style="text-align:left">' + _.escape(dtoEmployeePage.Employees[i].WorkPhoneNo) + (dtoEmployeePage.Employees[i].WorkPhoneNoExt.trim() == '' ? '' : '-' + _.escape(dtoEmployeePage.Employees[i].WorkPhoneNoExt.trim())) + '</td>';
        html += '<td style="text-align:left">' + _.escape(dtoEmployeePage.Employees[i].CellPhoneNo) + '</td>';
        html += '<td style="text-align:left">' + _.escape(dtoEmployeePage.Employees[i].FaxNo) + '</td>';
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
    saveAs(blob, "Directory.doc");            
}

function ExportToPDF()
{
    var params = {
        ClientId: $.localStorage.get('ClientId'),
        StartIndex: 0,
        PageSize: 0,
        SortField: 'FullName',
        SortDirection: 'ASC',
        Status: 'Active',
        FilterText: '',
        DepartmentId: $('#cmbDepartmentName').val(),
        LocationId: $('#cmbLocationName').val(),
        EmployeeId: 0
    };
    var FileName = CallService1('Client/EmployeeService.svc', 'GetDirectoryPDF', params);    

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
            link.download = "Directory.pdf";
            link.click();
        }      
    };
    req.send();    
}
window.scrollTo(0, 0);