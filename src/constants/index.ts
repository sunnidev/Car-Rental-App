
export const API_BASE_URL = __DEV__
    ? "https://localhost:3000/api/v1" : "https://your-production-url/api/v1"


export const FUEL_TYPE_LABELS: Record<string, string> = {
    PETROL: "Petrol",
    DIESEL: "Diesel",
    CNG: "CNG",
    ELECTRIC: "Electric"
}

export const TRANSMISSION_LABELS: Record<string, string> = {
    MANUAL: "Manual",
    AUTOMATIC: "Automatic"
}