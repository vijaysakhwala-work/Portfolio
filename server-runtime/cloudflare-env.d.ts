declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    ASSETS: Fetcher;
    RESEND_API_KEY?: string;
    ENQUIRY_FROM?: string;
    ENQUIRY_TO?: string;
    BUCKET?: R2Bucket;
  }
}
