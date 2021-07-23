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
    getArr,
    customSplitObj,
    addSelectedList,
    resetSelectedList,
    concatSelectedString,
    multiplicationSelectedNumber,
    sortSelectedList,
    saveChangingState,
    transitionState } = ArrStore;

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

  console.log('============================render============================================');

  return (
    <div className={s.root}>
      <form>
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
      </form>

      <Button type="primary" className={s.transitionState} onClick={transitionState}>Отмена </Button>
      {/* <Button type="primary" className={s.transitionState} onClick={transitionState(false)}>Возврат </Button> */}

      <div className={s.output}>
        <div className={s.list}>
          <MyComponent />
        </div>

        <div className={s.list}>
          <div>Хеширование данных</div>
          <div>Стоки: {hashString}</div>
          <div>Цифры: {hashNumber}</div>
          <Button type="primary" className={s.resetButton} onClick={resetSelectedList}>Сброс </Button>
        </div>
      </div>

    </div>

  );
};

export default observer(MainPage);
