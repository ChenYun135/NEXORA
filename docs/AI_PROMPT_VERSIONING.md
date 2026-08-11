# AI Prompt Versioning

Prompt templates are code-versioned with `AI_PROMPT_VERSION`. The version is included in every provider request, answer metadata, cache key, and reproducibility panel. Retrieval has an independent version.

Any semantic prompt change requires a version bump and a complete AI evaluation run. Prompts prohibit fabricated citations, unsupported numbers, hidden reasoning disclosure, instruction execution from sources, and external retrieval. Only concise evidence summaries and visible support explanations may be returned.
