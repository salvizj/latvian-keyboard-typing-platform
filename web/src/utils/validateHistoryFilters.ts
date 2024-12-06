export const validateHistoryFilters = (
    page: string | null,
    type: string | null,
    dateFrom: string | null,
    dateTill: string | null
): string | null => {
    const isValidDateFormat = (date: string | null): boolean => {
        if (!date) return false;
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(date);
    };

    if ((page && isNaN(Number(page))) || Number(page) < 0) {
        return 'error_incorrect_page';
    }

    const validTypes = ['typingRace', 'typingTest'];
    if (type && !validTypes.includes(type)) {
        return 'error_incorrect_history_type"';
    }

    if (dateFrom) {
        if (!isValidDateFormat(dateFrom)) {
            return 'error_incorrect_date_format';
        }
    }

    if (dateTill) {
        if (!isValidDateFormat(dateTill)) {
            return 'error_incorrect_date_format';
        }
    }

    if (dateFrom && dateTill) {
        if (dateFrom > dateTill) {
            return 'error_incorrect_date';
        }
    }
    return null;
};
