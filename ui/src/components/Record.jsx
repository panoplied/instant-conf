import { useState } from 'react';

export default function Record({ record, prefix }) {
  const { key, value } = record;

  const [recordName, setRecordName] = useState(key.replace(prefix, ''));
  const [recordValue, setRecordValue] = useState(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRecord = {
      key: prefix + recordName,
      value: recordValue,
    };
    console.log(updatedRecord);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row gap-4 px-2">
      <input
        type="text"
        value={recordName}
        onChange={e => setRecordName(e.target.value)}
      />
      <input
        type="text"
        value={recordValue}
        onChange={e => setRecordValue(e.target.value)}
      />
      <button type="submit" style={{display: 'None'}} />
    </form>
  );
}
