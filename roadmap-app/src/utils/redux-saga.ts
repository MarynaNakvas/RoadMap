import { isEqual, omit } from 'lodash';

// We need to split unordered values into 3 arrays: added, updated and removed.
// If value has no id we may ignore it.

export const updateUnorderedList = <T>(
  initialValues: T[],
  updatedValues: T[],
  idKey: keyof T,
): {
  added: T[];
  updated: T[];
  removed: T[];
} => {
  const initialMap = new Map<any, T>();
  const added: T[] = [];
  const updated: T[] = [];

  initialValues.forEach((initialValue) => {
    const id = initialValue[idKey];
    if (id != null) {
      initialMap.set(id, initialValue);
    }
  });

  updatedValues.forEach((updatedValue) => {
    const id = updatedValue[idKey];
    if (id == null) {
      return;
    }
    if (initialMap.has(id)) {
      const initialValue = initialMap.get(id);
      initialMap.delete(id);
      if (!isEqual(initialValue, updatedValue)) {
        updated.push(updatedValue);
      }
    } else {
      added.push(updatedValue);
    }
  });

  return {
    added,
    updated,
    removed: Array.from(initialMap.values()),
  };
};
