import { useRecord } from '../hooks/useRecord';
import { useState } from 'react';

export default function AddRecordForm({ prefix, namespaceIdx }) {
  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const [recordKey, setRecordKey] = useState('');
  const [recordValue, setRecordValue] = useState('');

  const {createRecord, resetError, error, isPending} = useRecord();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const record = { key: prefix+recordKey, value: recordValue };
    await createRecord(record, namespaceIdx);
    resetForm();
  }

  const handleCancel = (e) => {
    e.preventDefault();
    resetForm();
    resetError();
  }

  const resetForm = () => {
    setRecordKey('');
    setRecordValue('');
    setIsAddingRecord(false);
  }

  return (
    <>
      {isPending && <p>Creating Record</p>}

      {(!isAddingRecord && !error) && (
        <button
          onClick={() => setIsAddingRecord(true)}
          className="w-fit p-2 px-4 m-4 text-xs">
            ADD RECORD
        </button>
      )}

      {(isAddingRecord || error) && (
        <>
          <span className="text-sm m-4">Adding New Record</span>

          <form onSubmit={handleSubmit} className="flex w-full flex-row gap-3 px-2">

            <input
              type="text"
              value={recordKey}
              onChange={e => setRecordKey(e.target.value)}
              className="basis-1/3 shrink mb-2 bg-stone-100 dark:bg-stone-800"
              placeholder="Key"
            />

            <input
              type="text"
              value={recordValue}
              onChange={e => setRecordValue(e.target.value)}
              className="w-full mb-2 bg-stone-100 dark:bg-stone-800"
              placeholder="Value"
            />

            <button
              type="submit"
              className="flex-initial mb-2 p-2 text-white bg-blue-500 hover:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-400 text-xs"
            >
              ADD
            </button>

            <button
              onClick={handleCancel}
              className="flex-initial mb-2 p-2 text-xs"
            >
              ESC
            </button>

          </form>

          {error && <p className="text-red-600 text-xs mx-4 mb-4">{error}</p>}
        </>
      )}
    </>
  );

}