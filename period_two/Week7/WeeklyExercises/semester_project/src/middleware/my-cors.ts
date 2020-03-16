const cors = (req: any, res: any, next: any) => {
    res.header("Access-Control-Allow-Origin", "*"); //Wildstar
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    //Rule | Options
    //Allow all origins
    //Allow following headers <>
    next();
}

module.exports.cors = cors