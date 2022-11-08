import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EnrollStudent } from "../../enrollstudents/entities/enrollstudent.entity";
import { Schoolgrade } from "../../schoolgrades/entities/schoolgrade.entity";
import { Schoollevel } from "../../schoollevels/entities/schoollevel.entity";

@Entity('school_classes')
export class Schoolclass {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Schoollevel, (schoollevel) => schoollevel.schoolclasses)
    schoollevel: Schoollevel;

    @ManyToOne(() => Schoolgrade, (schoolgrade) => schoolgrade.schoolclasses)
    schoolgrade: Schoolgrade;

    @Column()
    price: number;

    @DeleteDateColumn({ name: 'deleted_at', select: false })
    deletedAt: Date;

    @OneToMany(() => EnrollStudent, enrollstudent => enrollstudent.schoolclass)
    enrollstudents: EnrollStudent[];
}
