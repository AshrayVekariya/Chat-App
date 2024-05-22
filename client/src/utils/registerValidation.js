// Formik with Yup
import * as yup from 'yup';

export const registerValidationSchema = yup.object({
    firstName: yup
        .string()
        .required('First name is required'),
    lastName: yup
        .string()
        .required('Last name is required'),
    email: yup
        .string()
        .email()
        .required('Username is required'),
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Confirm password does not match.')
        .required('Confirm password is required'),
});