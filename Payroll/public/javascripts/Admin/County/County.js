app.page("County", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnCountyId').val(params);
            $('.page-head').html("Edit County");
            DisplayData();
        }        
    }
});

$("#txtCountyCode").focus();
$.validator.addMethod(
    "AlreadyExists",
    function (value, element) {
        var params = { CountyId: parseInt($("#hdnCountyId").val(), 10), CountyName: value };
        var response = CallService1('Admin/CountyService.svc', 'Exists', params);

        return !response;
    },
    "County Name already exists"
);
$.validator.addMethod(
    "AlreadyExists1",
    function (value, element) {
        var params = { CountyId: parseInt($("#hdnCountyId").val(), 10), CountyCode: value };
        var response = CallService1('Admin/CountyService.svc', 'Exists1', params);

        return !response;
    },
    "County Code already exists"
);
$.validator.addMethod(
    "Required1",
    function (value, element) {

        return ($('#cmbStateName').val() == '0' ? false : true);
    },
    "State is required"
);
var form = $("#frmEntry");
var valid = form.validate({

    /* @validation states + elements
         ------------------------------------------- */

    errorClass: 'error-view',
    validClass: 'success-view',
    errorElement: 'span',

    /* @validation rules
         ------------------------------------------ */
    rules: {
        txtCountyName: {
            required: true,
            AlreadyExists: true
        }, 
        txtCountyCode: {
            required: true,
            AlreadyExists1: true
        },      
        cmbStateName: {
            Required1: true
        }
    },
    messages: {
        txtCountyName: {
            required: 'County Name is required'
        },
        txtCountyCode: {
            required: 'County Code is required'
        }           
    },
    highlight: function (element, errorClass, validClass) {
        $(element).closest('.input').removeClass(validClass).addClass(errorClass);
        if ($(element).is(':checkbox') || $(element).is(':radio')) {
            $(element).closest('.check').removeClass(validClass).addClass(errorClass);
        }
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).closest('.input').removeClass(errorClass).addClass(validClass);
        if ($(element).is(':checkbox') || $(element).is(':radio')) {
            $(element).closest('.check').removeClass(errorClass).addClass(validClass);
        }
    },
    errorPlacement: function (error, element) {
        if ($(element).is(':checkbox') || $(element).is(':radio')) {
            $(element).closest('.check').append(error);
        } else {
            $(element).closest('.unit').append(error);
        }
    }
});
function FillStates() {
    var params = {};
    CallService('Public/StateService.svc', 'GetLookup', params, OnStateGetLookupSuccess, false);
}

function OnStateGetLookupSuccess(states) {
    var html = '<option value="0"></option>';
    if (states != undefined) {
        for (var i = 0; i < states.length; i++) {
            html += '<option value="' + states[i]['StateId'] + '">' + states[i]['StateName'] + '</option>';
        }
    }
    $('#cmbStateName').append(html);
    $('#cmbStateName').val("0");    
}
FillStates();
function DisplayData() {    
    var params = { CountyId: parseInt($('#hdnCountyId').val(), 10) };
    CallService('Admin/CountyService.svc', 'GetObject', params, OnCountyGetObjectSuccess, true);
}
function OnCountyGetObjectSuccess(dtoCounty) {
    if (dtoCounty.CountyId != undefined) {
        $('#txtCountyCode').val(dtoCounty.CountyCode);
        $('#txtCountyName').val(dtoCounty.CountyName);       
        $('#cmbStateName').val(dtoCounty.StateId);       
    }
    else
    {
        window.location = "/Admin/Main.html#ViewAllCounties";
    }   
}

function Save() {
    if (form.valid()) {
        var params = {
            CountyId: parseInt($("#hdnCountyId").val(), 10),
            CountyCode: $("#txtCountyCode").val(),            
            CountyName: $("#txtCountyName").val(),           
            StateId: $("#cmbStateName").val()
        };
        CallService('Admin/CountyService.svc', 'Save', params, OnCountySaveSuccess, false);
    }
};

function OnCountySaveSuccess(CountyId) {
    if (CountyId > 0) {
        window.location = "/Admin/Main.html#ViewAllCounties";
    }
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllCounties";
}