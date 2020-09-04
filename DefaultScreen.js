import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InputNumberButton from './inputNumberButton'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Left, Icon as NativeIcon } from 'native-base';

const buttons = [
  ['%', 'C', 'CE', '<='],
  ['1/x', 'x²', '√', '÷'],
  ['7', '8', '9', 'x'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['+/-', '0', '.', '=']
];


export default class HomeScreen extends Component {
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

  renderButtons() {
    let layouts = buttons.map((buttonRows, index) => {
      let rowItem = buttonRows.map((buttonItems, buttonIndex) => {
        return <InputNumberButton
          value={buttonItems}
          handleOnPress={this.handleInput.bind(this, buttonItems)}
          key={'btn-' + buttonIndex} />
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
        console.log(operator)
        console.log(isDoneOperation)
        if (isDoneOperation) {
          this.setState({
            displayValue: input,
            isDoneOperation: false,
            firstValue: '',
            historyText: input
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
            historyText: historyText === '0' ? input : historyText + input
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
          historyText: result % 1 === 0 ? result : result.toFixed(2),
          firstValue: result % 1 === 0 ? result : result.toFixed(2),
        });
        break;
      case '√':
        var result = Math.sqrt(displayValue);
        this.setState({
          displayValue: result % 1 === 0 ? result : result.toFixed(2),
          historyText: result % 1 === 0 ? result : result.toFixed(2),
          firstValue: result % 1 === 0 ? result : result.toFixed(2),
        });
        break;
      case 'x²':
        var result = Math.pow(displayValue, 2);
        this.setState({
          displayValue: result % 1 === 0 ? result : result.toFixed(2),
          historyText: result % 1 === 0 ? result : result.toFixed(2),
          firstValue: result % 1 === 0 ? result : result.toFixed(2),
        });
        break;
      case '1/x':
        var result = 1 / parseFloat(displayValue);
        this.setState({
          displayValue: result % 1 === 0 ? result : result.toFixed(2),
          historyText: result % 1 === 0 ? result : result.toFixed(2),
          firstValue: result % 1 === 0 ? result : result.toFixed(2),
        });
        break;
      case '+':
      case '-':
      case 'x':
      case '÷':
        console.log(historyText)
        // if(firstValue && secondValue && operator){
        //   console.log("caiu aqui")
        //   this.operation(firstValue, secondValue, operator);
        // }
        console.log(isDoneOperation)
        if (firstValue && !secondValue) {
          this.setState({
            nextValue: true,
            operator: input,
            historyText: isDoneOperation ? displayValue + input : (operator !== null ? historyText.toString().substr(0, historyText.toString().length - 1) : historyText) + input,
            isDoneOperation: false,
            //displayValue: (operator !== null ? displayValue.substr(0, displayValue.length - 1) : displayValue) + input,            
          })
          break;
        }
        // if (firstValue && secondValue && operator) {

        // }
        break;
      case '.':
        let dot = displayValue.toString().slice(-1)
        this.setState({
          displayValue: dot !== '.' ? displayValue + input : displayValue,
          historyText: dot !== '.' ? historyText + input : historyText
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
        console.log(deletestring)
        let length = deletestring.length;
        this.setState({
          displayValue: length == 0 ? '0' : deletestring,
          firstValue: length == 0 ? '0' : deletestring,
        });
    }
  }

  operation(firstValue, secondValue, operator, historyText) {
    console.log(firstValue)
    console.log(secondValue)
    console.log(operator)
    let formatOperator = (operator == 'x') ? '*' : (operator == '÷') ? '/' : operator
    if (firstValue && secondValue) {
      let result = eval(parseFloat(firstValue) + formatOperator + parseFloat(secondValue))
      this.setState({
        displayValue: result % 1 === 0 ? result : result.toFixed(2),
        historyText: historyText + '=',
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
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#404040' }}>
          <Left style={{ alignSelf: 'flex-start', marginLeft: 10 }}>
            <NativeIcon name='menu' onPress={() =>
              this.props.navigation.openDrawer()} style={{ marginLeft: 10, color: 'white', paddingTop: 15 }} />
          </Left>
          <Text style={{ alignSelf: 'flex-start', fontSize: 30, color: 'white', padding: 10, position: 'absolute', left: 50 }}>Default</Text>
          <Button buttonStyle={{ width: 70, height: 70, backgroundColor: 'transparent ' }} icon={
              <Icon
                name="history"
                size={25}
                color="white"
              />
            } type="solid" />
        </View>
        <View style={styles.resultContainer}>
          <Text style={styles.historyText}>{this.state.historyText}</Text>
          <Text style={styles.resultText}>{this.state.displayValue}</Text>
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
    backgroundColor: '#404040'
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
    backgroundColor: '#404040'
  },

  numberContainer: {
    flex: 4,
    backgroundColor: '#202020'
  },

  inputContainer: {
    flex: 8,
    backgroundColor: '#202020'
  },

  resultText: {
    color: 'white',
    fontSize: 60,
    fontWeight: 'bold',
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    textAlign: 'right',
  },

  historyText: {
    color: 'white',
    fontSize: 30,
    padding: 5,
    textAlign: 'right',
  },

  inputRow: {
    flex: 1,
    flexDirection: 'row',
  }
});
