var PlanFeatures;
function FillPlans() {
    var params = {};
    var Plans = CallService1('Public/PlanService.svc', 'GetAll', params);
    var params1 = {};
    var Features = CallService1('Public/FeatureService.svc', 'GetAll', params1);
    var params2 = {};
    PlanFeatures = CallService1('Public/PlanService.svc', 'GetAllFeatures', params2);
    if (Plans != undefined) {
        var html = '<div class="row">';
        for (var i = 0; i < Plans.length; i++) {
            html += '<div class="col-md-4">';
            html += '<article class="ct-pricingTable">';
            html += '<div class="ct-pricingTable-header">';
            html += '<div>';
            html += '<h5>';
            html += '<small>' + Plans[i].PlanName + '</small>';
            html += '</h5>';
            html += '<p><sup>$</sup>' + Plans[i].AmountPerMonth.toFixed(2) + '/Month</p>';
            html += '<div>';
            html += '+ $' + Plans[i].AmountPerEmployeePerMonth.toFixed(2) + '/Employee Per Month';
            html += '</div>';
            html += '</div>';
            
            html += '</div>';
            html += '<div class="ct-pricingTable-container">';
            html += '<ul class="list-unstyled">';
            for (var j = 0; j < Features.length; j++) {
                html += '<li ' + (FeatureExists(Plans[i]["PlanId"], Features[j]["FeatureId"])? 'class="active"': '') + '>';
                html += '<p style="white-space:nowrap">';
                html += '<i class="fa fa-check"></i>' + Features[j].FeatureName;
                html += '</p>';
                html += '</li>';
            }
            html += '</ul>';
            html += '</div>';
            html += '<div class="ct-pricingTable-footer">';
            html += '<a class="btn btn-motive ct-btn-block" href="javascript:void(0)" onclick="SignUp(' + Plans[i].PlanId + ')">';
            html += '<span>Sign Up Now</span>';
            html += '</a>';
            html += '</div>';
            html += '</article>';
            html += '</div>';  
        }
        html += '</div>'; 
        $('#divPlans').html(html);
    }
}
function FeatureExists(PlanId, FeatureId) {
    var Exists = false;
    for (var k = 0; k < PlanFeatures.length; k++) {
        if ((PlanId == PlanFeatures[k]["PlanId"]) && (FeatureId == PlanFeatures[k]["FeatureId"])) {
            Exists = true
            break;
        }
    }
    return Exists;
}
FillPlans();
function SignUp(PlanId) {
    window.location = '/SignUp/' + PlanId;
}