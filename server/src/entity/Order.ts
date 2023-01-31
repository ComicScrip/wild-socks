import { Min, MinLength } from "class-validator";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import OrderItem from "./OrderItem";

@ObjectType()
@Entity()
class Order {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  customerName: string;

  @Field()
  @Column()
  customerAddr: string;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;
}

@InputType()
class CartItem {
  @Field()
  productId: number;

  @Field(() => Int)
  @Min(1)
  quantity: number;
}

@InputType()
export class CreateOrderInput {
  @Field()
  @MinLength(1)
  customerName: string;

  @Field()
  @MinLength(1)
  customerAddr: string;

  @Field(() => [CartItem])
  items: CartItem[];
}

export default Order;
