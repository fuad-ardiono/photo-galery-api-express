import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Photo} from "@gallery/entity/photo";

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @OneToMany(type => Photo, photo => photo.album)
    photos: Photo[]

    @Column({ type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date;

    @Column({ type: 'datetime', name: 'deleted_at', nullable: true })
    deletedAt: Date;
}
