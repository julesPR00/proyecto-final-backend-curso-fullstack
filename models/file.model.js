const { Schema, model } = require('mongoose');

const FileSchema = Schema({
    fileName: {
        type: String,
        required: [true, 'fileName required'],
    },
    path: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, { timestamps: true });

FileSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('File', FileSchema);