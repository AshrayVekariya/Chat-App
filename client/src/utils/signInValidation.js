// Formik with Yup
import * as yup from 'yup';

export const loginValidationSchema = yup.object({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});