import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Label, Input } from 'common/styledCommon';
import { SubmitBtn, Form } from './styled';

export const ContactForm =( {addContact}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onSubmit = evt => {
    evt.preventDefault();

    //if contact added, reset form
    if (
      addContact({
        id: nanoid(),
        name: name
          .split(' ')
          .filter(word => word !== '')
          .join(' '),
        number,
      })
    ) {
      setName('');
      setNumber('');
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={e => setName(e.target.value)}
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={e => setNumber(e.target.value)}
        />
      </Label>

      <SubmitBtn type="submit">Add</SubmitBtn>
    </Form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func,
};
