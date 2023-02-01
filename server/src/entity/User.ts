import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { argon2id, hash, verify } from "argon2";
import { Field, InputType, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Column()
  password?: string;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

// https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
const hashingOptions = {
  memoryCost: 2 ** 16,
  timeCost: 5,
  type: argon2id,
};

export const hashPassword = async (plainPassword: string): Promise<string> =>
  await hash(plainPassword, hashingOptions);

export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> =>
  await verify(hashedPassword, plainPassword, hashingOptions);

export const getSafeAttributes = (user: User): User => ({
  ...user,
  password: undefined,
});

export default User;
