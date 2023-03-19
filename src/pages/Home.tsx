import { Component } from 'react';

export default class Home extends Component<{ setCurrentPage: (name: string) => void }> {
  componentDidMount(): void {
    this.props.setCurrentPage('Home');
  }
  render() {
    return <div>Home</div>;
  }
}
