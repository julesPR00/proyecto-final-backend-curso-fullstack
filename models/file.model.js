const { Schema, model } = require('mongoose');

const FileSchema = Schema({
    fileName: {
        type: String,
        required: [true, 'fileName required']
    },
    // pathName: {
    //     type: String,
    //     required: [true, 'path required']
    // },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    timestamps: {
        createdAt: true, updatedAt: false
    }
});

FileSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('File', FileSchema);