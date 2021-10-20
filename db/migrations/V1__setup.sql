CREATE TABLE IF NOT EXISTS report_definition
(
    id      SERIAL PRIMARY KEY,
    type    TEXT    NOT NULL,
    version INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS field
(
    id         SERIAL PRIMARY KEY,
    type       TEXT    NOT NULL,
    name       TEXT    NOT NULL,
    required   BOOLEAN NOT NULL DEFAULT false,
    validation TEXT
);

CREATE TABLE IF NOT EXISTS report_definition_fields
(
    id                   SERIAL PRIMARY KEY,
    report_definition_id INTEGER REFERENCES report_definition (id),
    field_id             INTEGER REFERENCES field (id)
);

CREATE TABLE IF NOT EXISTS report
(
    id                   UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
    report_definition_id INTEGER REFERENCES report_definition (id),
    status               TEXT NOT NULL DEFAULT 'NOT_STARTED'
);

CREATE TABLE IF NOT EXISTS field_value
(
    id        SERIAL PRIMARY KEY,
    report_id UUID REFERENCES report (id),
    field_id  INTEGER REFERENCES field (id),
    value     TEXT,
    version   INTEGER NOT NULL DEFAULT 1
);
