import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.props;

    return (
      <div className="cardPreview-container">
        <div className="cardPreview">
          <p data-testid="name-card" className="cardTitle">{ cardName }</p>
          { cardImage === ''
            ? <img data-testid="image-card" src="https://media.istockphoto.com/vectors/black-abstract-background-vector-id991811918?b=1&k=20&m=991811918&s=612x612&w=0&h=l3DRPIXEQnaXjXVVzBFD8A8qBGUUUs8--Xp5mpeUTsU=" alt={ cardName } />
            : <img data-testid="image-card" src={ cardImage } alt={ cardName } />}

          <p
            data-testid="description-card"
            className="cardDescription"
          >
            { cardDescription }

          </p>
          <div className="attr-container">
            <div className="attr-1">
              <p>Inteligência:</p>
              <p data-testid="attr1-card" className="atrr">{ cardAttr1 }</p>
            </div>
            <div className="attr-2">
              <p>Loucura: </p>
              <p data-testid="attr2-card" className="atrr">{ cardAttr2 }</p>
            </div>
            <div className="attr-3">
              <p>Perigo: </p>
              <p data-testid="attr3-card" className="atrr">{ cardAttr3 }</p>
            </div>

            <div className="rare-container">
              <p>Raridade: </p>
              <p data-testid="rare-card" className="atrr">{ cardRare }</p>
            </div>
          </div>
          {cardTrunfo && <span data-testid="trunfo-card" id="trunfo">Super Trunfo</span>}
        </div>

      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;
