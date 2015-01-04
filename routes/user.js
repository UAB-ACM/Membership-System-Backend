module.exports = function (router, db, config) {

    router.use("/user", function (req, res, next) {

        //ensure_valid_id(function() {
        next();
        //});
    });

    router.get('/users', function (req, res) {
        res.send('get all users');
    });

    router.put('/user/:id', function (req, res) {
        res.send('add a user');
    });

    router.delete('/user/:id', function (req, res) {
        res.send('delete a user');
    });

    router.post('/user/:id', function (req, res) {
        res.send('update a user');
    });

    router.get('/user/:id', function (req, res) {
        res.send('get a user');
    });
}