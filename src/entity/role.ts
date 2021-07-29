import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: "role" })
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "name" })
    name: string

    @Column({ type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date;

    @Column({ type: 'datetime', name: 'deleted_at', nullable: true })
    deletedAt: Date;
}
