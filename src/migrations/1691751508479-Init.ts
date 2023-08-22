import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1691751508479 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table public."user"
       (
           id         uuid                    not null
               constraint "PK_cace4a159ff9f2512dd42373760"
                   primary key,
           login      varchar                 not null,
           password   varchar                 not null,
           version    integer                 not null,
           created_at timestamp default now() not null,
           updated_at timestamp default now() not null
       );

      alter table public."user"
          owner to postgres;

      `,
    );

    await queryRunner.query(
      `create table public.artist
       (
           id     uuid    not null
               constraint "PK_55b76e71568b5db4d01d3e394ed"
                   primary key,
           name   varchar not null,
           grammy boolean not null
       );

      alter table public.artist
          owner to postgres;

      `,
    );

    await queryRunner.query(
      ` create table if not exists public.album
        (
            id         uuid    not null
                constraint "PK_58e0b4b8a31bb897e6959fe3206"
                    primary key,
            name       varchar not null,
            year       integer not null,
            "artistId" uuid
                constraint "FK_3d06f25148a4a880b429e3bc839"
                    references public.artist
                    on delete set null
        );

      alter table public.album
          owner to postgres;
      `,
    );

    await queryRunner.query(
      ` create table public.track
        (
            id         uuid    not null
                constraint "PK_0631b9bcf521f8fab3a15f2c37e"
                    primary key,
            name       varchar not null,
            "albumId"  uuid
                constraint "FK_b105d945c4c185395daca91606a"
                    references public.album
                    on delete set null,
            duration   integer not null,
            "artistId" uuid
                constraint "FK_997cfd9e91fd00a363500f72dc2"
                    references public.artist
                    on delete set null
        );

      alter table public.track
          owner to postgres;
      `,
    );

    await queryRunner.query(
      ` create table public.favorites
        (
            id        uuid    not null
                constraint "PK_890818d27523748dd36a4d1bdc8"
                    primary key,
            type      varchar not null,
            artist_id uuid
                constraint "UQ_9c7c756540b38ffe4e419c8bc99"
                    unique
                constraint "FK_9c7c756540b38ffe4e419c8bc99"
                    references public.artist
                    on delete cascade,
            album_id  uuid
                constraint "UQ_2e46772aaeeaa9770bdb59d4668"
                    unique
                constraint "FK_2e46772aaeeaa9770bdb59d4668"
                    references public.album
                    on delete cascade,
            track_id  uuid
                constraint "UQ_d8d3b0b8b67970531d4a097a100"
                    unique
                constraint "FK_d8d3b0b8b67970531d4a097a100"
                    references public.track
                    on delete cascade
        );

      alter table public.favorites
          owner to postgres;

      create index "IDX_7663a7318cac608e7cef4cce43"
          on public.favorites (type);
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('favorites');
    await queryRunner.dropTable('track');
    await queryRunner.dropTable('album');
    await queryRunner.dropTable('artist');
    await queryRunner.dropTable('user');
  }
}
