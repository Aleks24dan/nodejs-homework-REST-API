const {Schema, model} = require("mongoose");
const Joi = require("joi");
const codeRegexp = /^[0-9]{9}$/;
// const { string } = require("joi");
const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const EmailSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
});

const contactSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: [true],
    },
        code: {
        type: String,
        required: true,
        unique: true,
        match: codeRegexp
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
     mail: EmailSchema,
}, {versionKey: false, timestamps: true});
   


const joiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.number().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    joiSchema,
}
