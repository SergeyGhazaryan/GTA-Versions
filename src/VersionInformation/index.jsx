import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { data } from '../data';

const VersionInformation = () => {
  let { id } = useParams();

  const information = useMemo(() => {
    const necessaryData = data.find((d) => d.id == id);
    if (!necessaryData) return;
    return necessaryData.information;
  }, [id]);

  return information;
};

export default VersionInformation;
