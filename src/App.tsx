import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Error404 from './pages/Error404';
import AboutUs from './pages/AboutUs';
import Header from './components/Header';

interface AppState {
  currentPage: string;
}

export default class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      currentPage: '',
    };
  }
  setCurrentPage = (currentPage: string) => {
    this.setState({ currentPage });
  };
  render() {
    return (
      <>
        <Header currentPage={this.state.currentPage} />
        <main>
          <Routes>
            <Route path="/" element={<Home setCurrentPage={this.setCurrentPage} />} />
            <Route path="/about" element={<AboutUs setCurrentPage={this.setCurrentPage} />} />
            <Route path="*" element={<Error404 setCurrentPage={this.setCurrentPage} />} />
          </Routes>
        </main>
      </>
    );
  }
}
