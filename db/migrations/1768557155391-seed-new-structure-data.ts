import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedNewStructureData1768557155391 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Seed local authorities
    await queryRunner.query(`
      INSERT INTO presentenceservice.local_authorities (name, "createdAt", "createdBy", "lastUpdatedAt", "lastUpdatedBy", "isDeleted", version)
      VALUES
        ('Sheffield', CURRENT_TIMESTAMP::TEXT, 'system', CURRENT_TIMESTAMP::TEXT, 'system', false, 1),
        ('Manchester', CURRENT_TIMESTAMP::TEXT, 'system', CURRENT_TIMESTAMP::TEXT, 'system', false, 1),
        ('Birmingham', CURRENT_TIMESTAMP::TEXT, 'system', CURRENT_TIMESTAMP::TEXT, 'system', false, 1),
        ('Leeds', CURRENT_TIMESTAMP::TEXT, 'system', CURRENT_TIMESTAMP::TEXT, 'system', false, 1),
        ('London', CURRENT_TIMESTAMP::TEXT, 'system', CURRENT_TIMESTAMP::TEXT, 'system', false, 1);
    `)

    // Seed default sources of information
    await queryRunner.query(`
      INSERT INTO presentenceservice.sources_of_information (name, value, "isDefault", source, "createdAt", "createdBy", "lastUpdatedAt", "lastUpdatedBy", "isDeleted", version)
      VALUES
        ('cps_summary', 'CPS summary', true, 'default', CURRENT_TIMESTAMP::TEXT, 'system', CURRENT_TIMESTAMP::TEXT, 'system', false, 1),
        ('domestic_abuse_callout_information', 'Domestic abuse callout information', true, 'default', CURRENT_TIMESTAMP::TEXT, 'system', CURRENT_TIMESTAMP::TEXT, 'system', false, 1),
        ('diversity_inclusion_form', 'Diversity Information Form (DIF)', true, 'default', CURRENT_TIMESTAMP::TEXT, 'system', CURRENT_TIMESTAMP::TEXT, 'system', false, 1),
        ('interview', 'Interview', true, 'default', CURRENT_TIMESTAMP::TEXT, 'system', CURRENT_TIMESTAMP::TEXT, 'system', false, 1),
        ('oasys_assessments', 'OASys assessments', true, 'default', CURRENT_TIMESTAMP::TEXT, 'system', CURRENT_TIMESTAMP::TEXT, 'system', false, 1),
        ('previous_convictions', 'Previous convictions', true, 'default', CURRENT_TIMESTAMP::TEXT, 'system', CURRENT_TIMESTAMP::TEXT, 'system', false, 1),
        ('safeguarding_checks', 'Safeguarding checks', true, 'default', CURRENT_TIMESTAMP::TEXT, 'system', CURRENT_TIMESTAMP::TEXT, 'system', false, 1),
        ('sentencing_guidelines', 'Sentencing guidelines', true, 'default', CURRENT_TIMESTAMP::TEXT, 'system', CURRENT_TIMESTAMP::TEXT, 'system', false, 1),
        ('service_records', 'Service records', true, 'default', CURRENT_TIMESTAMP::TEXT, 'system', CURRENT_TIMESTAMP::TEXT, 'system', false, 1),
        ('substance_misuse_screening_tool', 'Substance misuse screening tool', true, 'default', CURRENT_TIMESTAMP::TEXT, 'system', CURRENT_TIMESTAMP::TEXT, 'system', false, 1),
        ('victim_statement', 'Victim statement', true, 'default', CURRENT_TIMESTAMP::TEXT, 'system', CURRENT_TIMESTAMP::TEXT, 'system', false, 1);
    `)

    // Seed person details
    await queryRunner.query(`
      INSERT INTO presentenceservice.person_details (
        crn, names, "dateOfBirth", pnc, address, "mainOffence", "otherOffences", court,
        "createdAt", "createdBy", "lastUpdatedBy", "isDeleted", version
      )
      VALUES
        (
          'X320741',
          '{"foreName": "John", "middleName": "Michael", "surname": "Doe"}'::jsonb,
          '1979-08-18',
          '2000/0002697F',
          '{"buildingName": "Greenfield House", "addressNumber": "32", "streetName": "Scotland Street", "town": "Sheffield", "district": "Sheffield City Centre", "county": "South Yorkshire", "postcode": "S3 7BS"}'::jsonb,
          'Theft from a shop',
          '["Common assault", "Criminal damage"]'::jsonb,
          '{"name": "Sheffield Magistrates Court", "localJusticeArea": "South Yorkshire"}'::jsonb,
          NOW(),
          'system',
          NOW(),
          false,
          1
        ),
        (
          'X456789',
          '{"foreName": "Jane", "middleName": "", "surname": "Smith"}'::jsonb,
          '1985-03-15',
          '2010/0003456A',
          '{"buildingName": "", "addressNumber": "15", "streetName": "High Street", "town": "Manchester", "district": "City Centre", "county": "Greater Manchester", "postcode": "M1 1AB"}'::jsonb,
          'Burglary of a dwelling',
          '[]'::jsonb,
          '{"name": "Manchester Crown Court", "localJusticeArea": "Greater Manchester"}'::jsonb,
          NOW(),
          'system',
          NOW(),
          false,
          1
        ),
        (
          'X789012',
          '{"foreName": "Robert", "middleName": "James", "surname": "Johnson"}'::jsonb,
          '1992-11-22',
          '2015/0007890B',
          '{"buildingName": "The Towers", "addressNumber": "101", "streetName": "Park Lane", "town": "Birmingham", "district": "Edgbaston", "county": "West Midlands", "postcode": "B15 2TT"}'::jsonb,
          'Possession with intent to supply Class B drugs',
          '["Possession of Class A drugs"]'::jsonb,
          '{"name": "Birmingham Crown Court", "localJusticeArea": "West Midlands"}'::jsonb,
          NOW(),
          'system',
          NOW(),
          false,
          1
        );
    `)

    // Seed report details with sample data
    await queryRunner.query(`
      DO $$
      DECLARE
        person1_id INTEGER;
        person2_id INTEGER;
        person3_id INTEGER;
        report1_id INTEGER;
        report2_id INTEGER;
        report3_id INTEGER;
      BEGIN
        -- Get person IDs
        SELECT id INTO person1_id FROM presentenceservice.person_details WHERE crn = 'X320741';
        SELECT id INTO person2_id FROM presentenceservice.person_details WHERE crn = 'X456789';
        SELECT id INTO person3_id FROM presentenceservice.person_details WHERE crn = 'X789012';

        -- Create reports for each person
        INSERT INTO presentenceservice.report_details (
          "personId", status, origin, "reportType", pages,
          "createdAt", "createdBy", "lastUpdatedBy", "isDeleted", version
        )
        VALUES
          (
            person1_id,
            'NOT_STARTED',
            '1',
            'short-format',
            '[]'::jsonb,
            NOW(),
            'system',
            NOW(),
            false,
            1
          ),
          (
            person2_id,
            'STARTED',
            '2',
            'record-of-oral',
            '[
              {
                "name": "defendant_details",
                "questions": [
                  {"id": 1, "value": "name", "answer": "Jane Smith"},
                  {"id": 2, "value": "dateOfBirth", "answer": "15/03/1985"},
                  {"id": 3, "value": "crn", "answer": "X456789"},
                  {"id": 4, "value": "pnc", "answer": "2010/0003456A"}
                ]
              }
            ]'::jsonb,
            NOW(),
            'system',
            NOW(),
            false,
            1
          ),
          (
            person3_id,
            'STARTED',
            '3',
            'short-format',
            '[
              {
                "name": "offence_analysis",
                "questions": [
                  {"id": 1, "value": "mainOffence", "answer": "Possession with intent to supply Class B drugs"},
                  {"id": 2, "value": "offenceDetails", "answer": "The defendant was found in possession of 500g of cannabis with intent to supply. Evidence includes scales, multiple bags, and large amounts of cash."},
                  {"id": 3, "value": "offencePattern", "answer": "First offence of this nature, though has previous conviction for possession of Class A drugs"}
                ]
              },
              {
                "name": "risk_assessment",
                "questions": [
                  {"id": 1, "value": "riskToPublic", "answer": "medium"},
                  {"id": 2, "value": "riskToChildren", "answer": "low"},
                  {"id": 3, "value": "riskToKnownAdults", "answer": "low"},
                  {"id": 4, "value": "riskFactors", "answer": "Drug use and association with known drug dealers"}
                ]
              }
            ]'::jsonb,
            NOW(),
            'system',
            NOW(),
            false,
            1
          )
        RETURNING id INTO report1_id, report2_id, report3_id;

        -- Link sources of information to reports
        -- For report 2 (Jane Smith's record-of-oral)
        INSERT INTO presentenceservice.report_sources_of_information (
          "reportId", "sourcesOfInformationId", "createdAt", "createdBy", "lastUpdatedAt", "lastUpdatedBy", "isDeleted", version
        )
        SELECT
          (SELECT id FROM presentenceservice.report_details WHERE "personId" = person2_id LIMIT 1),
          id,
          NOW(),
          'system',
          NOW(),
          NOW(),
          false,
          1
        FROM presentenceservice.sources_of_information
        WHERE name IN ('interview', 'previous_convictions', 'cps_summary');

        -- For report 3 (Robert Johnson's short-format)
        INSERT INTO presentenceservice.report_sources_of_information (
          "reportId", "sourcesOfInformationId", "createdAt", "createdBy", "lastUpdatedAt", "lastUpdatedBy", "isDeleted", version
        )
        SELECT
          (SELECT id FROM presentenceservice.report_details WHERE "personId" = person3_id LIMIT 1),
          id,
          NOW(),
          'system',
          NOW(),
          NOW(),
          false,
          1
        FROM presentenceservice.sources_of_information
        WHERE name IN ('interview', 'previous_convictions', 'cps_summary', 'oasys_assessments', 'substance_misuse_screening_tool');

      END $$;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Delete in reverse order to respect foreign key constraints
    await queryRunner.query(`
      DELETE FROM presentenceservice.report_sources_of_information
      WHERE "reportId" IN (
        SELECT id FROM presentenceservice.report_details
        WHERE "personId" IN (
          SELECT id FROM presentenceservice.person_details
          WHERE crn IN ('X320741', 'X456789', 'X789012')
        )
      );
    `)

    await queryRunner.query(`
      DELETE FROM presentenceservice.report_details
      WHERE "personId" IN (
        SELECT id FROM presentenceservice.person_details
        WHERE crn IN ('X320741', 'X456789', 'X789012')
      );
    `)

    await queryRunner.query(`
      DELETE FROM presentenceservice.person_details
      WHERE crn IN ('X320741', 'X456789', 'X789012');
    `)

    await queryRunner.query(`
      DELETE FROM presentenceservice.sources_of_information
      WHERE name IN (
        'cps_summary',
        'domestic_abuse_callout_information',
        'diversity_inclusion_form',
        'interview',
        'oasys_assessments',
        'previous_convictions',
        'safeguarding_checks',
        'sentencing_guidelines',
        'service_records',
        'substance_misuse_screening_tool',
        'victim_statement'
      );
    `)

    await queryRunner.query(`
      DELETE FROM presentenceservice.local_authorities
      WHERE name IN ('Sheffield', 'Manchester', 'Birmingham', 'Leeds', 'London');
    `)
  }
}
