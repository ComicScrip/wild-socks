import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Order from "./Order";

@ObjectType()
@Entity()
class OrderItem {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  productName: string;

  @Column()
  @Field()
  productPictureUrl: string;

  @Column()
  @Field()
  productPrice: number;

  @Column()
  @Field()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}

export default OrderItem;
