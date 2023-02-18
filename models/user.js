const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                `Need a valid email address`
        ]
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }],
    },

    {
        toJson: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(() => {
    return this.friends.length;
});

const user = model('user', userSchema);

module.exports = user;

