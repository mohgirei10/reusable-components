import { useState } from 'react';

export function useForm<T>(initialState: T) {
  const [values, setValues] = useState<T>(initialState);

  const handleChange = (key: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => setValues(initialState);

  return { values, handleChange, resetForm };
}