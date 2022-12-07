function FillGrid() {
    var params = {
        ClientId: $.localStorage.get('ClientId')       
    };
    CallService('Client/RuleService.svc', 'GetAll', params, OnRuleGetAllSuccess, true);
}
function OnRuleGetAllSuccess(arrRules) {
    if (arrRules != undefined) {       
        var html = '';
        var params = {ClientId: $.localStorage.get('ClientId')};
        var arrPayStubs = CallService1('Client/PayStubService.svc', 'GetLookup', params);
        for (var i = 0; i < arrRules.length; i++) {
            html += '<tr id="' + _.escape(arrRules[i].RuleId) + '" class="' + (i % 2 == 0 ? "footable-even" : "footable-odd") + '">';
            html += '<td>' + _.escape(arrRules[i].RuleName) + '</td>';
            html += '<td><select class="form-control"><option value="0"></option>';
            for (var j = 0; j < arrPayStubs.length; j++) {                
                html += '<option value="' + _.escape(arrPayStubs[j].PayStubId) + '" ' + (arrPayStubs[j].PayStubId == arrRules[i].PayStubId ? 'selected' : '') + '>' + _.escape(arrPayStubs[j].PayStubName) + '</option>';
            } 
            html += '</select></td>';
            html += '</tr>';
        }
        $('#bodyRules').html(html);       
    }
}
FillGrid();
function Save()
{
    var Rules = '';
    var i = 0;
    $('#bodyRules tr').each(function () {
        Rules += $(this).context['id'] + String.fromCharCode(134);
        Rules += $(this).find('td select').val();
        if (i < $('#bodyRules tr').length-1) {
            Rules += String.fromCharCode(135);
        }
        i++;
    });
    var params = {       
        ClientId: $.localStorage.get('ClientId'),
        Rules: Rules
    };
    CallService('Client/RuleService.svc', 'Save', params, OnRuleSaveSuccess, false);
}


function OnRuleSaveSuccess(response) {
    if (response) {
        window.location = "/Client/Dashboard";
    }
}

function Close() {
    window.location = "/Client/Dashboard";
}
//socket.on('GetRulePage', function () {
//    FillGrid();
//})

