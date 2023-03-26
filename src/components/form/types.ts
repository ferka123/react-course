export interface PersonCard {
  name: string;
  dob: string;
  image: string;
  lang: string;
  gender: string;
}

export interface FormProps {
  setPerson: (person: PersonCard) => void;
}

export interface FormState {
  gender: string;
  isNameInvalid: boolean;
  isDobInvalid: boolean;
  isFileInvalid: boolean;
  isLangInvalid: boolean;
  isRulesInvalid: boolean;
  isGenderInvalid: boolean;
}
