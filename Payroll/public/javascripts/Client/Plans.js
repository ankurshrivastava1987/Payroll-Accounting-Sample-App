$("#optBasicMonth").change(function () {
    $('#tblBasic').removeClass('hide');
    $('#tblEnhanced').addClass('hide');
    $('#tblFullService').addClass('hide');
});
$("#optBasicYear").change(function () {
    $('#tblBasic').removeClass('hide');
    $('#tblEnhanced').addClass('hide');
    $('#tblFullService').addClass('hide');
}); 
$("#optEnhancedMonth").change(function () {
    $('#tblBasic').addClass('hide');
    $('#tblEnhanced').removeClass('hide');
    $('#tblFullService').addClass('hide');
});  
$("#optEnhancedYear").change(function () {
    $('#tblBasic').addClass('hide');
    $('#tblEnhanced').removeClass('hide');
    $('#tblFullService').addClass('hide');
});     
$("#optFullServiceMonth").change(function () {
    $('#tblBasic').addClass('hide');
    $('#tblEnhanced').addClass('hide');
    $('#tblFullService').removeClass('hide');
}); 
function FillYear()
{
    var today = new Date();
    var html = '<option value="0"></option>';
    for (var i = 0; i < 21; i++)
    {
        html += '<option value="' + (today.getFullYear() + i) + '">' + (today.getFullYear() + i) + '</option>';
    }
    $('#cmbYear').append(html);
    $('#cmbYear').val("0"); 
} 
FillYear();