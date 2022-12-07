app.page("ViewPlan", function () {
    return function (params) {
        if (parseInt(params, 10)) {
            $('#hdnPlanId').val(params);
            DisplayData();
        }
    }
}); 

function DisplayData() {
    var params = { PlanId: parseInt($('#hdnPlanId').val(), 10) };
    CallService('Admin/PlanService.svc', 'GetObject', params, OnPlanGetObjectSuccess, true);
}
function OnPlanGetObjectSuccess(dtoPlan) {
    if (dtoPlan != undefined) {
        $('#spanPlanCode').html(dtoPlan.PlanCode);
        $('#spanPlanName').html(dtoPlan.PlanName);
        $('#spanDisplayOrder').html(dtoPlan.DisplayOrder);
        $('#spanStatus').html(dtoPlan.Status);
    }
}
function FillFeatures() {
    var params = { PlanId: parseInt($('#hdnPlanId').val(), 10) };
    CallService('Admin/PlanService.svc', 'GetFeatures', params, OnFeatureGetFeaturesSuccess, true);
}

function OnFeatureGetFeaturesSuccess(features) {
    var html = '';
    if (features != undefined) {
        for (var i = 0; i < features.length; i++) {
            html += '<tr>';
            html += '<td><img src="' + CDNUrl + '/images/' + (features[i]['PlanId'] == 0? 'remove.png': 'Ok.png') + '"/></td>';
            html += '<td>' + features[i]['FeatureName'] + '</td>';
            html += '</tr>';
        }
    }
    $('#bodyFeatures').html(html);
}
FillFeatures();
function FillGrid() {
    var html = '';
    if ($('#hdnCharges').val() != "") {
        var arrCharges = $('#hdnCharges').val().split(String.fromCharCode(135));
        for (var i = 0; i < arrCharges.length; i++) {
            var arrCharge = arrCharges[i].split(String.fromCharCode(134));           
            html += '<tr>';                
            html += '<td>' + arrCharge[0] + '</td>';
            html += '<td>' + arrCharge[1] + '</td>';
            html += '<td>' + arrCharge[2] + '</td>';                
            html += '</tr>';
           
        }
    }
    $('#bodyCharges').html(html);
}
function FillPlanCharges() {
    var params = { PlanId: parseInt($('#hdnPlanId').val(), 10) };
    CallService('Admin/PlanService.svc', 'GetPlanCharges', params, OnFeatureGetPlanChargesSuccess, true);
}

function OnFeatureGetPlanChargesSuccess(Charges) {
    var i = 0;
    var planCharges = '';
    $.each(Charges, function () {       
        planCharges += FormatDateUTC(this.EffectiveDate) + String.fromCharCode(134);
        planCharges += this.AmountPerMonth.toFixed(2) + String.fromCharCode(134);
        planCharges += this.AmountPerEmployeePerMonth.toFixed(2) + String.fromCharCode(134);       
        if (i < Charges.length - 1) {
            planCharges += String.fromCharCode(135);
        }
        i++;
    });
    $('#hdnCharges').val(planCharges);
    FillGrid();
}
FillPlanCharges();
function Edit() {
    window.location = "/Admin/Main.html#Plan:" + $('#hdnPlanId').val();
}

function Close() {
    window.location = "/Admin/Main.html#ViewAllPlans";
}

socket.on('GetPlanObject', function (PlanId) {
    if ($('#hdnPlanId').val() == PlanId) {
        DisplayData();
        FillFeatures();
        FillPlanCharges();
    }
})
