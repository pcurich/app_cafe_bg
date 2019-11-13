

exports.New = async(req, res,next) => {

  try {
    console.log("BODY");
    console.log(req);
    console.log(req.body.name);
    console.log("header");
    console.log(req.get('Authorization'));
    res.json({message: 'OK'})
  } catch (error) {
      //console log, and next
      res.send(error);
  }
  next();
}
