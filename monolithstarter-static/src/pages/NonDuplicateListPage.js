import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NonDuplicateList from '../components/NonDuplicateList';

class NonDuplicateListPage extends Component {
  render() {
    return (
      <div className='app'>
        <div className='app-body'>
          <Container fluid className='text-center'>
            <NonDuplicateList />
          </Container>
        </div>
      </div>
    );
  }
}

export default NonDuplicateListPage;
