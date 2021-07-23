import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import { Select, Button } from 'antd';

import { useStores } from '~stores';

import MyComponent from "~components/MyComponent/MyComponent";

import s from './s.styl';

const { Option } = Select;

const MainPage = () => {
  const { ArrStore } = useStores();
  const { hashString,
    hashNumber,
    sortSplitObj,
    counter,
    getArr,
    selectedList,
    customSplitObj,
    addSelectedList,
    resetSelectedList,
    concatSelectedString,
    multiplicationSelectedNumber,
    sortSelectedList,
    saveChangingState,
    statesArray,
    goToBack,
    goToNext } = ArrStore;

  useEffect(() => {
    getArr()
  }, [])

  function handleChange(valueArr, type) {
    if (type === 'string') {
      concatSelectedString(valueArr)
    }

    if (type === 'number') {
      multiplicationSelectedNumber(valueArr)
    }

    sortSelectedList(valueArr, type);

    saveChangingState();
  }

  const handleSelect = (value, obj) => {
    addSelectedList(value, obj);
  }

  return (
    <div className={s.root}>
      <div>
        {Object.keys(customSplitObj).map((keyObj, idxObj) => {

          return (
            <div key={idxObj} className={s.selectWrapper}>
              <div>{keyObj}</div>
              <Select
                mode="tags"
                className={s.select}
                placeholder={`Please select ${keyObj}`}
                allowClear={true}
                onSelect={(data) => handleSelect(data, keyObj)}
                onChange={(value) => handleChange(value, keyObj)}
                value={sortSplitObj[keyObj] || []}
              >
                {customSplitObj[keyObj].map((arrItem, idx) =>
                  <Option key={idx} >{arrItem}
                  </Option>
                )}
              </Select>
            </div>
          )
        })}
      </div>
      <div className={s.buttonsBlock}>
        <div>
          <Button type="primary" className={s.button} onClick={goToBack} disabled={counter === 0}>Отмена </Button>
          /
          <Button type="primary" className={s.button} onClick={goToNext} disabled={counter === statesArray.length}>Возврат </Button>
        </div>

        <Button type="primary" className={s.buttonReset} onClick={resetSelectedList} disabled={selectedList.length == 0}>Сбросить все </Button>
      </div>


      <div className={s.output}>
        <div className={s.list}>
          <MyComponent />
        </div>

        <div className={s.list}>
          <div>Хеширование данных</div>
          <div>Стоки: {hashString}</div>
          <div>Цифры: {hashNumber}</div>

        </div>
      </div>

    </div>

  );
};

export default observer(MainPage);
