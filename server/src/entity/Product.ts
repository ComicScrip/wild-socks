import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
class Product {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  price: number;

  @Field()
  @Column()
  pictureUrl: string;
}

export default Product;
