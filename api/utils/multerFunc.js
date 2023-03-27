const multer = require('multer');
const path = require('path')

function multerFunc () {

    const storage = multer.diskStorage({

        destination:function(req  , file , cb){


            req.destFile ='uploads'
           
            cb(null , path.join(__dirname , '../uploads'))

        },
        filename:function(req  , file , cb) {

            // console.log(file)

            const fullName = new Date().getMilliseconds() + '_' +  file.originalname

            cb(null , fullName)
        }
    })


    const upload = multer({dest:path.join(__dirname , "../uploads" ) , storage})


    return upload


}



module.exports = multerFunc