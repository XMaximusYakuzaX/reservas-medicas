import { supabase } from '../lib/supabase';

export const patientService = {
  async getAll() {
    const { data, error } = await supabase.from('patients').select('*').order('name');

    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase.from('patients').select('*').eq('id', id).single();

    if (error) throw error;
    return data;
  },

  async create(patientData) {
    const { data, error } = await supabase.from('patients').insert([patientData]).select();

    if (error) throw error;
    return data[0];
  },

  async update(id, patientData) {
    const { data, error } = await supabase
      .from('patients')
      .update(patientData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  },

  async delete(id) {
    const { error } = await supabase.from('patients').delete().eq('id', id);

    if (error) throw error;
  },
};
