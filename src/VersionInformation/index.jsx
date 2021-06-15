import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { data } from '../data';

const VersionInformation = () => {
  let { id } = useParams();

  const information = useMemo(() => {
    if (!data[id].information) return;
    return data[id].information;
  }, [id]);

  return information;
};

export default VersionInformation;
