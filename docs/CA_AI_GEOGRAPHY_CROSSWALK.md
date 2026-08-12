# California AI Geography Crosswalk / 加州 AI 地理交叉表

| ID | Level | Exact definition | Source use | Comparability |
| --- | --- | --- | --- | --- |
| `california` | State | Official California boundary | Policy jurisdiction | CONTEXT_ONLY |
| `california-selected-institution-frame` | Institution frame | 16 individually resolved California campuses, laboratories and companies | OpenAlex research/network | DIRECTLY_COMPARABLE within frame |
| `sf-bay-area` | NEXORA metro ecosystem | Nine counties: Alameda, Contra Costa, Marin, Napa, San Francisco, San Mateo, Santa Clara, Solano, Sonoma | Institution mapping/navigation | COMPARABLE_AFTER_AGGREGATION |
| `san-jose-sunnyvale-santa-clara-msa` | BLS MSA | Source area `0041940`; Santa Clara and San Benito counties | May 2025 OEWS | CONTEXT_ONLY |
| `los-angeles` | Institution group | Selected institutions in Los Angeles County, including Pasadena; not a complete MSA aggregate | OpenAlex grouping | COMPARABLE_AFTER_AGGREGATION |
| `san-diego` | Institution group | Selected institutions in San Diego County; not a complete MSA census | OpenAlex grouping | COMPARABLE_AFTER_AGGREGATION |
| `orange-county` | Institution group | Selected institutions in Orange County/Irvine; not a standalone official MSA | OpenAlex grouping | COMPARABLE_AFTER_AGGREGATION |
| `sacramento` | Policy context | State-government context, not an empirical aggregate | Policy | NOT_COMPARABLE |
| `california-nsf-recipient-state` | Recipient state | Awards returned by `awardeeStateCode=CA`; recipient city retained | NSF 2025 | CONTEXT_ONLY |

The nine-county Bay Area is not the San Jose-Sunnyvale-Santa Clara MSA. The BLS record keeps its official MSA identifier and is not labeled “Bay Area Talent.” OpenAlex uses canonical campus/institution locations; a statewide university system is never collapsed to one city. NSF recipient location is not interpreted as award impact or performance geography.

九县湾区不等于圣何塞—森尼韦尔—圣克拉拉都会统计区。BLS 记录保留官方 MSA 标识，不称作“湾区人才”。

