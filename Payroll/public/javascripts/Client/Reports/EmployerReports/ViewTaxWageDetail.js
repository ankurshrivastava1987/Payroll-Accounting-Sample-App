CheckPageRequest();
$('#txtFromDate').val(FormatJSDate(new Date(GetQueryParameter('FromDate')), 'mm/dd/yy'));
$('#txtToDate').val(FormatJSDate(new Date(GetQueryParameter('ToDate')), 'mm/dd/yy'));
$('.input-date-picker').datepicker({
    format: 'mm/dd/yyyy',
    orientation: 'bottom',
    autoclose: true,
    todayHighlight: true
});
if (GetQueryParameter('TaxId') == 1)
{
    $('#spanReportName').html('Federal Income Tax');
}
else if (GetQueryParameter('TaxId') == 2) {
    $('#spanReportName').html('Social Security');
}
else if (GetQueryParameter('TaxId') == 3) {
    $('#spanReportName').html('Social Security Employer');
}
else if (GetQueryParameter('TaxId') == 4) {
    $('#spanReportName').html('Medicare');
}
else if (GetQueryParameter('TaxId') == 5) {
    $('#spanReportName').html('Medicare Employer');
}
else if (GetQueryParameter('TaxId') == 6) {
    $('#spanReportName').html('FUTA Employer');
}
if (GetQueryParameter('StateId') > 0)
{
    var params = {       
        StateId: GetQueryParameter('StateId')        
    };
    var dtoState = CallService1('Client/StateService.svc', 'GetObject', params);
    if (GetQueryParameter('TaxId') == 7) {
        $('#spanReportName').html( dtoState.StateCode + ' Income Tax');
    }
    else if (GetQueryParameter('TaxId') == 8) {
        $('#spanReportName').html(dtoState.StateCode + ' SUI Employer');
    }
    else if (GetQueryParameter('TaxId') == 9) {
        $('#spanReportName').html(dtoState.StateCode + ' Administrative Assessment');
    }
}
function FillGrid() {   
    var params = {
        ClientId: $.localStorage.get('ClientId'),
        TaxId: GetQueryParameter('TaxId'),
        StateId: GetQueryParameter('StateId'),
        FromDate: $('#txtFromDate').val(),
        ToDate: $('#txtToDate').val()
    };
    CallService('Client/PayCheckService.svc', 'GetTaxWageDetail', params, OnPayCheckGetTaxWageDetailSuccess, true);
}
function OnPayCheckGetTaxWageDetailSuccess(arrTables) {
    if (arrTables != undefined) {
        var TotalWages = 0;
        var ExcessWages = 0;
        var TaxableWages = 0;
        var TaxAmount = 0;
        var html = '<table style="width:100%;border:1px solid gray">';
        html += '<tr style="background-color:#4267b2;color:#fff">';
        html += '<th>Employee SSN</th>';
        html += '<th>Employee Name</th>';
        html += '<th>Employee Address</th>';
        html += '<th style="text-align:right">Total Wages</th>';
        html += '<th style="text-align:right">Excess Wages</th>';
        html += '<th style="text-align:right">Taxable Wages</th>';
        html += '<th style="text-align:right">Tax Amount</th>';
        html += '</tr>';
        html += '<tbody>';
        for (var i = 0; i < arrTables.length; i++) {
            html += '<tr>';
            html += '<td style="vertical-align:top">' + _.escape(arrTables[i].SocialSecurityNo) + '</td>';
            html += '<td style="vertical-align:top">' + _.escape(arrTables[i].FullName) + '</td>';
            html += '<td style="vertical-align:top">' + (arrTables[i].Address1.trim() == '' ? '' : _.escape(arrTables[i].Address1) + '<br>') + (arrTables[i].Address2.trim() == '' ? '' : _.escape(arrTables[i].Address2) + '<br>') + _.escape(arrTables[i].CityName) + ', ' + _.escape(arrTables[i].StateCode) + ' ' +  _.escape(arrTables[i].ZipCode) + '</td>';
            html += '<td style="vertical-align:top;text-align:right">' + _.escape(accounting.formatMoney(arrTables[i].TotalWages)) + '</td>';
            html += '<td style="vertical-align:top;text-align:right">' + _.escape(accounting.formatMoney(arrTables[i].ExcessWages)) + '</td>';
            html += '<td style="vertical-align:top;text-align:right">' + _.escape(accounting.formatMoney(arrTables[i].TaxableWages)) + '</td>';
            html += '<td style="vertical-align:top;text-align:right">' + _.escape(accounting.formatMoney(arrTables[i].TaxAmount)) + '</td>';
            html += '</tr>';
            TotalWages += arrTables[i].TotalWages;
            ExcessWages += arrTables[i].ExcessWages;
            TaxableWages += arrTables[i].TaxableWages;
            TaxAmount += arrTables[i].TaxAmount;
        }
        html += '<tr style="background-color:#4267b2;color:#fff">';
        html += '<th>Total</th>';
        html += '<th></th>';
        html += '<th></th>';
        html += '<th style="text-align:right">' + accounting.formatMoney(TotalWages) + '</th>';
        html += '<th style="text-align:right">' + accounting.formatMoney(ExcessWages) + '</th>';
        html += '<th style="text-align:right">' + accounting.formatMoney(TaxableWages) + '</th>';
        html += '<th style="text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
        html += '</tr>';  
        html += '</tbody>';
        html += '</table>';
        $('#divReport').html(html);
    }    
}
FillGrid();

function ExportToExcel() {
    var params = {
        ClientId: $.localStorage.get('ClientId'),
        FromDate: $('#txtFromDate').val(),
        ToDate: $('#txtToDate').val()
    };
    var arrTables = CallService1('Client/PayCheckService.svc', 'GetTaxWageSummary', params);
    if (arrTables != undefined) {
        var TaxAmount = 0
        var html = '<table style="border:1px solid gray">';
        html += '<tr>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Federal Taxes(941/944)</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Total Wages</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Excess Wages</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Taxable Wages</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Amount</th>';
        html += '</tr>';
        html += '<tbody>';
        for (var i = 0; i < arrTables[0].length; i++) {
            html += '<tr>';
            html += '<td style="text-align:left">' + _.escape(arrTables[0][i].TaxName) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[0][i].TotalWages)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[0][i].ExcessWages)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[0][i].TaxableWages)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[0][i].TaxAmount)) + '</td>';
            html += '</tr>';
            TaxAmount += arrTables[0][i].TaxAmount;
        }
        html += '<tr>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Total</th>';
        html += '<th style="background-color:#4267b2;color:#fff"></th>';
        html += '<th style="background-color:#4267b2;color:#fff"></th>';
        html += '<th style="background-color:#4267b2;color:#fff"></th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
        html += '</tr>';
        html += '<tr>';
        html += '<th>&nbsp;</th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '</tr>';
        TaxAmount = 0;
        html += '<tr>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Federal Unemployment(940)</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Total Wages</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Excess Wages</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Taxable Wages</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Amount</th>';
        html += '</tr>';
        for (var i = 0; i < arrTables[1].length; i++) {
            html += '<tr>';
            html += '<td style="text-align:left">' + _.escape(arrTables[1][i].TaxName) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[1][i].TotalWages)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[1][i].ExcessWages)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[1][i].TaxableWages)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[1][i].TaxAmount)) + '</td>';
            html += '</tr>';
            TaxAmount += arrTables[1][i].TaxAmount;
        }
        html += '<tr>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Total</th>';
        html += '<th style="background-color:#4267b2;color:#fff"></th>';
        html += '<th style="background-color:#4267b2;color:#fff"></th>';
        html += '<th style="background-color:#4267b2;color:#fff"></th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
        html += '</tr>';
        html += '<tr>';
        html += '<th>&nbsp;</th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '</tr>';
        //if (arrTables[2].length > 0) {
        TaxAmount = 0;
        html += '<tr>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Income Tax</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Total Wages</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Excess Wages</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Taxable Wages</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Amount</th>';
        html += '</tr>';
        for (var i = 0; i < arrTables[2].length; i++) {
            html += '<tr>';
            html += '<td style="text-align:left">' + _.escape(arrTables[2][i].TaxName) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[2][i].TotalWages)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[2][i].ExcessWages)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[2][i].TaxableWages)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[2][i].TaxAmount)) + '</td>';
            html += '</tr>';
            TaxAmount += arrTables[2][i].TaxAmount;
        }
        html += '<tr>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Total</th>';
        html += '<th style="background-color:#4267b2;color:#fff"></th>';
        html += '<th style="background-color:#4267b2;color:#fff"></th>';
        html += '<th style="background-color:#4267b2;color:#fff"></th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
        html += '</tr>';
        html += '<tr>';
        html += '<th>&nbsp;</th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '</tr>';
        //}
        if (arrTables[3].length > 0) {
            var StateCode = '';
            var i = 0;
            while (i < arrTables[3].length) {
                StateCode = arrTables[3][i].StateCode;
                TaxAmount = 0;
                TaxPaid = 0;
                html += '<tr>';
                html += '<th style="background-color:#4267b2;color:#fff;text-align:left">' + StateCode + ' Unemployment Tax</th>';
                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Total Wages</th>';
                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Excess Wages</th>';
                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Taxable Wages</th>';
                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Amount</th>';
                html += '</tr>';
                while (StateCode == arrTables[3][i].StateCode) {
                    html += '<tr>';
                    html += '<td style="text-align:left">' + _.escape(arrTables[3][i].TaxName) + '</td>';
                    html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[3][i].TotalWages)) + '</td>';
                    html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[3][i].ExcessWages)) + '</td>';
                    html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[3][i].TaxableWages)) + '</td>';
                    html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[3][i].TaxAmount)) + '</td>';
                    html += '</tr>';
                    TaxAmount += arrTables[3][i].TaxAmount;
                    i++;
                    if (i == arrTables[3].length) {
                        break;
                    }
                }
                html += '<tr>';
                html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Total</th>';
                html += '<th style="background-color:#4267b2;color:#fff"></th>';
                html += '<th style="background-color:#4267b2;color:#fff"></th>';
                html += '<th style="background-color:#4267b2;color:#fff"></th>';
                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
                html += '</tr>';
                if (i < arrTables[3].length) {
                    html += '<tr>';
                    html += '<th>&nbsp;</th>';
                    html += '<th style="text-align:right"></th>';
                    html += '<th style="text-align:right"></th>';
                    html += '<th style="text-align:right"></th>';
                    html += '<th style="text-align:right"></th>';
                    html += '</tr>';
                }
            }
        }
        html += '</tbody>';
        html += '</table>';
    }
    var blob = new Blob([html], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
    });
    saveAs(blob, "TaxWageSummary.xls");
}
function ExportToWord() {
    var params = {
        ClientId: $.localStorage.get('ClientId'),
        FromDate: $('#txtFromDate').val(),
        ToDate: $('#txtToDate').val()
    };
    var arrTables = CallService1('Client/PayCheckService.svc', 'GetTaxWageSummary', params);
    if (arrTables != undefined) {
        var TaxAmount = 0
        var html = '<table style="border:1px solid gray">';
        html += '<tr style="background-color:#4267b2;color:#fff">';
        html += '<th style="text-align:left">Federal Taxes(941/944)</th>';
        html += '<th style="text-align:right">Total Wages</th>';
        html += '<th style="text-align:right">Excess Wages</th>';
        html += '<th style="text-align:right">Taxable Wages</th>';
        html += '<th style="text-align:right">Tax Amount</th>';
        html += '</tr>';
        html += '<tbody>';
        for (var i = 0; i < arrTables[0].length; i++) {
            html += '<tr>';
            html += '<td style="text-align:left">' + _.escape(arrTables[0][i].TaxName) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[0][i].TotalWages)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[0][i].ExcessWages)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[0][i].TaxableWages)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[0][i].TaxAmount)) + '</td>';
            html += '</tr>';
            TaxAmount += arrTables[0][i].TaxAmount;
        }
        html += '<tr style="background-color:#4267b2;color:#fff">';
        html += '<th style="text-align:left">Total</th>';
        html += '<th></th>';
        html += '<th></th>';
        html += '<th></th>';
        html += '<th style="text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
        html += '</tr>';
        html += '<tr>';
        html += '<th>&nbsp;</th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '</tr>';
        TaxAmount = 0;
        html += '<tr style="background-color:#4267b2;color:#fff">';
        html += '<th style="text-align:left">Federal Unemployment(940)</th>';
        html += '<th style="text-align:right">Total Wages</th>';
        html += '<th style="text-align:right">Excess Wages</th>';
        html += '<th style="text-align:right">Taxable Wages</th>';
        html += '<th style="text-align:right">Tax Amount</th>';
        html += '</tr>';
        for (var i = 0; i < arrTables[1].length; i++) {
            html += '<tr>';
            html += '<td style="text-align:left">' + _.escape(arrTables[1][i].TaxName) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[1][i].TotalWages)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[1][i].ExcessWages)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[1][i].TaxableWages)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[1][i].TaxAmount)) + '</td>';
            html += '</tr>';
            TaxAmount += arrTables[1][i].TaxAmount;
        }
        html += '<tr style="background-color:#4267b2;color:#fff">';
        html += '<th style="text-align:left">Total</th>';
        html += '<th></th>';
        html += '<th></th>';
        html += '<th></th>';
        html += '<th style="text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
        html += '</tr>';
        html += '<tr>';
        html += '<th>&nbsp;</th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '</tr>';
        //if (arrTables[2].length > 0) {
        TaxAmount = 0;
        html += '<tr style="background-color:#4267b2;color:#fff">';
        html += '<th style="text-align:left">Income Tax</th>';
        html += '<th style="text-align:right">Total Wages</th>';
        html += '<th style="text-align:right">Excess Wages</th>';
        html += '<th style="text-align:right">Taxable Wages</th>';
        html += '<th style="text-align:right">Tax Amount</th>';
        html += '</tr>';
        for (var i = 0; i < arrTables[2].length; i++) {
            html += '<tr>';
            html += '<td style="text-align:left">' + _.escape(arrTables[2][i].TaxName) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[2][i].TotalWages)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[2][i].ExcessWages)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[2][i].TaxableWages)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[2][i].TaxAmount)) + '</td>';
            html += '</tr>';
            TaxAmount += arrTables[2][i].TaxAmount;
        }
        html += '<tr style="background-color:#4267b2;color:#fff">';
        html += '<th style="text-align:left">Total</th>';
        html += '<th></th>';
        html += '<th></th>';
        html += '<th></th>';
        html += '<th style="text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
        html += '</tr>';
        html += '<tr>';
        html += '<th>&nbsp;</th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '</tr>';
        //}
        if (arrTables[3].length > 0) {
            var StateCode = '';
            var i = 0;
            while (i < arrTables[3].length) {
                StateCode = arrTables[3][i].StateCode;
                TaxAmount = 0;
                TaxPaid = 0;
                html += '<tr style="background-color:#4267b2;color:#fff">';
                html += '<th style="text-align:left">' + StateCode + ' Unemployment Tax</th>';
                html += '<th style="text-align:right">Total Wages</th>';
                html += '<th style="text-align:right">Excess Wages</th>';
                html += '<th style="text-align:right">Taxable Wages</th>';
                html += '<th style="text-align:right">Tax Amount</th>';
                html += '</tr>';
                while (StateCode == arrTables[3][i].StateCode) {
                    html += '<tr>';
                    html += '<td style="text-align:left">' + _.escape(arrTables[3][i].TaxName) + '</td>';
                    html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[3][i].TotalWages)) + '</td>';
                    html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[3][i].ExcessWages)) + '</td>';
                    html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[3][i].TaxableWages)) + '</td>';
                    html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[3][i].TaxAmount)) + '</td>';
                    html += '</tr>';
                    TaxAmount += arrTables[3][i].TaxAmount;
                    i++;
                    if (i == arrTables[3].length) {
                        break;
                    }
                }
                html += '<tr style="background-color:#4267b2;color:#fff">';
                html += '<th style="text-align:left">Total</th>';
                html += '<th></th>';
                html += '<th></th>';
                html += '<th></th>';
                html += '<th style="text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
                html += '</tr>';
                if (i < arrTables[3].length) {
                    html += '<tr>';
                    html += '<th>&nbsp;</th>';
                    html += '<th style="text-align:right"></th>';
                    html += '<th style="text-align:right"></th>';
                    html += '<th style="text-align:right"></th>';
                    html += '<th style="text-align:right"></th>';
                    html += '</tr>';
                }
            }
        }
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
    saveAs(blob, "TaxWageSummary.doc");
}

function ExportToPDF() {
    var params = {
        ClientId: $.localStorage.get('ClientId'),
        FromDate: $('#txtFromDate').val(),
        ToDate: $('#txtToDate').val()
    };
    var FileName = CallService1('Client/PayCheckService.svc', 'GetTaxWageSummaryPDF', params);

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