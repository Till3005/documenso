import { describe, expect, it } from 'vitest';

import { getSignatureFontFamily } from './pdf';

describe('getSignatureFontFamily', () => {
  const expectCaveat = (family: string) => expect(family).toBe('Caveat');
  const expectNotoChain = (family: string) => {
    expect(family).toContain('"Noto Sans"');
    expect(family).toContain('"Noto Sans Chinese"');
    expect(family).toContain('"Noto Sans Japanese"');
    expect(family).toContain('"Noto Sans Korean"');
    expect(family).toContain('sans-serif');
    expect(family).not.toContain('Caveat');
  };

  it('returns Caveat for ASCII-only text', () => {
    expectCaveat(getSignatureFontFamily('John Doe'));
    expectCaveat(getSignatureFontFamily(''));
  });

  it('returns Caveat for Latin text with diacritics and Cyrillic (covered by Caveat)', () => {
    expectCaveat(getSignatureFontFamily('François'));
    expectCaveat(getSignatureFontFamily('Müller'));
    expectCaveat(getSignatureFontFamily('Søren'));
    expectCaveat(getSignatureFontFamily('Michał Bąk'));
    expectCaveat(getSignatureFontFamily('Jørgen'));
    expectCaveat(getSignatureFontFamily('Иванов'));
  });

  it('returns the Noto chain for scripts Caveat cannot render', () => {
    expectNotoChain(getSignatureFontFamily('Ελληνικά'));
    expectNotoChain(getSignatureFontFamily('عربي'));
    expectNotoChain(getSignatureFontFamily('עברית'));
    expectNotoChain(getSignatureFontFamily('도큐멘소'));
    expectNotoChain(getSignatureFontFamily('中文签名'));
    expectNotoChain(getSignatureFontFamily('こんにちは'));
  });

  it('returns the Noto chain for mixed input containing unsupported scripts', () => {
    expectNotoChain(getSignatureFontFamily('Hello 안녕'));
    expectNotoChain(getSignatureFontFamily('Ivan Ωmega'));
  });

  it('returns the Noto chain for scripts not covered by a dedicated Noto file', () => {
    expectNotoChain(getSignatureFontFamily('ሰላም')); // Ethiopic
    expectNotoChain(getSignatureFontFamily('សួស្ដី')); // Khmer
    expectNotoChain(getSignatureFontFamily('ᠮᠣᠩᠭᠣᠯ')); // Mongolian
  });
});
