CheckPageRequest();
function FillGrid() {
    var params = {
        ClientId: $.localStorage.get('ClientId')       
    };
    CallService('Client/ThingsToDo/ThingsToDoService.svc', 'GetThingsToDo', params, OnGetThingsToDoSuccess, true);
}
function OnGetThingsToDoSuccess(arrItems) {
    if (arrItems != undefined) {        
        var html = '';
        for (var i = 0; i < arrItems.length; i++) {
            html += '<tr class="' + (i % 2 == 0 ? "footable-even" : "footable-odd") + '">';           
            html += '<td>' + arrItems[i].Item + '</td>';           
            html += '</tr>';
        }
        $('#bodyItems').html(html);       
    }
}
FillGrid();
window.scrollTo(0, 0);
