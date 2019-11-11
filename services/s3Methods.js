const aws = require('aws-sdk');

const keys = require('../config/keys');

aws.config.update({
    accessKeyId: keys.AWS_KEY,
    secretAccessKey: keys.AWS_SECRET
});

module.exports = {
    // Update a file in a bucket
    updateFile: async(bucket, key, data, ACL) => {
        const s3 = new aws.S3();
        const params = {Bucket: bucket, Key: key, Body: data, ACL};
        s3.putObject(params, function(err, data) {
            if (err) {
                console.log(err);
                return false;
            } else {
                return true;
            }
        });
    }
};
