const validate = (Schema)=>async(req,res,next)=>{
    try {
        const parsebody = await Schema.parseAsync(req.body);
        req.body = parsebody;
        next();
    } catch (err) {
        const message = err.errors[0].message;
        res.status(400).json({msg:message});

    }

};
module.exports = validate;