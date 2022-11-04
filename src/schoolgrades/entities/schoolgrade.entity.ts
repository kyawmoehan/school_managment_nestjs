import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Schoolclass } from "../../schoolclasses/entities/schoolclass.entity";

@Entity('school_grades')
export class Schoolgrade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @DeleteDateColumn({ name: 'deleted_at', select: false })
    deletedAt: Date;

    @OneToMany(() => Schoolclass, (schoolclass) => schoolclass.schoolgrade)
    schoolclasses: Schoolclass[]
}
