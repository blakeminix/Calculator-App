import React from 'react';
import { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = {
    title: string;
    children?: React.ReactNode;
  };

function Section({children, title}: SectionProps): React.JSX.Element {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {children}
      </View>
    );
}

function Calculator(): React.JSX.Element {
    const [displayValue, setDisplayValue] = useState('0');
    const [currentValue, setCurrentValue] = useState(0);
    const [operator, setOperator] = useState('');

    const handleButtonPress = (input: string) => {
        switch(input) {
          case '+':
          case '-':
            // If an operator is already set, calculate the result
            if (operator) {
              const result = operator === '+' ? currentValue + parseFloat(displayValue) : currentValue - parseFloat(displayValue);
              setCurrentValue(result);
              setDisplayValue(result.toString());
            } else {
              setCurrentValue(parseFloat(displayValue));
            }
            // Set the new operator
            setOperator(input);
            setDisplayValue('0');
            break;
          case '=':
            // Calculate the result
            if (operator) {
              const result = operator === '+' ? currentValue + parseFloat(displayValue) : currentValue - parseFloat(displayValue);
              setCurrentValue(0); // Reset current value
              setOperator(''); // Reset operator
              setDisplayValue(result.toString());
            }
            break;
          case 'C':
            // Clear the display and reset state
            setDisplayValue('0');
            setCurrentValue(0);
            setOperator('');
            break;
          default:
            // Append the input to the display value
            setDisplayValue(prevValue => prevValue === '0' ? input : prevValue + input);
            break;
        }
      };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Section title="">
            <View style={styles.displayArea}>
                <Text style={styles.displayText}>{displayValue}</Text>
            </View>
            <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('C')}>
              <Text style={styles.buttonText}>C</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('÷')}>
              <Text style={styles.buttonText}>÷</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('7')}>
              <Text style={styles.buttonText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('8')}>
              <Text style={styles.buttonText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('9')}>
              <Text style={styles.buttonText}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('x')}>
              <Text style={styles.buttonText}>x</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('4')}>
              <Text style={styles.buttonText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('5')}>
              <Text style={styles.buttonText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('6')}>
              <Text style={styles.buttonText}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('-')}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('1')}>
              <Text style={styles.buttonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('2')}>
              <Text style={styles.buttonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('3')}>
              <Text style={styles.buttonText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('+')}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('0')}>
              <Text style={styles.buttonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('.')}>
              <Text style={styles.buttonText}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('(-)')}>
              <Text style={styles.buttonText}>(-)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('=')}>
              <Text style={styles.buttonText}>=</Text>
            </TouchableOpacity>
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
      },
      buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
      },
      button: {
        backgroundColor: '#2196F3', // Blue color, you can adjust it
        padding: 20,
        borderRadius: 20,
        width: '21%',
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontSize: 24,
      },
      displayArea: {
        backgroundColor: '#333', // Dark background color for display area
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'flex-end',
      },
      displayText: {
        color: 'white',
        fontSize: 32,
      },
});

export default Calculator;
