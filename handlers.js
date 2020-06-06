var model = require("./module");
var todomodel = model.todo

function emptyApi(req, res) {
    res.status(200).send({ message: "welcome" });
}

//insert user
function handleAddNewUser(req, res) {
    var data = new todomodel({ name: req.body.name, status: req.body.status });
    data.save(function (err, save) {
        if (err) {
            res.status(500).send({ message: "Something Went Wrong" });
            console.log("err:", err)
            return;
        }
        res.status(200).send({ message: "Inserted Sucessfully", id: save._id });
        console.log("save:", save);
    })
}

//update user
function handleUpdateUser(req, res) {
    todomodel.findByIdAndUpdate(req.body.id, { name: req.body.name, status: req.body.status }, function (err, updated) {
        if (err) {
            res.status(404).send({ message: "Id Not Found" });
            console.log("err:", err)
            return;
        }
        //console.log("result:", result);
        res.status(200).send({ message: "Updated Sucessfully" });
        console.log("updated:", updated);
    });
}

//delete user
function handleDeleteUser(req, res) {
    todomodel.deleteOne({ _id: req.query.id }, function (err, deleted) {
        if (err) {
            res.status(400).send({ message: "Data Not Found" });
            console.log("err:", err)
            return;
        }
        if (deleted.deletedCount == 1) {
            res.status(404).send({ message: "Deleted Sucessfully" });
            return;
        }
        if (deleted.deletedCount == 0) {
            res.status(200).send({ message: "Data Not Found" });
        }
        console.log("deleted:", deleted);
    });
}

//get users
function handleGetUsers(req, res) {
    console.log("req:", req.query, req.query.id);
    if (!req.query.id) {
        todomodel.find({}, function (err, data) {
            if (err) {
                res.status(404).send({ message: "Data Not Found" });
                console.log("err:", err)
                return;
            }
            res.status(200).send({ message: "Data Displayed Sucessfully", records: data });
            console.log("data:", data);
        });
    }
    else {
        todomodel.findById({ _id: req.query.id }, function (err, data) {
            if (err) {
                res.status(404).send({ message: "Data Not Found" });
                console.log("err:", err)
                return;
            }
            res.status(200).send({ message: "Data Displayed Sucessfully", data: data });
            console.log("data:", data);
        });

    }
}


module.exports = {
    emptyApi,
    handleAddNewUser,
    handleUpdateUser,
    handleDeleteUser,
    handleGetUsers

}