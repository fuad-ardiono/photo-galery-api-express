import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Album} from "@gallery/entity/album";

@Entity({ name: "photo" })
export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Album)
    @JoinColumn({ name: "album_id" })
    album: number

    @Column({ name: "title" })
    title: string

    @Column({ name: "url" })
    url: string

    @Column({ name: "thumbnail_url" })
    thumbnailUrl: string

    @Column({ type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date;

    @Column({ type: 'datetime', name: 'deleted_at', nullable: true })
    deletedAt: Date;
}
