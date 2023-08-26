/**
 * User objects allow you to associate actions performed
 * in the system with the user that performed them.
 * The User object contains common information across
 * every user in the system regardless of status and role.
 */
import {UUID} from "./UUID";

/**
 * User objects allow you to associate actions performed in the system with the user that performed them.
 * The User object contains common information across every user in the system regardless of status and role.
 */
export interface User {
    id: UUID;

    /**
     * The email the user used to register his account
     */
    email: string;
    firstName: string;
    lastName: string;
    andokNr?: string;
    icmName?: string;
    status?: "Happy" | "Sad";
    phoneNumbers: string[];
}
