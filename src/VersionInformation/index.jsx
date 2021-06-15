import React, { useMemo } from 'react';
import { gtaModel } from '../constants/gtaModel';
import { useParams } from 'react-router';

const VersionInformation = () => {
  let { id } = useParams();

  const information = useMemo(() => {
    if (gtaModel[id].information) return gtaModel[id].information;
    return <div>No content</div>;
  }, [id]);

  return information;
};

export default VersionInformation;
