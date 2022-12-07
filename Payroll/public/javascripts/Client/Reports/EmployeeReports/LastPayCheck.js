CheckPageRequest();
function FillEmployees() {    
    var params = { ClientId: $.localStorage.get('ClientId') };
    CallService('Client/EmployeeService.svc', 'GetLookup', params, OnEmployeeGetLookupSuccess, false);
}

function OnEmployeeGetLookupSuccess(Employees) {
    var html = '<option value="0">Select Employee</option>';
    if (Employees != undefined) {
        for (var i = 0; i < Employees.length; i++) {
            html += '<option value="' + Employees[i]['EmployeeId'] + '">' + Employees[i]['FullName'] + '</option>';
        }
    }
    $('#ddlEmployee').append(html);
    $('#ddlEmployee').val("0");
}
FillEmployees();
$("li:nth-child(3)").hide(); //To hide export to pdf button

function DisplayData() {    
    ClearControl();
    //alert($('#ddlEmployee').val());
    var params = { ClientId: $.localStorage.get('ClientId'), EmployeeID: parseInt($('#ddlEmployee').val(), 10) };
    CallService('Client/PayCheckService.svc', 'GetObjectLastPayCheck', params, OnPayCheckGetObjectLastPayCheckSuccess, true);
}

function OnPayCheckGetObjectLastPayCheckSuccess(dtoPayCheck) {    
    if (dtoPayCheck.PayCheckId != undefined) {       
        $('#spanName').html('ADVICE OF DEPOSIT');       
        $('#spanClientFullName').html(_.escape(dtoPayCheck.ClientFullName));
        $('#spanClientAddress1').html(_.escape(dtoPayCheck.ClientAddress1));
        $('#spanClientAddress2').html(_.escape(dtoPayCheck.ClientAddress2));        
        $('#spanClientCity').html(_.escape(dtoPayCheck.ClientCityName));
        $('#spanClientStateCode').html(_.escape(dtoPayCheck.ClientStateCode));
        $('#spanClientZipCode').html(_.escape(dtoPayCheck.ClientZipCode));
        $('#spanEmployeeFullName').html(_.escape(dtoPayCheck.EmployeeFullName));
        $('#spanEmployeeAddress1').html(_.escape(dtoPayCheck.EmployeeAddress1));
        $('#spanEmployeeAddress2').html(_.escape(dtoPayCheck.EmployeeAddress2));       
        $('#spanEmployeeCity').html(_.escape(dtoPayCheck.EmployeeCityName));
        $('#spanEmployeeStateCode').html(_.escape(dtoPayCheck.EmployeeStateCode));
        $('#spanEmployeeZipCode').html(_.escape(dtoPayCheck.EmployeeZipCode));       
        if (dtoPayCheck.PayPeriod.trim() != '') {
            $('#spanPayPeriod').html(_.escape(dtoPayCheck.PayPeriod));
            $('#divPayPeriod').removeClass('hide');
        }
        $('#spanNetPayCheck').html(_.escape(accounting.formatMoney(dtoPayCheck.NetPayCheck)));
        $('#spanPayDate').html(_.escape(FormatDateUTC(dtoPayCheck.PayDate)));
        //$('#spanPayType').html(_.escape(dtoPayCheck.PayType));
        //$('#spanHours').html(_.escape(dtoPayCheck.RegularHours));
        //$('#spanRate').html(_.escape(accounting.formatMoney(dtoPayCheck.PayRate)));
        //$('#spanRegularAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.RegularAmount)));
        //$('#spanRegularAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.AmountPaidYTD)));
        $('#spanFederalTaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.FederalTaxAmount)));
        $('#spanFederalTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.FederalTaxAmountYTD)));
        $('#spanSocialSecurityTaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.SocialSecurityTaxAmount)));
        $('#spanSocialSecurityTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.SocialSecurityTaxAmountYTD)));
        $('#spanMedicareTaxAmountAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.MedicareTaxAmount)));
        $('#spanMedicareTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.MedicareTaxAmountYTD)));
        $('#spanStateTaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.StateTaxAmount)));
        $('#spanStateTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.StateTaxAmountYTD)));
        $('#spanCountyTaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.CountyTaxAmount)));
        $('#spanCountyTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.CountyTaxAmountYTD)));
        $('#spanTotalPaid').html(_.escape(accounting.formatMoney(dtoPayCheck.TotalPay)));
        $('#spanTotalPaidYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.TotalPayYTD)));
        //$('#spanAdditions').html(_.escape(accounting.formatMoney(dtoPayCheck.Additions)));
        //$('#spanAdditionsYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.AdditionsYTD)));
        $('#spanDeductions').html(_.escape(accounting.formatMoney(dtoPayCheck.Deductions)));
        $('#spanDeductionsYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.DeductionsYTD)));
        $('#spanTax').html(_.escape(accounting.formatMoney(dtoPayCheck.Tax)));
        $('#spanTaxYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.TaxYTD)));
        $('#spanNetPayCheckSummary').html(_.escape(accounting.formatMoney(dtoPayCheck.NetPayCheck)));
       // $('#spanAccountPaidSummary').html(_.escape(accounting.formatMoney(dtoPayCheck.NetPayCheck)));
        $('#spanEmployerFUTATaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerFUTATaxAmount)));
        $('#spanEmployerFUTATaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerFUTATaxAmountYTD)));
        $('#spanEmployerSocialSecurityTaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerSocialSecurityTaxAmount)));
        $('#spanEmployerSocialSecurityTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerSocialSecurityTaxAmountYTD)));
        $('#spanEmployerMedicareTaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerMedicareTaxAmount)));
        $('#spanEmployerMedicareTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerMedicareTaxAmountYTD)));
        $('#spanEmployerSUITaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerSUITaxAmount)));
        $('#spanEmployerSUITaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerSUITaxAmountYTD)));
        $('#spanEmployerAdminAssessmentTaxAmount').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerAdminAssessmentTaxAmount)));
        $('#spanEmployerAdminAssessmentTaxAmountYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.EmployerAdminAssessmentTaxAmountYTD)));
        $('#spanTotalEmployerTax').html(_.escape(accounting.formatMoney(dtoPayCheck.TotalEmployerTax)));
        $('#spanTotalEmployerTaxYTD').html(_.escape(accounting.formatMoney(dtoPayCheck.TotalEmployerTaxYTD)));
        $('.state').html(_.escape(dtoPayCheck.StateCode));
        var html = '';
        if (dtoPayCheck.NetToGross) {
            html += '<tr>';
            html += '<td style="width:20%;text-align:left;padding-left:5px;white-space:nowrap">';
            html += 'Employee Taxes paid by Employer';
            html += '</td>';
            html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
            //html += _.escape(dtoPayCheck.RegularHours.toFixed(2));
            html += '</td>';
            html += '<td style="width:20%; text-align:right;">';
            //html += _.escape(accounting.formatMoney(dtoPayCheck.PayRate));
            html += '</td>';
            html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
            html += _.escape(accounting.formatMoney(dtoPayCheck.PaidByEmployerAmount));
            html += '</td>';
            html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
            html += _.escape(accounting.formatMoney(dtoPayCheck.PaidByEmployerYTD)) + '&nbsp; &nbsp;';
            html += '</td>';
            html += '</tr>';
        }
        if ((dtoPayCheck.PayCheckType != 2) && (dtoPayCheck.PayCheckType != 3)) {
            html += '<tr>';
            html += '<td style="width:20%;text-align:left;padding-left:5px;">';
            html += 'Regular Hours';
            html += '</td>';
            html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
            html += _.escape(dtoPayCheck.RegularHours.toFixed(2));
            html += '</td>';
            html += '<td style="width:20%; text-align:right;">';
            html += _.escape(accounting.formatMoney(dtoPayCheck.PayRate));
            html += '</td>';
            html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
            html += _.escape(accounting.formatMoney(dtoPayCheck.RegularAmount));
            html += '</td>';
            html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
            html += _.escape(accounting.formatMoney(dtoPayCheck.AmountPaidYTD)) + '&nbsp; &nbsp;';
            html += '</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<td style="width:20%;text-align:left;padding-left:5px;">';
            html += 'OT Hours';
            html += '</td>';
            html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
            html += _.escape(dtoPayCheck.OTHours.toFixed(2));
            html += '</td>';
            html += '<td style="width:20%; text-align:right;">';
            html += _.escape(accounting.formatMoney(dtoPayCheck.OTRate));
            html += '</td>';
            html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
            html += _.escape(accounting.formatMoney(dtoPayCheck.OTAmount));
            html += '</td>';
            html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
            html += _.escape(accounting.formatMoney(dtoPayCheck.OTAmountYTD)) + '&nbsp; &nbsp;';
            html += '</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<td style="width:20%;text-align:left;padding-left:5px;">';
            html += 'Double OT Hours';
            html += '</td>';
            html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
            html += _.escape(dtoPayCheck.DoubleOTHours.toFixed(2));
            html += '</td>';
            html += '<td style="width:20%; text-align:right;">';
            html += _.escape(accounting.formatMoney(dtoPayCheck.DoubleOTRate));
            html += '</td>';
            html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
            html += _.escape(accounting.formatMoney(dtoPayCheck.DoubleOTAmount));
            html += '</td>';
            html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
            html += _.escape(accounting.formatMoney(dtoPayCheck.DoubleOTAmountYTD)) + '&nbsp; &nbsp;';
            html += '</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<td style="width:20%;text-align:left;padding-left:5px;">';
            html += 'Sick Hours';
            html += '</td>';
            html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
            html += _.escape(dtoPayCheck.SickHours.toFixed(2));
            html += '</td>';
            html += '<td style="width:20%; text-align:right;">';
            html += _.escape(accounting.formatMoney(dtoPayCheck.SickRate));
            html += '</td>';
            html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
            html += _.escape(accounting.formatMoney(dtoPayCheck.SickAmount));
            html += '</td>';
            html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
            html += _.escape(accounting.formatMoney(dtoPayCheck.SickAmountYTD)) + '&nbsp; &nbsp;';
            html += '</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<td style="width:20%;text-align:left;padding-left:5px;">';
            html += 'Vacation Hours';
            html += '</td>';
            html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
            html += _.escape(dtoPayCheck.VacationHours.toFixed(2));
            html += '</td>';
            html += '<td style="width:20%; text-align:right;">';
            html += _.escape(accounting.formatMoney(dtoPayCheck.VacationRate));
            html += '</td>';
            html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
            html += _.escape(accounting.formatMoney(dtoPayCheck.VacationAmount));
            html += '</td>';
            html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
            html += _.escape(accounting.formatMoney(dtoPayCheck.VacationAmountYTD)) + '&nbsp; &nbsp;';
            html += '</td>';
            html += '</tr>';
        }
        if (dtoPayCheck.Addition != '') {
            $(dtoPayCheck.Addition).find('additions').each(function () {
                var $entry = $(this);
                html += '<tr>';
                html += '<td style="width:20%;text-align:left;padding-left:5px;">';
                html += $entry.attr('paystubname');
                html += '</td>';
                html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
                if ($entry.attr('ValueIn') == 'Hours') {
                    html += parseFloat($entry.attr('Hours')).toFixed(2);
                }        
                html += '</td>';
                html += '<td style="width:20%; text-align:right;">';
                if ($entry.attr('ValueIn') == 'Hours') {
                    html += accounting.formatMoney($entry.attr('PayRatePerHour'));
                }  
                html += '</td>';
                html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
                html += accounting.formatMoney($entry.attr('amount'));
                html += '</td>';
                html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
                html += accounting.formatMoney($entry.attr('YTD')) + '&nbsp; &nbsp;';
                html += '</td>';
                html += '</tr>';
            })            
        }
        $('#bodyMain').html(html);
        html = '';
        if (dtoPayCheck.Deduction != '') {
            $(dtoPayCheck.Deduction).find('deductions').each(function () {
                var $entry = $(this);
                html += '<tr id="' + $entry.attr('PayStubId') + '" taxable="' + $entry.attr('taxable') + '">';
                html += '<td style="text-align:left;padding-left:5px;">';
                html += $entry.attr('paystubname');
                html += '</td>';
                html += '<td style="text-align:right;">';
                html += accounting.formatMoney($entry.attr('amount'));
                html += '</td>';
                html += '<td style="padding: 5px 0px 5px 0px; text-align:right;">';
                html += accounting.formatMoney($entry.attr('YTD')) + '&nbsp; &nbsp;';
                html += '</td>';
                html += '</tr>';
            })
        }
        $('#bodyDeduction').html(html);
    }   
}


function ClearControl() {
    $('span[id^="span"]').html('');
    $('#bodyMain').html('');
    $('#bodyDeduction').html('');
        //$('#spanClientFullName').html('');
        //$('#spanClientAddress1').html('');
        //$('#spanClientAddress2').html('');        
        //$('#spanClientCity').html('');
        //$('#spanClientStateCode').html('');
        //$('#spanClientZipCode').html('');
        //$('#spanEmployeeFullName').html('');
        //$('#spanEmployeeAddress1').html('');
        //$('#spanEmployeeAddress2').html('');        
        //$('#spanEmployeeCity').html('');
        //$('#spanEmployeeStateCode').html('');
        //$('#spanEmployeeZipCode').html('');
        //$('#spanPayPeriod').html('');
        //$('#spanNetPayCheck').html('');
        //$('#spanPayDate').html('');
        //$('#spanPayType').html('');
        //$('#spanHours').html('');
        //$('#spanRate').html('');
        //$('#spanRegularAmount').html('');
        //$('#spanRegularAmountYTD').html('');
        //$('#spanFederalTaxAmount').html('');
        //$('#spanFederalTaxAmountYTD').html('');
        //$('#spanSocialSecurityTaxAmount').html('');
        //$('#spanSocialSecurityTaxAmountYTD').html('');
        //$('#spanMedicareTaxAmountAmount').html('');
        //$('#spanMedicareTaxAmountYTD').html('');
        //$('#spanStateTaxAmount').html('');
        //$('#spanStateTaxAmountYTD').html('');
        //$('#spanTotalPaid').html('');
        //$('#spanTotalPaidYTD').html('');
        //$('#spanAdditions').html('');
        //$('#spanAdditionsYTD').html('');
        //$('#spanDeductions').html('');
        //$('#spanDeductionsYTD').html('');
        //$('#spanTax').html('');
        //$('#spanTaxYTD').html('');
        //$('#spanNetPayCheckSummary').html('');
        //$('#spanAccountPaidSummary').html('');
        //$('#spanEmployerFUTATaxAmount').html('');
        //$('#spanEmployerFUTATaxAmountYTD').html('');
        //$('#spanEmployerSocialSecurityTaxAmount').html('');
        //$('#spanEmployerSocialSecurityTaxAmountYTD').html('');
        //$('#spanEmployerMedicareTaxAmount').html('');
        //$('#spanEmployerMedicareTaxAmountYTD').html('');
        //$('#spanEmployerSUITaxAmount').html('');
        //$('#spanEmployerSUITaxAmountYTD').html('');
        //$('#spanEmployerAdminAssessmentTaxAmount').html('');
        //$('#spanEmployerAdminAssessmentTaxAmountYTD').html('');
        //$('#spanTotalEmployerTax').html('');
        //$('#spanTotalEmployerTaxYTD').html('');
}




function ExportToExcel() {
    var blob = new Blob([$('#divLastPayCheck').html()], {
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
    word += $('#divLastPayCheck').html();
    word += "</div></body></html>";
    var blob = new Blob([word], {
        type: "application/msword"
    });
    saveAs(blob, "Report.doc");
}

function ExportToPDF1() {
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

//function ExportToPDF() {
//    var pdf = new jsPDF('p', 'pt', 'letter');
//    // source can be HTML-formatted string, or a reference
//    // to an actual DOM element from which the text will be scraped.
//   var source = $('#divLastPayCheck').html();

//    // we support special element handlers. Register them with jQuery-style 
//    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
//    // There is no support for any other type of selectors 
//    // (class, of compound) at this time.
//    specialElementHandlers = {
//        // element with id of "bypass" - jQuery style selector
//        '#bypassme': function (element, renderer) {
//            // true = "handled elsewhere, bypass text extraction"
//            return true
//        }
//    };
//    margins = {
//        top: 80,
//        bottom: 60,
//        left: 10,
//        width: 700
//    };
//    // all coords and widths are in jsPDF instance's declared units
//    // 'inches' in this case
//    pdf.fromHTML(
//        source, // HTML string or DOM elem ref.
//        margins.left, // x coord
//        margins.top, { // y coord
//            'width': margins.width, // max width of content on PDF
//            'elementHandlers': specialElementHandlers
//        },

//        function (dispose) {
//            // dispose: object with X, Y of the last line add to the PDF 
//            //          this allow the insertion of new lines after html
//            pdf.save('Test.pdf');
//        }, margins);
//}
window.scrollTo(0, 0);