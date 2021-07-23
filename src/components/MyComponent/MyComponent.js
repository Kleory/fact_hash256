import React, { useState, useEffect } from "react";

import { useStores } from '~stores';

import s from './s.styl';

const MyComponent = () => {
  const { ArrStore } = useStores();
  const { selectedList, customSplitObj } = ArrStore;

  const ulMap = () => {
    const components = [];
    for (let i = 0; i < selectedList.length; i++) {
      components.push(<li key={i}>
        {customSplitObj[selectedList[i].type][selectedList[i].id]}
      </li>)
    }
    return components;
  }

  return (
    <div className={s.root}>
      <div>Список выбранных опций </div>
      <ul>
        {ulMap()}
      </ul>
    </div>
  );
};


export default MyComponent;
