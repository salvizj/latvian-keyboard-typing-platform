export const validateEditProfile = (email: string | null, password: string | null, confirmPassword: string | null) => {
    const passwordRegex = /^(?=.*[0-9])/;

    // Case 1: If only email is provided
    if (email && !password && !confirmPassword) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            return 'error_invalid_email';
        }
    }

    // Case 2: If only password and confirmPassword are provided (no email)
    if (!email && password && confirmPassword) {
        if (!password || !confirmPassword) {
            return 'error_missing_password_or_confirm_password';
        }
        if (password !== confirmPassword) {
            return 'error_confirm_password_and_password_doesnt_match';
        }
        if (!passwordRegex.test(password)) {
            return 'error_password_must_contain_number';
        }
        if (password.length < 6) {
            return 'error_password_too_short';
        }
    }

    // Case 3: If email and password are provided, but confirmPassword is not provided
    if (email && password && !confirmPassword) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            return 'error_invalid_email';
        }
        if (!passwordRegex.test(password)) {
            return 'error_password_must_contain_number';
        }
        if (password.length < 6) {
            return 'error_password_too_short';
        }
    }

    // Case 4: If email, password, and confirmPassword are all provided
    if (email && password && confirmPassword) {
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

        if (password !== confirmPassword) {
            return 'error_confirm_password_and_password_doesnt_match';
        }
    }
    // Case 5: If only password or only confirm is provided
    if (password || confirmPassword) {
        if (password !== confirmPassword) {
            return 'error_confirm_password_and_password_doesnt_match';
        }
    }

    return '';
};
