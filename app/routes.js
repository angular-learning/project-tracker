var Todo = require('./models/todo');

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todo', function (req, res) {

        // use mongoose to get all todos in the database
        Todo.find(/*{ done: false },*/ function (err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                return res.send(err);

            res.json(todos.map(function (todo) {
                return {
                    id: todo._id,
                    done: todo.done,
                    text: todo.text
                };
            }));
            // return all todos in JSON format
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/todo', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.data.text,
            done: false
        }, function (err, todo) {
            if (err)
                return res.send(err);

            res.json({
                done: todo.done,
                text: todo.text,
                id: todo._id
            });
        });

    });

    // delete a todo
    app.post('/api/enable/:id', function (req, res) {
        Todo.update({
            _id: req.params.id
        }, { $set: { done: true } }, function (err, todo) {
            if (err)
                return res.send(err);

            // return removed todo's id
            res.json({ id: req.params.id });
        });
    });

    app.post('/api/disable/:id', function (req, res) {
        Todo.update({
            _id: req.params.id
        }, { $set: { done: false } }, function (err, todo) {
            if (err)
                return res.send(err);

            // return removed todo's id
            res.json({ id: req.params.id });
        });
    });

    app.post('/api/delete/:id', function (req, res) {
        Todo.remove({
            _id: req.params.id
        }, function (err, todo) {
            if (err)
                return res.send(err);

            // return removed todo's id
            res.json({ id: req.params.id });
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};