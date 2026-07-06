

export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    phone: string
    role: string
    isVerified: string
}

export interface City {
    id: string
    name: string
    state: string
    _count: { subLocations: number }
}

export interface subLocation {
    id: string
    name: string
    address: string
    latitude: number
    longitude: number
    _count: { Cars: number }
}

export interface Car {
    id: string;
    name: string;
    brand: string;
    model: string;
    year: number;
    registrationNo: string;
    fuelType: "PETROL" | "DIESEL" | "ELECTRIC" | "CNG";
    transmission: "MANUAL" | "AUTOMATIC";
    seats: number;
    kmLimitPerDay: number;
    pricePerHour: number;
    pricePerDay: number;
    extrakmCharge: number;
    status: "AVAILABLE" | "BOOKED" | "MAINTENANCE";
    images: string[];
    features: string[];
    subLocationId: string;
    subLocation: {
        id: string;
        name: string;
        address: string;
        city: { id: string; name: string };
    }
}

export interface Booking {
    id: string
    userId: string
    carId: string
    startTime: string
    endTime: string
    status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED" | "ACTIVE"
    totalHours:number
    basePrice:number
    totalPrice:number
    kmLimitTotal:number
    pickupAddress: string
    notes?:string
    createdAt:string
    car:{
        id:string
        name:string
        brand:string
        model:string
        image:string[]
        fuelType:string
        transmission:string
        seats:number
        subLocation:{
            name:string
            address:string
            city:{name:string}
        }
    }
}

export interface ApiResponse<T> {
    success:boolean
    message:string
    error?:string
    data?:T,
}

export interface AuthToken {
    accessToken:string
    refreshToken:string
}

export interface LoginResponse {
    user:User
    accessToken:string
    refreshToken:string
}
