import {signUp} from '../../services/auth/register';
const signUpController  =  async (req, res, next) => {
    try {
        const register = await signUp(req);
        return res.status(200).json(Object.assign({ success: true }, register));
    } catch (error) {
        console.log (error, 'error in controller sign up.')
    }
} 
module.exports = {
    signUpController
}