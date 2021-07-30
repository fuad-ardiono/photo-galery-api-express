import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Photo} from "@gallery/entity/photo";
import {Expose} from "class-transformer";

@Entity({ name: "album" })
export class Album {
    @Expose({ name: "id" })
    @PrimaryGeneratedColumn()
    id: number

    @Expose({ name: "title" })
    @Column()
    title: string

    @Expose({ name: "photos" })
    @OneToMany(() => Photo, photo => photo.album)
    @JoinColumn()
    photos: Photo[]

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
