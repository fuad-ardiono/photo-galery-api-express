import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Album} from "@gallery/entity/album";
import {Expose} from "class-transformer";

@Entity({ name: "photo" })
export class Photo {
    @Expose({ name: "id" })
    @PrimaryGeneratedColumn()
    id: number

    @Expose({ name: "album" })
    @ManyToOne(() => Album, album => album.photos)
    @JoinColumn({ name: "album_id" })
    album: Album

    @Expose({ name: "title" })
    @Column({ name: "title" })
    title: string

    @Expose({ name: "url" })
    @Column({ name: "url" })
    url: string

    @Expose({ name: "thumbnail_url" })
    @Column({ name: "thumbnail_url" })
    thumbnailUrl: string

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
