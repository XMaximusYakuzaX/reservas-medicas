import { supabase } from '../lib/supabase';

export const dataPortabilityService = {
  async exportPatientData(patientId) {
    const { data: patient, error: patientError } = await supabase
      .from('patients')
      .select('*')
      .eq('id', patientId)
      .single();
    if (patientError) throw patientError;

    const { data: appointments, error: appointmentsError } = await supabase
      .from('appointments')
      .select('*, doctors(name, specialty, email)')
      .eq('patient_id', patientId);
    if (appointmentsError) throw appointmentsError;

    const { data: consents, error: consentsError } = await supabase
      .from('consents')
      .select('*')
      .eq('patient_id', patientId);
    if (consentsError) throw consentsError;

    return {
      patient,
      appointments: appointments || [],
      consents: consents || [],
      export_date: new Date().toISOString(),
      format: 'JSON',
    };
  },
};
