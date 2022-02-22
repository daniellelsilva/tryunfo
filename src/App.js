import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import CardList from './components/CardList';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      savedCards: [],
      nameFilterInput: '',
      rarityFilterSelect: 'todas',
      tunfoFilterCheckbox: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.validateSaveButton = this.validateSaveButton.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.nameFilter = this.nameFilter.bind(this);
    this.rarityFilter = this.rarityFilter.bind(this);
    this.trunfoFilter = this.trunfoFilter.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.validateSaveButton);
  }

  onSaveButtonClick(event) {
    event.preventDefault();
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;

    if (cardTrunfo) {
      this.setState({ hasTrunfo: true });
    }

    const card = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };

    this.setState((newState) => {
      const { savedCards } = newState;
      const clearPreviewCard = {
        cardName: '',
        cardDescription: '',
        cardAttr1: '0',
        cardAttr2: '0',
        cardAttr3: '0',
        cardImage: '',
        cardRare: 'normal',
        cardTrunfo: false,
        savedCards: [...savedCards, card],
      };
      return (clearPreviewCard);
    });
  }

  nameFilter(event) {
    this.setState({ nameFilterInput: event.target.value });
  }

  rarityFilter(event) {
    this.setState({ rarityFilterSelect: event.target.value });
  }

  trunfoFilter(event) {
    this.setState({ trunfoFilterCheckbox: event.target.checked });
  }

  validateSaveButton() {
    const {
      cardName, cardDescription, cardImage, cardAttr1, cardAttr2, cardAttr3,
    } = this.state;

    const maxSum = 210;
    const maxNumber = 10;
    const minNumber = 0;
    const sumAttr = (Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3));

    if (cardName.length
      && cardDescription.length
      && cardImage.length > minNumber
      && sumAttr <= maxSum
      && cardAttr1 <= maxNumber
      && cardAttr2 <= maxNumber
      && cardAttr3 <= maxNumber
      && cardAttr1 >= minNumber
      && cardAttr2 >= minNumber
      && cardAttr3 >= minNumber) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  deleteCard(name, trunfo) {
    this.setState((prevState) => ({
      ...prevState,
      savedCards: prevState.savedCards.filter((card) => card.cardName !== name),
      hasTrunfo: trunfo ? false : trunfo,
    }));
  }

  render() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      savedCards,
      nameFilterInput,
      rarityFilterSelect,
      trunfoFilterCheckbox } = this.state;
    return (
      <div>
        <div className="div-title">
          <h1 className="title">
            KillerTrunfo
            <span className="drop drop1" />
            <span className="drop drop2" />
            <span className="drop drop3" />
            <span className="drop drop4" />
            <span className="drop drop5" />
          </h1>
          <p className="start-button">
            <a href="#start" className="start-bt">COMEÇAR</a>
          </p>
        </div>
        <div className="form-card-container" id="start">
          <Form
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            hasTrunfo={ hasTrunfo }
            isSaveButtonDisabled={ isSaveButtonDisabled }
            onInputChange={ this.onInputChange }
            onSaveButtonClick={ this.onSaveButtonClick }
          />
          <Card
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            hasTrunfo={ hasTrunfo }
          />
        </div>
        <div className="card-list-container">
          <h4 className="card-list-title">Todas as cartas</h4>
          <div className="filters">
            <label htmlFor="name-filter">
              <input
                type="text"
                data-testid="name-filter"
                id="name-filter"
                placeholder="Digite um nome"
                value={ nameFilterInput }
                onChange={ this.nameFilter }
                disabled={ trunfoFilterCheckbox }
              />
            </label>
            <label htmlFor="rare-filter">
              <select
                id="rare-filter"
                data-testid="rare-filter"
                onChange={ this.rarityFilter }
                disabled={ trunfoFilterCheckbox }
              >
                <option defaultValue>todas</option>
                <option value="normal">normal</option>
                <option value="raro">raro</option>
                <option value="muito raro">muito raro</option>
              </select>
            </label>
            <label htmlFor="trunfo-filter">
              Super Trunfo
              <input
                type="checkbox"
                data-testid="trunfo-filter"
                id="trunfo-filter"
                onChange={ this.trunfoFilter }
              />
            </label>
          </div>
          <div className="cards-deck">
            {savedCards.length > 0 && (
              <CardList
                savedCards={ savedCards }
                deleteCard={ this.deleteCard }
                nameFilterInput={ nameFilterInput }
                rarityFilterSelect={ rarityFilterSelect }
                trunfoFilterCheckbox={ trunfoFilterCheckbox }
              />
            )}
          </div>
        </div>

      </div>
    );
  }
}
export default App;
