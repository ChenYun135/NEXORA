# Organizations Data Model

`OrganizationProfile` separates identity, type, nullable status/stage/location/year/website, role evidence, industry/technology/region links, policy/ecosystem links, research/patent placeholders, sources, confidence, evidence state, time validity, and limitations.

Relationship-bearing records never hide provenance: role, industry, technology, region, policy, research, patent, activity signal, and organization relationship records each carry evidence IDs and Demo/derived state. Missing scalar data remains `null`; missing record collections remain empty rather than fabricated. `OrganizationMetric` contains only relationship-derived connectivity, relationship diversity, and evidence coverage—never a quality score.
