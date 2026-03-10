import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("trips")
export class Trip {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pickup: string;

    @Column()
    destination: string;

    @Column()
    status: string;

    @Column()
    price: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.trips)
    user: User;
}
