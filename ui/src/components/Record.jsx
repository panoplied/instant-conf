// import { useConfigContext } from '../hooks/useConfigContext';

export default function Record({ record, prefix }) {
  // const { config } = useConfigContext();

  const key = record.key.replace(`${prefix}`, '');

  return (
    <div>
      <p>{ key } : { record.value }</p>
    </div>
  );
}
