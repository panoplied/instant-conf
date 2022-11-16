import { useRecord } from '../hooks/useRecord';
import { useState } from 'react';

export default function Record({ record, prefix, namespaceIdx }) {
  const { key, value } = record;

  const [recordKey, setRecordKey] = useState(key.replace(prefix, ''));
  const [recordValue, setRecordValue] = useState(value);
  const {updateRecord, removeRecord, error, isPending} = useRecord();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRecord = {
      key: prefix + recordKey,
      value: recordValue,
    };
    await updateRecord(record, updatedRecord, namespaceIdx);
  }

  const handleDelete = async (e) => {
    await removeRecord(key, namespaceIdx);
  } 

  return (
    <div className="flex">

      <form onSubmit={handleSubmit} className="flex w-full flex-row gap-4 px-2">
        <input
          type="text"
          value={recordKey}
          onChange={e => setRecordKey(e.target.value)}
          className="basis-1/3 shrink"
        />
        <input
          type="text"
          value={recordValue}
          onChange={e => setRecordValue(e.target.value)}
          className="w-full"
        />
        <button type="submit" style={{display: 'None'}} />
      </form>

      <button onClick={handleDelete} className="flex-initial p-2 mx-2 text-xs">DEL</button>
    </div>
  );
}
