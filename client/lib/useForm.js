import { useState, useEffect } from 'react';

export default function useForm(initial = {}) {
  // create a stste object for our inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join(''); // o/p => array of values of the object

  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  const handleChange = (e) => {
    let { value, name, type, files } = e.target;

    if (type === 'number') value = parseInt(value);
    if (type === 'file') [value] = files;

    setInputs({
      // copy the exixting state
      ...inputs,
      [name]: value,
    });
  };

  const resetForm = () => setInputs(initial);

  const clearForm = () => {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  };
  return { inputs, handleChange, resetForm, clearForm };
}
