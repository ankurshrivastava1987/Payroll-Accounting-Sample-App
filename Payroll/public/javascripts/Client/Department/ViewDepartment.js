CheckPageRequest();
app.page("ViewDepartment", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnDepartmentId').val(params);
            DisplayData();
        }
    }
});

function DisplayData() {    
    var params = { ClientId: $.localStorage.get('ClientId'), DepartmentId: parseInt($('#hdnDepartmentId').val(), 10) };
    var dtoDepartment = CallService1('Client/DepartmentService.svc', 'GetObject', params);
    if (dtoDepartment.DepartmentId != undefined) {
        $('#spanDepartmentName').html(_.escape(dtoDepartment.DepartmentName));
    }
    else {
        window.location = "/Client/Main.html#ViewAllDepartments";
    }   
}

function Edit() {
    window.location = "/Client/Main.html#Department:" + $('#hdnDepartmentId').val();
}

function Close() {
    window.location = "/Client/Main.html#ViewAllDepartments";
}
window.scrollTo(0, 0); 
socket.on('GetDepartmentObject', function (DepartmentId) {
    if ($('#hdnDepartmentId').val() == DepartmentId) {
        DisplayData();
    }
})
