const {Schema, model, Types} = require("mongoose");
const RequestSchema = new Schema({
    datetime : {type : String},
    employee : {type : String},
    atelier : {type : String},
    requester : {type : String},
    rating : {type : String, default : 0},
    price : {type : String},
    status : {type : String, default : "pending"}
}, {
    timestamps : true,
    versionKey : false
})
const requestModel = model("request", RequestSchema);
module.exports = requestModel