$.localStorage.removeAll();
$(document).ready(function () {  
    $('#forms-login').submit(function () {
        if ($('#txtLoginId').val().trim() == '') {
            alert('User name is required')
            $('#txtLoginId').focus();
            if (window.grecaptcha) grecaptcha.reset();
            return false;
        }
        if ($('#txtPassword').val().trim() == '') {
            alert('Password is required')
            $('#txtPassword').focus();
            if (window.grecaptcha) grecaptcha.reset();
            return false;
        }
        $(this).ajaxSubmit({
            error: function (xhr) {
                alert('Error: ' + xhr.status);
            },
            success: function (response) {
                /*if ((response == "Please select captcha") || (response == "Failed captcha verification")) {
                    alert(response);
                    if (window.grecaptcha) grecaptcha.reset();
                    return false;
                }     */
                debugger
                if (response.ClientId == undefined) {
                    alert('Invalid Username or Password')
                    $('#txtLoginId').focus();
                    if (window.grecaptcha) grecaptcha.reset();
                    return false;
                }
                else {                    
                    $.localStorage.set('UserId', response.ClientId);
                    $.localStorage.set('Token', response.Token);
                    window.location.href = '/Client/Main.html';
                    return true;
                }
            }
        });
        //Very important line, it disable the page refresh.
        return false;
    }); 
    $("#aSignUp").click(function (e) {
        window.location.href = '/Plans';
    });
    $("#aForgotPassword").click(function (e) {
        window.location.href = '/Forgot-Password';
    });
});
