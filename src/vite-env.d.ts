/// <reference types="vite/client" />

/**
 * @example
 * type NumberArray = ElementType<number[]>;
 * // Type is number
 *
 * type StringArray = ElementType<string[]>;
 * // Type is string
 *
 * type ObjectArray = ElementType<{ name: string; age: number }[]>;
 * // Type is { name: string; age: number }
 *
 * @see https://stackoverflow.com/a/57447842/10308669
 */
type ElementType<T> = T extends (infer U)[] ? U : never;

/**
 * @example type Result = StringReplace<'Matt Pocock III', ' ', '-'>
 * @see https://www.totaltypescript.com/writing-string-replace-in-typescript
 */
type StringReplace<
  TString extends string,
  TToReplace extends string,
  TReplacement extends string,
> = TString extends `${infer TPrefix}${TToReplace}${infer TSuffix}`
  ? `${TPrefix}${TReplacement}${StringReplace<
      TSuffix,
      TToReplace,
      TReplacement
    >}`
  : TString;

/** @see https://developers.google.com/maps/documentation/javascript/examples/map-latlng-literal  */
type LatLng = google.maps.LatLng | google.maps.LatLngLiteral;
