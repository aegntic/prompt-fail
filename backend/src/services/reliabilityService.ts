import axios from 'axios';
import cache from 'memory-cache'; // Using memory-cache for simple in-memory caching

// --- Configuration ---
const CACHE_KEY = 'reliabilityStatusData';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes cache time

// --- Interfaces for External Status APIs ---
interface StatusPageIOResponse {
  status: {
    indicator: string;
    description: string;
  };
  // Add other potential fields if known/needed
}

interface GoogleStatusResponse {
  most_recent_update: {
    when: string; // Assuming 'when' is a string representation of the date/time
    // Add other potential fields from the update object if known/needed
  };
  // Add other potential top-level fields if known/needed
}

// Define the possible reliability statuses
export type ReliabilityStatus = 'Operational' | 'Disrupted' | 'Degraded' | 'Unknown';

// Define the structure for a single provider's status
export interface ProviderStatus {
  name: string;
  status: ReliabilityStatus;
  lastChecked: Date;
  sourceUrl?: string; // Optional: Link to the status page checked
  details?: string; // Optional: Extra details from the status page/API
}

// Define the structure for the services we want to monitor
// TODO: Move this to a configuration file or environment variables
const monitoredServices: { name: string; statusUrl: string; type: 'statuspageio' | 'google' | 'generic' }[] = [
  { name: 'OpenAI', statusUrl: 'https://status.openai.com/api/v2/status.json', type: 'statuspageio' },
  { name: 'Anthropic', statusUrl: 'https://status.anthropic.com/api/v2/status.json', type: 'statuspageio' },
  { name: 'Google AI Platform', statusUrl: 'https://status.cloud.google.com/incidents.json', type: 'google' }, // Note: Google's is complex, might need specific parsing
  { name: 'Mistral AI', statusUrl: 'https://status.mistral.ai/api/v2/status.json', type: 'statuspageio' },
  { name: 'Groq', statusUrl: 'https://status.groq.com/api/v2/status.json', type: 'statuspageio' },
  { name: 'Hugging Face', statusUrl: 'https://status.huggingface.co/api/v2/status.json', type: 'statuspageio' },
  { name: 'Stability AI', statusUrl: 'https://status.stability.ai/api/v2/status.json', type: 'statuspageio' },
  { name: 'OpenRouter', statusUrl: 'https://status.openrouter.ai/api/v2/status.json', type: 'statuspageio' },
  // Services requiring further investigation or scraping (marked as generic)
  { name: 'Llama (Meta AI)', statusUrl: 'https://metastatus.com/', type: 'generic' }, // Placeholder URL, likely needs specific scraping/API
  { name: 'DeepSeek', statusUrl: 'https://platform.deepseek.com/', type: 'generic' }, // Placeholder URL, no obvious status page found
  // TODO: Add remaining services from PLANNING.md (e.g., Grok, Leonardo, Recraft, Sora, etc.) as sources are identified.
  // TODO: Implement 'generic' type handling, potentially using cheerio for scraping if needed.
];

class ReliabilityService {
  /**
   * Fetches the current reliability status for all monitored services.
   * Uses a cache to avoid hitting external sources too frequently.
   */
  public async fetchAllStatuses(): Promise<ProviderStatus[]> {
    const cachedData = cache.get(CACHE_KEY) as ProviderStatus[] | null;

    if (cachedData) {
      console.log('Returning cached reliability data.');
      return cachedData;
    }

    console.log('Fetching fresh reliability data...');
    const statuses: ProviderStatus[] = [];
    const fetchPromises = monitoredServices.map(service =>
      this.fetchProviderStatus(service.name, service.statusUrl, service.type)
        .catch(error => {
          // Log error but return an 'Unknown' status so one failure doesn't break everything
          console.error(`Error fetching status for ${service.name}:`, error.message);
          return {
            name: service.name,
            status: 'Unknown' as ReliabilityStatus,
            lastChecked: new Date(),
            sourceUrl: service.statusUrl,
            details: `Failed to fetch: ${error.message}`,
          };
        })
    );

    const results = await Promise.all(fetchPromises);
    statuses.push(...results);

    // Store in cache
    cache.put(CACHE_KEY, statuses, CACHE_TTL_MS);
    console.log(`Cached reliability data for ${CACHE_TTL_MS / 1000 / 60} minutes.`);

    return statuses;
  }

  /**
   * Fetches the status for a single provider based on its URL and type.
   * @param name - The name of the provider.
   * @param url - The URL of the status page or API endpoint.
   * @param type - The type of status page to determine parsing logic.
   */
  private async fetchProviderStatus(name: string, url: string, type: 'statuspageio' | 'google' | 'generic'): Promise<ProviderStatus> {
    const now = new Date();
    try {
      const response = await axios.get(url, { timeout: 10000 }); // 10 second timeout
      // --- BEGIN DIAGNOSTIC LOGGING ---
      console.log(`[${name}] Fetching URL: ${url}`);
      console.log(`[${name}] Response Status: ${response.status}`);
      console.log(`[${name}] Response Content-Type: ${response.headers['content-type']}`);
      // Log the first 150 chars of the raw response data to check if it's HTML
      let dataPreview = '(Could not stringify data)';
      try {
        if (typeof response.data === 'string') {
          dataPreview = response.data.substring(0, 150);
        } else {
          dataPreview = JSON.stringify(response.data).substring(0, 150);
        }
      } catch (stringifyError: any) {
        console.warn(`[${name}] Error stringifying response data: ${stringifyError.message}`);
      }
      console.log(`[${name}] Data Preview: ${dataPreview}...`);
      // --- END DIAGNOSTIC LOGGING ---

      let status: ReliabilityStatus = 'Unknown';
      let details: string | undefined;

      // --- Parsing Logic based on type ---
      if (type === 'statuspageio' && (response.data as StatusPageIOResponse)?.status?.indicator) {
        // Standard Statuspage.io format (e.g., OpenAI, Anthropic)
        const indicator = (response.data as StatusPageIOResponse).status.indicator.toLowerCase();
        details = (response.data as StatusPageIOResponse).status.description;
        switch (indicator) {
          case 'none':
          case 'operational':
            status = 'Operational';
            break;
          case 'minor':
          case 'partial':
          case 'degraded_performance':
            status = 'Degraded';
            break;
          case 'major':
          case 'critical':
            status = 'Disrupted';
            break;
          default:
            status = 'Unknown';
            details = `Unrecognized indicator: ${indicator}`;
        }
      } else if (type === 'google' && (response.data as GoogleStatusResponse)?.most_recent_update) {
         // Basic check for Google Cloud Status (very simplified)
         // A full implementation needs proper parsing of incidents array
         // For now, assume operational if the page loads and has recent updates.
         // TODO: Implement more robust Google Cloud status parsing.
         status = 'Operational'; // Simplistic assumption
         details = `Last update: ${(response.data as GoogleStatusResponse).most_recent_update.when}`;
      } else if (type === 'generic') {
        // Placeholder for generic scraping logic (would need Cheerio)
        // TODO: Implement scraping logic if required for some services.
        status = 'Unknown';
        details = 'Generic scraping not yet implemented.';
      } else {
         details = 'Unsupported status page type or format.';
      }
      // --- End Parsing Logic ---

      return { name, status, lastChecked: now, sourceUrl: url, details };

    } catch (error: any) {
      console.error(`Failed to fetch status for ${name} from ${url}:`, error.message);
      // Distinguish between network/timeout errors and HTTP status errors
      const errorDetails = error.response ? `HTTP ${error.response.status}` : error.code || error.message;
      return {
        name,
        status: 'Unknown',
        lastChecked: now,
        sourceUrl: url,
        details: `Fetch error: ${errorDetails}`,
      };
    }
  }
}

export const reliabilityService = new ReliabilityService();