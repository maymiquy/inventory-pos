/**
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const formatParagraph = (text, maxLength = 80) => {
    if (!text) return "";

    const escapedText = text
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    if (escapedText.length > maxLength) {
        return (
            escapedText
                .slice(0, maxLength)
                .replace(/(.{1,40})(\s|$)/g, (match, p1, p2, offset) =>
                    offset + p1.length >= maxLength ? p1.trim() : `${p1}<br>`
                ) + "..."
        );
    }

    return escapedText.replace(/(.{1,40})(\s|$)/g, "$1<br>");
};
