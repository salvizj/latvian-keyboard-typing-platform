export const validateEditProfile = (email: string | null, password: string | null, confirmPassword: string | null) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[0-9])/;

    // validate email if provided
    if (email && !emailRegex.test(email)) {
        return 'error_invalid_email';
    }

    // skip password validation if neither password nor confirmPassword is provided
    if (!password && !confirmPassword) {
        return '';
    }

    // validate password match if either is provided
    if (password !== confirmPassword) {
        return 'error_confirm_password_and_password_doesnt_match';
    }

    // if password is provided, validate its requirements
    if (password) {
        if (password.length < 6) {
            return 'error_password_too_short';
        }
        if (!passwordRegex.test(password)) {
            return 'error_password_must_contain_number';
        }
    }

    return '';
};
