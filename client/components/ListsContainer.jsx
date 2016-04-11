import React from 'react';
import Options from './Options';
import ReactList from 'react-list';
import ListItem from './ListItem';
import { VirtualScroll } from 'react-virtualized';

class ListsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      images: false,
      list: [],
      optionA: true,
      overscanRows: 10,
      threshold: 100,
    };
    this.addImages = this.addImages.bind(this);
    this.changeDisplayedList = this.changeDisplayedList.bind(this);
    this.changeListLength = this.changeListLength.bind(this);
    this.changeListThreshold = this.changeListThreshold.bind(this);
  }

  addImages() {
    this.setState({ images: !this.state.images });
  }

  changeDisplayedList() {
    this.setState({ optionA: !this.state.optionA });
  }

  changeListLength(value) {
    const list = Array.from(Array(Number(value)).keys());

    this.setState({ list });
  }

  changeListThreshold(value) {
    const numberValue = Number(value);
    let overscanRows;

    if (this.state.images) {
      overscanRows = Math.ceil(numberValue / 240);
    } else {
      overscanRows = Math.ceil(numberValue / 18);
    }

    this.setState({ threshold: numberValue, overscanRows });
  }

  determineListComponent() {
    const { list, images, overscanRows, threshold } = this.state;

    if (this.state.optionA) {
      return (
        <div>
          <VirtualScroll
            width={320}
            height={500}
            rowsCount={list.length}
            rowHeight={ images ? 240 : 18 }
            rowRenderer={
              index => (
                <div key={index}>
                  <ListItem
                    images={images}
                    list={list}
                    index={index}
                  />
                </div>
              )
            }
            overscanRows={overscanRows}
          />
        </div>
      );
    }

    return (
      <div style={{ overflow: 'auto', WebkitOverflowScrolling: 'touch', height: 500, width: 320 }}>
        <ReactList
          itemRenderer={
            index => (
              <div key={index}>
                <ListItem
                  images={images}
                  list={list}
                  index={index}
                />
              </div>
            )
          }
          length={list.length}
          type="uniform"
          threshold={threshold}
        />
      </div>
    );
  }

  render() {
    const listComponent = this.determineListComponent();

    return (
      <div>
        <Options
          addImages={this.addImages}
          changeDisplayedList={this.changeDisplayedList}
          changeListLength={this.changeListLength}
          changeListThreshold={this.changeListThreshold}
        />
        { listComponent }
      </div>
    );
  }
}


export default ListsContainer;
