import { User } from "src/user/entities/user.entity";

export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}