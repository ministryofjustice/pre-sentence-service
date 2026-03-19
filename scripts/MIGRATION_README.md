# Delius Report Migration Script

This script migrates pre-sentence reports from the Delius API to your local database.

## Prerequisites

1. **Database access**: You must have access to the local database (the script connects directly to the database)
2. **Bearer token**: You'll need a valid bearer token for the Delius API (`pre-sentence-reports-to-delius-dev`)
3. **Local database running**: Ensure your PostgreSQL database is running and configured in your `.env` file

## How to Get a Bearer Token

1. Log in to the Delius Dev environment
2. Open your browser's developer tools (F12)
3. Go to the Network tab
4. Make a request to the Delius API
5. Find the request in the Network tab and copy the `Authorization` header value (without the "Bearer " prefix)

Alternatively, if you have access to HMPPS Auth:
```bash
# Request a token from HMPPS Auth
curl -X POST https://sign-in-dev.hmpps.service.justice.gov.uk/auth/oauth/token \
  -H "Authorization: Basic <base64-encoded-client-credentials>" \
  -d "grant_type=client_credentials"
```

## Usage

### Test Mode (process until 1 success)

To test the migration, the script will process records one at a time until it successfully creates 1 report. This means it will automatically skip over any records where defendant details are not found in Delius:

```bash
npm run migrate-delius-reports
```

When prompted, enter your bearer token. The script will keep trying GUIDs from the CSV until it finds one that exists in Delius and successfully creates a report locally.

### Production Mode (all records)

To migrate all 1,923 records:

```bash
npm run migrate-delius-reports -- --production
```

When prompted, enter your bearer token.

## What the Script Does

1. **Prompts for bearer token**: Asks for Delius API authentication
2. **Reads GUIDs from CSV**: Loads from `DELIUS_PSR_IDS_DEV.csv`
3. **For each GUID**:
   - Checks if the report already exists in the database (skips if it does)
   - Fetches defendant details from Delius API
   - Fetches offence details from Delius API
   - **Directly inserts** person and report records into the database (bypasses the API)

4. **Processes in batches**: Handles 10 records concurrently to avoid overwhelming the Delius API
5. **Provides progress updates**: Shows detailed progress and statistics

## Output

The script provides detailed output including:
- Progress for each GUID
- Success/skip/failure status
- Final summary with statistics
- List of any errors encountered

Example output:
```
🚀 Starting Delius Report Migration

================================================================================
✓ Bearer token received

📁 Loaded 1923 GUIDs from CSV

🔌 Connecting to database...
✓ Database connected

================================================================================

🔄 Processing batch 1 of 193 (10 records)
--------------------------------------------------------------------------------

📋 Processing GUID: 6346e8fb-1b74-4d0e-88e1-c1cc861bbe73
  🔍 Fetching defendant details from Delius API...
  ✓ Found defendant: John Smith (CRN: X123456)
  🔍 Fetching offence details...
  ✓ Found offences: Theft from a shop
  💾 Creating report in local database...
  ✅ Successfully created report: 6346e8fb-1b74-4d0e-88e1-c1cc861bbe73

...

================================================================================
📊 Migration Summary
================================================================================
Total GUIDs:       1923
Processed:         1923
Created:           1850
Skipped:           50
Failed:            23

✅ Migration completed!
```

## Error Handling

The script handles several types of errors gracefully:
- **404 errors**: If a GUID is not found in Delius, it's skipped
- **Network errors**: Retries are built-in for transient failures
- **Database errors**: Reports that fail are logged and counted
- **Duplicate records**: Existing reports are detected and skipped

## Configuration

You can modify these constants in the script:
- `DELIUS_API_URL`: The Delius API endpoint (default: dev environment)
- `LOCAL_API_URL`: Your local API endpoint (default: http://localhost:3000)
- `CSV_FILE_PATH`: Path to the CSV file with GUIDs
- `BATCH_SIZE`: Number of concurrent requests (default: 10)
- `TEST_MODE_SUCCESS_COUNT`: Number of successful creations required in test mode (default: 1)

## Troubleshooting

### "Bearer token expired"
- Generate a new bearer token and run the script again
- Tokens typically expire after 1 hour

### "Cannot connect to database"
- Ensure your PostgreSQL database is running
- Check your `.env` file for correct database configuration
- Verify connection with: `psql -h localhost -U <username> -d <database>`

### "Database connection failed"
- Check your database configuration in `.env`
- Ensure the database is running: `docker-compose up -d`

### "Too many requests" errors
- Reduce the `BATCH_SIZE` constant in the script
- This will process fewer records concurrently

## Files

- `migrate-delius-reports.ts`: The migration script
- `DELIUS_PSR_IDS_DEV.csv`: CSV file containing GUIDs to migrate (1,923 records)

## Notes

- The script does NOT push reports to Delius, it only imports them locally
- Reports are created with minimal data (defendant details and offences only)
- You may need to manually add court information and other details later
- The script can be safely re-run; it will skip existing reports
