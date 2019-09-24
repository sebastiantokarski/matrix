import React, { Component } from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  width: 100%;
  padding: 1rem;
  background-color: #d8dce3;
`;

const Paragraph = styled.p`
  font-size: 0.8rem;
  text-align: center;
  margin: 0;
`;

export default class Footer extends Component {
  constructor(props) {
    super(props);

    this.flaticonUrl = 'https://www.flaticon.com';
    this.flaticonAuthor = 'Pixel perfect';
    this.flaticonAuthorUrl = `${this.flaticonUrl}/authors/pixel-perfect`;
  }

  render() {
    return (
      <StyledFooter>
        <div className="container">
          <div className="flaticon-desc">
            <Paragraph>
              Icons made by {' '}
              <a href={this.flaticonAuthorUrl} title={this.flaticonAuthor}>{this.flaticonAuthor}</a>
              {' '} from {' '}
              <a href={this.flaticonUrl} title="Flaticon">www.flaticon.com</a>
              {' '} is licensed by {' '}
              <a href="http://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
                rel="noopener noreferrer"
                target="_blank"> CC 3.0 BY </a>
            </Paragraph>
          </div>
        </div>
      </StyledFooter>
    );
  }
}
