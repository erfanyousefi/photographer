const {Schema, model, Types} = require("mongoose");
const RequestSchema = new Schema({
    datetime : {type : String},
    employee : {type : String},
    atelier : {type : String},
    requester : {type : String},
    price : {type : String},
}, {
    timestamps : true,
    versionKey : false
})
const requestModel = model("request", RequestSchema);
module.exports = requestModel