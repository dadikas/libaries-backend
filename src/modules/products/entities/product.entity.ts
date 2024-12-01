import { CategoryEntity } from "src/modules/categories/entities/category.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({ name: "products" })
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({type: "decimal", precision: 5, scale: 2})
    price: number;

    @Column()
    stock: number;

    @Column()
    author: string;

    @Column('simple-array')
    image: string[];

    @Column()
    categories: string;

    @Column()
    status: string;

    @Column()
    published: boolean;

    @Column()
    distributor: string;

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;

    @ManyToOne(()=>UserEntity, (user)=>user.products)
    addedBy: UserEntity;

    @ManyToOne(()=>CategoryEntity, (cat)=>cat.products)
    category: CategoryEntity;
}
