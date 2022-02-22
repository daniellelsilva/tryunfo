import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

class CardList extends React.Component {
  constructor() {
    super();
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.filterCards = this.filterCards.bind(this);
  }

  onDeleteClick(event) {
    const { name, trunfo } = event.currentTarget.dataset;
    const { deleteCard } = this.props;
    deleteCard(name, trunfo);
  }

  filterCards() {
    const { savedCards,
      nameFilterInput,
      rarityFilterSelect,
      trunfoFilterCheckbox } = this.props;
    const cards = savedCards;
    let cardFilter = [];

    if (trunfoFilterCheckbox) {
      cardFilter = cards.filter((card) => card.cardTrunfo);
    } else {
      cardFilter = cards
        .filter((card) => card.cardName.includes(nameFilterInput))
        .filter((card) => {
          if (rarityFilterSelect === 'normal') {
            return card.cardRare === 'normal';
          }
          if (rarityFilterSelect === 'raro') {
            return card.cardRare === 'raro';
          }
          if (rarityFilterSelect === 'muito raro') {
            return card.cardRare === 'muito raro';
          }
          return card;
        });
    }

    return cardFilter.map((card) => (
      <div key={ card.cardName } className="individual-cards">
        <Card
          cardName={ card.cardName }
          cardDescription={ card.cardDescription }
          cardAttr1={ card.cardAttr1 }
          cardAttr2={ card.cardAttr2 }
          cardAttr3={ card.cardAttr3 }
          cardImage={ card.cardImage }
          cardRare={ card.cardRare }
          cardTrunfo={ card.cardTrunfo }
        />
        <div className="div-delete-button">
          <button
            className="delete-button"
            type="button"
            data-testid="delete-button"
            data-name={ card.cardName }
            data-trunfo={ card.cardTrunfo }
            onClick={ this.onDeleteClick }
          >
            Excluir

          </button>
        </div>

      </div>
    ));
  }

  render() {
    return <div className="all-saved-cards">{this.filterCards()}</div>;
  }
}

CardList.propTypes = {
  savedCards: PropTypes.arrayOf(Object).isRequired,
  deleteCard: PropTypes.func.isRequired,
  nameFilterInput: PropTypes.string.isRequired,
  rarityFilterSelect: PropTypes.string.isRequired,
  trunfoFilterCheckbox: PropTypes.bool,
};

CardList.defaultProps = {
  trunfoFilterCheckbox: false,
};

export default CardList;
