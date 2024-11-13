export const siteConfig = {
  verifiedTagId: null,
  logoSrc: '/solana.svg',
  pageTitle: 'Solana Explorer | The Grid',
  pageDescription:
    'Explore The Grids data on the Solana ecosystem',
  filterByProductIds: [22], // Used to filter which blockchains to show in the full list.
  blockchainIds: [22], // Filter default options. Filters the options of (productSupports, productDeployedOnFilter and assetDeployedOnFilter)
  blockchainProductTypeIds: [15, 16, 17], // Filter default options. used by productDeployedOnFilter.
  tags: [], // Filter default options. used by tagsFilter.
  displayQueries: true
};