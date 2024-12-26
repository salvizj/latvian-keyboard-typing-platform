export const validateSignnOut = (email: string, password: string, confirmPassword?: string) => {
    const passwordRegex = /^(?=.*[0-9])/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!email && !password) {
        return 'error_missing_fields';
    }
    if (!email) {
        return 'error_missing_email';
    }
    if (!password) {
        return 'error_missing_password';
    }
    if (confirmPassword != undefined) {
        if (!confirmPassword) {
            return 'error_missing_confirm_password';
        }
    }

    if (!emailRegex.test(email)) {
        return 'error_invalid_email';
    }

    if (!passwordRegex.test(password)) {
        return 'error_password_must_contain_number';
    }

    if (password.length < 6) {
        return 'error_password_too_short';
    }

    if (confirmPassword != undefined) {
        if (password != confirmPassword) {
            return 'error_confirm_password_and_password_doesnt_match';
        }
    }
    return '';
};
