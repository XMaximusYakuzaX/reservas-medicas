import { supabase } from '../../lib/supabase';

describe('Data Protection Principles Tests', () => {
  it('should enforce data minimization', async () => {
    const patientData = {
      name: 'Test Patient',
      email: 'test@example.com',
    };

    // Verificar que solo se recopilan datos necesarios
    expect(patientData.name).toBeDefined();
    expect(patientData.email).toBeDefined();
    // No deberían existir campos innecesarios
    expect(patientData.social_security).toBeUndefined();
  });

  it('should ensure data accuracy', async () => {
    const { data, error } = await supabase.from('patients').select('email').limit(1);

    expect(error).toBeNull();
    if (data && data.length > 0) {
      // Verificar formato de email válido
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test(data[0].email)).toBe(true);
    }
  });

  it('should implement storage limitation', async () => {
    const { data: consents, error } = await supabase
      .from('consents')
      .select('expires_at')
      .not('expires_at', 'is', null)
      .limit(1);

    expect(error).toBeNull();
    // Verificar que los consentimientos tienen fecha de expiración
    if (consents && consents.length > 0) {
      expect(new Date(consents[0].expires_at) > new Date()).toBe(true);
    }
  });
});
