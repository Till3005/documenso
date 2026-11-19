import { describe, expect, it } from 'vitest';

import { isEnvelopePresignTokenScopeValid } from './envelope';

const legacyDocumentEnvelope = { id: 'envelope_abc123', secondaryId: 'document_42' };
const legacyTemplateEnvelope = { id: 'envelope_def456', secondaryId: 'template_7' };
const currentEnvelope = { id: 'envelope_ghi789', secondaryId: 'clx1234567890abcdef' };

describe('isEnvelopePresignTokenScopeValid', () => {
  it('allows unscoped tokens for any envelope', () => {
    expect(isEnvelopePresignTokenScopeValid(undefined, currentEnvelope)).toBe(true);
    expect(isEnvelopePresignTokenScopeValid(undefined, legacyDocumentEnvelope)).toBe(true);
  });

  it('allows the envelopeId scope for the matching envelope', () => {
    expect(isEnvelopePresignTokenScopeValid('envelopeId:envelope_ghi789', currentEnvelope)).toBe(true);
    expect(isEnvelopePresignTokenScopeValid('envelopeId:envelope_abc123', legacyDocumentEnvelope)).toBe(true);
  });

  it('rejects scopes belonging to a different envelope', () => {
    expect(isEnvelopePresignTokenScopeValid('envelopeId:envelope_other', currentEnvelope)).toBe(false);
    expect(isEnvelopePresignTokenScopeValid('documentId:42', currentEnvelope)).toBe(false);
  });

  it('maps legacy secondary ids to documentId and templateId scopes', () => {
    expect(isEnvelopePresignTokenScopeValid('documentId:42', legacyDocumentEnvelope)).toBe(true);
    expect(isEnvelopePresignTokenScopeValid('templateId:42', legacyDocumentEnvelope)).toBe(false);
    expect(isEnvelopePresignTokenScopeValid('templateId:7', legacyTemplateEnvelope)).toBe(true);
    expect(isEnvelopePresignTokenScopeValid('documentId:7', legacyTemplateEnvelope)).toBe(false);
  });

  it('rejects legacy scopes on envelopes with cuid secondary ids', () => {
    expect(isEnvelopePresignTokenScopeValid('documentId:42', currentEnvelope)).toBe(false);
  });
});
