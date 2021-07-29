import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "@gallery/entity/role";

@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "email" })
    email: string

    @Column({ name: "name" })
    name: string

    @Column({ name: "password" })
    password: string

    @ManyToOne(type => Role)
    @JoinColumn({ name: "role_id" })
    role: number

    @Column({ type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date;

    @Column({ type: 'datetime', name: 'deleted_at', nullable: true })
    deletedAt: Date;
}
