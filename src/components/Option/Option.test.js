import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import Option from './Option';

test('option renders a list (size=2) by default', (t) => {
  const wrapper = shallow(<Option />);
  t.assert(wrapper.matchesElement(<select size={2} />));
  t.end();
});

const mock = [
  { id: 'abc', text: 'one' },
  { id: 'def', text: 'two' },
  { id: 'ghi', text: 'three' },
];

test('option applies passed-in options', (t) => {
  const wrapper = shallow(<Option options={mock} />);
  t.is(wrapper.find('option').length, mock.length, 'incorrect number of options');
  wrapper.find('option').forEach(
    (node, i) => {
      const data = mock[i];
      t.assert(
        node.matchesElement(
          <option key={data.id} value={data.id}>
            {data.text}
          </option>),
        'option element key/value does not match');
    });
  t.end();
});

test('option type=list renders a select element with size=2 for fewer options', (t) => {
  const wrapper = shallow(<Option type="list" options={[mock[0]]} />);
  t.is(wrapper.prop('size'), 2, 'type=list does not adapt to options shorter than 2 elements');
  t.end();
});

test('option type=list renders a select element with size>2 for more options', (t) => {
  const wrapper = shallow(<Option type="list" options={mock} />);
  t.is(wrapper.prop('size'), mock.length, 'type=list does not adapt to options longer than 2 elements');
  t.end();
});

test('option type=dropdown renders a select element with size=1', (t) => {
  const wrapper = shallow(<Option type="dropdown" options={mock} />);
  t.is(wrapper.prop('size'), 1, 'type=dropdown does not clamp size to 1');
  t.end();
});

test('option applies initial value', (t) => {
  const expected = mock[2];
  const wrapper = shallow(<Option options={mock} value={expected.id} />);
  t.is(wrapper.prop('value'), expected.id, '\'value\' is not set to the expected value');
  t.end();
});
