import { DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @DeleteDateColumn({ name: 'deleted_at', select: false })
    deletedAt: Date;
}
