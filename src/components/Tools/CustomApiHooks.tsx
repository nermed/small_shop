import React, {useCallback} from 'react';
import {} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ArticleProps} from '../Articles/ArticleProps';
import {AchatDetailProps} from '../Achats/AchatDetailProps';
import {VenteDetailProps} from '../Ventes/VenteDetailProps';
import { useMutation, useQueryClient } from 'react-query';
import { CategorieProps } from '../Categorie/CategorieProps';

export const useStoreData = async (
  value: ArticleProps,
  bigData: ArticleProps[],
) => {
  try {
    let found = bigData.find(dt => dt.id == value.id);
    if (found) {
      found.price = value.price;
      found.category = value.category;
      found.isActif = value.isActif;
      found.name = value.name;
      found.mesureType = value.mesureType;
      found.priceAchat = value.priceAchat;
      found.quantity = value.quantity;
    } else {
      bigData.push(value);
    }
    const jsonValue = JSON.stringify(bigData);
    await AsyncStorage.setItem('@articles', jsonValue);
    return;
  } catch (e) {
    console.error(e);
    return;
  }
};

export const useStoreAppro = async (
  value: AchatDetailProps,
  bigData: AchatDetailProps[],
) => {
  try {
    let found = bigData.find(dt => dt.id == value.id);
    if (found) {
      found.id_article = value.id_article;
      found.priceAchat = value.priceAchat;
      found.quantity = value.quantity;
    } else {
      bigData.push(value);
    }
    const jsonValue = JSON.stringify(bigData);
    await AsyncStorage.setItem('@appro', jsonValue);
    return;
  } catch (e) {
    console.error(e);
    return;
  }
};

export const useStoreVente = async (
  value: VenteDetailProps,
  bigData: VenteDetailProps[],
) => {
  try {
    let found = bigData.find(dt => dt.id == value.id);
    if (found) {
      found.id_article = value.id_article;
      found.priceAchat = value.priceAchat;
      found.quantity = value.quantity;
    } else {
      bigData.push(value);
    }
    const jsonValue = JSON.stringify(bigData);
    await AsyncStorage.setItem('@ventes', jsonValue);
    return;
  } catch (e) {
    console.error(e);
    return;
  }
};

export const useStoreCategorie = async (
  value: CategorieProps,
  bigData: CategorieProps[],
) => {
  try {
    let found = bigData.find(dt => dt.id == value.id || dt.name == value.name);
    if (found) {
      found.id = value.id;
      found.name = value.name;
    } else {
      bigData.push(value);
    }
    const jsonValue = JSON.stringify(bigData);
    await AsyncStorage.setItem('@categorie', jsonValue);
    return;
  } catch (e) {
    console.error(e);
    return;
  }
};

export const useStoreMesure = async (
  value: CategorieProps,
  bigData: CategorieProps[],
) => {
  try {
    let found = bigData.find(dt => dt.id == value.id || dt.name == value.name);
    if (found) {
      found.id = value.id;
      found.name = value.name;
    } else {
      bigData.push(value);
    }

    const jsonValue = JSON.stringify(bigData);
    await AsyncStorage.setItem('@mesure', jsonValue);
    return;
  } catch (e) {
    console.error(e);
    return;
  }
};

export const useDeleteAppro = () => {
  let response = true;
  let loadDelete = useCallback(async (appros, articles) => {
    try {
      // console.log(articles);return;
      await AsyncStorage.multiSet([
        ['@appro', JSON.stringify(appros)],
        ['@articles', JSON.stringify(articles)],
      ]);
      return (response = true);
    } catch (e) {
      console.error(e);
      return (response = false);
    }
  }, []);
  return {
    loadDelete,
    response,
  };
};

export const useDeleteVente = () => {
  let response = true;
  let loadDeleteV = useCallback(async (ventes, articles) => {
    try {
      // console.log(articles);return;
      await AsyncStorage.multiSet([
        ['@ventes', JSON.stringify(ventes)],
        ['@articles', JSON.stringify(articles)],
      ]);
      return (response = true);
    } catch (e) {
      console.error(e);
      return (response = false);
    }
  }, []);
  return {
    loadDeleteV,
    response,
  };
};

export const useDeleteCateMesure = () => {
  let response = true;
  let loadDelete = useCallback(async (cat_or_mesure, articles, type) => {
    try {
      if(type == 'categorie') {
        await AsyncStorage.multiSet([
          ['@categorie', JSON.stringify(cat_or_mesure)],
          ['@articles', JSON.stringify(articles)],
        ]);
        return (response = true);
      } else {
        await AsyncStorage.multiSet([
          ['@mesure', JSON.stringify(cat_or_mesure)],
          ['@articles', JSON.stringify(articles)],
        ]);
        return (response = true);
      }
    } catch (e) {
      console.error(e);
      return (response = false);
    }
  }, []);
  return {
    loadDelete,
    response,
  };
};

