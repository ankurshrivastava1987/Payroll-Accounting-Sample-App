CheckPageRequest();
function FillList() {
    var params = { ClientId: parseInt($.localStorage.get('ClientId'), 10) };
    var PayChecks = CallService1('Client/PayCheckService.svc', 'GetPayCheckList', params);
    var TotalHours = 0;
    var TotalPay = 0;
    var TotalNetPay = 0;
    var TotalTaxes = 0;
    var html = '';
    for (var i = 0; i < PayChecks.length; i++) {
        html += '<tr id="' + PayChecks[i].PayCheckId + '">';
        html += '<td><input type="checkbox" name="chk3"/></td>';        
        if (PayChecks[i].CheckFor == 'Employee') {
            html += '<td><a href="/Client/Main.html#ViewPayCheck:' + _.escape(PayChecks[i].PayCheckId) + '" class="link">' + (FormatDateUTC(_.escape(PayChecks[i].PayDate)) == '01/01/1900' ? '' : FormatDateUTC(_.escape(PayChecks[i].PayDate))) + '</a></td>';
        }
        else {
            html += '<td><a href="/Client/Main.html#ViewPayCheckContractor:' + _.escape(PayChecks[i].PayCheckId) + '" class="link">' + (FormatDateUTC(_.escape(PayChecks[i].PayDate)) == '01/01/1900' ? '' : FormatDateUTC(_.escape(PayChecks[i].PayDate))) + '</a></td>';
        }
        html += '<td>' + PayChecks[i].CheckNo + '</td>';
        html += '<td>' + PayChecks[i].FullName + '</td>';
        html += '<td style="text-align:right">' + accounting.formatMoney(PayChecks[i].TotalPay) + '</td>';
        html += '<td style="text-align:right">' + accounting.formatMoney(PayChecks[i].NetPay) + '</td>';
        html += '<td style="text-align:right">' + accounting.formatMoney(PayChecks[i].TotalTaxes) + '</td>';
        html += '<td class="td-center"><a href="javascript:void(0)" onclick=\"EditRecord(' + PayChecks[i].PayCheckId + ')\" class="link"><i class="fa fa-pencil" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick=\"DeleteRecord(' + PayChecks[i].PayCheckId + ')\" class="link"><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
        html += '</tr>';
        TotalHours += PayChecks[i].Hours;
        TotalPay += PayChecks[i].TotalPay;
        TotalNetPay += PayChecks[i].NetPay;
        TotalTaxes += PayChecks[i].TotalTaxes;
    }
    html += '<tr style="font-weight:bold">';
    html += '<td colspan="4">Total</td>';
    html += '<td style="text-align:right">' + accounting.formatMoney(TotalPay) + '</td>';
    html += '<td style="text-align:right">' + accounting.formatMoney(TotalNetPay) + '</td>';
    html += '<td style="text-align:right">' + accounting.formatMoney(TotalTaxes) + '</td>';
    html += '<td></td>';
    html += '</tr>';
    $('#bodyPayChecks').html(html);
}
FillList();
function EditRecord(PayCheckId) {
    window.location = "/Client/Main.html#EditPayCheck:" + PayCheckId;
}
function Close() {
    window.location = "/Client/Main.html#ViewAllPayChecks";
}

function CheckAll3() {
    $('input[type="checkbox"]').each(function () {
        if ($(this).context.name == "chk3") {
            $(this).prop("checked", $('input[name="3"]')[0].checked);
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
function Delete(PayCheckId) {
    var params = { ClientId: $.localStorage.get('ClientId'), PayCheckId: PayCheckId };
    CallService1('Client/PayCheckService.svc', 'Delete', params);
}
function DeleteSelected1() {
    if ($('td input[name="chk3"]:checked').is(":empty") == false) {
        bootbox.dialog({
            message: 'Use checkboxes to select record(s)',
            title: "Payroll",
            buttons: {
                ok: {
                    label: "<i class=\"fa fa-check\" aria-hidden=\"true\"></i> OK",
                    className: "btn btn-primary",
                    callback: function () {
                    }
                }
            }
        });
        return false;
    }
    bootbox.dialog({
        message: "Are you sure to delete selected record(s)?",
        title: "Payroll",
        buttons: {
            ok: {
                label: "<i class=\"fa fa-check\" aria-hidden=\"true\"></i> OK",
                className: "btn btn-primary",
                callback: function () {
                    $('#bodyPayChecks').find('tr').each(function () {
                        var row = $(this);
                        if (row.find('input[name="chk3"]').is(':checked')) {
                            Delete(row.context['id']);
                        }
                    });
                    FillList();
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
function DeleteRecord(PayCheckId) {
    bootbox.dialog({
        message: "Are you sure to delete selected record?",
        title: "Payroll",
        buttons: {
            ok: {
                label: "<i class=\"fa fa-check\" aria-hidden=\"true\"></i> OK",
                className: "btn btn-primary",
                callback: function () {
                    var params = { ClientId: $.localStorage.get('ClientId'), PayCheckId: PayCheckId };
                    var Deletable = CallService1('Client/PayCheckService.svc', 'Deletable', params);
                    if (Deletable == true) {
                        Delete(PayCheckId);                        
                        FillList();
                    }
                    else {
                        bootbox.dialog({
                            message: 'You can not delete this record',
                            title: "Payroll",
                            buttons: {
                                ok: {
                                    label: "<i class=\"fa fa-check\" aria-hidden=\"true\"></i> OK",
                                    className: "btn btn-primary",
                                    callback: function () {
                                    }
                                }
                            }
                        });
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
window.scrollTo(0, 0);