// const Joi = require("joi");
// const valiidateClinicRegistration = async function valiidateClinicRegistration(
//   req,
//   res,
//   next
// ) {
//   try {
//     const passPattern =
//       "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]).{8,20}$";

//     const RegSchema = Joi.object({
//       user_fname: Joi.string().required(),
//       user_lname: Joi.string().required(),
//       user_email: Joi.string().email().required(),
//       contact_mobile: Joi.string().empty(""),
//       password: Joi.string().required().min(8).max(20),
//       confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
//     });
    
//     // schema options
//     const options = {
//       abortEarly: false, // include all errors
//       allowUnknown: true, // ignore unknown props
//       stripUnknown: true, // remove unknown props
//     };

//     // validate request body against schema
//     const { error, value } = RegSchema.validate(req.body, options);

//     if (error) {
//       // on fail return comma separated errors
//       const err = new Error();
//       err.name = "ValidationError";
//       err.message = `Validation error: ${error.details
//         .map((x) => x.message)
//         .join(", ")}`;
//       err.data = error.details;
//       next(err);
//     } else {
//       // on success replace req.body with validated value and trigger next middleware function
//       req.body = value;
//       next();
//     }
//   } catch (error) {
//     const err = new Error();
//     err.name = "ServerError";
//     err.message = `Clinic Register error: ${error.message}`;
//     next(err);
//   }
// };

// const validateLogin = async function validateLogin(req, res, next) {
//   try {
//     const passPattern =
//       "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]).{8,20}$";

//     const LoginSchema = Joi.object({
//       user_email: Joi.string().email().required(),
//       password: Joi.string().required().min(8).max(20),
//     });

    
//     // schema options
//     const options = {
//       abortEarly: false, // include all errors
//       allowUnknown: true, // ignore unknown props
//       stripUnknown: true, // remove unknown props
//     };

//     // validate request body against schema
//     const { error, value } = LoginSchema.validate(req.body, options);

//     if (error) {
//       // on fail return comma separated errors
//       const err = new Error();
//       err.name = "ValidationError";
//       err.message = `Validation error: ${error.details
//         .map((x) => x.message)
//         .join(", ")}`;
//       err.data = error.details;
//       next(err);
//     } else {
//       // on success replace req.body with validated value and trigger next middleware function
//       req.body = value;
//       next();
//     }
//   } catch (error) {
//     const err = new Error();
//     err.name = "ServerError";
//     err.message = `Clinic Login error: ${error.message}`;
//     next(err);
//   }
// };
// module.exports = {
//   valiidateClinicRegistration,
//   validateLogin,
// };
