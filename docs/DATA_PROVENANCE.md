# NEXORA Data Provenance

Every public metric must resolve through this chain:

`visual → metric definition → public export → transformation → snapshot → official source`

## Required metadata

- official provider and URL;
- source record or archive identifier;
- observation year and source period;
- retrieval date and frozen snapshot date;
- source vintage and revision state;
- schema, pipeline and taxonomy versions;
- snapshot checksum and transformation hash;
- geography level and canonical geography code;
- unit and semantic missing-value status;
- redistribution and attribution rule.

Provider availability is not evidence sufficiency. A provider can be listed as `STAGED`, `REVIEW_REQUIRED` or `NOT_CONFIGURED` while its schema and official entry point are documented. Only verified snapshots or controlled official records that pass the current public quality boundary are `READY`.

Program objectives are stored separately from observed outcomes. Announcements, designations, authorized funding, obligations, outlays and measured outcomes are not interchangeable.
