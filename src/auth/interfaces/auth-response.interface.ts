import { UserEntity } from "src/user/entities/user.entity";

export interface AuthResponse {
    user: UserEntity;
    accessToken: string;
    refreshToken: string;
}