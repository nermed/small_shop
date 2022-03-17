import {createContext} from 'react';
import {ArticleProps} from '../Articles/ArticleProps';
import {AchatDetailProps} from '../Achats/AchatDetailProps';
import {VenteDetailProps} from '../Ventes/VenteDetailProps';
import {CategorieProps} from '../Categorie/CategorieProps';

type ContextProps = {
  articles: ArticleProps[];
  appros: AchatDetailProps[];
  ventes: VenteDetailProps[];
  categories: CategorieProps[];
  mesures: CategorieProps[];
};

export const CustomContext = createContext<ContextProps>({
  articles: [],
  appros: [],
  ventes: [],
  categories: [],
  mesures: [],
});
