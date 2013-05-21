
CREATE TABLE post (
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


CREATE TABLE comment (
    id bigint NOT NULL,
    postid bigint,
    text text,
    creationdate timestamp with time zone,
    userid bigint
);


CREATE TABLE xpsearchyao_schema."user"
(
  id bigint NOT NULL,
  firstname character varying(255),
  lastname character varying(255),
  password character varying(255),
  photourl character varying(255),
  username character varying(255),
  aboutme character varying(255),
  createdate timestamp without time zone,
  displayname character varying(255),
  downvotes bigint,
  emailhash character varying(255),
  lastaccessdate timestamp without time zone,
  location character varying(255),
  reputation bigint,
  upvotes bigint,
  views bigint,
  CONSTRAINT user_pkey PRIMARY KEY (id)
)

CREATE TABLE xpsearchyao_schema.userpostrel
(
  userid bigint NOT NULL,
  postid bigint NOT NULL,
  CONSTRAINT userpostrel_pkey PRIMARY KEY (userid, postid)
)