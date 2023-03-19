import { Component } from 'react';

export default class AboutUs extends Component<{ setCurrentPage: (name: string) => void }> {
  componentDidMount(): void {
    this.props.setCurrentPage('About Us');
  }
  render() {
    return <div>AboutUs</div>;
  }
}
