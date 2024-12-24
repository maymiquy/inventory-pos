export const formatPhoneNumber = (phoneNumber) => {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

    switch (cleanedPhoneNumber.length) {
        case 10:
            return `${cleanedPhoneNumber.slice(0, 3)}-${cleanedPhoneNumber.slice(3, 6)}-${cleanedPhoneNumber.slice(6)}`;
        case 11:
            return `${cleanedPhoneNumber.slice(0, 4)}-${cleanedPhoneNumber.slice(4, 7)}-${cleanedPhoneNumber.slice(7)}`;
        case 12:
            return `${cleanedPhoneNumber.slice(0, 4)}-${cleanedPhoneNumber.slice(4, 8)}-${cleanedPhoneNumber.slice(8)}`;
        default:
            return cleanedPhoneNumber;
    }
};
