export const siteConfig = {
  pageTitle: 'Solana Explorer | The Grid',
  verifiedTagId: '7',
  logoSrc: {
    dark: '/solana-white.svg',
    light: '/solana.svg'
  },
  pageDescription: 'Explore The Grids data on the Solana ecosystem',
  displayQueries: true,
  allowHeroFiltersSearch: true,
  overrideFilterValues: {
    //overrideFilterValues: affects both the options list and the searchquery conditions
    productDeployedOn: [],
    supportsProducts: [],
    productTypes: [],
    productAssetRelationships: [],
    tags: [],
    productIds: []
  },
  overrideOptionsFilterValues: {
    //overrideOptionsFilterValues: only affects the options list for the filter
    productTypes: ['15', '16', '17']
  }
};
