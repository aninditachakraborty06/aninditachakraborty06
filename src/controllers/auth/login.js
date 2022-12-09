import auth from '../../services/auth/login';
const authSerice = new auth ();
module.exports = class authController  {
    constructor (){

        return {
            login : this.login.bind(this), 
            signIn : this.signIn.bind(this),
            forgotPassword : this.forgotPassword.bind(this), 
            confirmPassword  : this.confirmPassword.bind(this)
        }
    }
    async  login(req, res, next) {
        try {
            let user = await authSerice.loginUsers(req.body);
            let token = await authSerice.createToken(user);
            // console.log (user)
            const jwtExpirySeconds = 300
            user.password = undefined;

           res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
	      
            return res.status(200).json({
                success: true,
                token:  token,
                user,
            });
            // const register = await authSerice.loginUsers(req);
            // return res.status(200).json(Object.assign({ success: true }, register));
        } catch (error) {
            next(error)
        }
    }
    async signIn (req, res, next) {
        try {
            const register = await authSerice.signIn(req);
            // console.log (register, 'register')
            return res.status(200).json(Object.assign({ success: true }, register));
        } catch (error) {
            console.log (error, 'error in controller sign in.')
        }

    }
    async forgotPassword  (req, res, next){
        try {
            const register = await authSerice.forgetPassword(req);
            // console.log (register, 'register')
            return res.status(200).json(Object.assign({ success: true }, register));
        } catch (error) {
            console.log (error, 'error from login.js controller')
        }
    }
    async confirmPassword  (req, res, next){
        try {
            const register = await authSerice.confirmPassword(req);
            // console.log (register, 'register')
            return res.status(200).json(Object.assign({ success: true }, register));
        } catch (error) {
            console.log (error, 'error from login.js controller')
        }
    }


}