import { Component } from 'react';

interface Props {
  setCurrentPage: (name: string) => void;
}

export default class AboutUs extends Component<Props> {
  componentDidMount(): void {
    this.props.setCurrentPage('About Us');
  }
  render() {
    return <div>About Us</div>;
  }
}
