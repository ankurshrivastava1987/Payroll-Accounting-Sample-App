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
    
    var params = {
        ClientId: $.localStorage.get('ClientId'),
        FromDate: $('#txtFromDate').val(),
        ToDate: $('#txtToDate').val()
    };
    CallService('Client/PayCheckService.svc', 'GetTaxLiability', params, OnPayCheckGetTaxLiabilitySuccess, true);
}
function OnPayCheckGetTaxLiabilitySuccess(arrTables) {
    if (arrTables != undefined) {   
        var TaxAmount = 0;
        var TaxPaid = 0;  
        var params = {            
            ClientId: parseInt($.localStorage.get('ClientId'), 10)
        };
        var dtoClient = CallService1('Client/ClientService.svc', 'GetObject', params);
        var html = '<table style="width:100%;" >';
        html += '<tr><td colspan="4"><strong>' + dtoClient.FullName + '</strong></td></tr>';
        html += '<tr><td colspan="4">Tax Liability</td></tr>';
        html += '</table>';                 
        html += '<table style="width:100%;border:1px solid gray" class="tableReport">';
        html += '<tr style="background-color:#4267b2;color:#fff">';
        html += '<th>Federal Taxes(941/944)</th>';
        html += '<th style="text-align:right">Tax Amount</th>';
        html += '<th style="text-align:right">Tax Paid</th>';
        html += '<th style="text-align:right">Tax Owed</th>';
        html += '</tr>';
        html += '<tbody>';
        for (var i = 0; i < arrTables[0].length; i++) {
            html += '<tr>';                       
            html += '<td>' + _.escape(arrTables[0][i].TaxName) + '</td>';            
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[0][i].TaxAmount)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[0][i].TaxPaid)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[0][i].TaxOwed)) + '</td>';      
            html += '</tr>';
            TaxAmount += arrTables[0][i].TaxAmount;
            TaxPaid += arrTables[0][i].TaxPaid;
        }
        html += '<tr style="background-color:#4267b2;color:#fff">';
        html += '<th>Total</th>';
        html += '<th style="text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
        html += '<th style="text-align:right">' + accounting.formatMoney(TaxPaid) + '</th>';
        html += '<th style="text-align:right">' + accounting.formatMoney(TaxAmount - TaxPaid) + '</th>';
        html += '</tr>';  
        html += '<tr>';
        html += '<th>&nbsp;</th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '</tr>';  
        TaxAmount = 0;
        TaxPaid = 0;  
        html += '<tr style="background-color:#4267b2;color:#fff">';
        html += '<th>Federal Unemployment(940)</th>';
        html += '<th style="text-align:right">Tax Amount</th>';
        html += '<th style="text-align:right">Tax Paid</th>';
        html += '<th style="text-align:right">Tax Owed</th>';
        html += '</tr>';        
        for (var i = 0; i < arrTables[1].length; i++) {
            html += '<tr>';
            html += '<td>' + _.escape(arrTables[1][i].TaxName) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[1][i].TaxAmount)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[1][i].TaxPaid)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[1][i].TaxOwed)) + '</td>';
            html += '</tr>';
            TaxAmount += arrTables[1][i].TaxAmount;
            TaxPaid += arrTables[1][i].TaxPaid;
        }
        html += '<tr style="background-color:#4267b2;color:#fff">';
        html += '<th>Total</th>';
        html += '<th style="text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
        html += '<th style="text-align:right">' + accounting.formatMoney(TaxPaid) + '</th>';
        html += '<th style="text-align:right">' + accounting.formatMoney(TaxAmount - TaxPaid) + '</th>';
        html += '</tr>';
        html += '<tr>';
        html += '<th>&nbsp;</th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '</tr>';  
       
        TaxAmount = 0;
        TaxPaid = 0;
        html += '<tr style="background-color:#4267b2;color:#fff">';
        html += '<th>Income Tax</th>';
        html += '<th style="text-align:right">Tax Amount</th>';
        html += '<th style="text-align:right">Tax Paid</th>';
        html += '<th style="text-align:right">Tax Owed</th>';
        html += '</tr>';
        for (var i = 0; i < arrTables[2].length; i++) {
            html += '<tr>';
            html += '<td>' + _.escape(arrTables[2][i].TaxName) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[2][i].TaxAmount)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[2][i].TaxPaid)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[2][i].TaxOwed)) + '</td>';
            html += '</tr>';
            TaxAmount += arrTables[2][i].TaxAmount;
            TaxPaid += arrTables[2][i].TaxPaid;
        }
        html += '<tr style="background-color:#4267b2;color:#fff">';
        html += '<th>Total</th>';
        html += '<th style="text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
        html += '<th style="text-align:right">' + accounting.formatMoney(TaxPaid) + '</th>';
        html += '<th style="text-align:right">' + accounting.formatMoney(TaxAmount - TaxPaid) + '</th>';
        html += '</tr>';
        html += '<tr>';
        html += '<th>&nbsp;</th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '</tr>';
        
        if (arrTables[3].length > 0) {
            var StateCode = '';
            var i = 0;
            while (i < arrTables[3].length) {
                StateCode = arrTables[3][i].StateCode;
                TaxAmount = 0;
                TaxPaid = 0; 
                html += '<tr style="background-color:#4267b2;color:#fff">';
                html += '<th>' + StateCode + ' Unemployment Tax</th>';
                html += '<th style="text-align:right">Tax Amount</th>';
                html += '<th style="text-align:right">Tax Paid</th>';
                html += '<th style="text-align:right">Tax Owed</th>';
                html += '</tr>';                
                while (StateCode == arrTables[3][i].StateCode) {
                    html += '<tr>';
                    html += '<td>' + _.escape(arrTables[3][i].TaxName) + '</td>';
                    html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[3][i].TaxAmount)) + '</td>';
                    html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[3][i].TaxPaid)) + '</td>';
                    html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[3][i].TaxOwed)) + '</td>';
                    html += '</tr>';
                    TaxAmount += arrTables[3][i].TaxAmount;
                    TaxPaid += arrTables[3][i].TaxPaid;
                    i++;
                    if (i == arrTables[3].length)
                    {
                        break;
                    }
                }
                html += '<tr style="background-color:#4267b2;color:#fff">';
                html += '<th>Total</th>';
                html += '<th style="text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
                html += '<th style="text-align:right">' + accounting.formatMoney(TaxPaid) + '</th>';
                html += '<th style="text-align:right">' + accounting.formatMoney(TaxAmount - TaxPaid) + '</th>';
                html += '</tr>';
                if (i < arrTables[3].length) {
                    html += '<tr>';
                    html += '<th>&nbsp;</th>';
                    html += '<th style="text-align:right"></th>';
                    html += '<th style="text-align:right"></th>';
                    html += '<th style="text-align:right"></th>';
                    html += '</tr>';
                }
            }
        }
        html += '</tbody>';
        html += '</table>';
        $('#divReport').html(html);       
    }    
}
FillGrid();

function ExportToExcel()
{
    var params = {
        ClientId: parseInt($.localStorage.get('ClientId'), 10),
        FromDate: $('#txtFromDate').val(),
        ToDate: $('#txtToDate').val()
    };    
    var arrTables = CallService1('Client/PayCheckService.svc', 'GetTaxLiability', params);    
    if (arrTables != undefined) {
        var TaxAmount = 0;
        var TaxPaid = 0;
        var params = {            
            ClientId: parseInt($.localStorage.get('ClientId'), 10)
        };
        var dtoClient = CallService1('Client/ClientService.svc', 'GetObject', params);
        var html = '<table>';
        html += '<tr><td colspan="4"><strong>' + dtoClient.FullName + '</strong></td></tr>';
        html += '<tr><td colspan="4">Tax Liability</td></tr>';
        html += '</table>'; 
        html += '<table style="border:1px solid #4267b2">';
        html += '<tr>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Federal Taxes(941/944)</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Amount</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Paid</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Owed</th>';
        html += '</tr>';
        html += '<tbody>';
        for (var i = 0; i < arrTables[0].length; i++) {
            html += '<tr>';
            html += '<td style="text-align:left">' + _.escape(arrTables[0][i].TaxName) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[0][i].TaxAmount)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[0][i].TaxPaid)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[0][i].TaxOwed)) + '</td>';
            html += '</tr>';
            TaxAmount += arrTables[0][i].TaxAmount;
            TaxPaid += arrTables[0][i].TaxPaid;
        }
        html += '<tr>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Total</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxPaid) + '</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount - TaxPaid) + '</th>';
        html += '</tr>';
        html += '<tr>';
        html += '<th>&nbsp;</th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '</tr>';
        TaxAmount = 0;
        TaxPaid = 0;
        html += '<tr>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Federal Unemployment(940)</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Amount</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Paid</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Owed</th>';
        html += '</tr>';
        for (var i = 0; i < arrTables[1].length; i++) {
            html += '<tr>';
            html += '<td style="text-align:left">' + _.escape(arrTables[1][i].TaxName) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[1][i].TaxAmount)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[1][i].TaxPaid)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[1][i].TaxOwed)) + '</td>';
            html += '</tr>';
            TaxAmount += arrTables[1][i].TaxAmount;
            TaxPaid += arrTables[1][i].TaxPaid;
        }
        html += '<tr>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Total</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxPaid) + '</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount - TaxPaid) + '</th>';
        html += '</tr>';
        html += '<tr>';
        html += '<th>&nbsp;</th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '</tr>';
        TaxAmount = 0;
        TaxPaid = 0;
        html += '<tr>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Income Tax</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Amount</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Paid</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Owed</th>';
        html += '</tr>';
        for (var i = 0; i < arrTables[2].length; i++) {
            html += '<tr>';
            html += '<td style="text-align:left">' + _.escape(arrTables[2][i].TaxName) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[2][i].TaxAmount)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[2][i].TaxPaid)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[2][i].TaxOwed)) + '</td>';
            html += '</tr>';
            TaxAmount += arrTables[2][i].TaxAmount;
            TaxPaid += arrTables[2][i].TaxPaid;
        }
        html += '<tr>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Total</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxPaid) + '</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount - TaxPaid) + '</th>';
        html += '</tr>';
        html += '<tr>';
        html += '<th>&nbsp;</th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '</tr>';
        if (arrTables[3].length > 0) {
            var StateCode = '';
            var i = 0;
            while (i < arrTables[3].length) {
                StateCode = arrTables[3][i].StateCode;
                TaxAmount = 0;
                TaxPaid = 0;
                html += '<tr>';
                html += '<th style="background-color:#4267b2;color:#fff;text-align:left">' + StateCode + ' Unemployment Tax</th>';
                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Amount</th>';
                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Paid</th>';
                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Owed</th>';
                html += '</tr>';
                while (StateCode == arrTables[3][i].StateCode) {
                    html += '<tr>';
                    html += '<td style="text-align:left">' + _.escape(arrTables[3][i].TaxName) + '</td>';
                    html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[3][i].TaxAmount)) + '</td>';
                    html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[3][i].TaxPaid)) + '</td>';
                    html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[3][i].TaxOwed)) + '</td>';
                    html += '</tr>';
                    TaxAmount += arrTables[3][i].TaxAmount;
                    TaxPaid += arrTables[3][i].TaxPaid;
                    i++;
                    if (i == arrTables[3].length) {
                        break;
                    }
                }
                html += '<tr>';
                html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Total</th>';
                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxPaid) + '</th>';
                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount - TaxPaid) + '</th>';
                html += '</tr>';
                if (i < arrTables[3].length) {
                    html += '<tr>';
                    html += '<th>&nbsp;</th>';
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
    saveAs(blob, "TaxLiability.xls");
}
function ExportToWord()
{
    var params = {
        ClientId: parseInt($.localStorage.get('ClientId'), 10),
        FromDate: $('#txtFromDate').val(),
        ToDate: $('#txtToDate').val()
    };
    var arrTables = CallService1('Client/PayCheckService.svc', 'GetTaxLiability', params);
    if (arrTables != undefined) {
        var TaxAmount = 0;
        var TaxPaid = 0;
        var params = {
            ParentClientId: parseInt($.localStorage.get('UserId'), 10),
            ClientId: parseInt($.localStorage.get('ClientId'), 10)
        };
        var dtoClient = CallService1('Client/ClientService.svc', 'GetObject', params);
        var html = '<table>';
        html += '<tr><td colspan="5"><strong>' + dtoClient.FullName + '</strong></td></tr>';
        html += '<tr><td colspan="5">Tax Liability</td></tr>';
        html += '</table>'; 
        html += '<table style="border:1px solid #4267b2">';
        html += '<tr>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Federal Taxes(941/944)</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Amount</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Paid</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Owed</th>';
        html += '</tr>';
        html += '<tbody>';
        for (var i = 0; i < arrTables[0].length; i++) {
            html += '<tr>';
            html += '<td style="text-align:left">' + _.escape(arrTables[0][i].TaxName) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[0][i].TaxAmount)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[0][i].TaxPaid)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[0][i].TaxOwed)) + '</td>';
            html += '</tr>';
            TaxAmount += arrTables[0][i].TaxAmount;
            TaxPaid += arrTables[0][i].TaxPaid;
        }
        html += '<tr>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Total</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxPaid) + '</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount - TaxPaid) + '</th>';
        html += '</tr>';
        html += '<tr>';
        html += '<th>&nbsp;</th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '</tr>';
        TaxAmount = 0;
        TaxPaid = 0;
        html += '<tr>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Federal Unemployment(940)</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Amount</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Paid</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Owed</th>';
        html += '</tr>';
        for (var i = 0; i < arrTables[1].length; i++) {
            html += '<tr>';
            html += '<td style="text-align:left">' + _.escape(arrTables[1][i].TaxName) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[1][i].TaxAmount)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[1][i].TaxPaid)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[1][i].TaxOwed)) + '</td>';
            html += '</tr>';
            TaxAmount += arrTables[1][i].TaxAmount;
            TaxPaid += arrTables[1][i].TaxPaid;
        }
        html += '<tr>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Total</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxPaid) + '</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount - TaxPaid) + '</th>';
        html += '</tr>';
        html += '<tr>';
        html += '<th>&nbsp;</th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '</tr>';
        TaxAmount = 0;
        TaxPaid = 0;
        html += '<tr>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Income Tax</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Amount</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Paid</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Owed</th>';
        html += '</tr>';
        for (var i = 0; i < arrTables[2].length; i++) {
            html += '<tr>';
            html += '<td style="text-align:left">' + _.escape(arrTables[2][i].TaxName) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[2][i].TaxAmount)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[2][i].TaxPaid)) + '</td>';
            html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[2][i].TaxOwed)) + '</td>';
            html += '</tr>';
            TaxAmount += arrTables[2][i].TaxAmount;
            TaxPaid += arrTables[2][i].TaxPaid;
        }
        html += '<tr>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Total</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxPaid) + '</th>';
        html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount - TaxPaid) + '</th>';
        html += '</tr>';
        html += '<tr>';
        html += '<th>&nbsp;</th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '<th style="text-align:right"></th>';
        html += '</tr>';
        if (arrTables[3].length > 0) {
            var StateCode = '';
            var i = 0;
            while (i < arrTables[3].length) {
                StateCode = arrTables[3][i].StateCode;
                TaxAmount = 0;
                TaxPaid = 0;
                html += '<tr>';
                html += '<th style="background-color:#4267b2;color:#fff;text-align:left">' + StateCode + ' Unemployment Tax</th>';
                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Amount</th>';
                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Paid</th>';
                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">Tax Owed</th>';
                html += '</tr>';
                while (StateCode == arrTables[3][i].StateCode) {
                    html += '<tr>';
                    html += '<td style="text-align:left">' + _.escape(arrTables[3][i].TaxName) + '</td>';
                    html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[3][i].TaxAmount)) + '</td>';
                    html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[3][i].TaxPaid)) + '</td>';
                    html += '<td style="text-align:right">' + _.escape(accounting.formatMoney(arrTables[3][i].TaxOwed)) + '</td>';
                    html += '</tr>';
                    TaxAmount += arrTables[3][i].TaxAmount;
                    TaxPaid += arrTables[3][i].TaxPaid;
                    i++;
                    if (i == arrTables[3].length) {
                        break;
                    }
                }
                html += '<tr>';
                html += '<th style="background-color:#4267b2;color:#fff;text-align:left">Total</th>';
                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount) + '</th>';
                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxPaid) + '</th>';
                html += '<th style="background-color:#4267b2;color:#fff;text-align:right">' + accounting.formatMoney(TaxAmount - TaxPaid) + '</th>';
                html += '</tr>';
                if (i < arrTables[3].length) {
                    html += '<tr>';
                    html += '<th>&nbsp;</th>';
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
    saveAs(blob, "TaxLiability.doc");            
}

function ExportToPDF()
{
    var params = {
        ClientId: parseInt($.localStorage.get('ClientId'), 10),
        FromDate: $('#txtFromDate').val(),
        ToDate: $('#txtToDate').val()        
    };
    var FileName = CallService1('Client/PayCheckService.svc', 'GetTaxLiabilityPDF', params);      

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
            link.download = "TaxLiability.pdf";
            link.click();
        }      
    };
    req.send();    
}
window.scrollTo(0, 0);