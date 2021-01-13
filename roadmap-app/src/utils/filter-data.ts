export const setFilterByTerm = (setFilter: (arg: any) => void) => ({
  term,
  meta: { action },
}: any) => {
  if (action === 'input-change') {
    const selected = {
      label: term,
      value: term,
    };

    setFilter({ term, selected, fromInput: true });
  }
};
