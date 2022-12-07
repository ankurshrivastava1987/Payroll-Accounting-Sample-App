CheckPageRequest();
app.page("Location", function () {
    return function (params) {
        if (parseInt(params, 10) > 0) {
            $('#hdnLocationId').val(params);
            $('.page-head').html("Edit Location");
            var params = { ClientId: $.localStorage.get('ClientId'), LocationId: parseInt($('#hdnLocationId').val(), 10) };
            var dtoLocation = CallService1('Client/LocationService.svc', 'GetObject', params);
            if (dtoLocation.LocationId != undefined) {
                $('#txtLocationName').val(dtoLocation.LocationName);
                $('#txtAddress1').val(dtoLocation.Address1);
                $('#txtAddress2').val(dtoLocation.Address2);                
                $('#txtCityName').val(dtoLocation.CityName);
                $('#cmbStateName').val(dtoLocation.StateId);
                $('#txtZipCode').val(dtoLocation.ZipCode);
                $('#txtZipCodeExt').val(dtoLocation.ZipCodeExt);
            }
            else {
                window.location = "/Client/Main.html#ViewAllLocations";
            }    
        }
    }
});
$("#txtLocationName").focus();
$.validator.addMethod(
    "AlreadyExists",
    function (value, element) {
        var params = { ClientId: $.localStorage.get('ClientId'), LocationId: parseInt($("#hdnLocationId").val(), 10), LocationName: value };
        var response = CallService1('Client/LocationService.svc', 'Exists', params);

        return !response;
    },
    "Location Name already exists"
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
        txtLocationName: {
            required: true,
            AlreadyExists: true
        },
        txtAddress1: {
            required: true           
        },
        txtCityName: {
            required: true
        },
        cmbStateName: {
            Required1: true
        },
        txtZipCode: {
            required: true
        }
    },
    messages: {
        txtLocationName: {
            required: 'Location Name is required'
        },
        txtAddress1: {
            required: 'Address is required'
        },
        txtCityName: {
            required: 'City is required'
        },
        txtZipCode: {
            required: 'Zip is required'
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

function Save() {
    if (form.valid()) {
        var params = {
            LocationId: parseInt($("#hdnLocationId").val(), 10),
            ClientId: $.localStorage.get('ClientId'),
            LocationName: $("#txtLocationName").val(),
            Address1: $("#txtAddress1").val(),
            Address2: $("#txtAddress2").val(),          
            CityName: $("#txtCityName").val(),
            StateId: $("#cmbStateName").val(),
            ZipCode: $("#txtZipCode").val(),
            ZipCodeExt: $("#txtZipCodeExt").val()
        };
        CallService('Client/LocationService.svc', 'Save', params, OnLocationSaveSuccess, false);
    }
};

function OnLocationSaveSuccess(LocationId) {
    if (LocationId > 0) {
        window.location = "/Client/Main.html#ViewAllLocations";
    }
}

function Close() {
    window.location = "/Client/Main.html#ViewAllLocations";
}
window.scrollTo(0, 0);