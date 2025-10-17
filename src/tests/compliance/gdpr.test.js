import { consentService } from '../../services/consentService';
import { dataPortabilityService } from '../../services/dataPortabilityService';
import { rightToBeForgottenService } from '../../services/rightToBeForgottenService';

describe('GDPR Compliance Tests', () => {
  it('should require explicit consent for data processing', async () => {
    const consent = await consentService.giveConsent({
      patient_id: 'test-patient-id',
      consent_type: 'data_processing',
      purpose: 'Medical treatment',
    });

    expect(consent.consent_given).toBe(true);
    expect(consent.consent_date).toBeDefined();
  });

  it('should allow consent revocation', async () => {
    const consent = await consentService.giveConsent({
      patient_id: 'test-patient-id',
      consent_type: 'data_processing',
    });

    const revoked = await consentService.revokeConsent(consent.id);
    expect(revoked.consent_given).toBe(false);
  });

  it('should provide data portability', async () => {
    const exportedData = await dataPortabilityService.exportPatientData('test-patient-id');

    expect(exportedData.patient).toBeDefined();
    expect(exportedData.appointments).toBeDefined();
    expect(exportedData.consents).toBeDefined();
    expect(exportedData.export_date).toBeDefined();
  });

  it('should support right to be forgotten', async () => {
    const result = await rightToBeForgottenService.deletePatientData('test-patient-id');

    expect(result.success).toBe(true);
    expect(result.message).toContain('eliminados');
  });
});
