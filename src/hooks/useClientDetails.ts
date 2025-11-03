import {useMemo} from 'react';
import {browserChecker} from "@/utils/browserChecker";

interface ClientDetails {
    application: String;
    browser: String;
}

export const useClientDetails = (): ClientDetails => {
    return useMemo(() => {
        return {
            application: "Lantra Web",
            browser: typeof navigator !== "undefined" && navigator.userAgent ? browserChecker(navigator.userAgent) :
                "Unknown"
        }
    }, []);
};
