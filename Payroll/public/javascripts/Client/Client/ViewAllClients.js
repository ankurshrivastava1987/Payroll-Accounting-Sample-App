app.page("ViewAllClients", function () {    
    return function (params) {       
    }
}); 
function FillGrid() {    
    var params = { StartIndex: (parseInt($('#txtCurrentPageIndex').val(), 10) - 1) * parseInt($('#txtPageSize').val(), 10), PageSize: parseInt($('#txtPageSize').val(), 10), SortField: $("#txtSortField").val(), SortDirection: $("#txtSortDirection").val(), Status: $("#cmbStatus").val(), FilterText: $("#txtSearch").val() };
    CallService('Client/ClientService.svc', 'GetPage', params, OnClientGetPageSuccess, true);
}
function OnClientGetPageSuccess(dtoClientPage) {
    if (dtoClientPage != undefined) {
        $('#txtCurrentRecordCount').val(dtoClientPage.Clients.length);
        $("#txtTotalRecords").val(_.escape(dtoClientPage.TotalRecords));
        var html = '';
        for (var i = 0; i < dtoClientPage.Clients.length; i++) {
            html += '<tr id="' + _.escape(dtoClientPage.Clients[i].ClientId) + '" class="' + (i % 2 == 0 ? "footable-even" : "footable-odd") + '">';
            html += '<td style="vertical-align:middle"><div class="' + (dtoClientPage.Clients[i].Status == "Active" ? "green-circle" : "red-circle") + '"></div></td>';
            html += '<td><a href="javascript:void(0)" onclick="SelectClient(' + _.escape(dtoClientPage.Clients[i].ClientId) + ')" class="link">' + _.escape(dtoClientPage.Clients[i].FullName) + '</a></td>';
            html += '<td>' + _.escape(dtoClientPage.Clients[i].EMailId) + '</td>';
            html += '<td>' + _.escape(dtoClientPage.Clients[i].WorkPhoneNo) + (dtoClientPage.Clients[i].WorkPhoneNoExt.trim() == '' ? '' : '-' + _.escape(dtoClientPage.Clients[i].WorkPhoneNoExt.trim())) + '</td>';
            html += '<td></td>';
            html += '<td></td>';
            html += ' <td class="td-center"><a href="javascript:void(0)" onclick=\"EditRecord(' + _.escape(dtoClientPage.Clients[i].ClientId) + ')\" class="link"><i class="fa fa-pencil" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick=\"DeleteRecord(' + _.escape(dtoClientPage.Clients[i].ClientId) + ')\" class="link"><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
            html += '</tr>';
        }
        $('#bodyClients').html(html);
        if (dtoClientPage.TotalRecords > 0) {
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
function NewRecord() {
    window.location = '/Client/Main.html#Client';
}

function EditRecord(ClientId) {
    window.location = '/Client/Main.html#Client:' + ClientId;
}

function Delete(ClientId) {
    var params = { ClientId: ClientId };
    CallService('Client/ClientService.svc', 'Delete', params, OnClientDeleteSuccess, false);
}
function OnClientDeleteSuccess(response) {

}
function DeleteRecord(ClientId) {
    bootbox.dialog({
        message: "Are you sure to delete selected record?",
        title: "Payroll",
        buttons: {
            ok: {
                label: "<i class=\"fa fa-check\" aria-hidden=\"true\"></i> OK",
                className: "btn btn-primary",
                callback: function () {
                    var params = { ClientId: ClientId };
                    var Deletable = CallService1('Client/ClientService.svc', 'Deletable', params);
                    if (Deletable == true) {
                        Delete(ClientId);
                        $("#txtCurrentPageIndex").val('1');
                        FillGrid();
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

function RefreshGrid() {
    FillGrid();
}

function SortTable(fieldName) {
    if ($('#txtSortField').val().toLowerCase() == fieldName.toLowerCase()) {
        if ($('#txtSortDirection').val().toLowerCase() == 'asc') {
            $('#txtSortDirection').val('DESC');
        }
        else {
            $('#txtSortDirection').val('ASC');
        }
    }
    else {
        $('#txtSortField').val(fieldName);
        $('#txtSortDirection').val('ASC');
    }
    FillGrid();
}

function Go() {
    FillGrid();
}

function SearchKeypress() {
    FillGrid();
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
$(document).ready(function () {
    $('#aDownload').show();
    $('#aUpload').show();
    $('#liDelete').addClass('hide');
    $("#cmbStatus").change(function () {
        $('#txtCurrentPageIndex').val(1);
        FillGrid();
    });
    $('[data-toggle="popover"]').popover({
        container: 'body',
        html: true
    });
    $('body').on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });
});
function SelectClient(ClientId) {
    $.localStorage.set('ClientId', ClientId);
    window.location = '/Client/SetSession?ClientId=' + ClientId;
}
window.scrollTo(0, 0);
socket.on('GetClientClientPage', function () {
    FillGrid();
})

