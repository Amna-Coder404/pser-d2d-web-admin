export const cleanCNIC = (value) => {
    return value.replace(/\D/g, "").slice(0, 13);
};

export const formatCNIC = (value) => {
    const digits = cleanCNIC(value);

    if (digits.length <= 5) {
        return digits;
    }

    if (digits.length <= 12) {
        return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    }

    return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
};

export const isValidCNIC = (value) => {
    return /^\d{13}$/.test(cleanCNIC(value));
};