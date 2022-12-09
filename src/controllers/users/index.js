import usersServices from '../../services/users';
const usersDetails =  new usersServices ();
module.exports = class users {
        constructor() {
            return {
                getUsers: this.getUsers.bind(this),
                updateUsers :  this.updateUsers.bind(this),
                addUsers : this.addUsers.bind(this),
                deleteUsers : this.deleteUsers.bind(this)
            }
        }
       async  getUsers(req, res, next) {
            try {
                const register = await usersDetails.getaddress(req);
                return res.status(200).json(Object.assign({ success: true }, register));
            } catch (error) {
                next(error)
            }
        }
        async  updateUsers(req, res, next) {
            try {
                const register = await usersDetails.updateUsers(req);
                return res.status(200).json(Object.assign({ success: true }, register));
            } catch (error) {
                next(error)
            }
        }
        async  addUsers(req, res, next) {
            try {
               
                const register = await usersDetails.addUsers(req);
                return res.status(200).json(Object.assign({ success: true }, register));
            } catch (error) {
                next(error)
            }
        }
        async  deleteUsers(req, res, next) {
            try {
                const register = await usersDetails.deleteUsers(req);
                return res.status(200).json(Object.assign({ success: true }, register));
            } catch (error) {
                next(error)
            }
        }

    
}
