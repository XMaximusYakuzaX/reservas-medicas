import React, { useState } from 'react';
import { dataPortabilityService } from '../services/dataPortabilityService';

function DataPortability({ patientId }) {
  const [loading, setLoading] = useState(false);

  const handleExportData = async () => {
    setLoading(true);
    try {
      const data = await dataPortabilityService.exportPatientData(patientId);
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `patient-data-${patientId}.json`;
      link.click();
      URL.revokeObjectURL(url);
      alert('Datos exportados exitosamente');
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Error al exportar los datos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Portabilidad de Datos</h3>
      <p>Descarga tus datos personales en formato JSON.</p>
      <button onClick={handleExportData} disabled={loading} type="button">
        {loading ? 'Exportando...' : 'Exportar Mis Datos'}
      </button>
    </div>
  );
}

export default DataPortability;
