import { Car } from "src/car/entities/car.entity";
import { Trip } from "src/trip/entities/trip.entity";
import { Column, Entity, PrimaryColumn, CreateDateColumn, OneToOne, JoinColumn, OneToMany, JoinTable } from "typeorm";

@Entity('users')
export class User {
    @PrimaryColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column()
    tipo!: string;

    @Column()
    edad!: number;

    @Column()
    cc!: number;

    @Column()
    phone!: number;

    @Column()
    photo!: string;

    @Column()
    score!: number;

    @Column()
    wallet!: number;

    @CreateDateColumn()
    created_at!: Date;

    @OneToOne(() => Car, (car) => car.user)
    @JoinColumn()
    car!: Car;

    @OneToMany(() => Trip, (trip) => trip.user)
    trips!: Trip[];
}
