// src/users/usersService.ts
import { User } from "./user";
import {UUID} from "./UUID";

// A post request should not contain an id.
export type UserCreationParams = Pick<User, "email" | "firstName" | "lastName" | "phoneNumbers">;

export class UsersService {
    public get(id: UUID, firstName?: string, lastName?: string): User {
        return {
            id,
            email: "jane@doe.com",
            firstName: firstName ?? "Jane",
            lastName: lastName ?? "Doe",
            status: "Happy",
            phoneNumbers: [],
        };
    }

    public create(userCreationParams: UserCreationParams): User {
        return {
            id: Math.floor(Math.random() * 10000).toString(), // Random
            status: "Happy",
            ...userCreationParams,
        };
    }
}
