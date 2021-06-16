import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { data } from '../../data';

const GtaVersionInfo = () => {
  const { id } = useParams();

  const information = useMemo(() => {
    const selectedVersion = data.find((d) => d.id.toString() === id);
    if (!selectedVersion) return;
    return selectedVersion.information;
  }, [id]);

  return <div>{information}</div>;
};

export default GtaVersionInfo;
