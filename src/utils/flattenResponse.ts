import BaseEntity from '../models/BaseEntity';

type InData<T> = {
  data: T;
};

type ModelAtribute<T> = {
  [K in keyof T]: T[K] extends BaseEntity
    ? // eslint-disable-next-line no-use-before-define
      InData<StrapiModelResponse<T[K]>>
    : T[K] extends any[]
    ? // eslint-disable-next-line no-use-before-define
      InData<StrapiModelResponse<T[K][number]>>
    : T[K];
};

type StrapiModelResponse<T> = {
  id: string | number;
  attributes?: Omit<ModelAtribute<T>, 'id'>;
};

type StrapiCollectionResponse<T> = StrapiModelResponse<T>[];

type StrapiApiResponse<T> =
  | StrapiModelResponse<T>
  | StrapiCollectionResponse<T>;

const isArray = (data: any) => Array.isArray(data);

const flatAttributes = <T>(attr: Omit<ModelAtribute<T>, 'id'>) => {
  Object.keys(attr).forEach((key) => {
    const value = attr[key as keyof typeof attr];
    if (!value) return;
    // check if the value has data filed
    // @ts-ignore
    if (value.data) {
      // @ts-ignore
      if (isArray(value.data)) {
        // @ts-ignore
        attr[key] = flattenStrapiResponse(value.data as StrapiApiResponse<T>);
        // @ts-ignore
      } else if (value.data.id) {
        // @ts-ignore
        attr[key] = flatten(value.data);
      }
    }
  });
  return attr;
};

const flatten = <T extends BaseEntity>(data: StrapiModelResponse<T>): T => {
  if (!data.attributes) return data as T;
  // @ts-ignore
  return {
    id: data.id,
    // @ts-ignore
    ...flatAttributes(data.attributes),
  } as T;
};

/**
 * by default strapi return for a model
 * an object with `id` an `attributes` properties
 * where `id` is the `id` of the object and attributes
 * an object which contain `others` property of the
 * model.
 *
 * this function tranform the return data into the
 * right model object ( with id and others props at
 * top level in the object) in other words it flat
 * the object
 *
 * @param data
 */
const flattenStrapiResponse = <T extends BaseEntity>(
  data: StrapiApiResponse<T>
): T | T[] => {
  if (isArray(data)) {
    return (data as StrapiCollectionResponse<T>) // if is array then data is collection
      .map<T>((item: any) => flattenStrapiResponse(item) as T);
  }
  return flatten<T>(data as StrapiModelResponse<T>);
};

export default flattenStrapiResponse;
