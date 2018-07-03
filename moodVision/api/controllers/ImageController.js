/**
 * ImageController
 *
 * @description :: Server-side logic for managing images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const vision = require('node-cloud-vision-api');

// init with auth
vision.init({auth: ''});



module.exports = {

    analyze: function (request, response) {


        request.file('image').upload(function (err, uploadedFiles) {

            if (err) {
                return res.negotiate(err);
            }
            if (uploadedFiles.length === 0){
                return res.badRequest('No file was uploaded');
            }

            const req = new vision.Request({
                image: new vision.Image(uploadedFiles[0].fd),
                features: [
                    new vision.Feature('FACE_DETECTION', 20),
                    new vision.Feature('LABEL_DETECTION',5)
                ]
            });

            console.log(req);

            // send single request
            vision.annotate(req).then(function(res){
                console.log(res);
                // handling response
                return response.json(res);
                //console.log(JSON.stringify(res.responses))
            }, function(e) {
                console.log('Error: ', e)
            });

        });
        // construct parameters


    }
};

