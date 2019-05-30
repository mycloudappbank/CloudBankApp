var _TodoDBHandle = require('./models/todo');
var DBHandle = require('./models/user');

function getTodos(res) {
    _TodoDBHandle.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        _TodoDBHandle.create({
            text: req.body.text,
            value: req.body.value,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        _TodoDBHandle.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    //----------------------for bank application-------------------------------

    // get a user by name
    app.get('/api/get_user_by_name/:user_name',function(req,res){
        user_name = req.params.user_name
        DBHandle.find({user_name: user_name},function(err,user){
            if(err){
                res.send(err);
            }
            res.json(user);
        })
    })

    // add a user
    app.post('/api/add_user',function(req,res){
        DBHandle.create({
            user_name: req.body.username,
            password: req.body.password,
            balance: 0
        }, function (err, user){
            if(err)
                res.send(err);
            res.json(user);
        });
    });

    // deposit
    app.post('/api/deposit',function(req,res){
        DBHandle.update({
             user_name: req.body.user_name
        },{
             $inc: {'balance': req.body.deposit_amount}
         },function(err, data){
             if(err)
                 res.send(err);
             res.json(data);
         })
     });
 
     // withdraw
     app.post('/api/withdraw',function(req,res){
         DBHandle.update({
             user_name: req.body.user_name
         },{
             $inc: {'balance': -req.body.withdrawals_amount}
         },function(err, data){
             if(err)
                 res.send(err);
             res.json(data);
         })
     });
 
     // transfer
     app.post('/api/transfer',function(req,res){
         DBHandle.update({
             user_name: req.body.transfer_target
         },{
             $inc: {'balance': req.body.transfer_amount}
         });
         DBHandle.update({
             user_name: req.body.transfer_source
         },{
             $inc: {'balance': -req.body.transfer_amount}
         },function(err, data){
             if(err)
                 res.send(err);
             res.json(data);
         });
     });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};

