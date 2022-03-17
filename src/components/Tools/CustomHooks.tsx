import React, {useCallback, useState} from 'react';
import {} from 'react-native';
import {AchatDetailProps} from '../Achats/AchatDetailProps';
import {ArticleProps} from '../Articles/ArticleProps';
import {VenteDetailProps} from '../Ventes/VenteDetailProps';

export const useFilterDispo = () => {
  let filterArray: ArticleProps[] | [] = [];
  const filtering = useCallback((array: ArticleProps[]) => {
    filterArray = array
      .filter(art => art.isActif === true)
      .map(
        ({
          id,
          name,
          category,
          price,
          quantity,
          priceAchat,
          mesureType,
          isActif,
        }) => ({
          id,
          name,
          category,
          price,
          quantity,
          mesureType,
          priceAchat,
          isActif,
        }),
      );
  }, []);
  return {filtering, filterArray};
};

export const useGetName = (id_article: number, articles: ArticleProps[]) => {
  let article = '';
  articles.forEach(art => {
    if (art.id == id_article) {
      article = art.name;
    }
  });
  return {
    article,
  };
};

export const useFilterName = () => {
  let [newArticles, setNewArticles] = useState<ArticleProps[]>([]);
  let filterFunction = useCallback((name: string, articles: ArticleProps[], option: string) => {
    newArticles = articles;
    if(option.length == 0) {
      if (name.length > 0) {
        if (articles.length > 0) {
          let dataSearch = articles
            .filter((article: ArticleProps) => {
              let stringAll: string = article.name.toLowerCase();
              return String(stringAll).includes(name.toLowerCase());
            })
            .map(
              ({
                id,
                name,
                priceAchat,
                price,
                quantity,
                isActif,
                category,
                mesureType,
              }) => ({
                id,
                name,
                priceAchat,
                price,
                quantity,
                isActif,
                category,
                mesureType,
              }),
            );
          dataSearch ? setNewArticles(dataSearch) : setNewArticles([]);
        } else {
          setNewArticles([]);
        }
      } else {
        setNewArticles(articles);
      }
    } else {
      if (articles.length > 0) {
        let dataSearch = articles
          .filter((article: ArticleProps) => {
            let stringAll: string = article.category.toLowerCase();
            return String(stringAll).includes(option.toLowerCase());
          })
          .map(
            ({
              id,
              name,
              priceAchat,
              price,
              quantity,
              isActif,
              category,
              mesureType,
            }) => ({
              id,
              name,
              priceAchat,
              price,
              quantity,
              isActif,
              category,
              mesureType,
            }),
          );
        dataSearch ? setNewArticles(dataSearch) : setNewArticles([]);
      } else {
        setNewArticles(articles);
      }
    }
  }, []);

  return {
    newArticles,
    filterFunction,
  };
};

export const useDetailPerArticle = () => {
  let detailsAppros: AchatDetailProps[] = [];
  let detailsVentes: VenteDetailProps[] = [];

  let loadDetail = useCallback(
    (
      id_article: number,
      appros: AchatDetailProps[],
      ventes: VenteDetailProps[],
    ) => {
      appros.forEach(appr => {
        if(appr.id_article == id_article) {
          detailsAppros.push(appr);
        }
      });
      ventes.forEach(vente => {
        if(vente.id_article == id_article) {
          detailsVentes.push(vente);
        }
      });
    },
    [detailsAppros, detailsVentes],
  );
  return {
    loadDetail,
    detailsAppros,
    detailsVentes
  }
};
