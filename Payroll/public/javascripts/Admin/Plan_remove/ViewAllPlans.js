function FillGrid() {
    var params = { StartIndex: (parseInt($('#txtCurrentPageIndex').val(), 10) - 1) * parseInt($('#txtPageSize').val(), 10), PageSize: parseInt($('#txtPageSize').val(), 10), SortField: $("#txtSortField").val(), SortDirection: $("#txtSortDirection").val(), FilterText: $("#txtSearch").val() };
    CallService('Admin/PlanService.svc', 'GetPage', params, OnPlanGetPageSuccess, true);
}
function OnPlanGetPageSuccess(dtoPlanPage) {    
    if (dtoPlanPage != undefined) {
        $('#txtCurrentRecordCount').val(dtoPlanPage.Plans.length);
        $("#txtTotalRecords").val(dtoPlanPage.TotalRecords);
        var html = '';
        for (var i = 0; i < dtoPlanPage.Plans.length; i++) {
            html += '<tr id="' + dtoPlanPage.Plans[i].PlanId + '" class="' + (i % 2 == 0 ? "footable-even" : "footable-odd") + '">';  
            html += '<td><input type="checkbox" name="chk"/></td>';
            html += '<td><a href="/Admin/Main.html#ViewPlan:' + dtoPlanPage.Plans[i].PlanId + '">' + dtoPlanPage.Plans[i].PlanCode + '</a></td>';
            html += '<td>' + dtoPlanPage.Plans[i].PlanName + '</td>';
            html += '<td>' + dtoPlanPage.Plans[i].DisplayOrder + '</td>';
            html += '<td>' + dtoPlanPage.Plans[i].Status + '</td>';            
            html += ' <td class="td-center"><a href="javascript:void(0)" onclick=\"EditRecord(' + dtoPlanPage.Plans[i].PlanId + ')\"><span class="zmdi zmdi-edit"></span></a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick=\"DeleteRecord(' + dtoPlanPage.Plans[i].PlanId + ')\"><span class="zmdi zmdi-close"></span></a></td>';
            html += '</tr>';
        }
        $('#bodyPlans').html(html);
        if (dtoPlanPage.TotalRecords > 0) {
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
    window.location = '/Admin/Main.html#Plan';
}

function EditRecord(PlanId) {
    window.location = '/Admin/Main.html#Plan:' + PlanId;
}

function Delete(PlanId) {
    var params = { PlanId: PlanId };
    CallService('Admin/PlanService.svc', 'Delete', params, OnPlanDeleteSuccess, false);   
}
function OnPlanDeleteSuccess(response) { 

}
function DeleteRecord(PlanId) {
    bootbox.dialog({
        message: "Are you sure to delete selected record?",
        title: "Payroll",
        buttons: {
            ok: {
                label: "OK",
                className: "btn btn-primary",
                callback: function () {
                    var params = { PlanId: PlanId };
                    var Deletable = CallService1('Admin/PlanService.svc', 'Deletable', params);
                    if (Deletable == true) {
                        Delete(PlanId);
                        $("#txtCurrentPageIndex").val('1');
                        FillGrid();
                    }
                    else {
                        bootbox.dialog({
                            message: 'You can not delete this record',
                            title: "Payroll",
                            buttons: {
                                ok: {
                                    label: "OK",
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
                label: "Cancel",
                className: "btn btn-default",
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
                    label: "OK",
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
                label: "OK",
                className: "btn btn-primary",
                callback: function () {
                    $('#bodyPlans').find('tr').each(function () {
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
                label: "Cancel",
                className: "btn btn-default",
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
    pager += '<ul class="pagination">';
    pager += '<li class="paginate_button">';
    pager += '<a title="Go to first page" onclick="MoveFirst()">|<</a>';
    pager += '</li>';
    pager += '<li class="paginate_button">';
    pager += '<a title="Go to previous page" onclick="MovePrevious()"><</a>';
    pager += '</li>';

    var j = 0;
    for (var i = parseInt($('#txtCurrentPageIndex').val(), 10); i <= pageCount; i++) {
        j += 1;
        if (i == parseInt($('#txtCurrentPageIndex').val(), 10)) {
            pager += '<li class="paginate_button active">';
            pager += '<a title="Go to page ' + i + '" onclick="MovePageNo(' + i + ')" class="active">' + i + '</a>';
            pager += '</li>';
        }
        else {
            pager += '<li class="paginate_button">';
            pager += '<a title="Go to page ' + i + '" onclick="MovePageNo(' + i + ')">' + i + '</a>';
            pager += '</li>';
        }
        if (j == 5) {
            break;
        }
    }

    pager += '<li class="paginate_button">';
    pager += '<a title="Go to next page" onclick="MoveNext()">></a>';
    pager += '</li>';
    pager += '<li class="paginate_button">';
    pager += '<a title="Go to last page" onclick="MoveLast()">>|</a>';
    pager += '</li>';
    //}
    pager += '</ul>';
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
socket.on('GetPlanPage', function () {
    FillGrid();
})



