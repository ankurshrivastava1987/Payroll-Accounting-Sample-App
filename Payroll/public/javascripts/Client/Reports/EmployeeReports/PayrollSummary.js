CheckPageRequest();
$('#txtFromDate').val(FormatJSDate(new Date(), 'mm/dd/yy'));
$('#txtToDate').val(FormatJSDate(new Date(), 'mm/dd/yy'));
$('.input-date-picker').datepicker({
    format: 'mm/dd/yyyy',
    orientation: 'bottom',
    autoclose: true,
    todayHighlight: true
});

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

$("li:nth-child(3)").hide(); //To hide export to pdf button

var onloadHtml = '';
onloadHtml += '<table style="width:100%; border: 1px solid #90949b;"><thead style="width:100%" valign="top">';
onloadHtml += '<tr style="background-color:#4267b2;color:#fff">';
onloadHtml += '<th style="text-align:left; padding-left:5px;">Date</th>';
onloadHtml += '<th style="text-align:left; padding-left:5px;">Name</th>';
onloadHtml += '<th style="text-align:right;">Net Amount</th>';
onloadHtml += '<th style="text-align:right;">Hours </th>';
onloadHtml += '<th style="text-align:right;">Tax Withheld </th>';
onloadHtml += '<th style="text-align:right;">Additions </th>';
onloadHtml += '<th style="text-align:right;">Deductions </th>';
onloadHtml += '<th style="text-align:right;">Total Pay  </th>';
onloadHtml += '<th style="text-align:right;">Employer Taxes </th>';
onloadHtml += '<th style="text-align:right;padding-right:5px;"> Total Cost </th>';
onloadHtml += '</tr></thead> <tbody id="bodyPayrollSummary">';
onloadHtml += '</tbody> </table>';
$('#tblPayCheckSummary').html(onloadHtml);

function FillGrid() {   
    $('#bodyPayrollSummary').html('');
    var params = {
        ClientID: $.localStorage.get('ClientId'),
        FromDate: $('#txtFromDate').val(),
        ToDate: $('#txtToDate').val(),
        LocationID: $('#cmbLocationName').val(),
        DepartmentID: $('#cmbDepartmentName').val()
    };
    CallService('Client/Reports/EmployeeReports/PayrollSummary.svc', 'PayrollSummary', params, OnPayrollSummaryGetAllSuccess, true);
}

function OnPayrollSummaryGetAllSuccess(arrPayrollSummary) {
    if (arrPayrollSummary != undefined) {

        var html = '';
        var NetPayCheck = 0;
        var RegularHours = 0;
        var Tax = 0;
        var Additions = 0;
        var Deductions = 0;
        var TotalPay = 0;
        var EmployerTax = 0;
        var TotalCost = 0;

        html += '<table style="width:100%; border: 1px solid #90949b;"><thead style="width:100%" valign="top">';
        html += '<tr style="background-color:#4267b2;color:#fff">';
        html += '<th style="text-align:left; padding-left:5px;">Date</th>';
        html += '<th style="text-align:left; padding-left:5px;">Name</th>';
        html += '<th style="text-align:right;">Net Amount</th>';
        html += '<th style="text-align:right;">Hours </th>';
        html += '<th style="text-align:right;">Tax Withheld </th>';
        html += '<th style="text-align:right;">Additions </th>';
        html += '<th style="text-align:right;">Deductions </th>';
        html += '<th style="text-align:right;">Total Pay  </th>';
        html += '<th style="text-align:right;">Employer Taxes </th>';
        html += '<th style="text-align:right;padding-right:5px;"> Total Cost </th>';
        html += '</tr></thead> <tbody id="bodyPayrollSummary">';
       
    
        for (var i = 0; i < arrPayrollSummary.length; i++) {
            html += '<tr id="tr' + _.escape(i) + '" class="' + (i % 2 == 0 ? "footable-even" : "footable-odd") + '">';
            html += '<td style="text-align:left; padding-left:5px;">' + _.escape(FormatDateUTC(arrPayrollSummary[i].PayDate)) + '</td>';
            html += '<td style="text-align:left; padding-left:5px;">' +  _.escape(arrPayrollSummary[i].EmployeeFullName) + '</td>';
            html += '<td style="text-align:right; padding-left:5px;">' +  _.escape(accounting.formatMoney(arrPayrollSummary[i].NetPayCheck == null ? 0 : arrPayrollSummary[i].NetPayCheck)) + '</td>';
            html += '<td style="text-align:right; padding-left:5px;">' +  _.escape(arrPayrollSummary[i].RegularHours.toFixed(2)) + '</td>';
            html += '<td style="text-align:right; padding-left:5px;">' + _.escape(accounting.formatMoney(arrPayrollSummary[i].Tax == null ? 0 : arrPayrollSummary[i].Tax)) + '</td>';
            html += '<td style="text-align:right; padding-left:5px;">' + _.escape(accounting.formatMoney(arrPayrollSummary[i].Additions == null ? 0 : arrPayrollSummary[i].Additions)) + '</td>';
            html += '<td style="text-align:right; padding-left:5px;">' +  _.escape(accounting.formatMoney(arrPayrollSummary[i].Deductions == null ? 0 : arrPayrollSummary[i].Deductions)) + '</td>';
            html += '<td style="text-align:right; padding-left:5px;">' + _.escape(accounting.formatMoney(arrPayrollSummary[i].TotalPay == null ? 0 : arrPayrollSummary[i].TotalPay)) + '</td>';
            html += '<td style="text-align:right; padding-left:5px;">' +  _.escape(accounting.formatMoney(arrPayrollSummary[i].EmployerTax == null ? 0 : arrPayrollSummary[i].EmployerTax)) + '</td>';
            html += '<td style="text-align:right; padding-right:5px;"><b>' +  _.escape(accounting.formatMoney(arrPayrollSummary[i].TotalCost == null ? 0 : arrPayrollSummary[i].TotalCost)) + '</b></td>';
            html += '</tr>';

            NetPayCheck = NetPayCheck + (arrPayrollSummary[i].NetPayCheck == null ? 0 : arrPayrollSummary[i].NetPayCheck);
            RegularHours = RegularHours + (arrPayrollSummary[i].RegularHours == null ? 0 : arrPayrollSummary[i].RegularHours);
            Tax = Tax + (arrPayrollSummary[i].Tax == null ? 0 : arrPayrollSummary[i].Tax);
            Additions = Additions + (arrPayrollSummary[i].Additions == null ? 0 : arrPayrollSummary[i].Additions);
            Deductions = Deductions + (arrPayrollSummary[i].Deductions == null ? 0 : arrPayrollSummary[i].Deductions);
            TotalPay = TotalPay + (arrPayrollSummary[i].TotalPay == null ? 0 : arrPayrollSummary[i].TotalPay);
            EmployerTax = EmployerTax + (arrPayrollSummary[i].EmployerTax == null ? 0 : arrPayrollSummary[i].EmployerTax);
            TotalCost = TotalCost + (arrPayrollSummary[i].TotalCost == null ? 0 : arrPayrollSummary[i].TotalCost);
        }

        html += '<tr id="trSummary">';
        html += '<td></td>';
        html += '<td style="padding-left:5px;"><b>Totals</></td>';
        html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(NetPayCheck)) + '</td>';
        html += '<td style="text-align:right">' + _.escape(RegularHours.toFixed(2)) + '</td>';
        html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(Tax)) + '</td>';
        html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(Additions)) + '</td>';
        html += '<td style="text-align:right">'+ _.escape(accounting.formatMoney(Deductions)) + '</td>';
        html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(TotalPay)) + '</td>';
        html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(EmployerTax)) + '</td>';
        html += '<td style="text-align:right;padding-right:5px;"><b>' + _.escape(accounting.formatMoney(TotalCost)) + '</b></td>';
        html += '</tr>';
        html += '</tbody> </table>';
        $('#tblPayCheckSummary').html(html);
    }   
}
FillGrid();
function ExportToExcel() {
    var blob = new Blob([$('#tblPayCheckSummary').html()], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
    });
    saveAs(blob, "Report.xls");
}

function ExportToWord() {
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
    word += $('#tblPayCheckSummary').html();
    word += "</div></body></html>";
    var blob = new Blob([word], {
        type: "application/msword"
    });
    saveAs(blob, "Report.doc");
}

function ExportToPDF() {
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