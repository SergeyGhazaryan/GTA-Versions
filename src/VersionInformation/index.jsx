import { useMemo } from 'react';
import { useParams } from 'react-router';
import { gtaData } from '../data/data';

const VersionInformation = () => {
  let { id } = useParams();

  const information = useMemo(() => {
    if (!gtaData[id].information) return;
    return gtaData[id].information;
  }, [id]);

  return information;
};

export default VersionInformation;
