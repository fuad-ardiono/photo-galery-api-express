import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "@gallery/entity/role";
import {Exclude, Expose} from "class-transformer";

@Entity({ name: "user" })
export class User {
    @Expose({ name: "id" })
    @PrimaryGeneratedColumn()
    id: number

    @Expose({ name: "email" })
    @Column({ name: "email" })
    email: string

    @Expose({ name: "name" })
    @Column({ name: "name" })
    name: string

    @Expose({ name: "password" })
    @Column({ name: "password" })
    @Exclude()
    password: string

    @Expose({ name: "role_id" })
    @ManyToOne(type => Role)
    @JoinColumn({ name: "role_id" })
    role: number

    @Expose({ name: "created_at" })
    @Column({ type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Expose({ name: "updated_at" })
    @Column({ type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date | null;

    @Expose({ name: "deleted_at" })
    @Column({ type: 'datetime', name: 'deleted_at', nullable: true })
    deletedAt: Date | null;
}
