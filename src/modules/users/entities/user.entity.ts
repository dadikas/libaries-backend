import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Roles } from "src/utility/common/user-role.enum";
import { CategoryEntity } from "src/modules/categories/entities/category.entity";
@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({unique: true})
    email: string;
    @Column({select: false})
    password: string;
    @Column({type: 'enum', enum: Roles, default: Roles.USER})
    roles: Roles;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Timestamp;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Timestamp;


    @OneToMany(()=>CategoryEntity, (cat)=>cat.addedBy)
    categories: CategoryEntity[];
}
