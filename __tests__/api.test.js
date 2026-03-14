import { verifyEntity } from '../src/services/api';

describe('Verification API Service', () => {
  it('should return a verified status for a valid name in demo mode', async () => {
    const result = await verifyEntity({ type: 'Education', name: 'St Stithians College' });
    expect(result.status).toBe('VERIFIED');
    expect(result.entityName).toBe('St Stithians College');
  });

  it('should return UNABLE_TO_VERIFY for an invalid name in demo mode', async () => {
    const result = await verifyEntity({ type: 'Medical', name: 'Invalid Practitioner' });
    expect(result.status).toBe('UNABLE_TO_VERIFY');
  });
});
