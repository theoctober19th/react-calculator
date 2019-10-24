import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';

import {
} from 'react-native/Libraries/NewAppScreen';

export default class Calculator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expression: '',
      result: ''
    }

    this.onButtonPressed = this.onButtonPressed.bind(this)
  }

  evaluateResult(rawExpression){
    let expression = rawExpression.replace(/÷/g, '/')
    expression = expression.replace(/×/g, '*')

    try {
      return eval(expression)
    } catch (e) {
      return ''
    } finally {

    }
  }

  onButtonPressed(btnTag){
    switch (btnTag) {

      case '=':
        //if {
          this.setState({
            expression: this.state.result,
            result: ''
          })
        //}
        console.log(this.state.result)
        break

      case 'DEL':
        let text = this.state.expression.split('')
        text.pop()
        this.setState({
          expression: text.join(''),
          result: this.evaluateResult(text.join(''))
          })
        break;

      case '0':
        if(this.state.expression == '0'){
          break
        }else{
          this.setState({
              expression: this.state.expression + btnTag,
              result: this.evaluateResult(this.state.expression + btnTag)
          })
        }
        break;

      case '.':
        if (this.state.expression.split('').pop() == '.') {
          break
        }else if(this.state.expression == ''){
            this.setState({
              expression: '0.'
              })
        }else{
          this.setState({
              expression: this.state.expression + btnTag,
              result: this.evaluateResult(this.state.expression + btnTag)
          })
        }
        break

      case '÷':
      case '×':
      case '+':
      case '-':
        if (this.state.expression == '') {
          break
        }else{
          if(['÷', '×', '+', '-'].includes(this.state.expression.split('').pop())){
            let text = this.state.expression.split('')
            text.pop()
            this.setState({
              expression: text.join('') + btnTag,
              result: this.evaluateResult(text.join('') + btnTag)
              })
          }else{
            this.setState({
                expression: this.state.expression + btnTag,
                result: this.evaluateResult(this.state.expression + btnTag)
            })
          }
        }
        break

      default:
        this.setState({
            expression: this.state.expression + btnTag,
            result: this.evaluateResult(this.state.expression + btnTag)
        })
    }
  }

  onButtonLongPressed(btnTag){
    switch (btnTag) {
      case 'DEL':
        this.setState({
          expression: '',
          result: ''
          })
        break;
      default:

    }
  }

  render(){

    let digits = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'], ['.', '0', '=']]
    let operations = ['DEL', '÷', '×', '-', '+']

    let digrows = []

    for (let i = 0; i < 4; i++) {
      let row = []
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity
            style={[styles.button, styles.digitButton]}
            onPress = {() => this.onButtonPressed( digits[i][j] )}>
              <Text style={styles.digitButtonText}>{ digits[i][j] }</Text>
          </TouchableOpacity>
        )
      }
      digrows.push(
        <View style={styles.digitRow}>
          {row}
        </View>
        )
    }

    let oprows = []
    for (let i = 0; i < operations.length; i++) {
      oprows.push(
        <TouchableOpacity
          style={[styles.button, styles.operationButton]}
          onPress = {() => this.onButtonPressed(operations[i])}
          onLongPress = {() => this.onButtonLongPressed(operations[i])}>
          <Text style={styles.operationButtonText}>{operations[i]}</Text>
        </TouchableOpacity>
      )
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.screenContainer}>
          <View style={styles.expressionContainer}>
            <Text style={styles.expressionText}>{this.state.expression}</Text>
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{this.state.result}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.digitContainer}>
            {digrows}
          </View>

          <View style={styles.operationsContainer}>
            {oprows}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1
  },

  screenContainer:{
    flex:1,
    backgroundColor: '#fffeff'
  },

  expressionContainer:{
    flex: 5,
    padding: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  resultContainer:{
    flex:2,
    padding: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },

  expressionText:{
    fontSize:60,
    textAlign: 'right',
  },

  resultText:{
    fontSize:40,
    textAlign: 'right',
    color: '#8c8c8c'
  },

  buttonContainer:{
    flex:2,
    flexDirection: 'row'
  },

  digitContainer:{
    flex:3,
    backgroundColor: '#3b3a3b'
  },

  operationsContainer:{
    flex:1,
    backgroundColor: '#585958',
  },

  digitRow:{
    flexDirection: 'row',
    flex: 1,
  },

  digitButton:{
    flex:1,
    alignItems: 'center',
  },

  digitButtonText:{
    color: '#f5f5f5',
    fontSize: 35,
    flex:1,
    textAlignVertical: 'center',
    textAlign: 'center'
  },

  operationButton:{
    flex: 1,
    alignItems: 'center',
  },

  operationButtonText:{
    color: '#dcdcdc',
    fontSize: 25,
    flex: 1,
    textAlignVertical: 'center'
  },

});
