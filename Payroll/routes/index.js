var express = require('express');
var router = express.Router();

/* GET home page. */
var Home = require('../controllers/Public/Home');
router.get('/', Home.HomePage);

var Plans = require('../controllers/Public/Plans');
router.get('/Plans', Plans.PlansPage);

//var AboutUs = require('../controllers/Public/AboutUs');
//router.get('/About-Us', AboutUs.AboutUsPage);

var OurMission = require('../controllers/Public/OurMission');
router.get('/Our-Mission', OurMission.OurMissionPage);

var OurVision = require('../controllers/Public/OurVision');
router.get('/Our-Vision', OurVision.OurVisionPage);

var Careers = require('../controllers/Public/Careers');
router.get('/Careers', Careers.CareersPage);

var PrivacyPolicy = require('../controllers/Public/PrivacyPolicy');
router.get('/Privacy-Policy', PrivacyPolicy.PrivacyPolicyPage);

var FAQs = require('../controllers/Public/FAQs');
router.get('/FAQs', FAQs.FAQsPage);

var Press = require('../controllers/Public/Press');
router.get('/Press', Press.PressPage);

var TermsAndConditions = require('../controllers/Public/TermsAndConditions');
router.get('/Terms-And-Conditions', TermsAndConditions.TermsAndConditionsPage);

var ContactUs = require('../controllers/Public/ContactUs');
router.get('/Contact-Us', ContactUs.ContactUsPage);

var Testimonials = require('../controllers/Public/Testimonials');
router.get('/Testimonials', Testimonials.TestimonialsPage);

var SignUp = require('../controllers/Public/SignUp');
router.get('/SignUp/:PlanId/:PlanType', SignUp.SignUpPage);

var ThankYou = require('../controllers/Public/ThankYou');
router.get('/Thank-You', ThankYou.ThankYouPage);

var ThankYouActivation = require('../controllers/Public/ThankYouActivation');
router.get('/Thank-You-Activation', ThankYouActivation.ThankYouActivationPage);

var ForgotPassword = require('../controllers/Public/ForgotPassword');
router.get('/Forgot-Password', ForgotPassword.ForgotPasswordPage);

var ResetPassword = require('../controllers/Public/ResetPassword');
router.get('/Reset-Password', ResetPassword.ResetPasswordPage);

var BasicPayroll = require('../controllers/Public/BasicPayroll');
router.get('/Basic-Payroll', BasicPayroll.BasicPayrollPage);

var EnhancedPayroll = require('../controllers/Public/EnhancedPayroll');
router.get('/Enhanced-Payroll', EnhancedPayroll.EnhancedPayrollPage);

var FullServicePayroll = require('../controllers/Public/FullServicePayroll');
router.get('/Full-Service-Payroll', FullServicePayroll.FullServicePayrollPage);

var EFile1099 = require('../controllers/Public/EFile1099');
router.get('/EFile-1099', EFile1099.EFile1099Page);

var LearnPayroll = require('../controllers/Public/LearnPayroll');
router.get('/Learn-Payroll', LearnPayroll.LearnPayrollPage);

var HiringEmployees = require('../controllers/Public/HiringEmployees');
router.get('/Hiring-Employees', HiringEmployees.HiringEmployeesPage);

var PayrollTaxForms = require('../controllers/Public/PayrollTaxForms');
router.get('/Payroll-Tax-Forms', PayrollTaxForms.PayrollTaxFormsPage);

var W2Form = require('../controllers/Public/W2Form');
router.get('/W2-Form', W2Form.W2FormPage);


var Login = require('../controllers/Admin/Login');
router.get('/Admin/Login', Login.LoginPage);
//router.post('/LoginService.svc/LoginMe', Login.LoginMe);

var Logout = require('../controllers/Admin/Logout');
router.get('/Admin/Logout', Logout.LogoutPage);

var Dashboard = require('../controllers/Admin/Dashboard');
router.get('/Admin/Dashboard', Dashboard.DashboardPage);

//client section
var ClientAboutUs = require('../controllers/Client/AboutUs');
router.get('/Client/About-Us', ClientAboutUs.AboutUsPage);

var ClientOurMission = require('../controllers/Client/OurMission');
router.get('/Client/Our-Mission', ClientOurMission.OurMissionPage);

var ClientOurVision = require('../controllers/Client/OurVision');
router.get('/Client/Our-Vision', ClientOurVision.OurVisionPage);

var ClientCareers = require('../controllers/Client/Careers');
router.get('/Client/Careers', ClientCareers.CareersPage);

var ClientPrivacyPolicy = require('../controllers/Client/PrivacyPolicy');
router.get('/Client/Privacy-Policy', ClientPrivacyPolicy.PrivacyPolicyPage);

var ClientFAQs = require('../controllers/Client/FAQs');
router.get('/Client/FAQs', ClientFAQs.FAQsPage);

var ClientPress = require('../controllers/Client/Press');
router.get('/Client/Press', ClientPress.PressPage);

var ClientTermsAndConditions = require('../controllers/Client/TermsAndConditions');
router.get('/Client/Terms-And-Conditions', ClientTermsAndConditions.TermsAndConditionsPage);

var ClientContactUs = require('../controllers/Client/ContactUs');
router.get('/Client/Contact-Us', ClientContactUs.ContactUsPage);

var ClientTestimonials = require('../controllers/Client/Testimonials');
router.get('/Client/Testimonials', ClientTestimonials.TestimonialsPage);

var ClientLogin = require('../controllers/Client/Login');
router.get('/Client/Login', ClientLogin.LoginPage);
//router.post('/ClientLoginService.svc/LoginMe', ClientLogin.LoginMe);


router.post('/AdminLogin', function (req, res) {
    //var request = require('request');
    //// g-recaptcha-response is the key that browser will generate upon form submit.
    //// if its blank or null means user has not selected the captcha, so return the error.
    //if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    //    return res.json("Please select captcha");
    //}
    //// Put your secret key here.
    //var secretKey = "6Lc2QAkUAAAAAEamc9rAkMbryTPd9Dh87sss-_jr";
    //// req.connection.remoteAddress will provide IP address of connected user.
    //var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    //// Hitting GET request to the URL, Google will respond with success or error scenario.
    //request(verificationUrl, function (error, response, body) {
    //    body = JSON.parse(body);
    //    // Success will be true or false depending upon captcha validation.
    //    if (body.success !== undefined && !body.success) {
    //        return res.json("Failed captcha verification");
    //    }
        requestify.post(Configuration.APIUrl + '/Payroll.Services/Public/UserService.svc/ValidateUser', {
            LoginId: req.body.txtLoginId,
            Password: req.body.txtPassword
        }).then(function (response) {
            body = response.getBody();
            req.session.UserId = body.UserId;
            req.session.UserType = 'Admin';
            req.session.Token = body.Token;
            res.json(body);
            }).fail(function (response) {
                var body = response.getBody(); // Some error code such as, for example, 404 
                return res.json(body.message);
            });
    //});
});

router.post('/ClientLogin', function (req, res) {
    //var request = require('request');
    //// g-recaptcha-response is the key that browser will generate upon form submit.
    //// if its blank or null means user has not selected the captcha, so return the error.
    //if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    //    return res.json("Please select captcha");
    //}
    //// Put your secret key here.
    //var secretKey = "6Lc2QAkUAAAAAEamc9rAkMbryTPd9Dh87sss-_jr";
    //// req.connection.remoteAddress will provide IP address of connected user.
    //var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    //// Hitting GET request to the URL, Google will respond with success or error scenario.
    //request(verificationUrl, function (error, response, body) {
    //    body = JSON.parse(body);
    //    // Success will be true or false depending upon captcha validation.
    //    if (body.success !== undefined && !body.success) {
    //        return res.json("Failed captcha verification");
    //    }
        //res.json("Success");
    //debugger
        requestify.post(Configuration.APIUrl + '/Payroll.Services/Public/ClientService.svc/ValidateClient', {           
            LoginId: req.body.txtLoginId,
            Password: req.body.txtPassword           
        }).then(function (response) {
            body = response.getBody();
            req.session.UserId = body.ClientId;
            req.session.UserType = 'Client';
            req.session.Token = body.Token;
            res.json(body);
            }).fail(function (response) {
                var body = response.getBody(); // Some error code such as, for example, 404 
                return res.json(body.message);
            });
    //});
});
var ClientLogout = require('../controllers/Client/Logout');
router.get('/Client/Logout', ClientLogout.LogoutPage);

var ClientDashboard = require('../controllers/Client/Dashboard');
router.get('/Client/Dashboard', ClientDashboard.DashboardPage);

var ClientSetSession = require('../controllers/Client/SetSession');
router.get('/Client/SetSession', ClientSetSession.SetSessionPage);

var ClientMyProfile = require('../controllers/Client/MyProfile');
router.get('/Client/MyProfile', ClientMyProfile.MyProfilePage);

var ClientChangePassword = require('../controllers/Client/ChangePassword');
router.get('/Client/ChangePassword', ClientChangePassword.ChangePasswordPage);


var ClientSetSession = require('../controllers/Client/SetSession');
router.get('/Client/SetSession', ClientSetSession.SetSessionPage);

var ClientClient = require('../controllers/Client/Client/Client');
router.get('/Client/Client/ViewAllClients', ClientClient.ViewAllClients);
router.get('/Client/Client/ViewClient/:ClientId', ClientClient.ViewClient);
router.get('/Client/Client/EditClient/:ClientId', ClientClient.EditClient);
router.get('/Client/Client/AddClient', ClientClient.AddClient);

var ClientContractor = require('../controllers/Client/Contractor/Contractor');
router.get('/Client/Contractor/ViewAllContractors', ClientContractor.ViewAllContractors);
router.get('/Client/Contractor/ViewContractor/:ContractorId', ClientContractor.ViewContractor);
router.get('/Client/Contractor/EditContractor/:ContractorId', ClientContractor.EditContractor);
router.get('/Client/Contractor/AddContractor', ClientContractor.AddContractor);

var ClientPriorTaxPayment = require('../controllers/Client/TaxesAndForms/PriorTaxPayment');
router.get('/Client/TaxesAndForms/AddPriorTaxPayment', ClientPriorTaxPayment.AddPriorTaxPayment);
router.get('/Client/TaxesAndForms/ViewAllPriorTaxPayment', ClientPriorTaxPayment.ViewAllPriorTaxPayment);
router.get('/Client/TaxesAndForms/ViewPriorTaxPayment/:PriorTaxPaymentId', ClientPriorTaxPayment.ViewPriorTaxPayment);
router.get('/Client/TaxesAndForms/EditPriorTaxPayment/:PriorTaxPaymentId', ClientPriorTaxPayment.EditPriorTaxPayment);

var ClientSetUp = require('../controllers/Client/SetUp/SetUp');
router.get('/Client/SetUp/ViewSetUpLink', ClientSetUp.ViewSetUpLink)

var ClientServiceCancellation = require('../controllers/Client/SetUp/ServiceCancellation/ServiceCancellation');
router.get('/Client/SetUp/ServiceCancellation/CreateServiceCancellation', ClientServiceCancellation.CreateServiceCancellation);

var ClientEmployee = require('../controllers/Client/Employee/Employee');
router.get('/Client/Employee/ViewAllEmployees', ClientEmployee.ViewAllEmployees);
router.get('/Client/Employee/ViewEmployee/:EmployeeId', ClientEmployee.ViewEmployee);
router.get('/Client/Employee/EditEmployee/:EmployeeId', ClientEmployee.EditEmployee);
router.get('/Client/Employee/AddEmployee', ClientEmployee.AddEmployee);

var ClientPayStub = require('../controllers/Client/PayStub/PayStub');
router.get('/Client/PayStub/ViewAllPayStubs', ClientPayStub.ViewAllPayStubs);
router.get('/Client/PayStub/ViewPayStub/:PayStubId', ClientPayStub.ViewPayStub);
router.get('/Client/PayStub/EditPayStub/:PayStubId', ClientPayStub.EditPayStub);
router.get('/Client/PayStub/AddPayStub', ClientPayStub.AddPayStub);

var ClientClientTaxSetup = require('../controllers/Client/ClientTaxSetup/ClientTaxSetup');
router.get('/Client/ClientTaxSetup/ViewAllClientTaxSetups', ClientClientTaxSetup.ViewAllClientTaxSetups);
router.get('/Client/ClientTaxSetup/ViewClientTaxSetup/:ClientTaxSetupId', ClientClientTaxSetup.ViewClientTaxSetup);
router.get('/Client/ClientTaxSetup/EditClientTaxSetup/:ClientTaxSetupId', ClientClientTaxSetup.EditClientTaxSetup);
router.get('/Client/ClientTaxSetup/AddClientTaxSetup', ClientClientTaxSetup.AddClientTaxSetup);

var ClientRule = require('../controllers/Client/Rule/Rule');
router.get('/Client/Rule/ViewAllRules', ClientRule.ViewAllRules);

var ClientReportsMenu = require('../controllers/Client/Reports/ReportsMenu');
router.get('/Client/Reports/ViewEmployeeReportsMenu', ClientReportsMenu.ViewEmployeeReportsMenu);
router.get('/Client/Reports/ViewEmployerReportsMenu', ClientReportsMenu.ViewEmployerReportsMenu);

var ClientEmployeeReports = require('../controllers/Client/Reports/EmployeeReports/EmployeeReports');
router.get('/Client/Reports/EmployeeReports/ViewDirectory', ClientEmployeeReports.ViewDirectory);
router.get('/Client/Reports/EmployeeReports/ViewEmployeeDetails', ClientEmployeeReports.ViewEmployeeDetails);
router.get('/Client/Reports/EmployeeReports/ViewLastPayCheck', ClientEmployeeReports.ViewLastPayCheck);
router.get('/Client/Reports/EmployeeReports/PayrollSummary', ClientEmployeeReports.PayrollSummary);  //Added by ankur 13-oct 2017
router.get('/Client/Reports/EmployeeReports/PayrollDetails', ClientEmployeeReports.PayrollDetails); //Added by ankur 15-oct 2017

var ClientEmployerReports = require('../controllers/Client/Reports/EmployerReports/EmployerReports');
router.get('/Client/Reports/EmployerReports/ViewTaxLiability', ClientEmployerReports.ViewTaxLiability);
router.get('/Client/Reports/EmployerReports/ViewTaxWageSummary', ClientEmployerReports.ViewTaxWageSummary);
router.get('/Client/Reports/EmployerReports/ViewTaxWageDetail/:TaxId/:StateId', ClientEmployerReports.ViewTaxWageDetail);
router.get('/Client/Reports/EmployerReports/ViewTotalPay', ClientEmployerReports.ViewTotalPay);
router.get('/Client/Reports/EmployerReports/ViewTotalCost', ClientEmployerReports.ViewTotalCost);
router.get('/Client/Reports/EmployerReports/ViewBillingSummary', ClientEmployerReports.ViewBillingSummary);
router.get('/Client/Reports/EmployerReports/ViewDeductionsAndContributions', ClientEmployerReports.ViewDeductionsAndContributions);

var ClientDepartment = require('../controllers/Client/Department/Department');
router.get('/Client/Department/ViewAllDepartments', ClientDepartment.ViewAllDepartments);
router.get('/Client/Department/ViewDepartment/:DepartmentId', ClientDepartment.ViewDepartment);
router.get('/Client/Department/EditDepartment/:DepartmentId', ClientDepartment.EditDepartment);
router.get('/Client/Department/AddDepartment', ClientDepartment.AddDepartment);

var ClientCompensationClass = require('../controllers/Client/CompensationClass/CompensationClass');
router.get('/Client/CompensationClass/ViewAllCompensationClasses', ClientCompensationClass.ViewAllCompensationClasses);
router.get('/Client/CompensationClass/ViewCompensationClass/:CompensationClassId', ClientCompensationClass.ViewCompensationClass);
router.get('/Client/CompensationClass/EditCompensationClass/:CompensationClassId', ClientCompensationClass.EditCompensationClass);
router.get('/Client/CompensationClass/AddCompensationClass', ClientCompensationClass.AddCompensationClass);

var ClientLocation = require('../controllers/Client/Location/Location');
router.get('/Client/Location/ViewAllLocations', ClientLocation.ViewAllLocations);
router.get('/Client/Location/ViewLocation/:LocationId', ClientLocation.ViewLocation);
router.get('/Client/Location/EditLocation/:LocationId', ClientLocation.EditLocation);
router.get('/Client/Location/AddLocation', ClientLocation.AddLocation);

var PaySchedule = require('../controllers/Client/PaySchedule/PaySchedule');
router.get('/Client/PaySchedule/ViewAllPaySchedules', PaySchedule.ViewAllPaySchedules);
router.get('/Client/PaySchedule/ViewPaySchedule/:PayScheduleId', PaySchedule.ViewPaySchedule);
router.get('/Client/PaySchedule/EditPaySchedule/:PayScheduleId', PaySchedule.EditPaySchedule);
router.get('/Client/PaySchedule/AddPaySchedule', PaySchedule.AddPaySchedule);

var ClientPayCheck = require('../controllers/Client/PayCheck/PayCheck');
router.get('/Client/PayCheck/ViewAllPayChecks', ClientPayCheck.ViewAllPayChecks);
router.get('/Client/PayCheck/ViewPayCheck/:PayCheckId', ClientPayCheck.ViewPayCheck);
router.get('/Client/PayCheck/EditPayCheck/:PayCheckId', ClientPayCheck.EditPayCheck);
router.get('/Client/PayCheck/AddPayCheck', ClientPayCheck.AddPayCheck);

var ClientPlans = require('../controllers/Client/Plans');
router.get('/Client/Plans', ClientPlans.PlansPage);

var dalClientClient = require('../api/Client/Client');
router.post('/Payroll.Services/Client/ClientService.svc/Save', dalClientClient.Save);
router.post('/Payroll.Services/Client/ClientService.svc/GetPage', dalClientClient.GetPage);
router.post('/Payroll.Services/Client/ClientService.svc/Exists', dalClientClient.Exists);
router.post('/Payroll.Services/Client/ClientService.svc/Exists1', dalClientClient.Exists1);
router.post('/Payroll.Services/Client/ClientService.svc/Delete', dalClientClient.Delete);
router.post('/Payroll.Services/Client/ClientService.svc/Deletable', dalClientClient.Deletable);
router.post('/Payroll.Services/Client/ClientService.svc/GetObject', dalClientClient.GetObject);
router.post('/Payroll.Services/Client/ClientService.svc/GetObject1', dalClientClient.GetObject1);
router.post('/Payroll.Services/Client/ClientService.svc/GetLookup', dalClientClient.GetLookup);
//router.post('/Payroll.Services/Client/ClientService.svc/ValidateClient', dalClientClient.ValidateClient);
router.post('/Payroll.Services/Client/ClientService.svc/ValidatePassword', dalClientClient.ValidatePassword);
router.get('/Payroll.Services/Client/ClientService.svc/Download/:file(*)', dalClientClient.DownloadFile);
router.post('/Payroll.Services/Client/ClientService.svc/Upload', dalClientClient.UploadFile);

var dalClientEmployee = require('../api/Client/Employee');
router.post('/Payroll.Services/Client/EmployeeService.svc/Save', dalClientEmployee.Save);
router.post('/Payroll.Services/Client/EmployeeService.svc/GetPage', dalClientEmployee.GetPage);
router.post('/Payroll.Services/Client/EmployeeService.svc/Delete', dalClientEmployee.Delete);
router.post('/Payroll.Services/Client/EmployeeService.svc/Deletable', dalClientEmployee.Deletable);
router.post('/Payroll.Services/Client/EmployeeService.svc/GetObject', dalClientEmployee.GetObject);
router.post('/Payroll.Services/Client/EmployeeService.svc/Exists', dalClientEmployee.Exists);
router.post('/Payroll.Services/Client/EmployeeService.svc/Exists1', dalClientEmployee.Exists1);
router.post('/Payroll.Services/Client/EmployeeService.svc/GetLookup', dalClientEmployee.GetLookup);
router.post('/Payroll.Services/Client/EmployeeService.svc/GetEmployeeFederalTaxes', dalClientEmployee.GetEmployeeFederalTaxes);
router.post('/Payroll.Services/Client/EmployeeService.svc/GetEmployeeStateTaxes', dalClientEmployee.GetEmployeeStateTaxes);
router.post('/Payroll.Services/Client/EmployeeService.svc/GetEmployeeCompensations', dalClientEmployee.GetEmployeeCompensations);
router.post('/Payroll.Services/Client/EmployeeService.svc/GetEmployeeSummaries', dalClientEmployee.GetEmployeeSummaries);
router.post('/Payroll.Services/Client/EmployeeService.svc/Upload', dalClientEmployee.UploadFile);
router.post('/Payroll.Services/Client/EmployeeService.svc/GetFiles', dalClientEmployee.GetFiles);
router.post('/Payroll.Services/Client/EmployeeService.svc/CreateFolder', dalClientEmployee.CreateFolder);
router.post('/Payroll.Services/Client/EmployeeService.svc/RenameFile', dalClientEmployee.RenameFile);
router.post('/Payroll.Services/Client/EmployeeService.svc/DeleteFile', dalClientEmployee.DeleteFile);
router.post('/Payroll.Services/Client/EmployeeService.svc/DeleteFolder', dalClientEmployee.DeleteFolder);
router.get('/Payroll.Services/Client/EmployeeService.svc/Download/:file(*)', dalClientEmployee.DownloadFile);
router.post('/Payroll.Services/Client/EmployeeService.svc/GetDirectoryPDF', dalClientEmployee.GetDirectoryPDF);
router.post('/Payroll.Services/Client/EmployeeService.svc/GetEmployeeDetailsPDF', dalClientEmployee.GetEmployeeDetailsPDF);
router.post('/Payroll.Services/Client/EmployeeService.svc/GetEmployeePayStubs', dalClientEmployee.GetEmployeePayStubs);
router.post('/Payroll.Services/Client/EmployeeService.svc/GetByPayScheduleId', dalClientEmployee.GetByPayScheduleId);
router.post('/Payroll.Services/Client/EmployeeService.svc/GetByPayStubCode', dalClientEmployee.GetByPayStubCode);
router.post('/Payroll.Services/Client/EmployeeService.svc/ImportEmployee', dalClientEmployee.ImportEmployee);
router.post('/Payroll.Services/Client/EmployeeService.svc/ExportEmployee', dalClientEmployee.ExportEmployee);


var dalClientPayType = require('../api/Client/PayType');
router.post('/Payroll.Services/Client/PayTypeService.svc/Save', dalClientPayType.Save);
router.post('/Payroll.Services/Client/PayTypeService.svc/GetPage', dalClientPayType.GetPage);
router.post('/Payroll.Services/Client/PayTypeService.svc/Exists', dalClientPayType.Exists);
router.post('/Payroll.Services/Client/PayTypeService.svc/Delete', dalClientPayType.Delete);
router.post('/Payroll.Services/Client/PayTypeService.svc/Deletable', dalClientPayType.Deletable);
router.post('/Payroll.Services/Client/PayTypeService.svc/GetObject', dalClientPayType.GetObject);
router.post('/Payroll.Services/Client/PayTypeService.svc/GetLookup', dalClientPayType.GetLookup);

var dalClientContractor = require('../api/Client/Contractor/Contractor');
router.post('/Payroll.Services/Client/Contractor/ContractorService.svc/Save', dalClientContractor.Save);
router.post('/Payroll.Services/Client/Contractor/ContractorService.svc/GetPage', dalClientContractor.GetPage);
router.post('/Payroll.Services/Client/Contractor/ContractorService.svc/Exists', dalClientContractor.Exists);
router.post('/Payroll.Services/Client/Contractor/ContractorService.svc/Delete', dalClientContractor.Delete);
router.post('/Payroll.Services/Client/Contractor/ContractorService.svc/Deletable', dalClientContractor.Deletable);
router.post('/Payroll.Services/Client/Contractor/ContractorService.svc/GetObject', dalClientContractor.GetObject);
router.post('/Payroll.Services/Client/Contractor/ContractorService.svc/GetLookup', dalClientContractor.GetLookup);
router.post('/Payroll.Services/Client/Contractor/ContractorService.svc/GetCount', dalClientContractor.GetCount);

var dalClientPriorTaxPayment = require('../api/Client/TaxesAndForms/PriorTaxPayment');
router.post('/Payroll.Services/Client/TaxesAndForms/PriorTaxPaymentService.svc/Save', dalClientPriorTaxPayment.Save);
router.post('/Payroll.Services/Client/TaxesAndForms/PriorTaxPaymentService.svc/GetPage', dalClientPriorTaxPayment.GetPage);
router.post('/Payroll.Services/Client/TaxesAndForms/PriorTaxPaymentService.svc/Exists', dalClientPriorTaxPayment.Exists);
router.post('/Payroll.Services/Client/TaxesAndForms/PriorTaxPaymentService.svc/Delete', dalClientPriorTaxPayment.Delete);
router.post('/Payroll.Services/Client/TaxesAndForms/PriorTaxPaymentService.svc/Deletable', dalClientPriorTaxPayment.Deletable);
router.post('/Payroll.Services/Client/TaxesAndForms/PriorTaxPaymentService.svc/GetObject', dalClientPriorTaxPayment.GetObject);

var dalClientServiceCancellation = require('../api/Client/SetUp/ServiceCancellation/ServiceCancellation');
router.post('/Payroll.Services/Client/SetUp/ServiceCancellationService.svc/Save', dalClientServiceCancellation.Save);
router.post('/Payroll.Services/Client/SetUp/ServiceCancellationService.svc/GetServiceCancellationReason', dalClientServiceCancellation.GetServiceCancellationReason);
router.post('/Payroll.Services/Client/SetUp/ServiceCancellationService.svc/GetOtherPaymentMethod', dalClientServiceCancellation.GetOtherPaymentMethod);

var dalClientLeave = require('../api/Client/SetUp/Leave/Leave');
router.post('/Payroll.Services/Client/SetUp/Leave/LeaveService.svc/Save', dalClientLeave.Save);
router.post('/Payroll.Services/Client/SetUp/Leave/LeaveService.svc/Delete', dalClientLeave.Delete);
router.post('/Payroll.Services/Client/SetUp/Leave/LeaveService.svc/GetObject', dalClientLeave.GetObject);
router.post('/Payroll.Services/Client/SetUp/Leave/LeaveService.svc/GetPage', dalClientLeave.GetPage);
router.post('/Payroll.Services/Client/SetUp/Leave/LeaveService.svc/Exists', dalClientLeave.Exists);
router.post('/Payroll.Services/Client/SetUp/Leave/LeaveService.svc/Deletable', dalClientLeave.Deletable);


var dalClientAccountType = require('../api/Client/AccountType');
router.post('/Payroll.Services/Client/AccountTypeService.svc/Save', dalClientAccountType.Save);
router.post('/Payroll.Services/Client/AccountTypeService.svc/GetPage', dalClientAccountType.GetPage);
router.post('/Payroll.Services/Client/AccountTypeService.svc/Exists', dalClientAccountType.Exists);
router.post('/Payroll.Services/Client/AccountTypeService.svc/Delete', dalClientAccountType.Delete);
router.post('/Payroll.Services/Client/AccountTypeService.svc/Deletable', dalClientAccountType.Deletable);
router.post('/Payroll.Services/Client/AccountTypeService.svc/GetObject', dalClientAccountType.GetObject);
router.post('/Payroll.Services/Client/AccountTypeService.svc/GetLookup', dalClientAccountType.GetLookup);

var dalClientFederalFilingStatus = require('../api/Client/FederalFilingStatus');
router.post('/Payroll.Services/Client/FederalFilingStatusService.svc/GetLookup', dalClientFederalFilingStatus.GetLookup);

var dalClientFilingStatus = require('../api/Client/FilingStatus');
router.post('/Payroll.Services/Client/FilingStatusService.svc/GetLookup', dalClientFilingStatus.GetLookup);

var dalClientRuleGroup = require('../api/Client/RuleGroup');
router.post('/Payroll.Services/Client/RuleGroupService.svc/Save', dalClientRuleGroup.Save);
router.post('/Payroll.Services/Client/RuleGroupService.svc/GetPage', dalClientRuleGroup.GetPage);
router.post('/Payroll.Services/Client/RuleGroupService.svc/Exists', dalClientRuleGroup.Exists);
router.post('/Payroll.Services/Client/RuleGroupService.svc/Delete', dalClientRuleGroup.Delete);
router.post('/Payroll.Services/Client/RuleGroupService.svc/Deletable', dalClientRuleGroup.Deletable);
router.post('/Payroll.Services/Client/RuleGroupService.svc/GetObject', dalClientRuleGroup.GetObject);
router.post('/Payroll.Services/Client/RuleGroupService.svc/GetLookup', dalClientRuleGroup.GetLookup);

var dalClientPayStub = require('../api/Client/PayStub');
router.post('/Payroll.Services/Client/PayStubService.svc/Save', dalClientPayStub.Save);
router.post('/Payroll.Services/Client/PayStubService.svc/GetPage', dalClientPayStub.GetPage);
router.post('/Payroll.Services/Client/PayStubService.svc/Exists', dalClientPayStub.Exists);
router.post('/Payroll.Services/Client/PayStubService.svc/Delete', dalClientPayStub.Delete);
router.post('/Payroll.Services/Client/PayStubService.svc/Deletable', dalClientPayStub.Deletable);
router.post('/Payroll.Services/Client/PayStubService.svc/GetObject', dalClientPayStub.GetObject);
router.post('/Payroll.Services/Client/PayStubService.svc/GetLookup', dalClientPayStub.GetLookup);
router.post('/Payroll.Services/Client/PayStubService.svc/GetByPayScheduleId', dalClientPayStub.GetByPayScheduleId);
router.post('/Payroll.Services/Client/PayStubService.svc/GetByPayStubCode', dalClientPayStub.GetByPayStubCode);
router.post('/Payroll.Services/Client/PayStubService.svc/GetEmployeePayStubAll', dalClientPayStub.GetEmployeePayStubAll);
router.post('/Payroll.Services/Client/PayStubService.svc/GetByEmployeeIdPayStubs', dalClientPayStub.GetByEmployeeIdPayStubs);

var dalClientClientTaxSetup = require('../api/Client/ClientTaxSetup');
router.post('/Payroll.Services/Client/ClientTaxSetupService.svc/Save', dalClientClientTaxSetup.Save);
router.post('/Payroll.Services/Client/ClientTaxSetupService.svc/GetPage', dalClientClientTaxSetup.GetPage);
router.post('/Payroll.Services/Client/ClientTaxSetupService.svc/Delete', dalClientClientTaxSetup.Delete);
router.post('/Payroll.Services/Client/ClientTaxSetupService.svc/Deletable', dalClientClientTaxSetup.Deletable);
router.post('/Payroll.Services/Client/ClientTaxSetupService.svc/GetObject', dalClientClientTaxSetup.GetObject);

var dalClientPayCheck = require('../api/Client/PayCheck');
router.post('/Payroll.Services/Client/PayCheckService.svc/Save', dalClientPayCheck.Save);
router.post('/Payroll.Services/Client/PayCheckService.svc/GetPage', dalClientPayCheck.GetPage);
router.post('/Payroll.Services/Client/PayCheckService.svc/Delete', dalClientPayCheck.Delete);
router.post('/Payroll.Services/Client/PayCheckService.svc/Deletable', dalClientPayCheck.Deletable);
router.post('/Payroll.Services/Client/PayCheckService.svc/GetObject', dalClientPayCheck.GetObject);
router.post('/Payroll.Services/Client/PayCheckService.svc/GetObjectContractor', dalClientPayCheck.GetObjectContractor);
router.post('/Payroll.Services/Client/PayCheckService.svc/GetPayPeriod', dalClientPayCheck.GetPayPeriod);
router.post('/Payroll.Services/Client/PayCheckService.svc/GetFederalTax', dalClientPayCheck.GetFederalTax);
router.post('/Payroll.Services/Client/PayCheckService.svc/GetStateTax', dalClientPayCheck.GetStateTax);
router.post('/Payroll.Services/Client/PayCheckService.svc/GetDetail', dalClientPayCheck.GetDetail);
router.post('/Payroll.Services/Client/PayCheckService.svc/GetTax', dalClientPayCheck.GetTax);
router.post('/Payroll.Services/Client/PayCheckService.svc/GetTaxLiability', dalClientPayCheck.GetTaxLiability);
router.post('/Payroll.Services/Client/PayCheckService.svc/GetTaxLiabilityPDF', dalClientPayCheck.GetTaxLiabilityPDF);
router.post('/Payroll.Services/Client/PayCheckService.svc/GetTaxWageSummary', dalClientPayCheck.GetTaxWageSummary);
router.post('/Payroll.Services/Client/PayCheckService.svc/GetTaxWageSummaryPDF', dalClientPayCheck.GetTaxWageSummaryPDF);
router.post('/Payroll.Services/Client/PayCheckService.svc/GetTaxWageDetail', dalClientPayCheck.GetTaxWageDetail);
router.post('/Payroll.Services/Client/PayCheckService.svc/GetTotalPay', dalClientPayCheck.GetTotalPay);
router.post('/Payroll.Services/Client/PayCheckService.svc/GetObjectLastPayCheck', dalClientPayCheck.GetObjectLastPayCheck);
router.post('/Payroll.Services/Client/PayCheckService.svc/GetTotalCost', dalClientPayCheck.GetTotalCost);
router.post('/Payroll.Services/Client/PayCheckService.svc/GetPayCheckPDF', dalClientPayCheck.GetPayCheckPDF);
router.post('/Payroll.Services/Client/PayCheckService.svc/GetSUITax', dalClientPayCheck.GetSUITax);
router.post('/Payroll.Services/Client/PayCheckService.svc/GetObjectMain', dalClientPayCheck.GetObjectMain);
router.post('/Payroll.Services/Client/PayCheckService.svc/GetUnApprovedPayCheck', dalClientPayCheck.GetUnApprovedPayCheck);
router.post('/Payroll.Services/Client/PayCheckService.svc/Approve', dalClientPayCheck.Approve);
router.post('/Payroll.Services/Client/PayCheckService.svc/GetPayCheckList', dalClientPayCheck.GetPayCheckList);
router.post('/Payroll.Services/Client/PayCheckService.svc/SaveCheckNo', dalClientPayCheck.SaveCheckNo);

var dalClientEmployerReportsDeductionsAndContributions = require('../api/Client/Reports/EmployerReports/DeductionsAndContributions');
router.post('/Payroll.Services/Client/Reports/EmployerReports/DeductionsAndContributions.svc/DeductionsAndContributions', dalClientEmployerReportsDeductionsAndContributions.DeductionsAndContributions);

var dalClientEmployerReportsBilling = require('../api/Client/Reports/EmployerReports/BillingSummary');
router.post('/Payroll.Services/Client/Reports/EmployerReports/BillingSummary.svc/BillingSummary', dalClientEmployerReportsBilling.BillingSummary);

var dalClientRule = require('../api/Client/Rule');
router.post('/Payroll.Services/Client/RuleService.svc/GetAll', dalClientRule.GetAll);
router.post('/Payroll.Services/Client/RuleService.svc/Save', dalClientRule.Save);

var dalClientPaySchedule = require('../api/Client/PaySchedule');
router.post('/Payroll.Services/Client/PayScheduleService.svc/Save', dalClientPaySchedule.Save);
router.post('/Payroll.Services/Client/PayScheduleService.svc/GetPage', dalClientPaySchedule.GetPage);
router.post('/Payroll.Services/Client/PayScheduleService.svc/Exists', dalClientPaySchedule.Exists);
router.post('/Payroll.Services/Client/PayScheduleService.svc/Delete', dalClientPaySchedule.Delete);
router.post('/Payroll.Services/Client/PayScheduleService.svc/Deletable', dalClientPaySchedule.Deletable);
router.post('/Payroll.Services/Client/PayScheduleService.svc/GetObject', dalClientPaySchedule.GetObject);
router.post('/Payroll.Services/Client/PayScheduleService.svc/GetLookup', dalClientPaySchedule.GetLookup);

var dalClientDepartment = require('../api/Client/Department');
router.post('/Payroll.Services/Client/DepartmentService.svc/Save', dalClientDepartment.Save);
router.post('/Payroll.Services/Client/DepartmentService.svc/GetPage', dalClientDepartment.GetPage);
router.post('/Payroll.Services/Client/DepartmentService.svc/Exists', dalClientDepartment.Exists);
router.post('/Payroll.Services/Client/DepartmentService.svc/Delete', dalClientDepartment.Delete);
router.post('/Payroll.Services/Client/DepartmentService.svc/Deletable', dalClientDepartment.Deletable);
router.post('/Payroll.Services/Client/DepartmentService.svc/GetObject', dalClientDepartment.GetObject);
router.post('/Payroll.Services/Client/DepartmentService.svc/GetLookup', dalClientDepartment.GetLookup);

var dalClientCompensationClass = require('../api/Client/CompensationClass');
router.post('/Payroll.Services/Client/CompensationClassService.svc/Save', dalClientCompensationClass.Save);
router.post('/Payroll.Services/Client/CompensationClassService.svc/GetPage', dalClientCompensationClass.GetPage);
router.post('/Payroll.Services/Client/CompensationClassService.svc/Exists', dalClientCompensationClass.Exists);
router.post('/Payroll.Services/Client/CompensationClassService.svc/Delete', dalClientCompensationClass.Delete);
router.post('/Payroll.Services/Client/CompensationClassService.svc/Deletable', dalClientCompensationClass.Deletable);
router.post('/Payroll.Services/Client/CompensationClassService.svc/GetObject', dalClientCompensationClass.GetObject);
router.post('/Payroll.Services/Client/CompensationClassService.svc/GetLookup', dalClientCompensationClass.GetLookup);

var dalClientLocation = require('../api/Client/Location');
router.post('/Payroll.Services/Client/LocationService.svc/Save', dalClientLocation.Save);
router.post('/Payroll.Services/Client/LocationService.svc/GetPage', dalClientLocation.GetPage);
router.post('/Payroll.Services/Client/LocationService.svc/Exists', dalClientLocation.Exists);
router.post('/Payroll.Services/Client/LocationService.svc/Delete', dalClientLocation.Delete);
router.post('/Payroll.Services/Client/LocationService.svc/Deletable', dalClientLocation.Deletable);
router.post('/Payroll.Services/Client/LocationService.svc/GetObject', dalClientLocation.GetObject);
router.post('/Payroll.Services/Client/LocationService.svc/GetLookup', dalClientLocation.GetLookup);

var dalClientPayScheduleRecurrence = require('../api/Client/PayScheduleRecurrence');
router.post('/Payroll.Services/Client/PayScheduleRecurrenceService.svc/GetObject', dalClientPayScheduleRecurrence.GetObject);
router.post('/Payroll.Services/Client/PayScheduleRecurrenceService.svc/GetLookup', dalClientPayScheduleRecurrence.GetLookup);

var dalClientState = require('../api/Client/State');
router.post('/Payroll.Services/Client/StateService.svc/GetObject', dalClientState.GetObject);
router.post('/Payroll.Services/Client/StateService.svc/GetLookup', dalClientState.GetLookup);

var dalClientCounty = require('../api/Client/County');
router.post('/Payroll.Services/Client/CountyService.svc/GetLookup', dalClientCounty.GetLookup);

var dalClientThingsToDo = require('../api/Client/ThingsToDo/ThingsToDo');
router.post('/Payroll.Services/Client/ThingsToDo/ThingsToDoService.svc/GetThingsToDo', dalClientThingsToDo.GetThingsToDo);
// end client section

/*
var Industry = require('../controllers/Admin/Industry/Industry');
router.get('/Admin/Industry/ViewAllIndustries', Industry.ViewAllIndustries);
router.get('/Admin/Industry/ViewIndustry/:IndustryId', Industry.ViewIndustry);
router.get('/Admin/Industry/EditIndustry/:IndustryId', Industry.EditIndustry);
router.get('/Admin/Industry/AddIndustry', Industry.AddIndustry);

var State = require('../controllers/Admin/State/State');
router.get('/Admin/State/ViewAllStates', State.ViewAllStates);
router.get('/Admin/State/ViewState/:StateId', State.ViewState);
router.get('/Admin/State/EditState/:StateId', State.EditState);
router.get('/Admin/State/AddState', State.AddState);

var FilingStatus = require('../controllers/Admin/FilingStatus/FilingStatus');
router.get('/Admin/FilingStatus/ViewAllFilingStatuses', FilingStatus.ViewAllFilingStatuses);
router.get('/Admin/FilingStatus/ViewFilingStatus/:FilingStatusId', FilingStatus.ViewFilingStatus);
router.get('/Admin/FilingStatus/EditFilingStatus/:FilingStatusId', FilingStatus.EditFilingStatus);
router.get('/Admin/FilingStatus/AddFilingStatus', FilingStatus.AddFilingStatus);

var FederalFilingStatus = require('../controllers/Admin/FederalFilingStatus/FederalFilingStatus');
router.get('/Admin/FederalFilingStatus/ViewAllFederalFilingStatuses', FederalFilingStatus.ViewAllFederalFilingStatuses);
router.get('/Admin/FederalFilingStatus/ViewFederalFilingStatus/:FederalFilingStatusId', FederalFilingStatus.ViewFederalFilingStatus);
router.get('/Admin/FederalFilingStatus/EditFederalFilingStatus/:FederalFilingStatusId', FederalFilingStatus.EditFederalFilingStatus);
router.get('/Admin/FederalFilingStatus/AddFederalFilingStatus', FederalFilingStatus.AddFederalFilingStatus);

var PayScheduleRecurrence = require('../controllers/Admin/PayScheduleRecurrence/PayScheduleRecurrence');
router.get('/Admin/PayScheduleRecurrence/ViewAllPayScheduleRecurrences', PayScheduleRecurrence.ViewAllPayScheduleRecurrences);
router.get('/Admin/PayScheduleRecurrence/ViewPayScheduleRecurrence/:PayScheduleRecurrenceId', PayScheduleRecurrence.ViewPayScheduleRecurrence);
router.get('/Admin/PayScheduleRecurrence/EditPayScheduleRecurrence/:PayScheduleRecurrenceId', PayScheduleRecurrence.EditPayScheduleRecurrence);
router.get('/Admin/PayScheduleRecurrence/AddPayScheduleRecurrence', PayScheduleRecurrence.AddPayScheduleRecurrence);

var Feature = require('../controllers/Admin/Feature/Feature');
router.get('/Admin/Feature/ViewAllFeatures', Feature.ViewAllFeatures);
router.get('/Admin/Feature/ViewFeature/:FeatureId', Feature.ViewFeature);
router.get('/Admin/Feature/EditFeature/:FeatureId', Feature.EditFeature);
router.get('/Admin/Feature/AddFeature', Feature.AddFeature);

var User = require('../controllers/Admin/User/User');
router.get('/Admin/User/ViewAllUsers', User.ViewAllUsers);
router.get('/Admin/User/ViewUser/:UserId', User.ViewUser);
router.get('/Admin/User/EditUser/:UserId', User.EditUser);
router.get('/Admin/User/AddUser', User.AddUser);

var Plan = require('../controllers/Admin/Plan/Plan');
router.get('/Admin/Plan/ViewAllPlans', Plan.ViewAllPlans);
router.get('/Admin/Plan/ViewPlan/:PlanId', Plan.ViewPlan);
router.get('/Admin/Plan/EditPlan/:PlanId', Plan.EditPlan);
router.get('/Admin/Plan/AddPlan', Plan.AddPlan);

var Client = require('../controllers/Admin/Client/Client');
router.get('/Admin/Client/ViewAllClients', Client.ViewAllClients);
router.get('/Admin/Client/ViewClient/:ClientId', Client.ViewClient);
router.get('/Admin/Client/EditClient/:ClientId', Client.EditClient);
router.get('/Admin/Client/AddClient', Client.AddClient);

var FederalTaxSetup = require('../controllers/Admin/FederalTaxSetup/FederalTaxSetup');
router.get('/Admin/FederalTaxSetup/ViewAllFederalTaxSetups', FederalTaxSetup.ViewAllFederalTaxSetups);
router.get('/Admin/FederalTaxSetup/ViewFederalTaxSetup/:FederalTaxSetupId', FederalTaxSetup.ViewFederalTaxSetup);
router.get('/Admin/FederalTaxSetup/EditFederalTaxSetup/:FederalTaxSetupId', FederalTaxSetup.EditFederalTaxSetup);
router.get('/Admin/FederalTaxSetup/AddFederalTaxSetup', FederalTaxSetup.AddFederalTaxSetup);


var StateTaxSetup = require('../controllers/Admin/StateTaxSetup/StateTaxSetup');
router.get('/Admin/StateTaxSetup/ViewAllStateTaxSetups', StateTaxSetup.ViewAllStateTaxSetups);
router.get('/Admin/StateTaxSetup/ViewStateTaxSetup/:StateTaxSetupId', StateTaxSetup.ViewStateTaxSetup);
router.get('/Admin/StateTaxSetup/EditStateTaxSetup/:StateTaxSetupId', StateTaxSetup.EditStateTaxSetup);
router.get('/Admin/StateTaxSetup/AddStateTaxSetup', StateTaxSetup.AddStateTaxSetup);

var StateTaxSetup1 = require('../controllers/Admin/StateTaxSetup1/StateTaxSetup1');
router.get('/Admin/StateTaxSetup1/ViewAllStateTaxSetup1s', StateTaxSetup1.ViewAllStateTaxSetup1s);
router.get('/Admin/StateTaxSetup1/ViewStateTaxSetup1/:StateTaxSetupId', StateTaxSetup1.ViewStateTaxSetup1);
router.get('/Admin/StateTaxSetup1/EditStateTaxSetup1/:StateTaxSetupId', StateTaxSetup1.EditStateTaxSetup1);
router.get('/Admin/StateTaxSetup1/AddStateTaxSetup1', StateTaxSetup1.AddStateTaxSetup1);

var StateTaxSetup2 = require('../controllers/Admin/StateTaxSetup2/StateTaxSetup2');
router.get('/Admin/StateTaxSetup2/ViewAllStateTaxSetup2s', StateTaxSetup2.ViewAllStateTaxSetup2s);
router.get('/Admin/StateTaxSetup2/ViewStateTaxSetup2/:StateTaxSetupId', StateTaxSetup2.ViewStateTaxSetup2);
router.get('/Admin/StateTaxSetup2/EditStateTaxSetup2/:StateTaxSetupId', StateTaxSetup2.EditStateTaxSetup2);
router.get('/Admin/StateTaxSetup2/AddStateTaxSetup2', StateTaxSetup2.AddStateTaxSetup2);

var StateTaxSetup3 = require('../controllers/Admin/StateTaxSetup3/StateTaxSetup3');
router.get('/Admin/StateTaxSetup3/ViewAllStateTaxSetup3s', StateTaxSetup3.ViewAllStateTaxSetup3s);
router.get('/Admin/StateTaxSetup3/ViewStateTaxSetup3/:StateTaxSetupId', StateTaxSetup3.ViewStateTaxSetup3);
router.get('/Admin/StateTaxSetup3/EditStateTaxSetup3/:StateTaxSetupId', StateTaxSetup3.EditStateTaxSetup3);
router.get('/Admin/StateTaxSetup3/AddStateTaxSetup3', StateTaxSetup3.AddStateTaxSetup3);

var StateTaxSetup4 = require('../controllers/Admin/StateTaxSetup4/StateTaxSetup4');
router.get('/Admin/StateTaxSetup4/ViewAllStateTaxSetup4s', StateTaxSetup4.ViewAllStateTaxSetup4s);
router.get('/Admin/StateTaxSetup4/ViewStateTaxSetup4/:StateTaxSetupId', StateTaxSetup4.ViewStateTaxSetup4);
router.get('/Admin/StateTaxSetup4/EditStateTaxSetup4/:StateTaxSetupId', StateTaxSetup4.EditStateTaxSetup4);
router.get('/Admin/StateTaxSetup4/AddStateTaxSetup4', StateTaxSetup4.AddStateTaxSetup4);

var TaxBracketSetup = require('../controllers/Admin/TaxBracketSetup/TaxBracketSetup');
router.get('/Admin/TaxBracketSetup/ViewAllTaxBracketSetups', TaxBracketSetup.ViewAllTaxBracketSetups);
router.get('/Admin/TaxBracketSetup/ViewTaxBracketSetup/:TaxBracketSetupId', TaxBracketSetup.ViewTaxBracketSetup);
router.get('/Admin/TaxBracketSetup/EditTaxBracketSetup/:TaxBracketSetupId', TaxBracketSetup.EditTaxBracketSetup);
router.get('/Admin/TaxBracketSetup/AddTaxBracketSetup', TaxBracketSetup.AddTaxBracketSetup);

var AllowanceChartSetup = require('../controllers/Admin/AllowanceChartSetup/AllowanceChartSetup');
router.get('/Admin/AllowanceChartSetup/ViewAllAllowanceChartSetups', AllowanceChartSetup.ViewAllAllowanceChartSetups);
router.get('/Admin/AllowanceChartSetup/ViewAllowanceChartSetup/:AllowanceChartSetupId', AllowanceChartSetup.ViewAllowanceChartSetup);
router.get('/Admin/AllowanceChartSetup/EditAllowanceChartSetup/:AllowanceChartSetupId', AllowanceChartSetup.EditAllowanceChartSetup);
router.get('/Admin/AllowanceChartSetup/AddAllowanceChartSetup', AllowanceChartSetup.AddAllowanceChartSetup);

var TaxSlabSetup = require('../controllers/Admin/TaxSlabSetup/TaxSlabSetup');
router.get('/Admin/TaxSlabSetup/ViewAllTaxSlabSetups', TaxSlabSetup.ViewAllTaxSlabSetups);
router.get('/Admin/TaxSlabSetup/ViewTaxSlabSetup/:TaxSlabSetupId', TaxSlabSetup.ViewTaxSlabSetup);
router.get('/Admin/TaxSlabSetup/EditTaxSlabSetup/:TaxSlabSetupId', TaxSlabSetup.EditTaxSlabSetup);
router.get('/Admin/TaxSlabSetup/AddTaxSlabSetup', TaxSlabSetup.AddTaxSlabSetup);

var AllowanceStatusSetup = require('../controllers/Admin/AllowanceStatusSetup/AllowanceStatusSetup');
router.get('/Admin/AllowanceStatusSetup/ViewAllAllowanceStatusSetups', AllowanceStatusSetup.ViewAllAllowanceStatusSetups);
router.get('/Admin/AllowanceStatusSetup/ViewAllowanceStatusSetup/:AllowanceStatusSetupId', AllowanceStatusSetup.ViewAllowanceStatusSetup);
router.get('/Admin/AllowanceStatusSetup/EditAllowanceStatusSetup/:AllowanceStatusSetupId', AllowanceStatusSetup.EditAllowanceStatusSetup);
router.get('/Admin/AllowanceStatusSetup/AddAllowanceStatusSetup', AllowanceStatusSetup.AddAllowanceStatusSetup);

var AllowanceStatusSetup1 = require('../controllers/Admin/AllowanceStatusSetup1/AllowanceStatusSetup1');
router.get('/Admin/AllowanceStatusSetup1/ViewAllAllowanceStatusSetup1s', AllowanceStatusSetup1.ViewAllAllowanceStatusSetup1s);
router.get('/Admin/AllowanceStatusSetup1/ViewAllowanceStatusSetup1/:AllowanceStatusSetupId', AllowanceStatusSetup1.ViewAllowanceStatusSetup1);
router.get('/Admin/AllowanceStatusSetup1/EditAllowanceStatusSetup1/:AllowanceStatusSetupId', AllowanceStatusSetup1.EditAllowanceStatusSetup1);
router.get('/Admin/AllowanceStatusSetup1/AddAllowanceStatusSetup1', AllowanceStatusSetup1.AddAllowanceStatusSetup1);

var AllowanceStatusSetup2 = require('../controllers/Admin/AllowanceStatusSetup2/AllowanceStatusSetup2');
router.get('/Admin/AllowanceStatusSetup2/ViewAllAllowanceStatusSetup2s', AllowanceStatusSetup2.ViewAllAllowanceStatusSetup2s);
router.get('/Admin/AllowanceStatusSetup2/ViewAllowanceStatusSetup2/:AllowanceStatusSetupId', AllowanceStatusSetup2.ViewAllowanceStatusSetup2);
router.get('/Admin/AllowanceStatusSetup2/EditAllowanceStatusSetup2/:AllowanceStatusSetupId', AllowanceStatusSetup2.EditAllowanceStatusSetup2);
router.get('/Admin/AllowanceStatusSetup2/AddAllowanceStatusSetup2', AllowanceStatusSetup2.AddAllowanceStatusSetup2);

var EstimatedDeduction = require('../controllers/Admin/EstimatedDeduction/EstimatedDeduction');
router.get('/Admin/EstimatedDeduction/ViewAllEstimatedDeductions', EstimatedDeduction.ViewAllEstimatedDeductions);
router.get('/Admin/EstimatedDeduction/ViewEstimatedDeduction/:EstimatedDeductionId', EstimatedDeduction.ViewEstimatedDeduction);
router.get('/Admin/EstimatedDeduction/EditEstimatedDeduction/:EstimatedDeductionId', EstimatedDeduction.EditEstimatedDeduction);
router.get('/Admin/EstimatedDeduction/AddEstimatedDeduction', EstimatedDeduction.AddEstimatedDeduction);

var ExemptionAllowance = require('../controllers/Admin/ExemptionAllowance/ExemptionAllowance');
router.get('/Admin/ExemptionAllowance/ViewAllExemptionAllowances', ExemptionAllowance.ViewAllExemptionAllowances);
router.get('/Admin/ExemptionAllowance/ViewExemptionAllowance/:ExemptionAllowanceId', ExemptionAllowance.ViewExemptionAllowance);
router.get('/Admin/ExemptionAllowance/EditExemptionAllowance/:ExemptionAllowanceId', ExemptionAllowance.EditExemptionAllowance);
router.get('/Admin/ExemptionAllowance/AddExemptionAllowance', ExemptionAllowance.AddExemptionAllowance);

var LowIncomeExemption = require('../controllers/Admin/LowIncomeExemption/LowIncomeExemption');
router.get('/Admin/LowIncomeExemption/ViewAllLowIncomeExemptions', LowIncomeExemption.ViewAllLowIncomeExemptions);
router.get('/Admin/LowIncomeExemption/ViewLowIncomeExemption/:LowIncomeExemptionId', LowIncomeExemption.ViewLowIncomeExemption);
router.get('/Admin/LowIncomeExemption/EditLowIncomeExemption/:LowIncomeExemptionId', LowIncomeExemption.EditLowIncomeExemption);
router.get('/Admin/LowIncomeExemption/AddLowIncomeExemption', LowIncomeExemption.AddLowIncomeExemption);

var StandardDeduction = require('../controllers/Admin/StandardDeduction/StandardDeduction');
router.get('/Admin/StandardDeduction/ViewAllStandardDeductions', StandardDeduction.ViewAllStandardDeductions);
router.get('/Admin/StandardDeduction/ViewStandardDeduction/:StandardDeductionId', StandardDeduction.ViewStandardDeduction);
router.get('/Admin/StandardDeduction/EditStandardDeduction/:StandardDeductionId', StandardDeduction.EditStandardDeduction);
router.get('/Admin/StandardDeduction/AddStandardDeduction', StandardDeduction.AddStandardDeduction);

var StandardDeduction2 = require('../controllers/Admin/StandardDeduction2/StandardDeduction2');
router.get('/Admin/StandardDeduction2/ViewAllStandardDeduction2s', StandardDeduction2.ViewAllStandardDeduction2s);
router.get('/Admin/StandardDeduction2/ViewStandardDeduction2/:StandardDeductionId', StandardDeduction2.ViewStandardDeduction2);
router.get('/Admin/StandardDeduction2/EditStandardDeduction2/:StandardDeductionId', StandardDeduction2.EditStandardDeduction2);
router.get('/Admin/StandardDeduction2/AddStandardDeduction2', StandardDeduction2.AddStandardDeduction2);

var CountyTaxSetup = require('../controllers/Admin/CountyTaxSetup/CountyTaxSetup');
router.get('/Admin/CountyTaxSetup/ViewAllCountyTaxSetups', CountyTaxSetup.ViewAllCountyTaxSetups);
router.get('/Admin/CountyTaxSetup/ViewCountyTaxSetup/:CountyTaxSetupId', CountyTaxSetup.ViewCountyTaxSetup);
router.get('/Admin/CountyTaxSetup/EditCountyTaxSetup/:CountyTaxSetupId', CountyTaxSetup.EditCountyTaxSetup);
router.get('/Admin/CountyTaxSetup/AddCountyTaxSetup', CountyTaxSetup.AddCountyTaxSetup);

var DeductionConstantSetup = require('../controllers/Admin/DeductionConstantSetup/DeductionConstantSetup');
router.get('/Admin/DeductionConstantSetup/ViewAllDeductionConstantSetups', DeductionConstantSetup.ViewAllDeductionConstantSetups);
router.get('/Admin/DeductionConstantSetup/ViewDeductionConstantSetup/:DeductionConstantSetupId', DeductionConstantSetup.ViewDeductionConstantSetup);
router.get('/Admin/DeductionConstantSetup/EditDeductionConstantSetup/:DeductionConstantSetupId', DeductionConstantSetup.EditDeductionConstantSetup);
router.get('/Admin/DeductionConstantSetup/AddDeductionConstantSetup', DeductionConstantSetup.AddDeductionConstantSetup);

var County = require('../controllers/Admin/County/County');
router.get('/Admin/County/ViewAllCounties', County.ViewAllCounties);
router.get('/Admin/County/ViewCounty/:CountyId', County.ViewCounty);
router.get('/Admin/County/EditCounty/:CountyId', County.EditCounty);
router.get('/Admin/County/AddCounty', County.AddCounty);

var Invoice = require('../controllers/Admin/Invoice/Invoice');
router.get('/Admin/Invoice/ViewAllInvoices', Invoice.ViewAllInvoices);
router.get('/Admin/Invoice/ViewInvoice/:InvoiceId', Invoice.ViewInvoice);

var StateTaxSetupMenu = require('../controllers/Admin/StateTaxSetupMenu/StateTaxSetupMenu');
router.get('/Admin/StateTaxSetupMenu/ViewStateTaxSetupMenu', StateTaxSetupMenu.ViewStateTaxSetupMenu);

var TaxSetup = require('../controllers/Admin/TaxSetup/TaxSetup');
router.get('/Admin/TaxSetup/ViewAllTaxSetups', TaxSetup.ViewAllTaxSetups);
router.get('/Admin/TaxSetup/ViewTaxSetup/:TaxSetupId', TaxSetup.ViewTaxSetup);
router.get('/Admin/TaxSetup/EditTaxSetup/:TaxSetupId', TaxSetup.EditTaxSetup);
router.get('/Admin/TaxSetup/AddTaxSetup', TaxSetup.AddTaxSetup);
*/
var dalIndustry = require('../api/Admin/Industry');
router.post('/Payroll.Services/Admin/IndustryService.svc/Save', dalIndustry.Save);
router.post('/Payroll.Services/Admin/IndustryService.svc/GetPage', dalIndustry.GetPage);
router.post('/Payroll.Services/Admin/IndustryService.svc/Exists', dalIndustry.Exists);
router.post('/Payroll.Services/Admin/IndustryService.svc/Delete', dalIndustry.Delete);
router.post('/Payroll.Services/Admin/IndustryService.svc/Deletable', dalIndustry.Deletable);
router.post('/Payroll.Services/Admin/IndustryService.svc/GetObject', dalIndustry.GetObject);
router.post('/Payroll.Services/Admin/IndustryService.svc/GetLookup', dalIndustry.GetLookup);

var dalState = require('../api/Admin/State');
router.post('/Payroll.Services/Admin/StateService.svc/Save', dalState.Save);
router.post('/Payroll.Services/Admin/StateService.svc/GetPage', dalState.GetPage);
router.post('/Payroll.Services/Admin/StateService.svc/Exists', dalState.Exists);
router.post('/Payroll.Services/Admin/StateService.svc/Exists1', dalState.Exists1);
router.post('/Payroll.Services/Admin/StateService.svc/Delete', dalState.Delete);
router.post('/Payroll.Services/Admin/StateService.svc/Deletable', dalState.Deletable);
router.post('/Payroll.Services/Admin/StateService.svc/GetObject', dalState.GetObject);
router.post('/Payroll.Services/Admin/StateService.svc/GetLookup', dalState.GetLookup);

var dalFeature = require('../api/Admin/Feature');
router.post('/Payroll.Services/Admin/FeatureService.svc/Save', dalFeature.Save);
router.post('/Payroll.Services/Admin/FeatureService.svc/GetPage', dalFeature.GetPage);
router.post('/Payroll.Services/Admin/FeatureService.svc/Exists', dalFeature.Exists);
router.post('/Payroll.Services/Admin/FeatureService.svc/Exists1', dalFeature.Exists1);
router.post('/Payroll.Services/Admin/FeatureService.svc/Delete', dalFeature.Delete);
router.post('/Payroll.Services/Admin/FeatureService.svc/Deletable', dalFeature.Deletable);
router.post('/Payroll.Services/Admin/FeatureService.svc/GetObject', dalFeature.GetObject);
router.post('/Payroll.Services/Admin/FeatureService.svc/GetLookup', dalFeature.GetLookup);

var dalPayScheduleRecurrence = require('../api/Admin/PayScheduleRecurrence');
router.post('/Payroll.Services/Admin/PayScheduleRecurrenceService.svc/Save', dalPayScheduleRecurrence.Save);
router.post('/Payroll.Services/Admin/PayScheduleRecurrenceService.svc/GetPage', dalPayScheduleRecurrence.GetPage);
router.post('/Payroll.Services/Admin/PayScheduleRecurrenceService.svc/Exists', dalPayScheduleRecurrence.Exists);
router.post('/Payroll.Services/Admin/PayScheduleRecurrenceService.svc/Exists1', dalPayScheduleRecurrence.Exists1);
router.post('/Payroll.Services/Admin/PayScheduleRecurrenceService.svc/Delete', dalPayScheduleRecurrence.Delete);
router.post('/Payroll.Services/Admin/PayScheduleRecurrenceService.svc/Deletable', dalPayScheduleRecurrence.Deletable);
router.post('/Payroll.Services/Admin/PayScheduleRecurrenceService.svc/GetObject', dalPayScheduleRecurrence.GetObject);
router.post('/Payroll.Services/Admin/PayScheduleRecurrenceService.svc/GetLookup', dalPayScheduleRecurrence.GetLookup);

var dalUser = require('../api/Admin/User');
router.post('/Payroll.Services/Admin/UserService.svc/Save', dalUser.Save);
router.post('/Payroll.Services/Admin/UserService.svc/GetPage', dalUser.GetPage);
router.post('/Payroll.Services/Admin/UserService.svc/Exists', dalUser.Exists);
router.post('/Payroll.Services/Admin/UserService.svc/Exists1', dalUser.Exists1);
router.post('/Payroll.Services/Admin/UserService.svc/Delete', dalUser.Delete);
router.post('/Payroll.Services/Admin/UserService.svc/Deletable', dalUser.Deletable);
router.post('/Payroll.Services/Admin/UserService.svc/GetObject', dalUser.GetObject);
router.post('/Payroll.Services/Admin/UserService.svc/GetLookup', dalUser.GetLookup);
//router.post('/Payroll.Services/Admin/UserService.svc/ValidateUser', dalUser.ValidateUser);


var dalPlan = require('../api/Admin/Plan');
router.post('/Payroll.Services/Admin/PlanService.svc/Save', dalPlan.Save);
router.post('/Payroll.Services/Admin/PlanService.svc/GetPage', dalPlan.GetPage);
router.post('/Payroll.Services/Admin/PlanService.svc/Exists', dalPlan.Exists);
router.post('/Payroll.Services/Admin/PlanService.svc/Exists1', dalPlan.Exists1);
router.post('/Payroll.Services/Admin/PlanService.svc/Delete', dalPlan.Delete);
router.post('/Payroll.Services/Admin/PlanService.svc/Deletable', dalPlan.Deletable);
router.post('/Payroll.Services/Admin/PlanService.svc/GetObject', dalPlan.GetObject);
router.post('/Payroll.Services/Admin/PlanService.svc/GetLookup', dalPlan.GetLookup);
router.post('/Payroll.Services/Admin/PlanService.svc/GetAvailableFeatures', dalPlan.GetAvailableFeatures);
router.post('/Payroll.Services/Admin/PlanService.svc/GetSelectedFeatures', dalPlan.GetSelectedFeatures);
router.post('/Payroll.Services/Admin/PlanService.svc/GetFeatures', dalPlan.GetFeatures);
router.post('/Payroll.Services/Admin/PlanService.svc/GetPlanCharges', dalPlan.GetPlanCharges);

var dalFederalTaxSetup = require('../api/Admin/FederalTaxSetup');
router.post('/Payroll.Services/Admin/FederalTaxSetupService.svc/Save', dalFederalTaxSetup.Save);
router.post('/Payroll.Services/Admin/FederalTaxSetupService.svc/GetPage', dalFederalTaxSetup.GetPage);
router.post('/Payroll.Services/Admin/FederalTaxSetupService.svc/Delete', dalFederalTaxSetup.Delete);
router.post('/Payroll.Services/Admin/FederalTaxSetupService.svc/Deletable', dalFederalTaxSetup.Deletable);
router.post('/Payroll.Services/Admin/FederalTaxSetupService.svc/GetObject', dalFederalTaxSetup.GetObject);
router.post('/Payroll.Services/Admin/FederalTaxSetupService.svc/GetFederalTaxSetupDetail', dalFederalTaxSetup.GetFederalTaxSetupDetail);
router.post('/Payroll.Services/Admin/FederalTaxSetupService.svc/Upload', dalFederalTaxSetup.UploadFile);
router.post('/Payroll.Services/Admin/FederalTaxSetupService.svc/Download', dalFederalTaxSetup.DownloadFile);

var dalStateTaxSetup = require('../api/Admin/StateTaxSetup');
router.post('/Payroll.Services/Admin/StateTaxSetupService.svc/Save', dalStateTaxSetup.Save);
router.post('/Payroll.Services/Admin/StateTaxSetupService.svc/GetPage', dalStateTaxSetup.GetPage);
router.post('/Payroll.Services/Admin/StateTaxSetupService.svc/Delete', dalStateTaxSetup.Delete);
router.post('/Payroll.Services/Admin/StateTaxSetupService.svc/Deletable', dalStateTaxSetup.Deletable);
router.post('/Payroll.Services/Admin/StateTaxSetupService.svc/GetObject', dalStateTaxSetup.GetObject);
router.post('/Payroll.Services/Admin/StateTaxSetupService.svc/GetStateTaxSetupDetail', dalStateTaxSetup.GetStateTaxSetupDetail);
router.post('/Payroll.Services/Admin/StateTaxSetupService.svc/Upload', dalStateTaxSetup.UploadFile);
router.post('/Payroll.Services/Admin/StateTaxSetupService.svc/Download', dalStateTaxSetup.DownloadFile);

var dalStateTaxSetup1 = require('../api/Admin/StateTaxSetup1');
router.post('/Payroll.Services/Admin/StateTaxSetup1Service.svc/Save', dalStateTaxSetup1.Save);
router.post('/Payroll.Services/Admin/StateTaxSetup1Service.svc/GetPage', dalStateTaxSetup1.GetPage);
router.post('/Payroll.Services/Admin/StateTaxSetup1Service.svc/Delete', dalStateTaxSetup1.Delete);
router.post('/Payroll.Services/Admin/StateTaxSetup1Service.svc/Deletable', dalStateTaxSetup1.Deletable);
router.post('/Payroll.Services/Admin/StateTaxSetup1Service.svc/GetObject', dalStateTaxSetup1.GetObject);
router.post('/Payroll.Services/Admin/StateTaxSetup1Service.svc/GetStateTaxSetup1Detail', dalStateTaxSetup1.GetStateTaxSetup1Detail);
router.post('/Payroll.Services/Admin/StateTaxSetup1Service.svc/Upload', dalStateTaxSetup1.UploadFile);
router.post('/Payroll.Services/Admin/StateTaxSetup1Service.svc/Download', dalStateTaxSetup1.DownloadFile);

var dalStateTaxSetup2 = require('../api/Admin/StateTaxSetup2');
router.post('/Payroll.Services/Admin/StateTaxSetup2Service.svc/Save', dalStateTaxSetup2.Save);
router.post('/Payroll.Services/Admin/StateTaxSetup2Service.svc/GetPage', dalStateTaxSetup2.GetPage);
router.post('/Payroll.Services/Admin/StateTaxSetup2Service.svc/Delete', dalStateTaxSetup2.Delete);
router.post('/Payroll.Services/Admin/StateTaxSetup2Service.svc/Deletable', dalStateTaxSetup2.Deletable);
router.post('/Payroll.Services/Admin/StateTaxSetup2Service.svc/GetObject', dalStateTaxSetup2.GetObject);
router.post('/Payroll.Services/Admin/StateTaxSetup2Service.svc/GetStateTaxSetup2Detail', dalStateTaxSetup2.GetStateTaxSetup2Detail);
router.post('/Payroll.Services/Admin/StateTaxSetup2Service.svc/Upload', dalStateTaxSetup2.UploadFile);
router.post('/Payroll.Services/Admin/StateTaxSetup2Service.svc/Download', dalStateTaxSetup2.DownloadFile);

var dalStateTaxSetup3 = require('../api/Admin/StateTaxSetup3');
router.post('/Payroll.Services/Admin/StateTaxSetup3Service.svc/Save', dalStateTaxSetup3.Save);
router.post('/Payroll.Services/Admin/StateTaxSetup3Service.svc/GetPage', dalStateTaxSetup3.GetPage);
router.post('/Payroll.Services/Admin/StateTaxSetup3Service.svc/Delete', dalStateTaxSetup3.Delete);
router.post('/Payroll.Services/Admin/StateTaxSetup3Service.svc/Deletable', dalStateTaxSetup3.Deletable);
router.post('/Payroll.Services/Admin/StateTaxSetup3Service.svc/GetObject', dalStateTaxSetup3.GetObject);
router.post('/Payroll.Services/Admin/StateTaxSetup3Service.svc/GetStateTaxSetup3Detail', dalStateTaxSetup3.GetStateTaxSetup3Detail);
router.post('/Payroll.Services/Admin/StateTaxSetup3Service.svc/Upload', dalStateTaxSetup3.UploadFile);
router.post('/Payroll.Services/Admin/StateTaxSetup3Service.svc/Download', dalStateTaxSetup3.DownloadFile);

var dalStateTaxSetup4 = require('../api/Admin/StateTaxSetup4');
router.post('/Payroll.Services/Admin/StateTaxSetup4Service.svc/Save', dalStateTaxSetup4.Save);
router.post('/Payroll.Services/Admin/StateTaxSetup4Service.svc/GetPage', dalStateTaxSetup4.GetPage);
router.post('/Payroll.Services/Admin/StateTaxSetup4Service.svc/Delete', dalStateTaxSetup4.Delete);
router.post('/Payroll.Services/Admin/StateTaxSetup4Service.svc/Deletable', dalStateTaxSetup4.Deletable);
router.post('/Payroll.Services/Admin/StateTaxSetup4Service.svc/GetObject', dalStateTaxSetup4.GetObject);
router.post('/Payroll.Services/Admin/StateTaxSetup4Service.svc/GetStateTaxSetup4Detail', dalStateTaxSetup4.GetStateTaxSetup4Detail);
router.post('/Payroll.Services/Admin/StateTaxSetup4Service.svc/Upload', dalStateTaxSetup4.UploadFile);
router.post('/Payroll.Services/Admin/StateTaxSetup4Service.svc/Download', dalStateTaxSetup4.DownloadFile);

var dalTaxBracketSetup = require('../api/Admin/TaxBracketSetup');
router.post('/Payroll.Services/Admin/TaxBracketSetupService.svc/Save', dalTaxBracketSetup.Save);
router.post('/Payroll.Services/Admin/TaxBracketSetupService.svc/GetPage', dalTaxBracketSetup.GetPage);
router.post('/Payroll.Services/Admin/TaxBracketSetupService.svc/Delete', dalTaxBracketSetup.Delete);
router.post('/Payroll.Services/Admin/TaxBracketSetupService.svc/Deletable', dalTaxBracketSetup.Deletable);
router.post('/Payroll.Services/Admin/TaxBracketSetupService.svc/GetObject', dalTaxBracketSetup.GetObject);
router.post('/Payroll.Services/Admin/TaxBracketSetupService.svc/GetTaxBracketSetupDetail', dalTaxBracketSetup.GetTaxBracketSetupDetail);
router.post('/Payroll.Services/Admin/TaxBracketSetupService.svc/Upload', dalTaxBracketSetup.UploadFile);
router.post('/Payroll.Services/Admin/TaxBracketSetupService.svc/Download', dalTaxBracketSetup.DownloadFile);

var dalAllowanceChartSetup = require('../api/Admin/AllowanceChartSetup');
router.post('/Payroll.Services/Admin/AllowanceChartSetupService.svc/Save', dalAllowanceChartSetup.Save);
router.post('/Payroll.Services/Admin/AllowanceChartSetupService.svc/GetPage', dalAllowanceChartSetup.GetPage);
router.post('/Payroll.Services/Admin/AllowanceChartSetupService.svc/Delete', dalAllowanceChartSetup.Delete);
router.post('/Payroll.Services/Admin/AllowanceChartSetupService.svc/Deletable', dalAllowanceChartSetup.Deletable);
router.post('/Payroll.Services/Admin/AllowanceChartSetupService.svc/GetObject', dalAllowanceChartSetup.GetObject);
router.post('/Payroll.Services/Admin/AllowanceChartSetupService.svc/GetAllowanceChartSetupDetail', dalAllowanceChartSetup.GetAllowanceChartSetupDetail);
router.post('/Payroll.Services/Admin/AllowanceChartSetupService.svc/Upload', dalAllowanceChartSetup.UploadFile);
router.post('/Payroll.Services/Admin/AllowanceChartSetupService.svc/Download', dalAllowanceChartSetup.DownloadFile);

var dalTaxSlabSetup = require('../api/Admin/TaxSlabSetup');
router.post('/Payroll.Services/Admin/TaxSlabSetupService.svc/Save', dalTaxSlabSetup.Save);
router.post('/Payroll.Services/Admin/TaxSlabSetupService.svc/GetPage', dalTaxSlabSetup.GetPage);
router.post('/Payroll.Services/Admin/TaxSlabSetupService.svc/Delete', dalTaxSlabSetup.Delete);
router.post('/Payroll.Services/Admin/TaxSlabSetupService.svc/Deletable', dalTaxSlabSetup.Deletable);
router.post('/Payroll.Services/Admin/TaxSlabSetupService.svc/GetObject', dalTaxSlabSetup.GetObject);
router.post('/Payroll.Services/Admin/TaxSlabSetupService.svc/GetTaxSlabSetupDetail', dalTaxSlabSetup.GetTaxSlabSetupDetail);
router.post('/Payroll.Services/Admin/TaxSlabSetupService.svc/Upload', dalTaxSlabSetup.UploadFile);
router.post('/Payroll.Services/Admin/TaxSlabSetupService.svc/Download', dalTaxSlabSetup.DownloadFile);

var dalAllowanceStatusSetup = require('../api/Admin/AllowanceStatusSetup');
router.post('/Payroll.Services/Admin/AllowanceStatusSetupService.svc/Save', dalAllowanceStatusSetup.Save);
router.post('/Payroll.Services/Admin/AllowanceStatusSetupService.svc/GetPage', dalAllowanceStatusSetup.GetPage);
router.post('/Payroll.Services/Admin/AllowanceStatusSetupService.svc/Delete', dalAllowanceStatusSetup.Delete);
router.post('/Payroll.Services/Admin/AllowanceStatusSetupService.svc/Deletable', dalAllowanceStatusSetup.Deletable);
router.post('/Payroll.Services/Admin/AllowanceStatusSetupService.svc/GetObject', dalAllowanceStatusSetup.GetObject);
router.post('/Payroll.Services/Admin/AllowanceStatusSetupService.svc/GetAllowanceStatusSetupStandardDeduction', dalAllowanceStatusSetup.GetAllowanceStatusSetupStandardDeduction);
router.post('/Payroll.Services/Admin/AllowanceStatusSetupService.svc/GetAllowanceStatusSetupPersonalAllowance', dalAllowanceStatusSetup.GetAllowanceStatusSetupPersonalAllowance);
router.post('/Payroll.Services/Admin/AllowanceStatusSetupService.svc/GetAllowanceStatusSetupDependentAllowance', dalAllowanceStatusSetup.GetAllowanceStatusSetupDependentAllowance);
router.post('/Payroll.Services/Admin/AllowanceStatusSetupService.svc/Upload', dalAllowanceStatusSetup.UploadFile);
router.post('/Payroll.Services/Admin/AllowanceStatusSetupService.svc/Download', dalAllowanceStatusSetup.DownloadFile);


var dalAllowanceStatusSetup1 = require('../api/Admin/AllowanceStatusSetup1');
router.post('/Payroll.Services/Admin/AllowanceStatusSetup1Service.svc/Save', dalAllowanceStatusSetup1.Save);
router.post('/Payroll.Services/Admin/AllowanceStatusSetup1Service.svc/GetPage', dalAllowanceStatusSetup1.GetPage);
router.post('/Payroll.Services/Admin/AllowanceStatusSetup1Service.svc/Delete', dalAllowanceStatusSetup1.Delete);
router.post('/Payroll.Services/Admin/AllowanceStatusSetup1Service.svc/Deletable', dalAllowanceStatusSetup1.Deletable);
router.post('/Payroll.Services/Admin/AllowanceStatusSetup1Service.svc/GetObject', dalAllowanceStatusSetup1.GetObject);
router.post('/Payroll.Services/Admin/AllowanceStatusSetup1Service.svc/GetAllowanceStatusSetup1Detail', dalAllowanceStatusSetup1.GetAllowanceStatusSetup1Detail);
router.post('/Payroll.Services/Admin/AllowanceStatusSetup1Service.svc/Upload', dalAllowanceStatusSetup1.UploadFile);
router.post('/Payroll.Services/Admin/AllowanceStatusSetup1Service.svc/Download', dalAllowanceStatusSetup1.DownloadFile);


var dalAllowanceStatusSetup2 = require('../api/Admin/AllowanceStatusSetup2');
router.post('/Payroll.Services/Admin/AllowanceStatusSetup2Service.svc/Save', dalAllowanceStatusSetup2.Save);
router.post('/Payroll.Services/Admin/AllowanceStatusSetup2Service.svc/GetPage', dalAllowanceStatusSetup2.GetPage);
router.post('/Payroll.Services/Admin/AllowanceStatusSetup2Service.svc/Delete', dalAllowanceStatusSetup2.Delete);
router.post('/Payroll.Services/Admin/AllowanceStatusSetup2Service.svc/Deletable', dalAllowanceStatusSetup2.Deletable);
router.post('/Payroll.Services/Admin/AllowanceStatusSetup2Service.svc/GetObject', dalAllowanceStatusSetup2.GetObject);
router.post('/Payroll.Services/Admin/AllowanceStatusSetup2Service.svc/GetAllowanceStatusSetup2Detail', dalAllowanceStatusSetup2.GetAllowanceStatusSetup2Detail);
router.post('/Payroll.Services/Admin/AllowanceStatusSetup2Service.svc/Upload', dalAllowanceStatusSetup2.UploadFile);
router.post('/Payroll.Services/Admin/AllowanceStatusSetup2Service.svc/Download', dalAllowanceStatusSetup2.DownloadFile);


var dalEstimatedDeduction = require('../api/Admin/EstimatedDeduction');
router.post('/Payroll.Services/Admin/EstimatedDeductionService.svc/Save', dalEstimatedDeduction.Save);
router.post('/Payroll.Services/Admin/EstimatedDeductionService.svc/GetPage', dalEstimatedDeduction.GetPage);
router.post('/Payroll.Services/Admin/EstimatedDeductionService.svc/Delete', dalEstimatedDeduction.Delete);
router.post('/Payroll.Services/Admin/EstimatedDeductionService.svc/Deletable', dalEstimatedDeduction.Deletable);
router.post('/Payroll.Services/Admin/EstimatedDeductionService.svc/GetObject', dalEstimatedDeduction.GetObject);
router.post('/Payroll.Services/Admin/EstimatedDeductionService.svc/GetEstimatedDeductionDetail', dalEstimatedDeduction.GetEstimatedDeductionDetail);
router.post('/Payroll.Services/Admin/EstimatedDeductionService.svc/Upload', dalEstimatedDeduction.UploadFile);
router.post('/Payroll.Services/Admin/EstimatedDeductionService.svc/Download', dalEstimatedDeduction.DownloadFile);

var dalExemptionAllowance = require('../api/Admin/ExemptionAllowance');
router.post('/Payroll.Services/Admin/ExemptionAllowanceService.svc/Save', dalExemptionAllowance.Save);
router.post('/Payroll.Services/Admin/ExemptionAllowanceService.svc/GetPage', dalExemptionAllowance.GetPage);
router.post('/Payroll.Services/Admin/ExemptionAllowanceService.svc/Delete', dalExemptionAllowance.Delete);
router.post('/Payroll.Services/Admin/ExemptionAllowanceService.svc/Deletable', dalExemptionAllowance.Deletable);
router.post('/Payroll.Services/Admin/ExemptionAllowanceService.svc/GetObject', dalExemptionAllowance.GetObject);
router.post('/Payroll.Services/Admin/ExemptionAllowanceService.svc/GetExemptionAllowanceDetail', dalExemptionAllowance.GetExemptionAllowanceDetail);
router.post('/Payroll.Services/Admin/ExemptionAllowanceService.svc/Upload', dalExemptionAllowance.UploadFile);
router.post('/Payroll.Services/Admin/ExemptionAllowanceService.svc/Download', dalExemptionAllowance.DownloadFile);

var dalLowIncomeExemption = require('../api/Admin/LowIncomeExemption');
router.post('/Payroll.Services/Admin/LowIncomeExemptionService.svc/Save', dalLowIncomeExemption.Save);
router.post('/Payroll.Services/Admin/LowIncomeExemptionService.svc/GetPage', dalLowIncomeExemption.GetPage);
router.post('/Payroll.Services/Admin/LowIncomeExemptionService.svc/Delete', dalLowIncomeExemption.Delete);
router.post('/Payroll.Services/Admin/LowIncomeExemptionService.svc/Deletable', dalLowIncomeExemption.Deletable);
router.post('/Payroll.Services/Admin/LowIncomeExemptionService.svc/GetObject', dalLowIncomeExemption.GetObject);
router.post('/Payroll.Services/Admin/LowIncomeExemptionService.svc/GetLowIncomeExemptionDetail', dalLowIncomeExemption.GetLowIncomeExemptionDetail);
router.post('/Payroll.Services/Admin/LowIncomeExemptionService.svc/Upload', dalLowIncomeExemption.UploadFile);
router.post('/Payroll.Services/Admin/LowIncomeExemptionService.svc/Download', dalLowIncomeExemption.DownloadFile);

var dalStandardDeduction = require('../api/Admin/StandardDeduction');
router.post('/Payroll.Services/Admin/StandardDeductionService.svc/Save', dalStandardDeduction.Save);
router.post('/Payroll.Services/Admin/StandardDeductionService.svc/GetPage', dalStandardDeduction.GetPage);
router.post('/Payroll.Services/Admin/StandardDeductionService.svc/Delete', dalStandardDeduction.Delete);
router.post('/Payroll.Services/Admin/StandardDeductionService.svc/Deletable', dalStandardDeduction.Deletable);
router.post('/Payroll.Services/Admin/StandardDeductionService.svc/GetObject', dalStandardDeduction.GetObject);
router.post('/Payroll.Services/Admin/StandardDeductionService.svc/GetStandardDeductionDetail', dalStandardDeduction.GetStandardDeductionDetail);
router.post('/Payroll.Services/Admin/StandardDeductionService.svc/Upload', dalStandardDeduction.UploadFile);
router.post('/Payroll.Services/Admin/StandardDeductionService.svc/Download', dalStandardDeduction.DownloadFile);

var dalStandardDeduction2 = require('../api/Admin/StandardDeduction2');
router.post('/Payroll.Services/Admin/StandardDeduction2Service.svc/Save', dalStandardDeduction2.Save);
router.post('/Payroll.Services/Admin/StandardDeduction2Service.svc/GetPage', dalStandardDeduction2.GetPage);
router.post('/Payroll.Services/Admin/StandardDeduction2Service.svc/Delete', dalStandardDeduction2.Delete);
router.post('/Payroll.Services/Admin/StandardDeduction2Service.svc/Deletable', dalStandardDeduction2.Deletable);
router.post('/Payroll.Services/Admin/StandardDeduction2Service.svc/GetObject', dalStandardDeduction2.GetObject);
router.post('/Payroll.Services/Admin/StandardDeduction2Service.svc/GetStandardDeduction2Detail', dalStandardDeduction2.GetStandardDeduction2Detail);
router.post('/Payroll.Services/Admin/StandardDeduction2Service.svc/Upload', dalStandardDeduction2.UploadFile);
router.post('/Payroll.Services/Admin/StandardDeduction2Service.svc/Download', dalStandardDeduction2.DownloadFile);

var dalDeductionConstantSetup = require('../api/Admin/DeductionConstantSetup');
router.post('/Payroll.Services/Admin/DeductionConstantSetupService.svc/Save', dalDeductionConstantSetup.Save);
router.post('/Payroll.Services/Admin/DeductionConstantSetupService.svc/GetPage', dalDeductionConstantSetup.GetPage);
router.post('/Payroll.Services/Admin/DeductionConstantSetupService.svc/Delete', dalDeductionConstantSetup.Delete);
router.post('/Payroll.Services/Admin/DeductionConstantSetupService.svc/Deletable', dalDeductionConstantSetup.Deletable);
router.post('/Payroll.Services/Admin/DeductionConstantSetupService.svc/GetObject', dalDeductionConstantSetup.GetObject);
router.post('/Payroll.Services/Admin/DeductionConstantSetupService.svc/GetDeductionConstantASetup', dalDeductionConstantSetup.GetDeductionConstantASetup);
router.post('/Payroll.Services/Admin/DeductionConstantSetupService.svc/GetDeductionConstantBSetup', dalDeductionConstantSetup.GetDeductionConstantBSetup);
router.post('/Payroll.Services/Admin/DeductionConstantSetupService.svc/Upload', dalDeductionConstantSetup.UploadFile);
router.post('/Payroll.Services/Admin/DeductionConstantSetupService.svc/Download', dalDeductionConstantSetup.DownloadFile);

var dalCountyTaxSetup = require('../api/Admin/CountyTaxSetup');
router.post('/Payroll.Services/Admin/CountyTaxSetupService.svc/Save', dalCountyTaxSetup.Save);
router.post('/Payroll.Services/Admin/CountyTaxSetupService.svc/GetPage', dalCountyTaxSetup.GetPage);
router.post('/Payroll.Services/Admin/CountyTaxSetupService.svc/Delete', dalCountyTaxSetup.Delete);
router.post('/Payroll.Services/Admin/CountyTaxSetupService.svc/Deletable', dalCountyTaxSetup.Deletable);
router.post('/Payroll.Services/Admin/CountyTaxSetupService.svc/GetObject', dalCountyTaxSetup.GetObject);
router.post('/Payroll.Services/Admin/CountyTaxSetupService.svc/GetCountyTaxSetupDetail', dalCountyTaxSetup.GetCountyTaxSetupDetail);
router.post('/Payroll.Services/Admin/CountyTaxSetupService.svc/Upload', dalCountyTaxSetup.UploadFile);
router.post('/Payroll.Services/Admin/CountyTaxSetupService.svc/Download', dalCountyTaxSetup.DownloadFile);

var dalCounty = require('../api/Admin/County');
router.post('/Payroll.Services/Admin/CountyService.svc/Save', dalCounty.Save);
router.post('/Payroll.Services/Admin/CountyService.svc/GetPage', dalCounty.GetPage);
router.post('/Payroll.Services/Admin/CountyService.svc/Exists', dalCounty.Exists);
router.post('/Payroll.Services/Admin/CountyService.svc/Exists1', dalCounty.Exists1);
router.post('/Payroll.Services/Admin/CountyService.svc/Delete', dalCounty.Delete);
router.post('/Payroll.Services/Admin/CountyService.svc/Deletable', dalCounty.Deletable);
router.post('/Payroll.Services/Admin/CountyService.svc/GetObject', dalCounty.GetObject);
router.post('/Payroll.Services/Admin/CountyService.svc/GetLookup', dalCounty.GetLookup);

var dalClient = require('../api/Admin/Client');
router.post('/Payroll.Services/Admin/ClientService.svc/Save', dalClient.Save);
router.post('/Payroll.Services/Admin/ClientService.svc/GetPage', dalClient.GetPage);
router.post('/Payroll.Services/Admin/ClientService.svc/Exists', dalClient.Exists);
router.post('/Payroll.Services/Admin/ClientService.svc/Exists1', dalClient.Exists1);
router.post('/Payroll.Services/Admin/ClientService.svc/Delete', dalClient.Delete);
router.post('/Payroll.Services/Admin/ClientService.svc/Deletable', dalClient.Deletable);
router.post('/Payroll.Services/Admin/ClientService.svc/GetObject', dalClient.GetObject);
router.post('/Payroll.Services/Admin/ClientService.svc/GetLookup', dalClient.GetLookup);

var dalAdminFilingStatus = require('../api/Admin/FilingStatus');
router.post('/Payroll.Services/Admin/FilingStatusService.svc/Save', dalAdminFilingStatus.Save);
router.post('/Payroll.Services/Admin/FilingStatusService.svc/GetPage', dalAdminFilingStatus.GetPage);
router.post('/Payroll.Services/Admin/FilingStatusService.svc/Exists', dalAdminFilingStatus.Exists);
router.post('/Payroll.Services/Admin/FilingStatusService.svc/Exists1', dalAdminFilingStatus.Exists1);
router.post('/Payroll.Services/Admin/FilingStatusService.svc/Delete', dalAdminFilingStatus.Delete);
router.post('/Payroll.Services/Admin/FilingStatusService.svc/Deletable', dalAdminFilingStatus.Deletable);
router.post('/Payroll.Services/Admin/FilingStatusService.svc/GetObject', dalAdminFilingStatus.GetObject);
router.post('/Payroll.Services/Admin/FilingStatusService.svc/GetLookup', dalAdminFilingStatus.GetLookup);

var dalAdminFederalFilingStatus = require('../api/Admin/FederalFilingStatus');
router.post('/Payroll.Services/Admin/FederalFilingStatusService.svc/Save', dalAdminFederalFilingStatus.Save);
router.post('/Payroll.Services/Admin/FederalFilingStatusService.svc/GetPage', dalAdminFederalFilingStatus.GetPage);
router.post('/Payroll.Services/Admin/FederalFilingStatusService.svc/Exists', dalAdminFederalFilingStatus.Exists);
router.post('/Payroll.Services/Admin/FederalFilingStatusService.svc/Exists1', dalAdminFederalFilingStatus.Exists1);
router.post('/Payroll.Services/Admin/FederalFilingStatusService.svc/Delete', dalAdminFederalFilingStatus.Delete);
router.post('/Payroll.Services/Admin/FederalFilingStatusService.svc/Deletable', dalAdminFederalFilingStatus.Deletable);
router.post('/Payroll.Services/Admin/FederalFilingStatusService.svc/GetObject', dalAdminFederalFilingStatus.GetObject);
router.post('/Payroll.Services/Admin/FederalFilingStatusService.svc/GetLookup', dalAdminFederalFilingStatus.GetLookup);

var dalAdminInvoice = require('../api/Admin/Invoice');
router.post('/Payroll.Services/Admin/InvoiceService.svc/GetPage', dalAdminInvoice.GetPage);

var dalTaxSetup = require('../api/Admin/TaxSetup');
router.post('/Payroll.Services/Admin/TaxSetupService.svc/Save', dalTaxSetup.Save);
router.post('/Payroll.Services/Admin/TaxSetupService.svc/GetPage', dalTaxSetup.GetPage);
router.post('/Payroll.Services/Admin/TaxSetupService.svc/Delete', dalTaxSetup.Delete);
router.post('/Payroll.Services/Admin/TaxSetupService.svc/Deletable', dalTaxSetup.Deletable);
router.post('/Payroll.Services/Admin/TaxSetupService.svc/GetObject', dalTaxSetup.GetObject);

var dalPublicPlan = require('../api/Public/Plan');
router.post('/Payroll.Services/Public/PlanService.svc/GetAll', dalPublicPlan.GetAll);
router.post('/Payroll.Services/Public/PlanService.svc/GetAllFeatures', dalPublicPlan.GetAllFeatures);

var dalPublicFeature = require('../api/Public/Feature');
router.post('/Payroll.Services/Public/FeatureService.svc/GetAll', dalPublicFeature.GetAll);

var dalPublicState = require('../api/Public/State');
router.post('/Payroll.Services/Public/StateService.svc/GetLookup', dalPublicState.GetLookup);

var dalPublicIndustry = require('../api/Public/Industry');
router.post('/Payroll.Services/Public/IndustryService.svc/GetLookup', dalPublicIndustry.GetLookup);

var dalPublicClient = require('../api/Public/Client');
router.post('/Payroll.Services/Public/ClientService.svc/Save', dalPublicClient.Save);
router.post('/Payroll.Services/Public/ClientService.svc/Exists', dalPublicClient.Exists);
router.post('/Payroll.Services/Public/ClientService.svc/Exists1', dalPublicClient.Exists1);
router.post('/Payroll.Services/Public/ClientService.svc/ForgotPassword', dalPublicClient.ForgotPassword);
router.post('/Payroll.Services/Public/ClientService.svc/ResetPassword', dalPublicClient.ResetPassword);
router.post('/Payroll.Services/Public/ClientService.svc/ValidateClient', dalPublicClient.ValidateClient);
router.get('/Payroll.Services/Public/Client/ActivateAccount', dalPublicClient.ActivateAccount);

var dalPublicUser = require('../api/Public/User');
router.post('/Payroll.Services/Public/UserService.svc/ValidateUser', dalPublicUser.ValidateUser);

var dalPublicInvoice = require('../api/Public/Invoice');
router.post('/Payroll.Services/Public/InvoiceService.svc/Save', dalPublicInvoice.Save);


//added by ankur on 13-OCT-2017
var dalClientPayrollSummary = require('../api/Client/Reports/EmployeeReports/PayrollSummary');
router.post('/Payroll.Services/Client/Reports/EmployeeReports/PayrollSummary.svc/PayrollSummary', dalClientPayrollSummary.PayrollSummary);
var dalClientPayrollDetails = require('../api/Client/Reports/EmployeeReports/PayrollDetails');
router.post('/Payroll.Services/Client/Reports/EmployeeReports/PayrollDetails.svc/PayrollDetails', dalClientPayrollDetails.PayrollDetails);
//router.post('/Payroll.Services/Client/Reports/EmployeeReports/PayrollDetails.svc/PayrollDetailsPDF', dalClientPayrollDetails.PayrollDetailsPDF);
//End adding by ankur


//var Helper = require('./Helper'); 
//router.post('/Payroll.Services/Public/MailService.svc/SendActivationMail', Helper.SendMail);
router.post('/SignUp', function (req, res) {
    var request = require('request');
    // g-recaptcha-response is the key that browser will generate upon form submit.
    // if its blank or null means user has not selected the captcha, so return the error.
    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.json("Please select captcha");
    }
    // Put your secret key here.
    var secretKey = "6Lc2QAkUAAAAAEamc9rAkMbryTPd9Dh87sss-_jr";
    // req.connection.remoteAddress will provide IP address of connected user.
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    // Hitting GET request to the URL, Google will respond with success or error scenario.
    request(verificationUrl, function (error, response, body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if (body.success !== undefined && !body.success) {
            return res.json("Failed captcha verification");
        }    
        var ClientId = 0;    
        requestify.post(Configuration.APIUrl + '/Payroll.Services/Public/ClientService.svc/Save', {
            ClientType: parseInt(req.body.cmbClientType, 10),
            FullName: req.body.txtFullName,
            Address1: req.body.txtAddress1,
            Address2: req.body.txtAddress2,           
            CityName: req.body.txtCityName,
            StateId: req.body.cmbStateName,
            ZipCode: req.body.txtZipCode,
            ZipCodeExt: req.body.txtZipCodeExt,
            IndustryId: parseInt(req.body.cmbIndustryName, 10),
            ContactName: req.body.txtContactName,
            JobTitleName: req.body.txtJobTitleName,
            WorkPhoneNo: req.body.txtWorkPhoneNo,
            WorkPhoneNoExt: req.body.txtWorkPhoneNoExt,
            CellPhoneNo: req.body.txtCellPhoneNo,
            FaxNo: req.body.txtFaxNo,
            EMailId: req.body.txtEMailId,
            LoginId: req.body.txtLoginId,
            Password: req.body.txtPassword,
            Status: 'Inactive',
            ParentClientId: 0
        }).then(function (response) {
            var Today = new Date();
            var ToDate = new Date();
            ToDate.setMonth(ToDate.getMonth() + 1);
            requestify.post(Configuration.APIUrl + '/Payroll.Services/Public/InvoiceService.svc/Save', {
                InvoiceId: 0,
                InvoiceDate: new Date,
                FromDate: Today.getMonth() + '/' + Today.getDate() + '/' + Today.getFullYear(),
                ToDate: Today.getMonth() + '/' + Today.getDate() + '/' + Today.getFullYear() ,
                ClientId: parseInt(response.getBody(), 10),
                PlanId: req.body.txtPlanId,
                PlanType: req.body.txtPlanType,
                EmployeeCount: 0,
                Amount: req.body.txtAmount,
                DiscountPercentage: 100,
                EmployeeRate: 2,
                CardNo: '',
                StripeId: '',
                PaidDate: Today.getMonth() + '/' + Today.getDate() + '/' + Today.getFullYear(),
                Status: 'Paid'
            }).then(function (response) {
                res.redirect("/Thank-You");
            });
            });
        
    });
});
module.exports = router;