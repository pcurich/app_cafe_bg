const multer = require('multer');
const shortid = require('shortid');

const configurationMulter = {
  storage: fileStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
      cb(null,__dirname+'../../uploads/');
    },
    filename:(req,file,cb)=>{
      const extension = file.mimetype.split('/')[1];
      cb(null,`${shortid.generate()}.${extension}`);
    }
  }),
  fileFilter(req,file,cb){
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
      cb(null,true);
    }else{
      cb(new Error('Formato no valido'))
    }
  },
}

//pasar la configuracion y el campo
const upload = multer(configurationMulter).single('photo')

//UploadFile
exports.Upload = async(req, res,next) => {
  console.log(req.file);
  if(typeof req.file !== 'undefined')
  {
    upload(req,res,function(error){
      console.log('RESULTADO');
      console.log(res);
      if(error){
        res.json({message:error})
      }
      return next();
    })
  }else{
    return next();
  }
}