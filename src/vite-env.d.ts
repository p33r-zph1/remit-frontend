/// <reference types="vite/client" />

type ExtractSingleElementType<T> = T extends [infer U] ? U : never;

type LatLng = google.maps.LatLng | google.maps.LatLngLiteral;
