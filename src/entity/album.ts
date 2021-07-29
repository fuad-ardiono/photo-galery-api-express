import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Photo} from "@gallery/entity/photo";

@Entity({ name: "album" })
export class Album {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @OneToMany(() => Photo, photo => photo.album)
    @JoinColumn()
    photos: Photo[]

    @Column({ type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date;

    @Column({ type: 'datetime', name: 'deleted_at', nullable: true })
    deletedAt: Date;
}
