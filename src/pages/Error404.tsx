import { Component } from 'react';

export default class Error404 extends Component<{ setCurrentPage: (name: string) => void }> {
  componentDidMount(): void {
    this.props.setCurrentPage('');
  }
  render() {
    return <div>Error404</div>;
  }
}
