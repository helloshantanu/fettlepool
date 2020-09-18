const multer = require('multer');
function imageStore(imgLocation) {
    const storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, imgLocation);
        },
        filename: function (req, file, callback) {
            const now = new Date().toISOString();
            const date = now.replace(/:/g, '-');
            
            callback(null, date+file.originalname);
        }
    });
    
    var upload = multer({ storage: storage });
    return upload;
}
module.exports={
    imageStore
}
