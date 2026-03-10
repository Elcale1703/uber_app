import { Column, Entity, PrimaryColumn } from "typeorm";

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
}
