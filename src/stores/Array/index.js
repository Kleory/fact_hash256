import { makeObservable, observable, action, computed, values, decorate } from 'mobx';
import API, { BASE_URL } from '~config/api';
import { toJS } from 'mobx';
import sha256 from 'crypto-js/sha256';

class ArrStore {

  @observable setTestArr = [];
  @observable flatArr = [];
  @observable customSplitObj = {};
  @observable selectedList = [];
  @observable concatString = '';
  @observable hashString = 0;
  @observable multiplicationNumber = 1;
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
    this.concatString = '';
    for (let i = 0; i < val.length; i++) {
      this.concatString += this.customSplitObj.string[val[i]]
    }

    return (this.concatString ? this.hashString = `${sha256(this.concatString)}` : this.hashString = '0')
  }

  @action multiplicationSelectedNumber = (val) => {
    this.multiplicationNumber = 1;
    for (let i = 0; i < val.length; i++) {
      this.multiplicationNumber *= this.customSplitObj.number[val[i]]
    }

    return (val.length > 0 ? this.hashNumber = `${sha256('' + this.multiplicationNumber)}` : this.hashNumber = 0)
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
    const arrayValues = [];
    if (this.statesArray.length === 11) {
      this.setCounter(this.counter - 1);
      this.statesArray.shift();
    };

    this.setCounter(this.counter + 1);

    if (this.statesArray.length >= this.counter) {
      for (let i = 0; i < this.counter; i++) {
        arrayValues.push(toJS(this.statesArray[i]));
      }
      this.statesArray = arrayValues;
      console.log('--a', toJS(arrayValues), 'counter', this.counter, toJS(this.statesArray));
      let clone = Object.assign({}, this.sortSplitObj)
      this.statesArray.push(clone);
      return
    } else {
      let clone = Object.assign({}, this.sortSplitObj)
      this.statesArray.push(clone);
    }



    console.log('---this.statesArray---', toJS(this.statesArray), 'counter', this.counter, this.statesArray.length);
    return this.statesArray;
  }

  @action transitionState = () => {
    if (this.counter > 1 && this.selectedList.length > 0) {
      this.setCounter(this.counter - 1);
      let count = this.counter;
      this.sortSplitObj = this.statesArray[count - 1];

    } else if (this.counter <= 1 && this.selectedList.length <= 5) {
      this.sortSplitObj = {}
    }

    this.sortSplitObj.string !== undefined ? this.concatSelectedString(this.sortSplitObj.string) : this.hashString = 0;
    this.sortSplitObj.number !== undefined ? this.multiplicationSelectedNumber(this.sortSplitObj.number) : this.hashNumber = 0;

    console.log('this.statesArray-back', toJS(this.statesArray), 'counter', this.counter, this.statesArray.length);

    return this.sortSplitObj
  }

}

export default new ArrStore();
