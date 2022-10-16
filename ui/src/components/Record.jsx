// import { useConfigContext } from '../hooks/useConfigContext';

export default function Record({ record, prefix }) {
  // const { config } = useConfigContext();

  const name = record.key.replace(`${prefix}`, '');

  return (
    <div>
      <p>{ name } : { record.value }</p>
    </div>
  );
}
