import { IsoDateTransformer } from '../../../lib/core/helpers/iso-date-transformer';

describe('IsoDateTransformer', () => {
  describe('transform', () => {
    it('Should convert every iso-string property of object to new Date object', () => {
      const mockDate = new Date();
      const example = {
        0: mockDate.toISOString(),
        1: mockDate.toISOString(),
        2: '123',
      };

      const result = IsoDateTransformer.transform(example);

      expect(result).toEqual(
        expect.objectContaining({ 0: mockDate, 1: mockDate, 2: '123' }),
      );
    });

    it('Should convert every iso-string element in the array to instance of Date object', () => {
      const mockDate = new Date();
      const array = [
        mockDate.toISOString(),
        mockDate.toISOString(),
        true,
        false,
        '123',
      ];

      const result = IsoDateTransformer.transform(array);

      expect(result).toEqual(
        expect.arrayContaining([mockDate, mockDate, true, false, '123']),
      );
    });

    it('Should convert a iso-string to new Date object', () => {
      const mockDate = new Date();

      const result = IsoDateTransformer.transform(mockDate.toISOString());

      expect(result).toStrictEqual(mockDate);
    });

    it('Should not attempt to transform a date object', () => {
      const mockDate = new Date();

      const result = IsoDateTransformer.transform(mockDate);

      expect(result).toBe(mockDate);
    });

    it('Should transform nested objects', () => {
      const date = new Date();
      const test = { 0: [date.toISOString(), date.toISOString()] };

      const result = IsoDateTransformer.transform(test);

      expect(result).toEqual(
        expect.objectContaining({ 0: expect.arrayContaining([date, date]) }),
      );
    });
  });
});
