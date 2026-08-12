import { ControlledProviderClient, USPTOProvider } from "../services/public-data/providers.ts";
import { californiaAIPatentTaxonomy } from "../data/cases/california-ai/patents.ts";

const key = process.env.USPTO_API_KEY?.trim();
const requestedLive = process.argv.includes("--live-dry-run");

if (!key) {
  console.log(JSON.stringify({
    provider: "USPTO_ODP_PATENT_FILE_WRAPPER",
    status: "NOT_CONFIGURED",
    secretName: "USPTO_API_KEY",
    endpoint: "/api/v1/patent/applications/search",
    taxonomyVersion: californiaAIPatentTaxonomy.version,
    productionPromotion: false,
    nextStep: "Configure USPTO_API_KEY as a server-side Sites Secret, then run with --live-dry-run.",
  }, null, 2));
  process.exit(0);
}

if (!requestedLive) {
  console.log(JSON.stringify({
    provider: "USPTO_ODP_PATENT_FILE_WRAPPER",
    status: "CREDENTIAL_PRESENT_NOT_USED",
    secretName: "USPTO_API_KEY",
    productionPromotion: false,
    nextStep: "Pass --live-dry-run to run a bounded, non-promoting request.",
  }, null, 2));
  process.exit(0);
}

const provider = new USPTOProvider(new ControlledProviderClient(), key);
const result = await provider.searchApplications({cpcCodes: [...californiaAIPatentTaxonomy.include], limit: 10});
console.log(JSON.stringify({
  provider: "USPTO_ODP_PATENT_FILE_WRAPPER",
  status: result.status,
  fetched: result.records.length,
  totalReported: result.total,
  nextOffset: result.nextOffset,
  quality: result.quality,
  productionPromotion: false,
  geographyRule: "SOURCE_RECORD_ADDRESS_ONLY",
  taxonomyVersion: californiaAIPatentTaxonomy.version,
}, null, 2));
