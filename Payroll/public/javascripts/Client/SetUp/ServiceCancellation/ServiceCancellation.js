CheckPageRequest();
function FillServiceCancellationReason() {
    var params = { };
    CallService('Client/SetUp/ServiceCancellationService.svc', 'GetServiceCancellationReason', params, OnGetServiceCancellationReasonSuccess, false);
}

function OnGetServiceCancellationReasonSuccess(ServiceCancellationReasons) {
    var html = '<option value="0"></option>';
    if (ServiceCancellationReasons != undefined) {
        for (var i = 0; i < ServiceCancellationReasons.length; i++) {
            html += '<option value="' + ServiceCancellationReasons[i]['ID'] + '">' + ServiceCancellationReasons[i]['ServiceCancellationReason'] + '</option>';
        }
    }
 
    $('#cmbServiceCancellation').html(html);
   
}

FillServiceCancellationReason();


function FillOtherPaymentMethod() {
    var params = { };
    CallService('Client/SetUp/ServiceCancellationService.svc', 'GetOtherPaymentMethod', params, OnGetOtherPaymentMethodSuccess, false);
}

function OnGetOtherPaymentMethodSuccess(OtherPaymentMethods) {
    var html = '<option value="0"></option>';
    if (OtherPaymentMethods != undefined) {
        for (var i = 0; i < OtherPaymentMethods.length; i++) {
            html += '<option value="' + OtherPaymentMethods[i]['ID'] + '">' + OtherPaymentMethods[i]['OtherPaymentMethodName'] + '</option>';
        }
    }
    $('#cmbOtherPaymentMethod').html(html);
}

FillOtherPaymentMethod();

function Save() {
    var form = $("#frmEntry");
    if (form.valid()) {
        var params = {
            ServiceCancellationId: $('#hdnServiceCancellationId').val() == '' ? 0 : $('#hdnServiceCancellationId').val(),
            ClientId: $.localStorage.get('ClientId'),
            ServiceCancellationReasonId: $("#cmbServiceCancellation").val(),
            OtherReason: $("#txtReason").val(),
            OtherPaymentMethodId: $("#cmbOtherPaymentMethod").val(),
            OtherPaymentMethod: $("#txtOtherPaymentMethod").val(),
            Rating: $("#cmbRating").val(),
            ReasonOfRating: $("#txtReasonOfRating").val(),
        };
        CallService('Client/SetUp/ServiceCancellationService.svc', 'Save', params, OnServiceCancellationSaveSuccess, false);
    }
};

function OnServiceCancellationSaveSuccess(ServiceCancellationId) {
    if (ServiceCancellationId > 0) {
        alert('Service Cancellation request created successfully.')
        window.location = "/Client/Main.html#Setup";

    }
}
window.scrollTo(0, 0);