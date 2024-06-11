import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';

function App() {
  const [isDataSaved, setIsDataSaved] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const delay = (d) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, d * 1000);
    });
  }

  const onSubmit = async (data) => {
    await delay(2); 

    try {
      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);

      setIsDataSaved(true);
      reset();

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='container flex justify-center items-center min-h-screen'>
      <div className='mx-auto border p-10 rounded-lg shadow-md'>
        {isSubmitting && <div className='mb-5'>loading...</div>}
        {isDataSaved && <div className='mb-5 text-green-500'>Your data is saved</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label>
              <input
                className='w-64 p-2 mb-1 outline-none rounded-lg border'
                placeholder='username'
                autoComplete="username"
                {...register("username", {
                  required: { value: true, message: "This field is required" },
                  minLength: { value: 3, message: "Minimum length is 3" },
                  maxLength: { value: 24, message: "Maximum length is 24" }
                })}
                type="text"
              />
              {errors.username && <div className='red text-left ml-1'>{errors.username.message}</div>}
            </label>
          </div>
          <div className="mb-4">
            <label>
              <input
                className='w-64 p-2 mb-1 outline-none rounded-lg border'
                placeholder='password'
                autoComplete="current-password"
                {...register("password", {
                  required: { value: true, message: "This field is required" },
                  minLength: { value: 3, message: "Minimum length is 3" },
                  maxLength: { value: 32, message: "Maximum length is 32" }
                })}
                type="password"
              />
              {errors.password && <div className='red text-left ml-1'>{errors.password.message}</div>}
            </label>
          </div>
          <input
            disabled={isSubmitting}
            className='w-64 p-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600'
            type="submit"
          />
          {errors.form && <div className='red text-center mt-2 mx-auto flex justify-center'>{errors.form.message}</div>}
          {errors.blocked && <div className='red text-center mt-2 mx-auto flex justify-center'>{errors.blocked.message}</div>}
        </form>
      </div>
    </div>
  );
}

export default App;
