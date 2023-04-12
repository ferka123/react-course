import Toast from '../Toast';
import { useForm } from 'react-hook-form';
import '../styles/form.scss';
import { FormData } from '../../types/form';
import { validateDob } from './validate';
import { useAppDispatch } from '../../redux/store';
import { setCard } from '../../redux/features/formSlice';

export default function Form() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormData>({ reValidateMode: 'onSubmit' });

  const onSubmit = (data: FormData) => {
    dispatch(
      setCard({
        name: data.name,
        dob: data.dob,
        gender: data.gender,
        lang: data.lang,
        image: URL.createObjectURL(data.image[0]),
      })
    );
    reset();
  };
  return (
    <>
      {isSubmitSuccessful && <Toast duration={3000} message="Card added successfully" />}
      <form className="person-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <h3>Add person</h3>
        <div className="form-input">
          <span>Name:</span>
          <input type="text" {...register('name', { required: true, pattern: /[A-Z][a-z]{2,}/ })} />
          {errors.name && (
            <p className="form-error" role="alert">
              The name must be at least 3 characters long and start with an uppercased letter
            </p>
          )}
        </div>
        <div className="form-input">
          <span>Date of birth:</span>
          <input
            type="date"
            {...register('dob', { required: true, validate: validateDob })}
            title="Enter your DOB"
          />
          {errors.dob && (
            <p className="form-error" role="alert">
              The age must be between 18 and 120 years old
            </p>
          )}
        </div>
        <div className="form-input">
          <span>Gender:</span>
          <label>
            Male:
            <input type="radio" value="Male" {...register('gender', { required: true })} />
          </label>
          <label>
            Female:
            <input type="radio" value="Female" {...register('gender', { required: true })} />
          </label>
          {errors.gender && (
            <p className="form-error" role="alert">
              Please select a gender
            </p>
          )}
        </div>
        <div className="form-input">
          <span>Photo:</span>
          <input
            type="file"
            accept="image/*"
            {...register('image', { required: true })}
            title="Select a photo"
          />
          {errors.image && (
            <p className="form-error" role="alert">
              You must select a photo
            </p>
          )}
        </div>
        <div className="form-input">
          <span>Language:</span>
          <select defaultValue="" {...register('lang', { required: true })}>
            <option value="" disabled hidden>
              Choose your language
            </option>
            <option value="English">English</option>
            <option value="Russian">Russian</option>
          </select>
          {errors.lang && (
            <p className="form-error" role="alert">
              You must select a language
            </p>
          )}
        </div>
        <label className="form-input">
          <span>Agree to rules:</span>
          <input type="checkbox" {...register('rules', { required: true })} />
          {errors.rules && (
            <span className="form-error" role="alert">
              You must agree to the rules
            </span>
          )}
        </label>
        <button type="submit">Add a person</button>
      </form>
    </>
  );
}
