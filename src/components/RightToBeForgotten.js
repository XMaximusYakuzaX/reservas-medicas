import React, { useState } from 'react';
import { rightToBeForgottenService } from '../services/rightToBeForgottenService';

function RightToBeForgotten({ patientId }) {
  const [loading, setLoading] = useState(false);

  const handleDeleteData = async () => {
    if (
      !window.confirm(
        '¿ESTÁ SEGURO? Esta acción eliminará TODOS sus datos permanentemente y NO se puede deshacer.'
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      await rightToBeForgottenService.deletePatientData(patientId);
      alert('Datos eliminados exitosamente');
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('Error al eliminar los datos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Derecho al Olvido</h3>
      <p>Elimina permanentemente todos tus datos personales.</p>
      <button
        onClick={handleDeleteData}
        disabled={loading}
        type="button"
        style={{ backgroundColor: 'red', color: 'white' }}
      >
        {loading ? 'Eliminando...' : 'Eliminar Todos Mis Datos'}
      </button>
    </div>
  );
}

export default RightToBeForgotten;
