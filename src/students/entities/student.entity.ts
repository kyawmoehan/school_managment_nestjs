import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
