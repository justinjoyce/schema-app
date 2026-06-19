// Static FIFA World Rankings data (top 50 nations).
// Source: FIFA World Rankings — https://www.fifa.com/fifa-world-ranking
//
// This file serves as a local data enrichment layer for the CupScope GraphQL explorer.
// The Countries GraphQL API (countries.trevorblades.com) provides country metadata
// but no football ranking data. Rather than omitting the feature or relying on a
// paid sports API, a static dataset is used — a practical pattern when third-party
// data sources are incomplete or unavailable.
//
// Country codes use ISO 3166-1 alpha-2 format, matching the 'code' field
// returned by the Countries GraphQL API, enabling direct lookup by country code.

export interface FifaRanking {
  code: string  // ISO 3166-1 alpha-2 country code (e.g. 'AR' for Argentina)
  rank: number  // FIFA World Ranking position
}

export const fifaRankings: FifaRanking[] = [
  { code: 'AR', rank: 1 }, // Argentina
  { code: 'ES', rank: 2 }, // Spain
  { code: 'FR', rank: 3 }, // France
  { code: 'GB', rank: 4 }, // England
  { code: 'PT', rank: 5 }, // Portugal
  { code: 'BR', rank: 6 }, // Brazil
  { code: 'MA', rank: 7 }, // Morocco
  { code: 'NL', rank: 8 }, // Netherlands
  { code: 'BE', rank: 9 }, // Belgium
  { code: 'DE', rank: 10 }, // Germany
  { code: 'HR', rank: 11 }, // Croatia
  { code: 'CO', rank: 13 }, // Colombia
  { code: 'MX', rank: 14 }, // Mexico
  { code: 'SN', rank: 15 }, // Senegal
  { code: 'UY', rank: 16 }, // Uruguay
  { code: 'US', rank: 17 }, // United States
  { code: 'JP', rank: 18 }, // Japan
  { code: 'CH', rank: 19 }, // Switzerland
  { code: 'IR', rank: 20 }, // Iran
  { code: 'TR', rank: 22 }, // Türkiye
  { code: 'EC', rank: 23 }, // Ecuador
  { code: 'AT', rank: 24 }, // Austria
  { code: 'KR', rank: 25 }, // South Korea
  { code: 'AU', rank: 27 }, // Australia
  { code: 'DZ', rank: 28 }, // Algeria
  { code: 'EG', rank: 29 }, // Egypt
  { code: 'CA', rank: 30 }, // Canada
  { code: 'NO', rank: 31 }, // Norway
  { code: 'CI', rank: 33 }, // Ivory Coast
  { code: 'PA', rank: 34 }, // Panama
  { code: 'SE', rank: 38 }, // Sweden
  { code: 'CZ', rank: 40 }, // Czechia
  { code: 'PY', rank: 41 }, // Paraguay
  { code: 'GB', rank: 42 }, // Scotland
  { code: 'TN', rank: 45 }, // Tunisia
  { code: 'CD', rank: 46 }, // DR Congo
  { code: 'UZ', rank: 50 }, // Uzbekistan
  { code: 'QA', rank: 56 }, // Qatar
  { code: 'IQ', rank: 57 }, // Iraq
  { code: 'ZA', rank: 60 }, // South Africa
  { code: 'SA', rank: 61 }, // Saudi Arabia
  { code: 'JO', rank: 63 }, // Jordan
  { code: 'BA', rank: 64 }, // Bosnia and Herzegovina
  { code: 'CV', rank: 67 }, // Cape Verde
  { code: 'GH', rank: 73 }, // Ghana
  { code: 'HT', rank: 82 }, // Haiti
  { code: 'CW', rank: 83 }, // Curaçao
  { code: 'NZ', rank: 85 }, // New Zealand
]
