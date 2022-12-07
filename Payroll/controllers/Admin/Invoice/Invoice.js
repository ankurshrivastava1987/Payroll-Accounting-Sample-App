exports.ViewAllInvoices = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/Invoice/ViewAllInvoices.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-Invoices',
        PageHeading: 'Invoice',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        GridPageSize: Configuration.GridPageSize,
        Environment: Configuration.Environment
    }, res);
}

exports.ViewInvoice = function (req, res) {
    var template = Marko.load(require.resolve('../../../views/Admin/Invoice/ViewInvoice.marko'));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        title: 'Payroll-View Invoice',
        PageHeading: 'View Invoice',
        reorderEnabled: false,
        CDNUrl: Configuration.CDNUrl,
        InvoiceId: req.params.InvoiceId,
        Environment: Configuration.Environment
    }, res);
}
