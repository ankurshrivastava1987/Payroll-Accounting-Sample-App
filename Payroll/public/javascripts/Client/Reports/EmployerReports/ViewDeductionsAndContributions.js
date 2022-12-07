CheckPageRequest();
$('#txtFromDate').val(FormatJSDate(new Date(), 'mm/dd/yy'));
$('#txtToDate').val(FormatJSDate(new Date(), 'mm/dd/yy'));
$('.input-date-picker').datepicker({
    format: 'mm/dd/yyyy',
    orientation: 'bottom',
    autoclose: true,
    todayHighlight: true
});
$("li:nth-child(3)").hide(); //To hide export to pdf button

var onloadHtml = '';
onloadHtml += '<table style="width:100%; border: 1px solid #90949b;"><thead style="width:100%" valign="top">';
onloadHtml += '<tr style="background-color:#4267b2;color:#fff">';
onloadHtml += '<th style="text-align:left; padding-left:5px;">Description</th>';
onloadHtml += '<th style="text-align:right; padding-left:5px;">Employee Deduction</th>';
onloadHtml += '<th style="text-align:right;">Company Contribution</th>';
//onloadHtml += '<th style="text-align:right;">Plan Name </th>';
//onloadHtml += '<th style="text-align:right;">Plan Type</th>';
//onloadHtml += '<th style="text-align:right;">Employee Count </th>';
//onloadHtml += '<th style="text-align:right;">Net Amount </th>';
//onloadHtml += '<th style="text-align:right;">Total Pay  </th>';
//onloadHtml += '<th style="text-align:right;">Employer Taxes </th>';
onloadHtml += '<th style="text-align:right;padding-right:5px;"> Total</th>';
onloadHtml += '</tr></thead> <tbody id="bodySummary">';
onloadHtml += '</tbody> </table>';
$('#divSummary').html(onloadHtml);

function FillGrid() {   
    $('#bodySummary').html('');
    var params = {
        FromDate: $('#txtFromDate').val(),
        ToDate: $('#txtToDate').val(),
        //LocationID: $('#cmbLocationName').val(),
        ClientID: $.localStorage.get('ClientId')
    };
    CallService('Client/Reports/EmployerReports/DeductionsAndContributions.svc', 'DeductionsAndContributions', params, OnDeductionsAndContributionsGetAllSuccess, true);
}

function OnDeductionsAndContributionsGetAllSuccess(arrSummary) {
    //alert(arrSummary.length);
    if (arrSummary != undefined) {

        var html = '';
        var EmployeeDeduction = 0;
        var CompanyContribution = 0;
       

        //html += '<table style="width:100%; border: 1px solid #90949b;"><thead style="width:100%" valign="top">';
        //html += '<tr style="background-color:#4267b2;color:#fff">';
        //html += '<th style="text-align:left; padding-left:5px;">Invoice Date</th>';
        //html += '<th style="text-align:left; padding-left:5px;">From Date</th>';
        //html += '<th style="text-align:right;">To Date Amount</th>';
        //html += '<th style="text-align:right;">Plan Name </th>';
        //html += '<th style="text-align:right;">Plan Type</th>';
        //html += '<th style="text-align:right;">Employee Count </th>';
        //html += '<th style="text-align:right;">Net Amount </th>';

        ////html += '<th style="text-align:right;">Total Pay  </th>';
        ////html += '<th style="text-align:right;">Employer Taxes </th>';
        ////html += '<th style="text-align:right;padding-right:5px;"> Total Cost </th>';
        //html += '</tr></thead> <tbody id="bodySummary">';


        for (var i = 0; i < arrSummary.length; i++) {
            html += '<tr id="tr' + _.escape(i) + '" class="' + (i % 2 == 0 ? "footable-even" : "footable-odd") + '">';
            html += '<td style="text-align:left; padding-left:5px;">' + _.escape(arrSummary[i].DeductionType) + '</td>';
            html += '<td style="text-align:right; padding-left:5px;">' + _.escape(accounting.formatMoney(arrSummary[i].EmployeeDeduction)) + '</td>';
            html += '<td style="text-align:right; padding-left:5px;">' + _.escape(accounting.formatMoney(arrSummary[i].CompanyContribution)) + '</td>';
            html += '<td style="text-align:right; padding-right:5px;">' + _.escape(accounting.formatMoney(arrSummary[i].EmployeeDeduction + arrSummary[i].CompanyContribution)) + '</td>';
            //html += '<td style="text-align:right; padding-left:5px;">' + _.escape(arrSummary[i].PlanType) + '</td>';
            //html += '<td style="text-align:right; padding-left:5px;">' + _.escape(arrSummary[i].EmployeeCount == null ? 0 : arrSummary[i].EmployeeCount) + '</td>';
            //html += '<td style="text-align:right; padding-left:5px;">' + _.escape(accounting.formatMoney(arrSummary[i].NetAmount == null ? 0 : arrSummary[i].NetAmount)) + '</td>';
            //html += '<td style="text-align:right; padding-left:5px;">' + _.escape(accounting.formatMoney(arrSummary[i].RegularAmount == null ? 0 : arrSummary[i].RegularAmount)) + '</td>';
            //html += '<td style="text-align:right; padding-left:5px;">' + _.escape(accounting.formatMoney(arrSummary[i].EmployerTax == null ? 0 : arrSummary[i].EmployerTax)) + '</td>';
            //html += '<td style="text-align:right; padding-right:5px;"><b>' + _.escape(accounting.formatMoney(arrSummary[i].TotalCost == null ? 0 : arrSummary[i].TotalCost)) + '</b></td>';
            html += '</tr>';

            EmployeeDeduction = EmployeeDeduction + (arrSummary[i].EmployeeDeduction == null ? 0 : arrSummary[i].EmployeeDeduction);
            CompanyContribution = CompanyContribution + (arrSummary[i].CompanyContribution == null ? 0 : arrSummary[i].CompanyContribution);

        }

        html += '<tr id="trSummary" style="border: 1px solid #90949b;">';
        //html += '<td></td>';
        html += '<td style="padding-left:5px;"><b>Totals</></td>';
        html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(EmployeeDeduction)) + '</td>';
        //html += '<td style="text-align:right">' + _.escape(RegularHours.toFixed(2)) + '</td>';
        html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(CompanyContribution)) + '</td>';
        //html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(EmployeeDeduction + CompanyContribution)) + '</td>';
        //html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(Deductions)) + '</td>';
        //html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(RegularAmount)) + '</td>';
        //html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(EmployerTax)) + '</td>';
        html += '<td style="text-align:right;padding-right:5px;"><b>' + _.escape(accounting.formatMoney(EmployeeDeduction + CompanyContribution)) + '</b></td>';
        html += '</tr>';
        //html += '</tbody> </table>';
        $('#bodySummary').html(html);
    }   
}
FillGrid();
function ExportToExcel() {
    var blob = new Blob([$('#divSummary').html()], {
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
    word += $('#divSummary').html();
    word += "</div></body></html>";
    var blob = new Blob([word], {
        type: "application/msword"
    });
    saveAs(blob, "Report.doc");
}

//function ExportToPDF() {
//    var params = {
//        ClientId: $.localStorage.get('ClientId'),
//        StartIndex: 0,
//        PageSize: 0,
//        SortField: 'InvoiceDate',
//        SortDirection: 'ASC',
//        Status: 'Active',
//        FilterText: ''
//        //DepartmentId: $('#cmbDepartmentName').val(),
//        //LocationId: $('#cmbLocationName').val(),
//        //EmployeeId: 0
//    };
//    var FileName = CallService1('Client/EmployeeService.svc', 'GetDirectoryPDF', params);

//    var req = new XMLHttpRequest();
//    req.open("GET", '/temp/' + FileName, true);
//    req.responseType = "blob";

//    req.onload = function (event) {
//        var blob = req.response;
//        console.log(blob.size);
//        var link = document.createElement('a');
//        var URL = window.URL || window.webkitURL;
//        var downloadUrl = URL.createObjectURL(blob);
//        if (typeof link.download === 'undefined') {
//            window.location = downloadUrl;
//        } else {

//            link.href = window.URL.createObjectURL(blob);
//            document.body.appendChild(link);
//            link.target = "_blank";
//            link.download = "Directory.pdf";
//            link.click();
//        }
//    };
//    req.send();
//}
window.scrollTo(0, 0);