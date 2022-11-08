import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Schoolclass } from "../../schoolclasses/entities/schoolclass.entity";
import { Student } from "../../students/entities/student.entity";

@Entity('enroll_students')
export class EnrollStudent {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, student => student.enrollstudents)
    student: Student;

    @ManyToOne(() => Schoolclass, schoolclass => schoolclass.enrollstudents)
    schoolclass: Schoolclass;

    @Column()
    paid: number;

    @DeleteDateColumn({ name: 'deleted_at', select: false })
    deletedAt: Date;
}
