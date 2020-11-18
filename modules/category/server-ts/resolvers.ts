import { CategoryInput, Identifier } from './sql';

interface Edges {
  cursor: number;
  node: CategoryInput & Identifier;
}

export default (pubsub: any) => ({
  Query: {
    async categories(
      obj: any,
      { limit, after, orderBy, filter, childNode }: any,
      { Category, req: { identity } }: any
    ) {
      const edgesArray: Edges[] = [];
      const { total, categories } = await Category.categoriesPagination(limit, after, orderBy, filter, childNode);
      const hasNextPage = total > after + limit;

      categories.map((listing: CategoryInput & Identifier, index: number) => {
        edgesArray.push({
          cursor: after + index,
          node: listing
        });
      });
      const endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;

      return {
        totalCount: total,
        edges: edgesArray,
        pageInfo: {
          endCursor,
          hasNextPage
        }
      };
    },
    async category(obj: any, { id, childNode }: Identifier & { childNode: string }, { Category }: any) {
      return Category.category(id, childNode);
    }
  },
  Mutation: {
    async addCategory(obj: any, { input }: { input: CategoryInput }, { Category }: any) {
      const res = await Category.addCategory(input);
      return true;
    },
    async editCategory(obj: any, { input }: { input: CategoryInput }, { Category }: any) {
      return Category.editCategory(input);
    },
    async deleteCategory(obj: any, { id }: Identifier, { Category }: any) {
      return Category.deleteCategory(id);
    }
  },
  Subscription: {}
});
