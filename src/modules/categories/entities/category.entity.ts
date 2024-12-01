import { UserEntity } from "src/modules/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, UpdateDateColumn, ManyToOne } from "typeorm";

@Entity({ name: "categories" })
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @CreateDateColumn()
    createdAt: Timestamp;
    @UpdateDateColumn()
    updatedAt: Timestamp;

    @ManyToOne(()=>UserEntity, (user)=>user.categories)
    addedBy: UserEntity;
}
