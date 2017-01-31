// exports
module.exports = {
    sayHello: _hello
};

function _hello(req, res) {
    res.status(200).json({
        status: 'Hello Swagger World!'
    });
}