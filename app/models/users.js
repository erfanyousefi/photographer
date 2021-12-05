const {Types, Schema, model} = require("mongoose");

const EventSchema = new Schema({
    title : {type : String, default : undefined},
    description : {type : String, default : undefined},
    image : {type : String, default : undefined},
    date : {type : String, default : undefined},
    time : {type : String, default : undefined},
    active : {type : Boolean, default : undefined},
    flag : {type : String, default : undefined}
}, {
    versionKey : false
})

const CalenderSchema = new Schema({
    date : {type : String, default : undefined},
    time : {type : String, default : undefined},
    timestamp : {type : String, default : undefined},
    startHour : {type : String, default : undefined},
    endHours : {type : String, default : undefined},
}, {
    versionKey : false
})
const userSchema = new Schema({
    first_name : {type : String, default : undefined},
    last_name : {type : String, default : undefined},
    username : {type : String, default : undefined},
    password : {type : String, default : undefined},
    token : {type : String, default : undefined},
    auth_key : {type : String, default : undefined},
    email : {type : String, default : undefined},
    phone : {type : String, default : undefined},
    registrantCode : {type : String, default : undefined},
    nationalCode : {type : String, default : undefined},
    address : {type : String, default : ""},
    rating  : {type : Number, default : 0},
    profileImage  : {type : String, default : "default.png"},
    bio  : {type : String, default : undefined},
    role : {type : String, default : "photographer"},
    status : {type : String, default : "active"},
    active : {type : Boolean, default : false},
    myCalender : {type : [CalenderSchema] , default : []},
    conditions : {type : String, default : ""},
    events : {type : [EventSchema], default : []},
    gender : {type : String},
}, {versionKey : false, timestamps : true});
const UserModel = model("user", userSchema);
module.exports = UserModel;