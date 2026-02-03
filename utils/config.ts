export const API_BASE_URL = import.meta.env.PROD
    ? '/api' // In production (Hostinger), API is at currrent_domain/api
    : 'http://localhost/nesty-website/hostinger_migration/api'; // Local PHP dev server path (adjust if needed)
