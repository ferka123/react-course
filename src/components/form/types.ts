export interface PersonCard {
  name: string;
  dob: string;
  image: string;
  lang: string;
  gender: string;
}

export interface FormData extends Omit<PersonCard, 'image'> {
  rules: boolean;
  image: FileList;
}
