# Production Data Rollback

Fetch → normalize → validate → quality → stage → promote is atomic. Active snapshots are untouched until promotion succeeds. Large loss, empty results, provenance gaps, invalid mappings or schema drift block promotion. Rollback restores the prior immutable snapshot and marks the failed provider degraded; cached/LKG data remain visible with freshness status.
