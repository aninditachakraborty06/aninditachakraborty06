
import {servicelimitLess} from '../services/limitLessInsertService.js'
const limitLessInsert = async (req, res) => { 
    let response =  await  servicelimitLess();
    return res.status(200).json(Object.assign({ success: true }, response));  
}
module.exports = {limitLessInsert}