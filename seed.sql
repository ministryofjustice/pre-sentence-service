delete from field_value where "reportId"='d97277dd-1b0a-4853-b13b-8afed046bb8a';
delete from report where id='d97277dd-1b0a-4853-b13b-8afed046bb8a';
delete from report_definition_fields where "reportDefinitionId"=3;


insert into report (id, "reportDefinitionId", status) values('d97277dd-1b0a-4853-b13b-8afed046bb8a', 3, 'NOT_STARTED');
insert into report_definition_fields ("reportDefinitionId", "fieldId" ) values (3, 1);
insert into report_definition_fields ("reportDefinitionId", "fieldId" ) values (3, 2);
insert into report_definition_fields ("reportDefinitionId", "fieldId" ) values (3, 3);
insert into report_definition_fields ("reportDefinitionId", "fieldId" ) values (3, 5);

insert into field_value ("reportId", "fieldId", value) values ('d97277dd-1b0a-4853-b13b-8afed046bb8a', 1, 'John Doe');
insert into field_value ("reportId", "fieldId", value) values ('d97277dd-1b0a-4853-b13b-8afed046bb8a', 2, '18/08/1979');
insert into field_value ("reportId", "fieldId", value) values ('d97277dd-1b0a-4853-b13b-8afed046bb8a', 3, 'X320741');
insert into field_value ("reportId", "fieldId", value) values ('d97277dd-1b0a-4853-b13b-8afed046bb8a', 5, '99 Some Lane, somewhere, SO2 3ME');


CREATE OR REPLACE FUNCTION insert_field_by_name(field_name text, initial_value text)
RETURNS VOID AS $$
DECLARE
    fixed_report_id UUID := 'd97277dd-1b0a-4853-b13b-8afed046bb8a';
    fixed_report_definition_id INT := 3;
BEGIN
  DELETE FROM field WHERE name = field_name;

  WITH new_field AS (
    INSERT INTO field (name)
    VALUES (field_name)
    RETURNING id
  ),
  insert_field_value AS (
    INSERT INTO field_value ("reportId", "fieldId", value)
    SELECT fixed_report_id, id, initial_value FROM new_field
  )
  INSERT INTO report_definition_fields ("reportDefinitionId", "fieldId")
  SELECT fixed_report_definition_id, id FROM new_field;
END;
$$ LANGUAGE plpgsql;

SELECT insert_field_by_name('offencesUnderConsideration', 'Offences under consideration');
SELECT insert_field_by_name('offencesPattern', 'Pattern of offences');
SELECT insert_field_by_name('riskPredictors', 'Key risk predictors');
SELECT insert_field_by_name('riskAndHarmFactors', 'Factors contributing to risk and harm');
SELECT insert_field_by_name('defendantBehaviour', 'Observed behaviour of defendant');
SELECT insert_field_by_name('proposedSentence', 'Suggested sentence');
SELECT insert_field_by_name('proposedSentenceRationale', 'Rationale for proposed sentence');
SELECT insert_field_by_name('alternativeSentencingOptions', 'Other sentencing options considered');
SELECT insert_field_by_name('sentenceImpact', 'Potential impact of sentence');
SELECT insert_field_by_name('address-pos', 'Greenfield House');
SELECT insert_field_by_name('address-number', '32');
SELECT insert_field_by_name('address-streetName', 'Scotland street');
SELECT insert_field_by_name('address-town', 'Sheffield');
SELECT insert_field_by_name('address-district', 'Sheffield City Centre');
SELECT insert_field_by_name('address-county', 'South Yorkshire');
SELECT insert_field_by_name('address-postcode', 'S3 7BS');
