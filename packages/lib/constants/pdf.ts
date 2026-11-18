export const DEFAULT_STANDARD_FONT_SIZE = 12;
export const DEFAULT_HANDWRITING_FONT_SIZE = 50;
export const DEFAULT_SIGNATURE_TEXT_FONT_SIZE = 18;

export const MIN_STANDARD_FONT_SIZE = 8;
export const MIN_HANDWRITING_FONT_SIZE = 20;

const SIGNATURE_FONT_FAMILY_CAVEAT = 'Caveat';

// CN-before-JP: the JP Noto file's Han glyphs use JP shapes, so pure-CN
// text would otherwise render with JP forms. Family names sync with
// apps/remix/app/app.css and packages/lib/server-only/pdf/helpers.ts.
const SIGNATURE_FONT_FAMILY_NOTO =
  '"Noto Sans", "Noto Sans Chinese", "Noto Sans Japanese", "Noto Sans Korean", sans-serif';

// Caveat covers Latin (including Extended-A/B diacritics) and Cyrillic, plus
// the marks, punctuation, ASCII digits and spaces names are written with.
// Scripts it cannot render (CJK, emoji, Arabic, Greek, …) still need the Noto
// fallback stack - see #3365.
const isCaveatRenderable = (str: string) =>
  /^[\p{Script=Latin}\p{Script=Cyrillic}\p{M}\p{P}\p{Zs}\d]*$/u.test(str);

// Deliberately never mix handwriting + sans-serif within one signature.
export const getSignatureFontFamily = (typedSignatureText: string): string =>
  isCaveatRenderable(typedSignatureText) ? SIGNATURE_FONT_FAMILY_CAVEAT : SIGNATURE_FONT_FAMILY_NOTO;

export const PDF_SIZE_A4_72PPI = {
  width: 595,
  height: 842,
};
