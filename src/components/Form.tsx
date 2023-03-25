import { Component, RefObject, createRef } from 'react';
import './styles/form.scss';

// interface Props {
//   setPerson: (name: string) => void;
// }

type Props = Record<string, never>;

interface State {
  gender: string;
}

export default class Form extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      gender: '',
    };
  }
  formRef: RefObject<HTMLFormElement> = createRef();
  nameRef: RefObject<HTMLInputElement> = createRef();
  dobRef: RefObject<HTMLInputElement> = createRef();
  fileRef: RefObject<HTMLInputElement> = createRef();
  langRef: RefObject<HTMLSelectElement> = createRef();
  rulesRef: RefObject<HTMLInputElement> = createRef();

  handleChangeGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ gender: e.target.value });
  };
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.formRef.current!.reset();
    this.setState({ gender: '' });
  };
  render() {
    return (
      <form className="person-form" onSubmit={this.handleSubmit} ref={this.formRef} noValidate>
        <h3>Add person</h3>
        <label className="form-input">
          Name:
          <input type="text" ref={this.nameRef} required />
        </label>
        <label className="form-input">
          Date of birth:
          <input type="date" ref={this.dobRef} required />
        </label>
        <div className="form-input">
          Gender:
          <label>
            Male:
            <input
              name="gender"
              type="radio"
              value="male"
              required
              onChange={this.handleChangeGender}
            />
          </label>
          <label>
            Female:
            <input name="gender" type="radio" value="female" onChange={this.handleChangeGender} />
          </label>
        </div>
        <div className="form-input">
          Photo:
          <input type="file" accept="image/*" ref={this.fileRef} required />
        </div>
        <div className="form-input">
          Language:
          <select defaultValue="" ref={this.langRef} required>
            <option value="" disabled hidden>
              Choose your language
            </option>
            <option value="en">English</option>
            <option value="ru">Russian</option>
          </select>
        </div>
        <label className="form-input">
          Agree to rules:
          <input type="checkbox" ref={this.rulesRef} required />
        </label>
        <button type="submit">Add a person</button>
      </form>
    );
  }
}
