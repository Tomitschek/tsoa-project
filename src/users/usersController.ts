// src/users/usersController.ts
import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    Response,
    SuccessResponse, Example,
} from "tsoa";
import { User } from "./user";
import { UsersService, UserCreationParams } from "./usersService";
import {UUID} from "./UUID";

interface ValidateErrorJSON {
    message: "Validation failed";
    details: { [name: string]: unknown };
}
@Route("users")
export class UsersController extends Controller {
    /**
     * Retrieves the details of an existing user.
     * Supply the unique user ID from either and receive corresponding user details.
     * @param userId The user's identifier
     * @param firstName Provide a username to display
     * @param lastName
     */

    /**
     * @example userId "52907745-7672-470e-a803-a2f8feb52944"
     * @example userId "e77ef155-bd12-46f0-8559-bf55f6dd4c63"
     */

    @Example<User>({
        id: "52907745-7672-470e-a803-a2f8feb52944",
        firstName: "tsoa",
        lastName: "user",
        email: "hello@tsoa.com",
        phoneNumbers: [],
        status: "Happy",
    })
    @Get("{userId}")
    public async getUser(
        @Path() userId: UUID,
        @Query() firstName?: string,
        @Query() lastName?: string
    ): Promise<User> {
        return new UsersService().get(userId, firstName, lastName);
    }
    /**
     * Add a new user. Remember that the demo API will not persist this data.
     *
     */
    @Post()
    @SuccessResponse("201", "Created") // Custom success response
    @Response<ValidateErrorJSON>(422, "Validation Failed", {
        message: "Validation failed",
        details: {
            requestBody: {
                message: "id is an excess property and therefore not allowed",
                value: "52907745-7672-470e-a803-a2f8feb52944",
            },
        },
    })
    public async createUser(
        @Body() requestBody: UserCreationParams
    ): Promise<void> {
        this.setStatus(201); // set return status 201
        new UsersService().create(requestBody);
        return;
    }
}
