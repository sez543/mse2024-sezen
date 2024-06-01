-- SEQUENCE: public.reply_entity_seq

-- DROP SEQUENCE IF EXISTS public.reply_entity_seq;

CREATE SEQUENCE IF NOT EXISTS public.reply_entity_seq
    INCREMENT 50
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.reply_entity_seq
    OWNER TO postgres;

-- SEQUENCE: public.topic_entity_seq

-- DROP SEQUENCE IF EXISTS public.topic_entity_seq;

CREATE SEQUENCE IF NOT EXISTS public.topic_entity_seq
    INCREMENT 50
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.topic_entity_seq
    OWNER TO postgres;

-- SEQUENCE: public.user_entity_seq

-- DROP SEQUENCE IF EXISTS public.user_entity_seq;

CREATE SEQUENCE IF NOT EXISTS public.user_entity_seq
    INCREMENT 50
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.user_entity_seq
    OWNER TO postgres;

-- Table: public.topic_entity

-- DROP TABLE IF EXISTS public.topic_entity;

CREATE TABLE IF NOT EXISTS public.topic_entity
(
    id bigint NOT NULL,
    created date,
    modified date,
    title character varying(255) COLLATE pg_catalog."default",
    username character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT topic_entity_pkey PRIMARY KEY (id),
    CONSTRAINT uk_kfflubh43nams272mf4xgah23 UNIQUE (title)
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.topic_entity
    OWNER to postgres;

-- Table: public.reply_entity

-- DROP TABLE IF EXISTS public.reply_entity;

CREATE TABLE IF NOT EXISTS public.reply_entity
(
    id bigint NOT NULL,
    created date,
    modified date,
    text character varying(255) COLLATE pg_catalog."default",
    username character varying(255) COLLATE pg_catalog."default",
    topic_id bigint,
    CONSTRAINT reply_entity_pkey PRIMARY KEY (id),
    CONSTRAINT uk_p8l9j4ln4ubdh7yjhmglbbcqi UNIQUE (text),
    CONSTRAINT fkroqwl905m5dott3n6xynjmm1i FOREIGN KEY (topic_id)
        REFERENCES public.topic_entity (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.reply_entity
    OWNER to postgres;

-- Table: public.user_entity

-- DROP TABLE IF EXISTS public.user_entity;

CREATE TABLE IF NOT EXISTS public.user_entity
(
    id bigint NOT NULL,
    created date,
    modified date,
    email character varying(255) COLLATE pg_catalog."default",
    name character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    role character varying(255) COLLATE pg_catalog."default",
    username character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT user_entity_pkey PRIMARY KEY (id),
    CONSTRAINT uk_2jsk4eakd0rmvybo409wgwxuw UNIQUE (username)
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_entity
    OWNER to postgres;