# NEXORA publication figure system

Web figures and publication figures are separate outputs. The website uses a dark editorial interface; paper-ready figures use a white background, journal-safe typography, a colorblind-friendly palette, and vector-first SVG output.

Every research export must include a figure identifier, public data snapshot, caller-supplied generation date, official source list, variable definitions, and model version. Derived charts must use deterministic transformations: the same ordered public input and metadata produce the same CSV and SVG metadata.

The public utility supports CSV backing-data export, SVG metadata embedding, and browser-side PNG rendering where a chart supplies an SVG. It does not read or package unpublished research directories or private datasets.
