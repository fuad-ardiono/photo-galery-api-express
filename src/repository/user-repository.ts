import {EntityRepository, Equal, Repository} from "typeorm";
import {User} from "@gallery/entity/user";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async findOneByEmail(email: string): Promise<User | undefined> {
        return await this.findOne({
            relations: ['role'],
            where: {
                email
            }
        })
    }
}
