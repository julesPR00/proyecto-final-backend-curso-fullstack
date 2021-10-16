const path = require('path');

const uploadFileHelper = (files, validExtensions = ['jpg', 'jpeg', 'png', 'xlsx', 'docx', 'csv', 'pdf', 'gif'], directory = '') => {
    return new Promise((resolve, reject) => {
        const { file } = files;
        const nameSplit = file.name.split('.');
        const extension = nameSplit[nameSplit.length - 1];

        // Validate extension
        if (!validExtensions.includes(extension.toLowerCase())) {
            return reject(`Invalid extension ${extension} - ${validExtensions}`);
        }

        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();

        const nameFile = file.name.slice(0, -(extension.length + 1));

        const tempName = date + '_' + nameFile + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', directory, tempName);

        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            resolve(tempName);
        });
    });
}

module.exports = {
    uploadFileHelper
}