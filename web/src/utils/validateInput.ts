export const validateInput = (email: string, password: string, confirmPassword?: string) => {
    const passwordRegex = /^(?=.*[0-9])/;

    if (confirmPassword != undefined) {
        if (!email && !password && !confirmPassword) {
            return 'error_missing_fields';
        }
        if (!confirmPassword) {
            return 'errror_missing_confirm_password';
        }
        if (!passwordRegex.test(confirmPassword)) {
            return 'error_confirm_password_must_contain_number';
        }
        if (confirmPassword.length < 6) {
            return 'error_confirm_password_too_short';
        }
        if (password != confirmPassword) {
            return 'error_confirm_password_and_pasword_doesnt_match';
        }
    }
    if (!email && !password) {
        return 'error_missing_fields';
    }
    if (!email) {
        return 'error_missing_email';
    }
    if (!password) {
        return 'error_missing_password';
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        return 'error_invalid_email';
    }

    if (!passwordRegex.test(password)) {
        return 'error_password_must_contain_number';
    }

    if (password.length < 6) {
        return 'error_password_too_short';
    }

    return '';
};
