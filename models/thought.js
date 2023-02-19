const { Schema, model, Types } = require('mongoose');

const reaction = new Schema(
    {
        reactionID: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },

    {
        toJson: {
            getters: true
        },
        id: false
    }
)

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            reaction
        ],
    },

    {
        toJson: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(() => {
    return this.reactions.length;
});

const thought = model('thought', thoughtSchema);

module.exports = thought