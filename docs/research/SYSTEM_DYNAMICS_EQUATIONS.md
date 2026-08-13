# System dynamics equations

Generic annual stock update:

`S(t+1) = bound(S(t) + inflows(t) - outflows(t), 0, 120)`

Effective policy channel:

`effective(t) = instrument_intensity(t - implementation_lag) × implementation_efficiency × saturation`

Research creation:

`research_creation = research_capacity × productivity × policy_factor × infrastructure_factor × talent_factor × saturation`

Knowledge accumulation:

`knowledge(t+1) = knowledge(t) + research_creation × diffusion_factor - knowledge_decay`

Commercialization flow:

`commercialization_flow = lag(knowledge_stock) × transfer_rate × implementation_capacity × connectivity_factor`

These equations describe model structure. Their existence does not establish empirical validity. Parameter ranges, delays, clamping events and evidence statuses must be visible in every run record.
