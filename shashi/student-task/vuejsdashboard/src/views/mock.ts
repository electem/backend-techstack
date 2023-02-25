import { Item, ServerOptions } from "vue3-easy-data-table";

export const mockClientItems = (itemsNumber = 100): Item[] => {
  const mockItems: Item[] = [];

  for (let i = 1; i < itemsNumber + 1; i += 1) {
    mockItems.push({
      name: `schoolname-${i}`,
    });
  }
  return mockItems;
};

export const mockServerItems = async (
  serverOptions: ServerOptions
): Promise<{
  serverCurrentPageItems: Item[];
  serverTotalItemsLength: number;
}> => {
  const { page, rowsPerPage } = serverOptions;
  const serverItemsLength = 500;
  const serverTotalItems = mockClientItems(serverItemsLength);
  await new Promise((s) => setTimeout(s, 2000));
  return {
    serverCurrentPageItems: serverTotalItems.slice(
      (page - 1) * rowsPerPage,
      page * rowsPerPage
    ),
    serverTotalItemsLength: serverItemsLength,
  };
};
