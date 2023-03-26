import { Component, RefObject, createRef } from 'react';
import '../styles/form.scss';
import { validateDob, validateGender, validateLang, validateName } from './validate';

// interface Props {
//   setPerson: (name: string) => void;
// }

type Props = Record<string, never>;

interface State {
  gender: string;
  isNameInvalid: boolean;
  isDobInvalid: boolean;
  isFileInvalid: boolean;
  isLangInvalid: boolean;
  isRulesInvalid: boolean;
  isGenderInvalid: boolean;
}

export default class Form extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = this.getInitialState();
  }
  formRef: RefObject<HTMLFormElement> = createRef();
  nameRef: RefObject<HTMLInputElement> = createRef();
  dobRef: RefObject<HTMLInputElement> = createRef();
  fileRef: RefObject<HTMLInputElement> = createRef();
  langRef: RefObject<HTMLSelectElement> = createRef();
  rulesRef: RefObject<HTMLInputElement> = createRef();

  getInitialState: () => State = () => {
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
    console.log(this.fileRef.current!.files);
    const validation: Partial<State> = {
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
    this.formRef.current!.reset();
    this.setState(this.getInitialState());
  };
  render() {
    return (
      <form className="person-form" onSubmit={this.handleSubmit} ref={this.formRef} noValidate>
        <h3>Add person</h3>
        <div className="form-input">
          <span>Name:</span>
          <input type="text" ref={this.nameRef} />
          {this.state.isNameInvalid && (
            <p className="form-error">
              The name must be at least 3 characters long and start with an uppercased letter
            </p>
          )}
        </div>
        <div className="form-input">
          <span>Date of birth:</span>
          <input type="date" ref={this.dobRef} />
          {this.state.isDobInvalid && (
            <p className="form-error">Person must be at least 18 years old</p>
          )}
        </div>
        <div className="form-input">
          <span>Gender:</span>
          <label>
            Male:
            <input name="gender" type="radio" value="male" onChange={this.handleChangeGender} />
          </label>
          <label>
            Female:
            <input name="gender" type="radio" value="female" onChange={this.handleChangeGender} />
          </label>
          {this.state.isGenderInvalid && <p className="form-error">Please select a gender</p>}
        </div>
        <div className="form-input">
          <span>Photo:</span>
          <input type="file" accept="image/*" ref={this.fileRef} />
          {this.state.isFileInvalid && <p className="form-error">You must select a photo</p>}
        </div>
        <div className="form-input">
          <span>Language:</span>
          <select defaultValue="" ref={this.langRef}>
            <option value="" disabled hidden>
              Choose your language
            </option>
            <option value="en">English</option>
            <option value="ru">Russian</option>
          </select>
          {this.state.isLangInvalid && <p className="form-error">You must select a language</p>}
        </div>
        <label className="form-input">
          <span>Agree to rules:</span>
          <input type="checkbox" ref={this.rulesRef} required />
          {this.state.isRulesInvalid && (
            <span className="form-error">You must agree to the rules</span>
          )}
        </label>
        <button type="submit">Add a person</button>
      </form>
    );
  }
}
