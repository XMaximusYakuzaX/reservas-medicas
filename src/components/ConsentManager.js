import React, { useState, useEffect } from 'react';
import { consentService } from '../services/consentService';

function ConsentManager({ patientId }) {
  const [consents, setConsents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadConsents();
  }, [patientId]);

  const loadConsents = async () => {
    try {
      const data = await consentService.getPatientConsents(patientId);
      setConsents(data);
    } catch (error) {
      console.error('Error cargando consentimientos:', error);
    }
  };

  const handleGiveConsent = async (consentType) => {
    setLoading(true);
    try {
      await consentService.giveConsent({
        patient_id: patientId,
        consent_type: consentType,
        purpose: 'Tratamiento de datos personales',
      });
      await loadConsents();
    } catch (error) {
      console.error('Error dando consentimiento:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeConsent = async (consentId) => {
    setLoading(true);
    try {
      await consentService.revokeConsent(consentId);
      await loadConsents();
    } catch (error) {
      console.error('Error revocando consentimiento:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Gestión de Consentimientos</h3>
      <button onClick={() => handleGiveConsent('data_processing')} disabled={loading}>
        Otorgar Consentimiento
      </button>
      {consents.map((consent) => (
        <div key={consent.id}>
          <p>Consentimiento: {consent.consent_type}</p>
          <p>Estado: {consent.consent_given ? 'Activo' : 'Revocado'}</p>
          <button onClick={() => handleRevokeConsent(consent.id)}>Revocar</button>
        </div>
      ))}
    </div>
  );
}

export default ConsentManager;
