import React from 'react';
import RadioButton from './RadioButton';

const listLengthOptions = ['100', '1000', '5000', '10000'];

const Options = (props) => (
  <div>
    <div>
      <button
        style={{ marginBottom: '10px' }}
        onClick={() => {
          props.changeDisplayedList();
        }}
      >
        Change List
      </button>
    </div>
    <div style={{ marginBottom: '10px' }}>
      {
        listLengthOptions.map((option) => (
          <div key={option}>
            <RadioButton
              value={option}
              setOptionCallback={props.changeListLength}
            />
          </div>
        ))
      }
    </div>
    <div>
      <button
        style={{ marginBottom: '10px' }}
        onClick={() => {
          props.addImages();
        }}
      >
        Add Images
      </button>
    </div>
  </div>
);

Options.propTypes = {
  addImages: React.PropTypes.func,
  changeListLength: React.PropTypes.func,
  changeDisplayedList: React.PropTypes.func,
};

export default Options;
