import { makeObservable, observable, action, computed, values, decorate } from 'mobx';
import API, { BASE_URL } from '~config/api';
import { toJS } from 'mobx';
import sha256 from 'crypto-js/sha256';

class ArrStore {

  @observable setTestArr = [];
  @observable flatArr = [];
  @observable customSplitObj = {};
  @observable selectedList = [];
  @observable hashString = 0;
  @observable hashNumber = 0;
  @observable sortSplitObj = {};
  @observable statesArray = [];
  @observable prevStates = '';


  @observable counter = 0;

  constructor() {
    makeObservable(this)
  }

  @action setCounter = (value) => { this.counter = value }
  @action setPrevStates = (value) => { this.prevStates = value }

  @action
  getArr = () => {

    this.isLoading = true;
    const testUrl = API.get(`${BASE_URL}`);

    return testUrl
      .then((res) => {
        const { testArr } = res.data;
        this.setArr(testArr);
        this.customFlatArrMethod(this.expamArr);
        this.customSplitArrMethod(this.flatArr);

      })
      .catch(error => {
        alert(`Ошибка при загрузке данных ${error}`);
      })
      .finally(() => {
        this.isLoading = false;
      });

  };

  @action
  setArr = (values) => {
    this.expamArr = values;
  };

  @action
  customFlatArrMethod = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        this.customFlatArrMethod(arr[i])
      } else {
        this.flatArr[this.flatArr.length] = arr[i]
      }
    }
  }

  @action
  customSplitArrMethod = (arr) => {
    arr.map(item => {
      if (item !== null && item !== undefined) {
        const key = typeof item;
        let data = ''
        if (key === 'object') {
          data = JSON.stringify(item)
        } else {
          data = item.toString()
        }
        this.customSplitObj[key] ? this.customSplitObj[key].push(data) : this.customSplitObj[key] = [data]
      }
      else if (item === undefined) {
        this.customSplitObj.undefined ? this.customSplitObj.undefined.push('undefined') : this.customSplitObj.undefined = ['undefined']
      }
      else {
        this.customSplitObj.null ? this.customSplitObj.null.push('null') : this.customSplitObj.null = ['null']
      }
    })
  }

  @action sortSelectedList = (value, type) => {
    this.sortSplitObj[type] = value;
  }

  @action concatSelectedString = (val) => {
    let concatString = '';
    for (let i = 0; i < val.length; i++) {
      concatString += this.customSplitObj.string[val[i]]
    }

    return (concatString ? this.hashString = `${sha256(concatString)}` : this.hashString = '0')
  }

  @action multiplicationSelectedNumber = (val) => {
    let multiplicationNumber = 1;
    let numberArray = this.customSplitObj.number;
    for (let i = 0; i < val.length; i++) {
      multiplicationNumber *= numberArray[val[i]]
    }

    return (val.length > 0 ? this.hashNumber = `${sha256('' + multiplicationNumber)}` : this.hashNumber = 0)
  }

  @action resetSelectedList = () => {
    this.selectedList = [];
    this.hashString = 0;
    this.hashNumber = 0;
    this.sortSplitObj = {};
    this.counter = 0;
    this.statesArray = [];
    this.prevStates = '';
  }

  @action addSelectedList = (val, type) => {
    this.selectedList.push({ type: type, id: val });
  }

  @action saveChangingState = () => {

    if (this.statesArray.length === 10) {
      this.setCounter(this.counter - 1);
      let a = this.statesArray.shift();
      this.setPrevStates(Object.assign({}, a));
    };

    this.setCounter(this.counter + 1);

    if (this.statesArray.length >= this.counter) {
      const arrayValues = [];
      for (let i = 0; i < this.counter - 1; i++) {
        arrayValues.push(toJS(this.statesArray[i]));
      }
      this.statesArray = arrayValues;
    };

    let cloneArrayItem = Object.assign({}, this.sortSplitObj)
    this.statesArray.push(cloneArrayItem);
    return this.statesArray;
  }

  @action goToBack = () => {
    let count = this.counter;
    let clone;

    if (count > 1) {
      clone = Object.assign({}, this.statesArray[count - 2])
    } else {
      this.prevStates ? clone = this.prevStates : clone = {};
    };
    count ? this.setCounter(count - 1) : count

    this.sortSplitObj = clone;

    clone.string !== undefined ? this.concatSelectedString(clone.string) : this.hashString = 0;
    clone.number !== undefined ? this.multiplicationSelectedNumber(clone.number) : this.hashNumber = 0;
  }

  @action goToNext = () => {
    let count = this.counter;
    let clone;
    if (count < this.statesArray.length) {
      this.setCounter(count + 1)
      clone = Object.assign({}, this.statesArray[this.counter - 1])

    } else { clone = Object.assign({}, this.statesArray[this.statesArray.length - 1]) }

    this.sortSplitObj = clone;

    clone.string !== undefined ? this.concatSelectedString(clone.string) : this.hashString = 0;
    clone.number !== undefined ? this.multiplicationSelectedNumber(clone.number) : this.hashNumber = 0;
  }

}

export default new ArrStore();
