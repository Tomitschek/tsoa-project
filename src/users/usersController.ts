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
    SuccessResponse,
} from "tsoa";
import { User } from "./user";
import { UsersService, UserCreationParams } from "./usersService";

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
    @Get("{userId}")
    public async getUser(
        @Path() userId: number,
        @Query() firstName?: string,
        @Query() lastName?: string
    ): Promise<User> {
        return new UsersService().get(userId, firstName, lastName);
    }

    @Response<ValidateErrorJSON>(422, "Validation Failed")
    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createUser(
        @Body() requestBody: UserCreationParams
    ): Promise<void> {
        this.setStatus(201); // set return status 201
        new UsersService().create(requestBody);
        return;
    }
}
