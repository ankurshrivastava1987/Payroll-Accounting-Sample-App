﻿function FillGrid() {    
    var params = { StartIndex: (parseInt($('#txtCurrentPageIndex').val(), 10) - 1) * parseInt($('#txtPageSize').val(), 10), PageSize: parseInt($('#txtPageSize').val(), 10), SortField: $("#txtSortField").val(), SortDirection: $("#txtSortDirection").val(), FilterText: $("#txtSearch").val() };
    CallService('Admin/StandardDeduction2Service.svc', 'GetPage', params, OnStandardDeduction2GetPageSuccess, true);
}
function OnStandardDeduction2GetPageSuccess(dtoStandardDeduction2Page) {    
    if (dtoStandardDeduction2Page != undefined) {
        $('#txtCurrentRecordCount').val(dtoStandardDeduction2Page.StandardDeduction2s.length);
        $("#txtTotalRecords").val(dtoStandardDeduction2Page.TotalRecords);
        var html = '';
        for (var i = 0; i < dtoStandardDeduction2Page.StandardDeduction2s.length; i++) {
            html += '<tr id="' + dtoStandardDeduction2Page.StandardDeduction2s[i].StandardDeduction2Id + '" class="' + (i % 2 == 0 ? "footable-even" : "footable-odd") + '">';  
            html += '<td><input type="checkbox" name="chk"/></td>';
            html += '<td><a href="/Admin/Main.html#ViewStandardDeduction2:' + dtoStandardDeduction2Page.StandardDeduction2s[i].StandardDeductionId + '" class="link">' + _.escape(dtoStandardDeduction2Page.StandardDeduction2s[i].StateName) + '</a></td>';
            html += '<td>' + FormatDateUTC(dtoStandardDeduction2Page.StandardDeduction2s[i].EffectiveDate) + '</td>';                                  
            html += ' <td class="td-center"><a href="javascript:void(0)" onclick=\"EditRecord(' + dtoStandardDeduction2Page.StandardDeduction2s[i].StandardDeductionId + ')\" class="link"><i class="fa fa-pencil" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick=\"DeleteRecord(' + dtoStandardDeduction2Page.StandardDeduction2s[i].StandardDeductionId + ')\" class="link"><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
            html += '</tr>';
        }
        $('#bodyStandardDeductions').html(html);
        if (dtoStandardDeduction2Page.TotalRecords > 0) {
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
    window.location = '/Admin/Main.html#StandardDeduction2';
}

function EditRecord(StandardDeductionId) {
    window.location = '/Admin/Main.html#StandardDeduction2:' + StandardDeductionId;
}

function Delete(StandardDeductionId) {
    var params = { StandardDeductionId: StandardDeductionId };
    CallService('Admin/StandardDeduction2Service.svc', 'Delete', params, OnStandardDeduction2DeleteSuccess, false);   
}
function OnStandardDeduction2DeleteSuccess(response) { 

}
function DeleteRecord(StandardDeductionId) {
    bootbox.dialog({
        message: "Are you sure to delete selected record?",
        title: "Payroll",
        buttons: {
            ok: {
                label: "<i class=\"fa fa-check\" aria-hidden=\"true\"></i> OK",
                className: "btn btn-primary",
                callback: function () {
                    var params = { StandardDeductionId: StandardDeductionId };
                    var Deletable = CallService1('Admin/StandardDeduction2Service.svc', 'Deletable', params);
                    if (Deletable == true) {
                        Delete(StandardDeductionId);
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

function DeleteSelected() {
    if ($('td input[type="checkbox"]:checked').is(":empty") == false) {
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
                    $('#bodyStandardDeductions').find('tr').each(function () {
                        var row = $(this);
                        if (row.find('input[type="checkbox"]').is(':checked')) {
                            Delete(row.context['id']);
                        }
                    });
                    $("#txtCurrentPageIndex").val('1');
                    FillGrid(); 
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

function CheckAll() {
    $('input[type="checkbox"]').each(function () {
        if ($(this).context.name != "0") {
            $(this).prop("checked", $('input[name="0"]')[0].checked);
        }
    });
}
FillGrid();
socket.on('GetStandardDeduction2Page', function () {
    FillGrid();
})

$('#aDownload').show();
$('#aDownload').attr('href', '/templates/StandardDeduction2Template.xlsx');
$('#aUpload').attr('data-bb', 'StandardDeduction2_html');
$('#aUpload').show();