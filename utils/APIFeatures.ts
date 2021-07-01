import { Block } from "../types/Block";

class APIFeatures {
  static filterByHash(blocks: Block[], hash: string) {
    return blocks.filter((block) => block.hash.startsWith(hash));
  }

  static sortByHeight(blocks: Block[]) {
    const sortedBlocks = [...blocks];
    sortedBlocks.sort((a, b) => {
      if (a.height > b.height) return 1;
      return -1;
    });
  }

  static paginate(blocks: Block[], page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const paginatedBlocks = [...blocks];
    return paginatedBlocks.slice(skip, page * limit);
  }
}

export default APIFeatures;
