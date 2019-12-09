import { render } from '@testing-library/react-native';
import React from 'react';
import { Text, View } from 'react-native';

function Example() {
  return (
    <View>
      <Text>Test</Text>
    </View>
  );
}

test('examples of some things', async () => {
  const { getByText } = render(<Example />);

  const text = getByText('Test');

  expect(!!text).toBe(true);
});
