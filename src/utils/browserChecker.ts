/**
 * evaluates platform based on userAgent details
 * @param userAgent - browser userAgent
 */
export const browserChecker = (userAgent: String) => {
    if (userAgent.includes("Chrome") && !userAgent.includes("Edg") && !userAgent.includes("OPR")) {
        return ("Chrome");
    } else if (userAgent.includes("Firefox")) {
        return ("Firefox");
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
        return ("Safari");
    } else if (userAgent.includes("Edg")) {
        return ("Edge");
    } else {
        return ("Other");
    }
}