import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EnrollStudent } from "../../enrollstudents/entities/enrollstudent.entity";

@Entity('students')
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ name: 'student_id', unique: true })
    studentId: number;

    @Column()
    image: string;

    @DeleteDateColumn({ name: 'deleted_at', select: false })
    deletedAt: Date;

    @OneToMany(() => EnrollStudent, enrollstudent => enrollstudent.student)
    enrollstudents: EnrollStudent[];
}
