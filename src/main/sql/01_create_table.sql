CREATE TABLE xpsearchliu_schema."user"
(
  id bigint NOT NULL,
  reputation bigint,
  creationdate date,
  displayname character(256),
  lastaccessdate date,
  websiteurl text,
  location text,
  aboutme text,
  views bigint,
  upvotes bigint,
  downvotes bigint,
  emailhash character(256),
  age bigint,
  CONSTRAINT user_pkey PRIMARY KEY (id)
);


CREATE TABLE xpsearchliu_schema.post (
    id bigint NOT NULL,
    acceptedanswerid bigint,
    answercount bigint,
    body text,
    commentcount bigint,
    communityowneddate timestamp without time zone,
    creationdate timestamp without time zone,
    favoritecount bigint,
    lastactivitydate timestamp without time zone,
    lasteditdate timestamp without time zone,
    lasteditoruserid bigint,
    owneruserid bigint,
    posttypeid bigint,
    score bigint,
    tag character varying(255),
    title character varying(255),
    viewcount bigint
);

CREATE TABLE xpsearchliu_schema.comment (
    id bigint NOT NULL,
    postid bigint,
    text text,
    creationdate timestamp with time zone,
    userid bigint
);