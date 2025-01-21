import { execute } from '@/lib/graphql/execute';
import { useFilter } from '../../use-filter';
import { validateAndFormatOptions, parseAsId, mergeConditions } from '../utils';
import { FiltersStore } from '../../use-profile-filters';
import { useQueryState, parseAsArrayOf } from 'nuqs';
import { graphql } from '@/lib/graphql/generated';
import { isNotEmpty } from '@/lib/utils/is-not-empty';
import {
  CProfileInfosBoolExp,
  CProfileSectorsBoolExp
} from '@/lib/graphql/generated/graphql';
import { siteConfig } from '@/lib/site-config';

const filterId = 'profileSectors';

export const useProfileSectorsFilter = (filterStore: FiltersStore) => {
  const [value, setValue] = useQueryState(
    filterId,
    parseAsArrayOf(parseAsId).withDefault([])
  );

  return useFilter<string, string>({
    id: filterId,
    type: 'multiselect',
    optionsQueryDeps: [filterStore],
    initialValue: value,
    onChange: newValue => setValue(newValue),
    getOptions: async () => {
      const data = await execute(
        graphql(`
          query getProfileSectorsOptions(
            $where: CProfileSectorsBoolExp
            $aggregateInput: CProfileInfosFilterInput
          ) {
            profileSectors(where: $where) {
              label: name
              value: id
              description: definition
              profileInfosAggregate(filter_input: $aggregateInput) {
                _count
              }
            }
          }
        `),
        {
          where: buildProfileSectorsWhere(filterStore),
          aggregateInput: { where: buildAggregateInput(filterStore) }
        }
      );

      return validateAndFormatOptions(
        data?.profileSectors
          ?.map(item => ({
            label: item.label,
            value: item.value,
            description: item.description,
            count: item?.profileInfosAggregate?._count
          }))
          .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
      );
    },
    getQueryConditions: value => ({
      profileSector: { id: { _in: value } }
    })
  });
};

function buildProfileSectorsWhere(
  filterStore: FiltersStore
): CProfileSectorsBoolExp {
  const conditions: CProfileSectorsBoolExp[] = [];

  if (
    isNotEmpty(filterStore.tagsFilter) ||
    isNotEmpty(siteConfig.overrideFilterValues.tags)
  ) {
    conditions.push({
      profileInfos: {
        root: {
          profileTags: {
            tagId: {
              _in: [
                ...filterStore.tagsFilter,
                ...siteConfig.overrideFilterValues.tags
              ]
            }
          }
        }
      }
    });
  }

  if (
    isNotEmpty(filterStore.productTypesFilter) ||
    isNotEmpty(siteConfig.overrideFilterValues.productTypes)
  ) {
    conditions.push({
      profileInfos: {
        root: {
          products: {
            productTypeId: {
              _in: [
                ...filterStore.productTypesFilter,
                ...siteConfig.overrideFilterValues.productTypes
              ]
            }
          }
        }
      }
    });
  }

  if (
    isNotEmpty(filterStore.productAssetRelationshipsFilter) ||
    isNotEmpty(siteConfig.overrideFilterValues.productAssetRelationships)
  ) {
    conditions.push({
      profileInfos: {
        root: {
          products: {
            productAssetRelationships: {
              asset: {
                ticker: {
                  _in: siteConfig.overrideFilterValues.productAssetRelationships
                }
              }
            }
          }
        }
      }
    });
  }

  return mergeConditions(conditions);
}

function buildAggregateInput(filterStore: FiltersStore): CProfileInfosBoolExp {
  const conditions: Array<CProfileInfosBoolExp> = [];

  if (
    isNotEmpty(filterStore.tagsFilter) ||
    isNotEmpty(siteConfig.overrideFilterValues.tags)
  ) {
    conditions.push({
      root: {
        profileTags: {
          tagId: {
            _in: [
              ...filterStore.tagsFilter,
              ...siteConfig.overrideFilterValues.tags
            ]
          }
        }
      }
    });
  }

  if (
    isNotEmpty(filterStore.productTypesFilter) ||
    isNotEmpty(siteConfig.overrideFilterValues.productTypes)
  ) {
    conditions.push({
      root: {
        products: {
          productTypeId: {
            _in: [
              ...filterStore.productTypesFilter,
              ...siteConfig.overrideFilterValues.productTypes
            ]
          }
        }
      }
    });
  }

  if (
    isNotEmpty(filterStore.productAssetRelationshipsFilter) ||
    isNotEmpty(siteConfig.overrideFilterValues.productAssetRelationships)
  ) {
    conditions.push({
      root: {
        products: {
          productAssetRelationships: {
            asset: {
              ticker: {
                _in: [
                  ...filterStore.productAssetRelationshipsFilter,
                  ...siteConfig.overrideFilterValues.productAssetRelationships
                ]
              }
            }
          }
        }
      }
    });
  }

  return mergeConditions(conditions);
}
