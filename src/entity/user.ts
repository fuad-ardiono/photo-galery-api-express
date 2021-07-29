import {Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "@gallery/entity/role";

@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "email" })
    email: string

    @Column({ name: "name" })
    name: string

    @ManyToOne(type => Role)
    @Column({ name: "role_id" })

    @Column({ type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date;

    @Column({ type: 'datetime', name: 'deleted_at', nullable: true })
    deletedAt: Date;
}
