import { supabase } from '../lib/supabase';

export const rightToBeForgottenService = {
  async deletePatientData(patientId) {
    const { error: consentsError } = await supabase
      .from('consents')
      .delete()
      .eq('patient_id', patientId);
    if (consentsError) throw consentsError;

    const { error: appointmentsError } = await supabase
      .from('appointments')
      .delete()
      .eq('patient_id', patientId);
    if (appointmentsError) throw appointmentsError;

    const { error: patientError } = await supabase.from('patients').delete().eq('id', patientId);
    if (patientError) throw patientError;

    return { success: true, message: 'Datos eliminados exitosamente' };
  },
};
