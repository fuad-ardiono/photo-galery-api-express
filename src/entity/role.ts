import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Expose} from "class-transformer";

@Entity({ name: "role" })
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Expose({ name: "name" })
    @Column({ name: "name" })
    name: string

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
