export type User = {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    age: number;
    role: "instructor" | "default";
    createdAt: string;
    updatedAt: string;
    roster: {
        createdAt: string;
        updatedAt: string;
        userId: number;
        activityId: number;
    }
}

export type Activity = {
    id: number;
    name: string;
    description: string;
    weekday: string;
    time: string;
    maxParticipants: number;
    minAge: number;
    maxAge: number;
    createdAt: string;
    updatedAt: string;
    instructorId: number;
    assetId: number;
    asset: {
        id: number;
        url: string;
        createdAt: string;
        updatedAt: string;
    }
    users: User[] | []
}

export interface UserProfile extends User {
    activities: Activity[];
}