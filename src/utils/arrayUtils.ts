import { defaultJoinChar } from 'src/constants';

/**
 * Splits a string by a given character (see {@link defaultJoinChar}). Escaped characters
 * (characters preceded by a backslash) will not apply to the split, and the backslash will
 * be removed in the array element. Inverse of {@link joinWith}.
 *
 * @example
 * splitBy('this\\,\\,that,,the other,,,\\,')
 * // or
 * splitBy('this\\,\\,that,,the other,,,\\,', ',')
 * // would return
 * ['this,,that', '', 'the other', '', '', ',']
 */
export const splitBy = (str?: string, splitChar: string = defaultJoinChar): string[] =>
  typeof str === 'string'
    ? str
        .split(`\\${splitChar}`)
        .map(c => c.split(splitChar))
        .reduce((prev, curr, idx) => {
          if (idx === 0) {
            return curr;
          }
          return [...prev.slice(0, -1), `${prev.at(-1)}${splitChar}${curr[0]}`, ...curr.slice(1)];
        }, [])
    : [];

/**
 * Joins an array of strings using the given character (see {@link defaultJoinChar}). When
 * the given character appears in an array element, a backslash will be added just before it
 * to distinguish it from the join character. Effectively the inverse of {@link splitBy}.
 *
 * TIP: The join character can actually be a string of any length. Only the first character
 * will be searched for in the array elements and preceded by a backslash.
 *
 * @example
 * joinWith(['this,,that', '', 'the other', '', '', ','], ', ')
 * // would return
 * 'this\\,\\,that, , the other, , , \\,'
 */
export const joinWith = (strArr: any[], joinChar: string = defaultJoinChar): string =>
  strArr.map(str => `${str ?? ''}`.replaceAll(joinChar[0] ?? '', `\\${joinChar[0] ?? ''}`)).join(joinChar);

/**
 * Trims the value if it is a string. Otherwise returns the value as is.
 */
export const trimIfString = (val: any): any => (typeof val === 'string' ? val.trim() : val);

/**
 * Splits a string by comma then trims each element. Arrays are returned as is except
 * any string elements are trimmed.
 */
export const toArray = (
  v: any,
  { retainEmptyStrings }: { retainEmptyStrings?: boolean } = {},
): any[] =>
  Array.isArray(v)
    ? v.map(v => trimIfString(v))
    : typeof v === 'string'
    ? splitBy(v, defaultJoinChar)
        .filter(retainEmptyStrings ? () => true : s => !/^\s*$/.test(s))
        .map(s => s.trim())
    : typeof v === 'number'
    ? [v]
    : [];
