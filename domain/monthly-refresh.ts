export type RefreshState = "CURRENT" | "UPDATED" | "NO_NEW_RELEASE" | "STALE" | "DEGRADED" | "NOT_CONFIGURED" | "REVIEW_REQUIRED" | "FAILED";
export type RefreshMode = "full" | "single-provider" | "metadata-only";
export type NativeCadence = "DAILY" | "MONTHLY" | "QUARTERLY" | "ANNUAL" | "ONGOING" | "PROGRAM_MILESTONE" | "MANUAL";

export interface ProviderRefreshPolicy {
  provider_id: string;
  native_update_frequency: NativeCadence;
  monthly_check_enabled: boolean;
  refresh_method: "OFFICIAL_API" | "OFFICIAL_BULK" | "OFFICIAL_REGISTER" | "OFFICIAL_PAGE";
  latest_official_release: string;
  last_checked_at: string;
  last_successful_refresh: string | null;
  current_snapshot_id: string | null;
  coverage_start: string | null;
  coverage_end: string | null;
  stale_after_days: number;
  status: RefreshState;
  next_expected_check: string;
  requires_credentials: boolean;
  failure_count: number;
  last_error_class: string | null;
  official_url: string;
}

export interface SnapshotRecord {
  snapshot_id: string;
  provider: string;
  retrieval_date: string;
  official_release_date: string | null;
  query_download_specification: string;
  record_count: number;
  checksum: string;
  schema_version: string;
  coverage: string;
  source_vintage: string;
  pipeline_commit: string;
  layer: "LIVE_PUBLIC" | "LATEST_VERIFIED" | "HISTORICAL_ARCHIVE";
}

export interface RevisionRecord {
  record_id: string;
  field: string;
  old_value: string | number | null;
  new_value: string | number | null;
  release_vintage: string;
  revision_date: string;
}

export interface RefreshReport {
  month: string;
  generated_at: string;
  mode: RefreshMode;
  providers_checked: number;
  providers_updated: string[];
  providers_unchanged: string[];
  providers_degraded: string[];
  providers_not_configured: string[];
  qa_failures: Array<{provider_id:string; error_class:string}>;
  public_aggregates_changed: boolean;
  candidate_promoted: boolean;
  private_research_touched: false;
}
