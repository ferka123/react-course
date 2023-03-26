import { Component, RefObject, createRef } from 'react';
import '../styles/form.scss';
import { FormProps, FormState } from './types';
import { validateDob, validateGender, validateLang, validateName } from './validate';

export default class Form extends Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = this.getInitialState();
  }
  formRef: RefObject<HTMLFormElement> = createRef();
  nameRef: RefObject<HTMLInputElement> = createRef();
  dobRef: RefObject<HTMLInputElement> = createRef();
  fileRef: RefObject<HTMLInputElement> = createRef();
  langRef: RefObject<HTMLSelectElement> = createRef();
  rulesRef: RefObject<HTMLInputElement> = createRef();

  getInitialState: () => FormState = () => {
    return {
      gender: '',
      isNameInvalid: false,
      isDobInvalid: false,
      isFileInvalid: false,
      isLangInvalid: false,
      isRulesInvalid: false,
      isGenderInvalid: false,
    };
  };

  handleChangeGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ gender: e.target.value });
  };
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation: Partial<FormState> = {
      isNameInvalid: validateName(this.nameRef.current!.value),
      isDobInvalid: validateDob(this.dobRef.current!.value),
      isGenderInvalid: validateGender(this.state.gender),
      isFileInvalid: this.fileRef.current!.files!.length === 0,
      isLangInvalid: validateLang(this.langRef.current!.value),
      isRulesInvalid: this.rulesRef.current!.checked === false,
    };
    const isFormInvalid = Object.values(validation).some(Boolean);

    if (isFormInvalid) {
      this.setState((prev) => Object.assign(prev, validation));
      return;
    }
    this.props.setPerson({
      name: this.nameRef.current!.value,
      dob: this.dobRef.current!.value,
      gender: this.state.gender,
      lang: this.langRef.current!.value,
      image: URL.createObjectURL(this.fileRef.current!.files![0]),
    });
    this.formRef.current!.reset();
    this.setState(this.getInitialState());
    alert('Person Added');
  };
  render() {
    return (
      <form className="person-form" onSubmit={this.handleSubmit} ref={this.formRef} noValidate>
        <h3>Add person</h3>
        <div className="form-input">
          <span>Name:</span>
          <input type="text" ref={this.nameRef} />
          {this.state.isNameInvalid && (
            <p className="form-error" role="alert">
              The name must be at least 3 characters long and start with an uppercased letter
            </p>
          )}
        </div>
        <div className="form-input">
          <span>Date of birth:</span>
          <input type="date" ref={this.dobRef} title="Enter your DOB" />
          {this.state.isDobInvalid && (
            <p className="form-error" role="alert">
              The age must be between 18 and 120 years old
            </p>
          )}
        </div>
        <div className="form-input">
          <span>Gender:</span>
          <label>
            Male:
            <input name="gender" type="radio" value="Male" onChange={this.handleChangeGender} />
          </label>
          <label>
            Female:
            <input name="gender" type="radio" value="Female" onChange={this.handleChangeGender} />
          </label>
          {this.state.isGenderInvalid && (
            <p className="form-error" role="alert">
              Please select a gender
            </p>
          )}
        </div>
        <div className="form-input">
          <span>Photo:</span>
          <input type="file" accept="image/*" ref={this.fileRef} title="Select a photo" />
          {this.state.isFileInvalid && (
            <p className="form-error" role="alert">
              You must select a photo
            </p>
          )}
        </div>
        <div className="form-input">
          <span>Language:</span>
          <select defaultValue="" ref={this.langRef}>
            <option value="" disabled hidden>
              Choose your language
            </option>
            <option value="English">English</option>
            <option value="Russian">Russian</option>
          </select>
          {this.state.isLangInvalid && (
            <p className="form-error" role="alert">
              You must select a language
            </p>
          )}
        </div>
        <label className="form-input">
          <span>Agree to rules:</span>
          <input type="checkbox" ref={this.rulesRef} required />
          {this.state.isRulesInvalid && (
            <span className="form-error" role="alert">
              You must agree to the rules
            </span>
          )}
        </label>
        <button type="submit">Add a person</button>
      </form>
    );
  }
}
