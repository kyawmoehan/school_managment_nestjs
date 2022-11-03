import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @DeleteDateColumn({ name: 'deleted_at', select: false })
    deletedAt: Date;

    @OneToMany(() => User, (user) => user.role)
    users: User[]
}
