  ALTER TABLE  xpsearchyao_schema.post  ADD COLUMN ttsv tsvector;
UPDATE  xpsearchyao_schema.post  SET ttsv =
     to_tsvector('english', coalesce(title,'') || ' ' );
CREATE TRIGGER tsvectorupdatettsv BEFORE INSERT OR UPDATE
  ON  xpsearchyao_schema.post  FOR EACH ROW EXECUTE PROCEDURE
  tsvector_update_trigger(ttsv, 'pg_catalog.english', title);

  ALTER TABLE  xpsearchyao_schema.post  ADD COLUMN btsv tsvector;
UPDATE  xpsearchyao_schema.post  SET btsv =
     to_tsvector('english', coalesce(body,'') || ' ' );
CREATE TRIGGER tsvectorupdatebtsv BEFORE INSERT OR UPDATE
  ON  xpsearchyao_schema.post  FOR EACH ROW EXECUTE PROCEDURE
  tsvector_update_trigger(btsv, 'pg_catalog.english', body);
  
  CREATE INDEX gin_index ON xpsearchyao_schema.post 
  USING gin(ttsv,btsv);
  
  ALTER TABLE  xpsearchyao_schema.post  ADD COLUMN tsv tsvector;
UPDATE  xpsearchyao_schema.post  SET tsv =
     setweight(to_tsvector('english', coalesce(title,'')),'A')||
     setweight(to_tsvector('english', coalesce(body,'')),'C');
 