import { graphql } from '@/lib/graphql/generated';

export const EntityFieldsFragment = graphql(`
  fragment EntityFieldsFragment on CRoots {
    entities {
      name
      tradeName
      taxIdentificationNumber
      localRegistrationNumber
      leiNumber
      id
      dateOfIncorporation
      address
      entityType {
        name
        id
        definition
      }
      country {
        name
        id
        code
      }
      urls {
        url
        urlType {
          name
          id
          definition
        }
      }
    }
  }
`);
