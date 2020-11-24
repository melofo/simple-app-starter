import React, { Component } from 'react';
import { Container } from 'reactstrap';
import DuplicateList from '../components/DuplicateList';

class DuplicateListPage extends Component {
  render() {
    return (
      <div className='app'>
        <div className='app-body'>
          <Container fluid className='text-center'>
            <DuplicateList />
          </Container>
        </div>
      </div>
    );
  }
}

export default DuplicateListPage;
