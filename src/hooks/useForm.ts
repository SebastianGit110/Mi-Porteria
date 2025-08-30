import { useState } from "react";

export const useForm = <T extends Record<string, any>>(initialState: T) => {
  const [formState, setFormState] = useState<T>(initialState);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormState({ ...formState, [name]: value });
  };

  const onResetForm = () => {
    setFormState(initialState);
  };
  return { ...formState, formState, setFormState, handleOnChange, onResetForm };
};
