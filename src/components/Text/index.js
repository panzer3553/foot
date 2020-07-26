import React from 'react';
import ReactNative, {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../themes';
// Text Elements
// =============================================================================

export function Text({style, color, bold, uppercase, ...props}) {
  return (
    <ReactNative.Text
      style={[
        styles.text,
        color && {color},
        bold && styles.bold,
        uppercase && styles.uppercase,
        style,
      ]}
      {...props}
    />
  );
}

export function Note({style, color, bold, ...props}) {
  return (
    <ReactNative.Text
      style={[styles.note, color && {color}, bold && {...styles.bold}, style]}
      {...props}
    />
  );
}

export function Heading1({style, color, bold, ...props}) {
  return (
    <ReactNative.Text
      style={[styles.h1, color && {color}, bold && {...styles.bold}, style]}
      {...props}
    />
  );
}

export function Heading2({style, color, bold, ...props}) {
  return (
    <ReactNative.Text
      style={[styles.h2, color && {color}, bold && {...styles.bold}, style]}
      {...props}
    />
  );
}

export function Heading3({style, color, bold, ...props}) {
  return (
    <ReactNative.Text
      style={[styles.h3, color && {color}, bold && {...styles.bold}, style]}
      {...props}
    />
  );
}

export function Heading4({style, color, bold, ...props}) {
  return (
    <ReactNative.Text
      style={[styles.h4, color && {color}, bold && {...styles.bold}, style]}
      {...props}
    />
  );
}

export function Heading5({style, color, bold, ...props}) {
  return (
    <ReactNative.Text
      style={[styles.h5, color && {color}, bold && {...styles.bold}, style]}
      {...props}
    />
  );
}

export function Paragraph({style, color, ...props}) {
  return (
    <ReactNative.Text style={[styles.p, color && {color}, style]} {...props} />
  );
}

// export function Hyperlink({style, color, ...props}) {
//   return <ReactNative.Text style={[styles.a, {color: color}, style]} {...props} />;
// }

export function Title({style, color, ...props}) {
  return (
    <ReactNative.Text
      style={[styles.headerTitle, color && {color}, style]}
      {...props}
    />
  );
}

export function HorizontalRule({style, color, ...props}) {
  return (
    <ReactNative.View style={[styles.hr, color && {color}, style]} {...props} />
  );
}

export function ButtonText({style, color, ...props}) {
  return (
    <ReactNative.Text
      style={[styles.buttonText, color && {color}, style]}
      {...props}
    />
  );
}

export function TempleParagrapText({style, color, ...props}) {
  return (
    <ReactNative.Text
      style={[styles.templeParagrapText, color && {color}, style]}
      {...props}
    />
  );
}

// Styles
// =============================================================================

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.regular.fontFamily,
    // fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 17,
  },
  note: {
    fontFamily: Fonts.regular.fontFamily,
    color: '#8E8E93',
    fontSize: 13,
    letterSpacing: -0.08,
  },
  h1: {
    color: 'white',
    fontFamily: Fonts.regular.fontFamily,
    fontSize: 40,
  },
  h2: {
    fontFamily: Fonts.regular.fontFamily,
    fontSize: 32,
    color: 'white',
  },
  h3: {
    fontFamily: Fonts.regular.fontFamily,
    fontSize: 16,
    letterSpacing: 0.67,
  },
  h4: {
    fontFamily: Fonts.regular.fontFamily,
    fontSize: 20,
    color: '#D8D8D8',
  },
  h5: {
    fontFamily: Fonts.bold.fontFamily,
    color: '#192038',
    fontSize: 13,
    fontWeight: 'bold',
  },
  buttonText: {
    fontFamily: Fonts.bold.fontFamily,
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  p: {
    fontFamily: Fonts.regular.fontFamily,
    color: 'black',
    fontSize: 15,
  },
  // a: {
  //   color: Colors.blue,
  //   textDecorationLine: 'underline',
  // },
  hr: {
    height: 1,
  },
  headerTitle: {
    fontFamily: Fonts.bold.fontFamily,
    fontSize: 15,
    lineHeight: 18,
    color: '#192038',
    fontWeight: 'bold',
  },
  bold: {
    fontFamily: Fonts.bold.fontFamily,
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  templeParagrapText: {
    color: Colors.textGray,
    fontSize: 13,
  },
});
