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
  ['%', 'CE', 'C', '<='],
  ['1/x', 'x²', '√', '÷'],
  ['7', '8', '9', 'x'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['+/-', '0', ',', '=']
];

export default class StandardScreen extends Component {
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
      resultOperation: 0
    }
    this.state = this.initialState;
  }

  formatForDisplay(value) {
    return value.toString()
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
    const { displayValue, operator, firstValue, secondValue, nextValue, isDoneOperation, historyText, resultOperation } = this.state;

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
          this.setState(this.initialState);
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
          //break;
        } else {
          this.setState({
            displayValue: displayValue === '0' ? input : operator && !secondValue ? input : displayValue + input,
          })

          if (!nextValue) {
            this.setState({
              firstValue: firstValue + input,
              isDoneOperation: false,
            })
          } else {
            this.setState({
              secondValue: secondValue + input,
              isDoneOperation: false,
            })
          }
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
      case '%':
        if (!secondValue) {
          this.setState({
            displayValue: '0',
            historyText: '0',
            nextValue: false,
            isDoneOperation: true
          });
        } else {
          if (isDoneOperation && (operator == 'x' || operator == '÷')) {
            let result = displayValue / 100;
            this.setState({
              secondValue: result,
              displayValue: result,
              historyText: result,
              isDoneOperation: true
            });              
          } else {
            let result = secondValue / 100;
            this.setState({
              secondValue: result,
              displayValue: result,
              historyText: historyText + result,
              isDoneOperation: true
            });
          }
        }
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
            resultOperation: firstValue
          })
          break;
        }else{
          let formatOperator = (operator == 'x') ? '*' : (operator == '÷') ? '/' : operator
          let result = eval(parseFloat(resultOperation) + formatOperator + parseFloat(secondValue))
          this.setState({
            nextValue: true,
            operator: input,
            historyText: historyText + secondValue + operator,
            displayValue: result,
            isDoneOperation: false,
            secondValue: '',
            resultOperation: result
          })          
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
        this.operation(firstValue, secondValue, displayValue, operator, isDoneOperation);
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

  operation(firstValue, secondValue, displayValue, operator, isDoneOperation) {
    let formatOperator = (operator == 'x') ? '*' : (operator == '÷') ? '/' : operator
    if (firstValue && secondValue) {
      let result = eval(parseFloat(firstValue) + formatOperator + parseFloat(secondValue))
      this.setState({
        displayValue: result % 1 === 0 ? result : result.toFixed(2),
        historyText: firstValue + operator + secondValue + '=',
        firstValue: result % 1 === 0 ? result : result.toFixed(2),
        //secondValue: '',
        //operator: null,
        nextValue: false,
        isDoneOperation: true
      });
    }
    if (isDoneOperation) {
      firstValue = displayValue;
      let result = eval(parseFloat(firstValue) + formatOperator + parseFloat(secondValue))
      this.setState({
        displayValue: result % 1 === 0 ? result : result.toFixed(2),
        historyText: firstValue + operator + secondValue + '=',
        firstValue: result % 1 === 0 ? result : result.toFixed(2),
        //secondValue: '',
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
          <Text style={{ alignSelf: 'flex-start', fontSize: 25, color: 'white', padding: 12, position: 'absolute', left: 50 }}>Standard</Text>
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
              handleOnPress={() => {
                this.RBSheet.open();
              }}
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
    fontSize: 16,
    padding: 5,
    marginTop: 30,
    textAlign: 'right',
    color: 'gray'
  },

  inputRow: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#28292B'
  }
});
