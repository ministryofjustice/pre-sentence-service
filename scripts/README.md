# Database Scripts

## reset-database.ts

A script to completely reset the database schema for development purposes.

### Usage

```bash
npm run reset-database
```

### What it does

This script will:
1. **Drop the entire `presentenceservice` schema** (CASCADE) - this removes all tables, data, and database objects
2. Provide instructions for next steps

### When to use

Use this script when:
- Switching between database schema versions (e.g., changing from INTEGER to UUID primary keys)
- Database schema is corrupted or out of sync with migrations
- Starting fresh with a clean database

### ⚠️ Warning

This script is **destructive** - it will permanently delete all data in the `presentenceservice` schema. Only use in development environments!

### Next steps after reset

After running this script, you need to:
1. Run the application (this will run the migrations)
2. Seed test data: `npm run seed-test-data`

---

## seed-test-data.ts

A rerunnable script to populate the database with test data for development and testing purposes.

### Usage

```bash
npm run seed-test-data
```

### What it does

The script is **rerunnable** - it can be executed multiple times without causing errors. Each run:

1. **Clears existing test data** (by CRN: X320741, X456789, X789012)
2. **Seeds fresh test data**:
   - 5 local authorities (Sheffield, Manchester, Birmingham, Leeds, London)
   - 11 default sources of information
   - 3 person details with realistic data
   - 3 PSR reports at different stages of completion

### Test Data

#### Person 1 - John Doe (CRN: X320741)
- **DOB:** 18/08/1979
- **PNC:** 2000/0002697F
- **Address:** Greenfield House, 32 Scotland Street, Sheffield, S3 7BS
- **Main Offence:** Theft from a shop
- **Other Offences:** Common assault, Criminal damage
- **Court:** Sheffield Magistrates Court
- **Report Status:** NOT_STARTED (empty PSR)

#### Person 2 - Jane Smith (CRN: X456789)
- **DOB:** 15/03/1985
- **PNC:** 2010/0003456A
- **Address:** 15 High Street, Manchester, M1 1AB
- **Main Offence:** Burglary of a dwelling
- **Court:** Manchester Crown Court
- **Report Status:** STARTED with defendant details page completed
- **Sources:** Interview, Previous convictions, CPS summary

#### Person 3 - Robert Johnson (CRN: X789012)
- **DOB:** 22/11/1992
- **PNC:** 2015/0007890B
- **Address:** The Towers, 101 Park Lane, Birmingham, B15 2TT
- **Main Offence:** Possession with intent to supply Class B drugs
- **Other Offences:** Possession of Class A drugs
- **Court:** Birmingham Crown Court
- **Report Status:** STARTED with offence analysis and risk assessment completed
- **Sources:** Interview, Previous convictions, CPS summary, OASys assessments, Substance misuse screening tool

### Requirements

- Database connection configured in `server/config.ts`
- PostgreSQL database with `presentenceservice` schema
- Tables created by migrations (run automatically on app start)

### Notes

- The script uses the same database configuration as the application
- Safe to run in development environments
- Will not affect production data (uses specific test CRNs)
- All timestamps use PostgreSQL's `NOW()` function for consistency
