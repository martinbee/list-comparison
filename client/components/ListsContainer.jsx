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
    };
    this.addImages = this.addImages.bind(this);
    this.changeDisplayedList = this.changeDisplayedList.bind(this);
    this.changeListLength = this.changeListLength.bind(this);
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

  determineListComponent() {
    const { list, images } = this.state;

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
          />
        </div>
      );
    }

    return (
      <div style={{ overflow: 'auto', WebkitOverflowScroll: 'touch', height: 500, width: 320 }}>
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
        />
        { listComponent }
      </div>
    );
  }
}


export default ListsContainer;
