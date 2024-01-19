const { Schema, model} = require('mongoose')
const userSchema = new Schema (
    {
        username: {
            type: String, 
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            validate: {
                validator: function (value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(value);
            }, 
            message: 'Please enter a real email address',
            },
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }],
        friends: [{
                type: Schema.Types.ObjectId,
                ref: "User"
        }],

    },     {
        toJSON: {
            virtuals: true,
        },
            id: false,
    })
    userSchema.virtual("friendCount").get(function () {
        return this.friends.length;
    });
    const User = model("User", userSchema);

    module.exports = User;