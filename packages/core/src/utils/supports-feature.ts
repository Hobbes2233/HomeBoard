export const supportsFeatureFromAttributes = (
  attributes: {
    [key: string]: any;
  },
  feature: number,
): boolean => (attributes.supported_features! & feature) !== 0;
