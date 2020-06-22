import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;

  //Intially it will convert array to loadas array then slice and take the array items.
  return _(items).slice(startIndex).take(pageSize).value();
}
