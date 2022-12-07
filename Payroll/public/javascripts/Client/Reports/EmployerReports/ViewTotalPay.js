CheckPageRequest();
$('#txtFromDate').val(FormatJSDate(new Date(), 'mm/dd/yy'));
$('#txtToDate').val(FormatJSDate(new Date(), 'mm/dd/yy'));
$('.input-date-picker').datepicker({
    format: 'mm/dd/yyyy',
    orientation: 'bottom',
    autoclose: true,
    todayHighlight: true
});

function FillGrid() {
    $("body").removeClass('loading').addClass("loading");
    var params = {
        ClientId: $.localStorage.get('ClientId'),
        FromDate: $('#txtFromDate').val(),
        ToDate: $('#txtToDate').val()
    };
    CallService('Client/PayCheckService.svc', 'GetTotalPay', params, OnPayCheckGetTotalPaySuccess, true);
}
function OnPayCheckGetTotalPaySuccess(arrTables) {
    if (arrTables != undefined) {
        var TotalSalary = 0;
        var TotalRegularPay = 0;
        var html = '<table style="width:100%;border:1px solid gray">';
        html += '<tr style="background-color:#4267b2;color:#fff">';
        html += '<th>Employee Name</th>';
        html += '<th style="text-align:right">Salary</th>';
        html += '<th style="text-align:right">Regular Pay</th>';
        html += '<th style="text-align:right">Total</th>';        
        html += '</tr>';
        html += '<tbody>';
        for (var i = 0; i < arrTables.length; i++) {
            html += '<tr>';
            html += '<td>' + arrTables[i].FullName  + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[i].Salary)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[i].RegularPay)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[i].Salary + arrTables[i].RegularPay)) + '</td>';            
            html += '</tr>';
            TotalSalary += arrTables[i].Salary;
            TotalRegularPay += arrTables[i].RegularPay;
        }
        html += '<tr style="background-color:#4267b2;color:#fff;font-weight:bold">';
        html += '<th>Total</th>';
        html += '<th style="text-align:right">' + _.escape(accounting.formatMoney(TotalSalary)) + '</th>';
        html += '<th style="text-align:right">' + _.escape(accounting.formatMoney(TotalRegularPay)) + '</th>';
        html += '<th style="text-align:right">' + _.escape(accounting.formatMoney(TotalSalary + TotalRegularPay)) + '</th>';       
        html += '</tr>';       
        html += '</tbody>';
        html += '</table>';
        $('#divReport').html(html);
    }
    $("body").removeClass("loading");
}
FillGrid();
function OpenTaxWageDetail(TaxId, StateId) {
    window.location = "/Client/Reports/EmployerReports/ViewTaxWageDetail/" + TaxId + "/" + StateId + "?FromDate=" + $('#txtFromDate').val() + "&ToDate=" + $('#txtToDate').val();
}
function ExportToExcel() {
    var params = {
        ClientId: $.localStorage.get('ClientId'),
        FromDate: $('#txtFromDate').val(),
        ToDate: $('#txtToDate').val()
    };
    var arrTables = CallService1('Client/PayCheckService.svc', 'GetTotalPay', params);
    if (arrTables != undefined) {
        var TotalSalary = 0;
        var TotalRegularPay = 0;
        var html = '<table style="border:1px solid gray">';
        html += '<tr>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Employee Name</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Salary</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Regular Pay</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Total</th>';
        html += '</tr>';
        html += '<tbody>';
        for (var i = 0; i < arrTables.length; i++) {
            html += '<tr>';
            html += '<td style="text-align:left">' + arrTables[i].FullName + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[i].Salary)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[i].RegularPay)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[i].Salary + arrTables[i].RegularPay)) + '</td>';
            html += '</tr>';
            TotalSalary += arrTables[i].Salary;
            TotalRegularPay += arrTables[i].RegularPay;
        }
        html += '<tr >';
        html += '<th style="background-color:#4267b2;color:#fff;font-weight:bold;text-align:left">Total</th>';
        html += '<th style="background-color:#4267b2;color:#fff;font-weight:bold;text-align:right">' + _.escape(accounting.formatMoney(TotalSalary)) + '</th>';
        html += '<th style="background-color:#4267b2;color:#fff;font-weight:bold;text-align:right">' + _.escape(accounting.formatMoney(TotalRegularPay)) + '</th>';
        html += '<th style="background-color:#4267b2;color:#fff;font-weight:bold;text-align:right">' + _.escape(accounting.formatMoney(TotalSalary + TotalRegularPay)) + '</th>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
    }
    var blob = new Blob([html], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
    });
    saveAs(blob, "TotalPay.xls");
}
function ExportToWord() {
    var params = {
        ClientId: $.localStorage.get('ClientId'),
        FromDate: $('#txtFromDate').val(),
        ToDate: $('#txtToDate').val()
    };
    var arrTables = CallService1('Client/PayCheckService.svc', 'GetTotalPay', params);
    if (arrTables != undefined) {
        var TotalSalary = 0;
        var TotalRegularPay = 0;
        var html = '<table style="width:100%;border:1px solid gray">';
        html += '<tr>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Employee Name</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Salary</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Regular Pay</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Total</th>';
        html += '</tr>';
        html += '<tbody>';
        for (var i = 0; i < arrTables.length; i++) {
            html += '<tr>';
            html += '<td style="text-align:left">' + arrTables[i].FullName + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[i].Salary)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[i].RegularPay)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[i].Salary + arrTables[i].RegularPay)) + '</td>';
            html += '</tr>';
            TotalSalary += arrTables[i].Salary;
            TotalRegularPay += arrTables[i].RegularPay;
        }
        html += '<tr >';
        html += '<th style="background-color:#4267b2;color:#fff;font-weight:bold;text-align:left">Total</th>';
        html += '<th style="background-color:#4267b2;color:#fff;font-weight:bold;text-align:right">' + _.escape(accounting.formatMoney(TotalSalary)) + '</th>';
        html += '<th style="background-color:#4267b2;color:#fff;font-weight:bold;text-align:right">' + _.escape(accounting.formatMoney(TotalRegularPay)) + '</th>';
        html += '<th style="background-color:#4267b2;color:#fff;font-weight:bold;text-align:right">' + _.escape(accounting.formatMoney(TotalSalary + TotalRegularPay)) + '</th>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
    }
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
    saveAs(blob, "TotalPay.doc");
}

function ExportToPDF() {
    var params = {
        ClientId: $.localStorage.get('ClientId'),
        FromDate: $('#txtFromDate').val(),
        ToDate: $('#txtToDate').val()
    };
    var FileName = CallService1('Client/PayCheckService.svc', 'GetTotalPayPDF', params);

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
            link.download = "TaxWageSummary.pdf";
            link.click();
        }
    };
    req.send();
}
window.scrollTo(0, 0);