CheckPageRequest();
function FillCheckList() {
    var params = { ClientId: parseInt($.localStorage.get('ClientId'), 10)};
    var PayChecks = CallService1('Client/PayCheckService.svc', 'GetPayCheckList', params);
    var TotalHours = 0;
    var TotalPay = 0;
    var TotalNetPay = 0;
    var html = '';
    for (var i = 0; i < PayChecks.length; i++) {
        if (PayChecks[i].CheckNo.trim() == '')
        {
            html += '<tr id="' + PayChecks[i].PayCheckId + '">';
            html += '<td><input type="checkbox" name="chk2"/></td>';            
            if (PayChecks[i].CheckFor == 'Employee') {
                html += '<td><a href="/Client/Main.html#ViewPayCheck:' + _.escape(PayChecks[i].PayCheckId) + '" class="link">' + (FormatDateUTC(_.escape(PayChecks[i].PayDate)) == '01/01/1900' ? '' : FormatDateUTC(_.escape(PayChecks[i].PayDate))) + '</a></td>';
            }
            else {
                html += '<td><a href="/Client/Main.html#ViewPayCheckContractor:' + _.escape(PayChecks[i].PayCheckId) + '" class="link">' + (FormatDateUTC(_.escape(PayChecks[i].PayDate)) == '01/01/1900' ? '' : FormatDateUTC(_.escape(PayChecks[i].PayDate))) + '</a></td>';
            }
            html += '<td><input class="form-control integer" style="width:150px;" value="' + PayChecks[i].CheckNo + '"/></td>';
            html += '<td>' + PayChecks[i].FullName + '</td>';
            html += '<td style="text-align:right">' + accounting.formatMoney(PayChecks[i].TotalPay) + '</td>';
            html += '<td style="text-align:right">' + accounting.formatMoney(PayChecks[i].NetPay) + '</td>';
            html += '</tr>';
            TotalHours += PayChecks[i].Hours;
            TotalPay += PayChecks[i].TotalPay;
            TotalNetPay += PayChecks[i].NetPay;
        }
    }
    html += '<tr style="font-weight:bold">';
    html += '<td colspan="4">Total</td>';
    html += '<td style="text-align:right">' + accounting.formatMoney(TotalPay) + '</td>';
    html += '<td style="text-align:right">' + accounting.formatMoney(TotalNetPay) + '</td>';
    html += '</tr>';
    $('#bodyPayCheck').html(html);
    SetKeyPress1();
}
FillCheckList();
function SaveCheckNo() {
    var PayChecks = '';
    var rowLength = document.getElementById('tblMain2').rows.length;
    for (var i = 1; i < rowLength - 1; i++) {
        var cell = $(document.getElementById('tblMain2').rows[i].cells[2]).find('.form-control');
        PayChecks += $(document.getElementById('tblMain2').rows[i]).attr('id') + String.fromCharCode(134) + cell.val() + String.fromCharCode(135);
    }
    if (PayChecks != '') {
        PayChecks = PayChecks.substring(0, PayChecks.length - 1);
        var params = {
            ClientId: parseInt($.localStorage.get('ClientId'), 10),
            PayChecks: PayChecks
        };
        var result = CallService1('Client/PayCheckService.svc', 'SaveCheckNo', params);
        if (result) {
            Step(3);
        }
    }
};

function Close() {
    window.location = "/Client/Main.html#ViewAllPayChecks";
}

function CheckAll2() {
    $('input[type="checkbox"]').each(function () {
        if ($(this).context.name == "chk2") {
            $(this).prop("checked", $('input[name="2"]')[0].checked);
        }
    });
}

function Step(index) {
    if (index == 1) {
        window.location = '/Client/Main.html#PayCheck';
    }    
    else if (index == 2) {
        window.location = '/Client/Main.html#ModifyCheckNumbers';
    }
    else if (index == 3) {
        window.location = '/Client/Main.html#PrintPaychecks';
    }
}

function GenerateCheckNumbers() {
    if ($('#txtCheckNo').val().trim() != '') {
        var StartNo = parseInt($('#txtCheckNo').val());
        var rowLength = document.getElementById('tblMain2').rows.length;
        for (var i = 1; i < rowLength; i++) {
            if ($(document.getElementById('tblMain2').rows[i]).find('input[type="checkbox"]').is(':checked')) {
                var cell = $(document.getElementById('tblMain2').rows[i].cells[2]).find('.form-control');
                cell.val(StartNo);
                StartNo++;
            }
        }
    }
}
function SetKeyPress1() {
    $('.integer').keydown(function (event) {
        var kc, num, rt = false;
        kc = event.keyCode;
        if (kc == 8 || kc == 9 || ((kc > 47 && kc < 58) || (kc > 95 && kc < 106))) rt = true;
        return rt;
    })
        .bind('blur', function () {
            num = parseInt($(this).val());
            num = isNaN(num) ? '' : num;
            if (num && num < 0) num = num * -1;
            $(this).val(num);
        });
}
SetKeyPress1();
window.scrollTo(0, 0);