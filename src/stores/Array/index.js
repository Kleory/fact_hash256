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


  @observable counter = 0;

  constructor() {
    makeObservable(this)
  }

  @action setCounter = (value) => { this.counter = value }

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

  // @action addSelectedList


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
    for (let i = 0; i < val.length; i++) {
      multiplicationNumber *= this.customSplitObj.number[val[i]]
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
  }

  @action addSelectedList = (val, type) => {
    this.selectedList.push({ type: type, id: val });

  }

  @action saveChangingState = () => {

    if (this.statesArray.length === 11) {
      this.setCounter(this.counter - 1);
      this.statesArray.shift();
      console.log('---------');
    };

    this.setCounter(this.counter + 1);

    if (this.statesArray.length >= this.counter) {
      const arrayValues = [];
      for (let i = 0; i < this.counter - 1; i++) {
        arrayValues.push(toJS(this.statesArray[i]));
      }
      this.statesArray = arrayValues;
      console.log('--a', toJS(arrayValues), 'counter', this.counter, toJS(this.statesArray));
    };

    let cloneArrayItem = Object.assign({}, this.sortSplitObj)
    this.statesArray.push(cloneArrayItem);
    console.log('---this.statesArray---', toJS(this.statesArray), 'counter', this.counter, this.statesArray.length);
    return this.statesArray;
  }

  @action transitionState = () => {
    if (this.counter > 0) { this.setCounter(this.counter - 1) };
    let count = this.counter;
    if (count > 0) {
      let clone = Object.assign({}, this.statesArray[count - 1])
      this.sortSplitObj = clone;

    } else if (this.sortSplitObj === undefined || count === 0 && this.selectedList.length < 5) {
      this.sortSplitObj = {}
    }

    this.sortSplitObj.string !== undefined ? this.concatSelectedString(this.sortSplitObj.string) : this.hashString = 0;
    this.sortSplitObj.number !== undefined ? this.multiplicationSelectedNumber(this.sortSplitObj.number) : this.hashNumber = 0;

    console.log('this.statesArray-back', toJS(this.statesArray), 'counter', this.counter);

    return this.sortSplitObj
  }

}

export default new ArrStore();
