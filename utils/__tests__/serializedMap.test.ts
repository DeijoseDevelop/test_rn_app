import { deserializeMap, serializeMap } from '../serializedMap';
import {expect, describe, it} from '@jest/globals';

describe('serializeMap', () => {
  it('should convert a Map into a plain object', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    expect(serializeMap(map)).toEqual({a: 1, b: 2});
  });

  it('should handle an empty Map', () => {
    const map = new Map();
    expect(serializeMap(map)).toEqual({});
  });
});

describe('deserializeMap', () => {
  it('should convert a plain object into a Map', () => {
    const obj = {a: 1, b: 2};
    const map = deserializeMap(obj);
    expect(map).toEqual(
      new Map([
        ['a', 1],
        ['b', 2],
      ]),
    );
  });

  it('should handle an empty object', () => {
    const obj = {};
    const map = deserializeMap(obj);
    expect(map).toEqual(new Map());
  });
});

describe('serializeMap and deserializeMap integration', () => {
  it('should serialize and deserialize consistently', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const obj = serializeMap(map);
    const deserializedMap = deserializeMap(obj);
    expect(deserializedMap).toEqual(map);
  });

  it('should handle edge cases with empty data', () => {
    const map = new Map();
    const obj = serializeMap(map);
    const deserializedMap = deserializeMap(obj);
    expect(deserializedMap).toEqual(map);
  });
});
