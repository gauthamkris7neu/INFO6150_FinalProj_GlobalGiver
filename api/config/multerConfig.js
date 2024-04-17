const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './files/',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 10000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
});


function checkFileType(file, cb){
  const filetypes = /jpeg|jpg|png|pdf|doc|docx/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images and Documents Only!');
  }
}

module.exports = {
    upload
};
