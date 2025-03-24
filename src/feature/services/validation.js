import * as yup from 'yup'



export const loginValidationSchema=yup.object().shape({
    email: yup
        .string()
        .email('Please enter a valid email')
        .required('Email is required'),
    password: yup.string().required('Password is required'),
})

export const registerValidationSchema = yup.object().shape({
    name: yup.string()
        .required("name is required")
        .min(3, "name must be at least 3 characters")
        .max(50, "name must be at most 20 characters"),
    username: yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters"),

    email: yup.string()
        .required("Email is required")
        .email("Invalid email format"),

    password: yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(30, "Password must be at most 30 characters"),

    confirmPassword: yup.string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
});