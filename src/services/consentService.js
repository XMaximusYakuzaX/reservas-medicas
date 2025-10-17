import { supabase } from '../lib/supabase';

export const consentService = {
  async getPatientConsents(patientId) {
    const { data, error } = await supabase
      .from('consents')
      .select('*')
      .eq('patient_id', patientId)
      .order('consent_date', { ascending: false });
    if (error) throw error;
    return data;
  },

  async giveConsent(consentData) {
    const { data, error } = await supabase
      .from('consents')
      .insert([
        {
          ...consentData,
          consent_given: true,
          consent_date: new Date().toISOString(),
        },
      ])
      .select();
    if (error) throw error;
    return data[0];
  },

  async revokeConsent(consentId) {
    const { data, error } = await supabase
      .from('consents')
      .update({
        consent_given: false,
        consent_date: new Date().toISOString(),
      })
      .eq('id', consentId)
      .select();
    if (error) throw error;
    return data[0];
  },
};
