import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InputNumberButton from './inputNumberButton'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Left, Icon as NativeIcon } from 'native-base';

const specialButtons = [
  ['MC', 'MR', 'M+', 'M-', 'MS', 'M´']
];

const buttons = [
  ['2', 'π', 'e', 'C', '<='],
  ['x²', '1/x', '|x|', 'exp', 'mod'],
  ['√', '(', ')', 'n!','÷'],
  ['x³','7', '8', '9', 'x'],
  ['10²','4', '5', '6', '-'],
  ['log','1', '2', '3', '+'],
  ['ln','+/-', '0', ',', '=']
];

export default class CientificScreen extends Component {
  constructor() {
    super()
    this.initialState = {
      displayValue: '0',
      operator: null,
      firstValue: '',
      secondValue: '',
      isDoneOperation: false,
      nextValue: false,
      historyText: ' ',
    }
    this.state = this.initialState;
  }

  renderSpecialButtons() {
    let layouts = specialButtons.map((buttonRows, index) => {
      let rowItem = buttonRows.map((buttonItems, buttonIndex) => {
        return <InputNumberButton
          value={buttonItems}
          handleOnPress={this.handleInput.bind(this, buttonItems)}
          key={'btn-' + buttonIndex}
          specialColor={'transparent'}
        />
      });

      return <View style={styles.inputRow} key={'row-' + index}>{rowItem}</View>
    });

    return layouts;
  }

  renderButtons() {
    let layouts = buttons.map((buttonRows, index) => {
      let rowItem = buttonRows.map((buttonItems, buttonIndex) => {
        let specialColor;
        switch (buttonItems) {
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
          case '7':
          case '8':
          case '9':
          case '0':
          case '+/-':
          case ',':
            specialColor = 'black';
        }

        return <InputNumberButton
          value={buttonItems}
          handleOnPress={this.handleInput.bind(this, buttonItems)}
          key={'btn-' + buttonIndex}
          specialColor={specialColor}
        />
      });

      return <View style={styles.inputRow} key={'row-' + index}>{rowItem}</View>
    });

    return layouts;
  }

  handleInput = (input) => {
    const { displayValue, operator, firstValue, secondValue, nextValue, isDoneOperation, historyText } = this.state;

    switch (input) {
      case '0':
      case '1': displayValue
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if (isDoneOperation) {
          this.setState({
            displayValue: input,
            isDoneOperation: false,
            firstValue: '',
            historyText: ' '
          })
          if (!nextValue) {
            this.setState({
              firstValue: input,
            })
          }
          break;
        } else {
          this.setState({
            displayValue: displayValue === '0' ? input : operator && !secondValue ? input : displayValue + input,
            //historyText: historyText === '0' ? input : historyText + input
          })
        }
        if (!nextValue) {
          this.setState({
            firstValue: firstValue + input,
            isDoneOperation: false
          })
        } else {
          this.setState({
            secondValue: secondValue + input,
            //displayValue: input,
            isDoneOperation: false,
            //nextValue: false
          })
        }
        break;
      case '+/-':
        var result = -(firstValue);
        this.setState({
          displayValue: result % 1 === 0 ? result : result.toFixed(2),
          historyText: "negate(" + firstValue + ")",
          firstValue: result % 1 === 0 ? result : result.toFixed(2),
          nextValue: false,
          isDoneOperation: true
        });
        break;
      case '√':
        var result = Math.sqrt(displayValue);
        this.setState({
          displayValue: result % 1 === 0 ? result : result.toFixed(2),
          historyText: "√(" + displayValue + ")",
          firstValue: result % 1 === 0 ? result : result.toFixed(2),
          nextValue: false,
          isDoneOperation: true
        });
        break;
      case 'x²':
        var result = Math.pow(displayValue, 2);
        this.setState({
          displayValue: result % 1 === 0 ? result : result.toFixed(2),
          historyText: "sqrt(" + displayValue + ")",
          firstValue: result % 1 === 0 ? result : result.toFixed(2),
          nextValue: false,
          isDoneOperation: true
        });
        break;
      case '1/x':
        var result = 1 / parseFloat(displayValue);
        this.setState({
          displayValue: result % 1 === 0 ? result : result.toFixed(2),
          historyText: "1/(" + displayValue + ")",
          firstValue: result % 1 === 0 ? result : result.toFixed(2),
          nextValue: false,
          isDoneOperation: true
        });
        break;
      case '+':
      case '-':
      case 'x':
      case '÷':
        if (firstValue && !secondValue) {
          this.setState({
            nextValue: true,
            operator: input,
            historyText: isDoneOperation ? displayValue + input : (operator !== null ? historyText.toString().substr(0, historyText.toString().length - 1) : historyText) + displayValue + input,
            isDoneOperation: false,
          })
          break;
        }
        break;
      case ',':
        let dot = displayValue.toString().slice(-1)
        this.setState({
          displayValue: dot !== '.' ? displayValue + input : displayValue,
        })
        if (!nextValue) {
          this.setState({
            firstValue: firstValue + input
          })
        } else {
          this.setState({
            secondValue: secondValue + input
          })
        }
        break;
      case '=':
        this.operation(firstValue, secondValue, operator, historyText);
        break;
      case 'CE':
      case 'C':
        this.setState(this.initialState);
        break;
      case '<=':
        let string = displayValue.toString();
        let deletestring = string.slice(0, -1);
        let length = deletestring.length;
        this.setState({
          displayValue: length == 0 ? '0' : deletestring,
          firstValue: length == 0 ? '0' : deletestring,
        });
    }
  }

  operation(firstValue, secondValue, operator, historyText) {
    let formatOperator = (operator == 'x') ? '*' : (operator == '÷') ? '/' : operator
    if (firstValue && secondValue) {
      let result = eval(parseFloat(firstValue) + formatOperator + parseFloat(secondValue))
      this.setState({
        displayValue: result % 1 === 0 ? result : result.toFixed(2),
        historyText: historyText + secondValue + '=',
        firstValue: result % 1 === 0 ? result : result.toFixed(2),
        secondValue: '',
        operator: null,
        nextValue: false,
        isDoneOperation: true
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputRow}>
          <Left style={{ alignSelf: 'flex-start', marginLeft: 10 }}>
            <NativeIcon name='menu' onPress={() =>
              this.props.navigation.openDrawer()} style={{ marginLeft: 10, color: 'white', paddingTop: 15 }} />
          </Left>
          <Text style={{ alignSelf: 'flex-start', fontSize: 25, color: 'white', padding: 12, position: 'absolute', left: 50 }}>Cientific</Text>
          {/* <Button buttonStyle={{ width: 40, height: 40, backgroundColor: 'transparent', top: 10 }} icon={
            <Icon
              name="history"
              size={25}
              color="white"
            />
          } 
          type="solid" /> */}
          <View>
            <InputNumberButton
              style={{ width: 45, height: 40, backgroundColor: 'transparent', top: 10, right: 0, position: 'absolute' }}
              icon={<Icon
                name="history"
                size={20}
                color="white"
              />}
            />
          </View>
        </View>
        <View style={styles.resultContainer}>
          <Text style={styles.historyText}>{this.state.historyText}</Text>
          <Text style={styles.resultText}>{this.state.displayValue}</Text>
        </View>
        <View style={styles.inputRow, { height: 40 }}>
          {this.renderSpecialButtons()}
        </View>
        <View style={styles.inputContainer}>
          {this.renderButtons()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    backgroundColor: '#28292B'
  },

  historyContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#202020',
    justifyContent: 'space-between'
  },

  resultContainer: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#28292B'
  },

  numberContainer: {
    flex: 4,
    backgroundColor: '#202020'
  },

  inputContainer: {
    flex: 5,
    backgroundColor: '#28292B',
  },

  resultText: {
    color: 'white',
    fontSize: 55,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 30,
    textAlign: 'right',
    marginBottom: 20
  },

  historyText: {
    color: 'white',
    fontSize: 20,
    padding: 5,
    marginTop: 30,
    textAlign: 'right',
  },

  inputRow: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#28292B'
  }
});
